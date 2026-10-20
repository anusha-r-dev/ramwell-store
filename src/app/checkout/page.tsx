import type { Metadata } from "next";
import { CheckoutPage } from "@/features/cart/checkout-page";

export const metadata: Metadata = {
  title: "Demo checkout",
  description: "Complete the Ramwell Store demo checkout flow.",
};

export default function Page() {
  return <CheckoutPage />;
}
