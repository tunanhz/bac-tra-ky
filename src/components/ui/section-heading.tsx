import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Nhãn nhỏ viết hoa giãn chữ phía trên tiêu đề. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Đoạn dẫn ngắn dưới tiêu đề. */
  description?: ReactNode;
  /** `center` (mặc định, như "sec-head" bản mẫu B) hoặc `left`. */
  align?: "center" | "left";
  /** `light` = trên nền be (tiêu đề đỏ gấc); `dark` = trên nền sơn son/ảnh tối (tiêu đề be, nhãn vàng nhũ). */
  tone?: "light" | "dark";
  /** Cấp tiêu đề; mặc định h2. */
  as?: "h1" | "h2" | "h3";
  /** id cho tiêu đề (dùng với `aria-labelledby` của section). */
  id?: string;
  className?: string;
};

/**
 * Đầu mục: nhãn nhỏ + tiêu đề Playfair giãn chữ + đoạn dẫn. Theo hướng B không gắn hoạ tiết
 * (hoạ tiết chỉ ở logo, khung hero, CTA cuối).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "mb-8 lg:mb-10",
        align === "center" ? "mx-auto max-w-[40ch] text-center" : "max-w-[46ch] text-left",
        dark && "on-dark",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow m-0">{eyebrow}</p> : null}
      <Heading id={id} className={cn("my-3 text-h2 font-bold tracking-[0.04em]", dark ? "text-be" : "text-gac")}>
        {title}
      </Heading>
      {description ? <p className={cn("m-0", dark ? "text-cream-soft" : "text-ink-soft")}>{description}</p> : null}
    </div>
  );
}
