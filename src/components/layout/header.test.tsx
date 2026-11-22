// @vitest-environment jsdom
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./header";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

describe("Header", () => {
  beforeEach(() => {
    pathname.value = "/";
  });

  it("có logo và đủ 5 mục điều hướng trỏ tới section trang chủ", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Điều hướng chính" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual([
      "Trang chủ",
      "Câu chuyện văn hoá",
      "Sản phẩm",
      "Về chúng tôi",
      "Tin tức",
    ]);
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      "/#trang-chu",
      "/#cau-chuyen",
      "/#san-pham",
      "/#ve-chung-toi",
      "/#tin-tuc",
    ]);
    const logo = screen.getByRole("link", { name: /Bác Trà Ký — về trang chủ/ });
    expect(logo).toHaveAttribute("href", "/#trang-chu");
    expect(logo.querySelector("img")).not.toBeNull();
    expect(logo.textContent).toBe("");
  });

  it("trong suốt ở đầu trang chủ, luôn nền đặc ở trang khác", () => {
    const { container, unmount } = render(<Header />);
    expect(container.querySelector("header")).toHaveAttribute("data-solid", "false");
    unmount();
    pathname.value = "/tin-tuc/bai-viet";
    const other = render(<Header />);
    expect(other.container.querySelector("header")).toHaveAttribute("data-solid", "true");
  });

  it("nút menu mở/đóng, cập nhật aria-expanded và nhãn", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "Mở menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "menu-dieu-huong");
    expect(button).toHaveClass("rounded-full");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("Đóng menu");
    expect(button).toHaveClass("rounded-full");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("menu khóa cuộn nền và khôi phục đúng style cũ khi đóng", async () => {
    const user = userEvent.setup();
    const root = document.documentElement;
    const oldRoot = root.style.overflow;
    const oldBody = document.body.style.overflow;
    root.style.overflow = "auto";
    document.body.style.overflow = "clip";
    try {
      render(<Header />);
      await user.click(screen.getByRole("button", { name: "Mở menu" }));
      expect(root.style.overflow).toBe("hidden");
      expect(document.body.style.overflow).toBe("hidden");
      await user.keyboard("{Escape}");
      expect(root.style.overflow).toBe("auto");
      expect(document.body.style.overflow).toBe("clip");
    } finally {
      root.style.overflow = oldRoot;
      document.body.style.overflow = oldBody;
    }
  });

  it("tháo header khi menu đang mở không để trang bị khóa cuộn", async () => {
    const user = userEvent.setup();
    const rootOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    const { unmount } = render(<Header />);
    await user.click(screen.getByRole("button", { name: "Mở menu" }));
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.documentElement.style.overflow).toBe(rootOverflow);
    expect(document.body.style.overflow).toBe(bodyOverflow);
  });

  it("Esc đóng menu và trả focus về nút", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "Mở menu" });
    await user.click(button);
    await user.tab();
    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });

  it("bấm một mục thì tự đóng menu", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "Mở menu" });
    await user.click(button);
    await user.click(screen.getByRole("link", { name: "Sản phẩm" }));
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("bấm ra ngoài header thì đóng menu", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Header />
        <p>Nội dung trang</p>
      </>,
    );
    const button = screen.getByRole("button", { name: "Mở menu" });
    await user.click(button);
    await user.click(screen.getByText("Nội dung trang"));
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("nới cửa sổ lên ≥ 1024px thì đóng menu", async () => {
    let onChange: ((event: { matches: boolean }) => void) | undefined;
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      addEventListener: (_: string, cb: (event: { matches: boolean }) => void) => {
        onChange = cb;
      },
      removeEventListener: () => {},
    }));
    try {
      const user = userEvent.setup();
      render(<Header />);
      const button = screen.getByRole("button", { name: "Mở menu" });
      await user.click(button);
      act(() => onChange?.({ matches: true }));
      expect(button).toHaveAttribute("aria-expanded", "false");
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("menu mở: Tab xoay vòng trong các mục và nút menu", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "Mở menu" });
    await user.click(button);
    expect(button).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Trang chủ" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(button).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("link", { name: "Tin tức" })).toHaveFocus();
  });

  it("cuộn tới đáy trang (đang xem footer) → mục cuối ('Tin tức') sáng, aria-current='location'", () => {
    const scrollHeight = vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
    try {
      render(<Header />);
      act(() => {
        window.scrollY = 5000 - window.innerHeight;
        window.dispatchEvent(new Event("scroll"));
      });
      expect(screen.getByRole("link", { name: "Tin tức" })).toHaveAttribute("aria-current", "location");
      expect(screen.getByRole("link", { name: "Trang chủ" })).not.toHaveAttribute("aria-current");
    } finally {
      scrollHeight.mockRestore();
      window.scrollY = 0;
    }
  });
});
