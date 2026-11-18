"use client";

import { useEffect, useId, useState } from "react";
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
  const [isPaused, setIsPaused] = useState(false);

  // Nhóm các đánh giá thành từng trang 3 feedback
  const pageSize = 3;
  const pages: CustomerReview[][] = [];
  for (let i = 0; i < reviews.length; i += pageSize) {
    pages.push(reviews.slice(i, i + pageSize));
  }
  const totalPages = pages.length;

  const next = () => setCurrent((c) => (c + 1) % totalPages);
  const prev = () => setCurrent((c) => (c - 1 + totalPages) % totalPages);

  // Tự động chuyển sau 6 giây, tạm dừng khi người dùng rê chuột vào đọc
  useEffect(() => {
    if (totalPages <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages, isPaused]);

  if (totalPages === 0) return null;

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider Viewport */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {pages.map((pageReviews, pageIdx) => (
            <div key={pageIdx} className="w-full shrink-0 px-1 sm:px-2">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                {pageReviews.map((review) => (
                  <article
                    key={review.id}
                    className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-nhu/30 bg-[#8e0b16] p-6 text-be shadow-xl transition-all duration-300 hover:border-nhu/60 hover:shadow-2xl sm:p-7"
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        {/* Avatar / Icon */}
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-nhu/20 font-display text-xl font-bold text-nhu shadow-inner">
                          {review.displayName.charAt(0)}
                        </div>

                        {/* Header info */}
                        <div className="min-w-0">
                          <h3 className="m-0 font-display text-lg font-bold tracking-wide text-be sm:text-xl truncate">
                            {review.displayName}
                          </h3>
                          <div className="mt-1">
                            <ReviewStars rating={review.rating} />
                          </div>
                        </div>
                      </div>

                      <blockquote className="mt-4 mb-0 border-t border-nhu/25 pt-4 font-body text-sm leading-relaxed text-be/95 italic sm:text-base">
                        “{review.quote}”
                      </blockquote>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 15: Dấu chấm ở dưới và button vuông bo góc màu đỏ, hover màu be */}
      {totalPages > 1 && (
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
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={current === i}
                aria-label={`Trang đánh giá ${i + 1}`}
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
      )}
    </div>
  );
}

function FeedbackSection({ reviews }: { reviews: readonly CustomerReview[] }) {
  const { email } = siteConfig;
  const [showForm, setShowForm] = useState(false);
  const published = reviews.filter((review) => review.status === "published");

  return (
    <section id="goc-feedback" aria-labelledby="feedback-title" className="mx-auto w-full max-w-6xl min-w-0 scroll-mt-24">
      {/* Slide 15: Tiêu đề theo concept ĐÁNH GIÁ CỦA KHÁCH HÀNG */}
      <div className="mb-8 text-center sm:mb-10">
        <span className="text-xs font-bold tracking-widest text-dong uppercase">
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
    <div className="section-y space-y-16 lg:space-y-24">
      <div className="wrap">
        <FeedbackSection reviews={reviews} />
      </div>
      <div className="w-full">
        <OfferSection offer={offer} />
      </div>
    </div>
  );
}
