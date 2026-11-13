import type { SVGProps } from "react";

export type CornerPosition = "tl" | "tr" | "bl" | "br";

const FLIP: Record<CornerPosition, string | undefined> = {
  tl: undefined,
  tr: "scaleX(-1)",
  bl: "scaleY(-1)",
  br: "scale(-1, -1)",
};

type CornerProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Góc đặt hoạ tiết; SVG gốc là góc trên-trái, các góc khác lật bằng transform. */
  position?: CornerPosition;
};

/**
 * Hoạ tiết góc khung thếp vàng (assets/ornaments/corner.svg). Theo hướng B chỉ dùng ở 4 góc khung hero.
 * Luôn là trang trí (`aria-hidden`), màu theo `currentColor`.
 */
export function Corner({ position = "tl", style, ...props }: CornerProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-position={position}
      style={{ transform: FLIP[position], ...style }}
      {...props}
    >
      <g stroke="currentColor" strokeLinecap="round">
        <path d="M6 6 H52 M6 6 V52" strokeWidth="2.4" />
        <path d="M12 12 H44 M12 12 V44" strokeWidth="1.2" strokeOpacity="0.6" />
        <path d="M12 30 C24 30 30 24 30 12" strokeWidth="1.6" />
        <path d="M30 22 C30 28 26 30 22 30" strokeWidth="1.4" strokeOpacity="0.8" />
      </g>
      <path d="M30 10 C27 13 27 18 30 21 C33 18 33 13 30 10 Z" fill="currentColor" />
    </svg>
  );
}

/** Bốn góc hoạ tiết cho một khung `position: relative`. */
export function FrameCorners({ className = "size-[46px]" }: { className?: string }) {
  return (
    <>
      <Corner position="tl" className={`pointer-events-none absolute -top-px -left-px ${className}`} />
      <Corner position="tr" className={`pointer-events-none absolute -top-px -right-px ${className}`} />
      <Corner position="bl" className={`pointer-events-none absolute -bottom-px -left-px ${className}`} />
      <Corner position="br" className={`pointer-events-none absolute -right-px -bottom-px ${className}`} />
    </>
  );
}
