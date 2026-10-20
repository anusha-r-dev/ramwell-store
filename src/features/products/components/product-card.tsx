"use client";

import Image from "next/image";
import Link from "next/link";
import { SaveButton } from "@/features/products/components/save-button";
import type { CatalogProduct } from "@/features/products/product.types";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: CatalogProduct }) {
  const roundedRating = Math.round(product.rating);

  return (
    <article className="product-card-shell">
      <Link className="product-card" href={`/products/${product.slug}`}>
        <div className="product-image-wrap">
          {product.badge ? (
            <span className="product-badge">{product.badge}</span>
          ) : null}
          <Image
            className="product-image"
            src={product.image}
            alt={product.imageAlt}
            width={1200}
            height={900}
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
        <div className="product-card-copy">
          <p className="product-category">{product.category}</p>
          <h3>{product.title}</h3>
          <p className="product-summary">{product.shortDescription}</p>
          <div
            className="rating-row"
            aria-label={`${product.rating} out of 5 stars from ${product.reviewCount} reviews`}
          >
            <span className="stars" aria-hidden="true">
              {"★".repeat(roundedRating)}
              {"☆".repeat(5 - roundedRating)}
            </span>
            <span>
              {product.rating} ({product.reviewCount.toLocaleString("en-IN")})
            </span>
          </div>
          <div className="price-row">
            <strong>{currency.format(product.price)}</strong>
            {product.originalPrice ? (
              <span className="original-price">
                {currency.format(product.originalPrice)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      <SaveButton product={product} compact />
    </article>
  );
}
