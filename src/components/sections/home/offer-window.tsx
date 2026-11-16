"use client";

import { useEffect, useState, type ReactNode } from "react";

const UNITS: readonly { seconds: number; label: string; cycle?: number }[] = [
  { seconds: 86400, label: "Ngày" },
  { seconds: 3600, label: "Giờ", cycle: 24 },
  { seconds: 60, label: "Phút", cycle: 60 },
  { seconds: 1, label: "Giây", cycle: 60 },
];

export function OfferWindow({ endTime, serverNow, children, expired, intro, panelClassName }: {
  endTime: number;
  serverNow: number;
  children: ReactNode;
  expired: ReactNode;
  intro?: ReactNode;
  panelClassName?: string;
}) {
  const [now, setNow] = useState(serverNow);

  useEffect(() => {
    // Đồng hồ đếm theo mốc server, kể cả khi giờ máy khách bị lệch.
    const started = performance.now();
    const tick = () => {
      const current = serverNow + (performance.now() - started);
      setNow(current);
      if (current >= endTime) window.clearInterval(timer);
    };
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [endTime, serverNow]);

  if (now >= endTime) return expired;
  const remaining = Math.ceil((endTime - now) / 1000);

  return (
    <>
      {intro}
      <div className={panelClassName}>
        <p className="eyebrow mt-0 mb-2 text-nhu">Thời gian ưu đãi còn lại</p>
        <dl className="mx-auto mt-0 mb-1 grid max-w-sm grid-cols-4 gap-1.5" role="timer" aria-label="Thời gian ưu đãi còn lại">
          {UNITS.map(({ seconds, label, cycle }) => (
            <div key={label} className="flex min-w-0 flex-col-reverse items-center rounded-lg border border-nhu bg-be px-1 py-2 text-center text-son">
              <dt className="text-xs">{label}</dt>
              <dd className="m-0 font-display text-lg font-bold tabular-nums sm:text-h3">
                {String(cycle ? Math.floor(remaining / seconds) % cycle : Math.floor(remaining / seconds)).padStart(2, "0")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {children}
    </>
  );
}
