"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Tiêu đề hộp thoại (hiện trong hộp, nối với `aria-labelledby`). */
  title: ReactNode;
  /** Ẩn tiêu đề khỏi giao diện nhưng vẫn đọc được (khi nội dung tự có tiêu đề riêng). */
  hideTitle?: boolean;
  children: ReactNode;
  /** Class thêm cho tấm hộp (vd. đổi max-width). */
  className?: string;
  /** Nhãn nút đóng cho trình đọc màn hình. */
  closeLabel?: string;
};

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

function focusableIn(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("inert") && el.getAttribute("aria-hidden") !== "true",
  );
}

/**
 * Hộp thoại dạng modal (hướng B): phủ nền nâu mờ, tấm giấy be có khung viền đôi vàng đồng.
 * - Bẫy focus trong hộp (Tab/Shift+Tab xoay vòng), focus vào hộp khi mở.
 * - Esc hoặc bấm nền phủ để đóng; đóng xong trả focus về phần tử đã mở hộp.
 * - Khoá cuộn trang khi mở (giữ chỗ thanh cuộn để trang không giật).
 * - Mobile: toàn màn hình; desktop: tối đa 960px.
 */
export function Modal({ open, onClose, title, hideTitle = false, children, className, closeLabel = "Đóng" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusableIn(panel);
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center md:items-center md:p-6">
      <div
        className="modal-overlay absolute inset-0 bg-[rgb(51_35_28/0.6)]"
        aria-hidden="true"
        data-testid="modal-overlay"
        onClick={() => onCloseRef.current()}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "modal-panel relative flex w-full flex-col overflow-hidden bg-be shadow-paper outline-none",
          "md:max-h-[min(90svh,860px)] md:max-w-[960px] md:border md:border-dong/50",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-2 z-0 hidden border border-dong/35 md:block" aria-hidden="true" />
        <button
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label={closeLabel}
          className="absolute top-2 right-2 z-20 flex size-12 cursor-pointer items-center justify-center bg-be/90 text-son transition-colors duration-300 hover:bg-son hover:text-be md:top-3 md:right-3"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 5 L19 19 M19 5 L5 19" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <h2
            id={titleId}
            className={cn(hideTitle ? "sr-only" : "px-6 pt-6 pr-16 text-h3 font-semibold text-son md:px-10 md:pt-10")}
          >
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
