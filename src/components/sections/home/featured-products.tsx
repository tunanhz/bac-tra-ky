import { ProductCard } from "@/components/sections/products/product-card";
import { ProductDetailLink } from "@/components/sections/products/product-detail-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/types";

export type FeaturedProductsProps = {
  /** Sản phẩm nổi bật do `page.tsx` lấy từ `getFeaturedProducts()`. */
  products: Product[];
};

/** Bản mẫu B dựng lưới 3 cột; hơn 3 card sẽ để một card lẻ hàng nên chỉ lấy 3 sản phẩm đầu. */
export const FEATURED_LIMIT = 3;

/**
 * Sản phẩm nổi bật trên trang chủ (khối "Thức quà chọn lọc" của bản mẫu B). Mảng rỗng thì không render gì.
 * "Xem chi tiết" mở thẳng modal chi tiết của đúng sản phẩm trong danh mục (#san-pham) — xem `ProductDetailLink`.
 */
export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const items = products.slice(0, FEATURED_LIMIT);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="featured-title" className="section-y">
      <div className="wrap">
        <SectionHeading
          id="featured-title"
          eyebrow="Thức quà chọn lọc"
          title="Sản phẩm nổi bật"
          description="Bánh Bác truyền thống, những hương vị sáng tạo và hộp quà kết hợp Trà Sen."
        />
        <ul role="list" className="m-0 grid list-none gap-7 p-0 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product, index) => (
            <Reveal as="li" key={product.slug} delay={index * 120}>
              <ProductCard
                product={product}
                detailAction={<ProductDetailLink slug={product.slug} productName={product.name} />}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
