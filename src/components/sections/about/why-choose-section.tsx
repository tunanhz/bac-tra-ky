import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const reasons = [
  {
    title: "Hương vị truyền thống, chất riêng Giang Xá",
    description: "Bánh nếp dẻo thơm, nhân đậu xanh bùi ngọt cùng sắc đỏ gấc đặc trưng, lưu giữ trọn vẹn qua bao thế hệ.",
    image: "/images/common/banh-bac-giang-xa.webp",
  },
  {
    title: "Nhân bánh đa dạng, hợp gu người trẻ",
    description: "Bên cạnh đậu xanh truyền thống là khoai môn, matcha, đậu đỏ và nhân mặn, cho mỗi lần thưởng thức thêm thú vị.",
    image: "/images/products/hop-6-banh-matcha.webp",
  },
  {
    title: "Bao bì chỉn chu, trao quà thêm ý nghĩa",
    description: "Thiết kế mang nét văn hóa truyền thống, nhiều quy cách đóng gói tiện lợi để thưởng thức hoặc làm quà biếu.",
    image: "/images/products/hop-2-banh.webp",
  },
  {
    title: "Mỗi chiếc bánh, một câu chuyện làng nghề",
    description: "Khám phá nguồn gốc Bánh Bác Giang Xá, kỹ thuật thủ công và những giá trị văn hóa được tiếp nối ngàn năm.",
    image: "/images/story/cong-lang-giang-xa.webp",
  },
  {
    title: "Bánh Bác và trà sen – Một trải nghiệm trọn vị",
    description: "Vị bánh dẻo bùi hòa cùng hương trà sen Tây Hồ thanh nhẹ, tạo nên những phút giây thưởng trà an yên, đậm vị.",
    image: "/images/products/bo-qua-banh-bac-tra-sen.webp",
  },
];

export function WhyChooseSection() {
  return (
    <section id="tai-sao-chon-bac-tra-ky" aria-labelledby="why-choose-title" className="section-y border-y border-line bg-be-2/45">
      <div className="wrap">
        {/* Banner format theo ảnh mẫu người dùng cung cấp:
            - Nền làng nghề mái ngói cổ kính, phủ màu đỏ sơn son cinematic
            - Tiêu đề MỤC LỤC kiểu dáng cao, dõng dạc màu vàng nhũ Bác Trà Ký
            - Dãy 5 thẻ bo góc tròn màu giấy dó, trên đầu góc trái có huy hiệu tròn lồi màu đỏ sơn son & viền vàng nhũ (chuẩn bảng màu thương hiệu, không lấy màu xanh rêu như ảnh mẫu)
        */}
        <div className="relative overflow-hidden rounded-3xl bg-[#250406] p-7 text-be shadow-2xl sm:p-10 lg:p-14">
          {/* Nền làng quê cổ kính với mái ngói và không gian thủ công */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <Image
              src="/images/story/hon-que-giang-xa-bg.webp"
              alt="Phong cảnh làng nghề cổ truyền Giang Xá"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-30"
            />
            {/* Lớp phủ màu sơn son trầm cinematic */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#1f0305]/95 via-[#2d0508]/85 to-[#1c0204]/95"
            />
          </div>

          <div className="relative z-10">
            {/* Tiêu đề cao, dõng dạc, màu vàng nhũ theo phong cách MỤC LỤC trong ảnh mẫu */}
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
              <span className="inline-block rounded-full border border-nhu/60 bg-black/30 px-4 py-1 text-xs font-bold tracking-[0.25em] text-nhu uppercase backdrop-blur-sm">
                Giá trị khác biệt
              </span>
              <h2
                id="why-choose-title"
                className="mt-4 mb-3 font-display text-3xl font-extrabold tracking-wide text-nhu uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Tại sao nên chọn Bác Trà Ký?
              </h2>
              <p className="m-0 font-serif text-base text-cream-muted sm:text-lg">
                Giữ trọn nét xưa, thêm những trải nghiệm mới – để mỗi chiếc bánh không chỉ ngon mà còn mang theo một câu chuyện.
              </p>
            </div>

            {/* Hàng 5 thẻ theo format ảnh mẫu: Card bo góc giấy dó, huy hiệu số tròn lồi ở góc trên bên trái, màu đỏ sơn son chuẩn bản sắc thương hiệu */}
            <ol role="list" className="m-0 grid list-none grid-cols-1 gap-8 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4 lg:pt-6">
              {reasons.map((reason, index) => (
                <Reveal
                  key={reason.title}
                  as="li"
                  delay={index * 80}
                  className="group relative flex flex-col justify-between rounded-3xl border border-line/70 bg-[#fbf5e6] p-5 pt-9 text-center text-ink shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-nhu hover:shadow-2xl sm:p-5 sm:pt-10"
                >
                  {/* Huy hiệu số tròn lồi ở góc trên bên trái theo format ảnh mẫu, đổi sang màu đỏ sơn son & viền vàng nhũ chuẩn Bác Trà Ký */}
                  <div
                    className="absolute -top-5 left-4 flex size-12 items-center justify-center rounded-full border-2 border-nhu bg-[#8e0b16] font-heading text-xl font-extrabold text-be shadow-lg ring-4 ring-[#fbf5e6] transition-transform duration-300 group-hover:scale-110 sm:-top-5 sm:left-5 sm:size-13 sm:text-2xl"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    {/* Tiêu đề cấp 3 chuẩn test & font chữ thương hiệu */}
                    <h3 className="mt-1 mb-3 font-display text-[1.05rem] font-bold leading-snug text-son sm:text-[1.15rem]">
                      {reason.title}
                    </h3>
                    <p className="m-0 border-t border-line/70 pt-3 text-xs leading-relaxed text-ink-soft sm:text-[0.84rem]">
                      {reason.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
