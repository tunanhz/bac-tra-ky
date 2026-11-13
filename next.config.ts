import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
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
