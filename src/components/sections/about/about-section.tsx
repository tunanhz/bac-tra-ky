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
    <section id="ve-chung-toi" aria-labelledby="about-title" className="w-full">
      {/* Slide 9: Chúng tôi bắt đầu từ đâu - Tràn rộng toàn màn hình như homepage, không bọc hình chữ nhật */}
      <div className="relative w-full bg-paper/60 py-16 lg:py-24 border-b border-line/60">
        <Reveal as="article" className="wrap grid items-center gap-8 md:grid-cols-12 lg:gap-12">
          <div className="md:col-span-5">
            <figure className="m-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-be-2/60 shadow-md">
                <Image
                  src="/images/story/tra-va-banh-bac-giang-xa.webp"
                  alt="Bàn trà và Bánh Bác Giang Xá bên hoa sen Bác Trà Ký"
                  fill
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="caption px-1 pt-3 text-center text-ink-soft">
                Thưởng trà và Bánh Bác — trọn vị truyền thống Giang Xá
              </figcaption>
            </figure>
          </div>
          <div className="min-w-0 md:col-span-7">
            <h2
              id="about-title"
              className="mt-0 mb-3 font-display text-2xl font-bold leading-tight text-gac sm:text-3xl lg:text-4xl"
            >
              {ABOUT_INSPIRATION.title}
            </h2>
            <p className="mt-0 mb-4 font-body text-base font-bold text-son sm:text-lg">
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
      </div>

      {/* Slide 10: Tầm nhìn & Sứ mệnh - Thiết kế poster nghệ thuật với ảnh Polaroid trung tâm & 2 card đối xứng theo form mẫu */}
      <div className="relative isolate w-full overflow-hidden bg-gradient-to-b from-[#380609] via-[#4d0c10] to-[#300508] py-16 text-be shadow-2xl lg:py-24 border-b border-nhu/20">
        {/* Họa tiết ánh sáng & quầng sáng vàng nhũ chìm */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 opacity-25 bg-[radial-gradient(circle_at_50%_35%,#c88e28,transparent_60%)]" />

        <div className="wrap relative z-10 mx-auto max-w-6xl">
          <Reveal>
            {/* Tiêu đề lớn ấn tượng theo phong cách poster như ảnh mẫu */}
            <h3 className="mt-0 mb-6 text-center font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black tracking-tight text-nhu uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] leading-none">
              TẦM NHÌN & SỨ MỆNH
            </h3>

            {/* Bố cục 3 phần: Card Tầm nhìn bên trái - Ảnh nghệ nhân ở giữa - Card Sứ mệnh bên phải */}
            <div className="relative mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
              {/* Card bên trái: TẦM NHÌN */}
              <div className="order-2 lg:order-1 lg:col-span-4">
                <div className="relative rounded-3xl border border-nhu/35 bg-black/40 p-6 sm:p-7 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-nhu/70 hover:bg-black/50">
                  <span className="font-heading text-xs font-bold tracking-widest text-nhu uppercase sm:text-sm">
                    TẦM NHÌN
                  </span>
                  <p className="mt-3 mb-4 font-body text-sm sm:text-base leading-relaxed text-be/95">
                    {ABOUT_STATEMENTS[0].description}
                  </p>
                  {/* Pill tag bo tròn ở góc dưới như ảnh mẫu */}
                  <div className="flex justify-start lg:justify-end">
                    <span className="inline-flex items-center rounded-full bg-[#fdf7e5] px-4 py-1.5 font-heading text-xs font-bold tracking-wide text-son shadow-md">
                      Lan tỏa · Gìn giữ · Hiện đại
                    </span>
                  </div>
                </div>
              </div>

              {/* Khung ảnh Polaroid ở chính giữa - Xoay nghiêng và có lớp lót nền vàng be */}
              <div className="order-1 lg:order-2 lg:col-span-4 flex justify-center z-20">
                <div className="group relative mx-auto w-full max-w-[280px] sm:max-w-[310px] lg:max-w-[320px]">
                  {/* Lớp nền lót màu vàng nhạt/be hơi lệch xoay như tấm giấy kẹp phía sau */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -rotate-3 rounded-3xl bg-[#d4a034]/85 shadow-xl transition-transform duration-500 ease-out group-hover:-rotate-1"
                  />
                  {/* Khung ảnh chính hơi xoay 2 độ ngược lại */}
                  <div className="relative rotate-2 overflow-hidden rounded-3xl bg-[#fdf7e5] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out group-hover:rotate-0">
                    <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-2xl bg-black/10">
                      <Image
                        src="/images/story/nghe-nhan-cuon-banh-bac.webp"
                        alt="Nghệ nhân Giang Xá đang tỉ mỉ cuộn từng chiếc Bánh Bác"
                        fill
                        sizes="(min-width: 1024px) 320px, 80vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <p className="caption m-0 pt-2.5 pb-0.5 text-center font-display text-xs font-bold text-son">
                      Nghệ nhân giữ lửa nghề Bánh Bác Giang Xá
                    </p>
                  </div>
                </div>
              </div>

              {/* Card bên phải: SỨ MỆNH */}
              <div className="order-3 lg:col-span-4">
                <div className="relative rounded-3xl border border-nhu/35 bg-black/40 p-6 sm:p-7 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-nhu/70 hover:bg-black/50">
                  <span className="font-heading text-xs font-bold tracking-widest text-nhu uppercase sm:text-sm">
                    SỨ MỆNH
                  </span>
                  <p className="mt-3 mb-4 font-body text-sm sm:text-base leading-relaxed text-be/95">
                    {ABOUT_STATEMENTS[1].description}
                  </p>
                  {/* Pill tag bo tròn ở góc dưới như ảnh mẫu */}
                  <div className="flex justify-start">
                    <span className="inline-flex items-center rounded-full bg-[#fdf7e5] px-4 py-1.5 font-heading text-xs font-bold tracking-wide text-son shadow-md">
                      Bàn tay · Ký ức · Truyền thống
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Slide 11: Giá trị cốt lõi - Tràn rộng toàn màn hình với nền hoa sen, không bọc hình chữ nhật */}
      <div className="relative isolate w-full overflow-hidden bg-[#fbf5e6] py-16 shadow-sm lg:py-24 border-b border-line/60">
        {/* Nền làng quê hoa sen do người dùng tải lên tràn viền */}
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

        <Reveal className="wrap relative z-10 w-full">
          <div className="mb-8 text-center sm:mb-12">
            <h3 id="core-values-title" className="mt-0 mb-3 font-display text-3xl font-bold tracking-tight text-gac sm:text-4xl lg:text-5xl xl:text-6xl">
              {ABOUT_CORE_VALUES.heading}
            </h3>
            <p className="m-0 font-body text-base font-bold text-son sm:text-xl">
              {ABOUT_CORE_VALUES.tagline}
            </p>
          </div>

          {/* 3 cards: Mặc định là màu đỏ sơn son, hover đổi sang màu be giấy như ảnh mẫu */}
          <ol role="list" className="m-0 grid list-none gap-6 p-0 md:grid-cols-3 lg:gap-8">
            {ABOUT_CORE_VALUES.items.map(({ title, description }, index) => (
              <li
                key={title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-nhu/30 bg-[#8e0b16] p-6 text-be shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-line/80 hover:bg-paper hover:text-ink hover:shadow-2xl sm:p-8"
              >
                <div>
                  {/* Đánh số như ảnh mẫu Slide 11: Mặc định trên nền đỏ, hover chuyển sang nền be */}
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-white/15 font-heading text-xl font-bold text-nhu shadow-inner transition-colors duration-300 group-hover:bg-son/10 group-hover:text-son">
                    0{index + 1}
                  </div>
                  <h4 className="mt-0 mb-3 text-xl font-bold text-be transition-colors duration-300 group-hover:text-son sm:text-2xl">
                    {title}
                  </h4>
                  <p className="m-0 border-t border-white/20 pt-4 text-sm leading-relaxed text-be/95 transition-colors duration-300 group-hover:border-line/50 group-hover:text-ink-soft sm:text-base">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
