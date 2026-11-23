// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getNewsPosts } from "@/lib/news";
import type { NewsPost } from "@/lib/types";
import { arrangeNews, NewsBoard } from "./news-board";
import { NewsCard } from "./news-card";
import { DRAFT_LABEL, formatNewsDate, newsHref } from "./news-meta";
import { NewsSection } from "./news-section";

const posts = await getNewsPosts();
const originalCakePost = posts.find((post) => post.slug === "banh-bac-giang-xa-sac-do-gac-huong-vung-rang")!;

function gridTitles() {
  return within(screen.getByRole("list"))
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);
}

describe("news helpers", () => {
  it("formatNewsDate đổi YYYY-MM-DD → DD/MM/YYYY, chuỗi lạ giữ nguyên", () => {
    expect(formatNewsDate("2026-11-13")).toBe("13/11/2026");
    expect(formatNewsDate("sai")).toBe("sai");
  });

  it("newsHref trỏ /tin-tuc/[slug]", () => {
    expect(newsHref("abc")).toBe("/tin-tuc/abc");
  });

  it("arrangeNews: tách bài nổi bật và lưới bài viết", () => {
    const all = arrangeNews(posts);
    expect(all.featured?.featured).toBe(true);
    expect(all.grid).toHaveLength(posts.length - 1);
    expect(all.grid).not.toContain(all.featured);
  });
});

describe("NewsCard", () => {
  it("có ảnh, tiêu đề, mô tả, danh mục, 'Đọc thêm' → trang chi tiết và không có nhãn nháp", () => {
    const post: NewsPost = { ...originalCakePost, isDraft: false };
    render(<NewsCard post={post} />);
    expect(screen.queryByText(DRAFT_LABEL)).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: post.coverImageAlt })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: post.title })).toBeInTheDocument();
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
    expect(screen.getByText(/^Đọc thêm/)).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName(`Đọc thêm: ${post.title}`);
    expect(screen.getByText("Hình ảnh từ Bác Trà Ký")).toBeInTheDocument();
    expect(screen.queryByText("Ảnh minh hoạ – sẽ thay ảnh thật")).not.toBeInTheDocument();
    expect(links[0]).toHaveAttribute("href", newsHref(post.slug));
    expect(links[0]).toHaveClass("btn-primary");
    expect(links[0].className).toMatch(/readMore/);
  });

  it("chỉ hiện nhãn 'Bản nháp' với dữ liệu nháp; không có chú thích thì không hiện nhãn ảnh mẫu", () => {
    const draft: NewsPost = { ...originalCakePost, isDraft: true, coverCaption: undefined };
    render(<NewsCard post={draft} />);
    expect(screen.getByText(DRAFT_LABEL)).toBeInTheDocument();
    expect(screen.queryByText("Ảnh minh hoạ – sẽ thay ảnh thật")).not.toBeInTheDocument();
  });

  it("bài trà sen hiển thị ảnh trà sen Tây Hồ kèm tác giả", () => {
    const tea = posts.find((post) => post.slug === "tra-sen-net-thanh-tao-cua-van-hoa-tra-viet")!;
    render(<NewsCard post={tea} />);
    expect(screen.getByRole("img", { name: /chén trà sen có cánh hoa sen/ }).getAttribute("src"))
      .toContain("chen-tra-sen-tay-ho.webp");
    expect(screen.getByText("Trà sen Tây Hồ · Ảnh: Viethavvh")).toBeInTheDocument();
  });
});

describe("NewsSection / NewsBoard", () => {
  it("id tin-tuc, tiêu đề 'Tin tức', bài nổi bật + lưới trượt ngang 14 card chính thức", () => {
    const { container } = render(<NewsSection posts={posts} />);
    expect(container.querySelector("section#tin-tuc")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Tin tức" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: posts[0].title })).toBeInTheDocument();
    expect(screen.queryByText("Bài nổi bật")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: posts[0].coverImageAlt })).toBeInTheDocument();
    expect(within(screen.getByRole("heading", { name: posts[0].title }).closest("article")!).getByText("Ấn phẩm Bác Trà Ký")).toBeInTheDocument();
    expect(gridTitles()).toHaveLength(14);
    expect(screen.queryByText(DRAFT_LABEL)).not.toBeInTheDocument();
    expect(container.querySelectorAll("time")).toHaveLength(0);
  });

  it("không có bài → trạng thái rỗng", () => {
    render(<NewsBoard posts={[]} />);
    expect(screen.getByText("Bài viết đang được chuẩn bị.")).toBeInTheDocument();
  });
});
