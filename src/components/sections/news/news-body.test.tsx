// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { customerNewsPosts } from "@/data/customer-news";
import { NewsBody } from "./news-body";
import { NewsArticle } from "./news-article";

describe("NewsBody", () => {
  it("render đề mục h2, nhấn mạnh, ảnh đủ kích thước và caption/link nguồn an toàn", () => {
    const { container } = render(<NewsBody blocks={[
      { type: "heading", runs: [{ text: "Gìn giữ giá trị truyền thống" }] },
      { type: "paragraph", runs: [{ text: "Vạn Xuân", strong: true }, { text: " năm 544", emphasis: true }] },
      { type: "image", src: "/images/news/noi-dung-bao-02.webp", alt: "Cổng đình Giang Xá", width: 1600, height: 1200, caption: [{ text: "Nguồn: " }, { text: "Tạp chí Văn hóa và Phát triển", href: "https://vanhoavaphattrien.vn/" }] },
    ]} />);
    expect(screen.getByRole("heading", { level: 2, name: "Gìn giữ giá trị truyền thống" })).toBeInTheDocument();
    expect(container.querySelector("strong")).toHaveTextContent("Vạn Xuân");
    expect(container.querySelector("em")).toHaveTextContent("năm 544");
    expect(screen.getByRole("img", { name: "Cổng đình Giang Xá" })).toHaveAttribute("width", "1600");
    expect(container.querySelector("figcaption")).toHaveTextContent("Nguồn: Tạp chí");
    expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("không thực thi HTML hay javascript URL từ nội dung", () => {
    const { container } = render(<NewsBody blocks={[{ type: "paragraph", runs: [{ text: "<script>alert(1)</script>", href: "javascript:alert(1)" }] }]} />);
    expect(container.querySelector("script")).toBeNull();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("<script>alert(1)</script>")).toBeInTheDocument();
  });

  it("trang bài mới có lời dẫn đầy đủ, đề mục, 4 ảnh thân bài và link video; không có nhãn nháp", async () => {
    const post = customerNewsPosts[0];
    render(await NewsArticle({ params: Promise.resolve({ slug: post.slug }) }));
    const article = within(screen.getByRole("article", { name: post.title }));
    expect(article.getByText(post.lead!)).toBeInTheDocument();
    expect(article.getByRole("heading", { level: 2, name: "Lý Nam Đế và dấu mốc quan trọng trong lịch sử dân tộc" })).toBeInTheDocument();
    expect(article.getAllByRole("img")).toHaveLength(5);
    expect(article.getByRole("link", { name: "Fanpage Bác Trà Ký" })).toHaveAttribute("href", "https://www.facebook.com/reel/1112875721624364");
    expect(article.queryByText("Bản nháp")).not.toBeInTheDocument();
  });
});
