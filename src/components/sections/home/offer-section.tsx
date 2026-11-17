"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { sectionHref, siteConfig } from "@/config/site";
import { getActiveOffer, type CustomerOffer } from "@/data/customer-content";
import { OfferCampaign } from "./offer-campaign";
import { OfferPreviewForm } from "./offer-preview-form";

function OfferAnnouncement() {
  const { facebookUrl } = siteConfig;
  return (
    <div className="text-cream-muted">
      <p className="m-0 mb-2 font-display text-h3 font-bold text-be">
        Thưởng thức vị bánh quê bên chén trà sen
      </p>
      <p className="mt-0 mb-5 max-w-[42ch]">
        Hiện chưa có chương trình ưu đãi. Theo dõi Bác Trà Ký để biết thời gian và điều kiện áp dụng
        khi có chương trình mới.
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button
          href={facebookUrl ?? siteConfig.orderChannelUrl}
          variant="outline-light"
          className="max-sm:px-4 max-sm:tracking-[0.08em]"
        >
          {facebookUrl ? "Theo dõi trên Facebook" : "Liên hệ Bác Trà Ký"}{" "}
          <span aria-hidden="true">→</span>
        </Button>
        <a
          href={sectionHref("san-pham")}
          className="inline-flex min-h-11 items-center text-be underline underline-offset-4 hover:text-nhu"
        >
          Xem các bộ quà
        </a>
      </div>
    </div>
  );
}

function OfferStandby() {
  return (
    <section
      id="uu-dai"
      aria-labelledby="offers-title"
      className="on-dark min-w-0 scroll-mt-24 rounded-3xl bg-son text-be shadow-md"
    >
      <div className="grid items-center gap-6 px-5 py-7 sm:px-8 sm:py-10 lg:grid-cols-[1fr_0.95fr] lg:gap-12 lg:px-12">
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <p className="eyebrow m-0 text-nhu">Tin từ Bác Trà Ký</p>
          <h2 id="offers-title" className="mt-3 mb-4 text-h2 font-bold text-be">
            Ưu đãi
          </h2>
          <div className="border-t border-nhu/40 pt-4">
            <OfferAnnouncement />
          </div>
        </div>
        <figure className="m-0 min-w-0 lg:col-start-1 lg:row-start-1">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-be shadow-sm">
            <Image
              src="/images/products/bo-qua-banh-bac-tra-sen.webp"
              alt="Bộ quà Bánh Bác và Trà Sen Tây Hồ của Bác Trà Ký"
              fill
              sizes="(min-width: 1200px) 520px, (min-width: 1024px) 46vw, 85vw"
              className="object-contain"
            />
          </div>
          <figcaption className="caption pt-2 text-center text-cream-muted">
            Bộ quà Bánh Bác và Trà Sen · Ấn phẩm Bác Trà Ký
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const DEFAULT_NOW = 1794907884000;

export function OfferSection({ offer }: { offer: CustomerOffer | null }) {
  const [now, setNow] = useState(DEFAULT_NOW);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  if (offer?.status !== "published") return <OfferStandby />;

  const active = getActiveOffer(offer, now);
  if (!active) return <OfferStandby />;

  return (
    <OfferCampaign
      key={active.endsOn}
      offer={active}
      serverNow={now}
      discount="10%"
      expired={
        <p role="status" className="mt-5 mb-0 text-cream-muted">
          Chương trình đã kết thúc.
        </p>
      }
    >
      <OfferPreviewForm />
    </OfferCampaign>
  );
}
