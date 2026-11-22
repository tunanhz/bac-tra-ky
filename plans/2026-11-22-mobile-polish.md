# Mobile polish + unified titles — 2026-11-22

## Fixed design brief
Register: Brand.
Scene: Vietnamese visitors browsing bánh/trà and contacting the shop on a phone; warm, traditional and legible.
Direction: Preserve Hộp Sơn Son identity, approved product artwork/copy and desktop composition.
Color: Committed; bg oklch(95% 0.034 65), text oklch(27% 0.028 48), accent oklch(47% 0.19 27), existing be/ink/gac tokens.
Type: CDA Mê Ly Display titles + Caudex body; confirmed against the customer attachment on 2026-11-23. This supersedes the interim Playfair choice below.
Signature: Client-provided bánh/trà hero artwork and Giang Xá story.
Dials: variance 4, motion 2, density 3.

## Acceptance
- Uniform title family on homepage, footer and article pages.
- No document horizontal overflow at 320/375/390/768/1024/1440px.
- Mobile hero CTAs have consistent full-width pill sizing.
- Menu locks background scroll; close, Escape, links, resizing and unmount restore original overflow.
- Mobile controls at least 44px; form input text at least 16px, including compact form.
- Floating contact shortcuts do not cover typing; retain all three channels and sizes.
- Preserve source images, approved copy, countdown and submission behavior.
- Run unit tests, lint, build, browser checks and skill render-check; explain unrelated findings.
- Local only, no commit/push/deploy.

## Baseline
HTTP 200 on :3026. Render-check: zero errors, 19 warnings (5 sr-only warnings per viewport are intentionally hidden accessible text). Issues: tiny review pagination, Facebook link, 40px news arrows, compact input 14px, mixed title families, menu does not lock scroll. Empty contact status occupies a grid track.

## Tạm dừng theo yêu cầu người dùng
Người dùng: “sau có token thì tiếp tục”. Không tự hẹn lịch hay tiếp tục sửa phần góp ý mới cho tới khi người dùng tiếp tục.

### Đã sửa local
Mobile hero CTA full-width; menu backdrop + root/body scroll lock/restore; touch targets review/news/Facebook; compact input 16px; contact shortcuts hidden while typing; empty form status hidden; titles unified to existing Playfair Display, body Caudex (removed conflicting CDA override/font loading). No push/deploy.

