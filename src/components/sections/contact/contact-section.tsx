import Image from "next/image";
import type { ReactNode } from "react";
import { FacebookIcon, TikTokIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, telHref } from "@/config/site";

const VILLAGE_IMAGE = "/images/common/san-lang-giang-xa.webp";

function Pending() {
  // TODO: thay dữ liệu thật — giá trị lấy từ src/config/site.ts (biến môi trường NEXT_PUBLIC_*).
  return <span className="text-muted italic">{siteConfig.pendingLabel}</span>;
}

function InfoRow({ label, icon, children }: { label: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-2 border-b border-dashed border-line py-1.5 last:border-b-0 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-3 sm:py-3">
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
 * Cấu trúc 2 cột: Cột 1 = thông tin liên hệ trên tấm giấy dó (`bg-paper`); Cột 2 = ảnh làng quê trong khung sơn son.
 */
export function ContactSection() {
  const { facebookUrl, tiktokUrl, email, hotline, address } = siteConfig;

  return (
    <section id="lien-he" aria-labelledby="contact-title" className="section-y">
      <div className="wrap">
        <SectionHeading
          id="contact-title"
          title="Liên hệ"
          description="Bạn muốn tìm hiểu về Bánh Bác Giang Xá, Trà Sen hay đặt một hộp quà? Bác Trà Ký luôn sẵn lòng lắng nghe và kết nối cùng bạn."
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="h-full lg:col-span-6">
            <div className="flex h-full flex-col justify-center rounded-3xl bg-paper p-6 shadow-sm sm:p-9 lg:p-10">
              <h3 className="mt-0 mb-4 text-h3 font-semibold text-son">Thông tin liên hệ</h3>
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
            </div>
          </Reveal>

          <Reveal className="h-full lg:col-span-6">
            <figure className="on-dark m-0 flex h-full flex-col justify-center rounded-3xl bg-son-deep p-4 shadow-md sm:p-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={VILLAGE_IMAGE}
                  alt="Sân lát gạch với lọng và đồ lễ ở làng Giang Xá"
                  fill
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="caption px-1.5 pt-3.5 pb-0.5 text-center text-cream-muted">
                Không gian làng Giang Xá — ảnh tư liệu
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
