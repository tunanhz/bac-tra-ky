/** Nút lọc — chép `.chip-btn` của bản mẫu B: viền mảnh, đang chọn = nền sơn son. */
export const CHIP_CLASS =
  "min-h-11 cursor-pointer border border-line bg-transparent px-4.5 font-body text-[0.86rem] text-ink transition-colors duration-250 ease-son hover:border-gac aria-pressed:border-son aria-pressed:bg-son aria-pressed:text-be";

export type FilterOption<T extends string> = { value: T; label: string };

type FilterChipsProps<T extends string> = {
  options: ReadonlyArray<FilterOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Nhãn của nhóm nút cho trình đọc màn hình. */
  label: string;
  className?: string;
};

/** Dãy nút lọc một lựa chọn (`aria-pressed`) — dùng cho Danh mục sản phẩm và Tin tức. */
export function FilterChips<T extends string>({ options, value, onChange, label, className }: FilterChipsProps<T>) {
  return (
    <div className={className ?? "mb-8 flex flex-wrap justify-center gap-2"} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={CHIP_CLASS}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
