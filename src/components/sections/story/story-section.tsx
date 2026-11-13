import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionHref } from "@/config/site";
import { StoryChapter } from "./story-chapter";
import { STORY_CHAPTERS } from "./story-chapters";

/** Mục lục chương dạng dòng thời gian ngang: số La Mã nối bằng một đường chỉ vàng đồng. */
function ChapterTimeline() {
  return (
    <nav aria-label="Các chương của câu chuyện" className="wrap mb-12 lg:mb-16">
      <ol role="list" className="relative m-0 grid list-none grid-cols-2 gap-x-4 gap-y-8 p-0 md:grid-cols-4">
        <span
          aria-hidden="true"
          className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-dong/45 md:block"
        />
        {STORY_CHAPTERS.map((chapter) => (
          <li key={chapter.id} className="relative text-center">
            <a href={`#${chapter.id}`} className="group inline-flex flex-col items-center gap-3 no-underline">
              <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full border border-dong/60 bg-be font-heading text-[1.1rem] font-bold text-gac transition-colors duration-300 ease-son group-hover:border-gac group-hover:bg-gac group-hover:text-be">
                {chapter.numeral}
              </span>
              <span className="max-w-[16ch] text-[0.95rem] leading-snug text-ink group-hover:text-gac">
                <span className="sr-only">Chương {chapter.numeral}:</span> {chapter.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Dải nghỉ mắt giữa các chương: ba cảm nhận thương hiệu spec yêu cầu truyền tải. */
function Interlude() {
  return (
    <Reveal className="wrap pb-16 text-center lg:pb-24">
      <p className="m-0 font-heading text-[clamp(1.5rem,1rem+2vw,2.4rem)] leading-[1.3] tracking-[0.12em] text-gac uppercase">
        <span className="block md:inline">Truyền thống</span>
        <span aria-hidden="true" className="hidden md:inline">
          {" – "}
        </span>
        <span className="sr-only md:hidden">, </span>
        <span className="block md:inline">Tinh tế</span>
        <span aria-hidden="true" className="hidden md:inline">
          {" – "}
        </span>
        <span className="sr-only md:hidden">, </span>
        <span className="block md:inline">Gần gũi</span>
      </p>
      <span aria-hidden="true" className="mx-auto mt-5 block h-px w-20 bg-dong/60" />
    </Reveal>
  );
}

/**
 * Câu chuyện văn hoá (id `cau-chuyen`) — 4 chương theo spec mục III.3: dòng thời gian chương, ảnh lớn tràn viền xen
 * tấm giấy chữ ngắn, scroll reveal, trích dẫn nổi bật. Cuối chương IV có nút "Khám phá sản phẩm".
 */
export function StorySection() {
  return (
    <section id="cau-chuyen" aria-labelledby="story-title" className="pt-12 md:pt-[72px] lg:pt-24">
      <div className="wrap">
        <SectionHeading
          id="story-title"
          eyebrow="Bốn chương"
          title="Câu chuyện văn hoá"
          description="Hồn quê Giang Xá, Bánh Bác, Trà Sen và hành trình tiếp nối một thức quà truyền thống."
        />
      </div>
      <ChapterTimeline />
      {STORY_CHAPTERS.map((chapter, index) => (
        <div key={chapter.id}>
          <StoryChapter
            chapter={chapter}
            alignRight={index % 2 === 1}
            footer={
              index === STORY_CHAPTERS.length - 1 ? (
                <Button href={sectionHref("san-pham")}>Khám phá sản phẩm</Button>
              ) : undefined
            }
          />
          {index === 1 ? <Interlude /> : null}
        </div>
      ))}
    </section>
  );
}
