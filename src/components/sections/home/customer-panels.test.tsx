// @vitest-environment jsdom
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import type { CustomerOffer } from "@/data/customer-content";
import { CustomerFeedbackForm } from "./customer-feedback-form";
import { CustomerPanels } from "./customer-panels";
import { OfferWindow } from "./offer-window";

const draftOffer: CustomerOffer = {
  status: "draft", title: "Tên ưu đãi thử nghiệm", description: "Nội dung thử nghiệm", terms: ["Thể lệ thử nghiệm"],
  startsOn: "2026-01-01", endsOn: "2099-12-31",
};

describe("CustomerPanels", () => {
  it("không hiển thị đánh giá hay chương trình khi dữ liệu chưa được xác nhận", () => {
    render(<CustomerPanels offer={draftOffer} reviews={[
      { id: "draft", status: "draft", displayName: "Khách thử nghiệm", quote: "Bản nháp không được hiển thị", rating: 5 },
    ]} />);
    const feedback = within(screen.getByRole("region", { name: "Góc Feedback" }));
    expect(feedback.queryByRole("blockquote")).not.toBeInTheDocument();
    expect(feedback.queryByText("Khách thử nghiệm")).not.toBeInTheDocument();
    const offers = within(screen.getByRole("region", { name: "Ưu đãi" }));
    expect(offers.queryByText(draftOffer.title)).not.toBeInTheDocument();
    expect(offers.queryByRole("timer")).not.toBeInTheDocument();
    expect(offers.queryByRole("form")).not.toBeInTheDocument();
    expect(offers.queryByText(/DỮ LIỆU MẪU/)).not.toBeInTheDocument();
    expect(offers.getByText(/Hiện chưa có chương trình ưu đãi/)).toBeInTheDocument();
    expect(offers.getByRole("link", { name: "Theo dõi trên Facebook" })).toHaveAttribute("href", siteConfig.facebookUrl);
    expect(offers.getByRole("link", { name: "Xem các bộ quà" })).toHaveAttribute("href", "/#san-pham");
  });

  it("chỉ hiển thị trích dẫn đã được phép đăng", () => {
    render(<CustomerPanels reviews={[
      { id: "approved", status: "published", displayName: "Tên dùng trong test", quote: "Nội dung được phép đăng trong test", rating: 4 },
      { id: "draft", status: "draft", displayName: "Khách thử nghiệm", quote: "Bản nháp không được hiển thị" },
    ]} />);
    const list = within(screen.getByRole("list", { name: "Cảm nhận đã được phép đăng" }));
    expect(list.getAllByRole("listitem")).toHaveLength(1);
    expect(list.getByRole("blockquote")).toHaveTextContent("Nội dung được phép đăng trong test");
    expect(list.getByText("4/5 sao")).toBeInTheDocument();
  });
});

describe("OfferWindow", () => {
  it("hiện thời gian thực theo mốc hết hạn và gỡ CTA chương trình khi hết giờ", () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "performance"] });
    try {
      const serverNow = Date.parse("2026-11-16T16:59:58Z");
      render(<OfferWindow serverNow={serverNow} endTime={serverNow + 2000} expired={<p>Đã hết ưu đãi</p>}>
        <a href="#lien-he">Liên hệ nhận ưu đãi</a>
      </OfferWindow>);
      expect(screen.getByRole("timer")).toHaveTextContent("02");
      expect(screen.getByRole("link", { name: "Liên hệ nhận ưu đãi" })).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.getByRole("timer")).toHaveTextContent("01");
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.queryByRole("timer")).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Liên hệ nhận ưu đãi" })).not.toBeInTheDocument();
      expect(screen.getByText("Đã hết ưu đãi")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("CustomerFeedbackForm", () => {
  it("soạn email với nội dung và số sao, không báo đã gửi hoặc đăng lên website", async () => {
    const user = userEvent.setup();
    render(<CustomerFeedbackForm email="shop@example.com" />);
    expect(screen.getByRole("button", { name: "Mở email để gửi" })).toBeDisabled();
    expect(screen.getByRole("link", { name: "Soạn email theo cách khác" })).toHaveAttribute("href", expect.stringMatching(/^mailto:shop@example\.com\?subject=/));

    await user.selectOptions(screen.getByRole("combobox", { name: /Mức đánh giá/ }), "4");
    await user.type(screen.getByRole("textbox", { name: "Cảm nhận của bạn" }), "Vị trà thơm & dịu? #GópÝ");
    const draft = new URL(screen.getByRole("link", { name: "Mở email để gửi" }).getAttribute("href")!);
    expect(draft.pathname).toBe("shop@example.com");
    expect(draft.searchParams.get("subject")).toBe("Đánh giá gửi Bác Trà Ký");
    expect(draft.searchParams.get("body")).toBe("Điểm đánh giá: 4/5\r\n\r\nVị trà thơm & dịu? #GópÝ");
    expect(screen.getByText(/cần bấm Gửi trong email/)).toBeInTheDocument();
  });

  it("không bắt buộc chấm sao và không tạo email với góp ý chỉ có khoảng trắng", async () => {
    const user = userEvent.setup();
    render(<CustomerFeedbackForm email="shop@example.com" />);
    const input = screen.getByRole("textbox", { name: "Cảm nhận của bạn" });
    await user.type(input, "   ");
    expect(screen.getByRole("button", { name: "Mở email để gửi" })).toBeDisabled();
    await user.type(input, "Góp ý mới");
    const draft = new URL(screen.getByRole("link", { name: "Mở email để gửi" }).getAttribute("href")!);
    expect(draft.searchParams.get("body")).toBe("Góp ý mới");
  });
});
