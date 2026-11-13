"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterChips, type FilterOption } from "@/components/ui/filter-chips";
import { Reveal } from "@/components/ui/reveal";
import { NEWS_CATEGORIES, NEWS_CATEGORY_LABELS } from "@/data/news";
import type { NewsCategory, NewsPost } from "@/lib/types";
import { cn } from "@/lib/cn";
import { FeaturedNews } from "./featured-news";
import { NewsCard } from "./news-card";

export type NewsFilter = NewsCategory | "all";

/**
 * Chia bài cho bố cục: "Tất cả" → bài nổi bật (bài `featured` đầu tiên, nếu không có thì bài đầu) đứng riêng, lưới là
 * phần còn lại; chọn chủ đề → không có khối nổi bật, lưới gồm mọi bài thuộc chủ đề.
 */
export function arrangeNews(posts: readonly NewsPost[], filter: NewsFilter): { featured: NewsPost | null; grid: NewsPost[] } {
  if (filter !== "all") return { featured: null, grid: posts.filter((post) => post.category === filter) };
  const featured = posts.find((post) => post.featured) ?? posts[0] ?? null;
  return { featured, grid: posts.filter((post) => post !== featured) };
}

/** Tin tức client: bộ lọc 5 chủ đề (`aria-pressed`), bài nổi bật, lưới card 1/2/3 cột. */
export function NewsBoard({ posts }: { posts: NewsPost[] }) {
  const [filter, setFilter] = useState<NewsFilter>("all");
  const [filterChanges, setFilterChanges] = useState(0);
  const { featured, grid } = useMemo(() => arrangeNews(posts, filter), [posts, filter]);

  if (posts.length === 0) {
    return (
      <div className="frame-paper mx-auto max-w-2xl px-6 py-12 text-center">
        <p className="m-0 text-ink-soft">Bài viết đang được chuẩn bị.</p>
      </div>
    );
  }

  const choose = (next: NewsFilter) => {
    if (next === filter) return;
    setFilter(next);
    setFilterChanges((count) => count + 1);
  };

  const options: Array<FilterOption<NewsFilter>> = [
    { value: "all", label: "Tất cả" },
    ...NEWS_CATEGORIES.map((category) => ({ value: category, label: NEWS_CATEGORY_LABELS[category] })),
  ];
  const resultCount = grid.length + (featured ? 1 : 0);

  return (
    <>
      {/* Chip đứng trên bài nổi bật: chọn chủ đề làm khối nổi bật biến mất phía DƯỚI chip, nên chip không nhảy chỗ. */}
      <FilterChips
        options={options}
        value={filter}
        onChange={choose}
        label="Lọc tin tức theo chủ đề"
        className="mb-10 flex flex-wrap justify-center gap-2 lg:mb-12"
      />

      {featured ? (
        <Reveal className="mb-14 lg:mb-16">
          <FeaturedNews post={featured} />
        </Reveal>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {`Đang hiển thị ${resultCount} bài viết`}
      </p>

      {grid.length === 0 ? (
        <div className="frame-paper mx-auto max-w-2xl px-6 py-12 text-center">
          <p className="mt-0 mb-6 text-ink-soft">Chưa có bài viết trong chủ đề này.</p>
          <Button variant="outline" onClick={() => choose("all")}>
            Xem tất cả
          </Button>
        </div>
      ) : (
        <Reveal>
          <ul key={filter} className="m-0 grid list-none gap-7 p-0 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((post, index) => (
              <li
                key={post.slug}
                className={cn(filterChanges > 0 && "animate-rise [animation-duration:450ms]")}
                style={filterChanges > 0 ? { animationDelay: `${Math.min(index, 5) * 60}ms` } : undefined}
              >
                <NewsCard post={post} />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </>
  );
}
