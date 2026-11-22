# Bổ sung ảnh từ link gợi ý — 23/11/2026

## Phạm vi
- Giữ nguyên 9 bài và toàn bộ nội dung đã nhập; mở các link nguồn/gợi ý trong đúng tab NỘI DUNG BÁO.
- Thêm tối thiểu một ảnh phù hợp cho mỗi bài, không chèn ảnh giống nhau hai lần trong một bài; ưu tiên ảnh thực từ đúng bài nguồn.
- Thay ảnh minh họa sum vầy bằng ảnh chụp thật từ VietnamPlus, giữ tên tác giả và link nguồn.
- Bài cuối chỉ trỏ fanpage Facebook; nếu không truy xuất được ảnh công khai, dùng ảnh bao bì từ bộ ảnh khách đã cung cấp, ghi rõ xuất xứ, không tuyên bố đã tải từ Facebook.
- Không push/deploy. Không sửa hành vi countdown hoặc thay đổi font/mobile ngoài phạm vi.

## Nghiệm thu
- [x] Mở và ghi nhận trạng thái các link gợi ý, ảnh đã chọn có URL gốc/caption và vị trí bài.
- [x] Tải, xem trực tiếp, tối ưu WebP; không chọn logo/quảng cáo/ảnh bài liên quan.
- [x] Đủ 9 bài có thêm ảnh; giữ nguyên text/URL; caption chính xác, không quy ảnh báo thành ảnh thương hiệu.
- [x] Tests dữ liệu/renderer, build, browser 9 bài mobile/desktop và ảnh load được.
- [x] Cập nhật credits, biên tập receipt và journal; báo rõ hạn chế Facebook.

## Receipt / review
- Đọc 20 URL nguồn riêng biệt. HTTP trực tiếp lấy được bài Hà Nội Mới/Hoàng thành/Văn hóa & Phát triển mà web fetch ban đầu timeout. Facebook chỉ có metadata/ảnh đại diện, không có ảnh bao bì bài đăng phù hợp để tải.
- Chọn 9 ảnh mới từ 8 bài nguồn, 1.440.414 bytes WebP; giữ caption/tác giả và đường dẫn bài. Thêm9 vị trí (8 ảnh báo + 1 ảnh bao bì từ Drive đã có), thay1 ảnh minh họa bằng ảnh sum vầy thật. Tổng32 vị trí/30file; mỗi bài tăng1 ảnh thân bài.
- Đã xem contact sheet và ảnh chụp figure trên mobile, gồm ảnh chuẩn hóa sản xuất, ảnh sum vầy với tác giả, ảnh hộp hai bánh. Không giữ ảnh chọn trùng với ảnh Docs; đổi sang ảnh khác trong cùng bài nguồn.
- 206/206tests, 28files; production build qua. Changed-file ESLint và git diff --check qua. Các lỗi lint toàn repo đã biết ở countdown không nằm trong đợt này, không sửa ngoài phạm vi.
- Browser production27 lượt bài (9×375/768/1440px): đúng số ảnh/title/lead, ảnh decode được, headingCDA, linkHTTPS an toàn, không tràn ngang/JSerror; homepage slider14cards +1featured, nútcuộn hoạtđộng, sluglạ404.
- Dev3026 HTTP200 và đã trả ảnh mới. Không commit/push/deploy. Journal ghi Markdown do akCLI không có.
- Hồ sơ xuất xứ: docs/news-image-sources-2026-11-23.json. Browser receipt và ảnh chụp: .artifacts/news-source-images/.
