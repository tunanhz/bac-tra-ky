import Image from "next/image";
import { PhotoCredit } from "@/components/ui/photo-credit";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import {
  ABOUT_CORE_VALUES,
  ABOUT_INSPIRATION,
  ABOUT_STATEMENTS,
  ABOUT_WHO,
} from "./about-content";
import { CommonsCredit, LacquerFigure, PaperFigure } from "./about-figures";

export function AboutSection() {
  return (
    <section id="ve-chung-toi" aria-labelledby="about-title" className="section-y">
      <div className="wrap">
        {/* Banner thương hiệu: ảnh 21:9 (mobile 4:3), tiêu đề đè lên ảnh từ 768px; mobile tiêu đề nằm dưới ảnh. */}
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[21/9]">
            <Image
              src="/images/story/ao-sen-lang.webp"
              alt="Ao sen làng quê Bắc Bộ phủ kín lá sen xanh, hàng cây phía xa"
              fill
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(40_10_8/0.78)_0%,rgb(40_10_8/0.45)_45%,rgb(40_10_8/0)_75%)] md:block"
            />
          </div>
          <div className="pt-7 md:absolute md:inset-y-0 md:left-0 md:flex md:max-w-[44rem] md:flex-col md:justify-center md:px-12 md:pt-0 lg:px-16">
            <p className="eyebrow m-0 md:text-nhu">Về chúng tôi</p>
            <h2
              id="about-title"
              className="my-3 text-h2 font-bold tracking-[0.04em] text-gac md:text-[clamp(2.2rem,1.4rem+2.6vw,3.4rem)] md:text-be"
            >
              {ABOUT_WHO.heading}
            </h2>
            <p className="m-0 font-heading text-quote text-tra italic md:text-[#f3e6c8]">{ABOUT_WHO.tagline}</p>
          </div>
        </Reveal>

        {/* 1. Bác Trà Ký là ai? — chữ 7 cột | ảnh 5 cột; mobile ảnh trước chữ. */}
        <div className="mt-12 grid items-center gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:order-2 lg:col-span-5">
            <PaperFigure
              src="/images/story/guong-sen-non-la.webp"
              alt="Những gương sen tươi trong nong tre đặt cạnh chiếc nón lá trên bãi cỏ"
              sizes="(min-width: 1024px) 440px, 90vw"
              mediaClassName="aspect-[4/5]"
              caption="Gương sen và nón lá — chất liệu quen thuộc của làng quê Việt"
            />
          </Reveal>
          <Reveal className="lg:order-1 lg:col-span-7">
            {ABOUT_WHO.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={cn(
                  "mt-0 mb-5",
                  index === 0
                    ? "font-heading text-[clamp(1.2rem,1.05rem+0.6vw,1.45rem)] leading-[1.5] text-ink"
                    : "text-ink-soft",
                )}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/* 2. Chúng tôi bắt đầu từ đâu? — ảnh | chữ */}
        <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <PaperFigure
              src="/images/story/qua-gac.webp"
              alt="Những quả gấc chín đỏ cam, vỏ gai, bày trên quầy"
              sizes="(min-width: 1024px) 440px, 90vw"
              mediaClassName="aspect-[4/3] lg:aspect-[4/5]"
              caption={
                <>
                  Quả gấc — nguồn sắc đỏ đặc trưng của Bánh Bác.{" "}
                  <CommonsCredit
                    author="Ron Diggity"
                    license="CC BY 2.0"
                    href="https://commons.wikimedia.org/wiki/File:Qu%E1%BA%A3_G%E1%BA%A5c.jpg"
                  />
                </>
              }
            />
          </Reveal>
          <Reveal className="lg:col-span-7">
            <p className="eyebrow m-0">{ABOUT_INSPIRATION.label}</p>
            <h3 className="mt-3 mb-2 text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] font-bold tracking-[0.02em] text-gac">
              Chúng tôi bắt đầu từ đâu?
            </h3>
            <p className="mt-0 mb-6 font-heading text-quote text-tra italic">{ABOUT_INSPIRATION.heading}</p>
            {ABOUT_INSPIRATION.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-0 mb-4 text-ink-soft">{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <section aria-label="Tầm nhìn và sứ mệnh" className="mx-auto mt-16 grid max-w-[39rem] gap-8 sm:grid-cols-2 lg:mt-24">
          {ABOUT_STATEMENTS.map(({ title, description }, index) => (
            <Reveal key={title} as="article" delay={index * 100} className="flex flex-col">
              <h3 className="mt-0 mb-4 text-center text-h3 font-bold text-gac">{title}</h3>
              <div
                className={cn(
                  "grid aspect-square flex-1 place-items-center px-5 py-7 text-center sm:px-7",
                  index === 0 ? "frame-paper text-tra shadow-paper" : "on-dark frame-gilt bg-son text-be",
                )}
              >
                <p className="m-0 max-w-[24ch] text-[clamp(1rem,0.94rem+0.4vw,1.16rem)] leading-relaxed">{description}</p>
              </div>
            </Reveal>
          ))}
        </section>

        <section aria-labelledby="core-values-title" className="mt-16 lg:mt-24">
          <div className="mx-auto mb-8 max-w-[40ch] text-center lg:mb-10">
            <h3 id="core-values-title" className="my-3 text-h2 font-bold tracking-[0.04em] text-gac">
              {ABOUT_CORE_VALUES.heading}
            </h3>
            <p className="m-0 font-heading text-quote text-tra italic">{ABOUT_CORE_VALUES.tagline}</p>
          </div>
          <ol role="list" className="m-0 grid list-none gap-5 p-0 md:grid-cols-3 lg:gap-7">
            {ABOUT_CORE_VALUES.items.map(({ title, description }, index) => (
              <Reveal as="li" key={title} delay={index * 100} className="frame-paper p-6 shadow-paper lg:p-8">
                <span aria-hidden="true" className="eyebrow block text-dong">0{index + 1}</span>
                <h4 className="mt-3 mb-3 text-h3 font-bold text-son">{title}</h4>
                <p className="m-0 border-t border-line pt-4 text-ink-soft">{description}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Hình ảnh làng nghề và sản phẩm — 1 lớn + 2 nhỏ, khung passe-partout sơn son. */}
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[1.9fr_1fr]">
          <Reveal className="flex">
            <LacquerFigure
              className="w-full"
              src="/images/story/cong-lang-giang-xa.webp"
              alt="Cổng đá và hàng cờ nhiều màu tại Giang Xá"
              sizes="(min-width: 1024px) 740px, 100vw"
              mediaClassName="min-h-[clamp(240px,48vw,420px)] lg:min-h-[480px]"
              caption="Cổng làng Giang Xá — ảnh tư liệu"
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={120} className="flex">
              <LacquerFigure
                className="w-full"
                src="/images/story/goi-banh-bac.webp"
                alt="Đôi tay gói Bánh Bác bằng lá xanh, bên cuộn bánh và vừng"
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                mediaClassName="min-h-[220px]"
                caption="Gói Bánh Bác — trích ấn phẩm Bác Trà Ký"
              />
            </Reveal>
            <Reveal delay={240} className="flex">
              <LacquerFigure
                className="w-full"
                src="/images/story/sen-bach-diep-tay-ho.webp"
                alt="Bông sen bách diệp màu hồng giữa đầm sen Tây Hồ"
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                mediaClassName="min-h-[220px]"
                caption={
                  <>
                    Sen bách diệp Tây Hồ dùng để ướp trà.
                    <span className="mt-1 block">
                      <PhotoCredit
                        author="Viethavvh"
                        sourceUrl="https://commons.wikimedia.org/wiki/File:Sen_b%C3%A1ch_di%E1%BB%87p_T%C3%A2y_H%E1%BB%93.JPG"
                        license="CC BY-SA 4.0"
                        licenseUrl="https://creativecommons.org/licenses/by-sa/4.0/"
                        changes="Thu nhỏ và chuyển WebP"
                      />
                    </span>
                  </>
                }
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
