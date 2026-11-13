import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { sectionHref } from "@/config/site";
import { getNewsPostBySlug, getNewsPosts } from "@/lib/news";

/*
 * STUB (phase 01) — Trang chi tiết tin tức `/tin-tuc/[slug]`.
 * Phase 03 thay nội dung: ảnh bìa tràn viền, cột đọc 680px, nhãn danh mục, 3 bài liên quan (`getRelatedNewsPosts`).
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
    title: post.title,
    description: post.excerpt,
    // Bài nháp không cho máy tìm kiếm lập chỉ mục.
    robots: post.isDraft ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [post.coverImage] },
  };
}

export default function NewsDetailPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  return (
    <div className="wrap max-w-[760px] pt-32 pb-24">
      <Suspense fallback={<ArticleSkeleton />}>
        <NewsArticle params={params} />
      </Suspense>
      <Button href={sectionHref("tin-tuc")} variant="outline" className="mt-6">
        Quay lại Tin tức
      </Button>
    </div>
  );
}

async function NewsArticle({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      {post.isDraft ? <p className="eyebrow m-0 inline-block border border-dong/50 px-2.5 py-1">Bản nháp</p> : null}
      <h1 className="mt-4 mb-6 text-h2 font-bold text-gac">{post.title}</h1>
      {post.content.map((paragraph) => (
        <p key={paragraph} className="mb-4 text-ink-soft">
          {paragraph}
        </p>
      ))}
    </article>
  );
}

function ArticleSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-4">
      <div className="skeleton h-6 w-24" />
      <div className="skeleton h-12 w-4/5" />
      <div className="skeleton h-24 w-full" />
    </div>
  );
}
