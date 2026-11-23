"use client";

import { useEffect, useState, type ReactNode } from "react";

const UNITS: readonly { seconds: number; label: string; cycle?: number; fixedValue?: string }[] = [
  { seconds: 86400, label: "Ngày", fixedValue: "00" },
  { seconds: 3600, label: "Giờ", cycle: 24 },
  { seconds: 60, label: "Phút", cycle: 60 },
  { seconds: 1, label: "Giây", cycle: 60 },
];

export function OfferWindow({ endTime, serverNow, children, expired, intro, artwork, panelClassName }: {
  endTime: number;
  serverNow: number;
  children: ReactNode;
  expired: ReactNode;
  intro?: ReactNode;
  artwork?: ReactNode;
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
  // Always show the actual remaining duration; never restart a daily urgency clock.
  const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));

  return (
    <div className="mx-auto w-full max-w-5xl grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
      <div className="min-w-0 lg:col-span-5 flex flex-col justify-center">
        {intro}
        <div className={panelClassName}>
          <p className="eyebrow mt-0 mb-1.5 text-center lg:text-left text-xs text-nhu">Thời gian ưu đãi còn lại</p>
          <dl className="mx-auto lg:mx-0 mt-0 mb-0 grid max-w-xs grid-cols-4 gap-1.5" role="timer" aria-label="Thời gian ưu đãi còn lại">
            {UNITS.map(({ seconds, label, cycle, fixedValue }) => (
              <div key={label} className="flex min-w-0 flex-col-reverse items-center rounded-lg border border-nhu bg-be px-1 py-1 text-center text-son">
                <dt className="text-xs leading-tight">{label}</dt>
                <dd className="m-0 font-display text-h3 font-bold tabular-nums">
                  {fixedValue ?? String(cycle ? Math.floor(remaining / seconds) % cycle : Math.floor(remaining / seconds)).padStart(2, "0")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {artwork}
      </div>
      <div className="min-w-0 lg:col-span-7">
        {children}
      </div>
    </div>
  );
}
