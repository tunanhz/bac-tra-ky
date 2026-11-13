import type { NewsCategory, NewsPost } from "@/lib/types";

/**
 * Tin tức mẫu phục vụ thiết kế (spec mục III.5) — TẤT CẢ là bản nháp (`isDraft: true`).
 *
 * Nội dung chỉ giới thiệu chủ đề dựa trên spec; không giả lập sự kiện thực tế hay chương trình khuyến mãi chưa được
 * xác nhận. Ngày `publishedAt` là ngày soạn bản nháp. Ảnh bìa trỏ tới `/images/news/<slug>.webp` (phase 03 đặt file).
 *
 * TODO: thay dữ liệu thật — bài viết chính thức của Bác Trà Ký.
 */

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  "hoat-dong": "Tin tức & hoạt động",
  "am-thuc": "Ẩm thực truyền thống",
  "van-hoa-tra": "Văn hoá thưởng trà",
  "lang-nghe": "Câu chuyện làng nghề",
  "san-pham-uu-dai": "Sản phẩm mới & ưu đãi",
};

/** Thứ tự hiển thị bộ lọc. */
export const NEWS_CATEGORIES: readonly NewsCategory[] = [
  "hoat-dong",
  "am-thuc",
  "van-hoa-tra",
  "lang-nghe",
  "san-pham-uu-dai",
];

function coverImage(slug: string): string {
  return `/images/news/${slug}.webp`;
}

