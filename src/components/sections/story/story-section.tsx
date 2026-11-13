import { SectionHeading } from "@/components/ui/section-heading";
import { StubNote } from "../stub-note";

/**
 * STUB (phase 01) — Câu chuyện văn hoá (id `cau-chuyen`).
 * Phase 02 thay nội dung: 4 chương (ảnh tràn viền + tấm giấy `frame-paper` đè lên, số chương La Mã `text-chapter`),
 * trích dẫn xanh trà, scroll reveal.
 */
export function StorySection() {
  return (
    <section id="cau-chuyen" aria-labelledby="story-title" className="section-y bg-be-2">
      <div className="wrap">
        <SectionHeading id="story-title" title="Câu chuyện văn hoá" />
        <StubNote owner="phase 02" />
      </div>
    </section>
  );
}
