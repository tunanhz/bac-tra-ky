import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/types";
import { GiftCollections } from "./gift-collections";
import { ProductsCatalog } from "./products-catalog";

export type ProductsSectionProps = {
  /** Toàn bộ sản phẩm do `page.tsx` lấy từ `getProducts()`. */
  products: Product[];
};

/**
 * Danh mục sản phẩm (id `san-pham`) — hướng B: nền be thuần (một trong hai khoảng nghỉ không sơn son), đầu mục căn
 * giữa như `.sec-head`, bộ lọc nút viền, lưới card giấy viền đôi ảnh vòm cung, modal chi tiết.
 */
export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section id="san-pham" aria-labelledby="products-title" className="section-y">
      <div className="wrap">
        <SectionHeading
          id="products-title"
          eyebrow="Bác Trà Ký"
          title="Danh mục sản phẩm"
          description="Bánh Bác Giang Xá cùng Trà Sen và các hộp bánh dùng để thưởng thức hoặc làm quà tặng."
        />
        {products.some(({ category }) => category === "qua-tang") && <GiftCollections products={products} />}
        {products.length > 0 && (
          <h3 className="mt-0 mb-5 text-center text-h3 font-bold text-gac">Xem từng sản phẩm</h3>
        )}
        <ProductsCatalog products={products} />
      </div>
    </section>
  );
}
