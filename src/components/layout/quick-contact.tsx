import { siteConfig, telHref } from "@/config/site";
import { FacebookIcon } from "./social-icons";

const action =
  "grid size-11 place-items-center rounded-full border border-nhu/70 text-be shadow-card transition-colors duration-300 ease-son hover:bg-gac-deep";

/** Kênh liên hệ nhanh: chỉ hiện các kênh có cấu hình hợp lệ, không chen vào menu hay hộp thoại. */
export function QuickContact() {
  const { hotline, facebookUrl } = siteConfig;
  if (!hotline && !facebookUrl) return null;

  return (
    <aside
      aria-label="Liên hệ nhanh"
      className="quick-contact on-dark fixed right-[max(0.75rem,env(safe-area-inset-right))] bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-2 md:right-5 md:bottom-6 md:flex-col"
    >
      {hotline ? (
        <a href={telHref(hotline)} aria-label={`Gọi điện: ${hotline}`} title={`Gọi ${hotline}`} className={`${action} bg-gac`}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 3h3l2 5-2 2a14 14 0 0 0 6 6l2-2 5 2v3a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ) : null}
      {facebookUrl ? (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook Bác Trà Ký"
          title="Facebook Bác Trà Ký"
          className={`${action} bg-son-deep`}
        >
          <FacebookIcon className="size-5" />
        </a>
      ) : null}
    </aside>
  );
}
