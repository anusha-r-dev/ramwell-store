import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order confirmed",
};

type ConfirmationPageProps = {
  searchParams: Promise<{ order?: string; total?: string; items?: string }>;
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default async function Page({ searchParams }: ConfirmationPageProps) {
  const { order = "RW-DEMO", total = "0", items = "0" } = await searchParams;
  const safeTotal = Number.isFinite(Number(total)) ? Number(total) : 0;

  return (
    <main className="commerce-page" id="main-content">
      <section className="confirmation-card" aria-labelledby="confirmation-title">
        <span className="confirmation-icon" aria-hidden="true">✓</span>
        <p className="eyebrow commerce-eyebrow">Demo order confirmed</p>
        <h1 id="confirmation-title">Your selection is complete.</h1>
        <p>
          This simulated order proves the complete storefront journey. No payment was
          processed and no personal information was stored or transmitted.
        </p>
        <dl className="confirmation-details">
          <div><dt>Order reference</dt><dd>{order}</dd></div>
          <div><dt>Items</dt><dd>{items}</dd></div>
          <div><dt>Demo total</dt><dd>{currency.format(safeTotal)}</dd></div>
        </dl>
        <Link className="primary-link" href="/#catalog">Continue browsing →</Link>
      </section>
    </main>
  );
}
