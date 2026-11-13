"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterChips, type FilterOption } from "@/components/ui/filter-chips";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { sectionHref } from "@/config/site";
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_LABELS } from "@/data/products";
import type { Product, ProductCategory } from "@/lib/types";
import { cn } from "@/lib/cn";
import { OPEN_PRODUCT_EVENT, readProductSlug, urlWithoutProductSlug } from "@/lib/product-link";
import { CARD_ACTION, CARD_ACTION_DETAIL, ProductCard } from "./product-card";
import { ProductDetail } from "./product-detail";

export type ProductFilter = ProductCategory | "all";

/** Lọc sản phẩm theo nhóm; "all" trả nguyên danh sách. */
export function filterProducts(products: readonly Product[], filter: ProductFilter): Product[] {
  return filter === "all" ? [...products] : products.filter((product) => product.category === filter);
}

type ProductsCatalogProps = { products: Product[] };

/**
 * Catalogue client: bộ lọc "Tất cả" + 3 nhóm (`aria-pressed`), lưới card 1/2/3 cột, modal chi tiết.
 * Đổi bộ lọc → card mới fade + rise lệch nhịp (tắt khi giảm chuyển động); số kết quả đọc qua `aria-live`.
 * Mở modal từ nơi khác (Sản phẩm nổi bật): nghe `OPEN_PRODUCT_EVENT` hoặc đọc `?sp=<slug>` khi tải → cuộn tới card,
 * đặt focus vào nút "Xem chi tiết" của card (để đóng modal thì focus quay về đây) rồi mở modal. Đóng → xoá `sp`.
 */
export function ProductsCatalog({ products }: ProductsCatalogProps) {
  const [filter, setFilter] = useState<ProductFilter>("all");
  const [filterChanges, setFilterChanges] = useState(0);
  const [selected, setSelected] = useState<Product | null>(null);
  /** Sản phẩm chờ mở modal sau khi lưới đã render đúng bộ lọc. */
  const [pending, setPending] = useState<Product | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const detailTitleId = useId();

  const visible = useMemo(() => filterProducts(products, filter), [products, filter]);

  const requestOpen = useCallback(
    (slug: string) => {
      const product = products.find((item) => item.slug === slug);
      if (!product) return;
      // Bộ lọc đang ẩn sản phẩm → về "Tất cả" để card có trên lưới.
      setFilter((current) => (current === "all" || current === product.category ? current : "all"));
      setPending(product);
    },
    [products],
  );

  useEffect(() => {
    const onOpen = (event: Event) => {
      const slug = (event as CustomEvent<unknown>).detail;
      if (typeof slug === "string") requestOpen(slug);
    };
    window.addEventListener(OPEN_PRODUCT_EVENT, onOpen);
    const fromUrl = readProductSlug(window.location.search);
    const frame = fromUrl ? requestAnimationFrame(() => requestOpen(fromUrl)) : 0;
    return () => {
      window.removeEventListener(OPEN_PRODUCT_EVENT, onOpen);
      cancelAnimationFrame(frame);
    };
  }, [requestOpen]);

  useEffect(() => {
    if (!pending) return;
    const frame = requestAnimationFrame(() => {
      const opener = rootRef.current?.querySelector<HTMLElement>(`[data-product-slug="${pending.slug}"]`);
      if (opener) {
        opener.scrollIntoView?.({ block: "center", behavior: "instant" });
        opener.focus({ preventScroll: true });
      }
      setSelected(pending);
      setPending(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [pending]);

  const closeDetail = useCallback(() => {
    setSelected(null);
    if (readProductSlug(window.location.search)) {
      window.history.replaceState(null, "", urlWithoutProductSlug(window.location));
    }
  }, []);

  if (products.length === 0) {
    return (
      <div className="frame-paper mx-auto max-w-2xl px-6 py-12 text-center">
        <p className="mt-0 mb-6 text-ink-soft">Bộ sưu tập đang được cập nhật. Liên hệ để được tư vấn.</p>
        <Button href={sectionHref("lien-he")}>Liên hệ Bác Trà Ký</Button>
      </div>
    );
  }

  const choose = (next: ProductFilter) => {
    if (next === filter) return;
    setFilter(next);
    setFilterChanges((count) => count + 1);
  };

  const options: Array<FilterOption<ProductFilter>> = [
    { value: "all", label: "Tất cả" },
    ...PRODUCT_CATEGORIES.map((category) => ({ value: category, label: PRODUCT_CATEGORY_LABELS[category] })),
  ];

  return (
    <div ref={rootRef}>
      <FilterChips options={options} value={filter} onChange={choose} label="Lọc sản phẩm theo nhóm" />

      <p className="sr-only" aria-live="polite">
        {`Đang hiển thị ${visible.length} sản phẩm`}
      </p>

      {visible.length === 0 ? (
        <div className="frame-paper mx-auto max-w-2xl px-6 py-12 text-center">
          <p className="mt-0 mb-6 text-ink-soft">Chưa có sản phẩm trong nhóm này.</p>
          <Button variant="outline" onClick={() => choose("all")}>
            Xem tất cả
          </Button>
        </div>
      ) : (
        <Reveal>
          <ul
            key={filter}
            className="m-0 grid list-none gap-7 p-0 md:grid-cols-2 lg:grid-cols-3"
            aria-label={filter === "all" ? "Tất cả sản phẩm" : PRODUCT_CATEGORY_LABELS[filter]}
          >
            {visible.map((product, index) => (
              <li
                key={product.slug}
                className={cn("flex", filterChanges > 0 && "animate-rise [animation-duration:450ms]")}
                style={filterChanges > 0 ? { animationDelay: `${Math.min(index, 5) * 60}ms` } : undefined}
              >
                <ProductCard
                  product={product}
                  className="w-full"
                  detailAction={
                    <button
                      type="button"
                      className={cn(CARD_ACTION, CARD_ACTION_DETAIL)}
                      aria-haspopup="dialog"
                      aria-label={`Xem chi tiết: ${product.name}`}
                      data-product-slug={product.slug}
                      onClick={() => setSelected(product)}
                    >
                      Xem chi tiết
                    </button>
                  }
                />
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <Modal
        open={selected !== null}
        onClose={closeDetail}
        labelledBy={detailTitleId}
        closeLabel="Đóng chi tiết sản phẩm"
      >
        {selected ? <ProductDetail product={selected} titleId={detailTitleId} onClose={closeDetail} /> : null}
      </Modal>
    </div>
  );
}
