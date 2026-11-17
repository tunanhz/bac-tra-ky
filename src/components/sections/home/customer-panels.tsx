import { Button } from "@/components/ui/button";
import { sectionHref, siteConfig } from "@/config/site";
import { customerOffer, customerReviews, type CustomerOffer, type CustomerReview } from "@/data/customer-content";
import { CustomerFeedbackForm } from "./customer-feedback-form";
import { OfferSection } from "./offer-section";

function FeedbackSection({ reviews }: { reviews: readonly CustomerReview[] }) {
  const { email, facebookUrl } = siteConfig;
  const published = reviews.filter((review) => review.status === "published");

  return (
    <section id="goc-feedback" aria-labelledby="feedback-title" className="mx-auto w-full max-w-3xl min-w-0 scroll-mt-24 rounded-3xl bg-paper p-6 shadow-sm sm:p-9">
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

export function CustomerPanels({
  reviews = customerReviews,
  offer = customerOffer,
}: { reviews?: readonly CustomerReview[]; offer?: CustomerOffer | null } = {}) {
  return (
    <div className="wrap section-y grid gap-8 lg:gap-12">
      <FeedbackSection reviews={reviews} />
      <OfferSection offer={offer} />
    </div>
  );
}
