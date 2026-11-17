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

  // Chapter 1: Hồn quê Giang Xá (Slide 2: không viền cứng, bỏ chữ Hồn quê Giang Xá, ảnh nền làng, 2 ảnh tư liệu nổi bên phải)
  if (chapter.id === "chuong-1") {
    return (
      <article id={chapter.id} aria-labelledby={titleId} className="scroll-mt-24">
        <Reveal className="relative overflow-hidden rounded-3xl bg-[#fcf7ea]">
          <div className="relative flex min-h-[580px] flex-col justify-center lg:min-h-[640px]">
            {/* Background scenic photo */}
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
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fcf7ea] via-[#fcf7ea]/95 to-transparent lg:w-[60%]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#fcf7ea]/65 lg:hidden"
              />
            </div>

            <div className="relative z-10 grid items-center gap-8 p-6 sm:p-9 md:p-11 lg:grid-cols-12 lg:p-14">
              {/* Left text column */}
              <div className="lg:col-span-7 xl:col-span-6">
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
                  className="mt-0 mb-3 font-display text-2xl font-bold leading-[1.2] text-gac sm:mb-4 sm:text-3xl lg:text-4xl xl:text-5xl"
                >
                  {chapter.heading}
                </h3>

                {/* Sửa text lỗi: dùng font rõ ràng, không nghiêng lỗi dấu */}
                <p className="mt-0 mb-3 font-serif text-base font-semibold leading-relaxed text-ink sm:mb-4 sm:text-lg">
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
          </div>
        </Reveal>
      </article>
    );
  }

  // Chapter 2: Dấu ấn lịch sử (Slide 3: ảnh bên trái, text bên phải, không khung mờ ở dưới, to tiêu đề, blur aura ảnh)
  if (chapter.id === "chuong-2") {
    return (
      <article id={chapter.id} aria-labelledby={titleId} className="scroll-mt-24 py-4">
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
      </article>
    );
  }

  // Chapter 3: Hương vị quê nhà (Slide 4: chèn chữ lên nền ảnh, bỏ badge, to tiêu đề)
  return (
    <article id={chapter.id} aria-labelledby={titleId} className="scroll-mt-24 py-4">
      <Reveal className="relative overflow-hidden rounded-3xl bg-[#fcf7ea]">
        <div className="relative flex min-h-[540px] items-center lg:min-h-[600px]">
          {/* Background scenic photo */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <figure className="relative m-0 h-full w-full">
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1491px"
                className="object-cover object-right"
              />
              <figcaption className="sr-only">{chapter.image.caption}</figcaption>
            </figure>
            {/* Scrim overlay to keep text readable on left */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fcf7ea] via-[#fcf7ea]/95 to-transparent lg:w-[60%]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#fcf7ea]/70 lg:hidden"
            />
          </div>

          <div className="relative z-10 w-full p-6 sm:p-9 md:p-11 lg:w-[58%] lg:p-14">
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
        </div>
      </Reveal>
    </article>
  );
}
