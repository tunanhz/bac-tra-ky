import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { sectionHref } from "@/config/site";
import { getNewsPostBySlug, getNewsPosts } from "@/lib/news";

/*
 * STUB (phase 01) — Trang chi tiết tin tức `/tin-tuc/[slug]`.
 * Phase 03 thay nội dung: ảnh bìa tràn viền, cột đọc 680px, nhãn danh mục, 3 bài liên quan (`getRelatedNewsPosts`).
 * Giữ `generateStaticParams` (dữ liệu tĩnh → prerender mọi bài khi build; tương thích Cache Components).
 */

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

export default async function NewsDetailPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="wrap max-w-[760px] pt-32 pb-24">
      {post.isDraft ? (
        <p className="eyebrow m-0 inline-block border border-dong/50 px-2.5 py-1">Bản nháp</p>
      ) : null}
      <h1 className="mt-4 mb-6 text-h2 font-bold text-gac">{post.title}</h1>
      {post.content.map((paragraph) => (
        <p key={paragraph} className="mb-4 text-ink-soft">
          {paragraph}
        </p>
      ))}
      <Button href={sectionHref("tin-tuc")} variant="outline" className="mt-6">
        Quay lại Tin tức
      </Button>
    </article>
  );
}
