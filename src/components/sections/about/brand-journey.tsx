"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ABOUT_JOURNEY } from "./about-content";
import styles from "./brand-journey.module.css";

/** Natural scrolling: vertical milestones on phones; horizontal progress on desktop. */
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
      const rectangles = items.map(item => item.getBoundingClientRect());
      const first = rectangles[0];
      const horizontal = first && first.height > 0 && rectangles.length > 1
        && rectangles.every(rect => Math.abs(rect.top - first.top) < 1);
      if (horizontal) {
        // One desktop row shares a Y center: advance across it as the row crosses
        // the viewport midpoint rather than always selecting the leftmost card.
        const progress = (target - first.top) / first.height;
        nearest = Math.max(0, Math.min(items.length - 1, Math.floor(progress * items.length)));
      } else {
        rectangles.forEach((rect, index) => {
          const next = Math.abs(rect.top + rect.height / 2 - target);
          if (next < distance) {
            distance = next;
            nearest = index;
          }
        });
      }
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
    <section id="hanh-trinh" aria-labelledby="journey-title" className={styles.section}>
      {/* Original clean Canva page 6 layers, not a rendered feedback slide. */}
      <Image src="/images/revisions/feedback-journey-border-top.png" alt="" aria-hidden="true" width={1588} height={38} sizes="100vw" className={styles.topBorder} />
      <Image src="/images/revisions/feedback-journey-tea-tray.png" alt="" aria-hidden="true" width={800} height={400} sizes="(min-width: 1560px) 685px, (min-width: 655px) 44vw, 288px" className={styles.teaTray} />
      <div className={styles.content}>
        <Reveal className={styles.intro}>
          <h3 id="journey-title" className="mt-0 mb-4 text-h2 font-bold text-gac">{ABOUT_JOURNEY.title}</h3>
          <p className={styles.description}>{ABOUT_JOURNEY.description}</p>
        </Reveal>
        <ol ref={listRef} role="list" aria-label="5 mốc hành trình của Bác Trà Ký" className={styles.list}>
          {ABOUT_JOURNEY.steps.map(({ title, description, image, imageAlt }, index) => (
            <li key={title} className={styles.step} data-active={active === index} data-complete={index < active} aria-current={active === index ? "step" : undefined} onFocus={() => setActive(index)}>
              <span aria-hidden="true" className={styles.marker}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.card}>
                <div className={styles.image}>
                  <Image src={image} alt={imageAlt} fill sizes="(min-width: 1440px) 250px, (min-width: 1024px) 18vw, (min-width: 640px) 32vw, 82vw" className={index === 0 || index === 2 ? "object-cover" : "object-contain p-3 sm:p-5"} />
                </div>
                <div className={styles.copy}>
                  <h4 className={styles.title}>{title}</h4>
                  <p className={styles.body}>{description}</p>
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
