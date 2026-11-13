import { SectionHeading } from "@/components/ui/section-heading";
import type { NewsPost } from "@/lib/types";
import { StubNote } from "../stub-note";

export type NewsSectionProps = {
  /** Toàn bộ bài viết do `page.tsx` lấy từ `getNewsPosts()` (bài `featured` đứng đầu). */
  posts: NewsPost[];
};

/**
 * STUB (phase 01) — Tin tức (id `tin-tuc`).
 * Phase 03 thay nội dung: 1 bài nổi bật ảnh lớn, bộ lọc 5 chủ đề, lưới card 3/2/1 cột, nhãn "Bản nháp",
 * "Đọc thêm" → `/tin-tuc/[slug]`.
 */
export function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section id="tin-tuc" aria-labelledby="news-title" className="section-y bg-be-2">
      <div className="wrap">
        <SectionHeading id="news-title" title="Tin tức" />
        <StubNote owner={`phase 03 · ${posts.length} bài nháp`} />
      </div>
    </section>
  );
}
