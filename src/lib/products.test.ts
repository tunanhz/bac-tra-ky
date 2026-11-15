import { describe, expect, it } from "vitest";
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_LABELS, products } from "@/data/products";
import { getFeaturedProducts, getProductBySlug, getProducts } from "./products";

describe("dữ liệu sản phẩm tĩnh", () => {
  it("chỉ có 7 sản phẩm đã chốt, không có slug trùng", () => {
    expect(products.map((p) => p.slug)).toEqual([
      "banh-bac-nhan-dau-xanh",
      "banh-bac-nhan-khoai-mon",
      "banh-bac-nhan-matcha",
      "banh-bac-nhan-dau-do",
      "hop-2-banh",
      "hop-6-banh",
      "bo-qua-banh-bac-tra-sen",
    ]);
  });

  it("đủ 3 nhóm: 1 truyền thống, 3 sáng tạo, 3 hộp/quà", () => {
    const count = (category: string) => products.filter((p) => p.category === category).length;
    expect(count("truyen-thong")).toBe(1);
    expect(count("sang-tao")).toBe(3);
    expect(count("qua-tang")).toBe(3);
    expect(PRODUCT_CATEGORIES.every((c) => PRODUCT_CATEGORY_LABELS[c])).toBe(true);
  });

  it("chưa có giá chính thức nên mọi giá là null", () => {
    expect(products.every((p) => p.price === null)).toBe(true);
  });

  it("ảnh trỏ tới /images/products/<slug>.webp và không dùng ảnh minh hoạ", () => {
    for (const p of products) {
      expect(p.image).toBe(`/images/products/${p.slug}.webp`);
      expect(p.imageIsIllustration).toBe(false);
      expect(p.imageAlt.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
    }
  });
});

describe("lib/products", () => {
  it("getProducts trả 7 sản phẩm và là bản sao (sửa không ảnh hưởng dữ liệu gốc)", async () => {
    const list = await getProducts();
    expect(list).toHaveLength(7);
    list[0].name = "đã sửa";
    list[0].description.push("thêm");
    const again = await getProducts();
    expect(again[0].name).toBe("Bánh Bác nhân đậu xanh");
    expect(again[0].description).toHaveLength(products[0].description.length);
  });

  it("getFeaturedProducts trả 3–4 sản phẩm nổi bật, có Bánh Bác nhân đậu xanh", async () => {
    const featured = await getFeaturedProducts();
    expect(featured.length).toBeGreaterThanOrEqual(3);
    expect(featured.length).toBeLessThanOrEqual(4);
    expect(featured.every((p) => p.featured)).toBe(true);
    expect(featured.map((p) => p.slug)).toContain("banh-bac-nhan-dau-xanh");
  });

  it("getFeaturedProducts tôn trọng limit", async () => {
    expect(await getFeaturedProducts(2)).toHaveLength(2);
    expect(await getFeaturedProducts(-1)).toEqual([]);
  });

  it("getProductBySlug tìm theo slug, không có thì null", async () => {
    expect((await getProductBySlug("hop-6-banh"))?.name).toBe("Hộp 6 bánh");
    expect(await getProductBySlug("khong-ton-tai")).toBeNull();
  });
});
