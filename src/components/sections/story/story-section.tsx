import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { sectionHref } from "@/config/site";
import { StoryChapter } from "./story-chapter";
import { CRAFT_STEPS, STORY_CHAPTERS } from "./story-chapters";

function CraftSection() {
  return (
    <section id="chuong-4" aria-labelledby="craft-title" className="scroll-mt-24 pt-6">
      <div className="mb-8 text-center">
        <h3 id="craft-title" className="mt-0 mb-3 font-display text-3xl font-bold text-gac sm:text-4xl lg:text-5xl">
          Bí quyết làm nên hương vị Bánh Bác
        </h3>
        <p className="mx-auto max-w-[50ch] text-base text-ink-soft sm:text-lg">
          Trải qua 4 công đoạn kỳ công để tạo nên từng chiếc Bánh Bác dẻo thơm, trọn vẹn phong vị đất Giang Xá.
        </p>
      </div>

      {/* Slide 6: Bố cục form 2x2 ảnh bên phải text bên trái theo mẫu Slide 6 */}
      <ol role="list" className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:gap-6">
        {CRAFT_STEPS.map((step, i) => (
          <Reveal
            key={step.title}
            as="li"
            delay={i * 80}
            className="group flex flex-col-reverse items-center justify-between gap-4 overflow-hidden rounded-2xl border border-line/60 bg-paper p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gac/40 hover:shadow-md sm:flex-row"
          >
            <div className="flex-1 min-w-0 pr-0 sm:pr-2">
              <span className="inline-block rounded-full bg-gac/10 px-2.5 py-0.5 text-xs font-bold text-gac">
                Công đoạn 0{i + 1}
              </span>
              <h4 className="mt-2 mb-2 text-lg font-bold leading-snug text-son">{step.title}</h4>
              <p className="m-0 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </div>
            <figure className="m-0 w-full shrink-0 sm:w-44 lg:w-48">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-be-2/60 shadow-inner">
                <Image
                  src={step.src}
                  alt={step.alt}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="caption px-1 pt-1.5 text-center text-xs text-ink-soft">{step.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </ol>

      <p className="caption mt-5 text-center text-ink-soft">
        Hình ảnh công đoạn trích từ ấn phẩm “Hành trình làm Bánh Bác” của Bác Trà Ký.
      </p>

      {/* Slide 6: Nút pill Khám phá sản phẩm -> */}
      <div className="mt-8 text-center">
        <a
          href={sectionHref("san-pham")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gac px-8 py-3 font-body text-base font-bold text-be shadow-md transition-all duration-300 hover:bg-gac-deep hover:shadow-lg"
        >
          Khám phá sản phẩm <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="cau-chuyen" aria-labelledby="story-title" className="border-y border-line bg-be-2/40 pb-16 lg:pb-24">
      {/* Slide 1: Intro Banner tràn luôn như phần trang chủ theo yêu cầu người dùng */}
      <div className="relative mb-12 overflow-hidden bg-[#2a130f] shadow-lg lg:mb-16">
        <div className="pointer-events-none absolute inset-0">
          <figure className="relative m-0 h-full w-full">
            <Image
              src="/images/story/poster-hanh-trinh-lam-banh.webp"
              alt="Đôi tay nghệ nhân làm Bánh Bác truyền thống"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </figure>
          {/* Blur đen đổ từ trái vào để làm nổi text */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/30 backdrop-blur-[2px] lg:w-[65%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/60 lg:hidden"
          />
        </div>

        <div className="wrap relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-2xl text-left">
            <h2
              id="story-title"
              className="mt-0 mb-4 font-display text-3xl font-bold leading-tight text-be sm:text-4xl lg:text-5xl"
            >
              Khám phá câu chuyện làng nghề
            </h2>
            <p className="mt-0 mb-8 font-body text-base font-normal leading-relaxed text-be/90 sm:text-lg">
              Theo dấu làng xưa, tìm về hương vị cũ. Ẩn mình giữa vùng đất Giang Xá, Hoài Đức, Hà Nội là câu chuyện về một thức quà truyền thống được gìn giữ qua nhiều thế hệ. Mỗi chiếc Bánh Bác không chỉ mang hương vị quê nhà mà còn chứa đựng sự khéo léo, tâm huyết và những nét đẹp văn hóa của người dân nơi đây.
            </p>

            {/* Slide 1: 2 nút pill */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={sectionHref("san-pham")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gac px-7 py-3 font-body text-sm font-bold text-be shadow-md transition-all duration-300 hover:bg-gac-deep hover:shadow-lg sm:text-base"
              >
                Khám phá sản phẩm <span aria-hidden="true">→</span>
              </a>
              <a
                href="#chuong-1"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-be/80 bg-transparent px-7 py-3 font-body text-sm font-bold text-be transition-all duration-300 hover:bg-be hover:text-son sm:text-base"
              >
                Khám phá câu chuyện <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap space-y-12 lg:space-y-16">
        {/* Các chương của câu chuyện */}
        <div className="grid gap-12 lg:gap-16">
          {STORY_CHAPTERS.map((chapter) => (
            <StoryChapter key={chapter.id} chapter={chapter} />
          ))}
          <CraftSection />
        </div>
      </div>
    </section>
  );
}
