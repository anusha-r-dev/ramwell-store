import { Storefront } from "@/features/products/components/storefront";
import { getCatalogProducts } from "@/features/products/data/product.repository";

export default async function HomePage() {
  const products = await getCatalogProducts();
  return (
    <Storefront
      initialProducts={products.slice(0, 30)}
      totalCount={products.length}
    />
  );
}
