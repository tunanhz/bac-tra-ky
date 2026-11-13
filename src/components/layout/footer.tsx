import { NAV_ITEMS, sectionHref, siteConfig, telHref } from "@/config/site";
import type { ReactNode } from "react";
import { Logo } from "./logo";
import { FacebookIcon, TikTokIcon } from "./social-icons";

function Pending() {
  // TODO: thay dữ liệu thật — giá trị lấy từ src/config/site.ts / biến môi trường NEXT_PUBLIC_*.
  return <span className="text-[#f0b7a8] italic">{siteConfig.pendingLabel}</span>;
}

function ColumnTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3.5 font-body text-[0.72rem] font-bold tracking-[0.24em] text-nhu uppercase">{children}</h2>;
}

type SocialLinkProps = { href: string | null; label: string; children: ReactNode };

function SocialLink({ href, label, children }: SocialLinkProps) {
  const box = "flex size-11 items-center justify-center border border-nhu/60";
  if (!href) {
    return (
      <span className={`${box} text-nhu/45`} title={`${label}: ${siteConfig.pendingLabel}`}>
        {children}
        <span className="sr-only">{`${label} ${siteConfig.pendingLabel}`}</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${box} text-nhu transition-colors duration-300 hover:bg-nhu hover:text-son-deep`}
    >
      {children}
    </a>
  );
}

/**
 * Footer (hướng B): nền đỏ trầm `#4a0b0e`, viền trên `3px double` vàng nhũ; 4 cột: thương hiệu, khám phá (6 mục),
 * liên hệ, kết nối (Facebook/TikTok 44px); dòng bản quyền.
 */
export function Footer() {
  const { email, hotline, facebookUrl, tiktokUrl } = siteConfig;
  const linkClass =
    "inline-flex min-h-11 items-center text-[#efe2c6] no-underline transition-colors duration-300 hover:text-white hover:underline";

  return (
    <footer className="on-dark border-t-[3px] border-double border-nhu bg-tram pt-16 pb-7 text-be">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo size="footer" />
            <p className="mt-2 mb-0 font-heading text-[1.05rem] text-nhu italic">{siteConfig.slogan}</p>
          </div>

          <div>
            <ColumnTitle>Khám phá</ColumnTitle>
            <ul className="m-0 list-none p-0">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={sectionHref(item.id)} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Liên hệ</ColumnTitle>
            <address className="space-y-2 text-cream-muted not-italic">
              <p className="m-0">{siteConfig.address}</p>
              <p className="m-0">
                Hotline:{" "}
                {hotline ? (
                  <a href={telHref(hotline)} className={linkClass}>
                    {hotline}
                  </a>
                ) : (
                  <Pending />
                )}
              </p>
              <p className="m-0">
                Email:{" "}
                {email ? (
                  <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
                    {email}
                  </a>
                ) : (
                  <Pending />
                )}
              </p>
            </address>
          </div>

          <div>
            <ColumnTitle>Kết nối</ColumnTitle>
            <div className="flex gap-2.5">
              <SocialLink href={facebookUrl} label="Facebook Bác Trà Ký">
                <FacebookIcon className="size-[18px]" />
              </SocialLink>
              <SocialLink href={tiktokUrl} label="TikTok Bác Trà Ký">
                <TikTokIcon className="size-[18px]" />
              </SocialLink>
            </div>
            {!facebookUrl || !tiktokUrl ? (
              <p className="mt-2.5 mb-0 text-[0.78rem]">
                Liên kết mạng xã hội <Pending />
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-2 border-t border-nhu/25 pt-4.5 text-[0.8rem] text-[#cdb68f]">
          <p className="m-0">
            © {siteConfig.copyrightYear} {siteConfig.name}. {siteConfig.slogan}.
          </p>
          <p className="m-0">Ảnh minh hoạ: Unsplash &amp; Wikimedia Commons.</p>
        </div>
      </div>
    </footer>
  );
}
