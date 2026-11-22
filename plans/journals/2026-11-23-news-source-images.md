# Journal — ảnh từ link gợi ý trong 9 bài — 23/11/2026

## Kết quả
- Rà 20 URL nguồn riêng biệt, tải HTML và chọn đúng ảnh thân bài, không chọn logo/quảng cáo/bài liên quan. Đã xem contact sheet trước khi đưa ảnh vào web.
- Tải 9 ảnh khác nhau từ 8 bài nguồn. Thêm 8 vị trí ảnh báo, 1 ảnh bao bì thương hiệu có sẵn và thay 1 ảnh minh họa bằng ảnh chụp VietnamPlus. Tổng 32 vị trí / 30 file ảnh thân bài; mỗi bài tăng 1 vị trí.
- Bài cuối chỉ dẫn fanpage Facebook; HTML công khai không có ảnh bao bì bài đăng phù hợp để lấy. Dùng `Hộp 2 bánh.png` từ bộ Drive khách đã cung cấp và ghi rõ xuất xứ, không giả nguồn Facebook.
- 9 ảnh báo mới nặng tổng 1.440.414 bytes WebP. Không sinh ảnh AI mới, không cắt watermark, không hotlink CDN, không thêm dòng nguồn vào footer.
- Giữ nguyên toàn bộ text, lead, URL và tiêu đề của 9 bài; có test hash bảo vệ. Manifest lưu URL trang, URL ảnh gốc, SHA-256 và bài sử dụng trong `docs/news-image-sources-2026-11-23.json`.

## Kiểm tra / review
- 206 tests / 28 files đạt, production build đạt; lint các file thay đổi và git diff --check đạt.
- Browser: 27 lượt bài tại 375/768/1440px; HTTP 200, title/lead/số ảnh đúng, ảnh decode được, font CDA, không tràn ngang hoặc JS error. Homepage đủ 14 cards + 1 featured; nút cuộn và slug lạ 404 hoạt động.
- Đã xem ảnh figure mobile: chuẩn hóa sản xuất, ảnh hộp bánh, ảnh sum vầy và chú thích tác giả. Dev 3026 HTTP 200, trả ảnh mới. Đã dừng server QA 3034, giữ preview người dùng.
- Giữ nguyên các thay đổi mobile/font/hành trình và AGENTS.md trước lượt này. Không reset/stash, không subagent, không commit/push/deploy.
- Lint countdown baseline ngoài phạm vi, không sửa. ak CLI không có nên journal ghi Markdown trực tiếp, không giả publish receipt.

## Giới hạn
- Ghi nguồn/tác giả không đồng nghĩa xác nhận ảnh báo có giấy phép mở; không tự gán Creative Commons.
- Ảnh bổ sung của bài cuối là asset khách cung cấp trước đó, không phải ảnh vừa tải từ Facebook. Đã báo rõ với người dùng.
