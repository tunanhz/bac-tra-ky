// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CONTACT_FAILED_MESSAGE, CONTACT_NOT_READY_MESSAGE } from "@/lib/contact";
import { CONTACT_SUCCESS_MESSAGE, ContactForm, interpretContactResponse } from "./contact-form";
import { ContactSection } from "./contact-section";
import { FacebookButton } from "./facebook-button";

const FB = "https://www.facebook.com/bactraky";

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Họ và tên/), "Nguyễn Văn An");
  await user.type(screen.getByLabelText(/Số điện thoại/), "0912345678");
  await user.type(screen.getByLabelText(/Email/), "an@example.com");
  await user.type(screen.getByLabelText(/Nội dung/), "Tôi muốn đặt hộp 6 bánh làm quà.");
}

function submitButton() {
  return screen.getByRole("button", { name: /Gửi liên hệ|Đang gửi/ });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("interpretContactResponse", () => {
  it("chỉ 201 + ok:true là thành công", () => {
    expect(interpretContactResponse(201, { ok: true })).toEqual({ status: "sent" });
    expect(interpretContactResponse(201, null)).toEqual({ status: "failed" });
    expect(interpretContactResponse(200, { ok: true })).toEqual({ status: "failed" });
  });

  it("501 → chưa sẵn sàng; 503/500/413 → thất bại; 400 có fieldErrors → lỗi trường", () => {
    expect(interpretContactResponse(501, { ok: false, error: "x" })).toEqual({ status: "not-ready" });
    expect(interpretContactResponse(503, { ok: false, error: "x" })).toEqual({ status: "failed" });
    expect(interpretContactResponse(500, null)).toEqual({ status: "failed" });
    expect(interpretContactResponse(413, null)).toEqual({ status: "failed" });
    expect(interpretContactResponse(400, { ok: false, error: "x", fieldErrors: { email: "Sai" } })).toEqual({
      status: "invalid",
      fieldErrors: { email: "Sai" },
    });
    expect(interpretContactResponse(400, { ok: false, error: "x" })).toEqual({ status: "failed" });
  });
});

describe("ContactForm", () => {
  it("gửi khi trống → lỗi dưới từng trường, aria-invalid + aria-describedby, focus ô đầu, không gọi API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm facebookUrl={FB} />);
    await user.click(submitButton());

    const name = screen.getByLabelText(/Họ và tên/);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(/họ và tên/i);
    for (const label of [/Số điện thoại/, /Email/, /Nội dung/]) {
      expect(screen.getByLabelText(label)).toHaveAttribute("aria-invalid", "true");
    }
    expect(name).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("API 501 → thông báo trung thực + nút Facebook, KHÔNG báo thành công", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(501, { ok: false, error: CONTACT_NOT_READY_MESSAGE }));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm facebookUrl={FB} />);
    await fillValid(user);
    await user.click(submitButton());

    expect(await screen.findByText(/Đang tự động chuyển tiếp tới Facebook Bác Trà Ký/)).toBeInTheDocument();
    expect(screen.queryByText(CONTACT_SUCCESS_MESSAGE)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Nhắn qua Facebook" })).toHaveAttribute("href", FB);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(String(init.body))).toMatchObject({
      name: "Nguyễn Văn An",
      phone: "0912345678",
      email: "an@example.com",
      website: "",
    });
  });

  it("API 503 → thông báo thất bại, không báo thành công", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(503, { ok: false, error: "db" })));
    const user = userEvent.setup();
    render(<ContactForm facebookUrl={FB} />);
    await fillValid(user);
    await user.click(submitButton());

    expect(await screen.findByRole("alert")).toHaveTextContent(CONTACT_FAILED_MESSAGE);
    expect(screen.queryByText(CONTACT_SUCCESS_MESSAGE)).not.toBeInTheDocument();
  });

  it("lỗi mạng → thông báo thất bại, giữ nguyên dữ liệu đã nhập, mở khoá nút", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    const user = userEvent.setup();
    render(<ContactForm facebookUrl={FB} />);
    await fillValid(user);
    await user.click(submitButton());

    expect(await screen.findByText(CONTACT_FAILED_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByText(CONTACT_SUCCESS_MESSAGE)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Họ và tên/)).toHaveValue("Nguyễn Văn An");
    expect(submitButton()).toBeEnabled();
  });

  it("API 400 kèm fieldErrors → lỗi hiện tại trường tương ứng", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(400, { ok: false, error: "x", fieldErrors: { email: "Email bị từ chối." } })),
    );
    const user = userEvent.setup();
    render(<ContactForm facebookUrl={FB} />);
    await fillValid(user);
    await user.click(submitButton());

    expect(await screen.findByText("Email bị từ chối.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText(CONTACT_SUCCESS_MESSAGE)).not.toBeInTheDocument();
  });

  it("đang gửi → nút đổi 'Đang gửi…' và bị khoá", async () => {
    let resolve: (value: Response) => void = () => {};
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise<Response>((r) => (resolve = r))));
    const user = userEvent.setup();
    render(<ContactForm facebookUrl={FB} />);
    await fillValid(user);
    await user.click(submitButton());

    expect(screen.getByRole("button", { name: "Đang gửi…" })).toBeDisabled();
    expect(screen.getByRole("form")).toHaveAttribute("aria-busy", "true");
    resolve(jsonResponse(501, { ok: false, error: "x" }));
    expect(await screen.findByText(/Đang tự động chuyển tiếp tới Facebook Bác Trà Ký/)).toBeInTheDocument();
  });

  it("API 201 (khi có backend) → báo đã nhận + nút Facebook, xoá form", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(201, { ok: true })));
    const user = userEvent.setup();
    render(<ContactForm facebookUrl={FB} />);
    await fillValid(user);
    await user.click(submitButton());

    expect(await screen.findByText(CONTACT_SUCCESS_MESSAGE)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Nhắn qua Facebook" })).toHaveAttribute("href", FB);
    expect(screen.getByLabelText(/Họ và tên/)).toHaveValue("");
  });
});

describe("FacebookButton", () => {
  it("chưa có URL → nút mờ không bấm được, không có href, ghi '(đang cập nhật)'", () => {
    render(<FacebookButton url={null} />);
    const button = screen.getByRole("link", { name: /Nhắn qua Facebook \(đang cập nhật\)/ });
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toHaveAttribute("href");
  });

  it("có URL → link thật mở tab mới an toàn", () => {
    render(<FacebookButton url={FB} />);
    const link = screen.getByRole("link", { name: "Nhắn qua Facebook" });
    expect(link).toHaveAttribute("href", FB);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("ContactSection", () => {
  it("id lien-he, tiêu đề, thông tin liên hệ và ảnh tư liệu làng nghề", () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector("section#lien-he")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Liên hệ" })).toBeInTheDocument();
    for (const term of ["Facebook", "TikTok", "Email", "Hotline", "Địa chỉ"]) {
      expect(screen.getAllByText(term).length).toBeGreaterThan(0);
    }
    expect(screen.getByText("Làng nghề Giang Xá, xã Hoài Đức, Hà Nội")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Sân lát gạch với lọng và đồ lễ ở làng Giang Xá" })).toBeInTheDocument();
  });
});
