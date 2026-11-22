# Tin tức theo tài liệu khách — 23/11/2026

## Nguồn và phạm vi
- Tài liệu khách: https://docs.google.com/document/d/1eWYXwtfCTAU8DDkwP1CQO7J3_Up1NlmPlOAMm3pMvGA/edit?tab=t.bawz261fqoh8 — tab **NỘI DUNG BÁO**.
- Đọc đúng tab qua xuất Markdown và DOCX. Tài liệu có 9 bài, không phải 12 bài: số đầu bài là mã bài trong tài liệu.
- Thêm 9 bài chính thức, giữ nguyên 6 bài và URL cũ. Tổng 15 bài. Bài nổi bật cũ vẫn đứng đầu; 9 bài mới được xếp tiếp theo.
- `publishedAt: 2026-11-23` là ngày nhập lên website. Ngày tháng của báo gốc vẫn giữ trong phần ghi nguồn; không gán ngày nhập thành ngày báo gốc phát hành.

## Các đường dẫn mới
- `/tin-tuc/dau-an-vua-ly-nam-de-trong-lich-su-va-van-hoa-lang-giang-xa`
- `/tin-tuc/dac-san-ha-noi-co-gi-ngoai-nhung-mon-an-quen-thuoc`
- `/tin-tuc/danh-thuc-thi-truong-qua-tang-lang-nghe`
- `/tin-tuc/nhung-mon-banh-truyen-thong-trong-van-hoa-nguoi-viet`
- `/tin-tuc/chuan-hoa-san-xuat-huong-di-moi-cho-dac-san-dia-phuong`
- `/tin-tuc/ha-noi-dua-di-san-am-thuc-vao-doi-song-sang-tao`
- `/tin-tuc/giu-hon-lang-nghe-giua-nhip-song-hien-dai`
- `/tin-tuc/mot-thuc-qua-nhieu-the-he`
- `/tin-tuc/lam-moi-dien-mao-dac-san-viet`

## Nội dung và ảnh
- Giữ lời dẫn đầy đủ, đoạn nội dung, đề mục, chữ đậm/nghiêng, ảnh trong đúng bài, chú thích và link nguồn/video. Card chỉ dùng trích đoạn ngắn; detail hiển thị đầy đủ.
- `NewsBlock` typed thay cho raw HTML. Link nguồn chỉ hiển thị hyperlink cho HTTPS; nội dung text được React escape.
- Tài liệu có 23 vị trí ảnh, gồm 21 ảnh độc nhất. Ảnh lặp dùng lại file, không nhân bản. Tối ưu WebP tối đa 1600px/cạnh, tổng khoảng 2,95 MB.
- Giữ chú thích của tài liệu. Có cả ảnh tư liệu, đồ họa thương hiệu và ảnh minh họa; không mô tả tất cả là ảnh chụp thực tế. Không sinh ảnh AI mới cho đợt này.
- Khi nhập lần đầu, ảnh 19 là minh họa và được giữ nhãn đúng tính chất. Ở lượt bổ sung ảnh từ link gợi ý, ảnh này đã được thay bằng ảnh chụp từ VietnamPlus (chi tiết bên dưới). Các file do khách cung cấp không mặc nhiên được coi là có giấy phép Creative Commons.
- CDA Mê Ly Display cho heading, Caudex cho nội dung; ảnh thân bài giữ đủ khung, nguồn dài tự xuống dòng trên mobile.

## Hiệu đính tối thiểu, không viết lại nội dung khách
- Mốc kỷ niệm năm 2024: sửa `1.523` thành `1.480 năm (544–2024)`, đối chiếu bài khách trích: https://vanhoavaphattrien.vn/ly-nam-de-trong-tam-thuc-nguoi-giang-xa-a23371.html.
- Bỏ một đoạn bánh phu thê bị lặp nguyên văn; bỏ các dòng rác sao chép `Báo Nhân Dân điện tử+1`, `Báo điện tử Dân trí`, `hương tết bàn thờ xứ Quảng`. Giữ các dòng nguồn đầy đủ, có ý nghĩa.
- Bài sự kiện giữ **dự kiến 27–29/11/2026**, không đổi thành sự kiện đã diễn ra. Nguồn đối chiếu: https://daibieunhandan.vn/ha-noi-dua-di-san-am-thuc-vao-doi-song-sang-tao-10443607.html.
- Bỏ tracking `utm_source=chatgpt.com` khỏi link, không thay link đích.
- Một số trang nguồn không tải được khi kiểm tra (Hà Nội Mới/Hoàng thành); link và nội dung khách vẫn được giữ. Không khẳng định đã kiểm chứng độc lập mọi chi tiết trong cả 9 bài.

