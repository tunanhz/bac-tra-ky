import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/types";
import { StubNote } from "../stub-note";

export type ProductsSectionProps = {
  /** Toàn bộ sản phẩm do `page.tsx` lấy từ `getProducts()`. */
  products: Product[];
};

/**
 * STUB (phase 01) — Danh mục sản phẩm (id `san-pham`).
 * Phase 03 thay nội dung: bộ lọc 3 nhóm + "Tất cả", card vòm cung, modal chi tiết, trạng thái rỗng.
 */
export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section id="san-pham" aria-labelledby="products-title" className="section-y">
      <div className="wrap">
        <SectionHeading
          id="products-title"
          eyebrow="Sản phẩm"
          title="Danh mục sản phẩm"
          description="Bánh Bác truyền thống, những hương vị sáng tạo và hộp quà kết hợp Trà Sen."
        />
        <StubNote owner={`phase 03 · ${products.length} sản phẩm`} />
      </div>
    </section>
  );
}
