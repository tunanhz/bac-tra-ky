"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  CONTACT_FAILED_MESSAGE,
  CONTACT_FIELDS,
  CONTACT_NOT_READY_MESSAGE,
  HONEYPOT_FIELD,
  type ContactApiResponse,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact-shared";
import { cn } from "@/lib/cn";
import { FacebookButton } from "./facebook-button";

/** Thông báo chỉ hiện khi API trả 201 (đã lưu thật — phase 05). API hiện tại không bao giờ trả 201. */
export const CONTACT_SUCCESS_MESSAGE = "Bác Trà Ký đã nhận lời nhắn của bạn và sẽ liên hệ lại sớm.";

/** Hết thời gian chờ máy chủ → coi như lỗi mạng. */
const REQUEST_TIMEOUT_MS = 15_000;

/**
 * Nạp schema zod (`@/lib/contact`) theo nhu cầu — lần đầu người dùng chạm vào form hoặc bấm gửi — để zod không nằm
 * trên đường tải đầu trang. Promise được nhớ lại; nạp lỗi (mạng) thì lần sau thử lại.
 */
let validatorPromise: Promise<typeof import("@/lib/contact").validateContact> | null = null;
function loadValidator() {
  validatorPromise ??= import("@/lib/contact").then(
    (module) => module.validateContact,
    (error: unknown) => {
      validatorPromise = null;
      throw error;
    },
  );
  return validatorPromise;
}

type Values = Record<ContactField, string>;
const EMPTY: Values = { name: "", phone: "", email: "", message: "" };

/**
 * Trạng thái gửi:
 * - `not-ready`: API trả 501 (chưa có backend) → thông báo trung thực + nút Facebook.
 * - `failed`: lỗi mạng / hết giờ / 5xx / mã lạ → thông báo thất bại + nút Facebook.
 * - `sent`: CHỈ khi API trả 201.
 */
export type SubmitStatus = "idle" | "sending" | "not-ready" | "failed" | "sent";

export type SubmitOutcome =
  | { status: "sent" | "not-ready" | "failed" }
  | { status: "invalid"; fieldErrors: ContactFieldErrors };

/** Diễn giải phản hồi `POST /api/contact` thành kết quả hiển thị. Tách riêng để test được. */
export function interpretContactResponse(status: number, body: ContactApiResponse | null): SubmitOutcome {
  if (status === 201 && body?.ok === true) return { status: "sent" };
  if (status === 501) return { status: "not-ready" };
  if (status === 400 && body && body.ok === false && body.fieldErrors && Object.keys(body.fieldErrors).length > 0) {
    return { status: "invalid", fieldErrors: body.fieldErrors };
  }
  return { status: "failed" };
}

async function readJson(response: Response): Promise<ContactApiResponse | null> {
  try {
    return (await response.json()) as ContactApiResponse;
  } catch {
    return null;
  }
}

const FIELD_META: Record<ContactField, { label: string; type: string; autoComplete: string; inputMode?: "tel" | "email" }> = {
  name: { label: "Họ và tên", type: "text", autoComplete: "name" },
  phone: { label: "Số điện thoại", type: "tel", autoComplete: "tel", inputMode: "tel" },
  email: { label: "Email", type: "email", autoComplete: "email", inputMode: "email" },
  message: { label: "Nội dung", type: "textarea", autoComplete: "off" },
};

const INPUT_CLASS =
  "block w-full border border-line bg-be px-3.5 py-3 font-body text-base text-ink transition-colors duration-300 ease-son placeholder:text-muted/70 hover:border-dong/60 focus:border-gac focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gac aria-invalid:border-gac";

type ContactFormProps = {
  /** URL Facebook cho nút "Nhắn qua Facebook"; mặc định `siteConfig.facebookUrl`. */
  facebookUrl?: string | null;
  /** Endpoint nhận form. */
  endpoint?: string;
};

/**
 * Form liên hệ: kiểm bằng `validateContact` (zod) ở client, lỗi dưới từng trường (`aria-invalid`,
 * `aria-describedby`), focus ô lỗi đầu tiên; honeypot ẩn; khoá nút khi đang gửi.
 * Không bao giờ báo thành công trừ khi API trả 201.
 */
