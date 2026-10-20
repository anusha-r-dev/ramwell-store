import "server-only";
import { cache } from "react";
import {
  createProduct,
  productBlueprints,
} from "@/features/products/data/product.seed";
import type {
  CatalogProduct,
  Product,
} from "@/features/products/product.types";

const CONFIGURATIONS_PER_MODEL = 72;

// The first 30 records are distinct hand-authored models. Subsequent records are
// intentional collection/finish configurations rather than numbered copies.
const catalog: Product[] = Array.from(
  { length: CONFIGURATIONS_PER_MODEL },
  (_, configurationIndex) =>
    productBlueprints.map((blueprint) =>
      createProduct(blueprint, configurationIndex),
    ),
).flat();

const toCatalogProduct = (product: Product): CatalogProduct => ({
  id: product.id,
  slug: product.slug,
  title: product.title,
  shortDescription: product.shortDescription,
  category: product.category,
  price: product.price,
  originalPrice: product.originalPrice,
  rating: product.rating,
  reviewCount: product.reviewCount,
  badge: product.badge,
  image: product.image,
  imageAlt: product.imageAlt,
});

export async function getCatalogProducts({
  simulateFailure = false,
  delayMs = 0,
}: {
  simulateFailure?: boolean;
  delayMs?: number;
} = {}): Promise<CatalogProduct[]> {
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  if (simulateFailure) {
    throw new Error("Simulated catalog data failure");
  }
  return catalog.map(toCatalogProduct);
}

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> =>
    catalog.find((product) => product.slug === slug),
);

export const getFeaturedProductParams = async () =>
  catalog.slice(0, 30).map(({ slug }) => ({ slug }));

export const getRelatedProducts = cache(
  async (product: Product): Promise<Product[]> =>
    catalog
      .filter(
        (candidate) =>
          candidate.category === product.category && candidate.id !== product.id,
      )
      .slice(0, 3),
);

export const catalogSize = catalog.length;
