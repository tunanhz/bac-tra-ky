"use client";

import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { ILLUSTRATION_LABEL } from "@/components/ui/image-placeholder";
import { buttonClassName } from "@/components/ui/button";
import { PRODUCT_CATEGORY_LABELS } from "@/data/products";
import type { Product } from "@/lib/types";
import { OrderLink } from "./order-link";
import { formatPrice } from "@/lib/format";

type ProductDetailProps = {
  product: Product;
  /** Đóng modal trước khi cuộn tới mục Liên hệ. */
  onClose: () => void;
};

/**
 * Nội dung modal chi tiết (design-direction 4.6): ảnh 1:1 trái, chữ phải trên desktop; mobile ảnh trên, nút
 * "Liên hệ đặt hàng" dính đáy. Chỉ hiển thị đúng dữ liệu có trong `Product` — không thêm thông tin ngoài dữ liệu.
 */
export function ProductDetail({ product, onClose }: ProductDetailProps) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="relative aspect-square bg-be-2 md:m-4 md:mr-0">
        <ImageWithFallback
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 768px) 460px, 100vw"
          className="object-cover"
        />
        {product.imageIsIllustration ? (
          <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-be/95 px-2.5 py-1 text-[0.62rem] leading-snug tracking-[0.06em] whitespace-nowrap text-ink-soft">
            {ILLUSTRATION_LABEL}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col px-6 pt-7 md:px-10 md:pt-14 md:pb-10">
        <p className="eyebrow m-0">{PRODUCT_CATEGORY_LABELS[product.category]}</p>
        <h3 className="mt-3 mb-5 text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] font-bold tracking-[0.02em] text-son">
          {product.name}
        </h3>
        {product.description.map((paragraph) => (
          <p key={paragraph} className="mt-0 mb-4 text-ink-soft">
            {paragraph}
          </p>
        ))}
        <p className="mt-2 mb-0 border-t border-dashed border-line pt-4 text-ink-soft">
          <span className="font-bold text-ink">Giá: </span>
          <span className="italic">{formatPrice(product.price)}</span>
        </p>
        {/* Mobile: dính đáy vùng cuộn của modal; desktop: nằm cuối cột chữ. */}
        <div className="sticky bottom-0 -mx-6 mt-6 border-t border-line bg-be/95 px-6 py-4 md:static md:mx-0 md:mt-8 md:border-0 md:bg-transparent md:p-0">
          <OrderLink className={buttonClassName("primary", true)} onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
