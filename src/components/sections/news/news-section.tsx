import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import type { NewsPost } from "@/lib/types";
import { NewsBoard } from "./news-board";

export type NewsSectionProps = {
  posts: NewsPost[];
};

/**
 * Tin tức (id `tin-tuc`) — theo Slide 14:
 * Bỏ bộ lọc chủ đề, tin tức trượt sang ngang, nền làng quê hoa sen.
 */
export function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section id="tin-tuc" aria-labelledby="news-title" className="section-y relative overflow-hidden bg-be-2/80">
      {/* Slide 14: Sử dụng nền này */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Image
          src="/images/story/nen-lang-que-hoa-sen.webp"
          alt="Họa tiết phong cảnh làng quê hoa sen"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      <div className="wrap relative z-10">
        <SectionHeading
          id="news-title"
          eyebrow="Bác Trà Ký"
          title="Tin tức"
          description="Đọc chuyện làng Giang Xá, tìm hiểu Bánh Bác và văn hoá thưởng trà, hoặc khám phá những hương vị mới của Bác Trà Ký."
        />
        <NewsBoard posts={posts} />
      </div>
    </section>
  );
}
