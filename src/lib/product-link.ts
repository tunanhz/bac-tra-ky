/**
 * Mở modal chi tiết của một sản phẩm từ chỗ khác trên trang (vd. "Xem chi tiết" ở Sản phẩm nổi bật).
 *
 * - Trên trang chủ có JS: nút phát sự kiện `OPEN_PRODUCT_EVENT` (detail = slug); danh mục (#san-pham) nghe, cuộn tới
 *   card rồi mở modal. URL không đổi.
 * - Không JS / mở link ở tab mới / từ trang khác: `/?sp=<slug>#san-pham` — danh mục đọc `sp` khi tải xong rồi mở modal;
 *   đóng modal thì xoá `sp` khỏi URL.
 */

export const PRODUCT_QUERY_PARAM = "sp";

export const OPEN_PRODUCT_EVENT = "btk:open-product";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Đường dẫn mở thẳng modal chi tiết của sản phẩm. */
export function productDetailHref(slug: string): string {
  return `/?${PRODUCT_QUERY_PARAM}=${encodeURIComponent(slug)}#san-pham`;
}

/** Đọc slug sản phẩm từ query (`?sp=...`); thiếu hoặc sai dạng slug → `null`. */
export function readProductSlug(search: string): string | null {
  const value = new URLSearchParams(search).get(PRODUCT_QUERY_PARAM)?.trim();
  return value && SLUG.test(value) ? value : null;
}

/** Bỏ `sp` khỏi URL hiện tại (giữ đường dẫn, query khác và hash). */
export function urlWithoutProductSlug(location: Pick<Location, "pathname" | "search" | "hash">): string {
  const params = new URLSearchParams(location.search);
  params.delete(PRODUCT_QUERY_PARAM);
  const query = params.toString();
  return `${location.pathname}${query ? `?${query}` : ""}${location.hash}`;
}
