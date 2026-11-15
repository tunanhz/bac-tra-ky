import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import type { NewsPost } from "@/lib/types";
import { IllustrationTag } from "@/components/ui/illustration-tag";
import { cn } from "@/lib/cn";
import { NewsMeta, newsHref } from "./news-meta";

/**
 * Bài nổi bật: ảnh lớn trong khung sơn son, chữ bên phải trên desktop và bên dưới trên mobile.
 */
export function FeaturedNews({ post }: { post: NewsPost }) {
  const { coverIsBrandBanner: isBanner, coverCaption } = post;
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <figure className="m-0 bg-son-deep p-2.5 outline outline-offset-[-8px] outline-nhu/55 md:p-3.5 lg:col-span-7">
        <div className={cn("relative overflow-hidden", isBanner ? "aspect-[539/267]" : "aspect-video")}>
          <ImageWithFallback
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(min-width: 1200px) 660px, (min-width: 1024px) 56vw, 92vw"
            className="object-cover transition-transform duration-800 ease-son group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
          {!isBanner && coverCaption && <IllustrationTag label={coverCaption} />}
        </div>
        {isBanner && coverCaption && <figcaption className="pt-2 text-center text-[0.7rem] text-be">{coverCaption}</figcaption>}
      </figure>
      <div className="lg:col-span-5">
        <p className="eyebrow mt-0 mb-4">Bài nổi bật</p>
        <NewsMeta post={post} />
        <h3 className="mt-4 mb-4 text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] leading-tight font-bold text-son">
          {post.title}
        </h3>
        <p className="mt-0 mb-7 text-ink-soft">{post.excerpt}</p>
        <Button href={newsHref(post.slug)} aria-label={`Đọc thêm: ${post.title}`}>
          Đọc thêm
        </Button>
      </div>
    </article>
  );
}
