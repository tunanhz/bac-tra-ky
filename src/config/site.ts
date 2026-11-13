/**
 * Cấu hình thương hiệu dùng chung (header, footer, liên hệ, metadata).
 *
 * Giá trị chưa có dữ liệu chính thức để `null` và đánh dấu `TODO: thay dữ liệu thật`.
 * Mỗi giá trị đọc được từ biến môi trường `NEXT_PUBLIC_*` (xem `.env.example`); biến rỗng hoặc sai định dạng
 * bị bỏ qua để không hiện liên kết hỏng.
 */

export type NavItem = {
  /** id của section trên trang chủ, không có dấu # */
  id: string;
  label: string;
};

export const NAV_ITEMS = [
  { id: "trang-chu", label: "Trang chủ" },
  { id: "ve-chung-toi", label: "Về chúng tôi" },
  { id: "cau-chuyen", label: "Câu chuyện văn hoá" },
  { id: "san-pham", label: "Sản phẩm" },
  { id: "tin-tuc", label: "Tin tức" },
  { id: "lien-he", label: "Liên hệ" },
] as const satisfies readonly NavItem[];

export type SectionId = (typeof NAV_ITEMS)[number]["id"];

/** Đường dẫn tới một section của trang chủ; dùng được từ mọi trang (vd. `/tin-tuc/...`). */
export function sectionHref(id: SectionId): string {
  return `/#${id}`;
}

/** Chỉ nhận URL tuyệt đối http(s); còn lại trả `null`. */
export function readHttpUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** URL tuyệt đối http(s) hoặc đường dẫn nội bộ bắt đầu bằng `/` (vd. `/#lien-he`). */
export function readLinkUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  return readHttpUrl(trimmed);
}

export function readEmail(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : null;
}

/** Số điện thoại hiển thị; chỉ nhận chữ số, khoảng trắng, dấu chấm, gạch, ngoặc và `+` đầu. */
export function readPhone(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return /^\+?[\d\s.\-()]{8,20}$/.test(trimmed) ? trimmed : null;
}

/** `tel:` href từ số hiển thị (bỏ ký tự trình bày). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Tên miền chính thức của site. */
export const PRODUCTION_SITE_URL = "https://bactraky.io.vn";

/**
 * URL gốc cho metadata/Open Graph: `NEXT_PUBLIC_SITE_URL` hợp lệ → dùng; không có thì `next dev` dùng
 * `http://localhost:3000`, mọi môi trường khác (build/production/Vercel) dùng tên miền chính thức — để ảnh chia sẻ
 * Facebook/Zalo không bao giờ trỏ về localhost khi quên đặt biến.
 */
export function resolveSiteUrl(envUrl: string | undefined, nodeEnv: string | undefined): string {
  const fromEnv = readHttpUrl(envUrl);
  if (fromEnv) return fromEnv;
  return nodeEnv === "development" ? "http://localhost:3000" : PRODUCTION_SITE_URL;
}

export const siteConfig = {
  name: "Bác Trà Ký",
  /** Slogan theo spec: "GÌN GIỮ TINH HOA – TIẾP NỐI GIÁ TRỊ" */
  slogan: "Gìn giữ tinh hoa – Tiếp nối giá trị",
  description:
    "Từ hương vị Bánh Bác Giang Xá đến nét thanh tao của Trà Sen Việt, mỗi món quà là một câu chuyện văn hoá được tiếp nối.",
  /** URL gốc của site cho metadata/Open Graph (xem `resolveSiteUrl`). */
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.NODE_ENV),
  locale: "vi_VN",
  nav: NAV_ITEMS,
  /** TODO: thay dữ liệu thật — link trang Facebook chính thức. `null` = chưa có. */
  facebookUrl: readHttpUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  /** TODO: thay dữ liệu thật — link TikTok chính thức. `null` = chưa có. */
  tiktokUrl: readHttpUrl(process.env.NEXT_PUBLIC_TIKTOK_URL),
  /** TODO: thay dữ liệu thật — email liên hệ. `null` = chưa có. */
  email: readEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  /** TODO: thay dữ liệu thật — hotline. `null` = chưa có. */
  hotline: readPhone(process.env.NEXT_PUBLIC_HOTLINE),
  /** Địa chỉ hoạt động theo spec mục 6. */
  address: "Làng nghề Giang Xá, xã Hoài Đức, Hà Nội",
  /** Kênh đặt hàng cho nút "Liên hệ đặt hàng". Mặc định về form liên hệ trên trang chủ. */
  orderChannelUrl: readLinkUrl(process.env.NEXT_PUBLIC_ORDER_CHANNEL_URL) ?? sectionHref("lien-he"),
  /** Năm bản quyền hiển thị ở footer (cố định để trang prerender được). */
  copyrightYear: 2026,
  /** Chữ hiển thị thay cho dữ liệu chưa có. */
  pendingLabel: "(đang cập nhật)",
} as const;

export type SiteConfig = typeof siteConfig;
