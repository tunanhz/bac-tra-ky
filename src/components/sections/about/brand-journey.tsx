"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ABOUT_JOURNEY } from "./about-content";
import styles from "./brand-journey.module.css";

/** Cuộn tự nhiên: mốc gần tâm màn hình được nhấn mạnh, không khóa cuộn. */
export function BrandJourney() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []);
    let frame = 0;
    const update = () => {
      frame = 0;
      const target = window.innerHeight / 2;
      let nearest = 0;
      let distance = Infinity;
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const next = Math.abs(rect.top + rect.height / 2 - target);
        if (next < distance) {
          distance = next;
          nearest = index;
        }
      });
      setActive(nearest);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="hanh-trinh" aria-labelledby="journey-title" className="section-y border-b border-line/60 bg-paper">
      <div className="wrap">
        <Reveal className="mb-8 max-w-3xl lg:mb-12">
          <h3 id="journey-title" className="mt-0 mb-4 text-h2 font-bold text-gac">{ABOUT_JOURNEY.title}</h3>
          <p className="m-0 max-w-[52ch] text-base leading-relaxed text-ink-soft sm:text-lg">{ABOUT_JOURNEY.description}</p>
        </Reveal>
        <ol ref={listRef} role="list" aria-label="5 mốc hành trình của Bác Trà Ký" className={styles.list}>
          {ABOUT_JOURNEY.steps.map(({ title, description, image, imageAlt }, index) => (
            <li key={title} className={styles.step} data-active={active === index} data-complete={index < active} aria-current={active === index ? "step" : undefined}>
              <span aria-hidden="true" className={styles.marker}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.card}>
                <div className={styles.image}>
                  <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 40vw, (min-width: 768px) 42vw, 85vw" className={index === 0 || index === 2 ? "object-cover" : "object-contain p-3 sm:p-5"} />
                </div>
                <div className={styles.copy}>
                  <h4 className="mt-0 mb-3 text-xl font-bold text-son sm:text-2xl">{title}</h4>
                  <p className="m-0 max-w-[44ch] text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>
                  {index === 2 && <a className="mt-3 inline-flex min-h-11 items-center text-caption text-dong underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4" href="https://dantri.com.vn/du-lich/banh-bac-mon-ngon-tien-vua-cua-nguoi-giang-xa-2017020808104726.htm" target="_blank" rel="noopener noreferrer">Ảnh công đoạn làm bánh: Báo Dân trí</a>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
