// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { products as allProducts } from "@/data/products";
import type { Product } from "@/lib/types";
import { formatPrice, isExternalUrl, PRICE_ON_REQUEST, sectionIdFromHref } from "@/lib/format";
import { filterProducts, ProductsCatalog } from "./products-catalog";
import { ProductsSection } from "./products-section";

const products: Product[] = allProducts.map((product) => ({ ...product }));

function cardNames() {
  return within(screen.getByRole("list", { name: /sản phẩm|Bánh Bác|Hộp|Hương/ }))
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);
}

describe("formatPrice / helpers", () => {
  it("giá null hoặc không hợp lệ → 'Liên hệ để biết giá'", () => {
    expect(formatPrice(null)).toBe(PRICE_ON_REQUEST);
    expect(formatPrice(Number.NaN)).toBe(PRICE_ON_REQUEST);
    expect(formatPrice(-1)).toBe(PRICE_ON_REQUEST);
  });

  it("có giá → định dạng VND", () => {
    expect(formatPrice(120000)).toMatch(/120\.000/);
  });

  it("nhận dạng link ngoài và section", () => {
    expect(isExternalUrl("https://m.me/x")).toBe(true);
    expect(isExternalUrl("/#lien-he")).toBe(false);
    expect(sectionIdFromHref("/#lien-he")).toBe("lien-he");
    expect(sectionIdFromHref("#san-pham")).toBe("san-pham");
    expect(sectionIdFromHref("/tin-tuc/a")).toBeNull();
  });
});

describe("filterProducts", () => {
  it("lọc đúng nhóm và 'all' giữ nguyên", () => {
    expect(filterProducts(products, "all")).toHaveLength(9);
    expect(filterProducts(products, "truyen-thong").map((p) => p.slug)).toEqual(["banh-bac-nhan-dau-xanh"]);
    expect(filterProducts(products, "sang-tao")).toHaveLength(4);
    expect(filterProducts(products, "qua-tang")).toHaveLength(4);
  });
});

describe("ProductsSection", () => {
  it("có id san-pham, tiêu đề đúng spec, 9 card, bộ lọc 'Tất cả' đang chọn", () => {
    const { container } = render(<ProductsSection products={products} />);
    expect(container.querySelector("section#san-pham")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Danh mục sản phẩm" })).toBeInTheDocument();
    expect(cardNames()).toHaveLength(9);
    expect(screen.getByRole("button", { name: "Tất cả" })).toHaveAttribute("aria-pressed", "true");
  });

  it("giá null → card hiện 'Liên hệ để biết giá'", () => {
    render(<ProductsCatalog products={products.slice(0, 2)} />);
    expect(screen.getAllByText(PRICE_ON_REQUEST)).toHaveLength(2);
  });

  it("card có ảnh, nhãn ảnh minh hoạ, 2 nút; 'Liên hệ đặt hàng' trỏ tới kênh mặc định /#lien-he", () => {
    render(<ProductsCatalog products={products.slice(0, 1)} />);
    expect(screen.getByRole("img", { name: products[0].imageAlt })).toBeInTheDocument();
    expect(screen.getByText("Ảnh minh hoạ – sẽ thay ảnh thật")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Xem chi tiết: Bánh Bác nhân đậu xanh" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Liên hệ đặt hàng: Bánh Bác nhân đậu xanh" })).toHaveAttribute(
      "href",
      "/#lien-he",
    );
  });

  it("bấm bộ lọc → chỉ còn sản phẩm của nhóm, aria-pressed đổi, đọc số kết quả", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog products={products} />);

    await user.click(screen.getByRole("button", { name: "Bánh Bác hương vị sáng tạo" }));
    expect(screen.getByRole("button", { name: "Bánh Bác hương vị sáng tạo" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Tất cả" })).toHaveAttribute("aria-pressed", "false");
    expect(cardNames()).toEqual([
      "Bánh Bác nhân mặn",
      "Bánh Bác nhân khoai môn",
      "Bánh Bác nhân matcha",
      "Bánh Bác nhân đậu đỏ",
    ]);
    expect(screen.getByText("Đang hiển thị 4 sản phẩm")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Bánh Bác truyền thống" }));
    expect(cardNames()).toEqual(["Bánh Bác nhân đậu xanh"]);

    await user.click(screen.getByRole("button", { name: "Tất cả" }));
    expect(cardNames()).toHaveLength(9);
  });

  it("nhóm không có sản phẩm → thông báo + 'Xem tất cả' quay lại", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog products={filterProducts(products, "qua-tang")} />);
    await user.click(screen.getByRole("button", { name: "Bánh Bác truyền thống" }));
    expect(screen.getByText("Chưa có sản phẩm trong nhóm này.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Xem tất cả" }));
    expect(cardNames()).toHaveLength(4);
  });

  it("danh sách rỗng → trạng thái rỗng, không có bộ lọc", () => {
    render(<ProductsCatalog products={[]} />);
    expect(screen.getByText("Bộ sưu tập đang được cập nhật. Liên hệ để được tư vấn.")).toBeInTheDocument();
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("'Xem chi tiết' mở modal đúng dữ liệu, không thêm thông tin; Đóng trả focus", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog products={products} />);
    const opener = screen.getByRole("button", { name: "Xem chi tiết: Hộp 6 bánh" });
    await user.click(opener);

    const dialog = screen.getByRole("dialog", { name: "Hộp 6 bánh" });
    const product = products.find((p) => p.slug === "hop-6-banh")!;
    for (const paragraph of product.description) {
      expect(within(dialog).getByText(paragraph)).toBeInTheDocument();
    }
    expect(within(dialog).getByText(PRICE_ON_REQUEST)).toBeInTheDocument();
    expect(within(dialog).getByText("Hộp bánh và quà tặng")).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Liên hệ đặt hàng" })).toHaveAttribute("href", "/#lien-he");

    await user.click(within(dialog).getByRole("button", { name: "Đóng chi tiết sản phẩm" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it("bấm 'Liên hệ đặt hàng' trong modal → đóng modal", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog products={products} />);
    await user.click(screen.getByRole("button", { name: "Xem chi tiết: Hộp 2 bánh" }));
    await user.click(within(screen.getByRole("dialog")).getByRole("link", { name: "Liên hệ đặt hàng" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("'Liên hệ đặt hàng' trong modal → đóng modal, focus chuyển tới tiêu đề mục Liên hệ", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ProductsCatalog products={products} />
        <section id="lien-he" aria-labelledby="contact-title">
          <h2 id="contact-title">Liên hệ</h2>
        </section>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Xem chi tiết: Hộp 2 bánh" }));
    await user.click(within(screen.getByRole("dialog")).getByRole("link", { name: "Liên hệ đặt hàng" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await vi.waitFor(() => expect(screen.getByRole("heading", { name: "Liên hệ" })).toHaveFocus());
    expect(window.location.hash).toBe("#lien-he");
  });
});