export const newsPosts: readonly NewsPost[] = [
  {
    slug: "bac-tra-ky-cuon-ky-su-banh-bac-ben-chen-tra",
    title: "Bác Trà Ký — cuốn ký sự về Bánh Bác bên chén trà",
    excerpt:
      "Tên gọi “Bác Trà Ký” gợi lên hình ảnh một cuốn ký sự về Bánh Bác bên chén trà, nơi những câu chuyện xưa được kể lại qua hương vị thân quen.",
    content: [
      "Bác Trà Ký là thương hiệu ẩm thực mang trong mình tình yêu dành cho những giá trị truyền thống Việt Nam, khởi nguồn từ Bánh Bác – thức quà đặc trưng của làng Giang Xá, Hoài Đức, Hà Nội.",
      "Tên gọi “Bác Trà Ký” gợi lên hình ảnh một cuốn ký sự về Bánh Bác bên chén trà. Sự kết hợp giữa Bánh Bác Giang Xá và Trà Sen tạo nên một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
      "Chuyên mục này sẽ là nơi Bác Trà Ký chia sẻ hoạt động của thương hiệu. Bài viết hiện là bản nháp phục vụ thiết kế.",
    ],
    category: "hoat-dong",
    coverImage: coverImage("bac-tra-ky-cuon-ky-su-banh-bac-ben-chen-tra"),
    coverImageAlt: "Bộ ấm chén bên khay gỗ — ảnh minh hoạ",
    publishedAt: "2026-11-13",
    featured: true,
    isDraft: true,
  },
  {
    slug: "banh-bac-giang-xa-sac-do-gac-huong-vung-rang",
    title: "Bánh Bác Giang Xá: sắc đỏ gấc và hương vừng rang",
    excerpt:
      "Lớp vỏ nếp dẻo thơm, sắc đỏ đặc trưng từ gấc, hương vừng rang và nhân đậu xanh bùi ngọt — nét mộc mạc, tinh tế của ẩm thực quê hương.",
    content: [
      "Bánh Bác Giang Xá là đặc sản truyền thống của Giang Xá, Hoài Đức, Hà Nội.",
      "Với sắc đỏ đặc trưng từ gấc, lớp vỏ nếp dẻo thơm, hương vừng rang và phần nhân đậu xanh bùi ngọt, chiếc bánh mang trong mình nét mộc mạc, tinh tế của ẩm thực quê hương.",
      "Bài viết hiện là bản nháp phục vụ thiết kế.",
    ],
    category: "am-thuc",
    coverImage: coverImage("banh-bac-giang-xa-sac-do-gac-huong-vung-rang"),
    coverImageAlt: "Đôi bàn tay nặn bột làm bánh — ảnh minh hoạ",
    publishedAt: "2026-11-13",
    featured: false,
    isDraft: true,
  },
  {
    slug: "tra-sen-net-thanh-tao-cua-van-hoa-tra-viet",
    title: "Trà Sen — nét thanh tao của văn hoá trà Việt",
    excerpt: "Trà có vai trò riêng trong đời sống văn hoá Việt Nam, và Trà Sen mang một vẻ thanh tao đặc biệt.",
    content: [
      "Trong đời sống văn hoá Việt Nam, chén trà là nơi bắt đầu những cuộc trò chuyện, những lần gặp gỡ và sum họp.",
      "Bác Trà Ký chọn Trà Sen để đồng hành cùng Bánh Bác, bởi đây là hai thức quà mang đậm dấu ấn văn hoá Việt.",
      "Bài viết hiện là bản nháp phục vụ thiết kế.",
    ],
    category: "van-hoa-tra",
    coverImage: coverImage("tra-sen-net-thanh-tao-cua-van-hoa-tra-viet"),
    coverImageAlt: "Ấm chén men lam bên hoa sen — ảnh minh hoạ",
    publishedAt: "2026-11-13",
    featured: false,
    isDraft: true,
  },
  {
    slug: "giang-xa-vung-dat-cua-ky-uc-va-huong-nep",
    title: "Giang Xá — vùng đất của ký ức và hương nếp",
    excerpt:
      "Làng Giang Xá ở Hoài Đức, Hà Nội — nơi khởi nguồn của Bánh Bác và những nét đẹp văn hoá được gìn giữ qua nhiều thế hệ.",
    content: [
      "Giang Xá thuộc Hoài Đức, Hà Nội, là nơi khởi nguồn của Bánh Bác — thức quà đặc trưng của làng.",
      "Vùng đất này gắn với vua Lý Nam Đế, người từng được nhận nuôi ở chùa Bảo Phúc – chùa Giang Xá hiện nay.",
      "Mỗi chiếc bánh chứa đựng câu chuyện về một vùng đất, về đôi bàn tay khéo léo của người làm bánh và những nét đẹp văn hoá được gìn giữ qua nhiều thế hệ. Bài viết hiện là bản nháp phục vụ thiết kế.",
    ],
    category: "lang-nghe",
    coverImage: coverImage("giang-xa-vung-dat-cua-ky-uc-va-huong-nep"),
    coverImageAlt: "Ngôi nhà cổ mái ngói giữa vườn cây, làng quê Bắc Bộ — ảnh minh hoạ",
    publishedAt: "2026-11-13",
    featured: false,
    isDraft: true,
  },
  {
    slug: "nhung-huong-vi-sang-tao-cua-banh-bac",
    title: "Những hương vị sáng tạo của Bánh Bác",
    excerpt:
      "Bên cạnh Bánh Bác nhân đậu xanh truyền thống, Bác Trà Ký phát triển nhóm hương vị sáng tạo: nhân mặn, khoai môn, matcha và đậu đỏ.",
    content: [
      "Bác Trà Ký tin rằng gìn giữ truyền thống không đồng nghĩa với việc ngừng đổi mới.",
      "Nhóm Bánh Bác hương vị sáng tạo gồm nhân mặn, nhân khoai môn, nhân matcha và nhân đậu đỏ. Mỗi sự đổi mới đều được định hướng trên nền tảng tôn trọng bản sắc của Bánh Bác Giang Xá.",
      // TODO: thay dữ liệu thật — chuyên mục ưu đãi chỉ đăng chương trình đã được thương hiệu xác nhận.
      "Thông tin về chương trình ưu đãi sẽ chỉ được đăng khi đã được xác nhận. Bài viết hiện là bản nháp phục vụ thiết kế.",
    ],
    category: "san-pham-uu-dai",
    coverImage: coverImage("nhung-huong-vi-sang-tao-cua-banh-bac"),
    coverImageAlt: "Viên bánh phủ bột trà xanh trên đĩa gốm — ảnh minh hoạ",
    publishedAt: "2026-11-13",
    featured: false,
    isDraft: true,
  },
  {
    slug: "thuong-tra-cung-banh-truyen-thong",
    title: "Thưởng trà cùng bánh truyền thống",
    excerpt: "Sự kết hợp giữa thưởng trà và ăn bánh truyền thống — một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
    content: [
      "Sự kết hợp giữa Bánh Bác Giang Xá và Trà Sen tạo nên một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
      "Bác Trà Ký mong muốn mỗi lần thưởng trà cùng Bánh Bác là một dịp để những câu chuyện xưa được kể lại qua hương vị thân quen.",
      "Bài viết hiện là bản nháp phục vụ thiết kế.",
    ],
    category: "van-hoa-tra",
    coverImage: coverImage("thuong-tra-cung-banh-truyen-thong"),
    coverImageAlt: "Rót trà bên những chiếc bánh trên khay gỗ — ảnh minh hoạ",
    publishedAt: "2026-11-13",
    featured: false,
    isDraft: true,
  },
];
