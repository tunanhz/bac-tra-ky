"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type FlavorSlide =
  | { name: string; src: string; alt: string; note?: string; pending?: false }
  | { name: string; note: string; pending: true };

const ROTATION_DELAY = 5500;

export function FlavorGallery({ slides, label }: { slides: readonly FlavorSlide[]; label: string }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPlaying(!motion.matches);
    updateMotion();
    motion.addEventListener("change", updateMotion);
    return () => motion.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused) return;
    const available = slides.flatMap((item, index) => item.pending ? [] : [index]);
    if (available.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => available[(available.indexOf(current) + 1) % available.length]);
    }, ROTATION_DELAY);
    return () => window.clearInterval(timer);
  }, [focused, hovered, playing, slides]);

  const slide = slides[active];
  if (!slide) return null;

  const choose = (index: number) => {
    setPlaying(false);
    setActive(index);
  };
  const step = (offset: number) => choose((active + offset + slides.length) % slides.length);

  return (
    <div
      role="group"
      aria-label={`Ảnh và hương vị ${label}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <figure className="m-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-be-2/50">
          {slide.pending ? (
            <div aria-hidden="true" className="grid h-full place-content-center px-5 text-center">
              <span className="eyebrow block text-tra">Bác Trà Ký</span>
              <span className="mt-2 font-display text-h3 font-bold text-son">{slide.name}</span>
              <span className="mx-auto mt-3 h-px w-10 bg-dong/60" />
            </div>
          ) : (
            <Image src={slide.src} alt={slide.alt} fill sizes="(min-width: 1200px) 350px, (min-width: 1024px) 29vw, (min-width: 768px) 44vw, 88vw" className="object-contain" />
          )}
        </div>
        <figcaption aria-live={playing ? "off" : "polite"} className="flex min-h-14 items-start justify-between gap-2 px-1 pt-3">
          <span className="caption text-ink-soft">{slide.note ?? slide.name}</span>
          <span className="shrink-0 text-xs font-bold text-dong tabular-nums" aria-label={`Mục ${active + 1} trên ${slides.length}`}>
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>
      <div className="flex flex-wrap gap-1.5 border-t border-line pt-3">
        {slides.map(({ name }, index) => (
          <button
            key={name}
            type="button"
            aria-pressed={active === index}
            onClick={() => choose(index)}
            className="min-h-11 cursor-pointer rounded-full border border-line px-2.5 text-left text-sm text-son transition-colors hover:border-gac aria-pressed:border-gac aria-pressed:bg-son aria-pressed:text-be"
          >
            {name}
          </button>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex gap-1.5">
            <button type="button" onClick={() => step(-1)} aria-label="Ảnh trước" className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-son transition-colors hover:border-gac hover:bg-gac hover:text-be">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Ảnh tiếp theo" className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-son transition-colors hover:border-gac hover:bg-gac hover:text-be">
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <button type="button" onClick={() => setPlaying((current) => !current)} className="min-h-11 cursor-pointer text-sm text-tra underline underline-offset-4 hover:text-gac">
            {playing ? "Tạm dừng tự chuyển ảnh" : "Bật tự chuyển ảnh"}
          </button>
        </div>
      )}
    </div>
  );
}
