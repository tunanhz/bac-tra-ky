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

  it("bài mẫu có tiêu đề h1, nhãn Bản nháp, nội dung và bài liên quan", async () => {
    render(await NewsArticle({ params: params(post.slug) }));
    expect(screen.getByRole("heading", { level: 1, name: post.title })).toBeInTheDocument();
    expect(screen.getAllByText(DRAFT_LABEL).length).toBeGreaterThan(0);
    expect(screen.getByText(post.content[0])).toBeInTheDocument();
    expect(screen.getByRole("img", { name: post.coverImageAlt })).toBeInTheDocument();
    expect(screen.getByText("Ấn phẩm Bác Trà Ký")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Quay lại Tin tức/ })).toHaveAttribute("href", "/#tin-tuc");
    expect(screen.getByRole("heading", { level: 2, name: "Bài viết liên quan" })).toBeInTheDocument();
  });

  it.each(newsPosts)("metadata bài mẫu: $slug có nhãn và noindex", async (draft) => {
    const meta = await generateMetadata({ params: params(draft.slug) } as PageProps<"/tin-tuc/[slug]">);
    expect(meta.title).toBe(`[Bản nháp] ${draft.title}`);
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(meta.openGraph?.title).toBe(meta.title);
    expect(meta.description).toBe(draft.excerpt);
  });

  it("bài trà sen ghi nguồn, giấy phép và mô tả phần chỉnh ảnh", async () => {
    render(await NewsArticle({ params: params("tra-sen-net-thanh-tao-cua-van-hoa-tra-viet") }));
    expect(screen.getByRole("img", { name: /chén trà sen có cánh hoa sen/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Trà sen Tây Hồ · Ảnh: Viethavvh" }))
      .toHaveAttribute("href", "https://commons.wikimedia.org/wiki/File:Ch%C3%A9n_tr%C3%A0_sen.jpg");
    expect(screen.getByRole("link", { name: "CC BY-SA 4.0" }))
      .toHaveAttribute("href", "https://creativecommons.org/licenses/by-sa/4.0/");
    expect(screen.getByText(/Cắt khung, thu nhỏ và chuyển sang WebP/)).toBeInTheDocument();
    expect(screen.queryByText("Ảnh minh hoạ – sẽ thay ảnh thật")).not.toBeInTheDocument();
  });

  it("metadata slug lạ → 'Không tìm thấy bài viết'", async () => {
    const meta = await generateMetadata({ params: params("khong-ton-tai") } as PageProps<"/tin-tuc/[slug]">);
    expect(meta.title).toBe("Không tìm thấy bài viết");
  });
});
