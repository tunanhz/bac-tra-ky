import Image from "next/image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { GIFT_BOX_CONTENT } from "@/data/products";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";
import { FlavorGallery, type FlavorSlide } from "./flavor-gallery";

const FLAVORS = [
  { name: "Truyền thống", slug: "banh-bac-nhan-dau-xanh" },
  { name: "Khoai môn", slug: "banh-bac-nhan-khoai-mon" },
  { name: "Matcha", slug: "banh-bac-nhan-matcha" },
  { name: "Đậu đỏ", slug: "banh-bac-nhan-dau-do" },
] as const;

const COLLECTIONS = [
  {
    product: "hop-2-banh",
    title: "Chạm Ký Ức",
    size: "Combo 2 bánh",
    description: "Những chiếc Bánh Bác mang hương vị truyền thống, gói ghém ký ức thân quen và tình quê Giang Xá.",
  },
  {
    product: "hop-6-banh",
    title: "Gom Ký Ức",
    size: "Combo 6 bánh",
    description: "Hộp 6 chiếc thích hợp để thưởng thức trọn vẹn hương vị yêu thích hoặc gửi trao món quà quê thân tình.",
  },
  {
    product: "bo-qua-banh-bac-tra-sen",
    title: "Trao Ký Ức",
    size: "Hộp quà cao cấp",
    description: "Sự kết hợp hài hòa giữa hương vị bánh Bác truyền thống và nét thanh tao của trà sen Tây Hồ, mang đến trải nghiệm thưởng thức trọn vẹn và tinh tế.",
  },
] as const;

function getFlavorSlides(products: readonly Product[], box: Product): FlavorSlide[] {
  const sixPack = box.slug === "hop-6-banh";
  const boxSlide = { name: "Hộp bánh", src: box.image, alt: box.imageAlt, note: sixPack ? "Hộp 6 bánh nhân đậu xanh truyền thống" : "Hộp 2 Bánh Bác của Bác Trà Ký" };
  const slides: FlavorSlide[] = sixPack
    ? [{ ...boxSlide, name: "Truyền thống" }]
    : [boxSlide];
  for (const { name, slug } of FLAVORS) {
    if (sixPack && name === "Truyền thống") continue;
    if (sixPack && name === "Matcha") {
      slides.push({ name, src: "/images/products/hop-6-banh-matcha.webp", alt: "Hộp 6 Bánh Bác nhân matcha", note: "Hộp 6 bánh nhân matcha" });
      continue;
    }
    const flavor = products.find((item) => item.slug === slug);
    if (flavor) slides.push({ name, src: flavor.image, alt: flavor.imageAlt, note: `Ảnh vị ${name.toLowerCase()} · Không phải ảnh combo` });
  }
  slides.push({ name: "Nhân mặn", note: "Ảnh riêng vị nhân mặn đang cập nhật.", pending: true });
  return slides;
}

export function GiftCollections({ products }: { products: readonly Product[] }) {
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {COLLECTIONS.map(({ product, title, size, description }, index) => {
        const box = products.find((item) => item.slug === product);
        if (!box) return null;
        const premium = product === "bo-qua-banh-bac-tra-sen";
        const titleId = `collection-${product}`;
        return (
          <article key={product} aria-labelledby={titleId} className={cn("flex min-w-0 flex-col rounded-3xl bg-paper p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6", premium && "md:max-lg:col-span-2 md:max-lg:w-full md:max-lg:max-w-[26rem] md:max-lg:justify-self-center")}>
            <header className="px-1 pt-1 pb-4">
              <p className="eyebrow m-0">0{index + 1} · {size}</p>
              <h3 id={titleId} className="mt-2 mb-0 text-h3 font-bold text-gac">{title}</h3>
            </header>
            {premium ? (
              <figure className="m-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-be-2/50">
                  <Image src={box.image} alt={box.imageAlt} fill sizes="(min-width: 1200px) 350px, (min-width: 1024px) 29vw, (min-width: 768px) 44vw, 88vw" className="object-contain" />
                </div>
                <figcaption className="caption min-h-14 px-1 pt-3 text-ink-soft">Hộp quà Bánh Bác và Trà Sen · Ảnh từ Bác Trà Ký</figcaption>
              </figure>
            ) : <FlavorGallery label={title} slides={getFlavorSlides(products, box)} />}
            <p className="mt-4 mb-4 px-1 text-ink-soft">{description}</p>
            {premium && (
              <ul role="list" className="m-0 mb-5 grid list-none gap-2 border-t border-line px-1 pt-4 text-sm text-tra">
                {GIFT_BOX_CONTENT.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            <div className="mt-auto px-1 pt-2 pb-1">
              <Button href={siteConfig.orderChannelUrl} variant={premium ? "primary" : "outline"} aria-label={`Liên hệ ngay về ${title}`}>
                Liên hệ ngay <span aria-hidden="true">→</span>
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
