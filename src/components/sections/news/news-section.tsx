import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import type { NewsPost } from "@/lib/types";
import { NewsBoard } from "./news-board";

export type NewsSectionProps = {
  posts: NewsPost[];
};

/**
 * Tin tức (id `tin-tuc`): giữ 9 bài từ tài liệu khách và thanh cuộn ngang.
 * Feedback slide 9 bỏ khối nổi bật/nhóm bài cũ, không bỏ cả mục Tin tức.
 */
export function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section id="tin-tuc" aria-labelledby="news-title" className="section-y relative overflow-hidden bg-[#fbf5e6]">
      {/* Nền làng quê hoa sen do người dùng cung cấp */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/brand/nen-gia-tri-cot-loi.webp"
          alt="Họa tiết phong cảnh làng quê hoa sen"
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-85 sm:opacity-95"
        />
        {/* Scrim nhẹ để chữ và thẻ tin tức đọc êm ái, rõ ràng */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#fbf5e6]/50 via-[#fbf5e6]/25 to-[#fbf5e6]/60"
        />
      </div>

      <div className="wrap relative z-10">
        <SectionHeading
          id="news-title"
          title="Tin tức"
          description="Đọc chuyện làng Giang Xá, tìm hiểu Bánh Bác và văn hoá thưởng trà, hoặc khám phá những hương vị mới của Bác Trà Ký."
        />
        <NewsBoard posts={posts} />
      </div>
    </section>
  );
}
