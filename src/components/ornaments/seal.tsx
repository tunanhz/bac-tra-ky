import type { SVGProps } from "react";

type SealProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Nhãn đọc cho trình đọc màn hình; bỏ trống = trang trí (`aria-hidden`). */
  title?: string;
  /** Có vẽ nụ sen nhỏ ở đáy triện không (mặc định có). */
  withLotus?: boolean;
};

/**
 * Triện son "BTK" — logo tạm (assets/ornaments/seal.svg). Nền tô `currentColor` (đỏ gấc), nét chữ màu be.
 * TODO: thay dữ liệu thật — thay bằng logo chính thức khi có.
 */
export function Seal({ title, withLotus = true, ...props }: SealProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      <rect x="5" y="5" width="90" height="90" rx="8" fill="currentColor" />
      <rect x="12" y="12" width="76" height="76" rx="5" stroke="#fdf7e5" strokeWidth="2.2" />
      <g stroke="#fdf7e5" strokeWidth="4" strokeLinecap="square">
        <path d="M24 28 V72 M24 28 H38 V48 H24 M24 48 H40 V72 H24" />
        <path d="M50 20 V80" strokeWidth="2" strokeOpacity="0.6" />
        <path d="M58 30 H78 M68 30 V58" />
        <path d="M62 62 V78 M62 70 L76 62 M62 70 L76 78" strokeWidth="3.4" />
      </g>
      {withLotus ? <path d="M50 84 C47 87 47 92 50 94 C53 92 53 87 50 84 Z" fill="#fdf7e5" /> : null}
    </svg>
  );
}
