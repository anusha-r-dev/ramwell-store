import Link from "next/link";

export default function NotFound() {
  return (
    <main className="catalog-section" id="main-content">
      <div className="error-state">
        <div>
          <p className="eyebrow" style={{ color: "var(--accent)" }}>404 · Not found</p>
          <h1>That product has left the shelf.</h1>
          <p>The address may be incorrect, or the product is no longer part of this catalog.</p>
          <Link className="primary-link" href="/">Return to the catalog</Link>
        </div>
      </div>
    </main>
  );
}
