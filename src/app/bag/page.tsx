import type { Metadata } from "next";
import { BagPage } from "@/features/cart/bag-page";

export const metadata: Metadata = {
  title: "Shopping bag",
  description: "Review quantities, delivery, and the total for your Ramwell Store order.",
};

export default function Page() {
  return <BagPage />;
}
