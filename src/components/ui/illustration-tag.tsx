import { cn } from "@/lib/cn";

export const ILLUSTRATION_LABEL = "Ảnh minh hoạ – sẽ thay ảnh thật";

type IllustrationTagProps = {
  /** Mặc định "Ảnh minh hoạ – sẽ thay ảnh thật". */
  label?: string;
  className?: string;
};

/**
 * Nhãn nhỏ "Ảnh minh hoạ – sẽ thay ảnh thật" đặt ở đáy khung ảnh (khung cha cần `relative`). Một kiểu duy nhất cho
 * card sản phẩm, card tin, ảnh mục Về chúng tôi và khung thay ảnh (`ImagePlaceholder`) — khi ảnh lỗi, hai nhãn trùng
 * khít nhau.
 */
export function IllustrationTag({ label = ILLUSTRATION_LABEL, className }: IllustrationTagProps) {
  return (
    <span
      className={cn(
        "absolute inset-x-0 bottom-2.5 mx-auto w-fit max-w-[92%] bg-be/95 px-2.5 py-1 text-center text-[0.62rem] leading-snug tracking-[0.06em] text-ink-soft",
        className,
      )}
    >
      {label}
    </span>
  );
}
