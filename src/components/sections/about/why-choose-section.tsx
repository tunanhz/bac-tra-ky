import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const reasons = [
  {
    title: "Hương vị truyền thống, chất riêng Giang Xá",
    description: "Bánh nếp dẻo thơm, nhân đậu xanh bùi ngọt cùng sắc đỏ gấc đặc trưng, lưu giữ hương vị Bánh Bác qua bao thế hệ.",
    image: "/images/common/banh-bac-giang-xa.webp",
    alt: "Bánh Bác cuộn lá xanh bên những lát bánh có nhân đậu xanh",
    caption: "Bánh Bác nhân đậu xanh truyền thống",
    contain: true,
  },
  {
    title: "Nhân bánh đa dạng, hợp gu người trẻ",
    description: "Bên cạnh nhân đậu xanh truyền thống là những lựa chọn mới như khoai môn, matcha, đậu đỏ và nhân mặn, cho mỗi lần thưởng thức thêm thú vị.",
    image: "/images/products/hop-6-banh-matcha.webp",
    alt: "Ấn phẩm bao bì Bánh Bác nhân matcha của Bác Trà Ký",
    caption: "Hộp Bánh Bác nhân matcha · Ấn phẩm Bác Trà Ký",
    contain: true,
  },
  {
    title: "Bao bì chỉn chu, trao quà thêm ý nghĩa",
    description: "Thiết kế mang nét văn hóa truyền thống, với nhiều quy cách đóng gói phù hợp để tự thưởng thức, chia sẻ hay dành tặng người thân.",
    image: "/images/products/hop-2-banh.webp",
    alt: "Hộp 2 bánh của Bác Trà Ký",
    caption: "Hộp 2 bánh · Ấn phẩm Bác Trà Ký",
    contain: true,
  },
  {
    title: "Mỗi chiếc bánh, một câu chuyện làng nghề",
    description: "Khám phá nguồn gốc Bánh Bác Giang Xá, kỹ thuật làm bánh thủ công và những giá trị văn hóa được gìn giữ qua nhiều thế hệ.",
    image: "/images/story/cong-lang-giang-xa.webp",
    alt: "Ảnh tư liệu cổng làng Giang Xá với lọng và cờ lễ",
    caption: "Cổng làng Giang Xá · Ảnh tư liệu",
  },
  {
    title: "Bánh Bác và trà sen – Một trải nghiệm trọn vị",
    description: "Vị bánh dẻo bùi hòa cùng hương trà sen thanh nhẹ, tạo nên những phút giây thưởng thức vừa thân quen vừa mới mẻ.",
    image: "/images/products/bo-qua-banh-bac-tra-sen.webp",
    alt: "Hộp quà cao cấp Bác Trà Ký kết hợp Bánh Bác và Trà Sen Tây Hồ",
    caption: "Hộp quà cao cấp Bánh Bác & Trà Sen · Bác Trà Ký",
    contain: true,
  },
];

export function WhyChooseSection() {
  return (
    <section id="tai-sao-chon-bac-tra-ky" aria-labelledby="why-choose-title" className="section-y border-y border-line bg-be-2/45">
      <div className="wrap">
        {/* Slide 13: Format phong cách Làng Nghề Nổi Tiếng - Nền trầm sang trọng, tiêu đề to, card tinh tế */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1d2b1c] p-7 text-be shadow-xl sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute inset-0 opacity-15">
            <Image
              src="/images/story/hon-que-giang-xa-bg.webp"
              alt="Phong cảnh làng nghề Giang Xá"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-bold tracking-widest text-nhu uppercase">
                Giá trị khác biệt
              </span>
              <h2
                id="why-choose-title"
                className="mt-2 mb-3 font-display text-3xl font-bold tracking-tight text-be sm:text-4xl lg:text-5xl"
              >
                Tại sao nên chọn Bác Trà Ký?
              </h2>
              <p className="m-0 font-serif text-base text-cream-muted sm:text-lg">
                Giữ trọn nét xưa, thêm những trải nghiệm mới – để mỗi chiếc bánh không chỉ ngon mà còn mang theo một câu chuyện.
              </p>
            </div>

            <ol role="list" className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason, index) => (
                <Reveal
                  key={reason.title}
                  as="li"
                  delay={(index % 3) * 90}
                  className={cn(
                    "group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-nhu/60 hover:bg-black/50 hover:shadow-xl sm:p-6",
                    index === 3 && "sm:max-lg:col-span-2",
                    index === 4 && "lg:col-span-2"
                  )}
                >
                  <div>
                    <figure className="m-0">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black/40">
                        <Image
                          src={reason.image}
                          alt={reason.alt}
                          fill
                          sizes="(min-width: 1200px) 340px, (min-width: 768px) 44vw, 88vw"
                          className={cn(
                            "transition-transform duration-500 group-hover:scale-105",
                            reason.contain ? "object-contain p-2" : "object-cover"
                          )}
                        />
                      </div>
                      <figcaption className="caption px-1 pt-2 text-center text-xs text-cream-muted">
                        {reason.caption}
                      </figcaption>
                    </figure>

                    <div className="pt-4">
                      <span className="inline-block rounded-full bg-nhu/20 px-2.5 py-0.5 text-xs font-bold text-nhu uppercase">
                        0{index + 1}
                      </span>
                      <h3 className="mt-2 mb-2 text-lg font-bold text-be sm:text-xl">
                        {reason.title}
                      </h3>
                      <p className="m-0 text-sm leading-relaxed text-cream-muted">
                        {reason.description}
                      </p>
                    </div>
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
