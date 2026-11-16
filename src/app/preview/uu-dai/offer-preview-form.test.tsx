// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { OfferPreviewForm } from "./offer-preview-form";

describe("OfferPreviewForm", () => {
  it("đủ trường bắt buộc và chỉ xác nhận đã thử, không có endpoint hoặc tên trường để gửi", async () => {
    const user = userEvent.setup();
    render(<OfferPreviewForm />);
    const form = screen.getByRole("form", { name: /Đăng ký mua hàng/ });
    const submit = screen.getByRole("button", { name: "Thử đăng ký" });
    expect(form).toHaveAttribute("method", "dialog");
    expect(form).not.toHaveAttribute("action");
    expect(form.querySelector("[name]")).toBeNull();
    await user.click(submit);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    await user.type(screen.getByLabelText("Họ và tên"), "Khách Demo");
    await user.type(screen.getByLabelText("Số điện thoại"), "0900000000");
    await user.selectOptions(screen.getByLabelText("Chọn combo"), "gom");
    await user.type(screen.getByLabelText("Địa chỉ nhận hàng"), "12 đường Mẫu");
    await user.click(submit);
    expect(screen.getByRole("status")).toHaveTextContent("Không có đơn hàng nào được gửi");
  });

  it("nút tăng/giảm hoạt động bằng bàn phím và giữ số lượng trong giới hạn", async () => {
    const user = userEvent.setup();
    render(<OfferPreviewForm />);
    const decrease = screen.getByRole("button", { name: "Giảm số lượng" });
    const increase = screen.getByRole("button", { name: "Tăng số lượng" });
    const number = screen.getByRole("spinbutton", { name: "Số lượng" });
    expect(decrease).toBeDisabled();
    increase.focus();
    await user.keyboard("{Enter}");
    expect(number).toHaveValue(2);
    await user.click(decrease);
    expect(number).toHaveValue(1);
    fireEvent.change(number, { target: { value: "99" } });
    expect(increase).toBeDisabled();
  });
});
