// @vitest-environment jsdom
import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CRAFT_STEPS, STORY_CHAPTERS } from "./story-chapters";
import { StorySection } from "./story-section";
import styles from "./story-section.module.css";

describe("StorySection", () => {
  it("dùng đúng tiêu đề và nền sạch khách cung cấp ở Canva trang 1–2", () => {
    render(<StorySection />);
    expect(screen.getByRole("heading", { level: 2, name: "Khám phá làng nghề Giang Xá" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Khám phá câu chuyện làng nghề" })).not.toBeInTheDocument();
    const backdrop = screen.getByRole("img", { name: /Đôi tay nghệ nhân cuộn Bánh Bác trên nền be/ });
    expect(backdrop).toHaveAttribute("src", expect.stringContaining("story-intro-rolling-cake.webp"));
    expect(existsSync(join("public", "images/revisions/story-intro-rolling-cake.webp"))).toBe(true);
    expect(screen.queryByText(/Lấy nền này|Text lỗi|ko giống mẫu/)).not.toBeInTheDocument();
  });

  it("thêm ảnh Giang Xá thứ ba và in nghiêng lời dẫn xanh đậm theo trang 4–5", () => {
    render(<StorySection />);
    const village = screen.getByRole("article", { name: "Giang Xá – Nét đẹp làng quê Bắc Bộ" });
    const villageContent = within(village);
    expect(STORY_CHAPTERS[0].relatedPhotos).toHaveLength(3);
    expect(villageContent.getByText(STORY_CHAPTERS[0].paragraphs[0])).toHaveClass("italic", "text-tra");
    const heading = villageContent.getByRole("heading", { level: 3 });
    const paper = village.querySelector("[data-village-paper]");
    const stack = village.querySelector("[data-village-photo-stack]");
    expect(heading.parentElement).not.toBe(village);
    expect(heading).not.toHaveClass("lg:col-span-12");
    expect(paper).not.toBeNull();
    expect(within(paper as HTMLElement).getByRole("img", { name: /Đoàn rước kiệu/ })).toBeInTheDocument();
    expect(stack?.children).toHaveLength(2);
    expect(within(stack as HTMLElement).getAllByRole("img").map((img) => img.getAttribute("alt"))).toEqual([
      STORY_CHAPTERS[0].relatedPhotos?.[0].alt,
      STORY_CHAPTERS[0].relatedPhotos?.[1].alt,
    ]);
    expect(paper?.previousElementSibling).toBe(heading.parentElement);
    expect(stack?.previousElementSibling).toBe(paper);
    expect(villageContent.getByRole("img", { name: "Đoàn rước kiệu và người dân trong lễ hội làng Giang Xá" })).toBeInTheDocument();
    // Canva không cung cấp URL video: không dựng nút giả hoặc liên kết trống.
    expect(villageContent.queryByRole("link", { name: /video/i })).not.toBeInTheDocument();
  });

  it("dùng bốn ảnh AI theo đúng thứ tự mẫu Bỏ (12), giữ chữ riêng trong bố cục 2×2", () => {
    render(<StorySection />);
    const craft = within(screen.getByRole("region", { name: /Bí quyết làm nên hương vị Bánh Bác/ }));
    const list = craft.getByRole("list");
    expect(list).toHaveClass(styles.craftGrid);
    const steps = within(list).getAllByRole("listitem");
    expect(steps).toHaveLength(4);
    const expectedAssets = ["craft-ingredients.webp", "craft-kneading.webp", "craft-cooking.webp", "craft-finished.webp"];
    steps.forEach((step, i) => {
      expect(step.firstElementChild?.tagName).toBe("FIGURE");
      const image = within(step).getByRole("img");
      expect(image).toHaveAttribute("src", expect.stringContaining(expectedAssets[i]));
      expect(image).toHaveAttribute("sizes", "(min-width: 640px) 48vw, 96vw");
      expect(image).toHaveAttribute("width", "694");
      expect(within(step).getByRole("heading", { level: 4 }).parentElement).toHaveClass(styles.craftStepCopy);
      expect(within(step).getByText("Công đoạn 0" + (i + 1))).toBeInTheDocument();
    });
    const header = list.previousElementSibling;
    expect(header?.tagName).toBe("HEADER");
    expect(header?.querySelector("img")).toHaveAttribute("src", expect.stringContaining("craft-village-header.webp"));
    expect(within(header as HTMLElement).getByRole("heading", { level: 3 })).toHaveTextContent("Bí quyết làm nên hương vị Bánh Bác");
    for (const asset of ["craft-village-header.webp", "craft-cloud-footer.webp", "craft-process-generated.webp"]) {
      expect(existsSync(join("public/images/revisions", asset))).toBe(true);
    }
  });

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
    expect(craft.queryByText(/Hình ảnh minh họa được tạo bằng AI theo mẫu bố cục khách hàng cung cấp/)).not.toBeInTheDocument();
    expect(craft.getByRole("link", { name: /Khám phá sản phẩm/ })).toHaveAttribute("href", "/#san-pham");
    expect(craft.queryByText(/trích từ ấn phẩm/)).not.toBeInTheDocument();
    for (const step of CRAFT_STEPS) expect(craft.getByText(step.caption)).toBeInTheDocument();
    for (const { alt, src } of [...STORY_CHAPTERS.flatMap(({ image, relatedPhotos }) => [image, ...(relatedPhotos ?? [])]), ...CRAFT_STEPS]) {
      if (src !== STORY_CHAPTERS[0].image.src) expect(screen.getByRole("img", { name: alt })).toBeInTheDocument();
      expect(existsSync(join("public", src.slice(1)))).toBe(true);
    }
  });
});
