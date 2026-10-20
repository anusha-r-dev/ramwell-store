"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "@/features/products/components/product-card";
import type { CatalogProduct } from "@/features/products/product.types";

const CARD_HEIGHT = 436;
const GAP = 20;
const ROW_HEIGHT = CARD_HEIGHT + GAP;
const OVERSCAN_ROWS = 2;

function getColumnCount(width: number) {
  if (width >= 1180) return 4;
  if (width >= 850) return 3;
  if (width >= 560) return 2;
  return 1;
}

export function VirtualizedProductGrid({ products }: { products: CatalogProduct[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(720);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
      setViewportHeight(entry.contentRect.height);
    });

    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const columns = getColumnCount(width);
  const rowCount = Math.ceil(products.length / columns);
  const visibleRows = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN_ROWS);
    const end = Math.min(
      rowCount,
      Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT) + OVERSCAN_ROWS,
    );
    return Array.from({ length: Math.max(0, end - start) }, (_, offset) => start + offset);
  }, [rowCount, scrollTop, viewportHeight]);

  return (
    <div
      ref={viewportRef}
      className="virtual-catalog"
      role="region"
      aria-label="Scrollable product results"
      tabIndex={0}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <div style={{ height: rowCount * ROW_HEIGHT }}>
        {visibleRows.map((rowIndex) => {
          const rowProducts = products.slice(
            rowIndex * columns,
            rowIndex * columns + columns,
          );

          return (
            <div
              className="virtual-row"
              key={rowIndex}
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                height: CARD_HEIGHT,
                transform: `translateY(${rowIndex * ROW_HEIGHT}px)`,
              }}
            >
              {rowProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
