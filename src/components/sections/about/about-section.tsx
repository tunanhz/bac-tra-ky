import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import {
  ABOUT_CORE_VALUES,
  ABOUT_INSPIRATION,
  ABOUT_MISSION,
  ABOUT_VISION,
  ABOUT_WHO,
  type AboutStatement,
} from "./about-content";
import { CommonsCredit, LacquerFigure, PaperFigure } from "./about-figures";

/** Sứ mệnh trên giấy, Tầm nhìn trên sơn son (design-direction hướng B mục 4.3: đối xứng hai màu). */
function StatementCard({ statement, dark }: { statement: AboutStatement; dark?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col px-6 pt-10 pb-9 md:px-10 md:pt-12 md:pb-11",
        dark ? "on-dark frame-gilt bg-son text-be" : "frame-paper shadow-paper",
      )}
    >
      <p className="eyebrow m-0">{statement.label}</p>
      <h3 className={cn("mt-3 mb-0 text-[clamp(1.5rem,1.2rem+1vw,1.9rem)] font-bold", dark ? "text-be" : "text-son")}>
        {statement.heading}
      </h3>
      <blockquote
        className={cn(
          "mx-0 my-6 border-y py-5 font-heading text-quote font-medium italic",
          dark ? "border-nhu/35 text-nhu" : "border-line text-tra",
        )}
      >
        “{statement.quote}”
      </blockquote>
      {statement.paragraphs.map((paragraph) => (
        <p key={paragraph} className={cn("mt-0 mb-4", dark ? "text-cream-soft" : "text-ink-soft")}>
          {paragraph}
        </p>
      ))}
      <p className={cn("mt-2 mb-0 font-heading text-[1.08rem] italic", dark ? "text-be" : "text-gac")}>
        {statement.closing}
      </p>
    </article>
  );
}

/**
 * Về chúng tôi (id `ve-chung-toi`) — storytelling theo spec mục III.2, nội dung NGUYÊN VĂN (xem `about-content.ts`).
 * Bố cục (design-direction 4.3): banner thương hiệu → "Bác Trà Ký là ai?" (chữ | ảnh) → "Chúng tôi bắt đầu từ đâu?"
 * (ảnh | chữ) → Sứ mệnh | Tầm nhìn → 3 card giá trị cốt lõi → dải ảnh làng nghề và sản phẩm (1 lớn + 2 nhỏ).
 */
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
            {ABOUT_INSPIRATION.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={cn(
                  "mt-0 mb-4",
                  index === 3 ? "border-l-2 border-gac py-1 pl-5 font-heading text-[1.12rem] text-son italic" : "text-ink-soft",
                )}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/* 3–4. Sứ mệnh | Tầm nhìn */}
        <div className="mt-16 grid gap-7 lg:mt-24 lg:grid-cols-2">
          <Reveal>
            <StatementCard statement={ABOUT_MISSION} />
          </Reveal>
          <Reveal delay={120}>
            <StatementCard statement={ABOUT_VISION} dark />
          </Reveal>
        </div>

        {/* 5. Giá trị cốt lõi — 3 card 01 · 02 · 03 */}
        <div className="mt-16 lg:mt-24">
          <div className="mx-auto mb-8 max-w-[40ch] text-center lg:mb-10">
            <p className="eyebrow m-0">{ABOUT_CORE_VALUES.label}</p>
            <h3 className="my-3 text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] font-bold tracking-[0.04em] text-gac">
              {ABOUT_CORE_VALUES.heading}
            </h3>
          </div>
          <ol role="list" className="m-0 grid list-none gap-6 p-0 lg:grid-cols-3 lg:gap-7">
            {ABOUT_CORE_VALUES.items.map((value, index) => (
              <Reveal as="li" key={value.number} delay={index * 120} className="frame-paper px-7 pt-9 pb-8 shadow-paper">
                <p aria-hidden="true" className="m-0 font-heading text-chapter font-bold text-gac">
                  {value.number}
                </p>
                <h4 className="mt-4 mb-1 font-body text-[0.95rem] font-bold tracking-[0.18em] text-son">
                  <span className="sr-only">{value.number}.</span> {value.title}
                </h4>
                <p className="mt-0 mb-4 border-b border-line pb-4 font-heading text-[1.1rem] text-tra italic">
                  {value.subtitle}
                </p>
                {value.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-0 mb-3 text-[0.95rem] text-ink-soft last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}
          </ol>
        </div>

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
                src="/images/story/khay-tra-moc.webp"
                alt="Khay trà gỗ với ấm và chén trà, bên cạnh đĩa bánh"
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                mediaClassName="min-h-[220px]"
                illustration
                caption="Bánh và trà bên khay gỗ"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
