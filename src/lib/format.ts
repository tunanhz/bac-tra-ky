/** Định dạng giá và nhận dạng liên kết — dùng chung cho mọi card/modal/nút (một bản duy nhất). */

/** Chữ hiển thị khi chưa có giá chính thức (`price: null`). */
export const PRICE_ON_REQUEST = "Liên hệ để biết giá";

const VND = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });

/** Giá hiển thị. Không có giá chính thức (null hoặc số không hợp lệ) → "Liên hệ để biết giá". Không bao giờ tự tạo giá. */
export function formatPrice(price: number | null): string {
  if (price === null || !Number.isFinite(price) || price < 0) return PRICE_ON_REQUEST;
  return VND.format(price);
}

/** Liên kết ngoài (http/https) → mở tab mới. */
export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Lấy id section từ đường dẫn nội bộ dạng `/#id` hoặc `#id`; không phải dạng đó → `null`. */
export function sectionIdFromHref(href: string): string | null {
  const match = /^\/?#([\w-]+)$/.exec(href);
  return match ? match[1] : null;
}
