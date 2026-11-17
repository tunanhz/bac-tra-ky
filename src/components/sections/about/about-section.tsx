import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import {
  ABOUT_CORE_VALUES,
  ABOUT_INSPIRATION,
  ABOUT_STATEMENTS,
} from "./about-content";

export function AboutSection() {
  return (
    <section id="ve-chung-toi" aria-labelledby="about-title" className="section-y">
      <div className="wrap space-y-12 lg:space-y-16">
        {/* Slide 9: Chúng tôi bắt đầu từ đâu - Tràn rộng, thay ảnh quả gấc bằng ảnh phòng trà Bác Trà Ký */}
        <Reveal as="article" className="grid items-center gap-8 rounded-3xl bg-paper p-6 shadow-sm md:grid-cols-12 md:p-10 lg:gap-12 lg:p-12">
          <div className="md:col-span-5">
            <figure className="m-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-be-2/60 shadow-md">
                <Image
                  src="/images/story/phong-tra-bac-tra-ky.webp"
                  alt="Không gian thưởng trà và Bánh Bác tại Bác Trà Ký"
                  fill
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="caption px-1 pt-3 text-center text-ink-soft">
                Không gian Bác Trà Ký — Kết nối vị xưa với nhịp sống nay
              </figcaption>
            </figure>
          </div>
          <div className="min-w-0 md:col-span-7">
            <span className="text-xs font-bold tracking-widest text-dong uppercase">
              Hành trình Bác Trà Ký
            </span>
            <h2
              id="about-title"
              className="mt-2 mb-3 font-display text-2xl font-bold leading-tight text-gac sm:text-3xl lg:text-4xl"
            >
              {ABOUT_INSPIRATION.title}
            </h2>
            <p className="mt-0 mb-4 font-serif text-base font-semibold text-son sm:text-lg">
              {ABOUT_INSPIRATION.heading}
            </p>
            <div className="space-y-3.5 text-base leading-relaxed text-ink-soft">
              {ABOUT_INSPIRATION.paragraphs.map((paragraph) => (
                <p key={paragraph} className="m-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Slide 10: Tầm nhìn & Sứ mệnh - Tone sơn son đỏ trầm sang trọng, vàng nhũ đồng bộ bản sắc Bác Trà Ký */}
        <Reveal className="relative overflow-hidden rounded-3xl bg-[#4a0b0e] p-7 text-be shadow-xl sm:p-10 lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 opacity-15 bg-[radial-gradient(circle_at_top_right,var(--color-gac-deep),transparent_70%)]" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold tracking-widest text-nhu uppercase">
                Định hướng thương hiệu
              </span>
              <h3 className="mt-2 mb-6 font-display text-3xl font-bold tracking-wide text-be sm:text-4xl">
                TẦM NHÌN & SỨ MỆNH
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                {ABOUT_STATEMENTS.map(({ title, description }, index) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-nhu/30 bg-black/25 p-5 backdrop-blur-sm transition-all duration-300 hover:border-nhu"
                  >
                    <span className="inline-block rounded-full bg-nhu/20 px-3 py-1 font-body text-xs font-bold tracking-wider text-nhu uppercase">
                      0{index + 1} · {title}
                    </span>
                    <p className="mt-3 mb-0 text-sm leading-relaxed text-be/95 sm:text-base">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ảnh lát Bánh Bác truyền thống theo Slide 10 */}
            <div className="lg:col-span-5">
              <figure className="m-0 mx-auto max-w-sm overflow-hidden rounded-2xl bg-black/20 p-3 shadow-2xl ring-1 ring-nhu/40">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/images/story/banh-bac-boc-mang.webp"
                    alt="Những lát Bánh Bác Giang Xá cuộn đỏ gấc và nhân đỗ bùi"
                    fill
                    sizes="(min-width: 1024px) 380px, 80vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="caption px-1 pt-2.5 text-center text-xs text-cream-muted">
                  Bánh Bác Giang Xá — Thức quà truyền thống gìn giữ lửa nghề
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>

        {/* Slide 11: Giá trị cốt lõi - Tràn rộng, Nền làng quê hoa sen người dùng cung cấp, Tiêu đề to ra */}
        <Reveal className="relative overflow-hidden rounded-3xl bg-[#fbf5e6] p-6 shadow-md sm:p-9 md:p-12 lg:p-16">
          {/* Nền làng quê hoa sen do người dùng tải lên */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/brand/nen-gia-tri-cot-loi.webp"
              alt="Họa tiết làng quê hoa sen và cổng làng Giang Xá"
              fill
              sizes="100vw"
              className="object-cover object-bottom opacity-85 sm:opacity-95"
            />
            {/* Scrim nhẹ để đảm bảo độ tương phản chữ */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#fbf5e6]/40 via-transparent to-[#fbf5e6]/30"
            />
          </div>

          <div className="relative z-10 w-full">
            <div className="mb-8 text-center sm:mb-12">
              <h3 id="core-values-title" className="mt-0 mb-3 font-display text-3xl font-bold tracking-tight text-gac sm:text-4xl lg:text-5xl xl:text-6xl">
                {ABOUT_CORE_VALUES.heading}
              </h3>
              <p className="m-0 font-serif text-base font-semibold text-son sm:text-xl">
                {ABOUT_CORE_VALUES.tagline}
              </p>
            </div>

            {/* 3 cards: Nền giấy sang trọng, hover đổi sang màu đỏ sơn son đậm theo Slide 11 */}
            <ol role="list" className="m-0 grid list-none gap-6 p-0 md:grid-cols-3 lg:gap-8">
              {ABOUT_CORE_VALUES.items.map(({ title, description }, index) => (
                <li
                  key={title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line/80 bg-paper/90 p-6 text-ink shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-nhu hover:bg-[#8e0b16] hover:text-be hover:shadow-2xl sm:p-8"
                >
                  <div>
                    {/* Đánh số như ảnh mẫu Slide 11 */}
                    <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-son/10 font-heading text-xl font-bold text-son shadow-inner transition-colors duration-300 group-hover:bg-white/15 group-hover:text-nhu">
                      0{index + 1}
                    </div>
                    <h4 className="mt-0 mb-3 text-xl font-bold text-son transition-colors duration-300 group-hover:text-be sm:text-2xl">
                      {title}
                    </h4>
                    <p className="m-0 border-t border-line/50 pt-4 text-sm leading-relaxed text-ink-soft transition-colors duration-300 group-hover:border-white/20 group-hover:text-be/95 sm:text-base">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
