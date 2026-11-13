/**
 * Khởi động hiệu ứng scroll reveal mà không làm mất nội dung khi không có JS.
 *
 * `REVEAL_BOOT_SCRIPT` chạy inline trong `<head>` (trước khi vẽ trang): gắn class `js` lên `<html>` để CSS ẩn các
 * khối `.reveal` chờ hiện dần. Nếu sau `REVEAL_FALLBACK_MS` mà mã của `<Reveal>` vẫn chưa nạp (chunk JS lỗi/bị chặn),
 * script gỡ class `js` để mọi nội dung hiện ra. Không có JS thì script không chạy nên nội dung hiện ngay.
 */

/** Cờ trên `window` do module `reveal.tsx` đặt khi đã nạp. */
export const REVEAL_READY_FLAG = "__btkRevealReady";

export const REVEAL_FALLBACK_MS = 4000;

export const REVEAL_BOOT_SCRIPT = `(function(d){d.classList.add("js");setTimeout(function(){if(!window.${REVEAL_READY_FLAG})d.classList.remove("js")},${REVEAL_FALLBACK_MS})})(document.documentElement);`;
