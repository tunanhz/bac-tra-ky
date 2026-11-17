import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import type { StoryChapter as StoryChapterData } from "./story-chapters";

export function StoryChapter({
  chapter,
  alignRight = false,
}: {
  chapter: StoryChapterData;
  alignRight?: boolean;
}) {
  const titleId = `${chapter.id}-title`;

  if (chapter.id === "chuong-1") {
    return (
      <article id={chapter.id} aria-labelledby={titleId} className="scroll-mt-24">
        <Reveal className="relative overflow-hidden rounded-3xl bg-[#fcf7ea] shadow-sm">
          <div className="relative flex min-h-[560px] items-center lg:min-h-[660px] xl:min-h-[720px]">
            {/* Background scenic photo on the right matching img_001 / img_002 */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <figure className="relative m-0 h-full w-full">
                <Image
                  src={chapter.image.src}
                  alt={chapter.image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1491px"
                  className="object-cover object-right-bottom lg:object-right"
                />
                <figcaption className="sr-only">{chapter.image.caption}</figcaption>
              </figure>
              {/* Soft gradient on desktop to blend seamlessly with left content */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fcf7ea] via-[#fcf7ea]/95 to-transparent lg:w-[56%]"
              />
              {/* Subtle translucent tint on mobile to maintain contrast */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#fcf7ea]/50 lg:hidden"
              />
            </div>

            {/* Left text column matching img_001 */}
            <div className="relative z-10 w-full p-6 sm:p-9 md:p-11 lg:w-[52%] lg:p-12 xl:w-[48%] xl:p-14">
              <div className="mb-3 flex items-center gap-2.5 sm:mb-4">
                <Image
                  src="/images/brand/logo.png"
                  alt="Bác Trà Ký"
                  width={28}
                  height={28}
                  className="size-7 object-contain"
                />
                <span className="text-son/40">|</span>
                <span className="border-b-2 border-gac pb-0.5 text-xs font-bold tracking-wider text-son uppercase sm:text-sm">
                  {chapter.title}
                </span>
              </div>

              <h3
                id={titleId}
                className="mt-0 mb-3 font-display text-2xl font-bold leading-[1.18] text-gac sm:mb-4 sm:text-3xl lg:text-4xl xl:text-5xl"
              >
                {chapter.heading}
              </h3>

              <p className="mt-0 mb-3 font-serif text-base font-medium leading-relaxed text-ink italic sm:mb-4 sm:text-lg">
                {chapter.paragraphs[0]}
              </p>

              {/* Red decorative brush flourish */}
              <div
                aria-hidden="true"
                className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-gac via-gac/80 to-transparent sm:mb-5"
              />

              <div className="space-y-3 text-sm leading-relaxed text-ink-soft sm:space-y-3.5 sm:text-base">
                {chapter.paragraphs.slice(1).map((paragraph) => (
                  <p key={paragraph} className="m-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {chapter.relatedPhotos?.length ? (
            <section
              aria-label="Ảnh tư liệu làng Giang Xá"
              className="relative z-10 border-t border-line/40 px-6 pt-6 pb-6 sm:px-9 sm:pb-9 lg:px-12 lg:pb-12"
            >
              <p className="eyebrow m-0 mb-3 text-tra">Ảnh tư liệu làng Giang Xá</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {chapter.relatedPhotos.map((photo) => (
                  <figure
                    key={photo.src}
                    className="m-0 min-w-0 overflow-hidden rounded-2xl bg-be/80 p-2.5 shadow-sm"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1200px) 535px, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="caption px-1 pt-2 text-center text-ink-soft">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </Reveal>
      </article>
    );
  }

  return (
    <article id={chapter.id} aria-labelledby={titleId} className="scroll-mt-24">
      <Reveal className="grid items-center gap-6 rounded-3xl bg-be/70 p-6 shadow-sm md:grid-cols-2 md:gap-10 md:p-10 lg:gap-14">
        <figure className={cn("m-0 min-w-0", alignRight && "md:order-2")}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-be-2/60 shadow-sm">
            <Image
              src={chapter.image.src}
              alt={chapter.image.alt}
              fill
              sizes="(min-width: 1200px) 515px, (min-width: 768px) 46vw, 91vw"
              className={chapter.image.contain ? "object-contain p-3" : "object-cover"}
            />
          </div>
          <figcaption className="caption px-1 pt-3 text-center">
            {chapter.image.caption}
          </figcaption>
        </figure>
        <div className="min-w-0 px-1 pb-2 md:px-0 md:pb-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="border-b-2 border-gac pb-0.5 text-xs font-bold tracking-wider text-son uppercase sm:text-sm">
              {chapter.title}
            </span>
          </div>
          <h3 id={titleId} className="mt-2 mb-4 text-h3 font-bold text-gac">
            {chapter.heading}
          </h3>
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-0 mb-3 text-ink-soft last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
      {chapter.relatedPhotos?.length ? (
        <section aria-label="Ảnh tư liệu làng Giang Xá" className="mt-4 grid grid-cols-2 gap-3 sm:gap-5">
          {chapter.relatedPhotos.map((photo) => (
            <figure key={photo.src} className="m-0 min-w-0 rounded-2xl bg-be/70 p-2.5 shadow-sm sm:p-3.5">
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-be-2/60 sm:aspect-[16/9]">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1200px) 535px, 45vw" className="object-cover" />
              </div>
              <figcaption className="caption px-1 pt-2 text-center text-ink-soft">{photo.caption}</figcaption>
            </figure>
          ))}
        </section>
      ) : null}
    </article>
  );
}
