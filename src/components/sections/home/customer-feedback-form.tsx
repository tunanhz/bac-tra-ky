"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

const RATINGS = [1, 2, 3, 4, 5] as const;
const MESSAGE_LIMIT = 400;
const INPUT_CLASS = "block w-full min-w-0 border border-line bg-be px-3 py-2.5 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gac";

export function CustomerFeedbackForm({ email }: { email: string }) {
  const id = useId();
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const note = message.trim();
  const subject = encodeURIComponent("Đánh giá gửi Bác Trà Ký");
  const emailHref = `mailto:${encodeURIComponent(email).replace("%40", "@")}?subject=${subject}`;
  const body = encodeURIComponent(`${rating ? `Điểm đánh giá: ${rating}/5\r\n\r\n` : ""}${note.replace(/\r?\n/g, "\r\n").toWellFormed()}`);

  return (
    <fieldset aria-describedby={`${id}-help`} className="m-0 min-w-0 border-0 p-0">
      <legend className="sr-only">Viết đánh giá cho Bác Trà Ký</legend>
      <label htmlFor={`${id}-rating`} className="mb-1 block font-bold text-son">Mức đánh giá <span className="font-normal">(không bắt buộc)</span></label>
      <select id={`${id}-rating`} value={rating} onChange={(event) => setRating(event.currentTarget.value)} className={INPUT_CLASS}>
        <option value="">Chọn số sao</option>
        {RATINGS.map((stars) => <option key={stars} value={stars}>{stars}/5 sao</option>)}
      </select>
      <label htmlFor={`${id}-note`} className="mt-4 mb-1 block font-bold text-son">Cảm nhận của bạn</label>
      <textarea
        id={`${id}-note`}
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        rows={3}
        maxLength={MESSAGE_LIMIT}
        placeholder="Bạn thích điểm nào? Chúng mình có thể làm gì tốt hơn?"
        className={`${INPUT_CLASS} resize-y`}
      />
      <p className="mt-1 mb-4 text-right text-sm text-tra">{message.length}/{MESSAGE_LIMIT} ký tự</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {note ? (
          <Button href={`${emailHref}&body=${body}`} variant="primary">Mở email để gửi</Button>
        ) : (
          <Button disabled variant="primary" className="disabled:cursor-not-allowed disabled:opacity-60">Mở email để gửi</Button>
        )}
        <a href={emailHref} className="inline-flex min-h-11 items-center text-sm text-son underline underline-offset-4">Soạn email theo cách khác</a>
      </div>
      <p id={`${id}-help`} className="mt-2 mb-0 text-sm leading-relaxed text-tra">
        Website mở bản nháp trong ứng dụng email. Bạn cần bấm Gửi trong email; đánh giá sẽ không tự đăng lên web.
      </p>
    </fieldset>
  );
}
