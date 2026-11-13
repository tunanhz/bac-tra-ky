"use client";

import type { CSSProperties } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { ILLUSTRATION_LABEL } from "@/components/ui/image-placeholder";
import { PRODUCT_CATEGORY_LABELS } from "@/data/products";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/cn";
import { OrderLink } from "./order-link";
import { formatPrice } from "./product-format";

type ProductCardProps = {
  product: Product;
  /** Mở modal chi tiết; nhận nút đã bấm để modal trả focus về đúng chỗ. */
  onOpenDetail: (product: Product) => void;
  className?: string;
  style?: CSSProperties;
};

/** Hai nút cuối card — chép từ `.card .actions` của bản mẫu B. */
export const CARD_ACTION =
  "flex min-h-11 items-center justify-center px-2 text-center text-[0.76rem] leading-tight font-bold tracking-[0.1em] uppercase no-underline transition-colors duration-300 ease-son";
export const CARD_ACTION_DETAIL = "cursor-pointer border border-gac bg-transparent text-gac hover:bg-gac hover:text-be";
export const CARD_ACTION_ORDER = "border border-gac bg-gac text-be hover:border-gac-deep hover:bg-gac-deep";

/**
 * Card sản phẩm hướng B (`.card` của design-preview-b): tấm giấy viền đôi, ảnh vòm cung 4:4.4, nhãn ảnh minh hoạ,
 * chữ căn giữa, giá (null → "Liên hệ để biết giá") trên đường kẻ đứt, 2 nút cạnh nhau.
 * Hover: nhấc 6px + bóng sơn son, ảnh phóng 1.05 chậm.
 */
export function ProductCard({ product, onOpenDetail, className, style }: ProductCardProps) {
  const categoryLabel = PRODUCT_CATEGORY_LABELS[product.category];
  return (
    <article
      style={style}
      className={cn(
        "group flex flex-col border border-line bg-paper px-3 pt-3 pb-5 outline outline-offset-4 outline-line",
        "transition-[transform,box-shadow] duration-400 ease-son hover:-translate-y-1.5 hover:shadow-card",
        "motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="arch-top relative aspect-[4/4.4]">
        <ImageWithFallback
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-800 ease-son group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        {product.imageIsIllustration ? (
          <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-be/95 px-2.5 py-1 text-[0.62rem] leading-snug tracking-[0.06em] whitespace-nowrap text-ink-soft">
            {ILLUSTRATION_LABEL}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4.5 text-center">
        <p className="m-0 text-[0.68rem] font-bold tracking-[0.24em] text-dong uppercase">{categoryLabel}</p>
        <h3 className="my-2 text-[1.35rem] font-bold text-son">{product.name}</h3>
        <p className="mt-0 mb-4 text-[0.95rem] text-ink-soft">{product.shortDescription}</p>
        <p className="mt-auto mb-0 border-t border-dashed border-line pt-3 text-[0.9rem] text-ink-soft italic">
          {formatPrice(product.price)}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            className={cn(CARD_ACTION, CARD_ACTION_DETAIL)}
            aria-haspopup="dialog"
            aria-label={`Xem chi tiết: ${product.name}`}
            onClick={() => onOpenDetail(product)}
          >
            Xem chi tiết
          </button>
          <OrderLink className={cn(CARD_ACTION, CARD_ACTION_ORDER)} productName={product.name} />
        </div>
      </div>
    </article>
  );
}
