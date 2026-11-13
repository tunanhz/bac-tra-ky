import Image from "next/image";
import { Divider } from "@/components/ornaments/divider";
import { Button } from "@/components/ui/button";
import { sectionHref } from "@/config/site";

/**
 * CTA cuối trang (khối `.final` của bản mẫu B): ảnh lá sen tối tràn viền, phủ xanh trà `rgba(20,26,14,.62)`, dải phân
 * cách nụ sen, heading và nút đúng spec. Đây là chỗ nghỉ mắt của trang, đặt ngay trước mục Liên hệ.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="on-dark relative isolate overflow-hidden py-[110px] text-center text-be"
    >
      <Image
        src="/images/story/la-sen-dong-nuoc.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgb(20_26_14/0.62)]" />
      <div className="wrap">
        <Divider className="mx-auto mb-[22px] h-[22px] w-[180px] text-nhu" />
        <h2
          id="final-cta-title"
          className="mx-auto mt-0 mb-4 max-w-[18ch] text-[clamp(1.9rem,5.4vw,3.2rem)] leading-[1.12] font-bold text-be"
        >
          Mang một chút hương vị quê nhà đến gần bạn hơn
        </h2>
        <p className="mx-auto mt-0 mb-7 max-w-[44ch] text-[#efe4c8]">
          Khám phá bộ sưu tập Bánh Bác và Trà Sen, hoặc để lại lời nhắn để Bác Trà Ký kể cho bạn nghe câu chuyện phía sau
          mỗi món quà.
        </p>
        <Button href={sectionHref("san-pham")}>Khám phá bộ sưu tập</Button>
      </div>
    </section>
  );
}
