import { SectionHeading } from "@/components/ui/section-heading";
import { StubNote } from "../stub-note";

/**
 * STUB (phase 01) — Liên hệ (id `lien-he`).
 * Phase 03 thay nội dung: lời mời, form (Họ và tên, SĐT, Email, Nội dung + honeypot `website`) kiểm bằng
 * `validateContact`, gửi `POST /api/contact` (đang trả 501 → thông báo trung thực + nút "Nhắn qua Facebook"),
 * khối Facebook/TikTok/Email/Hotline/địa chỉ từ `siteConfig`.
 */
export function ContactSection() {
  return (
    <section id="lien-he" aria-labelledby="contact-title" className="section-y">
      <div className="wrap">
        <SectionHeading id="contact-title" title="Liên hệ" />
        <StubNote owner="phase 03" />
      </div>
    </section>
  );
}
