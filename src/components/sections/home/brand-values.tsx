import { SectionHeading } from "@/components/ui/section-heading";
import { StubNote } from "../stub-note";

/**
 * STUB (phase 01) — Giá trị thương hiệu (3 giá trị theo spec).
 * Phase 02 thay nội dung: 3 ô giấy viền đôi (`frame-paper`) trên nền be-2, số La Mã đỏ gấc.
 */
export function BrandValues() {
  return (
    <section aria-labelledby="values-title" className="section-y bg-be-2">
      <div className="wrap">
        <SectionHeading id="values-title" title="Giá trị thương hiệu" />
        <StubNote owner="phase 02" />
      </div>
    </section>
  );
}
