import { describe, expect, it } from "vitest";
import { contactSchema, normalizePhone, validateContact } from "./contact";

const valid = {
  name: "Nguyễn Văn An",
  phone: "0912345678",
  email: "an@example.com",
  message: "Tôi muốn đặt hộp 6 bánh làm quà.",
};

describe("contactSchema", () => {
  it("nhận dữ liệu hợp lệ và cắt khoảng trắng", () => {
    const result = contactSchema.safeParse({ ...valid, name: "  Nguyễn Văn An  ", email: " an@example.com " });
    expect(result.success).toBe(true);
    expect(result.data).toEqual(valid);
  });

  it.each(["0912345678", "+84912345678", "0912 345 678", "091.234.5678", "02412345678"])(
    "nhận số điện thoại Việt Nam %s",
    (phone) => {
      expect(contactSchema.safeParse({ ...valid, phone }).success).toBe(true);
    },
  );

  it("chuẩn hoá SĐT về dạng chỉ chữ số", () => {
    const result = contactSchema.parse({ ...valid, phone: "0912 345-678" });
    expect(result.phone).toBe("0912345678");
    expect(normalizePhone("(+84) 912.345.678")).toBe("+84912345678");
  });
});

describe("validateContact", () => {
  it("trả data khi hợp lệ", () => {
    expect(validateContact(valid)).toEqual({ success: true, data: valid });
  });

  it.each([
    ["name", "", "Vui lòng nhập họ và tên."],
    ["name", "   ", "Vui lòng nhập họ và tên."],
    ["name", "A", "Họ và tên cần ít nhất 2 ký tự."],
    ["name", "a".repeat(101), "Họ và tên tối đa 100 ký tự."],
    ["phone", "", "Vui lòng nhập số điện thoại."],
    ["phone", "12345", "Số điện thoại chưa đúng (ví dụ: 0912345678 hoặc +84912345678)."],
    ["phone", "091234567a", "Số điện thoại chưa đúng (ví dụ: 0912345678 hoặc +84912345678)."],
    ["email", "", "Vui lòng nhập email."],
    ["email", "khong-phai-email", "Email chưa đúng định dạng (ví dụ: ten@example.com)."],
    ["message", "", "Vui lòng nhập nội dung."],
    ["message", "ngắn", "Nội dung cần ít nhất 10 ký tự."],
    ["message", "x".repeat(2001), "Nội dung tối đa 2000 ký tự."],
  ] as const)("từ chối %s = %j với thông báo tiếng Việt", (field, value, message) => {
    const result = validateContact({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors[field]).toBe(message);
      expect(Object.keys(result.fieldErrors)).toEqual([field]);
    }
  });

  it("báo lỗi mọi trường khi thiếu dữ liệu", () => {
    const result = validateContact({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors).toEqual({
        name: "Vui lòng nhập họ và tên.",
        phone: "Vui lòng nhập số điện thoại.",
        email: "Vui lòng nhập email.",
        message: "Vui lòng nhập nội dung.",
      });
    }
  });

  it("từ chối dữ liệu không phải object", () => {
    expect(validateContact(null).success).toBe(false);
    expect(validateContact("chuỗi").success).toBe(false);
  });
});
