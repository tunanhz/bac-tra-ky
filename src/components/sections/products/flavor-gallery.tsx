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
        <div className="relative aspect-[4/3] overflow-hidden bg-be-2">
          {slide.pending ? (
            <div aria-hidden="true" className="grid h-full place-content-center text-center">
              <span className="eyebrow block text-tra">Bác Trà Ký</span>
              <span className="mt-2 font-heading text-h3 text-son">{slide.name}</span>
            </div>
          ) : (
            <Image src={slide.src} alt={slide.alt} fill sizes="(min-width: 1200px) 350px, (min-width: 1024px) 29vw, 88vw" className="object-contain p-1" />
          )}
        </div>
        <figcaption aria-live={playing ? "off" : "polite"} className="caption mt-2 min-h-[2.25rem]">{slide.note ?? slide.name}</figcaption>
      </figure>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {slides.map(({ name }, index) => (
          <button
            key={name}
            type="button"
            aria-pressed={active === index}
            onClick={() => { setPlaying(false); setActive(index); }}
            className="min-h-11 cursor-pointer border border-line px-2 text-left text-sm text-son hover:border-gac aria-pressed:border-gac aria-pressed:bg-son aria-pressed:text-be"
          >
            {name}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => setPlaying((current) => !current)} className="mt-1 min-h-11 cursor-pointer text-sm text-tra underline underline-offset-4 hover:text-gac">
        {playing ? "Tạm dừng tự chuyển ảnh" : "Bật tự chuyển ảnh"}
      </button>
    </div>
  );
}
