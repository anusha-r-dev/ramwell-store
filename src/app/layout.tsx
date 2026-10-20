import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { StoreHeader } from "@/components/store-header";
import { CartProvider } from "@/features/cart/cart-context";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ramwell Store | Thoughtful products, clearly presented",
    template: "%s | Ramwell Store",
  },
  description:
    "Explore a fast, accessible product catalog built with Next.js, TypeScript, and thoughtful performance patterns.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <StoreHeader />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
