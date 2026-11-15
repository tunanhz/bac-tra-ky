import { Seal } from "@/components/ornaments/seal";
import { cn } from "@/lib/cn";
import { IllustrationTag } from "./illustration-tag";

export const IMAGE_UNAVAILABLE_LABEL = "Không tải được ảnh";

type ImagePlaceholderProps = {
  /** Mô tả ảnh không hiển thị (đọc cho trình đọc màn hình). */
  alt?: string;
  /** Nhãn hiển thị; mặc định "Không tải được ảnh". */
  label?: string;
  /** Kích thước/tỷ lệ do nơi dùng quyết định, vd. `aspect-[4/5] w-full`. Mặc định lấp đầy khung cha. */
  className?: string;
};

/**
 * Khung dự phòng khi ảnh không tải được: nền giấy be-2 có vân giấy dó, triện mờ ở giữa,
 * nhãn nhỏ ở đáy.
 */
export function ImagePlaceholder({ alt, label = IMAGE_UNAVAILABLE_LABEL, className }: ImagePlaceholderProps) {
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
