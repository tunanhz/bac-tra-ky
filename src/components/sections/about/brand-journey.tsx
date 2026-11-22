import { Reveal } from "@/components/ui/reveal";
import { ABOUT_JOURNEY } from "./about-content";

/** Một hành trình, năm mốc: đọc dọc trên mobile và nối ngang từ desktop. */
export function BrandJourney() {
  return (
    <section id="hanh-trinh" aria-labelledby="journey-title" className="section-y border-b border-line/60 bg-paper">
      <div className="wrap">
        <Reveal className="mb-8 max-w-3xl lg:mb-12">
          <h3 id="journey-title" className="mt-0 mb-4 text-h2 font-bold text-gac">
            {ABOUT_JOURNEY.title}
          </h3>
          <p className="m-0 max-w-[52ch] text-base leading-relaxed text-ink-soft sm:text-lg">
            {ABOUT_JOURNEY.description}
          </p>
        </Reveal>
        <ol
          role="list"
          aria-label="5 mốc hành trình của Bác Trà Ký"
          className="relative m-0 grid list-none gap-7 p-0 before:pointer-events-none before:absolute before:inset-y-5 before:left-[1.375rem] before:w-px before:bg-line lg:grid-cols-5 lg:gap-6 lg:before:inset-x-5 lg:before:top-[1.375rem] lg:before:bottom-auto lg:before:h-px lg:before:w-auto"
        >
          {ABOUT_JOURNEY.steps.map(({ title, description }, index) => (
            <li key={title} className="relative grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4 lg:block">
              <span aria-hidden="true" className="relative grid size-11 place-items-center rounded-full border border-gac/40 bg-paper font-heading text-lg font-bold text-gac tabular-nums lg:mb-6">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-2 lg:pt-0">
                <h4 className="mt-0 mb-3 text-xl font-bold text-son">{title}</h4>
                <p className="m-0 max-w-[44ch] text-base leading-relaxed text-ink-soft">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
