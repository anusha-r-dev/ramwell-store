import type { Metadata } from "next";
import { SavedPage } from "@/features/cart/saved-page";

export const metadata: Metadata = {
  title: "Saved products",
  description: "Review products saved to your Ramwell Store shortlist.",
};

export default function Page() {
  return <SavedPage />;
}
