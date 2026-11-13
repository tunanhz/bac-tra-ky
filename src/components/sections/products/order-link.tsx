"use client";

import type { MouseEvent, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { isExternalUrl, sectionIdFromHref } from "@/lib/format";

type OrderLinkProps = {
  className?: string;
  children?: ReactNode;
  /** Tên sản phẩm — đưa vào nhãn đọc màn hình để phân biệt các nút giống chữ. */
  productName?: string;
  /** Gọi trước khi điều hướng tới section (vd. đóng modal). */
  onNavigate?: () => void;
  /** Kênh đặt hàng; mặc định `siteConfig.orderChannelUrl` (mặc định `/#lien-he`). */
  href?: string;
};

/** Focus tiêu đề của section (theo `aria-labelledby`, nếu không có thì chính section) mà không cuộn thêm. */
export function focusSectionHeading(section: HTMLElement) {
  const headingId = section.getAttribute("aria-labelledby");
  const heading = (headingId && document.getElementById(headingId)) || section;
  if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

/**
 * Nút "Liên hệ đặt hàng" → kênh đặt hàng cấu hình.
 * - URL ngoài: mở tab mới an toàn.
 * - Section trên trang chủ (`/#lien-he`) mà có `onNavigate` (đang trong modal): chặn điều hướng mặc định, đóng modal
 *   trước rồi mới cuộn — nếu không, modal trả focus về nút "Xem chi tiết" và kéo trang ngược lên card.
 */
export function OrderLink({
  className,
  children = "Liên hệ đặt hàng",
  productName,
  onNavigate,
  href = siteConfig.orderChannelUrl,
}: OrderLinkProps) {
  const label = productName ? `Liên hệ đặt hàng: ${productName}` : undefined;

  if (isExternalUrl(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
        {children}
      </a>
    );
  }

  const sectionId = sectionIdFromHref(href);
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) return;
    onNavigate();
    const target = sectionId ? document.getElementById(sectionId) : null;
    if (!target) return; // không ở trang chủ → để trình duyệt điều hướng bình thường
    event.preventDefault();
    // Chờ modal đóng và trả focus xong rồi mới cuộn tới section, sau đó đưa focus tới tiêu đề section để người dùng
    // bàn phím / trình đọc màn hình không bị kẹt lại ở nút "Xem chi tiết" phía trên.
    window.setTimeout(() => {
      target.scrollIntoView?.({ block: "start" });
      history.replaceState(null, "", `#${sectionId}`);
      focusSectionHeading(target);
    }, 60);
  };

  return (
    <a href={href} className={className} aria-label={label} onClick={onClick}>
      {children}
    </a>
  );
}
