// @vitest-environment jsdom
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { products } from "@/data/products";
import { GiftCollections } from "./gift-collections";

function renderCollections(reduceMotion = false) {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: reduceMotion, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  render(<GiftCollections products={products} />);
}

function gallery(title: string) {
  return within(screen.getByRole("group", { name: `Ảnh và hương vị ${title}` }));
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("GiftCollections", () => {
  it("có ba nhóm quà với đúng định lượng và nút liên hệ qua số điện thoại", () => {
    renderCollections();
    for (const [title, size] of [["Chạm Ký Ức", "Combo 2 bánh"], ["Gom Ký Ức", "Combo 6 bánh"], ["Trao Ký Ức", "Hộp quà cao cấp"]]) {
      const card = within(screen.getByRole("article", { name: new RegExp(title) }));
      expect(card.getAllByText(new RegExp(size)).length).toBeGreaterThan(0);
      expect(card.getByRole("link", { name: new RegExp(`Liên hệ ngay về ${title}`) })).toHaveAttribute("href", expect.stringMatching(/^tel:/));
    }
    expect(within(screen.getByRole("article", { name: /Chạm Ký Ức/ })).getByText(/gói ghém ký ức thân quen và tình quê Giang Xá/)).toBeInTheDocument();
    expect(within(screen.getByRole("article", { name: /Gom Ký Ức/ })).getByText(/Hộp 6 chiếc thích hợp để thưởng thức trọn vẹn/)).toBeInTheDocument();
    const premium = within(screen.getByRole("article", { name: /Trao Ký Ức/ }));
    expect(premium.getByText(/mang đến trải nghiệm thưởng thức trọn vẹn và tinh tế/)).toBeInTheDocument();
  });

  it("hộp 6 bánh (Gom Ký Ức) có 5 vị; ảnh hộp matcha đúng quy cách", () => {
    renderCollections();
    const images = gallery("Gom Ký Ức");
    for (const name of ["Truyền thống", "Khoai môn", "Matcha", "Đậu đỏ", "Nhân mặn"]) {
      expect(images.getByRole("button", { name })).toBeInTheDocument();
    }
    fireEvent.click(images.getByRole("button", { name: "Matcha" }));
    expect(images.getByRole("img", { name: "Hộp 6 Bánh Bác nhân matcha" })).toHaveAttribute("src", expect.stringContaining("hop-6-banh-matcha.webp"));
  });

  it("dùng nút trước/sau để xem từng mục trên hộp 6 bánh", () => {
    vi.useFakeTimers();
    renderCollections();
    const images = gallery("Gom Ký Ức");
    expect(images.getByLabelText("Mục 1 trên 5")).toBeInTheDocument();
    fireEvent.click(images.getByRole("button", { name: "Ảnh trước" }));
    expect(images.getByRole("button", { name: "Nhân mặn" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(images.getByRole("button", { name: "Ảnh tiếp theo" }));
    act(() => vi.advanceTimersByTime(11000));
    expect(images.getByLabelText("Mục 1 trên 5")).toBeInTheDocument();
  });

  it("hộp 6 bánh tự chuyển ảnh sau mỗi lượt, có thể tạm dừng", () => {
    vi.useFakeTimers();
    renderCollections();
    const images = gallery("Gom Ký Ức");
    act(() => vi.advanceTimersByTime(5500));
    expect(images.getByRole("button", { name: "Matcha" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(images.getByRole("button", { name: "Tạm dừng tự chuyển ảnh" }));
    act(() => vi.advanceTimersByTime(11000));
    expect(images.getByRole("button", { name: "Matcha" })).toHaveAttribute("aria-pressed", "true");
  });

  it("tắt tự chuyển lúc đầu theo tùy chọn giảm chuyển động trên hộp 6 bánh", () => {
    vi.useFakeTimers();
    renderCollections(true);
    const images = gallery("Gom Ký Ức");
    act(() => vi.advanceTimersByTime(11000));
    expect(images.getByRole("button", { name: "Bật tự chuyển ảnh" })).toBeInTheDocument();
    expect(images.getByRole("button", { name: "Truyền thống" })).toHaveAttribute("aria-pressed", "true");
  });
});
