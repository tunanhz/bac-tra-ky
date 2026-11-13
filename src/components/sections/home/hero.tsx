import Image from "next/image";
import { FrameCorners } from "@/components/ornaments/corner";
import { Button } from "@/components/ui/button";
import { sectionHref } from "@/config/site";

/**
 * Mobile: ảnh mở đầu dẫn vào tấm sơn son. Desktop: khung thếp vàng nổi trên ảnh tràn viền.
 */
export function Hero() {
  return (
    <section
      id="trang-chu"
      aria-labelledby="hero-title"
      className="on-dark relative isolate grid overflow-hidden bg-son-deep text-be md:min-h-[92svh] md:place-items-center md:bg-transparent"
    >
      <div className="relative -z-10 h-[clamp(11rem,50vw,20rem)] overflow-hidden md:absolute md:inset-0 md:h-auto">
        <Image
          src="/images/common/hero-am-tra-ngay-tet.webp"
          alt="Bộ ấm chén gốm trên khay gỗ, bên cạnh bình hoa đỏ và đèn dầu, không khí ngày Tết"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center md:animate-hero-zoom"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-son-deep/75 via-transparent to-son-deep md:bg-[linear-gradient(180deg,rgb(40_10_8/0.55)_0%,rgb(40_10_8/0.35)_40%,rgb(40_10_8/0.78)_100%)]"
        />
      </div>

      <div className="frame-gilt stagger relative mx-5 -mt-5 max-w-[760px] bg-son-deep px-5 pt-8 pb-7 text-center max-md:[&>*]:animate-none md:mx-4 md:mt-24 md:mb-14 md:bg-[rgb(74_11_14/0.72)] md:px-14 md:pt-14 md:pb-11 md:backdrop-blur-[2px]">
        <FrameCorners className="size-7 text-nhu md:size-[46px]" />
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
        <p className="mx-auto mt-3 mb-5 max-w-[44ch] text-base leading-relaxed text-cream-soft md:mt-4 md:mb-7 md:text-[1.05rem] md:leading-[1.7] md:text-[#f3e6c8]">
          Từ hương vị Bánh Bác Giang Xá đến nét thanh tao của Trà Sen Việt, mỗi món quà là một câu chuyện văn hoá được
          tiếp nối.
        </p>
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:justify-center">
          <Button href={sectionHref("san-pham")} className="max-md:px-3 max-md:tracking-wider">Khám phá sản phẩm</Button>
          <Button href={sectionHref("cau-chuyen")} variant="outline-light" className="max-md:border-transparent max-md:px-2 max-md:tracking-wider max-md:text-nhu max-md:underline max-md:underline-offset-4 max-md:hover:text-son">
            Câu chuyện Bác Trà Ký
          </Button>
        </div>
      </div>

      <p className="caption mx-5 mt-3 mb-4 text-center text-[0.68rem] text-be/75 md:absolute md:right-20 md:bottom-3 md:m-0">
        Ảnh minh hoạ — sẽ thay ảnh Bánh Bác &amp; Trà Sen thật
      </p>
    </section>
  );
}
