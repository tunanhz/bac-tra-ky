export type ProductCategory = "truyen-thong" | "sang-tao" | "qua-tang";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /** 1–2 câu cho card; chỉ dựa trên spec, không bịa thành phần/khối lượng. */
  shortDescription: string;
  /** Mô tả đầy đủ cho modal chi tiết, mỗi phần tử là một đoạn văn. */
  description: string[];
  /** `null` = chưa có giá chính thức → card hiện "Liên hệ để biết giá". */
  price: number | null;
  /** Đường dẫn ảnh trong `public/` (vd. `/images/products/<slug>.webp`). */
  image: string;
  imageAlt: string;
  /** `true` khi ảnh chỉ là ảnh gợi không khí → hiện nhãn "Ảnh minh hoạ – sẽ thay ảnh thật". */
  imageIsIllustration: boolean;
  featured: boolean;
};

export type NewsCategory = "hoat-dong" | "am-thuc" | "van-hoa-tra" | "lang-nghe" | "san-pham-uu-dai";

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Nội dung bài, mỗi phần tử là một đoạn văn. */
  content: string[];
  category: NewsCategory;
  /** Đường dẫn ảnh bìa trong `public/` (vd. `/images/news/<slug>.webp`). */
  coverImage: string;
  coverImageAlt: string;
  /** Vị trí lấy nét khi ảnh bìa được cắt trong trang chi tiết. */
  coverFocus?: "top-right";
  /** Chú thích về nguồn hoặc bối cảnh. */
  coverCaption?: string;
  /** Nguồn và giấy phép ảnh bên ngoài; tên tác giả ghi trong chú thích. */
  coverCredit?: Readonly<{ sourceUrl: string; license: string; licenseUrl: string; changes: string }>;
  /** Ấn phẩm khổ ngang từ bộ nhận diện, cần hiển thị trọn khung. */
  coverIsBrandBanner?: boolean;
  /** Ngày ISO `YYYY-MM-DD`. */
  publishedAt: string;
  featured: boolean;
  /** Bài chưa chốt nội dung → có nhãn “Bản nháp” và không lập chỉ mục. */
  isDraft: boolean;
};

export type { ContactInput } from "./contact";
