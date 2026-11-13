import { FacebookIcon } from "@/components/layout/social-icons";
import { buttonClassName, type ButtonVariant } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

type FacebookButtonProps = {
  /** URL trang Facebook; `null` = chưa có (mặc định lấy `siteConfig.facebookUrl`). */
  url?: string | null;
  variant?: ButtonVariant;
  className?: string;
};

export const FACEBOOK_BUTTON_LABEL = "Nhắn qua Facebook";

/**
 * Nút "Nhắn qua Facebook" (user chốt 13/11/2026):
 * - Có URL → liên kết thật, mở tab mới (`rel="noopener noreferrer"`).
 * - Chưa có URL → nút mờ không bấm được: không có `href`, `aria-disabled="true"`, chữ kèm "(đang cập nhật)".
 */
export function FacebookButton({ url = siteConfig.facebookUrl, variant = "outline", className }: FacebookButtonProps) {
  const icon = <FacebookIcon className="size-4 shrink-0" />;
  if (!url) {
    return (
      <span
        role="link"
        aria-disabled="true"
        className={buttonClassName(variant, false, `pointer-events-none select-none ${className ?? ""}`)}
      >
        {icon}
        <span>
          {FACEBOOK_BUTTON_LABEL}{" "}
          <span className="font-normal whitespace-nowrap normal-case tracking-normal">{siteConfig.pendingLabel}</span>
        </span>
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClassName(variant, false, className)}>
      {icon}
      <span>{FACEBOOK_BUTTON_LABEL}</span>
    </a>
  );
}
