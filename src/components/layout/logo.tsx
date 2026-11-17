import Image from "next/image";
import { sectionHref, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  size?: "header" | "footer";
  className?: string;
};

export function Logo({ size = "header", className }: LogoProps) {
  const isFooter = size === "footer";
  return (
    <a
      href={sectionHref("trang-chu")}
      aria-label={`${siteConfig.name} — về trang chủ`}
      className={cn("inline-flex min-h-11 items-center no-underline", className)}
    >
      <Image
        src="/images/brand/bac-tra-ky.webp"
        alt=""
        width={1615}
        height={1253}
        unoptimized
        className={cn(
          "block w-auto [filter:drop-shadow(0_0_1px_#fff1cf)_drop-shadow(0_0_2px_#f5d597)]",
          isFooter ? "h-[120px] sm:h-[145px]" : "h-12",
        )}
      />
    </a>
  );
}
