"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Product } from "@/features/products/product.types";

const ReviewsPanel = dynamic(() => import("./reviews-panel"), {
  loading: () => <div className="skeleton" style={{ height: 260 }} />,
});
const RelatedProductsPanel = dynamic(() => import("./related-products-panel"), {
  loading: () => <div className="skeleton" style={{ height: 320 }} />,
});

type Panel = "details" | "reviews" | "related";

export function ProductSupplementary({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [panel, setPanel] = useState<Panel>("details");

  return (
    <section className="supplementary" aria-labelledby="more-heading">
      <p className="eyebrow" style={{ color: "var(--accent)" }}>Learn more</p>
      <div className="supplementary-tabs" aria-label="Product information">
        {(["details", "reviews", "related"] as const).map((item) => (
          <button
            className="tab-button"
            key={item}
            type="button"
            aria-pressed={panel === item}
            onClick={() => setPanel(item)}
          >
            {item === "details"
              ? "Specifications"
              : item === "reviews"
                ? `Reviews (${product.reviewCount.toLocaleString("en-IN")})`
                : "Related products"}
          </button>
        ))}
      </div>

      {panel === "details" ? (
        <div className="supplementary-panel">
          <h2 id="more-heading">The useful details.</h2>
          <dl className="spec-grid">
            {product.specifications.map((specification) => (
              <div key={specification.label}>
                <dt>{specification.label}</dt>
                <dd>{specification.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      {panel === "reviews" ? <ReviewsPanel product={product} /> : null}
      {panel === "related" ? <RelatedProductsPanel products={relatedProducts} /> : null}
    </section>
  );
}
