import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { QuickContact } from "@/components/layout/quick-contact";
import { siteConfig } from "@/config/site";
import { REVEAL_BOOT_SCRIPT } from "@/lib/reveal-boot";
import "./globals.css";

/*
 * Font tự host, đã subset đúng bộ ký tự tiếng Việt (src/app/fonts/subset_fonts.py; giấy phép SIL OFL — OFL-*.txt).
 * Google Fonts tách mỗi kiểu chữ thành 3 file latin/latin-ext/vietnamese và trang tiếng Việt tải cả 3 (~300 KB cho 5
 * kiểu đang dùng), giành băng thông với ảnh hero (LCP) trên mạng di động; bản subset ~125 KB, 1 file/kiểu.
 * Không preload: trình duyệt chỉ tải đúng kiểu chữ trang dùng khi đọc CSS; `display: swap` + font dự phòng đã chỉnh số
 * đo (adjustFontFallback) nên chữ hiện ngay, không xô bố cục.
 */
const playfair = localFont({
  variable: "--font-playfair",
  src: [
    // Font biến thiên, trục wght đã cắt còn 400–700.
    { path: "./fonts/playfair-display.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/playfair-display-italic.woff2", weight: "400 700", style: "italic" },
  ],
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const caudex = localFont({
  variable: "--font-caudex",
  src: [
    { path: "./fonts/caudex-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/caudex-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/caudex-bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/caudex-bold-italic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const title = `${siteConfig.name} – Gìn giữ tinh hoa, tiếp nối giá trị`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["Bánh Bác", "Bánh Bác Giang Xá", "Trà Sen", "quà tặng", "đặc sản Hoài Đức", "Bác Trà Ký"],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/images/common/hero-am-tra-ngay-tet.webp",
        width: 1920,
        height: 1280,
        alt: "Bộ ấm chén gốm trên khay gỗ, bên bình hoa đỏ và đèn dầu — không khí ngày Tết",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: "#4a0b0e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: script inline gắn class `js` lên <html> trước khi React hydrate.
    <html lang="vi" className={`${playfair.variable} ${caudex.variable}`} suppressHydrationWarning>
      <head>
        {/* Nội dung cố định do ta viết (không có dữ liệu người dùng) — xem src/lib/reveal-boot.ts. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT_SCRIPT }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-gac focus:px-4 focus:py-3 focus:text-be"
        >
          Bỏ qua tới nội dung
        </a>
        <Header />
        <main id="noi-dung" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <QuickContact />
      </body>
    </html>
  );
}
