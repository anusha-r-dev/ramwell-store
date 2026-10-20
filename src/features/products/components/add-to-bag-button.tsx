"use client";

import { useCart } from "@/features/cart/cart-context";
import type { CatalogProduct } from "@/features/products/product.types";

export function AddToBagButton({ product }: { product: CatalogProduct }) {
  const { addItem, hasItem } = useCart();
  const added = hasItem(product.id);

  return (
    <div>
      <button
        className="solid-button"
        type="button"
        disabled={added}
        onClick={() => addItem(product)}
      >
        {added ? "Added to bag ✓" : "Add to bag"}
      </button>
      <p className="add-feedback" aria-live="polite">
        {added ? "This demo item has been added to your local bag." : ""}
      </p>
    </div>
  );
}
