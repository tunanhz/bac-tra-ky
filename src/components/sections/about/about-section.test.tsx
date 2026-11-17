// @vitest-environment jsdom
import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ABOUT_INSPIRATION } from "./about-content";
import { AboutSection } from "./about-section";
import { WhyChooseSection } from "./why-choose-section";

describe("AboutSection", () => {
  it("giữ neo Về chúng tôi và nội dung kể chuyện từ thẻ 5", () => {
    render(<AboutSection />);
    expect(document.getElementById("ve-chung-toi")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Câu chuyện thương hiệu" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Chúng tôi bắt đầu từ đâu?" })).toBeInTheDocument();
    const storyCopy = [
      ABOUT_INSPIRATION.heading,
      ...ABOUT_INSPIRATION.paragraphs,
    ];
    for (const text of storyCopy) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });

  it("có hai card Tầm nhìn và Sứ mệnh với đúng nội dung", () => {
    render(<AboutSection />);
    const statements = within(screen.getByRole("region", { name: "Tầm nhìn và sứ mệnh" }));
    const cards = statements.getAllByRole("article");
    const expected = [
      ["Tầm nhìn", /Đưa hương vị Bánh Bác Giang Xá vượt ra khỏi làng quê/],
      ["Sứ mệnh", /Giữ trọn hương vị xưa, thêm chút sáng tạo mới/],
    ] as const;

    expect(cards).toHaveLength(expected.length);
    for (const [index, [name, description]] of expected.entries()) {
      const card = within(cards[index]);
      expect(card.getByRole("heading", { level: 3, name })).toBeInTheDocument();
      expect(card.getByText(description)).toBeInTheDocument();
    }
  });

  it("hiển thị đúng ba giá trị cốt lõi và thông điệp chung", () => {
    render(<AboutSection />);
    const values = within(screen.getByRole("region", { name: "Giá trị cốt lõi" }));
    expect(values.getByText("Giữ hồn vị xưa – Gửi trọn vị nay.")).toBeInTheDocument();
    const cards = values.getAllByRole("listitem");
    expect(cards).toHaveLength(3);
    expect(cards.map((card) => within(card).getByRole("heading", { level: 4 }).textContent)).toEqual([
      "Giữ đúng gốc", "Ngon làm nền tảng", "Đổi mới có kiểm soát",
    ]);
  });

  it("hiển thị ảnh thật sen bách diệp Tây Hồ, ghi công và không dùng nhãn minh hoạ", () => {
    render(<AboutSection />);
    const image = screen.getByRole("img", { name: /Bông sen bách diệp màu hồng/ });
    expect(image.getAttribute("src")).toContain("sen-bach-diep-tay-ho.webp");
    expect(existsSync(join("public", "images", "story", "sen-bach-diep-tay-ho.webp"))).toBe(true);
    expect(screen.getByText("Sen bách diệp Tây Hồ dùng để ướp trà.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Viethavvh" })).toHaveAttribute("href", expect.stringContaining("commons.wikimedia.org"));
    expect(screen.getByRole("link", { name: "CC BY-SA 4.0" })).toHaveAttribute("href", "https://creativecommons.org/licenses/by-sa/4.0/");
    expect(screen.queryByText(/Ảnh minh ho[ạa]/i)).not.toBeInTheDocument();
  });

  it("ảnh Giang Xá có chú thích và ảnh CC BY còn lại có ghi công", () => {
    render(<AboutSection />);
    expect(screen.getByRole("img", { name: /Cổng đá và hàng cờ/ })).toBeInTheDocument();
    expect(screen.getByText("Cổng làng Giang Xá — ảnh tư liệu")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "CC BY 2.0, Wikimedia Commons" })).toBeInTheDocument();
    expect(screen.getByText(/Ron Diggity/)).toBeInTheDocument();
  });
});

describe("WhyChooseSection", () => {
  it("có năm lý do theo đúng thứ tự, mỗi lý do dùng một ảnh cục bộ riêng", () => {
    render(<WhyChooseSection />);
    const section = within(screen.getByRole("region", { name: "Tại sao nên chọn Bác Trà Ký?" }));
    const cards = section.getAllByRole("listitem");
    expect(cards.map((card) => within(card).getByRole("heading", { level: 3 }).textContent)).toEqual([
      "Hương vị truyền thống, chất riêng Giang Xá",
      "Nhân bánh đa dạng, hợp gu người trẻ",
      "Bao bì chỉn chu, trao quà thêm ý nghĩa",
      "Mỗi chiếc bánh, một câu chuyện làng nghề",
      "Bánh Bác và trà sen – Một trải nghiệm trọn vị",
    ]);
    expect(within(cards[1]).getByText(/khoai môn, matcha, đậu đỏ và nhân mặn/)).toBeInTheDocument();
    const imagePaths = cards.map((card) => {
      const image = within(card).getByRole("img", { name: /\S/ });
      const src = new URL(image.getAttribute("src") ?? "", "https://test.local");
      return src.searchParams.get("url") ?? src.pathname;
    });
    expect(new Set(imagePaths).size).toBe(cards.length);
    for (const imagePath of imagePaths) {
      expect(imagePath).toMatch(/^\/images\/.+\.webp$/);
      expect(existsSync(join("public", imagePath.slice(1)))).toBe(true);
    }
  });
});
