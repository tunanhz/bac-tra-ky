import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { StoryChapter as StoryChapterData } from "./story-chapters";
import styles from "./story-section.module.css";

export function StoryChapter({
  chapter,
}: {
  chapter: StoryChapterData;
  alignRight?: boolean;
}) {
  const titleId = `${chapter.id}-title`;

  // Canva trang 4–5: chữ trái, ảnh trên giấy ở giữa, hai ảnh dọc bên phải.
  if (chapter.id === "chuong-1") {
    const [entrance, courtyard, village] = chapter.relatedPhotos ?? [];
    return (
      <article id={chapter.id} aria-labelledby={titleId} className={styles.villageSection}>
        <div className={styles.villageBackdrop} aria-hidden="true">
          <Image src={chapter.image.src} alt="" fill sizes="100vw" className={styles.villageBackdropImage} />
        </div>
        <Reveal className={styles.villageComposition}>
          <div className={styles.villageCopy}>
            <h3 id={titleId} className={styles.villageTitle}>{chapter.heading}</h3>
            <p className={`${styles.villageLead} italic text-tra`}>{chapter.paragraphs[0]}</p>
            <div aria-hidden="true" className={styles.villageRule} />
            <div className={styles.villageBody}>
              {chapter.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          {village && (
            <figure data-village-paper className={styles.villagePaper}>
              <div className={styles.villagePaperPhoto}>
                <Image src={village.src} alt={village.alt} fill sizes="(min-width: 1024px) 21vw, (min-width: 640px) 44vw, 85vw" className={styles.villagePhoto} />
              </div>
              <figcaption>{village.caption}</figcaption>
            </figure>
          )}
          <div data-village-photo-stack className={styles.villagePhotoStack}>
            {[entrance, courtyard].filter((photo) => photo !== undefined).map((photo) => (
              <figure key={photo.src} className={styles.villagePhotoCard}>
                <div className={styles.villageCardImage}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 42vw" className={styles.villagePhoto} />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </article>
    );
  }

  // Chapter 2: Dấu ấn lịch sử (Slide 3: tràn viền toàn màn hình như homepage, không bọc hình chữ nhật)
  if (chapter.id === "chuong-2") {
    return (
      <article id={chapter.id} aria-labelledby={titleId} className="relative w-full overflow-hidden bg-be-2/30 scroll-mt-24 py-12 sm:py-16 lg:py-20 border-b border-line/60">
        <div className="wrap relative z-10">
          <Reveal className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
            {/* Ảnh bên trái với hiệu ứng mềm viền / blur shadow aura */}
            <figure className="relative m-0 md:col-span-5 lg:col-span-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-gac/20 blur-2xl"
              />
              <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gac/20">
                <Image
                  src={chapter.image.src}
                  alt={chapter.image.alt}
                  fill
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="caption px-1 pt-3 text-center text-ink-soft">
                {chapter.image.caption}
              </figcaption>
            </figure>

            {/* Text bên phải - Tiêu đề to ra theo Slide 3 */}
            <div className="min-w-0 md:col-span-7 lg:col-span-7">
              <h3
                id={titleId}
                className="mt-0 mb-4 font-display text-3xl font-bold leading-tight text-gac sm:text-4xl lg:text-5xl"
              >
                {chapter.heading}
              </h3>
              <div className="space-y-3.5 text-base leading-relaxed text-ink-soft sm:text-lg">
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="m-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </article>
    );
  }

  // Chapter 3: Hương vị quê nhà (Slide 4: tràn viền toàn màn hình như homepage, không bọc hình chữ nhật)
  return (
    <article id={chapter.id} aria-labelledby={titleId} className="relative w-full overflow-hidden bg-[#fae4cf] scroll-mt-24 border-b border-line/60">
      <Reveal className="relative flex min-h-[560px] flex-col justify-center lg:min-h-[640px]">
        {/* Ảnh nền sản vật tiến vua tràn viền */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <figure className="relative m-0 h-full w-full">
            <Image
              src={chapter.image.src}
              alt={chapter.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-right lg:origin-right lg:scale-100 lg:translate-x-0"
            />
            <figcaption className="sr-only">{chapter.image.caption}</figcaption>
          </figure>
          {/* Scrim overlay: làm dịu nền phía trái để chữ đọc rõ, trong khi phía phải giữ nguyên ảnh chụp sản phẩm rực rỡ */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fae4cf] via-[#fae4cf]/90 to-transparent lg:w-[58%] xl:w-[54%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#fae4cf]/90 lg:hidden"
          />
        </div>

        <div className="wrap relative z-10 w-full py-12 sm:py-16 lg:py-20">
          <div className="w-full lg:w-[62%] lg:max-w-[740px] xl:w-[60%] xl:max-w-[840px] 2xl:max-w-[920px]">
            <h3
              id={titleId}
              className="mt-0 mb-4 font-display text-2xl font-bold leading-[1.25] text-gac sm:text-3xl lg:text-4xl xl:text-5xl"
            >
              {chapter.heading}
            </h3>

            <div className="space-y-3 font-body text-sm leading-relaxed text-ink sm:space-y-3.5 sm:text-base">
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph} className="m-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Dải Ý TƯỞNG ĐƯỢC HÌNH THÀNH theo Canva layout */}
            <div className="mt-6 sm:mt-7">
              <div className="relative inline-flex items-center rounded-md bg-[#8e0b16] px-4 py-1.5 shadow-md">
                <span className="font-heading text-xs font-bold tracking-widest text-[#fdf7e5] uppercase sm:text-sm">
                  Ý TƯỞNG ĐƯỢC HÌNH THÀNH
                </span>
              </div>
              <p className="mt-3 mb-0 font-body text-sm leading-relaxed text-ink font-medium italic sm:text-base">
                &ldquo;Từ tình yêu dành cho những giá trị truyền thống và mong muốn đưa đặc sản địa phương đến gần hơn với cộng đồng, Bác Trà Ký ra đời với ý tưởng kết hợp Bánh Bác và trà Sen, tạo nên một trải nghiệm thưởng thức hài hòa, đậm đà bản sắc Việt.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
