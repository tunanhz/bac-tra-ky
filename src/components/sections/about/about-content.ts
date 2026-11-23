// Nội dung thương hiệu theo thẻ 5 của brief Bác Trà Ký.

export const ABOUT_INSPIRATION = {
  title: "Chúng tôi bắt đầu từ đâu?",
  heading: "Từ một lần nếm thử, đến hành trình gìn giữ vị xưa",
  paragraphs: [
    "Bác Trà Ký may mắn có dịp thưởng thức Bánh Bác Giang Xá – một thức quà truyền thống mang hương vị quê hương. Vị nếp dẻo thơm, nhân đậu xanh bùi ngọt cùng sắc đỏ gấc đặc trưng đã khơi dậy sự tò mò về món bánh mộc mạc mà đầy cuốn hút này.",
    "Từ đó, chúng tôi bắt đầu hành trình tìm hiểu và phát triển Bánh Bác, với mong muốn giữ trọn hương vị truyền thống, sáng tạo thêm những trải nghiệm mới và đưa thức quà Giang Xá đến gần hơn với người trẻ hôm nay.",
  ],
} as const;

export const ABOUT_STATEMENTS = [
  {
    title: "Tầm nhìn",
    description: "Đưa hương vị Bánh Bác Giang Xá vượt ra khỏi làng quê, trở thành thức quà thân thuộc trong nhịp sống hiện đại, để tinh hoa ẩm thực Việt mãi được gìn giữ và lan tỏa.",
  },
  {
    title: "Sứ mệnh",
    description: "Giữ trọn hương vị xưa, thêm chút sáng tạo mới để mỗi chiếc Bánh Bác không chỉ ngon mà còn kể được câu chuyện quê hương theo cách gần gũi với thế hệ trẻ.",
  },
] as const;

export const ABOUT_CORE_VALUES = {
  heading: "Giá trị cốt lõi",
  tagline: "Giữ hồn vị xưa – Gửi trọn vị nay.",
  items: [
    {
      title: "Giữ đúng gốc",
      description: "Trân trọng hương vị, dáng bánh và kỹ thuật làm bánh truyền thống của làng Giang Xá, để nét đẹp xưa luôn được gìn giữ.",
    },
    {
      title: "Ngon làm nền tảng",
      description: "Mỗi chiếc bánh đều được chú trọng từ hương vị đến chất lượng, bởi một món bánh ngon chính là lý do để bạn muốn thưởng thức thêm lần nữa.",
    },
    {
      title: "Đổi mới có kiểm soát",
      description: "Thêm những hương vị mới, làm mới cách thưởng thức nhưng vẫn giữ nét riêng của Bánh Bác Giang Xá – để truyền thống luôn gần gũi với người trẻ.",
    },
  ],
} as const;

/** Nội dung hành trình do khách xác nhận ngày 23/11/2026; không tự gán năm cho các mốc. */
export const ABOUT_JOURNEY = {
  title: "HÀNH TRÌNH CỦA BÁC TRÀ KÝ",
  description: "Từ một đặc sản làng quê, đến hành trình lan tỏa hương vị truyền thống Việt.",
  steps: [
    {
      title: "KHỞI NGUỒN",
      image: "/images/story/cong-lang-giang-xa.webp",
      imageAlt: "Cổng làng Giang Xá trong ngày hội",
      description: "Từ làng Giang Xá, Hoài Đức – nơi lưu giữ nghề làm Bánh Bác truyền thống.",
    },
    {
      title: "KHÁM PHÁ",
      image: "/images/products/banh-bac-cat-lat.webp",
      imageAlt: "Bánh Bác cắt lát với lớp nếp đỏ và nhân đậu xanh",
      description: "Bắt đầu biết đến Bánh Bác – đặc sản mang đậm hồn quê Việt.",
    },
    {
      title: "GÌN GIỮ",
      image: "/images/news/noi-dung-bao-16.webp",
      imageAlt: "Đôi tay cuộn lớp bánh gấc đỏ phủ vừng trên lá xanh",
      description: "Bác Trà Ký ra đời với mong muốn gìn giữ và phát huy giá trị Bánh Bác Giang Xá.",
    },
    {
      title: "LAN TỎA",
      image: "/images/products/hop-2-banh.webp",
      imageAlt: "Hộp hai Bánh Bác của Bác Trà Ký",
      description: "Mang hương vị truyền thống đến gần hơn với mọi người qua những trải nghiệm hiện đại.",
    },
    {
      title: "VƯƠN XA",
      image: "/images/products/bo-qua-banh-bac-tra-sen.webp",
      imageAlt: "Bộ quà Bánh Bác và trà sen của Bác Trà Ký",
      description: "Tiếp tục lan tỏa giá trị Việt, để Bánh Bác và trà sen vươn xa hơn nữa, đến với nhiều thế hệ.",
    },
  ],
} as const;
