import { SectionHeading } from "@/components/ui/section-heading";
import { StubNote } from "../stub-note";

/**
 * STUB (phase 01) — Về chúng tôi (id `ve-chung-toi`).
 * Phase 02 thay nội dung: storytelling dùng nguyên văn spec mục III.2 (banner, "Chúng tôi bắt đầu từ đâu?",
 * Sứ mệnh/Tầm nhìn, 3 card giá trị cốt lõi, ảnh làng nghề).
 */
export function AboutSection() {
  return (
    <section id="ve-chung-toi" aria-labelledby="about-title" className="section-y">
      <div className="wrap">
        <SectionHeading id="about-title" eyebrow="Về chúng tôi" title="Bác Trà Ký là ai?" />
        <StubNote owner="phase 02" />
      </div>
    </section>
  );
}