## Kiểm tra và giới hạn
- Unit/component/metadata: 203/203 tests, 28 files; production build thành công.
- Bộ kiểm tra trình duyệt: `.artifacts/news-docs-2026-11-23/verify-news.mjs`; kết quả và ảnh chụp nằm cùng thư mục.
- Lint toàn repo còn lỗi baseline `setNow(Date.now())` trong effect của countdown và 6 warnings. Không thay đổi hành vi khuyến mãi ngoài phạm vi yêu cầu.
- Chưa commit, push hoặc deploy trong lượt bổ sung nội dung này.


## Bổ sung ảnh trực tiếp từ link gợi ý — lượt tiếp theo ngày 23/11/2026
- Đã mở 20 URL nguồn riêng biệt trong Docs qua HTTP và kiểm tra ảnh trong bài, không chỉ trích ảnh nhúng trong Docs. Bao gồm các trang ban đầu web fetch bị timeout (Hoàng thành, Văn hóa & Phát triển, Hà Nội Mới) nhưng lấy được HTML trực tiếp ở lượt này.
- Tải thêm **9 ảnh khác nhau từ 8 bài nguồn**; thêm **9 vị trí ảnh mới** trên 9 bài (8 ảnh báo và 1 ảnh bao bì thương hiệu có sẵn), đồng thời **thay 1 ảnh minh họa** bằng ảnh chụp thật VietnamPlus. Không chèn trùng ảnh trong cùng bài.
- Hiện có **32 vị trí ảnh thân bài**, tương ứng **30 file khác nhau**. Số ảnh từng bài theo thứ tự Docs: **4, 5, 3, 5, 2, 2, 4, 4, 3** (không cộng lại ảnh bìa).
- 9 ảnh báo bổ sung nặng tổng **1.440.414 bytes**; ảnh đã được xem trực tiếp, tối ưu WebP, giữ khung và watermark. URL ảnh gốc, trang bài, caption, SHA-256 và ánh xạ bài được lưu trong `docs/news-image-sources-2026-11-23.json`.
- Bài “Một thức quà, nhiều thế hệ” dùng ảnh sum vầy gói bánh tét của Nguyễn Hằng/TTXVN, đăng VietnamPlus, thay ảnh minh họa gia đình cũ ở cả thân bài lẫn ảnh bìa. Thêm ảnh bánh tét đã gói ở phần nói về kỹ thuật làm bánh.
- Link Facebook của bài cuối chỉ trả metadata/ảnh đại diện, không có ảnh bao bì bài đăng phù hợp để trích xuất trong phản hồi công khai. Dùng ảnh `Hộp 2 bánh.png` trong bộ ảnh Drive khách cung cấp; chú thích nói rõ ảnh bao bì do thương hiệu cung cấp, không giả nguồn tải từ Facebook.
- Giữ nguyên toàn bộ lead/content, tên bài, URL và định dạng chữ của 9 bài. Có test hash kiểm tra nội dung trước/sau bổ sung ảnh, test nguồn/chú thích và kích thước ảnh khai báo khớp file.
- Không thêm dòng nguồn ở footer. Nguồn ảnh nằm dưới ảnh và trong hồ sơ credits, không tự nhận có giấy phép mở. Chưa push/deploy ở lượt này.

- Kiểm tra sau lượt bổ sung ảnh: **206/206 tests / 28 files**, build production qua; browser27 lượt bài trên375/768/1440px qua. Ảnh mới và caption tải đúng, không tràn ngang hay JSerror. Dev3026 đã cập nhật ảnh mới.
