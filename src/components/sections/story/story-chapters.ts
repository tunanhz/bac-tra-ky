/**
 * Nội dung 4 chương "Câu chuyện văn hoá" (spec mục III.3). Tên chương đúng chữ spec. Đoạn văn viết ngắn và CHỈ dựa
 * trên điều spec nói (phần thông tin thương hiệu, Về chúng tôi, yêu cầu từng section); không thêm sự kiện, số liệu,
 * niên đại. Truyền thuyết "tiến vua" luôn đi kèm chữ "Theo truyền thuyết dân gian".
 */

export type StoryChapter = {
  /** id neo trong trang, dùng cho dải mục lục chương. */
  id: string;
  numeral: string;
  title: string;
  paragraphs: readonly string[];
  /** Khối viền riêng có nhãn (dùng cho truyền thuyết dân gian). */
  legend?: { label: string; text: string };
  quote: { text: string; source: string };
  image: {
    src: string;
    alt: string;
    /** Chú thích kiểu bảo tàng trên góc ảnh. */
    caption: string;
  };
};

export const FOLK_LEGEND_LABEL = "Theo truyền thuyết dân gian";

export const STORY_CHAPTERS: readonly StoryChapter[] = [
  {
    id: "chuong-1",
    numeral: "I",
    title: "Hồn quê Giang Xá",
    paragraphs: [
      "Giang Xá, Hoài Đức, Hà Nội là quê hương của Bánh Bác – thức quà đặc trưng của làng.",
      "Ở làng nghề, ký ức ẩm thực được gìn giữ qua đôi bàn tay khéo léo của người làm bánh và những nét đẹp văn hoá được trao truyền qua nhiều thế hệ.",
      "Vùng đất này còn gắn với vua Lý Nam Đế, người từng được nhận nuôi ở chùa Bảo Phúc – chùa Giang Xá hiện nay.",
    ],
    quote: { text: "Nơi hương vị truyền thống kể câu chuyện của thời gian", source: "Bác Trà Ký" },
    image: {
      src: "/images/story/nha-co-mai-ngoi.webp",
      alt: "Nếp nhà mái ngói giữa vườn cây xanh của một làng quê Bắc Bộ",
      caption: "Ảnh minh hoạ không gian làng quê Bắc Bộ",
    },
  },
  {
    id: "chuong-2",
    numeral: "II",
    title: "Câu chuyện Bánh Bác",
    paragraphs: [
      "Bánh Bác Giang Xá mang sắc đỏ đặc trưng từ gấc, lớp vỏ nếp dẻo thơm, hương vừng rang và phần nhân đậu xanh bùi ngọt.",
      "Chiếc bánh mang nét mộc mạc, tinh tế của ẩm thực quê hương. Với người làm bánh, đó còn là câu chuyện về một vùng đất và về nghề được gìn giữ qua nhiều thế hệ trong đời sống văn hoá của làng.",
    ],
    legend: {
      label: FOLK_LEGEND_LABEL,
      text: "Theo truyền thuyết dân gian, Bánh Bác từng là thứ bánh được dâng tiến vua. Đây là câu chuyện truyền miệng, không phải sự kiện lịch sử đã được xác minh.",
    },
    quote: {
      text: "Với chúng tôi, mỗi chiếc bánh không chỉ mang hương vị thơm ngon mà còn chứa đựng câu chuyện về một vùng đất.",
      source: "Bác Trà Ký",
    },
    image: {
      src: "/images/story/tay-nan-bot.webp",
      alt: "Đôi bàn tay đang nặn bột làm bánh",
      caption: "Ảnh minh hoạ – sẽ thay ảnh thật",
    },
  },
  {
    id: "chuong-3",
    numeral: "III",
    title: "Nghệ thuật thưởng Trà Sen",
    paragraphs: [
      "Trong đời sống văn hoá Việt Nam, chén trà có mặt trong những dịp gặp gỡ, sum họp và trao gửi yêu thương.",
      "Trà Sen mang nét thanh tao riêng – một thức quà đậm dấu ấn văn hoá Việt.",
      "Thưởng chén Trà Sen bên chiếc Bánh Bác là sự kết hợp tạo nên một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
    ],
    quote: {
      text: "Tên gọi “Bác Trà Ký” gợi lên hình ảnh một cuốn ký sự về Bánh Bác bên chén trà, nơi những câu chuyện xưa được kể lại qua hương vị thân quen.",
      source: "Bác Trà Ký",
    },
    image: {
      src: "/images/story/am-men-lam-sen.webp",
      alt: "Bộ ấm chén men lam vẽ hoa sen đặt trên bàn gỗ",
      caption: "Ảnh minh hoạ – bộ ấm chén men lam vẽ sen",
    },
  },
  {
    id: "chuong-4",
    numeral: "IV",
    title: "Truyền thống tiếp nối",
    paragraphs: [
      "Bác Trà Ký làm mới hương vị, thiết kế bao bì và cách kể chuyện để đưa Bánh Bác đến gần hơn với thế hệ trẻ.",
      "Bên cạnh Bánh Bác nhân đậu xanh truyền thống là những hương vị mới và những hộp quà kết hợp Trà Sen, phù hợp với cuộc sống hiện đại.",
      "Mỗi sự đổi mới đều đặt trên nền tảng tôn trọng nguồn cội, đồng thời gắn kết với các cơ sở sản xuất và làng nghề địa phương.",
    ],
    quote: { text: "Truyền thống không nhất thiết phải đứng yên trong quá khứ.", source: "Bác Trà Ký" },
    image: {
      src: "/images/story/rot-tra-ben-banh.webp",
      alt: "Rót trà từ ấm gốm bên những chiếc bánh trên khay gỗ",
      caption: "Ảnh minh hoạ – sẽ thay ảnh thật",
    },
  },
];
