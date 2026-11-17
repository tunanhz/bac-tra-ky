"use client";

import { useRef, useState } from "react";
import type { NewsPost } from "@/lib/types";
import { FeaturedNews } from "./featured-news";
import { NewsCard } from "./news-card";

export function arrangeNews(posts: readonly NewsPost[], filter?: string): { featured: NewsPost | null; grid: NewsPost[] } {
  const featured = posts.find((post) => post.featured) ?? posts[0] ?? null;
  return { featured, grid: posts.filter((post) => post !== featured) };
}

/** Tin tức client: bài nổi bật và thanh cuộn/slider trượt ngang theo Slide 14 */
export function NewsBoard({ posts }: { posts: NewsPost[] }) {
  const scrollRef = useRef<HTMLOListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (posts.length === 0) {
    return (
      <div className="frame-paper mx-auto max-w-2xl px-6 py-12 text-center">
        <p className="m-0 text-ink-soft">Bài viết đang được chuẩn bị.</p>
      </div>
    );
  }

  const { featured, grid } = arrangeNews(posts);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -360 : 360;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="space-y-10 lg:space-y-12">
      {/* Bài viết nổi bật */}
      {featured ? <FeaturedNews post={featured} /> : null}

      {/* Slide 14: Lưới tin tức trượt sang ngang */}
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="m-0 font-display text-xl font-bold text-son sm:text-2xl">
            Các câu chuyện mới nhất
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Cuộn tin tức sang trái"
              disabled={!canScrollLeft}
              onClick={() => scroll("left")}
              className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-son shadow-sm transition-all hover:bg-gac hover:text-be disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span aria-hidden="true" className="font-bold">←</span>
            </button>
            <button
              type="button"
              aria-label="Cuộn tin tức sang phải"
              disabled={!canScrollRight}
              onClick={() => scroll("right")}
              className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-son shadow-sm transition-all hover:bg-gac hover:text-be disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span aria-hidden="true" className="font-bold">→</span>
            </button>
          </div>
        </div>

        <ol
          ref={scrollRef}
          onScroll={checkScroll}
          role="list"
          className="m-0 flex snap-x snap-mandatory gap-5 overflow-x-auto p-0 pb-4 pt-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-line sm:gap-6"
        >
          {grid.map((post) => (
            <li
              key={post.slug}
              className="w-[280px] shrink-0 snap-start sm:w-[340px] md:w-[360px]"
            >
              <NewsCard post={post} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
