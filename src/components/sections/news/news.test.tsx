// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { getNewsPosts } from "@/lib/news";
import type { NewsPost } from "@/lib/types";
import { arrangeNews, NewsBoard } from "./news-board";
import { NewsCard } from "./news-card";
import { DRAFT_LABEL, formatNewsDate, newsHref } from "./news-meta";
import { NewsSection } from "./news-section";

const posts = await getNewsPosts();

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

  it("arrangeNews: 'all' tách bài nổi bật; chọn chủ đề thì không có nổi bật", () => {
    const all = arrangeNews(posts, "all");
    expect(all.featured?.featured).toBe(true);
    expect(all.grid).toHaveLength(posts.length - 1);
    expect(all.grid).not.toContain(all.featured);

    const tea = arrangeNews(posts, "van-hoa-tra");
    expect(tea.featured).toBeNull();
    expect(tea.grid.every((post) => post.category === "van-hoa-tra")).toBe(true);
    expect(tea.grid).toHaveLength(2);
  });
});

describe("NewsCard", () => {
  it("có ảnh, tiêu đề, mô tả, danh mục, nhãn 'Bản nháp', 'Đọc thêm' → trang chi tiết", () => {
    const post = posts[1];
    render(<NewsCard post={post} />);
    expect(screen.getByText(DRAFT_LABEL)).toBeInTheDocument();
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
  });

  it("bài không phải nháp → không có nhãn 'Bản nháp'", () => {
    const published: NewsPost = { ...posts[1], isDraft: false };
    render(<NewsCard post={published} />);
    expect(screen.queryByText(DRAFT_LABEL)).not.toBeInTheDocument();
  });
});

describe("NewsSection / NewsBoard", () => {
  it("id tin-tuc, tiêu đề 'Tin tức', bài nổi bật + lưới 5 card, mọi bài đều có nhãn 'Bản nháp'", () => {
    const { container } = render(<NewsSection posts={posts} />);
    expect(container.querySelector("section#tin-tuc")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Tin tức" })).toBeInTheDocument();
    expect(screen.getByText("Bài nổi bật")).toBeInTheDocument();
    expect(screen.getByText(/không phải thông báo sự kiện hay ưu đãi đang diễn ra/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: posts[0].coverImageAlt })).toBeInTheDocument();
    expect(screen.getByText("Ấn phẩm Bác Trà Ký")).toBeInTheDocument();
    expect(gridTitles()).toHaveLength(5);
    expect(screen.getAllByText(DRAFT_LABEL, { selector: "span" })).toHaveLength(6);
    expect(container.querySelector("time")).toBeNull();
  });

  it("bộ lọc 5 chủ đề + Tất cả; lọc đúng chủ đề, ẩn bài nổi bật", async () => {
    const user = userEvent.setup();
    render(<NewsBoard posts={posts} />);
    const group = screen.getByRole("group", { name: "Lọc tin tức theo chủ đề" });
    expect(within(group).getAllByRole("button")).toHaveLength(6);

    await user.click(within(group).getByRole("button", { name: "Câu chuyện làng nghề" }));
    expect(within(group).getByRole("button", { name: "Câu chuyện làng nghề" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByText("Bài nổi bật")).not.toBeInTheDocument();
    expect(gridTitles()).toEqual(["Giang Xá — vùng đất của ký ức và hương nếp"]);
    expect(screen.getByText("Đang hiển thị 1 bài viết")).toBeInTheDocument();
  });

  it("chủ đề không có bài → thông báo + 'Xem tất cả'", async () => {
    const user = userEvent.setup();
    render(<NewsBoard posts={posts.filter((post) => post.category === "lang-nghe")} />);
    await user.click(screen.getByRole("button", { name: "Văn hoá thưởng trà" }));
    expect(screen.getByText("Chưa có bài viết trong chủ đề này.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Xem tất cả" }));
    expect(screen.getByText("Bài nổi bật")).toBeInTheDocument();
  });

  it("không có bài → trạng thái rỗng", () => {
    render(<NewsBoard posts={[]} />);
    expect(screen.getByText("Bài viết đang được chuẩn bị.")).toBeInTheDocument();
  });
});
