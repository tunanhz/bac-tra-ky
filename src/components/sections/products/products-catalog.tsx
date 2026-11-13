"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { sectionHref } from "@/config/site";
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_LABELS } from "@/data/products";
import type { Product, ProductCategory } from "@/lib/types";
import { cn } from "@/lib/cn";
import { ProductCard } from "./product-card";
import { ProductDetail } from "./product-detail";

export type ProductFilter = ProductCategory | "all";

/** Lọc sản phẩm theo nhóm; "all" trả nguyên danh sách. */
export function filterProducts(products: readonly Product[], filter: ProductFilter): Product[] {
  return filter === "all" ? [...products] : products.filter((product) => product.category === filter);
}

/** Nút lọc — chép `.chip-btn` của bản mẫu B: viền mảnh, đang chọn = nền sơn son. */
export const CHIP_CLASS =
  "min-h-11 cursor-pointer border border-line bg-transparent px-4.5 font-body text-[0.86rem] text-ink transition-colors duration-250 ease-son hover:border-gac aria-pressed:border-son aria-pressed:bg-son aria-pressed:text-be";

type ProductsCatalogProps = { products: Product[] };

/**
 * Catalogue client: bộ lọc "Tất cả" + 3 nhóm (`aria-pressed`), lưới card 1/2/3 cột, modal chi tiết.
 * Đổi bộ lọc → card mới fade + rise lệch nhịp (tắt khi giảm chuyển động); số kết quả đọc qua `aria-live`.
 */
export function ProductsCatalog({ products }: ProductsCatalogProps) {
  const [filter, setFilter] = useState<ProductFilter>("all");
  const [filterChanges, setFilterChanges] = useState(0);
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo(() => filterProducts(products, filter), [products, filter]);

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

  const options: Array<{ value: ProductFilter; label: string }> = [
    { value: "all", label: "Tất cả" },
    ...PRODUCT_CATEGORIES.map((category) => ({ value: category, label: PRODUCT_CATEGORY_LABELS[category] })),
  ];

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Lọc sản phẩm theo nhóm">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={CHIP_CLASS}
            aria-pressed={filter === option.value}
            onClick={() => choose(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

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
                <ProductCard product={product} onOpenDetail={setSelected} className="w-full" />
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
        hideTitle
        closeLabel="Đóng chi tiết sản phẩm"
      >
        {selected ? <ProductDetail product={selected} onClose={() => setSelected(null)} /> : null}
      </Modal>
    </>
  );
}
