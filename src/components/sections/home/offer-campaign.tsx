import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { getOfferEndTime, type CustomerOffer } from "@/data/customer-content";
import { OfferWindow } from "./offer-window";

export function OfferCampaign({ offer, serverNow, preview, discount, expired, children }: {
  offer: CustomerOffer;
  serverNow: number | null;
  preview?: boolean;
  discount?: string;
  expired: ReactNode;
  children: ReactNode;
}) {
  const headingId = "offers-title";
  return (
    <section
      id="uu-dai"
      aria-labelledby={headingId}
      aria-describedby={preview ? "offer-preview-notice" : undefined}
      className="on-dark relative isolate min-w-0 scroll-mt-24 overflow-hidden w-full bg-son-deep py-4 text-be shadow-2xl sm:py-6 lg:py-8"
    >
      {/* Ảnh nền ưu đãi đặc biệt do khách hàng cung cấp */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/brand/nen-uu-dai-clean.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[#300609]/20" />
      </div>
      {/* Tách bố cục khỏi ảnh nền: vùng sản phẩm không bị object-cover cắt khi form cao hơn banner. */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[29%] z-0 hidden aspect-[7/9] w-[23%] max-w-[390px] xl:block [mask-image:linear-gradient(to_bottom,transparent,black_18%),linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [mask-composite:intersect]">
        <Image
          src="/images/brand/uu-dai-dac-biet.png"
          alt=""
          fill
          sizes="1920px"
          className="object-cover object-[42%_bottom]"
        />
      </div>
      {preview && (
        <p id="offer-preview-notice" className="m-0 border-b border-nhu/55 bg-be px-4 py-2 text-center text-xs font-bold tracking-widest text-son">
          DỮ LIỆU MẪU / KHÔNG NHẬN ĐƠN
        </p>
      )}
      <div className="wrap relative z-10 py-4 sm:py-6 lg:py-8">
        <div data-offer-center className="mx-auto w-full min-w-0 max-w-xl lg:max-w-none">
          {serverNow === null ? expired : <OfferWindow
            endTime={getOfferEndTime(offer.endsOn)}
            serverNow={serverNow}
            expired={expired}
            panelClassName="mt-3 rounded-2xl border border-nhu/75 bg-son-deep/80 px-3 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.45)] sm:px-4 sm:py-3"
            artwork={(
              <div aria-hidden="true" className="relative mx-auto mt-4 aspect-[7/9] w-44 overflow-hidden sm:w-52 xl:hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%),linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [mask-composite:intersect]">
                <Image src="/images/brand/uu-dai-dac-biet.png" alt="" fill sizes="1440px" className="object-cover object-[42%_bottom]" />
              </div>
            )}
            intro={(
              <header className="text-center lg:text-left">
                <div className="mb-2">
                  <h2 id={headingId} className="m-0 inline-block rounded-full border border-nhu/70 bg-son-deep/65 px-4 py-1 font-display text-sm font-bold tracking-wider text-nhu uppercase shadow-md">
                    Ưu đãi đặc biệt
                  </h2>
                </div>
                {/* Canva trang 7: GIẢM 10% là điểm nhấn chính, không thu nhỏ như nhãn phụ. */}
                {discount && (
                  <div className="m-0 mb-2 flex items-baseline justify-center gap-2.5 lg:justify-start">
                    <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.04em] text-be/95 uppercase">
                      GIẢM
                    </span>
                    <span className="font-heading text-6xl sm:text-7xl lg:text-8xl font-extrabold text-nhu italic drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                      {discount}
                    </span>
                  </div>
                )}
                <h3 className={cn("m-0 mb-1 font-bold text-be", discount ? "text-base sm:text-lg lg:text-xl" : "text-lg sm:text-xl")}>{offer.title}</h3>
                <p className="m-0 text-xs text-cream-muted sm:text-sm leading-relaxed max-w-[38ch] mx-auto lg:mx-0">{offer.description}</p>
              </header>
            )}
          >
            {children}
          </OfferWindow>}
        </div>
      </div>
    </section>
  );
}
