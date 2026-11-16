import Image from "next/image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { GIFT_BOX_CONTENT } from "@/data/products";
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
    description: "Những chiếc Bánh Bác gói ghém hương vị thân quen và tình quê Giang Xá, trong một hộp quà nhỏ gọn.",
  },
  {
    product: "hop-6-banh",
    title: "Gom Ký Ức",
    size: "Combo 6 bánh",
    description: "Hộp 6 chiếc để thưởng thức trọn vẹn hương vị yêu thích hoặc gửi trao một món quà quê thân tình.",
  },
  {
    product: "bo-qua-banh-bac-tra-sen",
    title: "Trao Ký Ức",
    size: "Hộp quà cao cấp",
    description: "Bánh Bác Giang Xá và Trà Sen Tây Hồ trong cùng một hộp quà — đủ để sẻ chia vị bánh và thưởng một chén trà thơm.",
  },
] as const;

function getFlavorSlides(products: readonly Product[], box: Product): FlavorSlide[] {
  const boxSlide = { name: "Hộp bánh", src: box.image, alt: box.imageAlt, note: box.name };
  const sixPack = box.slug === "hop-6-banh";
  const slides: FlavorSlide[] = sixPack
    ? [{ ...boxSlide, name: "Truyền thống", note: "Hộp 6 bánh nhân đậu xanh truyền thống" }]
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
    <div className="mb-14 grid items-stretch gap-5 lg:mb-20 lg:grid-cols-3 lg:gap-6">
      {COLLECTIONS.map(({ product, title, size, description }, index) => {
        const box = products.find((item) => item.slug === product);
        if (!box) return null;
        const premium = product === "bo-qua-banh-bac-tra-sen";
        const titleId = `collection-${product}`;
        return (
          <article key={product} aria-labelledby={titleId} className="frame-paper flex min-w-0 flex-col p-4 shadow-paper sm:p-5">
            <header className="px-1 pt-1 pb-4">
              <p className="eyebrow m-0">0{index + 1} · {size}</p>
              <h3 id={titleId} className="mt-2 mb-0 text-h3 font-bold text-gac">{title}</h3>
            </header>
            {premium ? (
              <div className="relative aspect-[4/3] overflow-hidden bg-be-2">
                <Image src={box.image} alt={box.imageAlt} fill sizes="(min-width: 1200px) 350px, (min-width: 1024px) 29vw, 88vw" className="object-contain p-1" />
              </div>
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
