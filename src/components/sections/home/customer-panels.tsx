"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  customerOffer,
  customerReviews,
  type CustomerOffer,
  type CustomerReview,
} from "@/data/customer-content";
import { CustomerFeedbackForm } from "./customer-feedback-form";
import { OfferSection } from "./offer-section";

function ReviewStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1 text-nhu" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < rating ? "text-nhu" : "text-nhu/30"}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewSlider({ reviews }: { reviews: readonly CustomerReview[] }) {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  if (total === 0) return null;

  return (
    <div className="space-y-6">
      {/* Slider Viewport */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {reviews.map((review, idx) => (
            <div key={review.id} className="w-full shrink-0 px-2 sm:px-4">
              <article className="group mx-auto max-w-2xl overflow-hidden rounded-3xl bg-[#1c5a1b] p-6 text-be shadow-xl transition-all duration-300 hover:shadow-2xl sm:p-9">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                  {/* Avatar / Icon */}
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-nhu/20 font-display text-2xl font-bold text-nhu shadow-inner">
                    {review.displayName.charAt(0)}
                  </div>

                  {/* Header info */}
                  <div className="min-w-0">
                    <h3 className="m-0 font-display text-xl font-bold tracking-wide text-be sm:text-2xl">
                      {review.displayName}
                    </h3>
                    <div className="mt-1">
                      <ReviewStars rating={review.rating} />
                    </div>
                  </div>
                </div>

                <blockquote className="mt-5 mb-0 border-t border-nhu/30 pt-4 font-serif text-base leading-relaxed text-be/95 italic sm:text-lg">
                  “{review.quote}”
                </blockquote>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 15: Dấu chấm ở dưới và button vuông bo góc màu đỏ, hover màu be */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <button
          type="button"
          onClick={prev}
          aria-label="Đánh giá trước"
          className="flex size-11 items-center justify-center rounded-xl border border-gac bg-gac text-be shadow-md transition-all duration-300 hover:border-gac hover:bg-be hover:text-gac"
        >
          <span aria-hidden="true" className="text-xl font-bold">←</span>
        </button>

        {/* Dấu chấm trượt ngang theo Slide 15 */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Chọn bài đánh giá">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={current === i}
              aria-label={`Đánh giá ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-2.5 transition-all duration-300 ${
                current === i
                  ? "w-8 rounded-full bg-gac"
                  : "w-2.5 rounded-full bg-gac/30 hover:bg-gac/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Đánh giá tiếp theo"
          className="flex size-11 items-center justify-center rounded-xl border border-gac bg-gac text-be shadow-md transition-all duration-300 hover:border-gac hover:bg-be hover:text-gac"
        >
          <span aria-hidden="true" className="text-xl font-bold">→</span>
        </button>
      </div>
    </div>
  );
}

function FeedbackSection({ reviews }: { reviews: readonly CustomerReview[] }) {
  const { email } = siteConfig;
  const [showForm, setShowForm] = useState(false);
  const published = reviews.filter((review) => review.status === "published");

  return (
    <section id="goc-feedback" aria-labelledby="feedback-title" className="mx-auto w-full max-w-4xl min-w-0 scroll-mt-24">
      {/* Slide 15: Tiêu đề theo concept ĐÁNH GIÁ CỦA KHÁCH HÀNG */}
      <div className="mb-8 text-center sm:mb-10">
        <span className="text-xs font-bold tracking-widest text-tra uppercase">
          Chia sẻ từ người thưởng thức
        </span>
        <h2 id="feedback-title" className="mt-2 mb-3 font-display text-3xl font-bold tracking-tight text-gac sm:text-4xl lg:text-5xl">
          ĐÁNH GIÁ CỦA KHÁCH HÀNG
        </h2>
        <p className="mx-auto max-w-[50ch] text-sm tracking-wider text-ink-soft uppercase sm:text-base">
          Những khách hàng đã trải nghiệm hương vị nói gì về sản phẩm
        </p>
      </div>

      {/* Review Slider */}
      {published.length > 0 ? <ReviewSlider reviews={published} /> : null}

      {/* Toggle gửi góp ý */}
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gac bg-gac px-7 py-3 font-body text-sm font-bold text-be shadow-md transition-all duration-300 hover:border-gac hover:bg-be hover:text-gac sm:text-base"
        >
          {showForm ? "Đóng form cảm nhận" : "Gửi cảm nhận của bạn"} <span aria-hidden="true">✉</span>
        </button>
      </div>

      {showForm && email && (
        <div className="mt-6 rounded-3xl bg-paper p-6 shadow-lg sm:p-9">
          <p className="mt-0 mb-5 text-center text-ink-soft">
            Bánh Bác có hợp khẩu vị của bạn không? Kể cho chúng mình điều bạn thích hoặc điều bạn muốn Bác Trà Ký làm tốt hơn.
          </p>
          <CustomerFeedbackForm email={email} />
        </div>
      )}
    </section>
  );
}

export function CustomerPanels({
  reviews = customerReviews,
  offer = customerOffer,
}: { reviews?: readonly CustomerReview[]; offer?: CustomerOffer | null } = {}) {
  return (
    <div className="wrap section-y grid gap-12 lg:gap-16">
      <FeedbackSection reviews={reviews} />
      <OfferSection offer={offer} />
    </div>
  );
}
