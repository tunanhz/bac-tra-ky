import { NextResponse } from "next/server";
import {
  CONTACT_NOT_READY_MESSAGE,
  HONEYPOT_FIELD,
  validateContact,
  type ContactApiResponse,
} from "@/lib/contact";

/*
 * POST /api/contact
 *
 * Giai đoạn frontend (chưa có backend lưu dữ liệu): kiểm dữ liệu rồi trả 501 kèm thông báo trung thực.
 * KHÔNG bao giờ trả thành công khi chưa thực sự lưu được (spec mục 6). Phase 05 thay nhánh 501 bằng lưu MongoDB
 * → 201 khi `insertOne` thành công, 503 khi lỗi DB.
 *
 *   400 — JSON hỏng, bị honeypot chặn, hoặc dữ liệu sai (kèm `fieldErrors`)
 *   413 — thân yêu cầu quá lớn
 *   501 — dữ liệu hợp lệ nhưng chức năng gửi trực tuyến chưa hoạt động
 */

const MAX_BODY_BYTES = 10_000;

function json(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Nội dung gửi quá dài." }, 413);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, error: "Không đọc được dữ liệu gửi lên." }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Nội dung gửi quá dài." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ." }, 400);
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ." }, 400);
  }

  const honeypot = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  if (typeof honeypot === "string" ? honeypot.trim() !== "" : honeypot != null) {
    return json({ ok: false, error: "Yêu cầu không hợp lệ." }, 400);
  }

  const result = validateContact(body);
  if (!result.success) {
    return json(
      { ok: false, error: "Vui lòng kiểm tra lại thông tin đã nhập.", fieldErrors: result.fieldErrors },
      400,
    );
  }

  return json({ ok: false, error: CONTACT_NOT_READY_MESSAGE }, 501);
}
