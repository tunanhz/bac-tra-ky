// @vitest-environment jsdom
import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CRAFT_STEPS, STORY_CHAPTERS } from "./story-chapters";
import { StorySection } from "./story-section";

describe("StorySection", () => {
  it("dẫn đến đủ bốn chương theo yêu cầu", () => {
    render(<StorySection />);
    expect(document.getElementById("cau-chuyen")).not.toBeNull();
    expect(screen.getByText(/Theo dấu làng xưa, tìm về hương vị cũ.*tâm huyết và những nét đẹp văn hóa/)).toBeInTheDocument();
    expect(screen.getByText(/Không chỉ là nơi lưu giữ những dấu tích lịch sử/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tìm Hiểu Thêm/ })).toHaveAttribute("href", "#chuong-1");

    for (let i = 1; i <= 4; i++) {
      expect(document.getElementById(`chuong-${i}`)).not.toBeNull();
    }
    const productLinks = screen.getAllByRole("link", { name: /Khám phá sản phẩm/ });
    expect(productLinks.length).toBeGreaterThan(0);
    expect(productLinks[0]).toHaveAttribute("href", "/#san-pham");
  });

  it("phân biệt sự kiện lịch sử và truyền thuyết, chú thích đúng ảnh lễ", () => {
    render(<StorySection />);
    const history = within(screen.getByRole("article", { name: /Vùng đất gắn liền với Vua Lý Nam Đế/ }));
    expect(history.getByText(/Năm 544.*Vạn Xuân/)).toBeInTheDocument();
    expect(history.getByText(/chùa Linh Bảo.*chùa Bảo Phúc/)).toBeInTheDocument();
    expect(history.getByText(/Lễ tưởng niệm Lý Nam Đế ở Giang Xá — ảnh tư liệu/)).toBeInTheDocument();
    expect(screen.queryByText(/Xem ảnh chùa Bảo Phúc/)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bánh Bác – Sản vật tiến vua, niềm tự hào đất Giang Xá" })).toBeInTheDocument();
    expect(screen.getByText(/Theo truyền thuyết dân gian.*được dùng để tiến vua/)).toBeInTheDocument();
  });

  it("có bốn công đoạn theo thứ tự, mỗi ảnh đều được ghi đúng nguồn và có tệp cục bộ", () => {
    render(<StorySection />);
    const craft = within(screen.getByRole("region", { name: /Bí quyết làm nên hương vị Bánh Bác/ }));
    expect(craft.getAllByRole("heading", { level: 4 }).map(({ textContent }) => textContent)).toEqual([
      "Chuẩn bị nguyên liệu", "Chuẩn bị bột bánh", "Bác bánh – giữ lửa nghề xưa", "Hoàn thiện chiếc bánh",
    ]);
    expect(craft.getByText(/trích từ ấn phẩm “Hành trình làm Bánh Bác”/)).toBeInTheDocument();
    for (const step of CRAFT_STEPS) expect(craft.getByText(step.caption)).toBeInTheDocument();
    for (const { alt, src } of [...STORY_CHAPTERS.flatMap(({ image, relatedPhotos }) => [image, ...(relatedPhotos ?? [])]), ...CRAFT_STEPS]) {
      expect(screen.getByRole("img", { name: alt })).toBeInTheDocument();
      expect(existsSync(join("public", src.slice(1)))).toBe(true);
    }
  });
});
