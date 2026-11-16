type StoryPhoto = { src: string; alt: string; caption: string; contain?: boolean };

export type StoryChapter = {
  id: string;
  numeral: string;
  title: string;
  heading: string;
  paragraphs: readonly string[];
  image: StoryPhoto;
  source?: { label: string; href: string };
};

export const FOLK_LEGEND_LABEL = "Theo truyền thuyết dân gian";

export const STORY_CHAPTERS: readonly StoryChapter[] = [
  {
    id: "chuong-1",
    numeral: "I",
    title: "Hồn quê Giang Xá",
    heading: "Giang Xá – Nét đẹp làng quê Bắc Bộ",
    paragraphs: [
      "Giang Xá – nơi mỗi góc làng đều mang theo một câu chuyện, mỗi nếp nhà đều lưu giữ một phần ký ức quê hương.",
      "Nằm ở Hoài Đức, Hà Nội, Giang Xá vẫn giữ những mái đình, ngôi chùa, cổng làng và các phong tục được trao truyền qua nhiều thế hệ. Nếp sống cộng đồng ấy là một phần không thể tách rời của làng.",
      "Chính từ mảnh đất ấy, Bánh Bác đã trở thành một phần ký ức và một nét riêng của ẩm thực địa phương.",
    ],
    image: {
      src: "/images/story/cong-lang-giang-xa.webp",
      alt: "Cổng đá và hàng cờ nhiều màu tại Giang Xá",
      caption: "Cổng làng Giang Xá — ảnh tư liệu",
    },
  },
  {
    id: "chuong-2",
    numeral: "II",
    title: "Dấu ấn lịch sử",
    heading: "Giang Xá – Vùng đất gắn liền với vua Lý Nam Đế",
    paragraphs: [
      "Theo lời kể lưu truyền tại địa phương, thuở nhỏ Lý Bí từng được Pháp Tổ Thiền sư cưu mang, rồi theo thầy về tu học tại chùa Linh Bảo, nay là chùa Bảo Phúc (chùa Giang Xá).",
      "Lý Bí lãnh đạo cuộc khởi nghĩa chống nhà Lương. Năm 544, ông lên ngôi hoàng đế, lấy hiệu Lý Nam Đế và đặt quốc hiệu là Vạn Xuân.",
      "Các di tích và lễ hội tại Giang Xá vẫn là nơi người dân tưởng nhớ Lý Nam Đế và kể lại câu chuyện ấy cho thế hệ sau.",
    ],
    image: {
      src: "/images/story/le-tuong-niem-ly-nam-de.webp",
      alt: "Sân lễ với lọng và đồ lễ trong dịp tưởng niệm Lý Nam Đế tại Giang Xá",
      caption: "Lễ tưởng niệm Lý Nam Đế ở Giang Xá — ảnh tư liệu",
    },
    source: {
      label: "Xem tư liệu về chùa Bảo Phúc",
      href: "https://tapchinghiencuuphathoc.vn/gioi-thieu-truong-ha-giang-xa-va-lai-yen-o-hoai-duc-ha-noi.html",
    },
  },
  {
    id: "chuong-3",
    numeral: "III",
    title: "Hương vị quê nhà",
    heading: "Bánh Bác – Niềm tự hào đất Giang Xá",
    paragraphs: [
      "Bánh Bác có dáng cuộn, khi cắt lát lộ lớp nếp đỏ gấc và phần nhân đậu xanh. Vỏ nếp dẻo thơm quyện với hương vừng rang và vị bùi ngọt của nhân.",
      `${FOLK_LEGEND_LABEL}, Bánh Bác từng là sản vật được dâng tiến vua. Đây là câu chuyện truyền miệng của làng Giang Xá.`,
      "Chiếc bánh gắn với dịp lễ hội, ngày giỗ và những buổi sum họp. Qua nhiều thế hệ, hương vị ấy vẫn là một phần nếp sống và ký ức của người dân Giang Xá.",
    ],
    image: {
      src: "/images/common/banh-bac-giang-xa.webp",
      alt: "Bánh Bác cuộn lá xanh bên những lát bánh đã cắt",
      caption: "Bánh Bác Giang Xá — hình ảnh từ Bác Trà Ký",
      contain: true,
    },
  },
];

export const CRAFT_STEPS: readonly (Omit<StoryPhoto, "caption" | "contain"> & { title: string; text: string })[] = [
  {
    title: "Chuẩn bị nguyên liệu",
    src: "/images/story/nguyen-lieu-banh-bac.webp",
    alt: "Gạo nếp, đậu xanh, gấc, vừng và lá gói",
    text: "Chọn gạo nếp, đậu xanh, gấc, vừng và lá gói để chuẩn bị cho từng lớp bánh.",
  },
  {
    title: "Chuẩn bị bột bánh",
    src: "/images/story/xay-bot-nep.webp",
    alt: "Cối đá xay gạo nếp, bột trắng chảy xuống bát",
    text: "Xay và chuẩn bị bột nếp mịn để lớp vỏ sau khi bác có độ mềm dẻo.",
  },
  {
    title: "Bác bánh – giữ lửa nghề xưa",
    src: "/images/story/bac-banh-tren-chao.webp",
    alt: "Đôi tay dàn lớp bột nếp trên chảo",
    text: "Bột được bác trên chảo với lửa nhỏ và mỡ thăn lợn. Người thợ đảo, kéo và dàn đều tay để lớp vỏ mỏng, mềm và dẻo.",
  },
  {
    title: "Hoàn thiện chiếc bánh",
    src: "/images/story/goi-banh-bac.webp",
    alt: "Đôi tay cuộn các lớp bột và nhân bánh trong lá xanh",
    text: "Ghép lớp vỏ, đặt nhân đậu xanh, cuốn bánh trong lá rồi rắc vừng trước khi cắt thành khoanh.",
  },
];
