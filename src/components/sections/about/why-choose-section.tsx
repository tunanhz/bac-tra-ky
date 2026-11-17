import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
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
        <SectionHeading
          id="why-choose-title"
          title="Tại sao nên chọn Bác Trà Ký?"
          description="Giữ trọn nét xưa, thêm những trải nghiệm mới – để mỗi chiếc bánh không chỉ ngon mà còn mang theo một câu chuyện."
          className="max-w-[58ch]"
        />
        <ol role="list" className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-6 lg:gap-7">
          {reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              as="li"
              delay={(index % 3) * 90}
              className={cn(
                "flex flex-col gap-4 rounded-3xl bg-paper p-5 shadow-sm transition-shadow hover:shadow-md lg:col-span-2",
                index === 3 && "lg:col-start-2",
              )}
            >
              <figure className="m-0">
                <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-be-2/60">
                  <Image
                    src={reason.image}
                    alt={reason.alt}
                    fill
                    sizes="(min-width: 1200px) 352px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className={reason.contain ? "object-contain" : "object-cover"}
                  />
                </div>
                <figcaption className="caption px-2 pt-2.5 text-center text-ink-soft">{reason.caption}</figcaption>
              </figure>
              <div className="px-2 pb-3 sm:px-3">
                <span aria-hidden="true" className="eyebrow block text-dong">0{index + 1}</span>
                <h3 className="mt-2 mb-3 text-h3 font-bold text-son">{reason.title}</h3>
                <p className="m-0 text-ink-soft">{reason.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
