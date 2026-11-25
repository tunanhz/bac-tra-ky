import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { NEWS_CATEGORIES, NEWS_CATEGORY_LABELS, newsPosts } from "@/data/news";
import {
  VILLAGE_MOVED_NEWS_SLUG,
  getHomepageNewsPosts,
  getNewsPostBySlug,
  getNewsPosts,
  getRelatedNewsPosts,
  getVillageNewsPosts,
} from "./news";

describe("dữ liệu tin tức tĩnh", () => {
  it("có 25 bài, slug không trùng, là bài viết chính thức đã hoàn thiện", () => {
    expect(newsPosts).toHaveLength(25);
    expect(new Set(newsPosts.map((p) => p.slug)).size).toBe(25);
    expect(newsPosts.every((p) => !p.isDraft)).toBe(true);
  });

  it("mỗi nhóm nội dung có ít nhất 1 bài, nhóm nào cũng có nhãn", () => {
    for (const category of NEWS_CATEGORIES) {
      expect(newsPosts.some((p) => p.category === category)).toBe(true);
      expect(NEWS_CATEGORY_LABELS[category]).toBeTruthy();
    }
  });

  it("có đúng 1 bài nổi bật; ảnh bìa WebP tồn tại; ngày ISO", () => {
    expect(newsPosts.filter((p) => p.featured)).toHaveLength(1);
    for (const p of newsPosts) {
      expect(p.coverImage).toMatch(/^\/images\/news\/[a-z0-9-]+\.webp$/);
      expect(existsSync(join("public", p.coverImage.slice(1)))).toBe(true);
      expect(p.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.content.length).toBeGreaterThan(0);
    }
  });

  it("nhắc tiến vua thì phải ghi là truyền thuyết dân gian", () => {
    for (const p of newsPosts) {
      const text = [p.title, p.excerpt, ...p.content].join(" ").toLowerCase();
      if (text.includes("tiến vua")) expect(text).toContain("truyền thuyết dân gian");
    }
  });
});

describe("lib/news", () => {
  it("trang chủ hiển thị 14 bài (8 bài cũ + 6 bài bổ sung), chuyển bài Dấu ấn sang Khám phá làng nghề", async () => {
    const { customerNewsPosts } = await import("@/data/customer-news");
    const { extraNewsPosts } = await import("@/data/extra-news");
    const homepagePosts = await getHomepageNewsPosts();
    expect(homepagePosts).toHaveLength(14);
    expect(new Set(homepagePosts.map((post) => post.slug))).toEqual(
      new Set([
        ...customerNewsPosts.filter((post) => post.slug !== VILLAGE_MOVED_NEWS_SLUG).map((post) => post.slug),
        ...extraNewsPosts.map((post) => post.slug),
      ]),
    );
    expect(homepagePosts.some((post) => post.featured)).toBe(false);
    const villagePosts = await getVillageNewsPosts();
    expect(villagePosts).toHaveLength(5);
    expect(villagePosts.some((post) => post.slug === VILLAGE_MOVED_NEWS_SLUG)).toBe(true);
    const allPosts = await getNewsPosts();
    expect(allPosts).toHaveLength(25);
    for (const post of allPosts.filter((post) => !homepagePosts.some((home) => home.slug === post.slug))) {
      expect(await getNewsPostBySlug(post.slug)).not.toBeNull();
    }
    homepagePosts[0].content.push("kiểm tra bản sao");
    expect((await getHomepageNewsPosts())[0].content).not.toContain("kiểm tra bản sao");
  });

  it("getNewsPosts đưa bài nổi bật lên đầu", async () => {
    const posts = await getNewsPosts();
    expect(posts).toHaveLength(25);
    expect(posts[0].featured).toBe(true);
  });

  it("getNewsPostBySlug tìm theo slug, không có thì null, trả bản sao", async () => {
    const slug = "tra-sen-net-thanh-tao-cua-van-hoa-tra-viet";
    const post = await getNewsPostBySlug(slug);
    expect(post?.category).toBe("van-hoa-tra");
    post?.content.push("thêm");
    expect((await getNewsPostBySlug(slug))?.content).toHaveLength(3);
    expect(await getNewsPostBySlug("khong-ton-tai")).toBeNull();
  });

  it("getRelatedNewsPosts ưu tiên cùng chủ đề, không gồm bài hiện tại", async () => {
    const slug = "tra-sen-net-thanh-tao-cua-van-hoa-tra-viet";
    const related = await getRelatedNewsPosts(slug);
    expect(related).toHaveLength(3);
    expect(related.map((p) => p.slug)).not.toContain(slug);
    expect(related[0].category).toBe("van-hoa-tra");
    expect(await getRelatedNewsPosts("khong-ton-tai", 2)).toHaveLength(2);
  });
});
