"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { REVEAL_READY_FLAG } from "@/lib/reveal-boot";

// Báo cho script khởi động (layout) rằng mã reveal đã nạp — không cần gỡ class `js` dự phòng.
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>)[REVEAL_READY_FLAG] = true;
}

type RevealProps = {
  children: ReactNode;
  /** Thẻ bao ngoài; mặc định `div`. */
  as?: ElementType;
  className?: string;
  /** Trễ (ms) trước khi hiện — dùng để lệch nhịp các phần tử cạnh nhau. */
  delay?: number;
  /** Tỷ lệ phần tử lọt khung nhìn để kích hoạt (mặc định .15). */
  threshold?: number;
  id?: string;
};

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll reveal nhẹ: fade + rise 24px, 900ms, chạy một lần (IntersectionObserver, threshold .15).
 * Người dùng bật "giảm chuyển động" hoặc trình duyệt không có IntersectionObserver → hiện ngay.
 * Chỉ ẩn khi `<html>` có class `js` (xem `src/lib/reveal-boot.ts`): không JS hoặc JS lỗi thì nội dung vẫn hiện.
 */
export function Reveal({ children, as: Tag = "div", className, delay = 0, threshold = 0.15, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      // Hiện ngay; đặt state trong frame kế để không render dây chuyền đồng bộ trong effect.
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} id={id} className={cn("reveal", visible && "is-visible", className)} style={style}>
      {children}
    </Tag>
  );
}
