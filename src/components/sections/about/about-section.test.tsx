// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ABOUT_CORE_VALUES, ABOUT_INSPIRATION, ABOUT_MISSION, ABOUT_VISION, ABOUT_WHO } from "./about-content";
import { AboutSection } from "./about-section";

describe("AboutSection", () => {
  it("có id ve-chung-toi và tiêu đề Bác Trà Ký là ai?", () => {
    render(<AboutSection />);
    expect(document.getElementById("ve-chung-toi")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Bác Trà Ký là ai?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Chúng tôi bắt đầu từ đâu?" })).toBeInTheDocument();
  });

  it("hiển thị mọi đoạn văn nguyên văn spec", () => {
    render(<AboutSection />);
    const paragraphs = [
      ABOUT_WHO.tagline,
      ...ABOUT_WHO.paragraphs,
      ABOUT_INSPIRATION.heading,
      ...ABOUT_INSPIRATION.paragraphs,
      ...[ABOUT_MISSION, ABOUT_VISION].flatMap((s) => [...s.paragraphs, s.closing]),
      ...ABOUT_CORE_VALUES.items.flatMap((v) => [v.subtitle, ...v.paragraphs]),
    ];
    for (const text of paragraphs) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    for (const statement of [ABOUT_MISSION, ABOUT_VISION]) {
      expect(screen.getByRole("heading", { level: 3, name: statement.heading })).toBeInTheDocument();
      expect(screen.getByText(`“${statement.quote}”`)).toBeInTheDocument();
    }
  });

  it("3 card giá trị cốt lõi 01–03 đúng tên spec", () => {
    render(<AboutSection />);
    for (const name of ["01. GIỮ ĐÚNG GỐC", "02. NGON LÀM NỀN TẢNG", "03. ĐỔI MỚI CÓ KIỂM SOÁT"]) {
      expect(screen.getByRole("heading", { level: 4, name })).toBeInTheDocument();
    }
  });

  it("ảnh CC BY có ghi công tác giả + giấy phép ngay trên trang", () => {
    render(<AboutSection />);
    expect(screen.getByRole("link", { name: "CC BY 3.0, Wikimedia Commons" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "CC BY 2.0, Wikimedia Commons" })).toBeInTheDocument();
    expect(screen.getByText(/Duyphuong/)).toBeInTheDocument();
    expect(screen.getByText(/Ron Diggity/)).toBeInTheDocument();
  });
});
