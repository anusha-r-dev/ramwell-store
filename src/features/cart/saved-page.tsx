"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/cart-context";
import { ProductCard } from "@/features/products/components/product-card";

export function SavedPage() {
  const { saved } = useCart();

  return (
    <main className="commerce-page" id="main-content">
      <div className="commerce-heading">
        <p className="eyebrow commerce-eyebrow">Saved items</p>
        <h1>Keep the shortlist close.</h1>
        <p>Save products while browsing, then compare them here.</p>
      </div>
      {saved.length > 0 ? (
        <section className="saved-grid" aria-label="Saved products">
          {saved.map((product) => <ProductCard product={product} key={product.id} />)}
        </section>
      ) : (
        <div className="empty-state compact-empty">
          <div>
            <h2>No saved products yet.</h2>
            <p>Use the heart button on any product card to build a shortlist.</p>
            <Link className="primary-link" href="/#catalog">Explore the catalog →</Link>
          </div>
        </div>
      )}
    </main>
  );
}
