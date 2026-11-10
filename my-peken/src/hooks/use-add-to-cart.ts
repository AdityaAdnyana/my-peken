"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { PENDING_ITEM_KEY, useCart } from "@/context/cart-context";
import type { CartItemType, ProductType, ProductVariant } from "@/components/buyer/Product";

export type AddToCartOptions = {
  qty?: number;
  unitPrice?: number;
  variant?: ProductVariant;
  note?: string;
  storeName?: string;
  buyNow?: boolean;
};

/**
 * Belum login → simpan sebagai pending item + redirect /login (return false)
 * Sudah login → masukkan ke keranjang (return true)
 */
export function useAddToCart() {
  const { isLoggedIn, hydrated } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();

  return useCallback(
    (product: ProductType, options: AddToCartOptions = {}): boolean => {
      if (!hydrated) return false;

      const note = options.note?.trim();
      const item: CartItemType = {
        key: `${product.id}-${options.variant?.id ?? "default"}`,
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        unitPrice: options.unitPrice ?? product.price,
        qty: Math.max(1, options.qty ?? 1),
        variantId: options.variant?.id,
        variantName: options.variant?.name,
        note: note || undefined,
        storeName: options.storeName,
      };

      if (!isLoggedIn) {
        try {
          sessionStorage.setItem(PENDING_ITEM_KEY, JSON.stringify(item));
        } catch {
          // sessionStorage tidak tersedia → tetap redirect
        }
        router.push("/login");
        return false;
      }

      addItem(item);
      if (options.buyNow) router.push("/checkout");
      return true;
    },
    [hydrated, isLoggedIn, addItem, router]
  );
}
