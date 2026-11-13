import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isExternalUrl } from "@/lib/format";

/**
 * - `primary`: nền đỏ gấc, viền trong be (đổi vàng nhũ khi hover) — hành động chính.
 * - `outline`: viền đỏ gấc trên nền be.
 * - `outline-light`: viền be trên nền tối/ảnh (hero, dải sơn son).
 * - `ghost`: nút chữ, gạch chân khi hover.
 */
export type ButtonVariant = "primary" | "outline" | "outline-light" | "ghost";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  "outline-light": "btn-outline-light",
  ghost: "btn-ghost",
};

type CommonProps = {
  variant?: ButtonVariant;
  /** Kéo rộng hết khung chứa (vd. nút xếp dọc trên mobile). */
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function buttonClassName(variant: ButtonVariant = "primary", fullWidth = false, className?: string) {
  return cn("btn", VARIANT_CLASS[variant], fullWidth && "w-full", className);
}

/**
 * Nút có `href` → liên kết (ngoài: mở tab mới; tới section `/#id`: thẻ `<a>` thường để cuộn mượt; trang nội bộ:
 * `next/link`). Không có `href` → `<button type="button">`.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, fullWidth, className, children, href, ...rest } = props;
    const classes = buttonClassName(variant, fullWidth, className);
    if (isExternalUrl(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      );
    }
    if (href.includes("#")) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, fullWidth, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClassName(variant, fullWidth, className)} {...rest}>
      {children}
    </button>
  );
}
