import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./customer-scenes.module.css";
import { getOfferEndTime, type CustomerOffer } from "@/data/customer-content";
import { OfferWindow } from "./offer-window";

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
      className={`on-dark relative isolate min-w-0 scroll-mt-24 overflow-hidden w-full py-4 text-be shadow-2xl sm:py-6 lg:py-8 ${styles.offer}`}
    >
      <div aria-hidden="true" className={styles.offerScenery}>
        <Image src="/images/revisions/feedback-home-village-gold.png" alt="" fill sizes="55vw" className={styles.offerVillage} />
        <Image src="/images/revisions/feedback-home-gift.png" alt="" fill sizes="50vw" className={styles.offerGift} />
      </div>
      {preview && (
        <p id="offer-preview-notice" className="m-0 border-b border-nhu/55 bg-be px-4 py-2 text-center text-xs font-bold tracking-widest text-son">
          DỮ LIỆU MẪU / KHÔNG NHẬN ĐƠN
        </p>
      )}
      <div className="wrap relative z-10 py-4 sm:py-6 lg:py-8">
        <div data-offer-center className="mx-auto w-full min-w-0 max-w-xl lg:max-w-none">
          {serverNow === null ? expired : <OfferWindow
            endTime={getOfferEndTime(offer.endsOn)}
            serverNow={serverNow}
            expired={expired}
            panelClassName="mt-3 rounded-2xl border border-nhu/75 bg-son-deep/80 px-3 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.45)] sm:px-4 sm:py-3"
            artwork={(
              <div aria-hidden="true" className={styles.cake}>
                <Image src="/images/revisions/feedback-home-gift.png" alt="" fill sizes="(min-width: 1024px) 32vw, 75vw" className="object-contain object-left-bottom" />
              </div>
            )}
            intro={(
              <header className="text-center lg:text-left">
                <div className="mb-2">
                  <h2 id={headingId} className="m-0 text-h2 font-display font-bold text-nhu">
                    Ưu đãi đặc biệt
                  </h2>
                </div>
                {/* Canva bản 149, trang 1: GIẢM 10% là điểm nhấn chính, không thu nhỏ như nhãn phụ. */}
                {discount && (
                  <div className={`m-0 mb-2 flex items-baseline justify-center gap-2.5 lg:justify-start ${styles.discount}`}>
                    <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.04em] text-be/95 uppercase">
                      GIẢM
                    </span>
                    <span className="font-heading text-6xl sm:text-7xl lg:text-8xl font-extrabold text-nhu italic drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                      {discount}
                    </span>
                  </div>
                )}
                <h3 className="m-0 mb-2 text-h3 font-bold text-be">{offer.title}</h3>
                <p className="m-0 text-base text-cream-muted leading-relaxed max-w-[38ch] mx-auto lg:mx-0">{offer.description}</p>
              </header>
            )}
          >
            {children}
          </OfferWindow>}
        </div>
      </div>
    </section>
  );
}
