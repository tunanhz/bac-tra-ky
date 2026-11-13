import type { SVGProps } from "react";

/**
 * Dải phân cách nụ sen (assets/ornaments/divider.svg). Theo hướng B dùng ở CTA cuối trang.
 * Trang trí (`aria-hidden`), màu theo `currentColor`.
 */
export function Divider(props: Omit<SVGProps<SVGSVGElement>, "children">) {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6 12 H78" strokeOpacity="0.5" />
        <path d="M122 12 H194" strokeOpacity="0.5" />
        <path d="M78 12 C86 12 88 6 94 8" />
        <path d="M122 12 C114 12 112 6 106 8" />
      </g>
      <g fill="currentColor">
        <circle cx="78" cy="12" r="2.2" />
        <circle cx="122" cy="12" r="2.2" />
        <path d="M100 2 C94 8 94 16 100 22 C106 16 106 8 100 2 Z" />
      </g>
      <path d="M100 6 C97 10 97 15 100 19 C103 15 103 10 100 6 Z" fill="#fdf7e5" fillOpacity="0.35" />
    </svg>
  );
}
