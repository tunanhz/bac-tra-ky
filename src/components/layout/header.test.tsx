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

  it("có logo và đủ 6 mục điều hướng trỏ tới section trang chủ", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Điều hướng chính" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual([
      "Trang chủ",
      "Về chúng tôi",
      "Câu chuyện văn hoá",
      "Sản phẩm",
      "Tin tức",
      "Liên hệ",
    ]);
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      "/#trang-chu",
      "/#ve-chung-toi",
      "/#cau-chuyen",
      "/#san-pham",
      "/#tin-tuc",
      "/#lien-he",
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

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("Đóng menu");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
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
    expect(screen.getByRole("link", { name: "Liên hệ" })).toHaveFocus();
  });

  it("cuộn tới đáy trang (đang xem footer) → mục 'Liên hệ' sáng, aria-current='location'", () => {
    const scrollHeight = vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
    try {
      render(<Header />);
      act(() => {
        window.scrollY = 5000 - window.innerHeight;
        window.dispatchEvent(new Event("scroll"));
      });
      expect(screen.getByRole("link", { name: "Liên hệ" })).toHaveAttribute("aria-current", "location");
      expect(screen.getByRole("link", { name: "Trang chủ" })).not.toHaveAttribute("aria-current");
    } finally {
      scrollHeight.mockRestore();
      window.scrollY = 0;
    }
  });
});
