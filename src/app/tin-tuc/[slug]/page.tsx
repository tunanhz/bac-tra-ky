import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NewsCard } from "@/components/sections/news/news-card";
import { NewsMeta } from "@/components/sections/news/news-meta";
import { Button } from "@/components/ui/button";
import { ILLUSTRATION_LABEL } from "@/components/ui/image-placeholder";
import { sectionHref } from "@/config/site";
import { getNewsPostBySlug, getNewsPosts, getRelatedNewsPosts } from "@/lib/news";

/*
 * Trang chi tiết tin tức `/tin-tuc/[slug]` — hướng B: ảnh bìa tràn viền, tấm giấy viền đôi đè lên ảnh (như
 * `.story-paper` của bản mẫu B) chứa bài viết cột đọc ~680px, nhãn "Bản nháp", 3 bài liên quan, nút quay lại.
 *
 * Mẫu Cache Components (Next 16): giữ `generateStaticParams` (prerender mọi bài khi build) và đọc `params` BÊN TRONG
 * `<Suspense>` — đọc ngoài Suspense thì dev báo lỗi "encountered URL data during prerendering".
 */

type Params = PageProps<"/tin-tuc/[slug]">["params"];

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  return {
    title: post.isDraft ? `[Bản nháp] ${post.title}` : post.title,
    description: post.excerpt,
    // Bài nháp không cho máy tìm kiếm lập chỉ mục.
    robots: post.isDraft ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [post.coverImage] },
  };
}

export default function NewsDetailPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <NewsArticle params={params} />
    </Suspense>
  );
}

async function NewsArticle({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedNewsPosts(post.slug, 3);

  return (
    <>
      <article aria-labelledby="article-title">
        <figure className="relative m-0 mt-[68px] h-[46svh] min-h-[280px] lg:h-[62svh]">
          <Image src={post.coverImage} alt={post.coverImageAlt} fill priority sizes="100vw" className="object-cover" />
          <figcaption className="absolute right-4 bottom-3 bg-be/90 px-2.5 py-1 text-[0.72rem] text-ink-soft italic">
            {ILLUSTRATION_LABEL}
          </figcaption>
        </figure>

        <div className="wrap">
          <div className="frame-paper relative mx-auto -mt-20 max-w-[760px] px-5 pt-9 pb-10 shadow-paper sm:px-10 md:-mt-32 md:px-14 md:pt-12 md:pb-14">
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

function ArticleSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton mt-[68px] h-[46svh] min-h-[280px] lg:h-[62svh]" />
      <div className="wrap">
        <div className="frame-paper mx-auto -mt-20 max-w-[760px] space-y-4 px-10 py-12 md:-mt-32">
          <div className="skeleton h-6 w-40" />
          <div className="skeleton h-12 w-4/5" />
          <div className="skeleton h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
