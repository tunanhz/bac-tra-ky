import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsArticle } from "@/components/sections/news/news-article";
import { getNewsPostBySlug, getNewsPosts } from "@/lib/news";

/*
 * Trang chi tiết tin tức `/tin-tuc/[slug]` — hướng B: ảnh bìa tràn viền, tấm giấy viền đôi đè lên ảnh (như
 * `.story-paper` của bản mẫu B) chứa bài viết cột đọc ~680px, nhãn "Bản nháp", 3 bài liên quan, nút quay lại.
 *
 * Mẫu Cache Components (Next 16): giữ `generateStaticParams` (prerender mọi bài khi build) và đọc `params` BÊN TRONG
 * `<Suspense>` — đọc ngoài Suspense thì dev báo lỗi "encountered URL data during prerendering".
 *
 * `ensureStatic = "navigation"` (Next 16.4): slug không có trong `generateStaticParams` thì lần gọi đầu tiên chờ render
 * tĩnh xong rồi mới trả — `notFound()` chạy trước khi phản hồi bắt đầu nên slug lạ trả 404 ngay lần đầu (không còn
 * "soft 404" 200 do stream từ Suspense). Dữ liệu tin là tĩnh nên đáp ứng được ràng buộc của mức này.
 */

export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  const title = post.isDraft ? `[Bản nháp] ${post.title}` : post.title;
  return {
    title,
    description: post.excerpt,
    // Bài nháp không cho máy tìm kiếm lập chỉ mục.
    robots: post.isDraft ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", title, description: post.excerpt, images: [post.coverImage] },
  };
}

export default function NewsDetailPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <NewsArticle params={params} />
    </Suspense>
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
