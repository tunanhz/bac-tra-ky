import Image from "next/image";
import { io } from "next/cache";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { sectionHref, siteConfig } from "@/config/site";
import { customerOffer, customerReviews, getActiveOffer, type CustomerOffer, type CustomerReview } from "@/data/customer-content";
import { CustomerFeedbackForm } from "./customer-feedback-form";

function FeedbackSection({ reviews }: { reviews: readonly CustomerReview[] }) {
  const { email, facebookUrl } = siteConfig;
  const published = reviews.filter((review) => review.status === "published");

  return (
    <section id="goc-feedback" aria-labelledby="feedback-title" className="frame-paper min-w-0 scroll-mt-24 p-6 shadow-paper sm:p-9">
      <p className="eyebrow m-0">Lời nhắn từ bạn</p>
      <h2 id="feedback-title" className="mt-3 mb-3 text-h2 font-bold text-gac">Góc Feedback</h2>
      {published.length > 0 && (
        <ul aria-label="Cảm nhận đã được phép đăng" className="m-0 mb-6 grid list-none gap-3 p-0">
          {published.map(({ id, quote, displayName, rating }) => (
            <li key={id} className="border-l-2 border-nhu bg-be-2/50 px-4 py-3">
              <figure className="m-0">
                {rating && <p className="mt-0 mb-1 text-sm font-bold text-son">{rating}/5 sao</p>}
                <blockquote className="m-0 text-ink-soft">“{quote}”</blockquote>
                <figcaption className="mt-2 text-sm font-bold text-tra">{displayName}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-0 mb-5 max-w-[44ch] text-ink-soft">
        Bánh Bác có hợp khẩu vị của bạn không? Kể cho chúng mình điều bạn thích hoặc điều bạn muốn Bác Trà Ký làm tốt hơn.
      </p>
      {email ? <CustomerFeedbackForm email={email} /> : (
        <Button href={facebookUrl ?? sectionHref("lien-he")} variant="outline">Gửi góp ý <span aria-hidden="true">→</span></Button>
      )}
    </section>
  );
}

function formatOfferDate(value: string) {
  return <time dateTime={value}>{value.split("-").reverse().join("/")}</time>;
}

function OfferDetails({ offer }: { offer: CustomerOffer | null }) {
  if (offer) {
    return (
      <>
        <h3 className="mt-0 mb-2 text-h3 font-bold text-be">{offer.title}</h3>
        <p className="mt-0 mb-2 text-cream-muted">{offer.description}</p>
        <p className="mt-0 mb-4 text-sm text-nhu">
          Từ {formatOfferDate(offer.startsOn)} đến hết {formatOfferDate(offer.endsOn)} · Giờ Việt Nam
        </p>
        <h4 className="mt-0 mb-2 font-bold text-be">Điều kiện áp dụng</h4>
        <ul className="mt-0 mb-5 list-disc space-y-1 pl-5 text-cream-muted">
          {offer.terms.map((term) => <li key={term}>{term}</li>)}
        </ul>
        <Button href={siteConfig.orderChannelUrl} variant="outline-light">Liên hệ nhận ưu đãi <span aria-hidden="true">→</span></Button>
      </>
    );
  }

  const { facebookUrl } = siteConfig;
  return (
    <>
      <p className="mt-0 mb-4 text-cream-muted">
        Khi có chương trình mới, Bác Trà Ký sẽ công bố mức ưu đãi, thời gian và điều kiện áp dụng tại đây.
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button href={facebookUrl ?? siteConfig.orderChannelUrl} variant="outline-light">
          {facebookUrl ? "Theo dõi trên Facebook" : "Liên hệ Bác Trà Ký"} <span aria-hidden="true">→</span>
        </Button>
        <a href={sectionHref("san-pham")} className="inline-flex min-h-11 items-center text-be underline underline-offset-4 hover:text-nhu">Xem các bộ quà</a>
      </div>
    </>
  );
}

async function readCurrentOffer(offer: CustomerOffer) {
  // Đọc giờ khi có request để chương trình hết hạn không bị giữ lại từ bản build.
  await io();
  return getActiveOffer(offer, Date.now());
}

async function ScheduledOffer({ offer }: { offer: CustomerOffer }) {
  return <OfferDetails offer={await readCurrentOffer(offer)} />;
}

export function CustomerPanels({
  reviews = customerReviews,
  offer = customerOffer,
}: { reviews?: readonly CustomerReview[]; offer?: CustomerOffer | null } = {}) {
  return (
    <div className="wrap section-y grid gap-5 lg:grid-cols-2 lg:gap-6">
      <FeedbackSection reviews={reviews} />
      <section id="uu-dai" aria-labelledby="offers-title" className="on-dark frame-gilt min-w-0 scroll-mt-24 bg-son p-6 text-be sm:p-9">
        <p className="eyebrow m-0 text-nhu">Tin từ Bác Trà Ký</p>
        <h2 id="offers-title" className="mt-3 mb-4 text-h2 font-bold text-be">Ưu đãi</h2>
        <div className="relative mb-5 aspect-[16/9] overflow-hidden border border-nhu/60 bg-be">
          <Image
            src="/images/products/bo-qua-banh-bac-tra-sen.webp"
            alt="Bộ quà Bánh Bác và Trà Sen Tây Hồ của Bác Trà Ký"
            fill
            sizes="(min-width: 1200px) 484px, (min-width: 1024px) 44vw, 88vw"
            className="object-contain"
          />
        </div>
        {offer?.status === "published" ? (
          <Suspense fallback={<OfferDetails offer={null} />}>
            <ScheduledOffer offer={offer} />
          </Suspense>
        ) : (
          <OfferDetails offer={null} />
        )}
      </section>
    </div>
  );
}
