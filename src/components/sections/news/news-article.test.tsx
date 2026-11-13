// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { generateMetadata, generateStaticParams } from "@/app/tin-tuc/[slug]/page";
import { DRAFT_LABEL } from "./news-meta";
import { NewsArticle } from "./news-article";
import { newsPosts } from "@/data/news";

const NOT_FOUND = "NEXT_NOT_FOUND_TEST";
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error(NOT_FOUND);
  },
}));

const post = newsPosts[0];
const params = (slug: string) => Promise.resolve({ slug });

describe("/tin-tuc/[slug]", () => {
  it("prerender mọi bài (generateStaticParams)", async () => {
    const all = await generateStaticParams();
    expect(all).toHaveLength(newsPosts.length);
    expect(all).toContainEqual({ slug: post.slug });
  });

  it("slug lạ → notFound()", async () => {
    await expect(NewsArticle({ params: params("khong-ton-tai") })).rejects.toThrow(NOT_FOUND);
  });

  it("bài có thật → tiêu đề h1, nhãn Bản nháp, nội dung, nút quay lại Tin tức, bài liên quan", async () => {
    render(await NewsArticle({ params: params(post.slug) }));
    expect(screen.getByRole("heading", { level: 1, name: post.title })).toBeInTheDocument();
    expect(screen.getAllByText(DRAFT_LABEL).length).toBeGreaterThan(0);
    expect(screen.getByText(post.content[0])).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Quay lại Tin tức/ })).toHaveAttribute("href", "/#tin-tuc");
    expect(screen.getByRole("heading", { level: 2, name: "Bài viết liên quan" })).toBeInTheDocument();
  });

  it("metadata bài nháp: tiêu đề '[Bản nháp] …', robots noindex", async () => {
    expect(post.isDraft).toBe(true);
    const meta = await generateMetadata({ params: params(post.slug) } as PageProps<"/tin-tuc/[slug]">);
    expect(meta.title).toBe(`[Bản nháp] ${post.title}`);
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(meta.description).toBe(post.excerpt);
  });

  it("metadata slug lạ → 'Không tìm thấy bài viết'", async () => {
    const meta = await generateMetadata({ params: params("khong-ton-tai") } as PageProps<"/tin-tuc/[slug]">);
    expect(meta.title).toBe("Không tìm thấy bài viết");
  });
});
