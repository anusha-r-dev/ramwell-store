"use client";

import { useEffect, useMemo, useState } from "react";
import { VirtualizedProductGrid } from "@/features/products/components/virtualized-product-grid";
import {
  productCategories,
  type CatalogProduct,
} from "@/features/products/product.types";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export function CatalogExperience({
  initialProducts,
  totalCount,
}: {
  initialProducts: CatalogProduct[];
  totalCount: number;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [loadStatus, setLoadStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const debouncedQuery = useDebouncedValue(query.trim().toLowerCase(), 300);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCompleteCatalog() {
      try {
        const response = await fetch("/api/products", { signal: controller.signal });
        if (!response.ok) throw new Error("Catalog request failed");
        const completeCatalog = (await response.json()) as CatalogProduct[];
        setProducts(completeCatalog);
        setLoadStatus("ready");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadStatus("error");
      }
    }

    void loadCompleteCatalog();
    return () => controller.abort();
  }, []);

  const visibleProducts = useMemo(() => {
    const matching = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const searchable = `${product.title} ${product.shortDescription} ${product.category}`.toLowerCase();
      return matchesCategory && searchable.includes(debouncedQuery);
    });

    if (sort === "price-asc") return matching.toSorted((a, b) => a.price - b.price);
    if (sort === "price-desc") return matching.toSorted((a, b) => b.price - a.price);
    if (sort === "rating") return matching.toSorted((a, b) => b.rating - a.rating);
    return matching;
  }, [category, debouncedQuery, products, sort]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setSort("featured");
  };

  return (
    <section
      className="catalog-section"
      id="catalog"
      aria-labelledby="catalog-heading"
      tabIndex={-1}
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow" style={{ color: "var(--accent)" }}>The catalog</p>
          <h2 id="catalog-heading">Find your next everyday favorite.</h2>
        </div>
        <p>
          Search a large catalog without rendering hundreds of cards at once.
          Fixed-row windowing keeps only nearby rows mounted.
        </p>
      </div>

      <div className="catalog-controls">
        <div className="control-field">
          <label htmlFor="catalog-search">Search products</label>
          <input
            className="control-input"
            id="catalog-search"
            type="search"
            value={query}
            placeholder="Try headphones, home, camera…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="control-field">
          <label htmlFor="category-filter">Category</label>
          <select
            className="control-select"
            id="category-filter"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option>All</option>
            {productCategories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="control-field">
          <label htmlFor="sort-products">Sort by</label>
          <select
            className="control-select"
            id="sort-products"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Customer rating</option>
          </select>
        </div>
        <button className="clear-button" type="button" onClick={clearFilters}>Clear</button>
      </div>

      <div className="results-summary" aria-live="polite">
        <span>
          {loadStatus === "loading" ? (
            <>Loading all <strong>{totalCount.toLocaleString("en-IN")}</strong> products…</>
          ) : (
            <><strong>{visibleProducts.length.toLocaleString("en-IN")}</strong> matching products</>
          )}
        </span>
        <span>Virtualized list · scroll to browse every match</span>
      </div>

      {loadStatus === "error" ? (
        <div className="catalog-error" role="alert">
          <strong>The complete catalog could not be loaded.</strong>
          <span>The first 30 products remain available. Refresh to try again.</span>
        </div>
      ) : null}

      {visibleProducts.length > 0 ? (
        <VirtualizedProductGrid
          key={`${category}-${debouncedQuery}-${sort}`}
          products={visibleProducts}
        />
      ) : (
        <div className="empty-state">
          <div>
            <h3>No products match that search.</h3>
            <p>Try a broader term or clear the category filter to see the full catalog.</p>
            <button className="secondary-button" type="button" onClick={clearFilters}>Clear filters</button>
          </div>
        </div>
      )}
    </section>
  );
}
