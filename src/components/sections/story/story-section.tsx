import Image from "next/image";
import { sectionHref } from "@/config/site";
import { StoryChapter } from "./story-chapter";
import { CRAFT_STEPS, STORY_CHAPTERS } from "./story-chapters";
import styles from "./story-section.module.css";

function CraftSection() {
  return (
    <section id="chuong-4" aria-labelledby="craft-title" className={styles.craftSection}>
      <header className={styles.craftHeader}>
        <Image
          src="/images/revisions/craft-village-header.webp"
          alt=""
          width={1448}
          height={352}
          sizes="100vw"
          className={styles.craftHeaderArtwork}
        />
        <div className={styles.craftIntro}>
          <h3 id="craft-title" className={styles.craftTitle}>
            Bí quyết làm nên hương vị Bánh Bác
          </h3>
          <p>
            Trải qua 4 công đoạn kỳ công để tạo nên từng chiếc Bánh Bác dẻo thơm, trọn vẹn phong vị đất Giang Xá.
          </p>
        </div>
      </header>

      {/* Canva hiện tại, trang 7: chữ riêng dễ đọc, ảnh minh họa nhỏ; giữ lưới 2×2. */}
      <ol role="list" className={styles.craftGrid}>
        {CRAFT_STEPS.map((step, i) => (
          <li key={step.title} className={styles.craftStep}>
            <div className={styles.craftStepCopy}>
              <span className={styles.craftStepNumber}>Công đoạn 0{i + 1}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
            <figure className={styles.craftFigure}>
              <Image
                src={step.src}
                alt={step.alt}
                width={694}
                height={i < 2 ? 320 : 344}
                sizes="(min-width: 1280px) 16rem, (min-width: 640px) 13rem, 12rem"
                className={styles.craftStepArtwork}
              />
              <figcaption className="sr-only">{step.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ol>

      <div className={styles.craftClosing}>
        <a
          href={sectionHref("san-pham")}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gac px-8 py-3 font-body font-bold text-be transition-colors hover:bg-gac-deep ${styles.craftProductLink}`}
        >
          Khám phá sản phẩm <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="cau-chuyen" aria-labelledby="story-title" className="w-full">
      {/* Canva trang 1–2: nền sạch do khách cung cấp, không chứa chữ chú thích. */}
      <div className={styles.intro}>
        <div className={`wrap ${styles.introContent}`}>
          <div className={styles.introCopy}>
            <h2 id="story-title" className={styles.introTitle}>
              Khám phá làng nghề Giang Xá
            </h2>
            <p className="mb-6 mt-0 font-body text-base leading-relaxed text-ink sm:text-lg">
              Theo dấu làng xưa, tìm về hương vị cũ. Ẩn mình giữa vùng đất Giang Xá, Hoài Đức, Hà Nội là câu chuyện về một thức quà truyền thống được gìn giữ qua nhiều thế hệ. Mỗi chiếc Bánh Bác không chỉ mang hương vị quê nhà mà còn chứa đựng sự khéo léo, tâm huyết và những nét đẹp văn hóa của người dân nơi đây.
            </p>
            <a
              href="#chuong-1"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gac px-8 py-3.5 font-body text-sm font-bold text-be transition-colors hover:bg-gac-deep sm:text-base"
            >
              Tìm Hiểu Thêm <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className={styles.introArtwork}>
          <Image
            src="/images/revisions/story-intro-rolling-cake.webp"
            alt="Đôi tay nghệ nhân cuộn Bánh Bác trên nền be, viền đỏ hoa văn truyền thống"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Các chương của câu chuyện tràn viền như homepage, không bọc hình chữ nhật */}
      {STORY_CHAPTERS.map((chapter) => (
        <StoryChapter key={chapter.id} chapter={chapter} />
      ))}
      <CraftSection />
    </section>
  );
}
