// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ABOUT_INSPIRATION } from "./about-content";
import { AboutSection } from "./about-section";
import { WhyChooseSection } from "./why-choose-section";

describe("AboutSection", () => {
  it("giữ neo Về chúng tôi và nội dung kể chuyện từ thẻ 5", () => {
    render(<AboutSection />);
    expect(document.getElementById("ve-chung-toi")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Chúng tôi bắt đầu từ đâu?" })).toBeInTheDocument();
    const storyCopy = [
      ABOUT_INSPIRATION.heading,
      ...ABOUT_INSPIRATION.paragraphs,
    ];
    for (const text of storyCopy) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });

  it("có Tầm nhìn và Sứ mệnh với đúng nội dung", () => {
    render(<AboutSection />);
    expect(screen.getByText(/TẦM NHÌN & SỨ MỆNH/)).toBeInTheDocument();
    expect(screen.getByText(/Đưa hương vị Bánh Bác Giang Xá vượt ra khỏi làng quê/)).toBeInTheDocument();
    expect(screen.getByText(/Giữ trọn hương vị xưa, thêm chút sáng tạo mới/)).toBeInTheDocument();
  });

  it("trang 10 dùng ảnh bánh chồng giữa hai tấm đỏ và hình quà bên phải", () => {
    render(<AboutSection />);
    const section = screen.getByRole("region", { name: "TẦM NHÌN & SỨ MỆNH" });
    const content = within(section);
    expect(content.getByRole("heading", { level: 4, name: "Tầm nhìn" })).toBeInTheDocument();
    expect(content.getByRole("heading", { level: 4, name: "Sứ mệnh" })).toBeInTheDocument();
    expect(content.getByRole("img", { name: /được gói trong màng trong suốt/ })).toHaveAttribute("src", expect.stringContaining("banh-bac-boc-mang.webp"));
    expect(content.getByRole("img", { name: /trên lụa đỏ/ })).toHaveAttribute("src", expect.stringContaining("home-hero-bac-tra-ky.webp"));
    expect(content.queryByText(/mdgnfjagdvna/)).not.toBeInTheDocument();
    expect(content.queryByText(/Nghệ nhân giữ lửa/)).not.toBeInTheDocument();
  });

  it("hiển thị đúng ba giá trị cốt lõi và thông điệp chung", () => {
    render(<AboutSection />);
    expect(screen.getByText("Giữ hồn vị xưa – Gửi trọn vị nay.")).toBeInTheDocument();
    for (const title of ["Giữ đúng gốc", "Ngon làm nền tảng", "Đổi mới có kiểm soát"]) {
      expect(screen.getByRole("heading", { level: 4, name: title })).toBeInTheDocument();
    }
  });
});

describe("WhyChooseSection", () => {
  it("có năm lý do theo đúng thứ tự, mỗi lý do dùng một ảnh cục bộ riêng", () => {
    render(<WhyChooseSection />);
    expect(document.getElementById("tai-sao-chon-bac-tra-ky")).not.toBeNull();
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual([
      "Hương vị truyền thống, chất riêng Giang Xá",
      "Nhân bánh đa dạng, hợp gu người trẻ",
      "Bao bì chỉn chu, trao quà thêm ý nghĩa",
      "Mỗi chiếc bánh, một câu chuyện làng nghề",
      "Bánh Bác và trà sen – Một trải nghiệm trọn vị",
    ]);
  });
});
