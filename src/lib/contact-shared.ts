/*
 * Phần dùng chung của form liên hệ KHÔNG phụ thuộc zod: tên trường, kiểu lỗi, thông báo, kiểu phản hồi API.
 * Form client nhập file này ngay khi tải; schema zod (`./contact.ts`) chỉ nạp khi người dùng bắt đầu nhập/gửi —
 * bớt ~25 KB JS (gzip) trên đường tải đầu trang.
 */

export const CONTACT_FIELDS = ["name", "phone", "email", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

/** Lỗi theo từng trường: mỗi trường tối đa một thông báo (thông báo đầu tiên). */
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/** Tên trường bẫy spam (ẩn với người dùng; bot điền vào thì bị chặn). */
export const HONEYPOT_FIELD = "website";

/** Thông báo trung thực khi chưa có backend nhận dữ liệu (API trả 501). */
export const CONTACT_NOT_READY_MESSAGE =
  "Chức năng gửi trực tuyến đang được hoàn thiện. Vui lòng nhắn cho Bác Trà Ký qua Facebook.";

/** Thông báo khi gửi lỗi (mạng/máy chủ). */
export const CONTACT_FAILED_MESSAGE = "Chưa gửi được, vui lòng thử lại hoặc nhắn cho Bác Trà Ký qua Facebook.";

/** Thân phản hồi của `POST /api/contact`. */
export type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors };
