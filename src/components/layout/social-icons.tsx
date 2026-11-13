import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.3-3.7 3.9V11H7.5v3H10v8h3z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M16 3c.3 2 1.6 3.6 3.6 3.9v2.6c-1.3 0-2.5-.4-3.6-1.1v5.9c0 3-2.2 5.2-5 5.2S6 17.3 6 14.5s2.5-5 5.3-4.9v2.7c-.3-.1-.6-.1-.9-.1-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.4V3H16z" />
    </svg>
  );
}
