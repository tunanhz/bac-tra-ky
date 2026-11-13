import { cn } from "@/lib/cn";

/**
 * Khung tạm cho section chưa dựng nội dung (phase 01). Phase 02/03 thay nội dung section thì bỏ import này;
 * khi không còn section nào dùng, xoá file ở bước gộp nhánh.
 */
export function StubNote({ owner, className }: { owner: string; className?: string }) {
  return (
    <div
      className={cn(
        "frame-paper mx-auto flex min-h-56 max-w-3xl items-center justify-center p-8 text-center text-ink-soft",
        className,
      )}
    >
      <p className="m-0 italic">Nội dung mục này đang được hoàn thiện ({owner}).</p>
    </div>
  );
}
