import type { NewsCategory, NewsPost } from "@/lib/types";

/** Bài viết chính thức của Bác Trà Ký. Chỉ đăng sự kiện hoặc ưu đãi khi đã được xác nhận. */

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  "hoat-dong": "Tin tức và hoạt động Bác Trà Ký",
  "am-thuc": "Khám phá ẩm thực truyền thống",
  "van-hoa-tra": "Văn hoá thưởng trà",
  "lang-nghe": "Câu chuyện làng nghề",
  "san-pham-uu-dai": "Sản phẩm mới và chương trình ưu đãi",
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
      "Từ chiếc bánh của làng Giang Xá đến chén Trà Sen, Bác Trà Ký chọn bắt đầu câu chuyện thương hiệu bằng hai thức quà quen thuộc.",
    content: [
      "Bác Trà Ký là thương hiệu ẩm thực mang trong mình tình yêu dành cho những giá trị truyền thống Việt Nam, khởi nguồn từ Bánh Bác – thức quà đặc trưng của làng Giang Xá, Hoài Đức, Hà Nội.",
      "Tên gọi “Bác Trà Ký” gợi lên hình ảnh một cuốn ký sự về Bánh Bác bên chén trà. Sự kết hợp giữa Bánh Bác Giang Xá và Trà Sen tạo nên một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
      "Trong câu chuyện ấy, chiếc bánh kể về quê hương và bàn tay người làm bánh; chén trà mở ra một dịp để ngồi lại và chia sẻ. Đó cũng là lý do hai thức quà được đặt cạnh nhau.",
    ],
    category: "hoat-dong",
    coverImage: coverImage("bac-tra-ky-cuon-ky-su-banh-bac-ben-chen-tra"),
    coverImageAlt: "Khay trà với ấm đất và Bánh Bác cắt lát, trích từ ấn phẩm thương hiệu",
    coverCaption: "Ấn phẩm Bác Trà Ký",
    coverIsBrandBanner: true,
    publishedAt: "2026-11-15",
    featured: true,
    isDraft: false,
  },
  {
    slug: "banh-bac-giang-xa-sac-do-gac-huong-vung-rang",
    title: "Bánh Bác Giang Xá: sắc đỏ gấc và hương vừng rang",
    excerpt:
      "Lớp vỏ nếp dẻo thơm, sắc đỏ đặc trưng từ gấc, hương vừng rang và nhân đậu xanh bùi ngọt — nét mộc mạc, tinh tế của ẩm thực quê hương.",
    content: [
      "Bánh Bác Giang Xá là đặc sản truyền thống của Giang Xá, Hoài Đức, Hà Nội.",
      "Với sắc đỏ đặc trưng từ gấc, lớp vỏ nếp dẻo thơm, hương vừng rang và phần nhân đậu xanh bùi ngọt, chiếc bánh mang trong mình nét mộc mạc, tinh tế của ẩm thực quê hương.",
      "Khi cắt bánh, các lớp đỏ và trắng hiện lên quanh phần nhân vàng. Hình ảnh cắt lát cũng giúp thấy rõ điều khó nhận ra khi cuộn bánh còn nguyên trong lá.",
    ],
    category: "am-thuc",
    coverImage: coverImage("banh-bac-giang-xa-sac-do-gac-huong-vung-rang"),
    coverImageAlt: "Bánh Bác cuộn lá xanh và những lát bánh để lộ lớp đỏ, trắng và nhân vàng",
    coverCaption: "Hình ảnh từ Bác Trà Ký",
    publishedAt: "2026-11-15",
    featured: false,
    isDraft: false,
  },
  {
    slug: "tra-sen-net-thanh-tao-cua-van-hoa-tra-viet",
    title: "Trà Sen — nét thanh tao của văn hoá trà Việt",
    excerpt: "Trà có vai trò riêng trong đời sống văn hoá Việt Nam, và Trà Sen mang một vẻ thanh tao đặc biệt.",
    content: [
      "Trong đời sống văn hoá Việt Nam, chén trà là nơi bắt đầu những cuộc trò chuyện, những lần gặp gỡ và sum họp.",
      "Bác Trà Ký chọn Trà Sen để đồng hành cùng Bánh Bác, bởi đây là hai thức quà mang đậm dấu ấn văn hoá Việt.",
      "Khi thưởng trà cùng bánh, có thể bắt đầu bằng một ngụm trà nhỏ, rồi nếm một lát bánh để cảm nhận lần lượt hương trà, vị nếp và phần nhân.",
    ],
    category: "van-hoa-tra",
    coverImage: coverImage("chen-tra-sen-tay-ho"),
    coverImageAlt: "Những chén trà sen có cánh hoa sen trên khay gỗ",
    coverFocus: "top-right",
    coverCaption: "Trà sen Tây Hồ · Ảnh: Viethavvh",
    coverCredit: {
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ch%C3%A9n_tr%C3%A0_sen.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      changes: "Cắt khung, thu nhỏ và chuyển sang WebP",
    },
    publishedAt: "2026-11-15",
    featured: false,
    isDraft: false,
  },
  {
    slug: "giang-xa-vung-dat-cua-ky-uc-va-huong-nep",
    title: "Giang Xá — vùng đất của ký ức và hương nếp",
    excerpt:
      "Làng Giang Xá ở Hoài Đức, Hà Nội — nơi khởi nguồn của Bánh Bác và những nét đẹp văn hoá được gìn giữ qua nhiều thế hệ.",
    content: [
      "Giang Xá thuộc Hoài Đức, Hà Nội, là nơi khởi nguồn của Bánh Bác — thức quà đặc trưng của làng.",
      "Theo lời kể ở Giang Xá, vua Lý Nam Đế từng được nhận nuôi tại chùa Bảo Phúc – chùa Giang Xá hiện nay.",
      "Nhìn từ sân làng đến bàn tay người gói bánh, câu chuyện Giang Xá không chỉ nằm trong một món ăn. Bánh Bác là một cách để bắt đầu tìm hiểu nếp sống và nghề làm bánh ở đây.",
    ],
    category: "lang-nghe",
    coverImage: coverImage("giang-xa-vung-dat-cua-ky-uc-va-huong-nep"),
    coverImageAlt: "Sân lát gạch với lọng và đồ lễ ở làng Giang Xá",
    coverCaption: "Giang Xá — ảnh tư liệu",
    publishedAt: "2026-11-15",
    featured: false,
    isDraft: false,
  },
  {
    slug: "nhung-huong-vi-sang-tao-cua-banh-bac",
    title: "Những hương vị sáng tạo của Bánh Bác",
    excerpt:
      "Bên cạnh Bánh Bác nhân đậu xanh truyền thống, Bác Trà Ký giới thiệu ba hương vị sáng tạo: khoai môn, matcha và đậu đỏ.",
    content: [
      "Bác Trà Ký tin rằng gìn giữ truyền thống không đồng nghĩa với việc ngừng đổi mới.",
      "Nhóm Bánh Bác hương vị sáng tạo gồm nhân khoai môn, nhân matcha và nhân đậu đỏ. Mỗi sự đổi mới đều được định hướng trên nền tảng tôn trọng bản sắc của Bánh Bác Giang Xá.",
      "Nếu bạn đã quen với vị đậu xanh, có thể chọn thử một trong ba vị mới để cảm nhận nét khác biệt trên cùng nền bánh truyền thống.",
    ],
    category: "san-pham-uu-dai",
    coverImage: coverImage("nhung-huong-vi-sang-tao-cua-banh-bac"),
    coverImageAlt: "Hộp Bánh Bác matcha có ô trong suốt, để lộ bánh nhân xanh",
    coverCaption: "Hình hộp matcha từ Bác Trà Ký",
    publishedAt: "2026-11-15",
    featured: false,
    isDraft: false,
  },
  {
    slug: "thuong-tra-cung-banh-truyen-thong",
    title: "Thưởng trà cùng bánh truyền thống",
    excerpt: "Sự kết hợp giữa thưởng trà và ăn bánh truyền thống — một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
    content: [
      "Sự kết hợp giữa Bánh Bác Giang Xá và Trà Sen tạo nên một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
      "Bác Trà Ký mong muốn mỗi lần thưởng trà cùng Bánh Bác là một dịp để những câu chuyện xưa được kể lại qua hương vị thân quen.",
      "Có thể cắt bánh thành lát nhỏ và bày trên một đĩa dùng chung. Một ấm trà và vài lát bánh là đủ cho một buổi chuyện trò.",
    ],
    category: "van-hoa-tra",
    coverImage: coverImage("thuong-tra-cung-banh-truyen-thong"),
    coverImageAlt: "Đĩa Bánh Bác cắt lát bên ấm và chén trà",
    coverCaption: "Trích ấn phẩm về cách làm Bánh Bác",
    publishedAt: "2026-11-15",
    featured: false,
    isDraft: false,
  },
];
