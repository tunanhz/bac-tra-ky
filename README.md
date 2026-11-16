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
  data/                 dữ liệu tĩnh: 7 sản phẩm, 6 bài tin tức
  lib/                  getProducts/getNewsPosts…, contactSchema (zod)
public/images/          ảnh (nguồn ghi ở CREDITS.md)
```

## Ghi chú

- Dữ liệu sản phẩm/tin tức hiện là tĩnh trong `src/data`, truy cập qua hàm async trong `src/lib` để sau này đổi
  sang MongoDB mà không sửa component.
- Banner trang chủ (`src/config/home-hero.ts`) dùng thiết kế do Bác Trà Ký cung cấp, nén sang WebP. Tiêu đề và nút vẫn là HTML.
  Khi thay ảnh, kiểm tra lại vùng cắt mobile và vị trí link cuộn trong `src/components/sections/home/hero.css`.
- **Góc Feedback / Ưu đãi:** khách soạn đánh giá trên trang, rồi tự bấm gửi trong ứng dụng email; website không lưu hay tự
  đăng. Dùng `src/data/customer-content.ts` để đưa phản hồi thật đã được đồng ý và chương trình được thương hiệu duyệt lên
  web. Ghi `status: "published"` khi đã xác nhận. Một ưu đãi cần tiêu đề, mô tả, điều kiện và `startsOn` / `endsOn`
  (`yyyy-mm-dd`, gồm cả ngày kết thúc theo giờ Việt Nam); chỉ chương trình trong thời gian áp dụng được hiển thị.
- `POST /api/contact` hiện chỉ kiểm dữ liệu và trả **501** (chưa có backend lưu liên hệ); giao diện không bao giờ
  báo "gửi thành công" khi chưa lưu thật.
- Chỗ còn thiếu dữ liệu thật được đánh dấu `TODO: thay dữ liệu thật`.
- `NEXT_PUBLIC_SITE_URL` (Open Graph, `metadataBase`): bỏ trống thì build/production dùng `https://bactraky.io.vn`,
  chỉ `next dev` dùng `http://localhost:3000`. Deploy ở tên miền khác (vd. bản preview) thì đặt biến này.
- Trang 404 tiếng Việt: `src/app/not-found.tsx` (đường dẫn lạ) và `src/app/tin-tuc/[slug]/not-found.tsx` (bài viết
  không tồn tại). Trang tin đặt `ensureStatic = "navigation"` nên slug lạ trả **HTTP 404 ngay lần gọi đầu** (không còn
  soft 404 mã 200 do stream từ `<Suspense>`). Phase 05 đổi tin tức sang MongoDB thì dữ liệu phải đọc qua `use cache`
  (thời hạn ≥ 5 phút) mới giữ được mức này; nếu không thì gỡ export và chấp nhận soft 404 ở lần gọi đầu.
- Tiêu đề `h1`–`h4` dùng bản Bold WOFF2 chính thức của [CDA Mê Ly Display](https://collectivedesign.agency/work/mely)
  (SIL OFL 1.1, xem `src/app/fonts/OFL-CDA-Me-Ly-Display.txt`). Slogan và trích dẫn giữ Playfair Display; nội dung giữ Caudex.
- Playfair Display và Caudex tự host trong `src/app/fonts/` (SIL OFL 1.1, xem `OFL-*.txt`): đã subset theo bộ ký
  tự tiếng Việt (~125 KB thay cho ~300 KB từ Google Fonts, giúp LCP mobile) và ghép thêm 20 chữ ơ/ư có dấu mà Caudex
  gốc thiếu. Theo OFL, bản sửa đổi được đổi tên họ bên trong file thành "BTK Heading"/"BTK Body". Cần thêm ký tự thì
  chạy lại `src/app/fonts/subset_fonts.py` (hướng dẫn ở đầu file; cần Python + `fonttools`, `brotli`, không phải
  dependency của dự án).
