"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CatalogProduct } from "@/features/products/product.types";

export type BagLine = {
  product: CatalogProduct;
  quantity: number;
};

type CartContextValue = {
  bag: BagLine[];
  count: number;
  saved: CatalogProduct[];
  savedCount: number;
  addItem: (product: CatalogProduct) => void;
  clearBag: () => void;
  hasItem: (productId: string) => boolean;
  isSaved: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  toggleSaved: (product: CatalogProduct) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>([]);
  const [saved, setSaved] = useState<CatalogProduct[]>([]);

  const value = useMemo<CartContextValue>(
    () => ({
      bag,
      count: bag.reduce((total, line) => total + line.quantity, 0),
      saved,
      savedCount: saved.length,
      addItem: (product) => {
        setBag((currentBag) => {
          const existingLine = currentBag.find(
            (line) => line.product.id === product.id,
          );
          if (existingLine) {
            return currentBag.map((line) =>
              line.product.id === product.id
                ? { ...line, quantity: line.quantity + 1 }
                : line,
            );
          }
          return [...currentBag, { product, quantity: 1 }];
        });
      },
      clearBag: () => setBag([]),
      hasItem: (productId) =>
        bag.some((line) => line.product.id === productId),
      isSaved: (productId) =>
        saved.some((product) => product.id === productId),
      removeItem: (productId) =>
        setBag((currentBag) =>
          currentBag.filter((line) => line.product.id !== productId),
        ),
      toggleSaved: (product) =>
        setSaved((currentSaved) =>
          currentSaved.some((item) => item.id === product.id)
            ? currentSaved.filter((item) => item.id !== product.id)
            : [...currentSaved, product],
        ),
      updateQuantity: (productId, quantity) =>
        setBag((currentBag) =>
          quantity < 1
            ? currentBag.filter((line) => line.product.id !== productId)
            : currentBag.map((line) =>
                line.product.id === productId ? { ...line, quantity } : line,
              ),
        ),
    }),
    [bag, saved],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
