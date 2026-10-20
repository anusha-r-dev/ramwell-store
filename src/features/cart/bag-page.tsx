"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/features/cart/cart-context";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function BagPage() {
  const { bag, removeItem, updateQuantity } = useCart();
  const subtotal = bag.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );
  const delivery = subtotal === 0 || subtotal >= 2999 ? 0 : 199;
  const total = subtotal + delivery;

  if (bag.length === 0) {
    return (
      <main className="commerce-page" id="main-content">
        <div className="empty-state">
          <div>
            <p className="eyebrow commerce-eyebrow">Your bag</p>
            <h1>Your bag is ready for something useful.</h1>
            <p>Add a product, then return here to review quantities and checkout.</p>
            <Link className="primary-link" href="/#catalog">Browse products →</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="commerce-page" id="main-content">
      <div className="commerce-heading">
        <p className="eyebrow commerce-eyebrow">Your bag</p>
        <h1>Review your selection.</h1>
        <p>{bag.length} unique {bag.length === 1 ? "item" : "items"}, ready for checkout.</p>
      </div>
      <div className="bag-layout">
        <section className="bag-lines" aria-label="Bag items">
          {bag.map(({ product, quantity }) => (
            <article className="bag-line" key={product.id}>
              <Link className="bag-line-image" href={`/products/${product.slug}`}>
                <Image src={product.image} alt={product.imageAlt} width={240} height={180} />
              </Link>
              <div className="bag-line-copy">
                <p className="product-category">{product.category}</p>
                <h2><Link href={`/products/${product.slug}`}>{product.title}</Link></h2>
                <strong>{currency.format(product.price)}</strong>
                <div className="quantity-control" aria-label={`Quantity for ${product.title}`}>
                  <button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                  <span aria-live="polite">{quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                </div>
              </div>
              <button className="text-button" type="button" onClick={() => removeItem(product.id)}>Remove</button>
            </article>
          ))}
        </section>
        <aside className="order-summary" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Order summary</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>{currency.format(subtotal)}</dd></div>
            <div><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : currency.format(delivery)}</dd></div>
            <div className="summary-total"><dt>Total</dt><dd>{currency.format(total)}</dd></div>
          </dl>
          <Link className="solid-button checkout-link" href="/checkout">Continue to checkout</Link>
          <p>Demo checkout only. No real payment will be collected.</p>
        </aside>
      </div>
    </main>
  );
}
