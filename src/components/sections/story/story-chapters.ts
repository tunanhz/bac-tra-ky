type StoryPhoto = { src: string; alt: string; caption: string; contain?: boolean };

export type StoryChapter = {
  id: string;
  numeral: string;
  title: string;
  heading: string;
  paragraphs: readonly string[];
  image: StoryPhoto;
  relatedPhotos?: readonly StoryPhoto[];
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
      "Nằm trên mảnh đất Hoài Đức, Hà Nội, Giang Xá mang trong mình những nét đẹp thân thuộc của một làng quê Bắc Bộ. Nơi đây lưu giữ những mái đình, ngôi chùa cổ kính, cổng làng và những phong tục truyền thống được gìn giữ qua nhiều thế hệ.",
      "Không chỉ là nơi lưu giữ những dấu tích lịch sử, Giang Xá còn là vùng đất của những câu chuyện quê hương, của nếp sống cộng đồng và những giá trị văn hóa được người dân trân trọng, tiếp nối.",
      "Chính từ mảnh đất ấy, những thức quà dân dã như Bánh Bác đã trở thành một phần trong ký ức và nét đặc trưng của ẩm thực địa phương.",
    ],
    image: {
      src: "/images/story/hon-que-giang-xa-bg.webp",
      alt: "Cổng làng Giang Xá, cánh đồng lúa và đĩa Bánh Bác sen",
      caption: "Cổng làng Giang Xá — nét đẹp làng quê Bắc Bộ",
    },
    relatedPhotos: [
      {
        src: "/images/story/loi-vao-hoi-lang-giang-xa.webp",
        alt: "Người dân đi giữa hai trụ đá để vào không gian lễ hội Giang Xá",
        caption: "Lối vào hội làng Giang Xá",
      },
      {
        src: "/images/common/san-lang-giang-xa.webp",
        alt: "Sân lát gạch với lọng, kiệu và đồ lễ tại Giang Xá",
        caption: "Sân làng trong ngày hội",
      },
    ],
  },
  {
    id: "chuong-2",
    numeral: "II",
    title: "Dấu ấn lịch sử",
    heading: "Giang Xá – Vùng đất gắn liền với Vua Lý Nam Đế",
    paragraphs: [
      "Giang Xá không chỉ được biết đến bởi những nét đẹp văn hóa làng quê mà còn là vùng đất gắn liền với cuộc đời và sự nghiệp của Lý Nam Đế – vị hoàng đế sáng lập nhà nước Vạn Xuân trong lịch sử Việt Nam.",
      "Theo câu chuyện lịch sử được lưu truyền tại địa phương, thuở nhỏ, Lý Bí (sau này là Lý Nam Đế) được Pháp Tổ Thiền sư cưu mang, nuôi dưỡng. Sau đó, ông theo thầy về tu học ở chùa Linh Bảo, nay là chùa Bảo Phúc (chùa Giang Xá).",
      "Lớn lên, với chí hướng lớn và khát vọng giành lại độc lập cho dân tộc, Lý Bí đã khởi binh chống lại ách đô hộ nhà Lương. Năm 544, sau khi giành thắng lợi, ông lên ngôi hoàng đế, đặt quốc hiệu là Vạn Xuân, mở ra một dấu mốc quan trọng trong lịch sử dân tộc.",
      "Ngày nay, những di tích và lễ hội truyền thống tại Giang Xá vẫn góp phần gìn giữ, nhắc nhớ về vị anh hùng dân tộc và niềm tự hào lịch sử của người dân địa phương.",
    ],
    image: {
      src: "/images/story/le-tuong-niem-ly-nam-de.webp",
      alt: "Sân lễ với lọng và đồ lễ trong dịp tưởng niệm Lý Nam Đế tại Giang Xá",
      caption: "Lễ tưởng niệm Lý Nam Đế ở Giang Xá — ảnh tư liệu.",
    },
  },
  {
    id: "chuong-3",
    numeral: "III",
    title: "Hương vị quê nhà",
    heading: "Bánh Bác – Sản vật tiến vua, niềm tự hào đất Giang Xá",
    paragraphs: [
      `Nhắc đến Giang Xá, Hoài Đức, không thể không nhắc đến Bánh Bác – thức quà truyền thống mang đậm dấu ấn văn hóa và niềm tự hào của người dân nơi đây. ${FOLK_LEGEND_LABEL}, Bánh Bác từng là sản vật được dùng để tiến vua, góp phần làm nên giá trị đặc biệt của thức quà quê này.`,
      "Không chỉ đơn thuần là một món ăn, Bánh Bác còn gắn bó mật thiết với đời sống văn hóa tinh thần của người dân Giang Xá. Chiếc bánh thường xuất hiện trong các dịp lễ hội truyền thống, ngày giỗ, những dịp sum họp gia đình và các sự kiện quan trọng của địa phương. Qua đó, Bánh Bác trở thành một phần trong phong tục, nếp sống và ký ức của nhiều thế hệ người dân.",
      "Trải qua thời gian, dù cuộc sống có nhiều đổi thay, thức quà mang hương vị quê nhà ấy vẫn được gìn giữ và lưu truyền, trở thành nét đặc trưng trong văn hóa ẩm thực của vùng đất Hoài Đức.",
    ],
    image: {
      src: "/images/story/banh-bac-tien-vua-full.webp",
      alt: "Hộp quà Bác Trà Ký, đĩa Bánh Bác hoa sen bên hàng cây làng quê",
      caption: "Bánh Bác Giang Xá — sản vật tiến vua đầy tự hào",
    },
  },
];

export const CRAFT_STEPS: readonly (StoryPhoto & { title: string; text: string })[] = [
  {
    title: "Chuẩn bị nguyên liệu",
    src: "/images/story/nguyen-lieu-banh-bac.webp",
    alt: "Gạo nếp, đậu xanh, gấc, vừng và lá gói",
    caption: "Gạo nếp, đậu xanh, gấc và vừng",
    text: "Lựa chọn gạo nếp và các nguyên liệu cần thiết để tạo nên hương vị đặc trưng của bánh.",
  },
  {
    title: "Chuẩn bị bột bánh",
    src: "/images/story/xay-bot-nep.webp",
    alt: "Cối đá xay gạo nếp, bột trắng chảy xuống bát",
    caption: "Xay gạo nếp bằng cối đá",
    text: "Xử lý và chuẩn bị phần bột nếp đạt độ mềm dẻo phù hợp.",
  },
  {
    title: "Bác bánh – giữ lửa nghề xưa",
    src: "/images/story/bac-banh-tren-chao.webp",
    alt: "Đôi tay dàn lớp bột nếp trên chảo",
    caption: "Dàn mỏng lớp bột nếp trên chảo",
    text: "Bột được bác trên chảo với lửa nhỏ, kết hợp mỡ thăn lợn và thao tác đảo, kéo đều tay để tạo độ mỏng, mềm và dẻo.",
  },
  {
    title: "Hoàn thiện chiếc bánh",
    src: "/images/story/goi-banh-bac.webp",
    alt: "Đôi tay cuộn các lớp bột và nhân bánh trong lá xanh",
    caption: "Cuộn và buộc bánh trong lá xanh",
    text: "Bánh được hoàn thiện với phần vỏ mềm dẻo, kết hợp cùng nhân bánh thơm bùi, tạo nên thức quà đặc trưng của Giang Xá.",
  },
];
