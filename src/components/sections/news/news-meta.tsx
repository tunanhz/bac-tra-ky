import { NEWS_CATEGORY_LABELS } from "@/data/news";
import type { NewsPost } from "@/lib/types";
import { cn } from "@/lib/cn";

export const DRAFT_LABEL = "Bản nháp";
export const BRAND_BANNER_LABEL = "Ấn phẩm Bác Trà Ký";

/** `YYYY-MM-DD` → `DD/MM/YYYY`; chuỗi sai định dạng trả nguyên (không dùng `Date` để render ổn định khi prerender). */
export function formatNewsDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : iso;
}

export function newsHref(slug: string): string {
  return `/tin-tuc/${encodeURIComponent(slug)}`;
}

/** Nhãn "Bản nháp" — viền vàng đồng mảnh trên nền be (đạt tương phản AA). */
export function DraftBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block border border-dong/60 bg-be px-2 py-0.5 text-[0.66rem] leading-snug font-bold tracking-[0.2em] text-dong uppercase",
        className,
      )}
    >
      {DRAFT_LABEL}
    </span>
  );
}

/** Dòng nhãn đầu bài: "Bản nháp" (nếu có) · danh mục · ngày. */
export function NewsMeta({ post, className, showDate = true }: { post: NewsPost; className?: string; showDate?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {post.isDraft ? <DraftBadge /> : null}
      <span className="text-[0.68rem] font-bold tracking-[0.24em] text-dong uppercase">
        {NEWS_CATEGORY_LABELS[post.category]}
      </span>
      {showDate && !post.isDraft ? (
        <time dateTime={post.publishedAt} className="text-[0.8rem] text-ink-soft italic">
          {formatNewsDate(post.publishedAt)}
        </time>
      ) : null}
    </div>
  );
}
