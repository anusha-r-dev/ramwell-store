const skeletonCards = Array.from({ length: 8 }, (_, index) => index);

export default function Loading() {
  return (
    <main
      id="main-content"
      className="catalog-section"
      aria-busy="true"
      aria-label="Loading product catalog"
    >
      <div className="loading-heading">
        <div className="skeleton skeleton-line skeleton-line-short" />
        <div className="skeleton skeleton-line skeleton-line-title" />
      </div>
      <div className="loading-controls skeleton" />
      <div className="loading-grid" aria-hidden="true">
        {skeletonCards.map((card) => (
          <div className="loading-card" key={card}>
            <div className="skeleton loading-card-image" />
            <div className="loading-card-copy">
              <div className="skeleton skeleton-line skeleton-line-short" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line skeleton-line-price" />
            </div>
          </div>
        ))}
      </div>
      <span className="visually-hidden">Loading products…</span>
    </main>
  );
}
