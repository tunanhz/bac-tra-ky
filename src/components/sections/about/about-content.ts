/**
 * Nội dung mục Về chúng tôi, chép NGUYÊN VĂN spec mục III.2 (tab 5). Chỉ được ngắt đoạn, không sửa chữ.
 * Hai dòng gạch đầu dòng "Tầm nhìn phát triển sản phẩm truyền thống trong thị trường hiện đại." và "Các giá trị cốt
 * lõi của thương hiệu." trong spec là ghi chú cấu trúc tài liệu nên không hiển thị.
 */

export const ABOUT_WHO = {
  heading: "Bác Trà Ký là ai?",
  tagline: "Nơi hương vị truyền thống kể câu chuyện của thời gian",
  paragraphs: [
    "Bác Trà Ký là thương hiệu ẩm thực mang trong mình tình yêu dành cho những giá trị truyền thống Việt Nam, khởi nguồn từ Bánh Bác – thức quà đặc trưng của làng Giang Xá, Hoài Đức, Hà Nội.",
    "Với chúng tôi, mỗi chiếc bánh không chỉ mang hương vị thơm ngon mà còn chứa đựng câu chuyện về một vùng đất, về đôi bàn tay khéo léo của người làm bánh và những nét đẹp văn hoá được gìn giữ qua nhiều thế hệ.",
    "Tên gọi “Bác Trà Ký” gợi lên hình ảnh một cuốn ký sự về Bánh Bác bên chén trà, nơi những câu chuyện xưa được kể lại qua hương vị thân quen. Sự kết hợp giữa Bánh Bác Giang Xá và Trà Sen tạo nên một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
    "Bằng việc làm mới hương vị, thiết kế bao bì và cách kể chuyện, Bác Trà Ký mong muốn đưa những thức quà truyền thống đến gần hơn với thế hệ trẻ, để giá trị xưa tiếp tục hiện diện trong đời sống hôm nay.",
  ],
} as const;

export const ABOUT_INSPIRATION = {
  label: "Nguồn cảm hứng ra đời thương hiệu",
  heading: "Từ một chiếc bánh quê đến hành trình gìn giữ di sản",
  paragraphs: [
    "Giữa nhịp sống hiện đại, khi những món ăn mới liên tục xuất hiện, nhiều thức quà truyền thống vẫn âm thầm lưu giữ hương vị và ký ức của bao thế hệ.",
    "Bánh Bác Giang Xá là một trong những thức quà như thế. Với sắc đỏ đặc trưng từ gấc, lớp vỏ nếp dẻo thơm, hương vừng rang và phần nhân đậu xanh bùi ngọt, chiếc bánh mang trong mình nét mộc mạc, tinh tế của ẩm thực quê hương.",
    "Thế nhưng, không phải người trẻ nào cũng biết đến Bánh Bác hay hiểu được những giá trị văn hoá ẩn sau món bánh truyền thống này.",
    "Từ đó, Bác Trà Ký ra đời với một mong muốn giản dị: Để Bánh Bác không chỉ là hương vị của ký ức, mà còn trở thành một phần trong trải nghiệm ẩm thực của thế hệ hôm nay.",
    "Chúng tôi lựa chọn kết hợp Bánh Bác với Trà Sen – hai thức quà mang đậm dấu ấn văn hoá Việt – đồng thời phát triển những hương vị mới và hình thức quà tặng hiện đại.",
    "Bởi chúng tôi tin rằng, truyền thống không nhất thiết phải đứng yên trong quá khứ. Khi được trân trọng và tiếp nối đúng cách, những giá trị ấy hoàn toàn có thể tìm được chỗ đứng trong đời sống đương đại.",
  ],
} as const;

export type AboutStatement = {
  label: string;
  heading: string;
  /** Câu trích dẫn trong ngoặc kép của spec (hiển thị nổi bật). */
  quote: string;
  paragraphs: readonly string[];
  /** Câu kết, hiển thị nhấn. */
  closing: string;
};

export const ABOUT_MISSION: AboutStatement = {
  label: "Sứ mệnh của Bác Trà Ký",
  heading: "Gìn giữ hương vị – Kết nối thế hệ",
  quote:
    "Gìn giữ bản sắc Bánh Bác Giang Xá, đổi mới cách thưởng thức và kể chuyện để kết nối giá trị truyền thống với người tiêu dùng hôm nay.",
  paragraphs: [
    "Bác Trà Ký mang trong mình sứ mệnh đưa Bánh Bác Giang Xá đến gần hơn với người tiêu dùng hiện đại, đặc biệt là thế hệ trẻ.",
    "Chúng tôi trân trọng hương vị nguyên bản, nguồn gốc làng nghề và những giá trị văn hoá đã làm nên nét riêng của Bánh Bác. Trên nền tảng đó, Bác Trà Ký hướng tới đổi mới trải nghiệm thưởng thức thông qua sự kết hợp cùng Trà Sen, đa dạng hoá lựa chọn hương vị và thiết kế những sản phẩm quà tặng phù hợp với cuộc sống hiện đại.",
    "Không chỉ mang đến một món ăn ngon, chúng tôi mong muốn mỗi sản phẩm còn trở thành cầu nối giữa người thưởng thức với câu chuyện về vùng đất Giang Xá, về con người và những giá trị được trao truyền qua nhiều thế hệ.",
  ],
  closing: "Bác Trà Ký không tìm cách thay thế truyền thống, mà tìm một cách mới để truyền thống tiếp tục được yêu thương.",
};

