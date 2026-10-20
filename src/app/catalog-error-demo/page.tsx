import type { Metadata } from "next";
import { getCatalogProducts } from "@/features/products/data/product.repository";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CatalogErrorDemoPage() {
  await getCatalogProducts({ simulateFailure: true });
  return null;
}
