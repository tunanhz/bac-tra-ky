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
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.32a6.34 6.34 0 0 0-.85-.06A6.33 6.33 0 0 0 5 15.6a6.34 6.34 0 0 0 10.86 4.47 6.27 6.27 0 0 0 1.9-4.47V8.5a8.2 8.2 0 0 0 4.83 1.55v-3.36a4.85 4.85 0 0 1-3-.69z" />
    </svg>
  );
}

export function GmailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 18" aria-hidden="true" focusable="false" {...props}>
      <path fill="#4285f4" d="M0 4v12a2 2 0 0 0 2 2h3V7.75z" />
      <path fill="#34a853" d="M24 4v12a2 2 0 0 1-2 2h-3V7.75z" />
      <path fill="#ea4335" d="M5 1.75 12 7l7-5.25v6L12 13 5 7.75z" />
      <path fill="#c5221f" d="M0 2.5A2.5 2.5 0 0 1 4 0.5l1 1.25v6L0 4z" />
      <path fill="#fbbc04" d="M24 2.5a2.5 2.5 0 0 0-4-2L19 1.75v6L24 4z" />
    </svg>
  );
}
