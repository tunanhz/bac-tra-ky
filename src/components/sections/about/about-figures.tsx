import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FigureProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Chú thích kiểu bảo tàng dưới ảnh (nguồn, giấy phép...). */
  caption: ReactNode;
  /** Class cho khung ảnh (tỷ lệ/chiều cao). */
  mediaClassName?: string;
  className?: string;
};

/** Ảnh trên tấm giấy viền đôi (`frame-paper`) với chú thích nghiêng bên dưới. Dùng trên nền be. */
export function PaperFigure({ src, alt, sizes, caption, mediaClassName, className }: FigureProps) {
  return (
    <figure className={cn("frame-paper m-0 rounded-2xl p-3 shadow-paper", className)}>
      <div className={cn("relative overflow-hidden rounded-xl", mediaClassName)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className="caption px-1.5 pt-3 pb-1 text-center">{caption}</figcaption>
    </figure>
  );
}

/**
 * Ảnh trong khung sơn son: nền son đậm đệm 14px, bo góc mềm mại, chú thích màu kem.
 */
export function LacquerFigure({ src, alt, sizes, caption, mediaClassName, className }: FigureProps) {
  return (
    <figure
      className={cn(
        "on-dark m-0 flex flex-col rounded-2xl bg-son-deep p-3.5 shadow-md",
        className,
      )}
    >
      <div className={cn("relative flex-1 overflow-hidden rounded-xl", mediaClassName)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className="px-1.5 pt-3 pb-0.5 text-center text-[0.74rem] leading-snug text-cream-muted italic">
        {caption}
      </figcaption>
    </figure>
  );
}

/** Dòng ghi công ảnh Wikimedia Commons (CC BY / CC BY-SA): tác giả + giấy phép, liên kết tới trang nguồn. */
export function CommonsCredit({ author, license, href }: { author: string; license: string; href: string }) {
  return (
    <>
      Ảnh: {author} ·{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
        {license}, Wikimedia Commons
      </a>
    </>
  );
}
