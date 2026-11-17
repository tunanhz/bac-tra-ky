"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;
const INPUT_CLASS =
  "block min-h-11 w-full min-w-0 rounded-xl border border-nhu/60 bg-[#fffdf7] px-3.5 py-2.5 text-base text-ink placeholder:text-ink-soft/60 focus-visible:outline-gac focus-visible:border-gac shadow-inner transition-colors";
const LABEL_CLASS = "mb-1 block text-sm font-bold text-son";
const QUANTITY_BUTTON_CLASS =
  "grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-nhu/70 bg-[#fffdf7] text-lg font-bold text-son hover:border-gac hover:text-gac hover:bg-be focus-visible:outline-gac disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm";

export function OfferPreviewForm() {
  const id = useId();
  const [quantity, setQuantity] = useState("1");
  const [checked, setChecked] = useState(false);
  const adjustQuantity = (step: number) => {
    setChecked(false);
    setQuantity((current) =>
      String(Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY, (Number(current) || 1) + step))),
    );
  };

  return (
    // method="dialog" và không có name: an toàn, trình duyệt không thể gửi dữ liệu ngoài ý muốn
    <form
      method="dialog"
      autoComplete="off"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-note`}
      className="mt-5 rounded-3xl border border-nhu/80 bg-[#fdf7e5] p-5 text-left text-ink shadow-xl sm:p-6"
      onInput={() => setChecked(false)}
      onSubmit={(event) => {
        event.preventDefault();
        setChecked(true);
      }}
    >
      <div className="mb-3 text-center">
        <h4 id={`${id}-title`} className="m-0 font-display text-h3 font-bold text-gac">
          🌸 Đăng ký mua hàng 🌸
        </h4>
        <p id={`${id}-note`} className="mt-1.5 mb-0 text-xs text-ink-soft">
          Bản mẫu phục vụ thiết kế theo tài liệu hướng dẫn. Form không gửi hoặc lưu dữ liệu thật.
        </p>
      </div>

      <div className="grid gap-3.5">
        <div>
          <label htmlFor={`${id}-name`} className={LABEL_CLASS}>
            Họ và tên
          </label>
          <input
            id={`${id}-name`}
            type="text"
            required
            pattern={".*\\S.*"}
            maxLength={80}
            placeholder="Ví dụ: Nguyễn Văn A"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={LABEL_CLASS}>
            Số điện thoại
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            required
            inputMode="tel"
            pattern={"(?:0[0-9]{9}|\\+84[0-9]{9})"}
            maxLength={12}
            placeholder="Ví dụ: 0900000000"
            aria-describedby={`${id}-phone-hint`}
            className={INPUT_CLASS}
          />
          <p id={`${id}-phone-hint`} className="mt-1 mb-0 text-xs text-ink-soft">
            10 chữ số bắt đầu bằng 0, hoặc +84 và 9 chữ số.
          </p>
        </div>
        <div>
          <label htmlFor={`${id}-combo`} className={LABEL_CLASS}>
            Chọn combo
          </label>
          <select id={`${id}-combo`} required defaultValue="" className={INPUT_CLASS}>
            <option value="" disabled>
              Chọn một combo
            </option>
            <option value="cham">Chạm Ký Ức · Combo 2 bánh</option>
            <option value="gom">Gom Ký Ức · Combo 6 bánh</option>
            <option value="trao">Trao Ký Ức · Hộp quà cao cấp</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-quantity`} className={LABEL_CLASS}>
            Số lượng
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => adjustQuantity(-1)}
              disabled={Number(quantity) <= MIN_QUANTITY}
              className={QUANTITY_BUTTON_CLASS}
              aria-label="Giảm số lượng"
            >
              −
            </button>
            <input
              id={`${id}-quantity`}
              type="number"
              required
              min={MIN_QUANTITY}
              max={MAX_QUANTITY}
              step={1}
              value={quantity}
              inputMode="numeric"
              onChange={(event) => setQuantity(event.currentTarget.value)}
              className={`${INPUT_CLASS} text-center font-bold tabular-nums`}
            />
            <button
              type="button"
              onClick={() => adjustQuantity(1)}
              disabled={Number(quantity) >= MAX_QUANTITY}
              className={QUANTITY_BUTTON_CLASS}
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-address`} className={LABEL_CLASS}>
            Địa chỉ nhận hàng
          </label>
          <input
            id={`${id}-address`}
            type="text"
            required
            pattern={".*\\S.*"}
            maxLength={180}
            placeholder="Ví dụ: Số 12 phố X, Hoài Đức, Hà Nội"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        aria-label="Thử đăng ký"
        className="mt-5 rounded-full bg-gac py-3 text-base font-bold text-be shadow-md hover:bg-son-deep"
      >
        ĐẶT HÀNG NGAY
      </Button>

      <p
        role="status"
        className="mt-2.5 mb-0 text-center text-sm font-medium text-tra"
      >
        {checked
          ? "Đã kiểm tra thông tin mẫu thành công! Không có đơn hàng nào được gửi."
          : ""}
      </p>
    </form>
  );
}
