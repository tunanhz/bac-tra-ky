import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/types";
import { StubNote } from "../stub-note";

export type FeaturedProductsProps = {
  /** Sản phẩm nổi bật (3–4) do `page.tsx` lấy từ `getFeaturedProducts()`. */
  products: Product[];
};

/**
 * STUB (phase 01) — Sản phẩm nổi bật trên trang chủ.
 * Phase 02 thay nội dung: 3–4 card, nút "Xem chi tiết" → `#san-pham`. Mảng rỗng → không render gì.
 */
export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="featured-title" className="section-y">
      <div className="wrap">
        <SectionHeading id="featured-title" title="Sản phẩm nổi bật" />
        <StubNote owner={`phase 02 · ${products.length} sản phẩm`} />
      </div>
    </section>
  );
}