export function ContactForm({ facebookUrl = siteConfig.facebookUrl, endpoint = "/api/contact" }: ContactFormProps) {
  const baseId = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const fieldId = (field: ContactField) => `${baseId}-${field}`;
  const errorId = (field: ContactField) => `${baseId}-${field}-error`;

  const focusFirstError = (fieldErrors: ContactFieldErrors) => {
    const first = CONTACT_FIELDS.find((field) => fieldErrors[field]);
    if (first) document.getElementById(fieldId(first))?.focus();
  };

  const onChange = (field: ContactField, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    // Sửa ô nào thì xoá lỗi ô đó; lỗi mới sẽ kiểm lại khi gửi.
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    let validateContact: Awaited<ReturnType<typeof loadValidator>>;
    try {
      validateContact = await loadValidator();
    } catch {
      setStatus("failed");
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }
    const result = validateContact(values);
    if (!result.success) {
      setErrors(result.fieldErrors);
      setStatus("idle");
      focusFirstError(result.fieldErrors);
      return;
    }

    setErrors({});
    setStatus("sending");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let outcome: SubmitOutcome;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...result.data, [HONEYPOT_FIELD]: honeypot }),
        signal: controller.signal,
      });
      outcome = interpretContactResponse(response.status, await readJson(response));
    } catch {
      outcome = { status: "failed" };
    } finally {
      window.clearTimeout(timer);
    }

    if (outcome.status === "invalid") {
      setErrors(outcome.fieldErrors);
      setStatus("idle");
      focusFirstError(outcome.fieldErrors);
      return;
    }
    setStatus(outcome.status);
    if (outcome.status === "sent") setValues(EMPTY);
    // Đưa người dùng (và trình đọc màn hình) tới hộp thông báo.
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const sending = status === "sending";

  return (
    <form
      noValidate
      onFocus={() => void loadValidator().catch(() => undefined)}
      onSubmit={onSubmit}
      aria-busy={sending}
      aria-label="Gửi lời nhắn cho Bác Trà Ký"
      className="space-y-5"
    >
      {CONTACT_FIELDS.map((field) => {
        const meta = FIELD_META[field];
        const error = errors[field];
        const common = {
          id: fieldId(field),
          name: field,
          value: values[field],
          required: true,
          autoComplete: meta.autoComplete,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId(field) : undefined,
          className: INPUT_CLASS,
          disabled: sending,
        };
        return (
          <div key={field}>
            <label htmlFor={fieldId(field)} className="mb-1.5 block text-[0.78rem] font-bold tracking-[0.14em] text-ink uppercase">
              {meta.label} <span className="text-gac" aria-hidden="true">*</span>
            </label>
            {meta.type === "textarea" ? (
              <textarea {...common} rows={5} className={cn(common.className, "min-h-32 resize-y")} onChange={(e) => onChange(field, e.target.value)} />
            ) : (
              <input {...common} type={meta.type} inputMode={meta.inputMode} onChange={(e) => onChange(field, e.target.value)} />
            )}
            {error ? (
              <p id={errorId(field)} className="mt-1.5 mb-0 text-[0.9rem] text-gac">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Honeypot: ẩn khỏi người dùng và trình đọc màn hình; bot điền vào thì API từ chối. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${baseId}-${HONEYPOT_FIELD}`}>Để trống ô này</label>
        <input
          id={`${baseId}-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" disabled={sending} aria-disabled={sending}>
          {sending ? "Đang gửi…" : "Gửi liên hệ"}
        </Button>
        <p className="m-0 text-[0.85rem] text-ink-soft italic">
          <span className="text-gac" aria-hidden="true">*</span> Thông tin bắt buộc
        </p>
      </div>

      {/* Không đặt aria-live ở đây: hộp con đã có role status/alert và được focus — đặt thêm sẽ bị đọc hai lần. */}
      <div ref={statusRef} tabIndex={-1} className="outline-none">
        {status === "not-ready" || status === "failed" || status === "sent" ? (
          <div
            role={status === "failed" ? "alert" : "status"}
            className={cn(
              "border px-5 py-4",
              status === "sent" ? "border-dong/60 bg-dong/10" : status === "failed" ? "border-gac/50 bg-gac/5" : "border-dong/50 bg-be",
            )}
          >
            <p className={cn("mt-0 mb-3.5", status === "sent" ? "text-son font-semibold" : status === "failed" ? "text-gac" : "text-ink")}>
              {status === "sent" ? CONTACT_SUCCESS_MESSAGE : status === "failed" ? CONTACT_FAILED_MESSAGE : CONTACT_NOT_READY_MESSAGE}
            </p>
            <FacebookButton
              url={facebookUrl}
              variant={status === "sent" ? "outline" : "primary"}
              className="w-full py-2.5 leading-snug sm:w-auto"
            />
          </div>
        ) : null}
      </div>
    </form>
  );
}
