import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import type { StoryChapter as StoryChapterData } from "./story-chapters";

type StoryChapterProps = {
  chapter: StoryChapterData;
  /** Chương chẵn đặt tấm giấy lệch phải để tạo nhịp. */
  alignRight?: boolean;
  /** Nội dung thêm cuối tấm giấy (vd. nút CTA ở chương IV). */
  footer?: ReactNode;
};

/**
 * Một chương câu chuyện, chép khối `.story` của bản mẫu B: ảnh tràn viền 62vh (78vh từ 1024px) và tấm giấy viền đôi
 * đè lên ảnh (-110px mobile, -160px tablet, -240px desktop), số chương La Mã đỏ gấc, trích dẫn xanh trà.
 */
export function StoryChapter({ chapter, alignRight = false, footer }: StoryChapterProps) {
  const titleId = `${chapter.id}-title`;
  return (
    <article id={chapter.id} aria-labelledby={titleId} className="relative pb-16 lg:pb-24">
      <div className="relative h-[62vh] min-h-[340px] overflow-hidden bg-be-2 lg:h-[78vh]">
        <Image src={chapter.image.src} alt={chapter.image.alt} fill sizes="100vw" className={chapter.image.contain ? "object-contain px-6 pt-8 pb-20 lg:pb-36" : "object-cover"} />
        <p className="absolute top-4 right-4 m-0 max-w-[80%] bg-be/90 px-2.5 py-1 text-[0.68rem] leading-snug tracking-[0.06em] text-ink-soft italic">
          {chapter.image.caption}
        </p>
      </div>
      <div className="wrap">
        <Reveal
          className={cn(
            "frame-paper relative mx-4 -mt-[110px] max-w-[640px] px-6 pt-9 pb-8 shadow-paper md:-mt-[160px] md:px-11 md:py-12 lg:-mt-[240px]",
            alignRight ? "md:mr-[8%] md:ml-auto" : "md:mr-0 md:ml-[8%]",
          )}
        >
          <p className="eyebrow m-0">Chương {chapter.numeral}</p>
          <p aria-hidden="true" className="m-0 font-heading text-[3.6rem] leading-none font-bold text-gac">
            {chapter.numeral}
          </p>
          <h3 id={titleId} className="mt-2 mb-4 text-[clamp(1.7rem,4.5vw,2.4rem)] leading-[1.12] font-bold text-son">
            {chapter.title}
          </h3>
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-0 mb-4 text-ink-soft">
              {paragraph}
            </p>
          ))}
          {chapter.legend ? (
            <aside aria-label={chapter.legend.label} className="relative mt-6 mb-2 border border-dong/45 px-5 pt-6 pb-4">
              <p className="eyebrow absolute -top-2.5 left-3 m-0 bg-paper px-2 text-[0.62rem] tracking-[0.16em] whitespace-nowrap md:left-4 md:text-[0.66rem] md:tracking-[0.28em]">{chapter.legend.label}</p>
              <p className="m-0 text-[0.95rem] text-ink-soft italic">{chapter.legend.text}</p>
            </aside>
          ) : null}
          <blockquote className="mx-0 mt-[22px] mb-0 border-t border-line pt-[18px] font-heading text-[1.25rem] leading-[1.45] text-tra italic">
            “{chapter.quote.text}”
            <span className="mt-2 block font-body text-[0.72rem] tracking-[0.2em] text-dong not-italic uppercase">
              {chapter.quote.source}
            </span>
          </blockquote>
          {footer ? <div className="mt-7">{footer}</div> : null}
        </Reveal>
      </div>
    </article>
  );
}
