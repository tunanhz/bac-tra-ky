// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
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
    expect(screen.getByRole("link", { name: /Bác Trà Ký — về trang chủ/ })).toHaveAttribute("href", "/#trang-chu");
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
});
