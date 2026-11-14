import type { Product, ProductCategory } from "@/lib/types";

/**
 * Danh mục sản phẩm theo spec mục III.4 (9 sản phẩm).
 *
 * Nguyên tắc: không tự tạo giá, thành phần, khối lượng, chứng nhận. Mô tả chỉ dựa trên điều spec nói;
 * chỗ chưa có dữ liệu ghi rõ "sẽ được cập nhật". Ảnh trỏ tới `/images/products/<slug>.webp` (phase 03 đặt file;
 * chưa có file thì component hiển thị `ImagePlaceholder`).
 *
 * TODO: thay dữ liệu thật — giá, mô tả chi tiết từng hương vị, danh mục bộ quà Trà Sen khi thương hiệu cung cấp.
 */

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  "truyen-thong": "Bánh Bác truyền thống",
  "sang-tao": "Bánh Bác hương vị sáng tạo",
  "qua-tang": "Hộp bánh và quà tặng",
};

/** Thứ tự hiển thị bộ lọc. */
export const PRODUCT_CATEGORIES: readonly ProductCategory[] = ["truyen-thong", "sang-tao", "qua-tang"];

const PENDING_DETAIL = "Thông tin chi tiết về sản phẩm sẽ được Bác Trà Ký cập nhật. Vui lòng liên hệ để được tư vấn.";

const CREATIVE_INTRO =
  "Một phiên bản thuộc nhóm Bánh Bác hương vị sáng tạo, được Bác Trà Ký phát triển trên nền tảng tôn trọng bản sắc của Bánh Bác Giang Xá.";

const GIFT_BOX_INTRO = "Hộp Bánh Bác dùng để thưởng thức hoặc làm quà tặng trong những dịp gặp gỡ, sum họp.";

function productImage(slug: string): string {
  return `/images/products/${slug}.webp`;
}

