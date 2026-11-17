import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionHref } from "@/config/site";
import { StoryChapter } from "./story-chapter";
import { CRAFT_STEPS, STORY_CHAPTERS } from "./story-chapters";

const CRAFT_CHAPTER = { id: "chuong-4", numeral: "IV", title: "Bí quyết làm bánh Bác" };
const CHAPTER_NAV = [...STORY_CHAPTERS, CRAFT_CHAPTER];

function CraftSection() {
  return (
    <section id={CRAFT_CHAPTER.id} aria-labelledby="craft-title" className="scroll-mt-24 pt-4">
      <div className="mb-7 text-center">
        <p className="eyebrow m-0">{CRAFT_CHAPTER.numeral} · Giữ lửa nghề xưa</p>
        <h3 id="craft-title" className="mt-2 mb-0 text-h2 font-bold text-gac">
          Bí quyết làm nên hương vị Bánh Bác
        </h3>
      </div>
      <ol role="list" className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {CRAFT_STEPS.map((step, i) => (
          <Reveal
            key={step.title}
            as="li"
            delay={i * 80}
            className="frame-paper min-w-0 p-3 shadow-paper"
          >
            <figure className="m-0">
              <div className="relative aspect-[5/2] overflow-hidden border border-line bg-be-2">
                <Image
                  src={step.src}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1200px) 245px, (min-width: 1024px) 22vw, (min-width: 640px) 44vw, 88vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="caption px-1 pt-2 text-ink-soft">{step.caption}</figcaption>
            </figure>
            <div className="px-1 pt-4 pb-2">
              <p className="eyebrow m-0 text-tra">Công đoạn 0{i + 1}</p>
              <h4 className="mt-2 mb-2 text-lg font-bold leading-snug text-son">{step.title}</h4>
              <p className="m-0 text-[0.95rem] leading-relaxed text-ink-soft">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <p className="caption mt-4 text-center">
        Hình ảnh công đoạn trích từ ấn phẩm “Hành trình làm Bánh Bác” của Bác Trà Ký.
      </p>
      <div className="mt-6 text-center">
        <Button href={sectionHref("san-pham")}>Khám phá sản phẩm</Button>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="cau-chuyen" aria-labelledby="story-title" className="section-y border-y border-line bg-be-2/40">
      <div className="wrap">
        <SectionHeading
          id="story-title"
          eyebrow="Câu chuyện văn hoá · Giang Xá"
          title="Khám phá câu chuyện làng nghề"
          description="Theo dấu làng xưa, tìm về hương vị cũ. Ẩn mình giữa vùng đất Giang Xá, Hoài Đức, Hà Nội là câu chuyện về một thức quà truyền thống được gìn giữ qua nhiều thế hệ. Mỗi chiếc Bánh Bác không chỉ mang hương vị quê nhà mà còn chứa đựng sự khéo léo, tâm huyết và những nét đẹp văn hóa của người dân nơi đây."
          className="mb-5 md:max-w-[62ch] lg:mb-6"
        />
        <div className="mb-10 text-center">
          <Button href="#chuong-1">Tìm hiểu thêm</Button>
        </div>
        <nav aria-label="Các chương của câu chuyện" className="mb-8 lg:mb-12">
          <ol role="list" className="m-0 grid list-none grid-cols-2 gap-2 p-0 md:grid-cols-4">
            {CHAPTER_NAV.map(({ id, numeral, title }) => (
              <li key={id} className="min-w-0">
                <a
                  href={`#${id}`}
                  className="flex h-full min-h-11 items-center gap-2 border border-line bg-paper px-2.5 py-2 text-sm leading-snug text-son no-underline transition-colors hover:border-gac hover:text-gac sm:px-4"
                >
                  <span aria-hidden="true" className="shrink-0 font-heading font-bold text-gac">
                    {numeral}
                  </span>
                  <span className="sr-only">Chương {numeral}: </span>{title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid gap-8 lg:gap-12">
          {STORY_CHAPTERS.map((chapter, index) => <StoryChapter key={chapter.id} chapter={chapter} alignRight={index % 2 === 1} />)}
          <CraftSection />
        </div>
      </div>
    </section>
  );
}
