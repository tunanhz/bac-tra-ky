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
  it("có ba nhóm quà với đúng định lượng và nút liên hệ", () => {
    renderCollections();
    for (const [title, size] of [["Chạm Ký Ức", "Combo 2 bánh"], ["Gom Ký Ức", "Combo 6 bánh"], ["Trao Ký Ức", "Hộp quà cao cấp"]]) {
      const card = within(screen.getByRole("article", { name: title }));
      expect(card.getByText(new RegExp(size))).toBeInTheDocument();
      expect(card.getByRole("link", { name: `Liên hệ ngay về ${title}` })).toHaveAttribute("href", expect.stringMatching(/^(\/#lien-he|https?:\/\/)/));
    }
    expect(within(screen.getByRole("article", { name: "Chạm Ký Ức" })).getByText(/gói ghém ký ức thân quen và tình quê Giang Xá/)).toBeInTheDocument();
    expect(within(screen.getByRole("article", { name: "Gom Ký Ức" })).getByText(/Hộp 6 chiếc thích hợp để thưởng thức trọn vẹn/)).toBeInTheDocument();
    const premium = within(screen.getByRole("article", { name: "Trao Ký Ức" }));
    expect(premium.getByText(/mang đến trải nghiệm thưởng thức trọn vẹn và tinh tế/)).toBeInTheDocument();
    expect(premium.getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "03 bánh nhân matcha", "03 bánh nhân đậu xanh", "03 bánh nhân khoai môn", "01 hộp Trà Sen",
    ]);
  });

  it("chọn được 5 vị; ảnh hộp matcha đúng quy cách và không gán ảnh đậu xanh cho vị mặn", () => {
    renderCollections();
    for (const title of ["Chạm Ký Ức", "Gom Ký Ức"]) {
      const images = gallery(title);
      for (const name of ["Truyền thống", "Khoai môn", "Matcha", "Đậu đỏ", "Nhân mặn"]) {
        expect(images.getByRole("button", { name })).toBeInTheDocument();
      }
      fireEvent.click(images.getByRole("button", { name: "Nhân mặn" }));
      expect(images.getByText("Ảnh riêng vị nhân mặn đang cập nhật.")).toBeInTheDocument();
      expect(images.queryByRole("img")).not.toBeInTheDocument();
      expect(images.getByRole("button", { name: "Nhân mặn" })).toHaveAttribute("aria-pressed", "true");
    }
    const comboSix = gallery("Gom Ký Ức");
    fireEvent.click(comboSix.getByRole("button", { name: "Matcha" }));
    expect(comboSix.getByRole("img", { name: "Hộp 6 Bánh Bác nhân matcha" })).toHaveAttribute("src", expect.stringContaining("hop-6-banh-matcha.webp"));
  });

  it("dùng nút trước/sau để xem từng mục và dừng tự chuyển khi chọn tay", () => {
    vi.useFakeTimers();
    renderCollections();
    const images = gallery("Chạm Ký Ức");
    expect(images.getByLabelText("Mục 1 trên 6")).toBeInTheDocument();
    fireEvent.click(images.getByRole("button", { name: "Ảnh trước" }));
    expect(images.getByRole("button", { name: "Nhân mặn" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(images.getByRole("button", { name: "Ảnh tiếp theo" }));
    act(() => vi.advanceTimersByTime(11000));
    expect(images.getByLabelText("Mục 1 trên 6")).toBeInTheDocument();
    expect(images.getByRole("button", { name: "Hộp bánh" })).toHaveAttribute("aria-pressed", "true");
  });

  it("tự chuyển ảnh sau mỗi lượt, có thể tạm dừng", () => {
    vi.useFakeTimers();
    renderCollections();
    const images = gallery("Chạm Ký Ức");
    act(() => vi.advanceTimersByTime(5500));
    expect(images.getByRole("button", { name: "Truyền thống" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(images.getByRole("button", { name: "Tạm dừng tự chuyển ảnh" }));
    act(() => vi.advanceTimersByTime(11000));
    expect(images.getByRole("button", { name: "Truyền thống" })).toHaveAttribute("aria-pressed", "true");
  });

  it("tắt tự chuyển lúc đầu theo tùy chọn giảm chuyển động", () => {
    vi.useFakeTimers();
    renderCollections(true);
    const images = gallery("Chạm Ký Ức");
    act(() => vi.advanceTimersByTime(11000));
    expect(images.getByRole("button", { name: "Bật tự chuyển ảnh" })).toBeInTheDocument();
    expect(images.getByRole("button", { name: "Hộp bánh" })).toHaveAttribute("aria-pressed", "true");
  });
});
