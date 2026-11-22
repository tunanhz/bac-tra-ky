import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { QuickContact } from "@/components/layout/quick-contact";
import { siteConfig } from "@/config/site";
import { REVEAL_BOOT_SCRIPT } from "@/lib/reveal-boot";
import "./globals.css";

// Tự host font theo nội dung khách: CDA Mê Ly Display cho tiêu đề, Caudex cho body.
// Giữ giấy phép của các font trong src/app/fonts; không tải font từ dịch vụ ngoài.
const mely = localFont({
  variable: "--font-mely",
  src: "./fonts/cda-me-ly-display-bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  preload: true,
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
  preload: true,
  adjustFontFallback: "Times New Roman",
});

const title = `${siteConfig.name} – ${siteConfig.slogan}`;

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
        url: "/images/common/chia-se-banh-bac.webp",
        width: 1200,
        height: 630,
        alt: "Bánh Bác Giang Xá gói lá xanh và cắt thành lát đỏ, trắng, vàng",
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
    <html lang="vi" className={`${mely.variable} ${caudex.variable}`} suppressHydrationWarning>
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
