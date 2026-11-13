import { describe, expect, it } from "vitest";
import { CONTACT_NOT_READY_MESSAGE } from "@/lib/contact";
import { POST } from "./route";

const valid = {
  name: "Nguyễn Văn An",
  phone: "0912345678",
  email: "an@example.com",
  message: "Tôi muốn đặt hộp 6 bánh làm quà.",
};

function post(body: unknown, init: RequestInit = {}) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
      ...init,
    }),
  );
}

describe("POST /api/contact", () => {
  it("trả 501 với thông báo trung thực khi dữ liệu hợp lệ (chưa có backend, không báo thành công)", async () => {
    const res = await post(valid);
    expect(res.status).toBe(501);
    const body = await res.json();
    expect(body).toEqual({ ok: false, error: CONTACT_NOT_READY_MESSAGE });
  });

  it("chấp nhận honeypot rỗng", async () => {
    const res = await post({ ...valid, website: "" });
    expect(res.status).toBe(501);
  });

  it("trả 400 kèm lỗi từng trường khi dữ liệu sai", async () => {
    const res = await post({ ...valid, phone: "123", email: "sai" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(Object.keys(body.fieldErrors).sort()).toEqual(["email", "phone"]);
  });

  it("chặn khi honeypot có giá trị", async () => {
    const res = await post({ ...valid, website: "http://spam.example" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ ok: false, error: "Yêu cầu không hợp lệ." });
  });

  it("trả 400 khi JSON hỏng", async () => {
    const res = await post("{khong-phai-json");
    expect(res.status).toBe(400);
  });

  it.each([null, [1, 2], "chuỗi", 42])("trả 400 khi thân yêu cầu là %j", async (body) => {
    const res = await post(JSON.stringify(body));
    expect(res.status).toBe(400);
  });

  it("trả 413 khi thân yêu cầu quá lớn", async () => {
    const res = await post({ ...valid, message: "x".repeat(20_000) });
    expect(res.status).toBe(413);
  });
});
