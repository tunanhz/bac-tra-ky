// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { REVEAL_BOOT_SCRIPT, REVEAL_FALLBACK_MS, REVEAL_READY_FLAG } from "./reveal-boot";

const win = window as unknown as Record<string, unknown>;

function runBootScript() {
  // Chạy đúng chuỗi script được chèn vào <head>.
  new Function(REVEAL_BOOT_SCRIPT)();
}

describe("REVEAL_BOOT_SCRIPT", () => {
  afterEach(() => {
    vi.useRealTimers();
    document.documentElement.classList.remove("js");
    delete win[REVEAL_READY_FLAG];
  });

  it("gắn class js lên <html> ngay khi chạy (CSS mới ẩn .reveal)", () => {
    vi.useFakeTimers();
    runBootScript();
    expect(document.documentElement).toHaveClass("js");
  });

  it("mã Reveal không nạp được sau thời hạn → gỡ class js để nội dung hiện", () => {
    vi.useFakeTimers();
    runBootScript();
    vi.advanceTimersByTime(REVEAL_FALLBACK_MS);
    expect(document.documentElement).not.toHaveClass("js");
  });

  it("mã Reveal đã nạp → giữ class js (hiệu ứng chạy bình thường)", () => {
    vi.useFakeTimers();
    runBootScript();
    win[REVEAL_READY_FLAG] = true;
    vi.advanceTimersByTime(REVEAL_FALLBACK_MS);
    expect(document.documentElement).toHaveClass("js");
  });
});
