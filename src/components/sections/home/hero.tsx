import Image from "next/image";
import { FrameCorners } from "@/components/ornaments/corner";
import { Button } from "@/components/ui/button";
import { sectionHref } from "@/config/site";

/**
 * Hero trang chủ (id `trang-chu`) — khung chung do phase 01 dựng theo bản mẫu B: ảnh tràn viền 92svh (zoom chậm
 * 1.06→1), phủ nâu, khung thếp vàng + 4 góc `corner.svg`, 5 dòng chữ hiện lệch nhịp.
 * Phase 02 sở hữu file này: hoàn thiện ảnh chủ đạo (Bánh Bác + Trà Sen) và chi tiết.
 */
export function Hero() {
  return (
    <section
      id="trang-chu"
      aria-labelledby="hero-title"
      className="on-dark relative isolate grid min-h-[92svh] place-items-center overflow-hidden text-be"
    >
      <Image
        src="/images/common/hero-am-tra-ngay-tet.webp"
        alt="Bộ ấm chén gốm trên khay gỗ, bên cạnh bình hoa đỏ và đèn dầu, không khí ngày Tết"
        fill
        priority
        sizes="100vw"
        className="-z-20 animate-hero-zoom object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(40_10_8/0.55)_0%,rgb(40_10_8/0.35)_40%,rgb(40_10_8/0.78)_100%)]"
      />

      <div className="frame-gilt stagger relative mx-4 mt-24 mb-14 max-w-[760px] bg-[rgb(74_11_14/0.72)] px-5.5 pt-11 pb-12 text-center backdrop-blur-[2px] md:px-14 md:pt-14 md:pb-11">
        <FrameCorners className="size-[34px] text-nhu md:size-[46px]" />
        <p className="eyebrow m-0">
          <span className="block sm:inline">Bánh Bác Giang Xá</span>
          <span className="hidden sm:inline" aria-hidden="true">
            {" · "}
          </span>
          <span className="sr-only sm:hidden">, </span>
          <span className="block sm:inline">Trà Sen Việt</span>
        </p>
        <h1 id="hero-title" className="mt-4 mb-1.5 text-h1 font-bold tracking-[0.06em] text-be uppercase">
          Bác Trà Ký{" "}
          <span className="sr-only">–</span>{" "}
          <span className="mt-2 block font-heading text-[clamp(1.15rem,3vw,1.6rem)] font-normal tracking-normal text-nhu normal-case italic">
            Gìn giữ tinh hoa, tiếp nối giá trị
          </span>
        </h1>
        <p className="mx-auto mt-4 mb-7 max-w-[44ch] text-[1.05rem] text-[#f3e6c8]">
          Từ hương vị Bánh Bác Giang Xá đến nét thanh tao của Trà Sen Việt, mỗi món quà là một câu chuyện văn hoá được
          tiếp nối.
        </p>
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:justify-center">
          <Button href={sectionHref("san-pham")}>Khám phá sản phẩm</Button>
          <Button href={sectionHref("cau-chuyen")} variant="outline-light">
            Câu chuyện Bác Trà Ký
          </Button>
        </div>
      </div>

      <p className="caption absolute right-4 bottom-3 m-0 text-[0.68rem] text-be/75">
        Ảnh minh hoạ — sẽ thay ảnh Bánh Bác &amp; Trà Sen thật
      </p>
    </section>
  );
}
