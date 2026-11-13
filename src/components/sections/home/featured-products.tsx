import { ILLUSTRATION_LABEL } from "@/components/ui/image-placeholder";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionHref, siteConfig } from "@/config/site";
import { PRODUCT_CATEGORY_LABELS } from "@/data/products";
import type { Product } from "@/lib/types";

export type FeaturedProductsProps = {
  /** Sản phẩm nổi bật do `page.tsx` lấy từ `getFeaturedProducts()`. */
  products: Product[];
};

/** Bản mẫu B dựng lưới 3 cột; hơn 3 card sẽ để một card lẻ hàng nên chỉ lấy 3 sản phẩm đầu. */
export const FEATURED_LIMIT = 3;

/** Giá chính thức (đồng) hoặc lời mời liên hệ khi chưa có giá. Không bao giờ tự tạo giá. */
export function formatPrice(price: number | null): string {
  if (price === null) return "Liên hệ để biết giá";
  return `${new Intl.NumberFormat("vi-VN").format(price)} đ`;
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

const ACTION_CLASS =
  "flex min-h-11 items-center justify-center px-1 text-center whitespace-nowrap text-[0.76rem] leading-tight font-bold tracking-[0.1em] uppercase no-underline transition-colors duration-300 ease-son";

/** Card sản phẩm chép từ `.card` của bản mẫu B: giấy viền đôi, ảnh vòm cung, chữ căn giữa, 2 nút cạnh nhau. */
function FeaturedProductCard({ product }: { product: Product }) {
  const orderHref = siteConfig.orderChannelUrl;
  const external = isExternal(orderHref);
  return (
    <article className="group flex h-full flex-col border border-line bg-paper px-3 pt-3 pb-5 outline-1 outline-offset-4 outline-line outline-solid transition-[transform,box-shadow] duration-[400ms] ease-son hover:-translate-y-1.5 hover:shadow-card motion-reduce:hover:translate-y-0">
      <div className="arch-top relative aspect-[4/4.4]">
        <ImageWithFallback
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
          className="object-cover transition-transform duration-[800ms] ease-son group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        {product.imageIsIllustration ? (
          // Trùng vị trí và kiểu chữ với nhãn của ImagePlaceholder, nên khi ảnh chưa có hai nhãn chồng khít lên nhau.
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-3 mx-auto w-fit max-w-[90%] bg-be/95 px-2.5 py-1 text-center text-[0.68rem] leading-snug tracking-[0.06em] text-ink-soft"
          >
            {ILLUSTRATION_LABEL}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col px-2 pt-[18px] text-center">
        <p className="m-0 text-[0.68rem] font-bold tracking-[0.24em] text-dong uppercase">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="my-2 text-[1.35rem] leading-[1.12] font-bold text-son">{product.name}</h3>
        <p className="mt-0 mb-4 text-[0.95rem] text-ink-soft">{product.shortDescription}</p>
        <p className="mt-auto mb-0 border-t border-dashed border-line pt-3 text-[0.9rem] text-ink-soft italic">
          {formatPrice(product.price)}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href={sectionHref("san-pham")}
            className={`${ACTION_CLASS} border border-gac text-gac hover:bg-gac hover:text-be`}
            aria-label={`Xem chi tiết ${product.name}`}
          >
            Xem chi tiết
          </a>
          <a
            href={orderHref}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`${ACTION_CLASS} bg-gac text-be hover:bg-gac-deep`}
            aria-label={`Liên hệ đặt hàng ${product.name}`}
          >
            Liên hệ đặt hàng
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * Sản phẩm nổi bật trên trang chủ (khối "Thức quà chọn lọc" của bản mẫu B). Mảng rỗng thì không render gì.
 * "Xem chi tiết" cuộn tới mục Sản phẩm (#san-pham), nơi phase 03 mở modal chi tiết.
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
              <FeaturedProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
