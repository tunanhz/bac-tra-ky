import { sectionHref, siteConfig, telHref, type SectionId } from "@/config/site";
import type { ReactNode } from "react";
import { Logo } from "./logo";
import { FacebookIcon, GmailIcon, TikTokIcon } from "./social-icons";

function Pending() {
  // TODO: thay dữ liệu thật — giá trị lấy từ src/config/site.ts / biến môi trường NEXT_PUBLIC_*.
  return <span className="text-[#f0b7a8] italic">{siteConfig.pendingLabel}</span>;
}

function ColumnTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3.5 font-body text-[0.72rem] font-bold tracking-[0.24em] text-nhu uppercase">{children}</h2>;
}

type SocialLinkProps = { href: string | null; label: string; tone: string; children: ReactNode };

/** Màu thương hiệu của từng mạng xã hội (nền + icon), viền vàng nhũ mảnh giữ chất hộp sơn son. */
const SOCIAL_TONES = {
  facebook: "bg-[#1877f2] text-white",
  gmail: "bg-white",
  tiktok: "bg-[#010101] text-white [&_svg]:[filter:drop-shadow(-1.5px_-1px_0_#25f4ee)_drop-shadow(1.5px_1px_0_#fe2c55)]",
} as const;

const FOOTER_LINKS = [
  { id: "trang-chu", label: "Về trang chủ" },
  { id: "cau-chuyen", label: "Khám phá câu chuyện làng nghề" },
  { id: "san-pham", label: "Sản phẩm Bác Trà Ký" },
  { id: "ve-chung-toi", label: "Câu chuyện thương hiệu" },
  { id: "tin-tuc", label: "Tin tức" },
] as const satisfies readonly { id: SectionId; label: string }[];

function SocialLink({ href, label, tone, children }: SocialLinkProps) {
  /* Slide 17: Button bo góc zô */
  const box = `flex size-11 items-center justify-center rounded-xl ring-1 ring-nhu/70 ring-offset-2 ring-offset-tram shadow-[0_4px_12px_rgba(0,0,0,0.35)] ${tone}`;
  if (!href) {
    return (
      <span className={`${box} opacity-90`} title={`${label}: ${siteConfig.pendingLabel}`}>
        {children}
        <span className="sr-only">{`${label} ${siteConfig.pendingLabel}`}</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      aria-label={label}
      className={`${box} transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105`}
    >
      {children}
    </a>
  );
}

/**
 * Footer (hướng B): nền đỏ trầm `#4a0b0e`, viền trên `3px double` vàng nhũ; 4 cột: thương hiệu, thông tin (5 liên kết),
 * liên hệ, kết nối (Facebook/TikTok/Gmail 44px); dòng bản quyền.
 */
export function Footer() {
  const { email, hotline, facebookUrl, tiktokUrl } = siteConfig;
  /* Slide 17: Khám phá câu chuyện làng nghề viết thẳng ra ko xuống dòng */
  const linkClass =
    "inline-flex min-h-11 items-center whitespace-nowrap text-[#efe2c6] no-underline transition-colors duration-300 hover:text-white hover:underline";

  return (
    <footer className="on-dark border-t border-nhu/50 bg-tram pt-12 pb-7 text-be has-[+_.quick-contact]:pb-20 md:pt-16 md:has-[+_.quick-contact]:pb-7">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1.5fr_1fr_1fr]">
          <div>
            <Logo size="footer" />
            <p className="mt-2 mb-0 font-heading text-[1.05rem] text-nhu italic">{siteConfig.slogan}</p>
          </div>

          <div>
            <ColumnTitle>Thông tin</ColumnTitle>
            <ul className="m-0 list-none p-0">
              {FOOTER_LINKS.map((item) => (
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
              <p className="m-0">Địa chỉ: {siteConfig.address}</p>
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
              <SocialLink href={facebookUrl} label="Facebook Bác Trà Ký" tone={SOCIAL_TONES.facebook}>
                <FacebookIcon className="size-[22px]" />
              </SocialLink>
              <SocialLink href={tiktokUrl} label="TikTok Bác Trà Ký" tone={SOCIAL_TONES.tiktok}>
                <TikTokIcon className="size-[20px]" />
              </SocialLink>
              <SocialLink href={email ? `mailto:${email}` : null} label="Gmail Bác Trà Ký" tone={SOCIAL_TONES.gmail}>
                <GmailIcon className="size-[21px]" />
              </SocialLink>
            </div>
            {!facebookUrl || !tiktokUrl ? (
              <p className="mt-2.5 mb-0 text-[0.78rem]">
                Liên kết mạng xã hội <Pending />
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 border-t border-nhu/25 pt-4.5 text-[0.8rem] text-[#cdb68f]">
          <p className="m-0">
            © {siteConfig.copyrightYear} {siteConfig.name}. {siteConfig.slogan}.
          </p>
        </div>
      </div>
    </footer>
  );
}
