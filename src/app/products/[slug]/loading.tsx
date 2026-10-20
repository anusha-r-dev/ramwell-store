export default function ProductLoading() {
  return (
    <main id="main-content" className="detail-page" aria-busy="true" aria-label="Loading product">
      <div className="detail-grid">
        <div className="skeleton" style={{ aspectRatio: "4 / 3" }} />
        <div>
          <div className="skeleton" style={{ height: 58, marginBottom: 18 }} />
          <div className="skeleton" style={{ height: 180 }} />
        </div>
      </div>
    </main>
  );
}
