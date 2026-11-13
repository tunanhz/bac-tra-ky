// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

async function renderQuickContact(hotline?: string, facebookUrl?: string) {
  vi.stubEnv("NEXT_PUBLIC_HOTLINE", hotline);
  vi.stubEnv("NEXT_PUBLIC_FACEBOOK_URL", facebookUrl);
  vi.resetModules();
  const { QuickContact } = await import("./quick-contact");
  return render(<QuickContact />);
}

describe("QuickContact", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("dùng hotline và fanpage của thương hiệu, mở Facebook trong tab mới", async () => {
    await renderQuickContact();
    const group = within(screen.getByRole("complementary", { name: "Liên hệ nhanh" }));
    expect(group.getByRole("link", { name: "Gọi điện: 0869189004" })).toHaveAttribute("href", "tel:0869189004");
    const facebook = group.getByRole("link", { name: "Facebook Bác Trà Ký" });
    expect(facebook).toHaveAttribute("href", "https://www.facebook.com/bactraky/");
    expect(facebook).toHaveAttribute("target", "_blank");
    expect(facebook).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("bỏ qua kênh chưa cấu hình và ẩn nhóm khi không còn kênh hợp lệ", async () => {
    const { unmount } = await renderQuickContact("", "https://www.facebook.com/bactraky/");
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByRole("link", { name: /Gọi điện/ })).toBeNull();
    unmount();
    await renderQuickContact("", "javascript:alert(1)");
    expect(screen.queryByRole("complementary", { name: "Liên hệ nhanh" })).toBeNull();
  });
});
