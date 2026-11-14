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
      <span className={cn("inline-flex rounded-sm bg-white", isFooter ? "px-3 py-2.5" : "px-2 py-1.5")}>
        <Image
          src="/images/brand/bac-tra-ky.webp"
          alt=""
          width={339}
          height={261}
          unoptimized
          className={cn("block w-auto", isFooter ? "h-[70px]" : "h-10")}
        />
      </span>
    </a>
  );
}
