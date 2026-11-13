// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./button";
import { ImagePlaceholder, ILLUSTRATION_LABEL } from "./image-placeholder";
import { ImageWithFallback } from "./image-with-fallback";
import { REVEAL_READY_FLAG } from "@/lib/reveal-boot";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

describe("Button", () => {
  it("không có href → <button type=button> với class biến thể", () => {
    render(<Button variant="outline">Gửi</Button>);
    const button = screen.getByRole("button", { name: "Gửi" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("btn", "btn-outline");
  });

  it("href tới section → thẻ <a> thường; href ngoài → mở tab mới an toàn", () => {
    render(
      <>
        <Button href="/#san-pham">Khám phá sản phẩm</Button>
        <Button href="https://facebook.com/x" variant="outline-light">
          Nhắn qua Facebook
        </Button>
      </>,
    );
    const inner = screen.getByRole("link", { name: "Khám phá sản phẩm" });
    expect(inner).toHaveAttribute("href", "/#san-pham");
    expect(inner).toHaveClass("btn-primary");
    const external = screen.getByRole("link", { name: "Nhắn qua Facebook" });
    expect(external).toHaveAttribute("target", "_blank");
    expect(external).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("SectionHeading", () => {
  it("render nhãn, tiêu đề đúng cấp và đoạn dẫn", () => {
    render(<SectionHeading eyebrow="Về chúng tôi" title="Bác Trà Ký là ai?" description="Đoạn dẫn" id="t" />);
    expect(screen.getByRole("heading", { level: 2, name: "Bác Trà Ký là ai?" })).toHaveAttribute("id", "t");
    expect(screen.getByText("Về chúng tôi")).toHaveClass("eyebrow");
    expect(screen.getByText("Đoạn dẫn")).toBeInTheDocument();
  });
});

describe("ImagePlaceholder", () => {
  it("có nhãn ảnh minh hoạ và tên đọc được", () => {
    render(<ImagePlaceholder alt="Hộp 6 bánh" />);
    expect(screen.getByText(ILLUSTRATION_LABEL)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: `Hộp 6 bánh (${ILLUSTRATION_LABEL})` })).toBeInTheDocument();
  });
});

describe("ImageWithFallback", () => {
  it("ảnh lỗi (file chưa có) → chuyển sang ImagePlaceholder", () => {
    render(<ImageWithFallback src="/images/products/chua-co.webp" alt="Hộp 2 bánh" width={400} height={400} />);
    const img = screen.getByRole("img", { name: "Hộp 2 bánh" });
    fireEvent.error(img);
    expect(screen.getByText(ILLUSTRATION_LABEL)).toBeInTheDocument();
  });
});

describe("Reveal", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("hiện khi phần tử vào khung nhìn", () => {
    let trigger: ((entries: Array<{ isIntersecting: boolean }>) => void) | undefined;
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
          trigger = cb;
        }
        observe() {}
        disconnect = disconnect;
      },
    );
    render(<Reveal>Nội dung</Reveal>);
    const el = screen.getByText("Nội dung");
    expect(el).toHaveClass("reveal");
    expect(el).not.toHaveClass("is-visible");
    act(() => trigger?.([{ isIntersecting: true }]));
    expect(el).toHaveClass("is-visible");
    expect(disconnect).toHaveBeenCalled();
  });

  it("người dùng bật giảm chuyển động → hiện ngay, không chờ cuộn tới", async () => {
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect() {}
      },
    );
    vi.stubGlobal(
      "matchMedia",
      (query: string) => ({ matches: query.includes("prefers-reduced-motion"), media: query }) as MediaQueryList,
    );
    render(<Reveal>Nội dung</Reveal>);
    const el = screen.getByText("Nội dung");
    await vi.waitFor(() => expect(el).toHaveClass("is-visible"));
    expect(observe).not.toHaveBeenCalled();
  });

  it("nạp module Reveal thì đặt cờ cho script khởi động (không gỡ class js dự phòng)", () => {
    expect((window as unknown as Record<string, unknown>)[REVEAL_READY_FLAG]).toBe(true);
  });

  it("không có IntersectionObserver → hiện ngay", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Reveal>Nội dung</Reveal>);
    const el = screen.getByText("Nội dung");
    await vi.waitFor(() => expect(el).toHaveClass("is-visible"));
  });
});
