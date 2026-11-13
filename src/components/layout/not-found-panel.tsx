import { Seal } from "@/components/ornaments/seal";
import { Button } from "@/components/ui/button";

type NotFoundPanelProps = {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
};

/**
 * Khối báo "không tìm thấy" (hướng B): tấm giấy viền đôi giữa trang, triện mờ, số 404 Playfair sơn son, một nút về
 * chỗ an toàn. Dùng cho `app/not-found.tsx` và `app/tin-tuc/[slug]/not-found.tsx`.
 */
export function NotFoundPanel({ title, description, actionHref, actionLabel }: NotFoundPanelProps) {
  return (
    <section aria-labelledby="not-found-title" className="section-y mt-[68px]">
      <div className="wrap">
        <div className="frame-paper mx-auto max-w-[620px] px-6 pt-12 pb-12 text-center shadow-paper sm:px-12">
          <Seal className="mx-auto size-14 text-gac" withLotus={false} />
          <p className="eyebrow mt-6 mb-2">Lỗi 404</p>
          <h1 id="not-found-title" className="mt-0 mb-4 text-h2 font-bold text-son">
            {title}
          </h1>
          <p className="mx-auto mt-0 mb-8 max-w-[44ch] text-ink-soft">{description}</p>
          <Button href={actionHref}>{actionLabel}</Button>
        </div>
      </div>
    </section>
  );
}
