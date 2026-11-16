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

// Chỉ thêm nội dung và thể lệ do Bác Trà Ký xác nhận, không lấy mức giảm từ ảnh mockup.
export const customerOffer: CustomerOffer | null = null;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function vietnamMidnight(date: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NaN;
  const utc = Date.parse(`${date}T00:00:00Z`);
  if (!Number.isFinite(utc) || new Date(utc).toISOString().slice(0, 10) !== date) return NaN;
  return utc - 7 * HOUR_MS;
}

export function getActiveOffer(offer: CustomerOffer | null, now: number): CustomerOffer | null {
  if (offer?.status !== "published" || !offer.title.trim() || !offer.description.trim() || !offer.terms.length || offer.terms.some((term) => !term.trim())) {
    return null;
  }
  const start = vietnamMidnight(offer.startsOn);
  const end = vietnamMidnight(offer.endsOn) + DAY_MS;
  return now >= start && now < end ? offer : null;
}
