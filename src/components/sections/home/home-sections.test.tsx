// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import type { Product } from "@/lib/types";
import { BRAND_VALUES, BrandValues } from "./brand-values";
import { formatPrice } from "@/lib/format";
import { FEATURED_LIMIT, FeaturedProducts } from "./featured-products";
import { FinalCta } from "./final-cta";
import { Hero } from "./hero";
import { Intro } from "./intro";

describe("Hero", () => {
  it("có heading đúng spec và 2 CTA trỏ đúng anchor", () => {
    render(<Hero />);
    const section = document.getElementById("trang-chu");
    expect(section).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 1, name: "Bác Trà Ký – Gìn giữ tinh hoa, tiếp nối giá trị" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Khám phá sản phẩm" })).toHaveAttribute("href", "/#san-pham");
    expect(screen.getByRole("link", { name: "Câu chuyện Bác Trà Ký" })).toHaveAttribute("href", "/#cau-chuyen");
    expect(
      screen.getByText(
        "Từ hương vị Bánh Bác Giang Xá đến nét thanh tao của Trà Sen Việt, mỗi món quà là một câu chuyện văn hoá được tiếp nối.",
      ),
    ).toBeInTheDocument();
  });
});

describe("Intro", () => {
  it("tiêu đề đúng spec, ảnh tranh Đông Hồ có alt tiếng Việt, nút Tìm hiểu thêm → #ve-chung-toi", () => {
    render(<Intro />);
    expect(screen.getByRole("heading", { level: 2, name: "Một thức quà – Một câu chuyện Việt" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Tranh Đông Hồ cá chép/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tìm hiểu thêm" })).toHaveAttribute("href", "/#ve-chung-toi");
  });
});

describe("FeaturedProducts", () => {
  it("mảng rỗng → không render gì", () => {
    const { container } = render(<FeaturedProducts products={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("tối đa 3 card, mỗi card có tên, mô tả, nhãn giá và nút Xem chi tiết → #san-pham", () => {
    const featured = products.filter((p) => p.featured);
    render(<FeaturedProducts products={featured} />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(Math.min(featured.length, FEATURED_LIMIT));
    const first = within(cards[0]);
    expect(first.getByRole("heading", { level: 3, name: featured[0].name })).toBeInTheDocument();
    expect(first.getByText(featured[0].shortDescription)).toBeInTheDocument();
    expect(first.getByText("Liên hệ để biết giá")).toBeInTheDocument();
    expect(first.getByRole("link", { name: `Xem chi tiết: ${featured[0].name}` })).toHaveAttribute(
      "href",
      "/#san-pham",
    );
    expect(first.getByRole("link", { name: `Liên hệ đặt hàng: ${featured[0].name}` })).toHaveAttribute(
      "href",
      "/#lien-he",
    );
  });

  it("ảnh minh hoạ có nhãn, ảnh thật thì không", () => {
    const base = products[0];
    const real: Product = { ...base, slug: "that", name: "Ảnh thật", imageIsIllustration: false };
    render(<FeaturedProducts products={[base, real]} />);
    const [illustrated, photo] = screen.getAllByRole("article");
    expect(within(illustrated).getByText("Ảnh minh hoạ – sẽ thay ảnh thật")).toBeInTheDocument();
    expect(within(photo).queryByText("Ảnh minh hoạ – sẽ thay ảnh thật")).toBeNull();
  });

  it("dùng chung formatPrice với danh mục (một định dạng giá duy nhất)", () => {
    const priced: Product = { ...products[0], slug: "co-gia", price: 120000 };
    render(<FeaturedProducts products={[priced]} />);
    // Intl chèn khoảng trắng không ngắt trước "₫" — so theo textContent để không bị chuẩn hoá khoảng trắng.
    expect(screen.getByRole("article").textContent).toContain(formatPrice(120000));
    expect(screen.queryByText("Liên hệ để biết giá")).toBeNull();
  });
});

describe("BrandValues", () => {
  it("đúng 3 giá trị theo spec", () => {
    render(<BrandValues />);
    expect(BRAND_VALUES.map((v) => v.title)).toEqual([
      "Gìn giữ hương vị truyền thống",
      "Kết nối văn hoá qua từng thức quà",
      "Làm mới trải nghiệm thưởng thức",
    ]);
    for (const value of BRAND_VALUES) {
      expect(screen.getByRole("heading", { level: 3, name: value.title })).toBeInTheDocument();
    }
  });
});

describe("FinalCta", () => {
  it("heading và nút đúng spec", () => {
    render(<FinalCta />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Mang một chút hương vị quê nhà đến gần bạn hơn" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Khám phá bộ sưu tập" })).toHaveAttribute("href", "/#san-pham");
  });
});
