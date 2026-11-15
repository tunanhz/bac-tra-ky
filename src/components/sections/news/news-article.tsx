import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ILLUSTRATION_LABEL } from "@/components/ui/illustration-tag";
import { sectionHref } from "@/config/site";
import { getNewsPostBySlug, getRelatedNewsPosts } from "@/lib/news";
import { NewsCard } from "./news-card";
import { cn } from "@/lib/cn";
import { NewsMeta } from "./news-meta";

/**
 * Thân trang `/tin-tuc/[slug]` (server component): nhận `params` dạng promise để trang đọc nó bên trong
 * `<Suspense>`. Slug không ứng với bài nào → `notFound()` (hiện `app/tin-tuc/[slug]/not-found.tsx`).
 */
export async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedNewsPosts(post.slug, 3);
  const { coverIsBrandBanner: isBanner, coverCaption } = post;

  return (
    <>
      <article aria-labelledby="article-title">
        <figure
          className={cn(
            "relative m-0 mt-[68px]",
            isBanner ? "mx-auto aspect-[539/267] max-w-6xl" : "h-[46svh] min-h-[280px] lg:h-[62svh]",
          )}
        >
          <Image src={post.coverImage} alt={post.coverImageAlt} fill preload sizes="100vw" className="object-cover" />
          <figcaption
            className={cn(
              "bg-be/90 px-2.5 py-1 text-[0.72rem] text-ink-soft italic",
              isBanner ? "absolute inset-x-0 top-full text-center" : "absolute right-4 bottom-3",
            )}
          >
            {coverCaption ?? ILLUSTRATION_LABEL}
          </figcaption>
        </figure>

        <div className="wrap">
          <div
            className={cn(
              "frame-paper relative mx-auto max-w-[760px] px-5 pt-9 pb-10 shadow-paper sm:px-10 md:px-14 md:pt-12 md:pb-14",
              isBanner ? "mt-9" : "-mt-20 md:-mt-32",
            )}
          >
            <NewsMeta post={post} />
            <h1 id="article-title" className="mt-5 mb-6 text-[clamp(1.8rem,1.3rem+2vw,2.7rem)] leading-tight font-bold text-son">
              {post.title}
            </h1>
            <p className="mt-0 mb-7 border-b border-line pb-7 font-heading text-quote text-tra italic">{post.excerpt}</p>
            <div className="max-w-[680px] text-ink-soft">
              {post.content.map((paragraph) => (
                <p key={paragraph} className="mt-0 mb-5">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-9 border-t border-dashed border-line pt-6">
              <Button href={sectionHref("tin-tuc")} variant="outline">
                ← Quay lại Tin tức
              </Button>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="section-y">
          <div className="wrap">
            <h2 id="related-title" className="mt-0 mb-8 text-center text-h2 font-bold tracking-[0.04em] text-gac">
              Bài viết liên quan
            </h2>
            <ul className="m-0 grid list-none gap-7 p-0 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <NewsCard post={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div className="pb-20" />
      )}
    </>
  );
}
