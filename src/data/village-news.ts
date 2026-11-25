import type { NewsPost } from "@/lib/types";

/**
 * 4 bài viết từ các video/bài đăng Facebook trong 2 slide đầu Canva (mục Khám phá làng nghề Giang Xá).
 * Bài thứ 5 là bài "DẤU ẤN VUA LÝ NAM ĐẾ TRONG LỊCH SỬ VÀ VĂN HÓA LÀNG GIANG XÁ" từ `customerNewsPosts`.
 */
export const villageFacebookPosts: readonly NewsPost[] = [
  {
    slug: "banh-bac-giang-xa-hoai-duc-dam-da-huong-vi-que-huong",
    title: "Bánh Bác Giang Xá – Hoài Đức đậm đà hương vị quê hương",
    excerpt:
      "Nhắc đến Hoài Đức, bên cạnh những đổi thay trong nhịp sống hiện đại, người ta vẫn nhớ về những món ăn dân dã, mộc mạc, gắn liền với tuổi thơ.",
    lead: "Nhắc đến Hoài Đức, bên cạnh những đổi thay trong nhịp sống hiện đại, người ta vẫn nhớ về những món ăn dân dã, mộc mạc, gắn liền với tuổi thơ. Trong đó, bánh bác Giang Xá đã trở thành một nét đẹp ẩm thực, chứa đựng tình yêu quê hương và sự khéo léo của người dân nơi đây.",
    content: [
      "Chiếc bánh nhỏ nhắn nhưng tinh tế, từ khâu chọn nguyên liệu đến cách chế biến. Lớp vỏ mềm dẻo, nhân ngọt thơm, khi thưởng thức mang lại cảm giác thanh tao, đậm đà, khó quên. Không chỉ đơn thuần là một món ăn, bánh Bác Giang Xá còn gợi nhắc ký ức sum vầy, ấm áp tình làng nghĩa xóm, là biểu tượng của sự gắn bó với cội nguồn.",
      "Ngày nay, bánh bác Giang Xá không chỉ được ưa chuộng trong mỗi gia đình mà còn trở thành món quà quê ý nghĩa dành tặng bạn bè, du khách gần xa. Mỗi chiếc bánh chính là một phần hồn quê Hoài Đức – giản dị, ngọt ngào và sâu lắng.",
      "Nguồn: Hoài Đức Quê Ta — Xem video gốc trên Facebook",
    ],
    body: [
      {
        type: "image",
        src: "/images/news/lang-nghe-banh-bac-hoai-duc.webp",
        width: 1376,
        height: 768,
        alt: "Ba lát Bánh Bác Giang Xá đặt trên cành lá xanh trên nền giấy sáng",
        caption: [
          {
            text: "Bánh Bác Giang Xá – đặc sản truyền thống mang đậm hương vị quê hương Hoài Đức.",
            emphasis: true,
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Chiếc bánh nhỏ nhắn nhưng tinh tế, từ khâu chọn nguyên liệu đến cách chế biến. Lớp vỏ mềm dẻo, nhân ngọt thơm, khi thưởng thức mang lại cảm giác thanh tao, đậm đà, khó quên. Không chỉ đơn thuần là một món ăn, bánh Bác Giang Xá còn gợi nhắc ký ức sum vầy, ấm áp tình làng nghĩa xóm, là biểu tượng của sự gắn bó với cội nguồn.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Ngày nay, bánh bác Giang Xá không chỉ được ưa chuộng trong mỗi gia đình mà còn trở thành món quà quê ý nghĩa dành tặng bạn bè, du khách gần xa. Mỗi chiếc bánh chính là một phần hồn quê Hoài Đức – giản dị, ngọt ngào và sâu lắng.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "Nguồn: ", strong: true },
          { text: "Fanpage Hoài Đức Quê Ta — " },
          {
            text: "Xem video gốc trên Facebook",
            href: "https://www.facebook.com/share/v/1AHWkoman9/?mibextid=wwXIfr",
          },
        ],
      },
    ],
    category: "lang-nghe",
    coverImage: "/images/news/lang-nghe-banh-bac-hoai-duc.webp",
    coverImageAlt: "Bánh Bác Giang Xá – Hoài Đức đậm đà hương vị quê hương",
    coverCaption: "Nguồn: Fanpage Hoài Đức Quê Ta",
    publishedAt: "2026-11-25",
    featured: false,
    isDraft: false,
  },
  {
    slug: "lang-giang-xa-vao-nhung-nam-thap-nien-90",
    title: "Làng Giang Xá vào những năm thập niên 90",
    excerpt:
      "Làng Giang Xá là một làng cổ có lịch sử lâu đời khi được coi là “quê hương thứ hai” của vua Lý Nam Đế.",
    lead: "Làng Giang Xá vào những năm thập niên 90. Làng Giang Xá là một làng cổ có lịch sử lâu đời khi được coi là “quê hương thứ hai” của vua Lý Nam Đế. Vào thập niên 90, đây được đánh giá là một trong những làng phát triển nhất của huyện Hoài Đức.",
    content: [
      "Những thước phim tư liệu ghi lại hình ảnh đời sống, không gian làng quê và sinh hoạt thường nhật tại Giang Xá vào thập niên 90 gợi nhắc một giai đoạn chuyển mình đáng nhớ của vùng đất giàu truyền thống lịch sử và văn hóa.",
      "Gắn liền với lịch sử lâu đời và truyền thống làng nghề, Giang Xá hôm nay vẫn tiếp nối những giá trị xưa qua di tích đình – đền – chùa và hương vị Bánh Bác truyền thống.",
      "Nguồn: Tin Tức Hoài Đức Online — Xem video gốc trên Facebook",
    ],
    body: [
      {
        type: "image",
        src: "/images/news/lang-nghe-fb-02-1990.webp",
        width: 876,
        height: 870,
        alt: "Tư liệu làng Giang Xá thập niên 1990 — Tin Tức Hoài Đức Online",
        caption: [
          {
            text: "Tư liệu làng Giang Xá vào những năm thập niên 90. Nguồn: Fanpage Tin Tức Hoài Đức Online.",
            emphasis: true,
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Những thước phim tư liệu ghi lại hình ảnh đời sống, không gian làng quê và sinh hoạt thường nhật tại Giang Xá vào thập niên 90 gợi nhắc một giai đoạn chuyển mình đáng nhớ của vùng đất giàu truyền thống lịch sử và văn hóa.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Gắn liền với lịch sử lâu đời và truyền thống làng nghề, Giang Xá hôm nay vẫn tiếp nối những giá trị xưa qua di tích đình – đền – chùa và hương vị Bánh Bác truyền thống.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "Nguồn: ", strong: true },
          { text: "Fanpage Tin Tức Hoài Đức Online — " },
          {
            text: "Xem video gốc trên Facebook",
            href: "https://www.facebook.com/share/v/1CCKTkW1bE/?mibextid=wwXIfr",
          },
        ],
      },
    ],
    category: "lang-nghe",
    coverImage: "/images/news/lang-nghe-fb-02-1990.webp",
    coverImageAlt: "Tư liệu làng Giang Xá vào những năm thập niên 90",
    coverCaption: "Nguồn: Fanpage Tin Tức Hoài Đức Online",
    publishedAt: "2026-11-25",
    featured: false,
    isDraft: false,
  },
  {
    slug: "hoai-duc-hao-khi-van-xuan",
    title: "Hoài Đức – Hào khí Vạn Xuân",
    excerpt:
      "“Hoài Đức – Hào khí Vạn Xuân” đưa du khách về với Giang Xá, vùng đất giàu truyền thống lịch sử và văn hóa gắn với Lý Nam Đế.",
    lead: "“Hoài Đức – Hào khí Vạn Xuân” đưa du khách về với Giang Xá, vùng đất giàu truyền thống lịch sử và văn hóa, nơi lưu giữ những dấu tích gắn với Lý Nam Đế – người khai mở nhà nước Vạn Xuân.",
    content: [
      "Qua cụm di tích đình – đền – chùa Giang Xá, câu chuyện về vị hoàng đế đầu tiên của nước Vạn Xuân cùng hào khí đấu tranh giành độc lập của dân tộc được tái hiện qua không gian di sản, kiến trúc và những truyền thuyết được cộng đồng gìn giữ qua nhiều thế hệ.",
      "Không chỉ có bề dày lịch sử, Giang Xá còn níu chân du khách bởi bánh Bác Giang Xá – thức quà dân gian độc đáo theo truyền thuyết dân gian từng được dùng để tiến vua, mang trong mình hương vị mộc mạc và nét tinh tế của văn hóa ẩm thực Hoài Đức.",
      "Từ những giá trị lịch sử, di tích đến nghề làm bánh truyền thống, “Hoài Đức – Hào khí Vạn Xuân” là lời mời khám phá một vùng đất nơi hồn xưa, vị cũ và hào khí Vạn Xuân vẫn được lưu truyền trong đời sống hôm nay.",
      "Nguồn: Trung tâm Dịch vụ tổng hợp Hoài Đức — Xem video gốc trên Facebook",
    ],
    body: [
      {
        type: "image",
        src: "/images/news/lang-nghe-fb-03.webp",
        width: 1024,
        height: 579,
        alt: "Nghi lễ truyền thống tại di tích đình – đền làng Giang Xá, Hoài Đức",
        caption: [
          {
            text: "Không gian nghi lễ truyền thống tại cụm di tích làng Giang Xá – Hoài Đức.",
            emphasis: true,
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Qua cụm di tích đình – đền – chùa Giang Xá, câu chuyện về vị hoàng đế đầu tiên của nước Vạn Xuân cùng hào khí đấu tranh giành độc lập của dân tộc được tái hiện qua không gian di sản, kiến trúc và những truyền thuyết được cộng đồng gìn giữ qua nhiều thế hệ.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Không chỉ có bề dày lịch sử, Giang Xá còn níu chân du khách bởi bánh Bác Giang Xá – thức quà dân gian độc đáo từng được dùng để tiến vua, mang trong mình hương vị mộc mạc và nét tinh tế của văn hóa ẩm thực Hoài Đức.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Từ những giá trị lịch sử, di tích đến nghề làm bánh truyền thống, “Hoài Đức – Hào khí Vạn Xuân” là lời mời khám phá một vùng đất nơi hồn xưa, vị cũ và hào khí Vạn Xuân vẫn được lưu truyền trong đời sống hôm nay.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "Nguồn: ", strong: true },
          { text: "Trung tâm Dịch vụ tổng hợp Hoài Đức — " },
          {
            text: "Xem video gốc trên Facebook",
            href: "https://www.facebook.com/share/v/1FhgJ96M8U/?mibextid=wwXIfr",
          },
        ],
      },
    ],
    category: "lang-nghe",
    coverImage: "/images/news/nguon-den-giang-xa.webp",
    coverImageAlt: "Đền Giang Xá – di tích gắn với Hoàng đế Lý Nam Đế tại Hoài Đức",
    coverCaption: "Đền Giang Xá · Nguồn video: Trung tâm Dịch vụ tổng hợp Hoài Đức",
    publishedAt: "2026-11-25",
    featured: false,
    isDraft: false,
  },
  {
    slug: "giang-xa-noi-luu-giu-cau-chuyen-ve-hoang-de-ly-nam-de",
    title: "Giang Xá – Nơi lưu giữ câu chuyện về Hoàng đế Lý Nam Đế",
    excerpt:
      "Nhắc đến Giang Xá, nhiều người sẽ nhớ đến một vùng quê giàu truyền thống văn hóa, nơi lưu giữ những câu chuyện lịch sử gắn liền với Hoàng đế Lý Nam Đế.",
    lead: "Nhắc đến Giang Xá, nhiều người sẽ nhớ đến một vùng quê giàu truyền thống văn hóa, nơi lưu giữ những câu chuyện lịch sử gắn liền với Hoàng đế Lý Nam Đế – vị vua sáng lập nước Vạn Xuân.",
    content: [
      "Theo truyền tích được lưu truyền tại địa phương, thuở nhỏ, Lý Nam Đế được Pháp Tổ Thiền sư nhận nuôi và dạy dỗ tại Bảo Phúc Tự (nay là chùa Giang Xá). Lớn lên, mang trong mình chí lớn cứu nước, Ngài đã xin phép Thiền sư đứng lên khởi nghĩa chống lại quân Lương.",
      "Câu chuyện ấy vẫn được người dân Giang Xá trân trọng gìn giữ qua nhiều thế hệ. Hằng năm, cứ đến ngày 12 tháng 9 âm lịch, người dân lại cùng nhau hướng về ngày hội truyền thống của quê hương, tổ chức các nghi lễ để tưởng nhớ công đức của vua Lý Bí.",
      "Không chỉ là dịp tưởng nhớ tiền nhân, lễ hội còn là cơ hội để các thế hệ gặp gỡ, cùng gìn giữ những phong tục và nét đẹp văn hóa đã gắn bó với mảnh đất này từ bao đời.",
      "Và cũng từ những câu chuyện như thế, chúng ta thêm hiểu, thêm yêu Giang Xá – nơi lịch sử, văn hóa và những giá trị thân thuộc của quê hương vẫn luôn được tiếp nối.",
      "Bác Trà Ký hy vọng sẽ góp một phần nhỏ trong hành trình đưa những nét đẹp truyền thống của Giang Xá đến gần hơn với mọi người.",
      "Nguồn: Fanpage Bác Trà Ký — Xem video gốc trên Facebook",
    ],
    body: [
      {
        type: "paragraph",
        runs: [
          {
            text: "Theo truyền tích được lưu truyền tại địa phương, thuở nhỏ, Lý Nam Đế được Pháp Tổ Thiền sư nhận nuôi và dạy dỗ tại Bảo Phúc Tự (nay là chùa Giang Xá). Lớn lên, mang trong mình chí lớn cứu nước, Ngài đã xin phép Thiền sư đứng lên khởi nghĩa chống lại quân Lương.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Câu chuyện ấy vẫn được người dân Giang Xá trân trọng gìn giữ qua nhiều thế hệ. Hằng năm, cứ đến ngày 12 tháng 9 âm lịch, người dân lại cùng nhau hướng về ngày hội truyền thống của quê hương, tổ chức các nghi lễ để tưởng nhớ công đức của vua Lý Bí.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Không chỉ là dịp tưởng nhớ tiền nhân, lễ hội còn là cơ hội để các thế hệ gặp gỡ, cùng gìn giữ những phong tục và nét đẹp văn hóa đã gắn bó với mảnh đất này từ bao đời.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Và cũng từ những câu chuyện như thế, chúng ta thêm hiểu, thêm yêu Giang Xá – nơi lịch sử, văn hóa và những giá trị thân thuộc của quê hương vẫn luôn được tiếp nối.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "Bác Trà Ký hy vọng sẽ góp một phần nhỏ trong hành trình đưa những nét đẹp truyền thống của Giang Xá đến gần hơn với mọi người.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "Nguồn: ", strong: true },
          { text: "Fanpage Bác Trà Ký — " },
          {
            text: "Xem video gốc trên Facebook",
            href: "https://www.facebook.com/share/v/1MSwBTr3KM/?mibextid=wwXIfr",
          },
        ],
      },
    ],
    category: "lang-nghe",
    coverImage: "/images/news/lang-nghe-fb-04.webp",
    coverImageAlt: "Giang Xá – Nơi lưu giữ câu chuyện về Hoàng đế Lý Nam Đế",
    coverCaption: "Nguồn: Fanpage Bác Trà Ký",
    publishedAt: "2026-11-25",
    featured: false,
    isDraft: false,
  },
];
