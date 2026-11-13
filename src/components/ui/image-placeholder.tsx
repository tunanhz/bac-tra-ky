import { Seal } from "@/components/ornaments/seal";
import { cn } from "@/lib/cn";
import { ILLUSTRATION_LABEL, IllustrationTag } from "./illustration-tag";

export { ILLUSTRATION_LABEL };

type ImagePlaceholderProps = {
  /** Mô tả ảnh sẽ đặt ở đây (đọc cho trình đọc màn hình). */
  alt?: string;
  /** Nhãn hiển thị; mặc định "Ảnh minh hoạ – sẽ thay ảnh thật". */
  label?: string;
  /** Kích thước/tỷ lệ do nơi dùng quyết định, vd. `aspect-[4/5] w-full`. Mặc định lấp đầy khung cha. */
  className?: string;
};

/**
 * Khung thay ảnh khi chưa có ảnh thật (hoặc file ảnh chưa tồn tại): nền giấy be-2 có vân giấy dó, triện mờ ở giữa,
 * nhãn nhỏ ở đáy.
 */
export function ImagePlaceholder({ alt, label = ILLUSTRATION_LABEL, className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt ? `${alt} (${label})` : label}
      className={cn(
        "relative flex size-full min-h-24 items-center justify-center overflow-hidden bg-be-2",
        "bg-[radial-gradient(circle_at_30%_20%,rgb(122_92_20/0.12)_0_1px,transparent_1.5px),radial-gradient(circle_at_70%_80%,rgb(110_10_16/0.07)_0_1px,transparent_1.5px)]",
        "bg-size-[9px_9px,13px_13px]",
        className,
      )}
    >
      <Seal className="size-14 text-son/20" withLotus={false} />
      <IllustrationTag label={label} />
    </div>
  );
}
