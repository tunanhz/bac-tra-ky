// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import type { Product } from "@/lib/types";
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
    expect(screen.getByRole("img", { name: /Bánh Bác cuộn lá xanh/ })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Bác Trà Ký – Gìn giữ tinh hoa – Tiếp nối giá trị" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Khám phá sản phẩm" })).toHaveAttribute("href", "/#san-pham");
    expect(screen.getByRole("link", { name: "Khám phá câu chuyện" })).toHaveAttribute("href", "/#cau-chuyen");
    expect(
      screen.getByText(
        "Từ hương vị Bánh Bác Giang Xá đến nét thanh tao của Trà Sen Việt, Bác Trà Ký mang đến những thức quà đậm đà bản sắc, nơi hương vị truyền thống được gìn giữ và tiếp nối trong nhịp sống hiện đại.",
      ),
    ).toBeInTheDocument();
  });

  it("nút mũi tên trỏ đúng phần giới thiệu", () => {
    render(<><Hero /><Intro /></>);
    expect(screen.getByRole("link", { name: "Cuộn xuống phần giới thiệu" })).toHaveAttribute("href", "#gioi-thieu");
    expect(screen.getByRole("region", { name: "Một thức quà – Một câu chuyện Việt" })).toHaveAttribute("id", "gioi-thieu");
  });

  it("có ảnh chính thức thì thay riêng cụm ảnh, không thay bố cục chữ hay nút", () => {
    render(<Hero artwork={{ src: "/images/banner.webp", alt: "Banner chính thức Bác Trà Ký" }} />);
    expect(screen.getByRole("img", { name: "Banner chính thức Bác Trà Ký" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /Bánh Bác cuộn lá xanh/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Khám phá sản phẩm" })).toHaveAttribute("href", "/#san-pham");
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

  it("tối đa 3 card, mỗi card có tên, mô tả, nhãn giá và nút Xem chi tiết → modal trong #san-pham", () => {
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
      `/?sp=${featured[0].slug}#san-pham`,
    );
    expect(first.getByRole("link", { name: `Liên hệ đặt hàng: ${featured[0].name}` })).toHaveAttribute(
      "href",
      "/#lien-he",
    );
  });

  it("ảnh minh hoạ có nhãn, ấn phẩm đúng sản phẩm thì không", () => {
    const temporary: Product = { ...products[0], slug: "anh-minh-hoa", imageIsIllustration: true };
    render(<FeaturedProducts products={[temporary, products[0]]} />);
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

describe("FinalCta", () => {
  it("heading và nút đúng spec", () => {
    render(<FinalCta />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Mang một chút hương vị quê nhà đến gần bạn hơn" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Khám phá bộ sưu tập" })).toHaveAttribute("href", "/#san-pham");
  });
});
