// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { CustomerPanels } from "./customer-panels";

describe("CustomerPanels", () => {
  it("nhận góp ý qua kênh liên hệ thật và không công bố khuyến mãi chưa chốt", () => {
    render(<CustomerPanels />);
    const feedback = within(screen.getByRole("region", { name: "Góc Feedback" }));
    expect(feedback.getByRole("link", { name: "Gửi góp ý" })).toHaveAttribute("href", expect.stringMatching(/^(mailto:|https?:\/\/|\/#lien-he)/));
    expect(feedback.queryByRole("blockquote")).not.toBeInTheDocument();
    const offers = within(screen.getByRole("region", { name: "Ưu đãi" }));
    expect(offers.getByText(/chưa có chương trình ưu đãi được công bố/)).toBeInTheDocument();
    expect(offers.getByRole("link", { name: "Liên hệ tư vấn" })).toHaveAttribute("href", siteConfig.orderChannelUrl);
  });
});
