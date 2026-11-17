// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/** `siteConfig` đọc biến môi trường lúc nạp module → nạp lại Footer sau khi đặt biến. */
async function renderFooter() {
  vi.resetModules();
  const { Footer } = await import("./footer");
  return render(<Footer />);
}

const ENV_KEYS = [
  "NEXT_PUBLIC_FACEBOOK_URL",
  "NEXT_PUBLIC_TIKTOK_URL",
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_HOTLINE",
] as const;

function clearEnv() {
  for (const key of ENV_KEYS) vi.stubEnv(key, "");
}

describe("Footer (spec mục 7)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("có logo về trang chủ, slogan, 5 liên kết nhanh và địa chỉ hoạt động", async () => {
    clearEnv();
    await renderFooter();
    const footer = screen.getByRole("contentinfo");

    const logo = within(footer).getByRole("link", { name: "Bác Trà Ký — về trang chủ" });
    expect(logo).toHaveAttribute("href", "/#trang-chu");
    expect(logo.querySelector("img")).toHaveAttribute("src", "/images/brand/bac-tra-ky.webp");
    expect(footer).toHaveTextContent("Gìn giữ tinh hoa – Tiếp nối giá trị");

    const explore = within(footer).getByRole("heading", { name: "Thông tin" }).parentElement!;
    const links = within(explore).getAllByRole("link");
    expect(links.map((a) => [a.textContent, a.getAttribute("href")])).toEqual([
      ["Về trang chủ", "/#trang-chu"],
      ["Khám phá câu chuyện làng nghề", "/#cau-chuyen"],
      ["Sản phẩm Bác Trà Ký", "/#san-pham"],
      ["Câu chuyện thương hiệu", "/#ve-chung-toi"],
      ["Tin tức", "/#tin-tuc"],
    ]);

    expect(footer).toHaveTextContent("Địa chỉ: Làng nghề Giang Xá, xã Hoài Đức, Hà Nội");
    expect(footer).toHaveTextContent("© 2026 Bác Trà Ký.");
    expect(footer).not.toHaveTextContent(/Nguồn ảnh|Ảnh minh hoạ|Wikimedia Commons/);
  });

  it("hiện kênh liên hệ chính thức khi chưa đặt biến môi trường", async () => {
    for (const key of ENV_KEYS) vi.stubEnv(key, undefined);
    await renderFooter();
    const footer = within(screen.getByRole("contentinfo"));

    expect(footer.getByRole("link", { name: "Facebook Bác Trà Ký" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/bactraky/",
    );
    expect(footer.getByRole("link", { name: "bactraky@gmail.com" })).toHaveAttribute("href", "mailto:bactraky@gmail.com");
    const gmail = footer.getByRole("link", { name: "Gmail Bác Trà Ký" });
    expect(gmail).toHaveAttribute("href", "mailto:bactraky@gmail.com");
    expect(gmail).not.toHaveAttribute("target");
    expect(footer.getByRole("link", { name: "0869189004" })).toHaveAttribute("href", "tel:0869189004");
    expect(footer.getByRole("link", { name: "TikTok Bác Trà Ký" })).toHaveAttribute(
      "href",
      "https://www.tiktok.com/@bactraky",
    );
  });

  it("biến rỗng: hotline, email, Facebook, TikTok hiện '(đang cập nhật)', không có liên kết hỏng", async () => {
    clearEnv();
    await renderFooter();
    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveTextContent("Hotline: (đang cập nhật)");
    expect(footer).toHaveTextContent("Email: (đang cập nhật)");
    expect(within(footer).getByText("Facebook Bác Trà Ký (đang cập nhật)")).toBeInTheDocument();
    expect(within(footer).getByText("TikTok Bác Trà Ký (đang cập nhật)")).toBeInTheDocument();
    expect(within(footer).queryByRole("link", { name: /Facebook|TikTok|Gmail/ })).toBeNull();
    for (const link of within(footer).getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^\/#/);
    }
  });

  it("có dữ liệu thật: hotline tel:, email mailto:, mạng xã hội mở tab mới an toàn", async () => {
    vi.stubEnv("NEXT_PUBLIC_FACEBOOK_URL", "https://facebook.com/bactraky");
    vi.stubEnv("NEXT_PUBLIC_TIKTOK_URL", "https://www.tiktok.com/@bactraky-preview");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "lienhe@bactraky.vn");
    vi.stubEnv("NEXT_PUBLIC_HOTLINE", "0912 345 678");
    await renderFooter();
    const footer = screen.getByRole("contentinfo");

    expect(within(footer).getByRole("link", { name: "0912 345 678" })).toHaveAttribute("href", "tel:0912345678");
    expect(within(footer).getByRole("link", { name: "lienhe@bactraky.vn" })).toHaveAttribute("href", "mailto:lienhe@bactraky.vn");

    const facebook = within(footer).getByRole("link", { name: "Facebook Bác Trà Ký" });
    expect(facebook).toHaveAttribute("href", "https://facebook.com/bactraky");
    expect(facebook).toHaveAttribute("target", "_blank");
    expect(facebook).toHaveAttribute("rel", "noopener noreferrer");
    expect(within(footer).getByRole("link", { name: "TikTok Bác Trà Ký" })).toHaveAttribute(
      "href",
      "https://www.tiktok.com/@bactraky-preview",
    );
    expect(footer).not.toHaveTextContent("(đang cập nhật)");
  });

  it("biến môi trường sai định dạng bị bỏ qua, không thành liên kết", async () => {
    clearEnv();
    vi.stubEnv("NEXT_PUBLIC_FACEBOOK_URL", "javascript:alert(1)");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "khong-phai-email");
    await renderFooter();
    const footer = screen.getByRole("contentinfo");

    expect(within(footer).queryByRole("link", { name: /Facebook/ })).toBeNull();
    expect(footer).toHaveTextContent("Email: (đang cập nhật)");
  });
});
