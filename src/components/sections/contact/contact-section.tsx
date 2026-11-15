import Image from "next/image";
import type { ReactNode } from "react";
import { FacebookIcon, TikTokIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, telHref } from "@/config/site";
import { ContactForm } from "./contact-form";

const VILLAGE_IMAGE = "/images/common/san-lang-giang-xa.webp";

function Pending() {
  // TODO: thay dữ liệu thật — giá trị lấy từ src/config/site.ts (biến môi trường NEXT_PUBLIC_*).
  return <span className="text-muted italic">{siteConfig.pendingLabel}</span>;
}

function InfoRow({ label, icon, children }: { label: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-2 border-b border-dashed border-line py-1 last:border-b-0 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-3 sm:py-3">
      <dt className="flex items-center gap-2 text-[0.72rem] font-bold tracking-wider text-dong sm:tracking-[0.2em] uppercase">
        {icon}
        {label}
      </dt>
      <dd className="m-0 min-w-0 wrap-anywhere text-ink max-sm:py-1">{children}</dd>
    </div>
  );
}

const LINK = "max-sm:inline-flex max-sm:min-h-11 max-sm:items-center text-gac underline decoration-gac/40 underline-offset-4 transition-colors hover:decoration-gac";

/**
 * Liên hệ (id `lien-he`) — nền be thuần (khoảng nghỉ thứ hai, giữ sơn son ≤ 20% trang).
 * Desktop: trái = lời mời + thông tin liên hệ + ảnh làng quê trong khung passe-partout; phải = form trên tấm giấy viền
 * đôi. Mobile: lời mời → thông tin liên hệ → form.
 */
export function ContactSection() {
  const { facebookUrl, tiktokUrl, email, hotline, address } = siteConfig;

  return (
    <section id="lien-he" aria-labelledby="contact-title" className="section-y">
      <div className="wrap grid gap-7 lg:gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-16 lg:gap-y-8">
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeading
            id="contact-title"
            align="left"
            eyebrow="Bác Trà Ký"
            title="Liên hệ"
            description="Bạn muốn tìm hiểu về Bánh Bác Giang Xá, Trà Sen hay đặt một hộp quà? Hãy để lại lời nhắn, Bác Trà Ký luôn sẵn lòng lắng nghe và kể bạn nghe câu chuyện phía sau mỗi món quà."
            className="mb-0 lg:mb-0"
          />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <h3 className="mt-0 mb-2 text-h3 font-semibold text-son">Thông tin liên hệ</h3>
          <dl className="m-0">
            <InfoRow label="Facebook" icon={<FacebookIcon className="size-3.5" />}>
              {facebookUrl ? (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Trang Facebook Bác Trà Ký
                </a>
              ) : (
                <Pending />
              )}
            </InfoRow>
            <InfoRow label="TikTok" icon={<TikTokIcon className="size-3.5" />}>
              {tiktokUrl ? (
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kênh TikTok Bác Trà Ký
                </a>
              ) : (
                <Pending />
              )}
            </InfoRow>
            <InfoRow label="Email">
              {email ? (
                <a href={`mailto:${email}`} className={`${LINK} break-all`}>
                  {email}
                </a>
              ) : (
                <Pending />
              )}
            </InfoRow>
            <InfoRow label="Hotline">
              {hotline ? (
                <a href={telHref(hotline)} className={LINK}>
                  {hotline}
                </a>
              ) : (
                <Pending />
              )}
            </InfoRow>
            <InfoRow label="Địa chỉ">
              <address className="not-italic">{address}</address>
            </InfoRow>
          </dl>

          <figure className="on-dark mt-8 mb-0 hidden bg-son-deep sm:block p-2.5 outline outline-offset-[-8px] outline-nhu/55 md:p-3.5">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={VILLAGE_IMAGE}
                alt="Sân lát gạch với lọng và đồ lễ ở làng Giang Xá"
                fill
                sizes="(min-width: 1024px) 480px, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="caption px-1.5 pt-3 pb-0.5 text-center">
              Không gian làng Giang Xá — ảnh tư liệu
            </figcaption>
          </figure>
        </div>

        <Reveal className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="frame-paper px-5 py-8 shadow-paper sm:px-9 sm:py-10">
            <h3 className="mt-0 mb-6 text-h3 font-semibold text-son">Để lại lời nhắn</h3>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
