import { SectionHeading } from "@/components/ui/section-heading";
import type { NewsPost } from "@/lib/types";
import { NewsBoard } from "./news-board";

export type NewsSectionProps = {
  /** Toàn bộ bài viết do `page.tsx` lấy từ `getNewsPosts()` (bài `featured` đứng đầu). */
  posts: NewsPost[];
};

/**
 * Tin tức (id `tin-tuc`) — nền be-2 (dải chương) để tách nhịp với Sản phẩm phía trên; 1 bài nổi bật ảnh lớn,
 * bộ lọc 5 chủ đề, lưới card 3/2/1 cột. Mọi bài mẫu là bản nháp (nhãn "Bản nháp").
 */
export function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section id="tin-tuc" aria-labelledby="news-title" className="section-y bg-be-2">
      <div className="wrap">
        <SectionHeading
          id="news-title"
          eyebrow="Bác Trà Ký"
          title="Tin tức"
          description="Đọc chuyện làng Giang Xá, tìm hiểu Bánh Bác và văn hoá thưởng trà, hoặc khám phá những hương vị mới của Bác Trà Ký."
        />
        {posts.some((post) => post.isDraft) ? (
          <p className="mx-auto mb-6 max-w-xl text-center text-sm text-ink-soft">
            Bài có nhãn <strong className="text-son">Bản nháp</strong> là nội dung mẫu, không phải thông báo sự kiện hay ưu đãi đang diễn ra.
          </p>
        ) : null}
        <NewsBoard posts={posts} />
      </div>
    </section>
  );
}
