import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBagButton } from "@/features/products/components/add-to-bag-button";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductSupplementary } from "@/features/products/components/product-supplementary";
import { SaveButton } from "@/features/products/components/save-button";
import {
  getFeaturedProductParams,
  getProductBySlug,
  getRelatedProducts,
} from "@/features/products/data/product.repository";

export const generateStaticParams = getFeaturedProductParams;

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.title, description: product.shortDescription };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product);

  return (
    <main className="detail-page" id="main-content">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Catalog</Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
      </nav>
      <div className="detail-grid">
        <ProductGallery images={product.gallery} alt={product.imageAlt} />
        <div className="detail-copy">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <div
            className="rating-row"
            aria-label={`${product.rating} out of 5 stars from ${product.reviewCount} reviews`}
          >
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span>{product.rating} · {product.reviewCount.toLocaleString("en-IN")} reviews</span>
          </div>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price"><strong>₹{product.price.toLocaleString("en-IN")}</strong></p>
          <p className="availability">{product.availability}</p>
          <ul className="feature-list">
            {product.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <div className="product-actions">
            <AddToBagButton product={product} />
            <SaveButton product={product} />
          </div>
        </div>
      </div>
      <ProductSupplementary product={product} relatedProducts={relatedProducts} />
    </main>
  );
}
