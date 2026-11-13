// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FOLK_LEGEND_LABEL, STORY_CHAPTERS } from "./story-chapters";
import { StorySection } from "./story-section";

function chapterTexts(index: number): string[] {
  const chapter = STORY_CHAPTERS[index];
  return [...chapter.paragraphs, chapter.legend?.text ?? "", chapter.quote.text];
}

describe("StorySection", () => {
  it("có id cau-chuyen và 4 chương đúng tên spec", () => {
    render(<StorySection />);
    expect(document.getElementById("cau-chuyen")).not.toBeNull();
    expect(STORY_CHAPTERS.map((c) => c.title)).toEqual([
      "Hồn quê Giang Xá",
      "Câu chuyện Bánh Bác",
      "Nghệ thuật thưởng Trà Sen",
      "Truyền thống tiếp nối",
    ]);
    for (const chapter of STORY_CHAPTERS) {
      expect(screen.getByRole("heading", { level: 3, name: chapter.title })).toBeInTheDocument();
      expect(document.getElementById(chapter.id)).not.toBeNull();
    }
  });

  it("chương I nhắc Lý Nam Đế đúng chữ: chùa Bảo Phúc – chùa Giang Xá hiện nay", () => {
    expect(chapterTexts(0).join(" ")).toContain("Lý Nam Đế");
    expect(chapterTexts(0).join(" ")).toContain("chùa Bảo Phúc – chùa Giang Xá hiện nay");
  });

  it("đoạn nào nhắc 'tiến vua' thì chính đoạn đó ghi 'truyền thuyết dân gian'", () => {
    const all = STORY_CHAPTERS.flatMap((_, i) => chapterTexts(i));
    const mentions = all.filter((text) => /tiến vua/i.test(text));
    for (const text of mentions) {
      expect(text).toMatch(/truyền thuyết dân gian/i);
    }
    // Trên trang: có "tiến vua" thì phải có nhãn truyền thuyết dân gian.
    render(<StorySection />);
    const page = document.body.textContent ?? "";
    if (/tiến vua/i.test(page)) {
      expect(page).toMatch(/truyền thuyết dân gian/i);
      expect(screen.getByRole("complementary", { name: FOLK_LEGEND_LABEL })).toBeInTheDocument();
    }
  });

  it("mục lục chương trỏ đúng neo và chương IV có nút Khám phá sản phẩm → #san-pham", () => {
    render(<StorySection />);
    for (const chapter of STORY_CHAPTERS) {
      expect(
        screen.getByRole("link", { name: `Chương ${chapter.numeral}: ${chapter.title}` }),
      ).toHaveAttribute("href", `#${chapter.id}`);
    }
    expect(screen.getByRole("link", { name: "Khám phá sản phẩm" })).toHaveAttribute("href", "/#san-pham");
  });
});
