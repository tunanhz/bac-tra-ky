import { Seal } from "@/components/ornaments/seal";
import { sectionHref, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** `header`: triện 36px + chữ một dòng; `footer`: triện 48px, chữ lớn xuống dòng. */
  size?: "header" | "footer";
  className?: string;
};

/**
 * Logo tạm: triện son "BTK" + chữ "Bác Trà Ký" viết hoa giãn chữ (bản mẫu B).
 * TODO: thay dữ liệu thật — thay bằng logo chính thức của Bác Trà Ký (file riêng, chỉ sửa component này).
 */
export function Logo({ size = "header", className }: LogoProps) {
  const isFooter = size === "footer";
  return (
    <a
      href={sectionHref("trang-chu")}
      aria-label={`${siteConfig.name} — về trang chủ`}
      className={cn(
        "inline-flex items-center text-be no-underline",
        isFooter ? "flex-col items-start gap-3" : "min-h-11 gap-2.5",
        className,
      )}
    >
      <Seal className={cn("shrink-0 text-gac", isFooter ? "size-12" : "size-9")} />
      <span
        className={cn(
          "font-heading font-bold tracking-[0.12em] uppercase",
          isFooter ? "text-[1.45rem] leading-tight" : "text-[1.05rem] leading-none sm:text-[1.15rem]",
        )}
      >
        {siteConfig.name}
      </span>
    </a>
  );
}
