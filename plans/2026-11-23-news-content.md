# Bổ sung tin tức theo tab NỘI DUNG BÁO — 23/11/2026

## Phạm vi
Nguồn: Docs 1eWYXwtfCTAU8DDkwP1CQO7J3_Up1NlmPlOAMm3pMvGA, tab t.bawz261fqoh8. Đã xuất Markdown qua browser và DOCX trực tiếp đúng tab (194 paragraphs,21 media files,23 image placements). Có9 bài:02,07,10,4,9,12,3,8,11; không phải12 bài. Giữ6 bài hiện có, không đổi URL cũ. Không push/deploy.

## Kế hoạch / nghiệm thu
- [x] Đối chiếu9 bài, trích xuất ảnh thực trong Docs, tối ưu WebP và giữ chú thích/nguồn.
- [x] Bổ sung structured body typed (đề mục/đoạn/ảnh/link), không dùng raw HTML; giữ API content cũ.
- [x] Đưa9 bài thành bản chính, thêm đúng nhóm nội dung khách; card có excerpt gọn, detail đủ nội dung.
- [x] Sửa lỗi biên tập rõ ràng: đoạn phu thê lặp, dòng nguồn rời vô nghĩa; kỷ niệm2024 là1480 năm544–2024, không1523 theo báo nguồn khách trích. Giữ sự kiện27–29/11/2026 ở dạng dự kiến (hôm nay23/11).
- [x] Test dữ liệu/renderer/clone/nguồn/đường dẫn, build và browser mobile/desktop; giữ baseline lint countdown ngoài scope.
- [x] Cập nhật receipt và journal local (ak CLI không có).

## Thiết kế giữ nguyên
Brand đỏ–kem, CDA Mê Ly Display cho title/Caudex nội dung; card/slider và nút pill hiện có. Bài chi tiết: cột đọc <=680px, ảnh giữ đủ khung, caption nhỏ và link nguồn xuống dòng không tràn mobile. Không tự tạo ảnh hoặc giả ảnh tư liệu khi Docs đã cung cấp.

## Receipt
- 203/203 tests (28 files), production build thành công (15 trang bài).
- Browser production: 27 lượt bài (9 bài × 375/768/1440px), đúng tiêu đề/lời dẫn/số ảnh, mọi ảnh tải được, font CDA, link HTTPS an toàn, không tràn ngang/JS error. Homepage 14 card trong slider + 1 featured; nút cuộn hoạt động; slug sai 404.
- Lint các file của đợt này: sạch. Lint toàn repo: baseline countdown 1 error + 6 warnings; không sửa ngoài phạm vi. git diff --check qua.
- Preview 3026 trả HTTP 200. Không commit/push/deploy.
- Không có ak CLI để publish journal; dùng Markdown trực tiếp, không giả receipt.
