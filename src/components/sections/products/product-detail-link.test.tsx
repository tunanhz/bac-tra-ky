// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { FeaturedProducts } from "@/components/sections/home/featured-products";
import { products as allProducts } from "@/data/products";
import { productDetailHref, readProductSlug, urlWithoutProductSlug } from "@/lib/product-link";
import { ProductsCatalog } from "./products-catalog";

const products = [...allProducts];

afterEach(() => {
  window.history.replaceState(null, "", "/");
});

describe("product-link helpers", () => {
  it("tạo và đọc ?sp=<slug>, chặn giá trị lạ, xoá sp mà giữ hash", () => {
    expect(productDetailHref("hop-6-banh")).toBe("/?sp=hop-6-banh#san-pham");
    expect(readProductSlug("?sp=hop-6-banh")).toBe("hop-6-banh");
    expect(readProductSlug("?sp=<script>")).toBeNull();
    expect(readProductSlug("?khac=1")).toBeNull();
    expect(urlWithoutProductSlug({ pathname: "/", search: "?sp=hop-6-banh&utm=x", hash: "#san-pham" })).toBe(
      "/?utm=x#san-pham",
    );
    expect(urlWithoutProductSlug({ pathname: "/", search: "?sp=a", hash: "" })).toBe("/");
  });
});

describe("Luồng catalogue cũ: Sản phẩm nổi bật → modal của đúng sản phẩm", () => {
  const featured = products.filter((product) => product.featured);

  function renderLegacyCatalog() {
    return render(
      <>
        <FeaturedProducts products={featured} />
        <section id="san-pham">
          <ProductsCatalog products={products} />
        </section>
      </>,
    );
  }

  it("nút có href dự phòng /?sp=<slug>#san-pham", () => {
    renderLegacyCatalog();
    const link = screen.getByRole("link", { name: `Xem chi tiết: ${featured[0].name}` });
    expect(link).toHaveAttribute("href", productDetailHref(featured[0].slug));
  });

  it("bấm → mở modal đúng sản phẩm, URL giữ sạch; đóng → focus về card trong danh mục", async () => {
    const user = userEvent.setup();
    renderLegacyCatalog();
    const target = featured[1];
    await user.click(screen.getByRole("link", { name: `Xem chi tiết: ${target.name}` }));

    const dialog = await screen.findByRole("dialog", { name: target.name });
    expect(within(dialog).getByText(target.description[0])).toBeInTheDocument();
    expect(window.location.search).toBe("");

    await user.click(within(dialog).getByRole("button", { name: "Đóng chi tiết sản phẩm" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: `Xem chi tiết: ${target.name}` })).toHaveFocus();
  });

  it("bộ lọc đang ẩn sản phẩm → tự về 'Tất cả' rồi mở modal", async () => {
    const user = userEvent.setup();
    renderLegacyCatalog();
    const target = featured.find((product) => product.category !== "truyen-thong")!;
    await user.click(screen.getByRole("button", { name: "Bánh Bác truyền thống" }));
    await user.click(screen.getByRole("link", { name: `Xem chi tiết: ${target.name}` }));
    expect(await screen.findByRole("dialog", { name: target.name })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tất cả" })).toHaveAttribute("aria-pressed", "true");
  });

  it("mở trang với ?sp=<slug> → modal tự mở; đóng → xoá sp, giữ #san-pham", async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, "", "/?sp=hop-6-banh#san-pham");
    render(<ProductsCatalog products={products} />);
    const dialog = await screen.findByRole("dialog", { name: "Hộp 6 bánh" });
    await user.click(within(dialog).getByRole("button", { name: "Đóng chi tiết sản phẩm" }));
    expect(window.location.search).toBe("");
    expect(window.location.hash).toBe("#san-pham");
  });

  it("?sp=<slug> không tồn tại → không mở gì", async () => {
    window.history.replaceState(null, "", "/?sp=khong-co#san-pham");
    render(<ProductsCatalog products={products} />);
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
