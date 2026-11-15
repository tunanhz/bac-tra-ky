import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { IllustrationTag } from "@/components/ui/illustration-tag";
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
          sizes="(min-width: 1200px) 340px, (min-width: 1024px) calc(33vw - 50px), (min-width: 768px) calc(50vw - 60px), calc(100vw - 66px)"
          className={cn(
            "transition-transform duration-800 ease-son group-hover:scale-105 motion-reduce:group-hover:scale-100",
            post.coverIsBrandBanner ? "object-contain" : "object-cover",
          )}
        />
        <IllustrationTag label={post.coverCaption} />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4.5">
        <NewsMeta post={post} showDate={false} />
        <h3 className="mt-3 mb-2 text-[1.3rem] leading-snug font-bold text-son">{post.title}</h3>
        <p className="mt-0 mb-4 text-[0.95rem] text-ink-soft">{post.excerpt}</p>
        <Link
          href={newsHref(post.slug)}
          aria-label={`Đọc thêm: ${post.title}`}
          className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 border border-gac/65 px-3 text-[0.76rem] font-bold tracking-wider text-gac uppercase no-underline transition-colors hover:bg-gac hover:text-be focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gac"
        >
          Đọc thêm <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
