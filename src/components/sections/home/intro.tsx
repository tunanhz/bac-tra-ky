import { SectionHeading } from "@/components/ui/section-heading";
import { StubNote } from "../stub-note";

/**
 * STUB (phase 01) — Giới thiệu ngắn "Một thức quà – Một câu chuyện Việt".
 * Phase 02 thay nội dung: dải sơn son tràn viền (`band-lacquer`), tranh Đông Hồ treo, nút "Tìm hiểu thêm" → `#ve-chung-toi`.
 */
export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="section-y">
      <div className="wrap">
        <SectionHeading id="intro-title" title="Một thức quà – Một câu chuyện Việt" />
        <StubNote owner="phase 02" />
      </div>
    </section>
  );
}
