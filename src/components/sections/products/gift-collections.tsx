import Image from "next/image";
import { siteConfig, telHref } from "@/config/site";
import { GIFT_BOX_CONTENT } from "@/data/products";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";
import { FlavorGallery, type FlavorSlide } from "./flavor-gallery";

const SIX_PACK_FLAVORS: FlavorSlide[] = [
  {
    name: "Truyền thống",
    src: "/images/products/hop-6-banh.webp",
    alt: "Hộp 6 bánh nhân đậu xanh truyền thống",
    note: "Nhân đậu xanh truyền thống thơm bùi",
  },
  {
    name: "Matcha",
    src: "/images/products/hop-6-banh-matcha.webp",
    alt: "Hộp 6 Bánh Bác nhân matcha",
    note: "Nhân matcha thanh mát, dịu nhẹ",
  },
  {
    name: "Khoai môn",
    src: "/images/products/hop-6-banh-khoai-mon.webp",
    alt: "Hộp 6 Bánh Bác nhân khoai môn",
    note: "Nhân khoai môn dẻo bùi tự nhiên",
  },
  {
    name: "Đậu đỏ",
    src: "/images/products/hop-6-banh-dau-do.webp",
    alt: "Hộp 6 Bánh Bác nhân đậu đỏ",
    note: "Nhân đậu đỏ ngọt dịu đậm vị quê",
  },
  {
    name: "Nhân mặn",
    src: "/images/products/hop-6-banh-nhan-man.webp",
    alt: "Hộp 6 Bánh Bác nhân mặn đặc biệt",
    note: "Nhân mặn hài hòa, tròn vị",
  },
];

const COLLECTIONS = [
  {
    product: "hop-2-banh",
    title: "Chạm Ký Ức",
    size: "Combo 2 bánh",
    image: "/images/products/hop-2-banh.webp",
    imageAlt: "Hộp 2 chiếc Bánh Bác Giang Xá",
    caption: "Hộp 2 Bánh Bác truyền thống",
    description: "Những chiếc Bánh Bác mang hương vị truyền thống, gói ghém ký ức thân quen và tình quê Giang Xá.",
    specs: ["02 bánh hương vị truyền thống", "Đóng gói hút chân không tiện lợi", "Bảo quản dễ dàng, thích hợp dùng thử"],
  },
  {
    product: "hop-6-banh",
    title: "Gom Ký Ức",
    size: "Combo 6 bánh",
    image: "/images/products/hop-6-banh.webp",
    imageAlt: "Hộp 6 Bánh Bác đa dạng hương vị",
    caption: "Hộp 6 Bánh Bác – Tự chuyển các vị nhân",
    description: "Hộp 6 chiếc thích hợp để thưởng thức trọn vẹn hương vị yêu thích hoặc gửi trao món quà quê thân tình.",
    specs: ["Đủ 5 vị nhân: mặn, truyền thống, khoai môn, matcha, đậu đỏ", "Bao bì trang nhã, đẹp mắt", "Thích hợp sum họp gia đình hoặc làm quà biếu"],
  },
  {
    product: "bo-qua-banh-bac-tra-sen",
    title: "Trao Ký Ức",
    size: "Hộp quà cao cấp",
    image: "/images/products/bo-qua-banh-bac-tra-sen.webp",
    imageAlt: "Hộp quà cao cấp Bánh Bác và Trà Sen Tây Hồ",
    caption: "Hộp quà cao cấp Bánh Bác và Trà Sen",
    description: "Sự kết hợp hài hòa giữa hương vị bánh Bác truyền thống và nét thanh tao của trà sen Tây Hồ, mang đến trải nghiệm thưởng thức trọn vẹn và tinh tế.",
    specs: [
      "03 bánh nhân matcha",
      "03 bánh nhân đậu xanh",
      "03 bánh nhân khoai môn",
      "01 hộp trà sen Tây Hồ thượng hạng",
    ],
  },
] as const;

export function GiftCollections({ products }: { products: readonly Product[] }) {
  const hotlineHref = siteConfig.hotline ? telHref(siteConfig.hotline) : "tel:0966453916";

  return (
    <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {COLLECTIONS.map(({ product, title, size, image, imageAlt, caption, description, specs }, index) => {
        const isSixPack = product === "hop-6-banh";
        const isPremium = product === "bo-qua-banh-bac-tra-sen";
        const titleId = `collection-${product}`;

        return (
          <article
            key={product}
            aria-labelledby={titleId}
            className="group flex min-w-0 flex-col overflow-hidden rounded-3xl bg-paper shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Header sơn son sang trọng theo bảng màu chủ đạo Đỏ Gấc & Vàng Nhũ */}
            <div className="border-b border-nhu/30 bg-[#8e0b16] px-6 py-4 text-be shadow-inner">
              <span className="text-xs font-bold tracking-widest text-nhu uppercase">
                Nhóm 0{index + 1} · {size}
              </span>
              <h3 id={titleId} className="mt-1 mb-0 font-display text-2xl font-bold text-be">
                {title}
              </h3>
            </div>

            <div className="flex flex-1 flex-col p-6">
              {/* Ảnh: Hộp 6 bánh tự chuyển ảnh (Slide 7: Tự chuyển ảnh để nguyên cho hộp 6, hộp 2 với box kia để 1 ảnh thôi) */}
              {isSixPack ? (
                <FlavorGallery label={title} slides={SIX_PACK_FLAVORS} />
              ) : (
                <figure className="m-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-be-2/50 p-2">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1200px) 350px, (min-width: 1024px) 29vw, (min-width: 768px) 44vw, 88vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="caption px-1 pt-3 text-center text-ink-soft">
                    {caption}
                  </figcaption>
                </figure>
              )}

              <p className="mt-4 mb-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                {description}
              </p>

              {/* Chi tiết / Quy cách */}
              <div className="mt-auto border-t border-line/60 pt-4 pb-5">
                <p className="caption mb-2 font-bold text-son uppercase">Quy cách & hương vị:</p>
                <ul role="list" className="m-0 space-y-1.5 list-none p-0 text-xs text-ink sm:text-sm">
                  {specs.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gac" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nút Liên hệ ngay: Gọi điện thoại trực tiếp theo Slide 7 */}
              <div className="pt-2">
                <a
                  href={hotlineHref}
                  aria-label={`Liên hệ ngay về ${title} (Gọi ${siteConfig.hotline})`}
                  className={cn(
                    "flex min-h-12 w-full items-center justify-center gap-2 rounded-full font-body text-sm font-bold no-underline shadow-sm transition-all duration-300 hover:shadow-md sm:text-base",
                    isPremium
                      ? "bg-gac text-be hover:bg-gac-deep"
                      : "border-2 border-gac bg-transparent text-gac hover:bg-gac hover:text-be"
                  )}
                >
                  LIÊN HỆ NGAY <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
