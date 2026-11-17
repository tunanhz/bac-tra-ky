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
  return (
    <article id={chapter.id} aria-labelledby={titleId} className="scroll-mt-24">
      <Reveal className="frame-paper grid items-center gap-6 p-4 shadow-paper md:grid-cols-2 md:gap-9 md:p-8 lg:gap-12">
        <figure className={cn("m-0 min-w-0", alignRight && "md:order-2")}>
          <div className="relative aspect-[4/3] overflow-hidden bg-be-2">
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
          <p className="eyebrow m-0">{chapter.numeral} · {chapter.title}</p>
          <h3 id={titleId} className="mt-3 mb-4 text-h3 font-bold text-gac">
            {chapter.heading}
          </h3>
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-0 mb-3 text-ink-soft last:mb-0">
              {paragraph}
            </p>
          ))}
          {chapter.sources?.length ? (
            <ul role="list" className="m-0 mt-5 list-none border-t border-line p-0 pt-2">
              {chapter.sources.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="inline-flex min-h-11 items-center text-sm font-bold text-tra underline underline-offset-4">
                    {label} <span aria-hidden="true" className="ml-2">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Reveal>
      {chapter.relatedPhotos?.length ? (
        <section aria-label="Ảnh tư liệu làng Giang Xá" className="mt-4 grid grid-cols-2 gap-3 sm:gap-5">
          {chapter.relatedPhotos.map((photo) => (
            <figure key={photo.src} className="frame-paper m-0 min-w-0 p-2 shadow-paper sm:p-3">
              <div className="relative aspect-[5/4] overflow-hidden bg-be-2 sm:aspect-[16/9]">
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
