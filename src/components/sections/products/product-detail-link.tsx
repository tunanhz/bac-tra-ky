"use client";

import type { MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { OPEN_PRODUCT_EVENT, productDetailHref } from "@/lib/product-link";
import { CARD_ACTION, CARD_ACTION_DETAIL } from "./product-card";

/**
 * "Xem chi tiết" ở Sản phẩm nổi bật: mở thẳng modal chi tiết của đúng sản phẩm trong danh mục (#san-pham).
 * Có danh mục trên trang → phát `OPEN_PRODUCT_EVENT`, URL giữ sạch. Không thì (không JS, mở tab mới…) đi theo
 * `href` `/?sp=<slug>#san-pham` và danh mục tự mở modal khi tải xong.
 */
export function ProductDetailLink({ slug, productName }: { slug: string; productName: string }) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return; // mở tab/cửa sổ mới → để trình duyệt xử lý theo href
    }
    if (!document.getElementById("san-pham")) return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent<string>(OPEN_PRODUCT_EVENT, { detail: slug }));
  };

  return (
    <a
      href={productDetailHref(slug)}
      className={cn(CARD_ACTION, CARD_ACTION_DETAIL)}
      aria-haspopup="dialog"
      aria-label={`Xem chi tiết: ${productName}`}
      onClick={onClick}
    >
      Xem chi tiết
    </a>
  );
}
