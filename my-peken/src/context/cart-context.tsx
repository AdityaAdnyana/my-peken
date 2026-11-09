"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { CartItemType } from "@/components/buyer/Product";
import { useAuth } from "./auth-context";

const CART_KEY = "mypeken_cart";
export const PENDING_ITEM_KEY = "mypeken_pending_item";
const CART_EVENT = "mypeken:cart";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_EVENT, callback);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(CART_KEY) ?? "";
  } catch {
    return "";
  }
}

// null = belum hydration
function getServerSnapshot(): string | null {
  return null;
}

function writeCart(items: CartItemType[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
  } catch {
    // localStorage tidak tersedia → abaikan
  }
}

type CartContextValue = {
  items: CartItemType[];
  hydrated: boolean;
  addItem: (item: CartItemType) => void;
  increase: (key: string) => void;
  decrease: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  totalQty: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, hydrated: authHydrated } = useAuth();
  const raw = useSyncExternalStore<string | null>(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = raw !== null;

  const items = useMemo<CartItemType[]>(() => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as CartItemType[]) : [];
    } catch {
      return [];
    }
  }, [raw]);

  const addItem = useCallback(
    (item: CartItemType) => {
      const found = items.find((x) => x.key === item.key);
      writeCart(
        found
          ? items.map((x) =>
              x.key === item.key
                ? { ...x, qty: x.qty + item.qty, note: x.note ?? item.note }
                : x
            )
          : [...items, item]
      );
    },
    [items]
  );

  const increase = useCallback(
    (key: string) => {
      writeCart(items.map((x) => (x.key === key ? { ...x, qty: x.qty + 1 } : x)));
    },
    [items]
  );

  const decrease = useCallback(
    (key: string) => {
      writeCart(items.map((x) => (x.key === key ? { ...x, qty: Math.max(1, x.qty - 1) } : x)));
    },
    [items]
  );

  const remove = useCallback(
    (key: string) => {
      writeCart(items.filter((x) => x.key !== key));
    },
    [items]
  );

  const clear = useCallback(() => writeCart([]), []);

  // Produk yang diklik saat belum login → masukkan otomatis setelah login
  useEffect(() => {
    if (!hydrated || !authHydrated || !isLoggedIn) return;

    let pendingRaw: string | null = null;
    try {
      pendingRaw = sessionStorage.getItem(PENDING_ITEM_KEY);
      if (!pendingRaw) return;
      sessionStorage.removeItem(PENDING_ITEM_KEY);
    } catch {
      return;
    }

    try {
      const pending = JSON.parse(pendingRaw) as CartItemType;
      if (pending?.key) addItem(pending);
    } catch {
      // pending item rusak → abaikan
    }
  }, [hydrated, authHydrated, isLoggedIn, addItem]);

  const totalQty = useMemo(() => items.reduce((n, x) => n + x.qty, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((n, x) => n + x.unitPrice * x.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, hydrated, addItem, increase, decrease, remove, clear, totalQty, totalPrice }),
    [items, hydrated, addItem, increase, decrease, remove, clear, totalQty, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam <CartProvider>");
  return ctx;
}
