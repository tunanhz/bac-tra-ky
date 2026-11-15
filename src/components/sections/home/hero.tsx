import Image from "next/image";
import { homeHeroArtwork, type HeroArtwork } from "@/config/home-hero";
import { sectionHref, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {down ? <path d="m6 9 6 6 6-6" /> : <path d="M4 12h15m-5-5 5 5-5 5" />}
    </svg>
  );
}

/** Khi chưa có banner, dùng ảnh bao bì và Bánh Bác có sẵn, không vẽ lại bao bì. */
export function Hero({ artwork = homeHeroArtwork }: { artwork?: HeroArtwork | null } = {}) {
  return (
    <section id="trang-chu" aria-labelledby="hero-title" className="home-hero">
      <div className="home-hero__clouds" aria-hidden="true">
        <svg viewBox="0 0 196 96" fill="none" stroke="currentColor" strokeWidth="1.15">
          <path d="M0 27c21-13 35-7 47 0 15 9 14 24 2 24-8 0-11-9-4-13m3-1c12-1 21 4 24 14 4 12 11 16 30 16 23 0 37 12 50 14m-152-40c23-7 38 6 50 15 13 9 19 13 37 13m-87-11c25-7 44 10 61 15 17 6 34-1 52 1 22 2 35 17 68 15m-181-17c18-4 32 9 53 13 24 4 42-5 62-4 23 1 35 11 81 11" />
        </svg>
      </div>
      <div className="home-hero__lotus" aria-hidden="true">
        <svg viewBox="0 0 218 110" fill="none" stroke="currentColor" strokeWidth="1.15">
          <path d="M63 62c25-13 49-22 75-29m-27 25c-16 12-41 17-64 9 11-2 19-13 32-15 14-3 24 1 32 6Zm29-24c-1 23-18 43-42 50 5-19 16-37 42-50Zm1 0c16 20 15 45 6 65-15-17-21-37-6-65Zm0 0c28 10 41 31 43 55-25-8-39-27-43-55Zm0 0c28-10 55-1 75 19-26 8-56 0-75-19Zm0 0c14-23 39-31 66-25-12 19-36 30-66 25Zm-59 18C68 30 53 25 32 26c15 6 19 24 50 26Zm-11 8C45 52 19 63 1 82c29 0 52-7 70-22Z" />
        </svg>
      </div>
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
            <a className={cn("home-hero__action", "home-hero__primary")} href={sectionHref("san-pham")}>
              Khám phá sản phẩm <Arrow />
            </a>
            <a className={cn("home-hero__action", "home-hero__secondary")} href={sectionHref("cau-chuyen")}>
              Khám phá câu chuyện <Arrow />
            </a>
          </div>
        </div>

        <div className={cn("home-hero__stage", artwork && "home-hero__official")}>
          {artwork ? (
            <Image src={artwork.src} alt={artwork.alt} fill preload sizes="(min-width: 768px) 58vw, 100vw" className="home-hero__artwork" />
          ) : (
            <>
              <div className="home-hero__village" aria-hidden="true">
                <Image src="/images/story/cong-lang-giang-xa.webp" alt="" fill sizes="(min-width: 768px) 60vw, 100vw" />
              </div>
              <div className="home-hero__fabric" aria-hidden="true" />
              <div className="home-hero__gift">
                <Image
                  src="/images/products/bo-qua-banh-bac-tra-sen.webp"
                  alt="Bộ quà Bác Trà Ký với Bánh Bác và Trà Sen Tây Hồ"
                  fill
                  preload
                  sizes="(min-width: 768px) 38vw, 68vw"
                />
              </div>
              <div className="home-hero__box">
                <Image src="/images/products/hop-6-banh.webp" alt="Hộp Bánh Bác Giang Xá" fill sizes="(min-width: 768px) 16vw, 40vw" />
              </div>
              <div className="home-hero__cake">
                <Image
                  src="/images/common/banh-bac-giang-xa.webp"
                  alt="Bánh Bác cuộn lá xanh và những lát bánh có lớp đỏ, trắng, nhân vàng"
                  fill
                  sizes="(min-width: 768px) 25vw, 55vw"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <a href="#gioi-thieu" className="home-hero__down" aria-label="Cuộn xuống phần giới thiệu"><Arrow down /></a>
    </section>
  );
}
