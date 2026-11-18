import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/types";
import { GiftCollections } from "./gift-collections";

export type ProductsSectionProps = {
  /** Toàn bộ sản phẩm do `page.tsx` lấy từ `getProducts()`. */
  products: Product[];
};

/** Catalogue ba bộ quà theo thẻ 5, không lặp lại danh sách sản phẩm lẻ. */
export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section id="san-pham" aria-labelledby="products-title" className="section-y">
      <div className="wrap">
        <SectionHeading
          id="products-title"
          title="Sản phẩm"
          description="Bánh Bác Giang Xá cùng Trà Sen và các hộp bánh dùng để thưởng thức hoặc làm quà tặng."
        />
        {products.some(({ category }) => category === "qua-tang") ? (
          <GiftCollections products={products} />
        ) : (
          <div className="frame-paper mx-auto max-w-2xl px-6 py-12 text-center">
            <p className="mt-0 mb-6 text-ink-soft">Bộ sưu tập đang được cập nhật. Liên hệ để được tư vấn.</p>
            <Button href={siteConfig.orderChannelUrl}>Liên hệ Bác Trà Ký</Button>
          </div>
        )}
      </div>
    </section>
  );
}
