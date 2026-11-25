import { customerNewsPosts } from "@/data/customer-news";
import { extraNewsPosts } from "@/data/extra-news";
import { newsPosts } from "@/data/news";
import { villageFacebookPosts } from "@/data/village-news";
import type { NewsPost } from "@/lib/types";

/** Bài "Dấu ấn Vua Lý Nam Đế..." được chuyển sang tab con Khám phá làng nghề Giang Xá. */
export const VILLAGE_MOVED_NEWS_SLUG = "dau-an-vua-ly-nam-de-trong-lich-su-va-van-hoa-lang-giang-xa";

/*
 * Lớp truy cập tin tức. Hiện đọc dữ liệu tĩnh `src/data/news.ts`; phase 05 (backend) chỉ thay phần ruột sang
 * MongoDB, giữ nguyên chữ ký hàm.
 */

function clone(post: NewsPost): NewsPost {
  return {
    ...post,
    content: [...post.content],
    body: post.body?.map((block) => block.type === "image"
      ? { ...block, caption: block.caption?.map((run) => ({ ...run })) }
      : { ...block, runs: block.runs.map((run) => ({ ...run })) }),
    coverCredit: post.coverCredit && { ...post.coverCredit },
  };
}

/** Mọi bài, mới nhất trước (cùng ngày giữ thứ tự khai báo); bài `featured` lên đầu. */
export async function getNewsPosts(): Promise<NewsPost[]> {
  return newsPosts
    .map((post, index) => ({ post, index }))
    .sort(
      (a, b) =>
        Number(b.post.featured) - Number(a.post.featured) ||
        b.post.publishedAt.localeCompare(a.post.publishedAt) ||
        a.index - b.index,
    )
    .map(({ post }) => clone(post));
}

/** Trang chủ hiển thị các bài tin tức (bổ sung 6 bài mới, chuyển bài Dấu ấn sang Khám phá làng nghề). */
export async function getHomepageNewsPosts(): Promise<NewsPost[]> {
  const approvedSlugs = new Set([
    ...customerNewsPosts.filter((post) => post.slug !== VILLAGE_MOVED_NEWS_SLUG).map((post) => post.slug),
    ...extraNewsPosts.map((post) => post.slug),
  ]);
  return (await getNewsPosts()).filter((post) => approvedSlugs.has(post.slug));
}

/** 5 bài viết cho trang Khám phá làng nghề Giang Xá (4 bài Facebook + bài Dấu ấn Vua Lý Nam Đế). */
export async function getVillageNewsPosts(): Promise<NewsPost[]> {
  const fifth = newsPosts.find((post) => post.slug === VILLAGE_MOVED_NEWS_SLUG);
  const list = fifth ? [...villageFacebookPosts, fifth] : [...villageFacebookPosts];
  return list.map(clone);
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  const post = newsPosts.find((item) => item.slug === slug);
  return post ? clone(post) : null;
}

/** Bài liên quan cho trang chi tiết: cùng chủ đề trước, rồi các bài khác; không gồm bài hiện tại. */
export async function getRelatedNewsPosts(slug: string, limit = 3): Promise<NewsPost[]> {
  const all = await getNewsPosts();
  const current = all.find((post) => post.slug === slug);
  const others = all.filter((post) => post.slug !== slug);
  if (!current) return others.slice(0, limit);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, Math.max(0, limit));
}
