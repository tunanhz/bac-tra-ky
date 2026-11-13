// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./modal";

function Harness({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Xem chi tiết
      </button>
      <Modal
        open={open}
        title="Bánh Bác nhân đậu xanh"
        onClose={() => {
          onClose?.();
          setOpen(false);
        }}
      >
        <p>Mô tả</p>
        <a href="#lien-he">Liên hệ đặt hàng</a>
      </Modal>
    </>
  );
}

describe("Modal", () => {
  it("không render khi đóng", () => {
    render(<Modal open={false} onClose={() => {}} title="Tiêu đề">nội dung</Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("mở: có role dialog, aria-modal, tên theo tiêu đề, focus vào hộp, khoá cuộn", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Xem chi tiết" }));
    const dialog = screen.getByRole("dialog", { name: "Bánh Bác nhân đậu xanh" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("Esc đóng, mở khoá cuộn và trả focus về nút đã mở", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const opener = screen.getByRole("button", { name: "Xem chi tiết" });
    await user.click(opener);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(opener).toHaveFocus();
  });

  it("nút Đóng và bấm nền phủ đều đóng hộp", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Xem chi tiết" }));
    await user.click(screen.getByRole("button", { name: "Đóng" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Xem chi tiết" }));
    await user.click(screen.getByTestId("modal-overlay"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("bẫy focus: Tab xoay vòng trong hộp", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Xem chi tiết" }));
    const close = screen.getByRole("button", { name: "Đóng" });
    const link = screen.getByRole("link", { name: "Liên hệ đặt hàng" });

    await user.tab();
    expect(close).toHaveFocus();
    await user.tab();
    expect(link).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(link).toHaveFocus();
  });
});
