import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Only the Tailwind entry needs this loader. Rewriting *.module.css as *.css
      // drops its module exports and leaves section classNames undefined.
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Mọi ảnh nằm trong public/images (nguồn ghi ở CREDITS.md). Không bật remotePatterns để /_next/image không thành
    // proxy ảnh ngoài; khi cần ảnh remote thì thêm lại kèm `pathname` cụ thể.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
