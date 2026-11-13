import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { ILLUSTRATION_LABEL } from "@/components/ui/image-placeholder";
import type { NewsPost } from "@/lib/types";
import { cn } from "@/lib/cn";
import { NewsMeta, newsHref } from "./news-meta";

type NewsCardProps = {
  post: NewsPost;
  className?: string;
};

/**
 * Card tin (cùng ngôn ngữ card sản phẩm bản mẫu B): tấm giấy viền đôi, ảnh 3:2, nhãn "Bản nháp" + danh mục,
 * tiêu đề sơn son, mô tả, "Đọc thêm" → `/tin-tuc/[slug]`. Hover: nhấc 6px + bóng sơn son, ảnh phóng chậm.
 */
export function NewsCard({ post, className }: NewsCardProps) {
  const href = newsHref(post.slug);
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-line bg-paper p-3 pb-5 outline outline-offset-4 outline-line",
        "transition-[transform,box-shadow] duration-400 ease-son hover:-translate-y-1.5 hover:shadow-card",
        "motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-be-2">
        <ImageWithFallback
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-800 ease-son group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        <IllustrationTag />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4.5">
        <NewsMeta post={post} showDate={false} />
        <h3 className="mt-3 mb-2 text-[1.3rem] leading-snug font-bold text-son">
          <Link href={href} className="no-underline transition-colors duration-300 hover:text-gac">
            {post.title}
          </Link>
        </h3>
        <p className="mt-0 mb-4 text-[0.95rem] text-ink-soft">{post.excerpt}</p>
        <Link
          href={href}
          aria-label={`Đọc thêm: ${post.title}`}
          className="mt-auto inline-flex min-h-11 items-center gap-2 self-start border-t border-dashed border-line pt-3 text-[0.76rem] font-bold tracking-[0.14em] text-gac uppercase no-underline"
        >
          Đọc thêm
          <span aria-hidden="true" className="transition-transform duration-300 ease-son group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

/**
 * Mọi ảnh bìa hiện là ảnh minh hoạ (Unsplash), chưa phải ảnh thật của Bác Trà Ký.
 * TODO: thay dữ liệu thật — khi có ảnh thật, thêm cờ kiểu `coverImageIsIllustration` vào `NewsPost` (file chung) để chỉ hiện nhãn khi cần.
 */
export function IllustrationTag() {
  return (
    <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-be/95 px-2.5 py-1 text-[0.62rem] leading-snug tracking-[0.06em] whitespace-nowrap text-ink-soft">
      {ILLUSTRATION_LABEL}
    </span>
  );
}
