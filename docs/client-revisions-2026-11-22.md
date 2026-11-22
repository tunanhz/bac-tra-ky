# Góp ý khách hàng — Canva, chỉ trang 1–10

## Phạm vi đã chốt

Ngày 22/11/2026, khách yêu cầu chỉ thực hiện **10 trang đầu** thiết kế `DAHbLLI-WO4`.
Các trang 11–29 không thuộc đợt sửa này. Không dùng chữ ghi chú/placeholder trong ảnh làm nội dung website.

| Trang | Yêu cầu | Nhóm phụ trách |
| --- | --- | --- |
| 1 | Dùng nền be, viền đỏ, ảnh cuộn bánh do khách cung cấp cho phần khám phá | Chạy dự án local: story |
| 2 | Đổi tiêu đề thành “Khám phá làng nghề Giang Xá” | Chạy dự án local: story |
| 3 | Dùng ảnh hộp sáu bánh tách nền mới; bỏ cụm điều khiển được khoanh đỏ | code 1: products |
| 4 | Bổ sung ảnh làng và liên kết video trên page, chỉ dùng URL nguồn thật | Chạy dự án local: story |
| 5 | Tiêu đề làng một dòng trên desktop; phần dẫn in nghiêng xanh/đỏ đậm; bổ sung ảnh Giang Xá | Chạy dự án local: story |
| 6 | Đồng bộ nền be **#ffebd8**; đồng bộ tông hai ảnh nền/composition | Điều phối: token; code 1 và story: artwork |
| 7 | Sửa hiển thị ảnh ưu đãi; tăng cỡ “GIẢM 10%” | Điều phối: offer |
| 8 | Bỏ dải trắng/be thừa giữa ưu đãi và footer; đồng nhất nút gửi liên hệ | Điều phối: offer/contact |
| 9 | Bố cục ảnh bốn công đoạn theo mẫu 2×2 | Chạy dự án local: story |
| 10 | Tầm nhìn & Sứ mệnh: tiêu đề lớn, hai dải đỏ, ảnh bánh chồng lớp giữa, bộ quà bên phải | code 1: about |

## Ràng buộc

- Không thay nội dung/tương tác theo trang 11 trở đi: lịch sử, tin tức, số ngày countdown, CTA gọi điện… trừ khi đó là code có sẵn từ trước đợt sửa.
- Không reset/stash/checkout hoặc hoàn tác thay đổi người khác trong thư mục dùng chung.
- Đợt này sửa local, chưa tự commit/push.
- Không tạo URL video giả; ghi rõ nếu nguồn video còn thiếu.
- Canva cho phép đọc thiết kế nhưng API media rời trả permission_denied. Không lấy ảnh có chú thích đỏ làm ảnh sản phẩm; ưu tiên asset thật được khách cung cấp trong Drive hoặc asset local đã duyệt.

## Kết quả tích hợp

- Hai chat đã xác nhận không áp dụng yêu cầu trang 11–29.
- Đã sửa cấu hình Tailwind loader từ `*.css` sang `globals.css`: wildcard cũ làm mất export của CSS Modules, khiến hai section mới không có class trong production. Có regression test riêng và đã xác nhận class thật trên DOM.
- Production build thành công; full test suite cuối: **182/182 pass, 26 files**, gồm regression test cấu hình.
- Kiểm tra production tại localhost:3032, viewport 320/390/768/1440: không tràn ngang. Nút gửi cao 48px; khoảng hở ưu đãi–footer bằng 0; ảnh tải thành công ở các lượt kiểm tra.
- Full ESLint vẫn còn lỗi **có sẵn tại HEAD** ở `offer-section.tsx`: setNow(Date.now()) trực tiếp trong effect, cùng các cảnh báo unused có sẵn. Không thay logic countdown ngoài phạm vi thiết kế lần này.

## Chưa đủ nguồn để khớp hoàn toàn

- Trang 4: chưa có URL video thật đọc được, không tạo nút video giả.
- Trang 9: đã có nguồn mới `Bỏ (12).png` (1208×906) do khách gửi ngày 22/11/2026. Đã tạo artwork AI bám mẫu và tích hợp thay bộ ảnh cũ; không còn dùng ảnh tham chiếu 256×190.
- Trang 10: Canva từ chối media rời bộ quà bên phải; dùng composition hero local đã có và CSS crop, không tuyên bố khớp 100% artwork.
- Trang 3: hai PNG trong Drive tên truyền thống/nhân mặn có byte-identical nội dung; giữ nguyên file khách cung cấp, không tự sửa nhãn trên ảnh.
- Trang 6: đã đồng bộ token #ffebd8; các composition ảnh có sẵn không tự tô màu hoặc tạo lại khi thiếu file gốc phù hợp.

## Hiệu chỉnh theo ảnh khách xác nhận

- Section “Giang Xá – Nét đẹp làng quê Bắc Bộ” không dùng lưới ba ảnh.
- Desktop: khối tiêu đề/lời dẫn/nội dung cùng cột trái; ảnh rước kiệu trong khung giấy ở giữa; hai ảnh lối vào hội làng và sân làng xếp dọc bên phải, trên nền cổng làng/hoa sen.
- Mobile/tablet được xuống hàng riêng để dễ đọc; không kéo tiêu đề tràn qua cụm ảnh desktop.
- Giữ nguyên nội dung, không thêm URL video không có nguồn.


## Hiệu chỉnh công đoạn theo Bỏ (12).png

- Phạm vi riêng section “Bí quyết làm nên hương vị Bánh Bác”, không mở rộng Canva trang 11 trở đi.
- Nền be đào, cổng làng/cánh đồng/sen ở góc trên phải; tiêu đề và lời dẫn trong vùng trống bên trái.
- Desktop: bốn khung viền hoa văn 2×2, theo thứ tự nguyên liệu → nhào bột → bác bột gấc trên chảo → bánh thành phẩm. Chữ HTML đặt trên khoảng nền trống bên trái từng khung.
- Tablet giữ hai cột; mobile một cột, chuyển chữ xuống dưới để không bị nhỏ hoặc che ảnh.
- Artwork AI tạo bằng công cụ image_gen tích hợp, không phải ảnh chụp tư liệu làng nghề. Đã bỏ câu ghi nguồn ấn phẩm cũ cho bộ ảnh mới.
- Asset gốc đã tối ưu: `/images/revisions/craft-process-generated.webp` (1448×1086); các phần header, bốn khung, chân mây được tách không tái tạo nội dung để dùng responsive. Xem nguồn và prompt ở `public/images/revisions/craft-generation.md`.

### Nghiệm thu bản công đoạn mới

- Full test suite: **182/182 pass, 26 files**; ESLint ba file TS/TSX liên quan không lỗi/cảnh báo; production build và TypeScript thành công.
- Kiểm tra production localhost:3032 ở 320/390/768/1024/1440: không tràn ngang, cả bốn ảnh tải được, nội dung không bị cắt trong khung.
- Ảnh nghiệm thu: `.artifacts/craft-layout-customer-reference-desktop.jpg`.
- Chưa commit/push. CLI `ak` không có trên host; journal local ghi trực tiếp, không tuyên bố đã validate/publish bằng CLI.
