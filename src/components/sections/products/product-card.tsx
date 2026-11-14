import type { CSSProperties, ReactNode } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { IllustrationTag } from "@/components/ui/illustration-tag";
import { PRODUCT_CATEGORY_LABELS } from "@/data/products";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { OrderLink } from "./order-link";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
  /**
   * Nút "Xem chi tiết" (ô trái hàng nút). Danh mục truyền `<button>` mở modal; Sản phẩm nổi bật truyền liên kết tới
   * danh mục. Dùng class `CARD_ACTION` + `CARD_ACTION_DETAIL` cho đồng bộ.
   */
  detailAction: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Hai nút cuối card — chép từ `.card .actions` của bản mẫu B (không đệm ngang, chữ 0.76rem giãn 0.1em từ 1280px).
 * Card hẹp hơn (mobile, lưới 2–3 cột ở 768–1279px) giãn chữ ít hơn để "Liên hệ đặt hàng" nằm trên một dòng, hai nút
 * cao đều.
 */
export const CARD_ACTION =
  "flex min-h-11 items-center justify-center px-0.5 text-center text-[0.72rem] leading-tight font-bold tracking-[0.04em] uppercase no-underline transition-colors duration-300 ease-son lg:text-[0.68rem] lg:tracking-[0.02em] xl:text-[0.76rem] xl:tracking-[0.1em]";
export const CARD_ACTION_DETAIL = "cursor-pointer border border-gac bg-transparent text-gac hover:bg-gac hover:text-be";
export const CARD_ACTION_ORDER = "border border-gac bg-gac text-be hover:border-gac-deep hover:bg-gac-deep";

/**
 * Card sản phẩm hướng B (`.card` của design-preview-b) — dùng chung cho Sản phẩm nổi bật (trang chủ) và Danh mục:
 * tấm giấy viền đôi, ảnh bao bì nguyên khung hoặc ảnh minh hoạ có nhãn, chữ căn giữa, giá (null → "Liên hệ để biết giá") trên
 * đường kẻ đứt, 2 nút cạnh nhau. Hover: nhấc 6px + bóng sơn son, ảnh phóng 1.05 chậm.
 */
export function ProductCard({ product, featured, detailAction, className, style }: ProductCardProps) {
  return (
    <article
      style={style}
      className={cn(
        "group flex h-full flex-col border border-line bg-paper px-3 pt-3 pb-5 outline outline-offset-4 outline-line",
        "transition-[transform,box-shadow] duration-400 ease-son hover:-translate-y-1.5 hover:shadow-card",
        "motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className={cn("relative aspect-[4/3] overflow-hidden", product.imageIsIllustration ? "arch-top" : "rounded-sm bg-be-2")}>
        <ImageWithFallback
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes={`(min-width: 1200px) 340px, (min-width: 1024px) calc(33vw - 50px), (min-width: 768px) calc(50vw - 60px), ${featured ? "calc(85vw - 60px)" : "calc(100vw - 66px)"}`}
          className={cn(
            "transition-transform duration-800 ease-son",
            product.imageIsIllustration
              ? "object-cover group-hover:scale-105 motion-reduce:group-hover:scale-100"
              : "object-contain",
          )}
        />
        {product.imageIsIllustration ? (
          <IllustrationTag />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col px-1 pt-4 text-center md:px-2 md:pt-4.5">
        {/* Nhịp dọc theo bản B: mọi <p> trong card cách dưới 1rem (`p{margin:0 0 1rem}`). */}
        <p className="mt-0 mb-4 text-[0.68rem] font-bold tracking-[0.24em] text-dong uppercase">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="my-2 text-[1.35rem] leading-[1.12] font-bold text-son">{product.name}</h3>
        <p className="mt-0 mb-4 text-[0.95rem] text-ink-soft">{product.shortDescription}</p>
        <p className="mt-auto mb-4 border-t border-dashed border-line pt-3 text-[0.9rem] text-ink-soft italic">
          {formatPrice(product.price)}
        </p>
        {/* ≤345px (iPhone SE đời đầu 320px): xếp dọc để "Liên hệ đặt hàng" nằm gọn một dòng; từ 346px vẫn 2 nút cạnh nhau như bản B. */}
        <div className="mt-3 grid grid-cols-2 gap-2 max-[345px]:grid-cols-1">
          {detailAction}
          <OrderLink className={cn(CARD_ACTION, CARD_ACTION_ORDER)} productName={product.name} />
        </div>
      </div>
    </article>
  );
}
