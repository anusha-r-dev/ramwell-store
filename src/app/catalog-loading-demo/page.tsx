import type { Metadata } from "next";
import { Storefront } from "@/features/products/components/storefront";
import { getCatalogProducts } from "@/features/products/data/product.repository";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CatalogLoadingDemoPage() {
  const products = await getCatalogProducts({ delayMs: 2500 });
  return (
    <Storefront
      initialProducts={products.slice(0, 30)}
      totalCount={products.length}
    />
  );
}
