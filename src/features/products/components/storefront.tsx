import { CatalogExperience } from "@/features/products/components/catalog-experience";
import type { CatalogProduct } from "@/features/products/product.types";

export function Storefront({
  initialProducts,
  totalCount,
}: {
  initialProducts: CatalogProduct[];
  totalCount: number;
}) {
  return (
    <main id="main-content">
      <section className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">The considered marketplace</p>
          <h1>Useful things, minus the endless searching.</h1>
          <p className="hero-description">
            A curated catalog of everyday technology, home essentials, and
            personal favorites—with clear details and a genuinely fast browsing
            experience.
          </p>
          <a className="primary-link" href="#catalog">
            Explore the catalog <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hero-proof" aria-label="Store highlights">
          <div>
            <strong>{totalCount.toLocaleString("en-IN")}</strong>
            <span>curated items</span>
          </div>
          <div>
            <strong>4.8</strong>
            <span>average rating</span>
          </div>
          <div>
            <strong>Free</strong>
            <span>delivery over ₹2,999</span>
          </div>
        </div>
      </section>

      <CatalogExperience
        initialProducts={initialProducts}
        totalCount={totalCount}
      />
    </main>
  );
}
