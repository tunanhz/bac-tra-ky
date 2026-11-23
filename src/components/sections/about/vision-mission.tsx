import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ABOUT_STATEMENTS } from "./about-content";
import styles from "./vision-mission.module.css";

/** Current Canva page 4: approved red panels with a gentle, motion-safe cake pulse. */
export function VisionMission() {
  return (
    <section aria-labelledby="vision-mission-title" className={styles.section}>
      <Reveal className={styles.composition}>
        <h3 id="vision-mission-title" className={styles.heading}>
          TẦM NHÌN &amp; SỨ MỆNH
        </h3>
        <div className={styles.statements}>
          {ABOUT_STATEMENTS.map(({ title, description }, index) => (
            <article key={title} className={index === 0 ? styles.vision : styles.mission}>
              <h4 className={styles.label}>{title}</h4>
              <p>{description}</p>
            </article>
          ))}
          <figure className={styles.cake}>
            <Image
              src="/images/story/banh-bac-boc-mang.webp"
              alt="Những chiếc Bánh Bác đỏ gấc với nhân đậu xanh vàng, được gói trong màng trong suốt"
              fill
              sizes="(min-width: 1100px) 23vw, (min-width: 900px) 28vw, (min-width: 480px) 330px, 72vw"
              className={styles.cakeImage}
            />
          </figure>
        </div>
        <div className={styles.gift}>
          <Image
            src="/images/brand/home-hero-bac-tra-ky.webp"
            alt="Hộp quà Bác Trà Ký cùng Bánh Bác, ấm trà và hoa sen trên lụa đỏ"
            fill
            sizes="(min-width: 1100px) 32vw, (min-width: 900px) 48vw, (min-width: 600px) 430px, 82vw"
            className={styles.giftImage}
          />
        </div>
      </Reveal>
    </section>
  );
}
