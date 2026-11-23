import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { VisionMission } from "./vision-mission";
import { BrandJourney } from "./brand-journey";
import { ABOUT_CORE_VALUES } from "./about-content";

export function AboutSection() {
  return (
    <section id="ve-chung-toi" aria-labelledby="about-title" className="w-full">
      <h2 id="about-title" className="sr-only">Về chúng tôi</h2>
      <BrandJourney />
      <VisionMission />

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
            <h3 id="core-values-title" className="mt-0 mb-3 font-display text-h2 font-bold tracking-tight text-gac">
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
