"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useCart } from "@/features/cart/cart-context";

export function StoreHeader() {
  const { count, savedCount } = useCart();
  const pathname = usePathname();

  const browseCatalog = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    const catalog = document.getElementById("catalog");
    if (!catalog) return;
    event.preventDefault();
    catalog.scrollIntoView({ behavior: "smooth", block: "start" });
    catalog.focus({ preventScroll: true });
    window.history.replaceState(null, "", "/#catalog");
  };
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            R
          </span>
          Ramwell Store
        </Link>
        <nav className="header-actions" aria-label="Primary navigation">
          <Link
            className="header-action"
            href="/#catalog"
            aria-label="Browse products"
            onClick={browseCatalog}
          >
            <span aria-hidden="true">⌕</span>
            <span className="header-action-label">Browse</span>
          </Link>
          <Link className="header-action" href="/saved" aria-label={`${savedCount} saved products`}>
            <span aria-hidden="true">♡</span>
            <span className="header-action-label">Saved</span>
            {savedCount > 0 ? <span className="nav-count">{savedCount}</span> : null}
          </Link>
          <Link className="header-action" href="/bag" aria-label={`Bag with ${count} items`}>
            <span aria-hidden="true">Bag</span>
            <span className="cart-dot">{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
