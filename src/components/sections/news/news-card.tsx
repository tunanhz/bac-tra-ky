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
          sizes="(min-width: 1200px) 340px, (min-width: 1024px) calc(33vw - 50px), (min-width: 768px) calc(50vw - 60px), calc(100vw - 66px)"
          className="object-cover transition-transform duration-800 ease-son group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        {/* Mọi ảnh bìa tin hiện là ảnh minh hoạ. TODO: thay dữ liệu thật — thêm cờ ảnh thật vào NewsPost khi có. */}
        <IllustrationTag />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4.5">
        <NewsMeta post={post} showDate={false} />
        <h3 className="mt-3 mb-2 text-[1.3rem] leading-snug font-bold text-son">
          {/* Một liên kết duy nhất phủ cả card (lớp ::after) — mỗi card chỉ một điểm Tab; vòng focus vẽ quanh card. */}
          <Link
            href={href}
            className="no-underline transition-colors duration-300 group-hover:text-gac after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-gac"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-0 mb-4 text-[0.95rem] text-ink-soft">{post.excerpt}</p>
        {/* Chỉ là chữ gợi ý (cả card đã là liên kết). */}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex min-h-11 items-center gap-2 self-start border-t border-dashed border-line pt-3 text-[0.76rem] font-bold tracking-[0.14em] text-gac uppercase"
        >
          Đọc thêm
          <span className="transition-transform duration-300 ease-son group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  );
}
