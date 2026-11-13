import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { sectionHref } from "@/config/site";

/**
 * Giới thiệu ngắn "Một thức quà – Một câu chuyện Việt". Chép từ khối `.lacquer` của bản mẫu B: dải sơn son tràn viền
 * có 2 đường chỉ vàng, bên trái là tranh Đông Hồ treo như tranh cuốn, bên phải là chữ be/vàng nhũ.
 * Nội dung lấy nguyên câu trong spec mục III.2.
 */
export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="band-lacquer on-dark py-12 md:py-[72px]">
      <div className="wrap grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal
          as="figure"
          className="relative mx-auto my-0 w-full max-w-48 md:max-w-[300px] bg-scroll px-3.5 pt-3.5 pb-[58px] shadow-scroll before:absolute before:-inset-x-2 before:-top-2.5 before:h-2.5 before:rounded-[3px] before:bg-[#3a1a0c] before:content-['']"
        >
          <Image
            src="/images/story/tranh-dong-ho-ca-chep.webp"
            alt="Tranh Đông Hồ cá chép: hai con cá chép bơi quanh hoa sen, màu điệp, vàng, đỏ, xanh"
            width={400}
            height={622}
            sizes="(min-width: 768px) 272px, 80vw"
            className="block aspect-[400/622] h-auto w-full object-cover"
          />
          <figcaption className="absolute inset-x-2.5 bottom-3 text-center text-[0.66rem] leading-[1.35] text-ink-soft italic">
            Tranh Đông Hồ “Cá chép” · Wikimedia Commons, phạm vi công cộng
          </figcaption>
        </Reveal>

        <Reveal>
          <p className="eyebrow m-0">Bác Trà Ký</p>
          <h2
            id="intro-title"
            className="mt-3.5 mb-[18px] text-[clamp(1.9rem,5vw,2.8rem)] leading-[1.12] font-semibold text-be"
          >
            Một thức quà – <em className="text-nhu">Một câu chuyện Việt</em>
          </h2>
          <p className="mt-0 mb-4 text-cream-soft">
            Bác Trà Ký là thương hiệu ẩm thực mang trong mình tình yêu dành cho những giá trị truyền thống Việt Nam, khởi
            nguồn từ Bánh Bác – thức quà đặc trưng của làng Giang Xá, Hoài Đức, Hà Nội.
          </p>
          <p className="mt-0 mb-4 text-cream-soft">
            Sự kết hợp giữa Bánh Bác Giang Xá và Trà Sen tạo nên một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.
          </p>
          <Button href={sectionHref("ve-chung-toi")} variant="outline-light" className="mt-2">
            Tìm hiểu thêm
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
