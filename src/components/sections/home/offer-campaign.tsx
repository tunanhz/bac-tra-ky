import Image from "next/image";
import type { ReactNode } from "react";
import teaPhoto from "../../../../public/images/news/bac-tra-ky-cuon-ky-su-banh-bac-ben-chen-tra.webp";
import cakePhoto from "../../../../public/images/products/hop-2-banh.webp";
import { Divider } from "@/components/ornaments/divider";
import { cn } from "@/lib/cn";
import { getOfferEndTime, type CustomerOffer } from "@/data/customer-content";
import { OfferWindow } from "./offer-window";

const PHOTO_SIZES = "(min-width: 1200px) 320px, (min-width: 1024px) 26vw, 41vw";

function OfferIllustrations() {
  return (
    <>
      <figure data-offer-art="banh" className="m-0 self-center lg:col-start-1 lg:row-start-1">
        <div className="relative aspect-[5/4] overflow-hidden rounded-t-[42%] border border-nhu/60 bg-be lg:aspect-[4/5] lg:rounded-t-[48%]">
          <Image
            src={cakePhoto}
            alt="Hộp hai chiếc Bánh Bác, bao bì xanh và đỏ"
            fill
            sizes={PHOTO_SIZES}
            className="object-contain"
          />
        </div>
        <figcaption className="caption pt-2 text-center text-cream-muted">Hộp Bánh Bác</figcaption>
      </figure>
      <figure data-offer-art="tra" className="m-0 self-center lg:col-start-3 lg:row-start-1">
        <div className="relative aspect-[5/4] overflow-hidden rounded-t-[42%] border border-nhu/60 bg-be lg:aspect-[4/5] lg:rounded-t-[48%]">
          <Image
            src={teaPhoto}
            alt="Ấm trà đất và chén trà đặt bên khay Bánh Bác"
            fill
            sizes={PHOTO_SIZES}
            className="object-cover object-[12%_50%]"
          />
        </div>
        <figcaption className="caption pt-2 text-center text-cream-muted">Bánh Bác bên chén trà sen</figcaption>
      </figure>
    </>
  );
}

export function OfferCampaign({ offer, serverNow, preview, discount, expired, children }: {
  offer: CustomerOffer;
  serverNow: number | null;
  preview?: boolean;
  discount?: string;
  expired: ReactNode;
  children: ReactNode;
}) {
  const headingId = "offers-title";
  return (
    <section
      id="uu-dai"
      aria-labelledby={headingId}
      aria-describedby={preview ? "offer-preview-notice" : undefined}
      className="on-dark frame-gilt relative isolate min-w-0 scroll-mt-24 overflow-hidden bg-son-deep text-be"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-gac-deep),transparent_72%)]" />
      {preview && (
        <p id="offer-preview-notice" className="m-0 border-b border-nhu/55 bg-be px-4 py-3 text-center text-xs font-bold tracking-widest text-son">
          DỮ LIỆU MẪU / KHÔNG NHẬN ĐƠN
        </p>
      )}
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 px-5 py-7 sm:gap-x-7 sm:px-9 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)_minmax(0,1fr)] lg:gap-x-8">
        <div data-offer-center className="col-span-2 mx-auto w-full max-w-md min-w-0 text-center lg:col-span-1 lg:col-start-2 lg:row-start-1">
          <h2 id={headingId} className="m-0 inline-block rounded-full border border-nhu/70 px-5 py-1.5 font-body text-sm font-bold tracking-wider text-nhu uppercase">
            Ưu đãi đặc biệt
          </h2>
          {serverNow === null ? expired : <OfferWindow
            endTime={getOfferEndTime(offer.endsOn)}
            serverNow={serverNow}
            expired={expired}
            panelClassName="mt-3 rounded-2xl border border-nhu/70 bg-son-deep/75 px-2.5 pt-4 pb-2 sm:px-4"
            intro={(
              <header className="mt-4">
                {discount && (
                  <p className="m-0 mb-2 font-heading text-[clamp(3.5rem,8vw,6rem)] leading-none font-bold text-nhu italic">
                    <span className="sr-only">Giảm </span>{discount}
                  </p>
                )}
                <h3 className={cn("m-0 mb-2 font-bold text-be", discount ? "text-h3" : "text-h2")}>{offer.title}</h3>
                <p className="mx-auto mt-0 mb-0 max-w-[40ch] text-sm text-cream-muted sm:text-base">{offer.description}</p>
                <Divider className="mx-auto mt-2 h-4 w-28 text-nhu" />
              </header>
            )}
          >
            {children}
          </OfferWindow>}
        </div>
        <OfferIllustrations />
      </div>
    </section>
  );
}
