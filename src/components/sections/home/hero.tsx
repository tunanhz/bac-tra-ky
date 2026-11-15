import Image from "next/image";
import { FrameCorners } from "@/components/ornaments/corner";
import { Button } from "@/components/ui/button";
import { sectionHref } from "@/config/site";

/**
 * Mobile: ảnh Bánh Bác trên tấm sơn son. Desktop: ảnh và nội dung đặt cạnh nhau.
 */
export function Hero() {
  return (
    <section
      id="trang-chu"
      aria-labelledby="hero-title"
      className="on-dark relative isolate grid overflow-hidden bg-son-deep text-be md:min-h-[min(92svh,800px)] md:grid-cols-2 md:items-center"
    >
      <div className="relative mx-7 mt-[76px] h-[clamp(10rem,54vw,20rem)] md:order-2 md:mx-10 md:mt-16 md:h-[min(60svh,600px)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#a33329_0%,transparent_70%)]" />
        <Image
          src="/images/common/banh-bac-giang-xa.webp"
          alt="Bánh Bác cuộn lá xanh và những lát bánh có lớp đỏ, trắng, nhân vàng"
          fill
          preload
          sizes="(min-width: 768px) 48vw, 85vw"
          className="object-contain drop-shadow-[0_18px_24px_rgb(28_5_2/0.55)]"
        />
      </div>

      <div className="hero-panel frame-gilt stagger relative mx-5 mt-2 mb-8 max-w-[740px] bg-son-deep px-5 pt-8 pb-7 text-center max-md:[&>*]:animate-none md:mx-0 md:mt-24 md:mr-2 md:mb-12 md:ml-[clamp(1.5rem,4vw,5rem)] md:bg-tram/75 md:px-7 md:pt-12 md:pb-10 xl:px-12">
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
          <span className="hero-slogan mt-2 block font-heading text-[clamp(1.15rem,3vw,1.6rem)] font-normal tracking-normal text-nhu normal-case italic">
            Gìn giữ tinh hoa, tiếp nối giá trị
          </span>
        </h1>
        <p className="hero-lead mx-auto mt-3 mb-5 max-w-[44ch] text-base leading-relaxed text-cream-soft md:mt-4 md:mb-7 md:text-[1.05rem] md:leading-[1.7] md:text-[#f3e6c8]">
          Từ hương vị Bánh Bác Giang Xá đến nét thanh tao của Trà Sen Việt, mỗi món quà là một câu chuyện văn hoá được
          tiếp nối.
        </p>
        <div className="flex flex-col items-stretch gap-3 xl:flex-row xl:justify-center">
          <Button href={sectionHref("san-pham")} className="max-md:px-3 max-md:tracking-wider">Khám phá sản phẩm</Button>
          <Button href={sectionHref("cau-chuyen")} variant="outline-light" className="max-md:border-transparent max-md:px-2 max-md:tracking-wider max-md:text-nhu max-md:underline max-md:underline-offset-4 max-md:hover:text-son">
            Câu chuyện Bác Trà Ký
          </Button>
        </div>
      </div>
    </section>
  );
}
