import type { Metadata, Viewport } from "next";
import { Caudex, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const caudex = Caudex({
  variable: "--font-caudex",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
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
    <html lang="vi" className={`${playfair.variable} ${caudex.variable}`}>
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
      </body>
    </html>
  );
}
