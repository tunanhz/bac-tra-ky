# Bác Trà Ký — landing page

Landing page thương hiệu Bánh Bác Giang Xá & Trà Sen. Next.js 16 (App Router, Cache Components), TypeScript,
Tailwind CSS v4, hướng thiết kế B "Hộp Sơn Son".

## Chạy

```sh
npm install
cp .env.example .env.local   # tuỳ chọn: điền link Facebook/TikTok, email, hotline
npm run dev                  # http://localhost:3000
```

| Lệnh | Việc |
|---|---|
| `npm run typecheck` | sinh kiểu route (`next typegen`) rồi `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest (tối đa 2 worker) |
| `npm run build` | build production |

## Cấu trúc

```
src/
  app/                  layout, trang chủ, /tin-tuc/[slug], API /api/contact, globals.css (design system)
  components/
    layout/             Header, Footer, Logo, icon mạng xã hội
    ui/                 Button, SectionHeading, Reveal, ImagePlaceholder, ImageWithFallback, Modal
    ornaments/          Seal (triện), Corner (góc khung), Divider (nụ sen)
    sections/           các section của trang chủ (home, about, story, products, news, contact)
  config/site.ts        tên, slogan, menu, kênh liên hệ (đọc NEXT_PUBLIC_*)
  data/                 dữ liệu tĩnh: 9 sản phẩm, 6 tin nháp
  lib/                  getProducts/getNewsPosts…, contactSchema (zod)
public/images/          ảnh (nguồn ghi ở CREDITS.md)
```

## Ghi chú

- Dữ liệu sản phẩm/tin tức hiện là tĩnh trong `src/data`, truy cập qua hàm async trong `src/lib` để sau này đổi
  sang MongoDB mà không sửa component.
- `POST /api/contact` hiện chỉ kiểm dữ liệu và trả **501** (chưa có backend lưu liên hệ); giao diện không bao giờ
  báo "gửi thành công" khi chưa lưu thật.
- Chỗ còn thiếu dữ liệu thật được đánh dấu `TODO: thay dữ liệu thật`.