export const products: readonly Product[] = [
  {
    slug: "banh-bac-nhan-dau-xanh",
    name: "Bánh Bác nhân đậu xanh",
    category: "truyen-thong",
    shortDescription: "Sắc đỏ đặc trưng từ gấc, lớp vỏ nếp dẻo thơm, hương vừng rang và nhân đậu xanh bùi ngọt.",
    description: [
      "Bánh Bác nhân đậu xanh truyền thống giữ vai trò cốt lõi của Bác Trà Ký, đại diện cho những giá trị nguyên bản mà thương hiệu hướng tới gìn giữ.",
      "Với sắc đỏ đặc trưng từ gấc, lớp vỏ nếp dẻo thơm, hương vừng rang và phần nhân đậu xanh bùi ngọt, chiếc bánh mang trong mình nét mộc mạc, tinh tế của ẩm thực quê hương Giang Xá.",
    ],
    price: null,
    image: productImage("banh-bac-nhan-dau-xanh"),
    imageAlt: "Bao bì Bánh Bác nhân đậu xanh, với hình bánh cắt miếng và đậu xanh",
    imageIsIllustration: false,
    featured: true,
  },
  {
    slug: "banh-bac-nhan-man",
    name: "Bánh Bác nhân mặn",
    category: "sang-tao",
    shortDescription: "Một hương vị sáng tạo, làm mới trải nghiệm thưởng thức Bánh Bác.",
    description: [CREATIVE_INTRO, PENDING_DETAIL],
    price: null,
    image: productImage("banh-bac-nhan-man"),
    imageAlt: "Ảnh minh hoạ: đôi tay người làm bánh đang nhào bột",
    imageIsIllustration: true,
    featured: false,
  },
  {
    slug: "banh-bac-nhan-khoai-mon",
    name: "Bánh Bác nhân khoai môn",
    category: "sang-tao",
    shortDescription: "Một hương vị sáng tạo, làm mới trải nghiệm thưởng thức Bánh Bác.",
    description: [CREATIVE_INTRO, PENDING_DETAIL],
    price: null,
    image: productImage("banh-bac-nhan-khoai-mon"),
    imageAlt: "Bao bì tím Bánh Bác nhân khoai môn, với hình bánh và khoai môn",
    imageIsIllustration: false,
    featured: false,
  },
  {
    slug: "banh-bac-nhan-matcha",
    name: "Bánh Bác nhân matcha",
    category: "sang-tao",
    shortDescription: "Một phiên bản hương vị mới, phát triển trên nền tảng tôn trọng bản sắc Bánh Bác.",
    description: [CREATIVE_INTRO, PENDING_DETAIL],
    price: null,
    image: productImage("banh-bac-nhan-matcha"),
    imageAlt: "Bao bì xanh Bánh Bác nhân matcha, với hình bánh cắt lộ phần nhân xanh",
    imageIsIllustration: false,
    featured: true,
  },
  {
    slug: "banh-bac-nhan-dau-do",
    name: "Bánh Bác nhân đậu đỏ",
    category: "sang-tao",
    shortDescription: "Một hương vị sáng tạo, làm mới trải nghiệm thưởng thức Bánh Bác.",
    description: [CREATIVE_INTRO, PENDING_DETAIL],
    price: null,
    image: productImage("banh-bac-nhan-dau-do"),
    imageAlt: "Ảnh minh hoạ: cốc đầy hạt đậu đỏ",
    imageIsIllustration: true,
    featured: false,
  },
  {
    slug: "hop-2-banh",
    name: "Hộp 2 bánh",
    category: "qua-tang",
    shortDescription: "Hộp Bánh Bác nhỏ gọn để thưởng thức hoặc làm quà tặng.",
    description: [GIFT_BOX_INTRO, PENDING_DETAIL],
    price: null,
    image: productImage("hop-2-banh"),
    imageAlt: "Hộp Chạm Ký Ức màu đỏ và xanh, mở nắp để lộ hai chiếc Bánh Bác",
    imageIsIllustration: false,
    featured: false,
  },
  {
    slug: "hop-6-banh",
    name: "Hộp 6 bánh",
    category: "qua-tang",
    shortDescription: "Hộp Bánh Bác để thưởng thức cùng gia đình, bạn bè hoặc làm quà tặng.",
    description: [GIFT_BOX_INTRO, PENDING_DETAIL],
    price: null,
    image: productImage("hop-6-banh"),
    imageAlt: "Các hộp Gom Ký Ức, mỗi hộp có sáu chiếc Bánh Bác",
    imageIsIllustration: false,
    featured: true,
  },
  {
    slug: "hop-9-banh",
    name: "Hộp 9 bánh",
    category: "qua-tang",
    shortDescription: "Hộp Bánh Bác dành cho những dịp sum họp và trao gửi yêu thương.",
    description: [GIFT_BOX_INTRO, PENDING_DETAIL],
    price: null,
    image: productImage("hop-9-banh"),
    imageAlt: "Ảnh minh hoạ: chồng hộp quà giấy nâu thắt nơ đỏ",
    imageIsIllustration: true,
    featured: false,
  },
  {
    slug: "bo-qua-banh-bac-tra-sen",
    name: "Bộ quà Bánh Bác & Trà Sen",
    category: "qua-tang",
    shortDescription: "Bộ quà kết hợp Bánh Bác và Trà Sen — hai thức quà mang đậm dấu ấn văn hoá Việt.",
    description: [
      "Sự kết hợp giữa Bánh Bác Giang Xá và Trà Sen tạo nên một trải nghiệm thưởng thức hài hoà, đậm đà bản sắc Việt.",
      // TODO: thay dữ liệu thật — các bộ sản phẩm kết hợp Trà Sen theo danh mục thương hiệu sẽ cung cấp (spec mục III.4).
      "Danh mục các bộ quà kết hợp Trà Sen sẽ được Bác Trà Ký cập nhật. Vui lòng liên hệ để được tư vấn.",
    ],
    price: null,
    image: productImage("bo-qua-banh-bac-tra-sen"),
    imageAlt: "Hộp quà Trao Ký Ức mở nắp, bày Bánh Bác và hộp Trà Sen Tây Hồ",
    imageIsIllustration: false,
    featured: true,
  },
];
