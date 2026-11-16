import Image from "next/image";
import { homeHeroArtwork } from "@/config/home-hero";
import { sectionHref, siteConfig } from "@/config/site";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 12h15m-5-5 5 5-5 5" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="trang-chu" aria-labelledby="hero-title" className="home-hero">
      <div className="home-hero__inner">
        <div className="home-hero__panel">
          <h1 id="hero-title" aria-label={`${siteConfig.name} – ${siteConfig.slogan}`} className="home-hero__title">
            {siteConfig.name}
            <span className="home-hero__slogan">{siteConfig.slogan}</span>
          </h1>
          <p className="home-hero__lead">
            Từ hương vị Bánh Bác Giang Xá đến nét thanh tao của Trà Sen Việt, Bác Trà Ký mang đến những thức quà đậm đà
            bản sắc, nơi hương vị truyền thống được gìn giữ và tiếp nối trong nhịp sống hiện đại.
          </p>
          <div className="home-hero__actions">
            <a className="home-hero__action home-hero__primary" href={sectionHref("san-pham")}>
              Khám phá sản phẩm <Arrow />
            </a>
            <a className="home-hero__action home-hero__secondary" href={sectionHref("cau-chuyen")}>
              Khám phá câu chuyện <Arrow />
            </a>
          </div>
        </div>
        <div className="home-hero__stage">
          <div className="home-hero__artwork">
            <Image
              src={homeHeroArtwork.src}
              alt={homeHeroArtwork.alt}
              fill
              preload
              sizes="(max-width: 39.999rem) 171vw, (max-width: 63.999rem) 125vw, 100vw"
            />
            <a href="#featured-title" className="home-hero__down" aria-label="Cuộn xuống sản phẩm nổi bật" />
          </div>
        </div>
      </div>
    </section>
  );
}