### Verification state (do not overclaim)
- Full unit suite: 185/185 pass, 26 files.
- Production build including TypeScript: pass.
- Lint: baseline setNow(Date.now()) in effect in offer-section.tsx still fails; unused warnings pre-exist. Newly created .artifacts/mobile-polish/*.cjs also cause require-import lint errors and MUST be removed/moved/converted before finishing. Do not ignore lint or claim clean.
- Browser matrix custom script incomplete: 320 checks passed; 375 checks hit immediate computed-visibility assertions racing React/style commits. Replace instant visibility assumptions with observable-state waits, rerun remaining widths. Do not claim full browser pass yet.
- Skill render-check after started session 52013; read its output/report next turn.
- Before real audit: 0 errors,19 warnings; 15 are intentional sr-only clipping false positives.
- Reviewer/simplifier completed clean, no edits. Review mobile sizing utility scope before final: compact input height/padding, 40→44 news arrows, footer title .72rem→1rem affect desktop too. Do not undo legitimate unified font; visually decide responsive sizes.
- Screenshot evidence: .artifacts/mobile-polish/before and after. Dev server :3026 was running exec session55662; verify alive on resume.
- AGENTS.md had pre-existing modifications; preserve. Work not committed.

## Góp ý tiếp theo — nội dung khách gửi, chưa triển khai
Tiêu đề: HÀNH TRÌNH CỦA BÁC TRÀ KÝ
Lời dẫn: Từ một đặc sản làng quê, đến hành trình lan tỏa hương vị truyền thống Việt.

1. KHỞI NGUỒN
Từ làng Giang Xá, Hoài Đức – nơi lưu giữ nghề làm Bánh Bác truyền thống.

2. KHÁM PHÁ
Bắt đầu biết đến Bánh Bác – đặc sản mang đậm hồn quê Việt.

3. GÌN GIỮ
Bác Trà Ký ra đời với mong muốn gìn giữ và phát huy giá trị Bánh Bác Giang Xá.

4. LAN TỎA
Mang hương vị truyền thống đến gần hơn với mọi người qua những trải nghiệm hiện đại.

5. VƯƠN XA
Tiếp tục lan tỏa giá trị Việt, để Bánh Bác và trà sen vươn xa hơn nữa, đến với nhiều thế hệ.

Người dùng dán nội dung hai lần cùng tên người gửi/giờ tin nhắn. Dùng đúng một bản nội dung, không đưa “23:48” và “Thu Thuy” lên website. Hiểu “fb” ở đây là feedback/góp ý, không phải yêu cầu thêm URL Facebook.

## Tiếp tục ngày 2026-11-23
Người dùng đã yêu cầu tiếp tục. Bổ sung hành trình trong Về chúng tôi, sau câu chuyện khởi đầu: ordered list 5 mốc, mobile dọc/desktop ngang; đúng nguyên văn, không tự thêm năm hoặc nguồn ảnh. Giữ brief đỏ–kem, Playfair/Caudex và asset đã duyệt. Hoàn tất matrix kiểm tra mobile, menu, font, form và bản build cuối; chưa push/deploy.


## Hoàn tất ngày 2026-11-23 — trạng thái cuối, thay thế handoff tạm dừng

- Đã đọc lại attachment gốc `e186cbe0-b199-451a-be9f-6c030469ac06/Văn bản đã dán.txt`: Heading phải là CDA Mê Ly Display, Body là Caudex. Lựa chọn Playfair trong bản tạm đã được sửa trước nghiệm thu. Dùng font local có sẵn và giấy phép OFL; không cần cài font máy khách. Cả `font-heading`, `font-display` và h1–h6 dùng chung CDA; bỏ tải Playfair không dùng. Không tạo biến CSS tự tham chiếu `--font-mely`.
- Hành trình đã tích hợp dưới câu chuyện khởi đầu trong Về chúng tôi, trước Tầm nhìn & Sứ mệnh. Dùng nguyên văn một bản nội dung khách; không thêm năm, thành tích, ảnh, Thu Thuy hay giờ chat. Năm mốc: KHỞI NGUỒN → KHÁM PHÁ → GÌN GIỮ → LAN TỎA → VƯƠN XA. Mobile/tablet dọc, desktop từ 1024px ngang 5 cột.
- Mobile: CTA full width dạng pill, menu có backdrop và khóa cuộn (khôi phục khi Esc/link/desktop resize/unmount); nút news/review/contact đủ vùng chạm; form compact 16px và tối thiểu 48px, ẩn icon liên hệ khi đang nhập; bỏ khoảng trống status rỗng. Không thay asset hero đã duyệt.
- Review inline: kiểm tra diff, semantic heading/list, nội dung nguyên văn, khôi phục overflow, focus và responsive sizes. Footer/news/form giữ cỡ desktop qua breakpoint; không đổi logic countdown.
- `git fetch --prune origin` thành công; HEAD so origin/main 0/0. Không commit/push/deploy; giữ nguyên AGENTS.md đã có chỉnh sửa trước tác vụ.

### Nghiệm thu cuối

- `npm test`: 186/186 pass, 26 files, sau khi chốt CDA.
- `npm run build`: pass, gồm TypeScript và prerender. Kiểm tra bản production tại :3034; preview dev :3026 vẫn HTTP 200.
- Browser production matrix: 320,375,390,768,1024,1440px đều pass: không tràn ngang, cùng family CDA trên h1–h6, vùng chạm mobile/tablet >=44px, input >=16px, hành trình đủ 5 mốc/reflow đúng, menu khóa/khôi phục cuộn, Esc/chọn mục/resize đúng, form lỗi không gửi POST thật, review pagination, trang bài viết không tràn ngang. Evidence `.artifacts/mobile-polish/final/browser-results.json` và `verify.mjs`.
- Render-check production 375×812,768×1024,1440×900: 0 errors,15 warnings; tất cả là nội dung `sr-only` cố ý ẩn trực quan (5 mỗi viewport), giữ để hỗ trợ screen reader. Không có lỗi ảnh/font/overflow được checker phát hiện. Xem ảnh screenshot và report trong `.artifacts/mobile-polish/final/render-check`.
- Đã xem trực tiếp hero, hành trình mobile/tablet/desktop, menu, news và form-error. Các ảnh cuối trong `.artifacts/mobile-polish/final` dùng font CDA; bản after trước đó dùng Playfair là bản trung gian, không phải kết quả cuối.
- Lint cuối: còn 1 lỗi có sẵn ở `offer-section.tsx:84` (setNow trong effect, xác minh có tại HEAD),7 unused warnings cũ. Không tuyên bố lint sạch và không sửa logic đếm ngược ngoài phạm vi. `git diff --check` không có lỗi whitespace (chỉ cảnh báo normalization CRLF/LF).
- Hai lỗi ở script QA đã sửa, không nới lỏng yêu cầu UI: locator nút ẩn sau resize cần includeHidden; CSS Module selector đổi sang aria-labelledby ổn định giữa dev/production. Đã chạy lại toàn bộ matrix production thành công.

### Design critique cuối: 21/24 (tự đánh giá có bằng chứng, không thay thế user approval)

| Item | Điểm | Bằng chứng / giới hạn |
| --- | --- | --- |
| Brief fidelity | 2 | Hero và journey: ấm áp, truyền thống, gần gũi; đỏ–kem và artwork khách được giữ. |
| Hierarchy | 2 | Hero CTA chính đỏ, CTA phụ viền; journey có title, lời dẫn và 5 mốc rõ. |
| Spacing | 2 | Journey375 dùng khoảng nhóm đều; CTA cách nhau8px; mỗi nội dung không chạm số. |
| Alignment | 2 | Cột số44px, chữ thẳng hàng trên mobile; desktop5 cột thẳng. |
| Typography | 2 | CDA tiêu đề và Caudex body đúng file yêu cầu; checker/browser xác nhận family nhất quán và không cắt chữ. |
| Color | 2 | Nền kem/chữ đỏ truyền thống; body nâu, không thêm bảng màu mới. |
| Depth/shape | 1 | Giữ một số card có cả border/shadow có sẵn, chưa tái thiết kế toàn bộ hệ depth. |
| States | 2 | Menu mở/backdrop, focus field lỗi, validate không gửi request thật; unit tests giữ cleanup. |
| Responsiveness | 2 | Sáu widths pass; CTA xếp dọc, journey dọc→ngang, vùng chạm mobile đủ44px. |
| Slop tells | 1 | Trang dài vẫn có cấu trúc card/nhiều phần giới thiệu có sẵn, không mở rộng đợt sửa để bỏ. |
| Content | 2 | Journey nguyên văn, regression test độc lập kiểm tra đủ từng câu, không tạo dữ kiện mới. |
| Craft | 1 | Font CDA condensed tại tiêu đề rất nhỏ như footer còn cần đánh giá bằng mắt khách; không tăng toàn bộ cỡ desktop ngoài scope. |

Ba điểm yếu baseline đã xử lý: font trộn → shared token CDA; vùng chạm nhỏ →44px; mobile CTA/mở menu → pill fullwidth/scroll lock. Các mục 1 điểm là phần style kế thừa còn hạn chế, không che giấu bằng điểm tuyệt đối.

### Journal
CLI `ak` không có trên host. Đã lưu journal Markdown trực tiếp, không tuyên bố validate hoặc publish bằng AgentWiki.
