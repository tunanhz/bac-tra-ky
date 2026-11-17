export type Rating = 1 | 2 | 3 | 4 | 5;

type PublicationStatus = "draft" | "published";

export type CustomerReview = {
  id: string;
  status: PublicationStatus;
  displayName: string;
  quote: string;
  rating?: Rating;
};

export type CustomerOffer = {
  status: PublicationStatus;
  title: string;
  description: string;
  terms: readonly [string, ...string[]];
  /** Ngày theo giờ Việt Nam, định dạng yyyy-mm-dd; bao gồm cả ngày kết thúc. */
  startsOn: string;
  endsOn: string;
};

// Chỉ thêm trích dẫn thật đã được khách đồng ý cho đăng. Không lưu thông tin liên hệ tại đây.
export const customerReviews: readonly CustomerReview[] = [];

// Dữ liệu chương trình ưu đãi theo mẫu thiết kế tài liệu thẻ 5
export const customerOffer: CustomerOffer = {
  status: "published",
  title: "Khi mua combo Bánh Bác",
  description: "Thưởng thức trọn vị bánh quê, nhận ngay ưu đãi hấp dẫn cùng Bác Trà Ký!",
  terms: [
    "Áp dụng khi đặt mua các combo Bánh Bác.",
    "Tặng kèm trải nghiệm trà sen Tây Hồ thanh tao.",
    "Bản mẫu thiết kế giao diện theo tài liệu hướng dẫn thương hiệu.",
  ],
  startsOn: "2026-11-01",
  endsOn: "2026-12-31",
};

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function vietnamMidnight(date: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NaN;
  const utc = Date.parse(`${date}T00:00:00Z`);
  if (!Number.isFinite(utc) || new Date(utc).toISOString().slice(0, 10) !== date) return NaN;
  return utc - 7 * HOUR_MS;
}

/** Mốc hết hạn là 00:00 của ngày kế tiếp theo giờ Việt Nam. */
export function getOfferEndTime(endsOn: string): number {
  return vietnamMidnight(endsOn) + DAY_MS;
}

export function getActiveOffer(offer: CustomerOffer | null, now: number): CustomerOffer | null {
  if (offer?.status !== "published" || !offer.title.trim() || !offer.description.trim() || !offer.terms.length || offer.terms.some((term) => !term.trim())) {
    return null;
  }
  const start = vietnamMidnight(offer.startsOn);
  const end = getOfferEndTime(offer.endsOn);
  return now >= start && now < end ? offer : null;
}
