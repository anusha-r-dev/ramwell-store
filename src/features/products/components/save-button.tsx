"use client";

import { useCart } from "@/features/cart/cart-context";
import type { CatalogProduct } from "@/features/products/product.types";

export function SaveButton({
  product,
  compact = false,
}: {
  product: CatalogProduct;
  compact?: boolean;
}) {
  const { isSaved, toggleSaved } = useCart();
  const saved = isSaved(product.id);

  return (
    <button
      className={compact ? "save-icon-button" : "secondary-button save-button"}
      type="button"
      aria-label={saved ? `Remove ${product.title} from saved items` : `Save ${product.title}`}
      aria-pressed={saved}
      onClick={() => toggleSaved(product)}
    >
      <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
      {compact ? null : saved ? "Saved" : "Save for later"}
    </button>
  );
}
