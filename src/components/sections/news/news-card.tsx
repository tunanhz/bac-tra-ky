import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import type { NewsPost } from "@/lib/types";
import { cn } from "@/lib/cn";
import { NewsMeta, newsHref } from "./news-meta";
import styles from "./news-button.module.css";

type NewsCardProps = {
  post: NewsPost;
  className?: string;
};

/**
 * Card tin (cùng ngôn ngữ card sản phẩm bản mẫu B): tấm giấy viền đôi, ảnh 3:2, danh mục và trạng thái nếu là bản nháp,
 * tiêu đề sơn son, mô tả, "Đọc thêm" → `/tin-tuc/[slug]`. Hover: nhấc 6px + bóng sơn son, ảnh phóng chậm.
 */
export function NewsCard({ post, className }: NewsCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line/50 bg-paper p-3.5 pb-5 shadow-sm sm:p-4 sm:pb-6",
        "transition-[transform,box-shadow] duration-400 ease-son hover:-translate-y-1.5 hover:shadow-md",
        "motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <figure className="m-0">
        <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-be-2">
          <ImageWithFallback
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(min-width: 1200px) 340px, (min-width: 1024px) calc(33vw - 50px), (min-width: 768px) calc(50vw - 60px), calc(100vw - 66px)"
            className={cn(
              "transition-transform duration-800 ease-son group-hover:scale-105 motion-reduce:group-hover:scale-100",
              post.coverIsBrandBanner ? "object-contain" : "object-cover",
              post.coverFocus === "top-right" && "object-right-top",
            )}
          />
        </div>
        {post.coverCaption && <figcaption className="caption px-2 pt-2.5 text-center text-ink-soft">{post.coverCaption}</figcaption>}
      </figure>
      <div className="flex flex-1 flex-col px-1.5 pt-4 sm:px-2 sm:pt-4.5">
        <NewsMeta post={post} showDate={false} />
        <h3 className="mt-2.5 mb-2 font-display text-[1.22rem] leading-snug font-bold text-son sm:mt-3 sm:text-[1.45rem] lg:text-[1.55rem]">
          {post.title}
        </h3>
        <p className="mt-0 mb-4 text-[0.92rem] leading-relaxed text-ink-soft sm:text-[0.95rem]">{post.excerpt}</p>
        <Button
          href={post.externalUrl ?? newsHref(post.slug)}
          variant="primary"
          aria-label={`Đọc thêm: ${post.title}`}
          className={cn("mt-auto w-fit", styles.readMore)}
        >
          Đọc thêm <span aria-hidden="true">→</span>
        </Button>
      </div>
    </article>
  );
}
