import { describe, expect, it } from "vitest";
import { getActiveOffer, type CustomerOffer } from "./customer-content";

const offer = {
  status: "published", title: "Tên dùng trong test", description: "Mô tả dùng trong test", terms: ["Điều kiện dùng trong test"],
  startsOn: "2026-11-16", endsOn: "2026-11-17",
} satisfies CustomerOffer;

const activeTime = Date.parse("2026-11-16T08:00:00+07:00");

describe("getActiveOffer", () => {
  it("hiện từ đầu ngày bắt đầu đến hết ngày kết thúc theo giờ Việt Nam", () => {
    expect(getActiveOffer(offer, Date.parse("2026-11-15T16:59:59.999Z"))).toBeNull();
    expect(getActiveOffer(offer, Date.parse("2026-11-15T17:00:00.000Z"))).toBe(offer);
    expect(getActiveOffer(offer, Date.parse("2026-11-17T16:59:59.999Z"))).toBe(offer);
    expect(getActiveOffer(offer, Date.parse("2026-11-17T17:00:00.000Z"))).toBeNull();
  });

  it("không mở ưu đãi chưa duyệt, thiếu thể lệ hoặc có khoảng ngày không hợp lệ", () => {
    for (const invalid of [null, { ...offer, status: "draft" }, { ...offer, terms: [" "] }, { ...offer, endsOn: "2026-11-31" }, { ...offer, endsOn: "2026-11-15" }] satisfies (CustomerOffer | null)[]) {
      expect(getActiveOffer(invalid, activeTime)).toBeNull();
    }
  });
});