export const ABOUT_VISION: AboutStatement = {
  label: "Tầm nhìn của Bác Trà Ký",
  heading: "Đưa thức quà quê vươn xa trong đời sống hiện đại",
  quote:
    "Trở thành thương hiệu tiêu biểu trong việc đưa Bánh Bác Giang Xá trở thành thức quà truyền thống gần gũi với đời sống hiện đại.",
  paragraphs: [
    "Bác Trà Ký hướng tới xây dựng một thương hiệu quà tặng ẩm thực mang bản sắc Việt, nơi những giá trị truyền thống được gìn giữ và phát triển bằng tư duy sáng tạo.",
    "Chúng tôi mong muốn Bánh Bác Giang Xá không chỉ được biết đến như một đặc sản địa phương mà còn trở thành lựa chọn quen thuộc trong những dịp gặp gỡ, sum họp và trao gửi yêu thương.",
    "Thông qua việc phát triển sản phẩm, nâng cao trải nghiệm khách hàng và lan toả câu chuyện văn hoá, Bác Trà Ký hướng tới mở rộng sự hiện diện của Bánh Bác trên thị trường, đồng thời duy trì sự gắn kết với các cơ sở sản xuất và làng nghề địa phương.",
  ],
  closing:
    "Để một ngày, khi nhắc đến Bánh Bác Giang Xá, người ta không chỉ nhớ đến một món bánh ngon mà còn nhớ đến một nét đẹp văn hoá Việt Nam đáng tự hào.",
};

export type CoreValue = {
  number: string;
  title: string;
  subtitle: string;
  paragraphs: readonly string[];
};

export const ABOUT_CORE_VALUES = {
  label: "Giá trị cốt lõi",
  heading: "Ba giá trị làm nên Bác Trà Ký",
  items: [
    {
      number: "01",
      title: "GIỮ ĐÚNG GỐC",
      subtitle: "Trân trọng giá trị nguyên bản",
      paragraphs: [
        "Chúng tôi tin rằng bản sắc truyền thống chính là điều làm nên giá trị khác biệt của Bánh Bác Giang Xá.",
        "Bác Trà Ký luôn lấy nguồn gốc, hình dáng, kỹ thuật và hương vị đặc trưng của Bánh Bác làm nền tảng phát triển. Trong đó, Bánh Bác nhân đậu xanh truyền thống giữ vai trò cốt lõi, đại diện cho những giá trị nguyên bản mà thương hiệu hướng tới gìn giữ.",
      ],
    },
    {
      number: "02",
      title: "NGON LÀM NỀN TẢNG",
      subtitle: "Chất lượng tạo nên niềm tin",
      paragraphs: [
        "Một câu chuyện đẹp chỉ thực sự có ý nghĩa khi đi cùng một sản phẩm chất lượng.",
        "Đối với Bác Trà Ký, hương vị thơm ngon và trải nghiệm thưởng thức luôn là yếu tố quan trọng hàng đầu. Dù là Bánh Bác truyền thống hay những phiên bản hương vị mới, chúng tôi đều hướng tới sự hài hoà, chỉn chu và phù hợp với khẩu vị người tiêu dùng.",
        "Bởi chất lượng chính là nền tảng để khách hàng tin tưởng, lựa chọn và gắn bó lâu dài.",
      ],
    },
    {
      number: "03",
      title: "ĐỔI MỚI CÓ KIỂM SOÁT",
      subtitle: "Sáng tạo để tiếp nối",
      paragraphs: [
        "Chúng tôi tin rằng gìn giữ truyền thống không đồng nghĩa với việc ngừng đổi mới.",
        "Bác Trà Ký hướng tới phát triển những hương vị mới, kết hợp Bánh Bác với Trà Sen, đồng thời làm mới thiết kế bao bì và trải nghiệm quà tặng để phù hợp hơn với thị hiếu hiện đại.",
        "Mỗi sự đổi mới đều được định hướng trên nền tảng tôn trọng bản sắc của Bánh Bác Giang Xá, để sản phẩm phát triển mà không đánh mất những giá trị làm nên nguồn cội.",
      ],
    },
  ] satisfies readonly CoreValue[],
} as const;
