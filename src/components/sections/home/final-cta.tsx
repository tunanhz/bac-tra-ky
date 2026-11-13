import { Divider } from "@/components/ornaments/divider";
import { Button } from "@/components/ui/button";
import { sectionHref } from "@/config/site";

/**
 * STUB (phase 01) — CTA cuối trang.
 * Phase 02 thay nội dung: ảnh lá sen tối tràn viền, phủ `rgba(20,26,14,.62)`, chữ be (chỗ nghỉ mắt của trang).
 */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="on-dark section-y bg-tra text-center text-be">
      <div className="wrap">
        <Divider className="mx-auto mb-5.5 h-[22px] w-[180px] text-nhu" />
        <h2 id="final-cta-title" className="mx-auto mt-0 mb-7 max-w-[18ch] text-h2 font-bold text-be">
          Mang một chút hương vị quê nhà đến gần bạn hơn
        </h2>
        <Button href={sectionHref("san-pham")}>Khám phá bộ sưu tập</Button>
      </div>
    </section>
  );
}
