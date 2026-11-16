// @vitest-environment jsdom
import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CRAFT_STEPS, STORY_CHAPTERS } from "./story-chapters";
import { StorySection } from "./story-section";

describe("StorySection", () => {
  it("dẫn đến đủ bốn chương trong thẻ 5", () => {
    render(<StorySection />);
    expect(document.getElementById("cau-chuyen")).not.toBeNull();
    expect(screen.getByText(/Theo dấu làng xưa, tìm về hương vị cũ/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tìm hiểu thêm" })).toHaveAttribute("href", "#chuong-1");

    const nav = within(screen.getByRole("navigation", { name: "Các chương của câu chuyện" }));
    for (const [index, name] of ["Hồn quê Giang Xá", "Dấu ấn lịch sử", "Hương vị quê nhà", "Bí quyết làm bánh Bác"].entries()) {
      const id = `chuong-${index + 1}`;
      expect(nav.getByRole("link", { name: new RegExp(name) })).toHaveAttribute("href", `#${id}`);
      expect(document.getElementById(id)).not.toBeNull();
    }
    expect(screen.getByRole("link", { name: "Khám phá sản phẩm" })).toHaveAttribute("href", "/#san-pham");
  });

  it("phân biệt sự kiện lịch sử và truyền thuyết, chú thích đúng ảnh lễ tưởng niệm", () => {
    render(<StorySection />);
    const history = within(screen.getByRole("article", { name: /Vùng đất gắn liền với vua Lý Nam Đế/ }));
    expect(history.getByText(/Năm 544.*Vạn Xuân/)).toBeInTheDocument();
    expect(history.getByText(/chùa Linh Bảo.*chùa Bảo Phúc/)).toBeInTheDocument();
    expect(history.getByRole("link", { name: "Xem tư liệu về chùa Bảo Phúc" })).toHaveAttribute("href", expect.stringContaining("tapchinghiencuuphathoc.vn"));
    expect(history.getByText(/Lễ tưởng niệm Lý Nam Đế ở Giang Xá — ảnh tư liệu/)).toBeInTheDocument();
    expect(screen.getByText(/Theo truyền thuyết dân gian.*dâng tiến vua/)).toBeInTheDocument();
  });

  it("có bốn công đoạn theo thứ tự, mỗi ảnh đều được ghi đúng nguồn và có tệp cục bộ", () => {
    render(<StorySection />);
    const craft = within(screen.getByRole("region", { name: /Bí quyết làm nên hương vị Bánh Bác/ }));
    expect(craft.getAllByRole("heading", { level: 4 }).map(({ textContent }) => textContent)).toEqual([
      "Chuẩn bị nguyên liệu", "Chuẩn bị bột bánh", "Bác bánh – giữ lửa nghề xưa", "Hoàn thiện chiếc bánh",
    ]);
    expect(craft.getByText(/trích từ ấn phẩm “Hành trình làm Bánh Bác”/)).toBeInTheDocument();
    for (const { alt, src } of [...STORY_CHAPTERS.map(({ image }) => image), ...CRAFT_STEPS]) {
      expect(screen.getByRole("img", { name: alt })).toBeInTheDocument();
      expect(existsSync(join("public", src.slice(1)))).toBe(true);
    }
  });
});
