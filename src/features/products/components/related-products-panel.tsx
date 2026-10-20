import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/features/products/product.types";

export default function RelatedProductsPanel({ products }: { products: Product[] }) {
  return (
    <div className="supplementary-panel">
      <h2>More in this collection.</h2>
      <div className="related-grid">
        {products.map((product) => (
          <Link className="related-card" href={`/products/${product.slug}`} key={product.id}>
            <div className="related-image">
              <Image
                className="gallery-image"
                src={product.image}
                alt={product.imageAlt}
                width={1200}
                height={900}
                sizes="(max-width: 760px) 100vw, 33vw"
              />
            </div>
            <strong>{product.title}</strong>
            <span>₹{product.price.toLocaleString("en-IN")}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
