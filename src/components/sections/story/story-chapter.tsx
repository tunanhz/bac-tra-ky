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

  // Chapter 1: Hồn quê Giang Xá (Slide 2: tràn viền toàn màn hình như homepage, không bọc hình chữ nhật)
  if (chapter.id === "chuong-1") {
    return (
      <article id={chapter.id} aria-labelledby={titleId} className="relative w-full overflow-hidden bg-[#fcf7ea] scroll-mt-24 border-b border-line/60">
        <Reveal className="relative flex min-h-[580px] flex-col justify-center lg:min-h-[640px]">
          {/* Background scenic photo tràn toàn màn hình */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <figure className="relative m-0 h-full w-full">
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-right-bottom lg:object-right"
              />
              <figcaption className="sr-only">{chapter.image.caption}</figcaption>
            </figure>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fcf7ea] via-[#fcf7ea]/95 to-transparent lg:w-[60%]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#fcf7ea]/65 lg:hidden"
            />
          </div>

          <div className="wrap relative z-10 grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:py-20">
            {/* Left text column */}
            <div className="lg:col-span-7 xl:col-span-6">
              <h3
                id={titleId}
                className="mt-0 mb-3 font-display text-2xl font-bold leading-[1.2] text-gac sm:mb-4 sm:text-3xl lg:text-4xl xl:text-5xl"
              >
                {chapter.heading}
              </h3>

              <p className="mt-0 mb-3 font-body text-base font-semibold leading-relaxed text-ink sm:mb-4 sm:text-lg">
                {chapter.paragraphs[0]}
              </p>

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

            {/* Right floating archival photos (Slide 2: Chèn 2 ảnh lên kiểu giấy ghi nhớ / ảnh nổi) */}
            {chapter.relatedPhotos?.length ? (
              <div className="flex flex-col gap-4 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end xl:col-span-6">
                {chapter.relatedPhotos.map((photo, i) => (
                  <figure
                    key={photo.src}
                    className={cn(
                      "m-0 max-w-sm rounded-2xl bg-paper/95 p-3 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-105",
                      i === 0 ? "lg:-rotate-2" : "lg:rotate-2 lg:mr-4"
                    )}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-be-2/60 sm:w-64 lg:w-72">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="caption px-1 pt-2.5 text-center font-medium text-ink">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
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
            <div className="mb-3 flex items-center gap-2.5 sm:mb-4">
              <Image
                src="/images/brand/logo.png"
                alt="Bác Trà Ký"
                width={28}
                height={28}
                className="size-7 object-contain"
              />
              <span className="font-heading text-xs font-bold tracking-wider text-son uppercase sm:text-sm">
                Bác Trà Ký
              </span>
            </div>

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
