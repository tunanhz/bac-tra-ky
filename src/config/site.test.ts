import { describe, expect, it } from "vitest";
import { NAV_ITEMS, readEmail, readHttpUrl, readLinkUrl, readPhone, sectionHref, siteConfig, telHref } from "./site";

describe("siteConfig", () => {
  it("có đủ 6 mục điều hướng theo spec, đúng thứ tự", () => {
    expect(NAV_ITEMS.map((i) => i.label)).toEqual([
      "Trang chủ",
      "Về chúng tôi",
      "Câu chuyện văn hoá",
      "Sản phẩm",
      "Tin tức",
      "Liên hệ",
    ]);
    expect(sectionHref("lien-he")).toBe("/#lien-he");
  });

  it("địa chỉ đúng spec, kênh đặt hàng mặc định về form liên hệ", () => {
    expect(siteConfig.address).toBe("Làng nghề Giang Xá, xã Hoài Đức, Hà Nội");
    expect(siteConfig.orderChannelUrl).toBe("/#lien-he");
  });
});

describe("đọc biến môi trường", () => {
  it("readHttpUrl chỉ nhận http(s)", () => {
    expect(readHttpUrl("https://facebook.com/bactraky")).toBe("https://facebook.com/bactraky");
    expect(readHttpUrl("  ")).toBeNull();
    expect(readHttpUrl(undefined)).toBeNull();
    expect(readHttpUrl("javascript:alert(1)")).toBeNull();
    expect(readHttpUrl("khong-phai-url")).toBeNull();
  });

  it("readLinkUrl nhận đường dẫn nội bộ, chặn //host", () => {
    expect(readLinkUrl("/#lien-he")).toBe("/#lien-he");
    expect(readLinkUrl("//evil.example")).toBeNull();
    expect(readLinkUrl("https://m.me/bactraky")).toBe("https://m.me/bactraky");
  });

  it("readEmail và readPhone kiểm định dạng", () => {
    expect(readEmail("lienhe@bactraky.vn")).toBe("lienhe@bactraky.vn");
    expect(readEmail("sai")).toBeNull();
    expect(readPhone("0912 345 678")).toBe("0912 345 678");
    expect(readPhone("abc")).toBeNull();
    expect(telHref("0912 345 678")).toBe("tel:0912345678");
  });
});
