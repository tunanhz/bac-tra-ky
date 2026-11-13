"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { NAV_ITEMS, sectionHref, type SectionId } from "@/config/site";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";

/** Cuộn quá ngưỡng này (px) thì header chuyển sang nền sơn son. */
const SOLID_AFTER_PX = 40;
const MENU_ID = "menu-dieu-huong";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

/** Theo dõi section đang nằm giữa màn hình để tô sáng mục menu tương ứng. */
function useActiveSection(enabled: boolean) {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;
    const ids = new Set<string>(NAV_ITEMS.map((item) => item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && ids.has(entry.target.id)) {
            setActiveId(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of NAV_ITEMS) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? activeId : null;
}

/**
 * Header dính đầu trang (hướng B):
 * - Trang chủ: nằm đè lên ảnh hero, nền trong suốt chữ be → nền sơn son + chỉ vàng khi cuộn > 40px.
 * - Trang khác (vd. `/tin-tuc/...`): luôn nền sơn son.
 * - Mục đang xem màu vàng nhũ + `aria-current`.
 * - Dưới 1024px: nút menu 48×48 (`aria-expanded`, `aria-controls`), Esc đóng và trả focus, bấm mục tự đóng.
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolledPast(SOLID_AFTER_PX);
  const activeId = useActiveSection(isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const solid = !isHome || scrolled || menuOpen;

  return (
    <header
      data-solid={solid}
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-400 ease-son",
        solid ? "bg-son-deep shadow-[0_1px_0_rgb(226_191_110/0.35)]" : "bg-transparent",
      )}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Điều hướng chính">
          <ul
            id={MENU_ID}
            className={cn(
              "m-0 list-none p-0",
              "lg:flex lg:items-center lg:gap-[clamp(14px,1.8vw,26px)]",
              menuOpen
                ? "absolute inset-x-0 top-[68px] flex max-h-[calc(100svh-68px)] flex-col overflow-y-auto border-t border-nhu/30 bg-son-deep px-5 pt-2 pb-5 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.6)] lg:static lg:max-h-none lg:flex-row lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
                : "hidden",
            )}
          >
            {NAV_ITEMS.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={sectionHref(item.id)}
                    onClick={closeMenu}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex min-h-12 items-center border-b border-nhu/15 text-[0.76rem] tracking-[0.16em] uppercase no-underline transition-colors duration-300",
                      "lg:min-h-11 lg:border-0",
                      active ? "text-nhu" : "text-be hover:text-nhu",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          ref={menuButtonRef}
          type="button"
          className="flex size-12 shrink-0 cursor-pointer items-center justify-center border border-be/50 bg-transparent text-be lg:hidden"
          aria-expanded={menuOpen}
          aria-controls={MENU_ID}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6 H21 M3 12 H21 M3 18 H21" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
