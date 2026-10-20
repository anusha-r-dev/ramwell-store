"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="catalog-section" id="main-content">
      <div className="error-state">
        <div>
          <p className="eyebrow" style={{ color: "var(--accent)" }}>Something went wrong</p>
          <h1>We couldn’t load the store.</h1>
          <p>The error was contained to this route. Try rendering it again without refreshing the whole application.</p>
          <button className="solid-button" type="button" onClick={reset}>Try again</button>
        </div>
      </div>
    </main>
  );
}
