import Image from "next/image";
import type { ReactNode } from "react";
import type { NewsBlock, NewsInline } from "@/lib/types";

/** Link nguồn chỉ cho HTTPS; nội dung khác vẫn render như text, không dùng raw HTML. */
function InlineText({ runs }: { runs: readonly NewsInline[] }) {
  return runs.map(({ text, strong, emphasis, href }, index) => {
    let content: ReactNode = text;
    if (strong) content = <strong>{content}</strong>;
    if (emphasis) content = <em>{content}</em>;
    if (href?.startsWith("https://")) {
      content = <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-sm underline decoration-dong/60 underline-offset-4 hover:text-gac focus-visible:outline-gac">{content}</a>;
    }
    return <span key={index}>{content}</span>;
  });
}

/** Ảnh đọc trọn khung, kèm nguồn gốc đúng vị trí trong tài liệu khách. */
export function NewsBody({ blocks }: { blocks: readonly NewsBlock[] }) {
  return (
    <div className="min-w-0 [overflow-wrap:anywhere]">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <figure key={index} className="mx-0 my-8">
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes="(min-width: 768px) 648px, calc(100vw - 80px)"
                className="mx-auto block h-auto max-h-[680px] w-full rounded-xl bg-be object-contain"
              />
              {block.caption?.length ? (
                <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">
                  <InlineText runs={block.caption} />
                </figcaption>
              ) : null}
            </figure>
          );
        }
        if (block.type === "heading") {
          return <h2 key={index} className="mt-10 mb-4 text-2xl leading-snug text-son sm:text-3xl"><InlineText runs={block.runs} /></h2>;
        }
        return <p key={index} className="mt-0 mb-5 leading-relaxed"><InlineText runs={block.runs} /></p>;
      })}
    </div>
  );
}
