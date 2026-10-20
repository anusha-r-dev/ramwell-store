import type { Product } from "@/features/products/product.types";

export default function ReviewsPanel({ product }: { product: Product }) {
  const reviews = [
    ["Maya K.", "The details were accurate, delivery was quick, and the product feels thoughtfully made."],
    ["Arjun S.", `The ${product.category.toLowerCase()} quality is excellent. I would confidently recommend it.`],
    ["Neha R.", "Simple to choose, easy to use, and exactly as presented. A refreshingly clear experience."],
  ];

  return (
    <div className="supplementary-panel">
      <h2>What customers noticed.</h2>
      <div className="review-grid">
        {reviews.map(([name, quote]) => (
          <article className="review-card" key={name}>
            <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
            <blockquote>“{quote}”</blockquote>
            <strong>{name}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}
