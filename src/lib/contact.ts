import { z } from "zod";
import { CONTACT_FIELDS, type ContactField, type ContactFieldErrors } from "./contact-shared";

// Hằng số/kiểu dùng chung (không kéo zod) — form nạp file này ngay, chỉ nạp schema zod khi cần kiểm.
export * from "./contact-shared";

/*
 * Kiểm dữ liệu form liên hệ — dùng chung client (form) và server (`/api/contact`).
 * Thông báo lỗi tiếng Việt, hiện ngay dưới từng trường.
 */


/** Bỏ khoảng trắng, dấu chấm, gạch, ngoặc mà người dùng hay gõ khi nhập SĐT. */
export function normalizePhone(value: string): string {
  return value.replace(/[\s.\-()]/g, "");
}

const VN_PHONE = /^(0|\+84)\d{9,10}$/;

export const contactSchema = z.object({
  name: z
    .string({ error: "Vui lòng nhập họ và tên." })
    .trim()
    .min(1, { error: "Vui lòng nhập họ và tên." })
    .min(2, { error: "Họ và tên cần ít nhất 2 ký tự." })
    .max(100, { error: "Họ và tên tối đa 100 ký tự." }),
  phone: z
    .string({ error: "Vui lòng nhập số điện thoại." })
    .trim()
    .min(1, { error: "Vui lòng nhập số điện thoại." })
    .transform(normalizePhone)
    .pipe(z.string().regex(VN_PHONE, { error: "Số điện thoại chưa đúng (ví dụ: 0912345678 hoặc +84912345678)." })),
  email: z
    .string({ error: "Vui lòng nhập email." })
    .trim()
    .min(1, { error: "Vui lòng nhập email." })
    .pipe(z.email({ error: "Email chưa đúng định dạng (ví dụ: ten@example.com)." })),
  message: z
    .string({ error: "Vui lòng nhập nội dung." })
    .trim()
    .min(1, { error: "Vui lòng nhập nội dung." })
    .min(10, { error: "Nội dung cần ít nhất 10 ký tự." })
    .max(2000, { error: "Nội dung tối đa 2000 ký tự." }),
});

export type ContactInput = z.infer<typeof contactSchema>;


export type ContactValidationResult =
  | { success: true; data: ContactInput }
  | { success: false; fieldErrors: ContactFieldErrors };

export function validateContact(input: unknown): ContactValidationResult {
  const result = contactSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };

  const fieldErrors: ContactFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && (CONTACT_FIELDS as readonly string[]).includes(field)) {
      const key = field as ContactField;
      fieldErrors[key] ??= issue.message;
    }
  }
  return { success: false, fieldErrors };
}

