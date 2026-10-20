"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useCart } from "@/features/cart/cart-context";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function CheckoutPage() {
  const router = useRouter();
  const { bag, clearBag, count } = useCart();
  const subtotal = bag.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const delivery = subtotal === 0 || subtotal >= 2999 ? 0 : 199;
  const total = subtotal + delivery;

  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const orderReference = `RW-${Date.now().toString().slice(-8)}`;
    const confirmation = new URLSearchParams({
      order: orderReference,
      total: String(total),
      items: String(count),
    });
    clearBag();
    router.push(`/order-confirmation?${confirmation.toString()}`);
  };

  if (bag.length === 0) {
    return (
      <main className="commerce-page" id="main-content">
        <div className="empty-state">
          <div>
            <p className="eyebrow commerce-eyebrow">Demo checkout</p>
            <h1>Your bag is empty.</h1>
            <p>Add at least one product before continuing to checkout.</p>
            <Link className="primary-link" href="/#catalog">Browse products →</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="commerce-page" id="main-content">
      <div className="commerce-heading">
        <p className="eyebrow commerce-eyebrow">Secure checkout demonstration</p>
        <h1>Complete your demo order.</h1>
        <p>Required fields are validated locally. Nothing is sent to a server.</p>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <fieldset className="form-section">
            <legend>Contact</legend>
            <div className="form-grid">
              <label className="form-field form-field-wide">
                Email address
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
          </fieldset>
          <fieldset className="form-section">
            <legend>Delivery address</legend>
            <div className="form-grid">
              <label className="form-field">
                First name
                <input name="firstName" autoComplete="given-name" required />
              </label>
              <label className="form-field">
                Last name
                <input name="lastName" autoComplete="family-name" required />
              </label>
              <label className="form-field form-field-wide">
                Address
                <input name="address" autoComplete="street-address" required />
              </label>
              <label className="form-field">
                City
                <input name="city" autoComplete="address-level2" required />
              </label>
              <label className="form-field">
                State
                <input name="state" autoComplete="address-level1" required />
              </label>
              <label className="form-field">
                PIN code
                <input name="postalCode" inputMode="numeric" pattern="[0-9]{6}" autoComplete="postal-code" required />
              </label>
            </div>
          </fieldset>
          <fieldset className="form-section">
            <legend>Payment simulation</legend>
            <label className="payment-option">
              <input name="payment" type="radio" value="demo" defaultChecked />
              <span><strong>Demo payment</strong><small>No card details or money are collected.</small></span>
            </label>
          </fieldset>
          <button className="solid-button place-order-button" type="submit">
            Place demo order · {currency.format(total)}
          </button>
          <p className="checkout-note">Portfolio demonstration only—not a real purchase.</p>
        </form>
        <aside className="order-summary checkout-summary" aria-labelledby="checkout-summary-heading">
          <h2 id="checkout-summary-heading">Order summary</h2>
          <ul className="checkout-items">
            {bag.map(({ product, quantity }) => (
              <li key={product.id}>
                <span>{product.title} <small>× {quantity}</small></span>
                <strong>{currency.format(product.price * quantity)}</strong>
              </li>
            ))}
          </ul>
          <dl>
            <div><dt>Subtotal</dt><dd>{currency.format(subtotal)}</dd></div>
            <div><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : currency.format(delivery)}</dd></div>
            <div className="summary-total"><dt>Total</dt><dd>{currency.format(total)}</dd></div>
          </dl>
          <Link className="text-link" href="/bag">← Edit bag</Link>
        </aside>
      </div>
    </main>
  );
}
