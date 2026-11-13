import { products } from "@/data/products";
import type { Product } from "@/lib/types";

/*
 * Lớp truy cập dữ liệu sản phẩm. Hiện đọc dữ liệu tĩnh `src/data/products.ts`; phase 05 (backend) chỉ thay phần ruột
 * sang MongoDB, giữ nguyên chữ ký hàm. Hàm trả bản sao để nơi gọi không sửa được dữ liệu gốc.
 */

export async function getProducts(): Promise<Product[]> {
  return products.map((product) => ({ ...product, description: [...product.description] }));
}

/** Sản phẩm nổi bật cho trang chủ, tối đa `limit` (mặc định 4 theo spec "3–4 sản phẩm"). */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((product) => product.featured).slice(0, Math.max(0, limit));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((product) => product.slug === slug) ?? null;
}
