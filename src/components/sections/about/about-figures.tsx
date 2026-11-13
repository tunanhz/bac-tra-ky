import Image from "next/image";
import type { ReactNode } from "react";
import { IllustrationTag } from "@/components/ui/illustration-tag";
import { cn } from "@/lib/cn";

type FigureProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Chú thích kiểu bảo tàng dưới ảnh (nguồn, giấy phép...). */
  caption: ReactNode;
  /** Ảnh đặt cạnh nội dung nói về bánh nhưng không phải Bánh Bác thật → hiện nhãn minh hoạ trên ảnh. */
  illustration?: boolean;
  /** Class cho khung ảnh (tỷ lệ/chiều cao). */
  mediaClassName?: string;
  className?: string;
};

/** Ảnh trên tấm giấy viền đôi (`frame-paper`) với chú thích nghiêng bên dưới. Dùng trên nền be. */
export function PaperFigure({ src, alt, sizes, caption, illustration, mediaClassName, className }: FigureProps) {
  return (
    <figure className={cn("frame-paper m-0 p-3 shadow-paper", className)}>
      <div className={cn("relative overflow-hidden", mediaClassName)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        {illustration ? <IllustrationTag /> : null}
      </div>
      <figcaption className="caption px-1.5 pt-3 pb-1 text-center">{caption}</figcaption>
    </figure>
  );
}

/**
 * Ảnh trong khung passe-partout sơn son (khối `.band figure` của bản mẫu B): nền son đậm đệm 14px, chỉ vàng lùi vào
 * 8px, chú thích màu kem.
 */
export function LacquerFigure({ src, alt, sizes, caption, illustration, mediaClassName, className }: FigureProps) {
  return (
    <figure
      className={cn(
        "on-dark m-0 flex flex-col bg-son-deep p-3.5 outline-1 -outline-offset-8 outline-[rgb(226_191_110/0.55)] outline-solid",
        className,
      )}
    >
      <div className={cn("relative flex-1 overflow-hidden", mediaClassName)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        {illustration ? <IllustrationTag /> : null}
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
