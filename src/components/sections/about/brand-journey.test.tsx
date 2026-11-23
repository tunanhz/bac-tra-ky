// @vitest-environment jsdom
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BrandJourney } from "./brand-journey";

afterEach(() => { vi.restoreAllMocks(); });

describe("BrandJourney images and scroll tracking", () => {
  it("uses five distinct relevant local images with descriptive alt text", () => {
    render(<BrandJourney />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(5);
    expect(images.map(image => image.getAttribute("alt"))).toEqual([
      "Cổng làng Giang Xá trong ngày hội",
      "Bánh Bác cắt lát với lớp nếp đỏ và nhân đậu xanh",
      "Đôi tay cuộn lớp bánh gấc đỏ phủ vừng trên lá xanh",
      "Hộp hai Bánh Bác của Bác Trà Ký",
      "Bộ quà Bánh Bác và trà sen của Bác Trà Ký",
    ]);
    expect(new Set(images.map(image => image.getAttribute("src"))).size).toBe(5);
    expect(screen.getByRole("link", { name: /Ảnh công đoạn/ })).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses clean original decorative layers without adding screen-reader image noise", () => {
    const { container } = render(<BrandJourney />);
    for (const name of ["border-top", "tea-tray"]) {
      const decoration = container.querySelector(`img[src*="feedback-journey-${name}.png"]`);
      expect(decoration).toHaveAttribute("alt", "");
      expect(decoration).toHaveAttribute("aria-hidden", "true");
    }
    expect(screen.getAllByRole("img")).toHaveLength(5);
  });

  it("tracks the nearest step on forward and reverse scroll and cleans up its frame", () => {
    let frames: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frames.push(callback); return frames.length; });
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<BrandJourney />);
    const items = within(screen.getByRole("list", { name: /5 mốc/ })).getAllByRole("listitem");
    let selected = 0;
    items.forEach((item, index) => vi.spyOn(item, "getBoundingClientRect").mockImplementation(() => ({
      top: window.innerHeight / 2 - 150 + (index - selected) * 400,
      height: 300,
    }) as DOMRect));
    const flush = () => act(() => { const pending = frames; frames = []; pending.forEach(callback => callback(0)); });
    flush();
    for (const index of [1, 2, 4, 3, 0]) {
      selected = index;
      fireEvent.scroll(window);
      flush();
      expect(items.filter(item => item.getAttribute("aria-current") === "step")).toEqual([items[index]]);
    }
    fireEvent.resize(window);
    unmount();
    expect(cancel).toHaveBeenCalled();
  });

  it("advances across the horizontal desktop row as it scrolls past the viewport center", () => {
    let frames: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frames.push(callback); return frames.length; });
    render(<BrandJourney />);
    const items = within(screen.getByRole("list", { name: /5 mốc/ })).getAllByRole("listitem");
    let progress = .1;
    items.forEach(item => vi.spyOn(item, "getBoundingClientRect").mockImplementation(() => ({
      top: window.innerHeight / 2 - progress * 400,
      height: 400,
    }) as DOMRect));
    const flush = () => act(() => { const pending = frames; frames = []; pending.forEach(callback => callback(0)); });
    for (const index of [0, 1, 2, 4, 3, 0]) {
      progress = (index + .1) / 5;
      fireEvent.scroll(window);
      flush();
      expect(items.filter(item => item.getAttribute("aria-current") === "step")).toEqual([items[index]]);
    }
  });

  it("highlights the step containing a keyboard-focused credit link without adding tab stops", () => {
    render(<BrandJourney />);
    fireEvent.focus(screen.getByRole("link", { name: /Ảnh công đoạn/ }));
    const items = within(screen.getByRole("list", { name: /5 mốc/ })).getAllByRole("listitem");
    expect(items[2]).toHaveAttribute("aria-current", "step");
    expect(items.filter(item => item.hasAttribute("tabindex"))).toHaveLength(0);
  });

});
