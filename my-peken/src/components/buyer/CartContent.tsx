"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { CartItemCard } from "./CartItemCard";
import { useCart } from "@/context/cart-context";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { formatRupiah } from "../utils/priceUtils";

export function CartContent() {
  const { ready } = useRequireAuth();
  const { items, hydrated, increase, decrease, remove, totalQty, totalPrice } = useCart();

  if (!ready || !hydrated) {
    return <p className="p-3 text-sm text-mypeken-gray">Memuat keranjang...</p>;
  }

  return (
    <div>
      <h1 className="p-3 text-2xl font-bold text-mypeken-black">Keranjang</h1>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* KIRI: daftar produk */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItemCard
                key={item.key}
                item={item}
                editable
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={remove}
              />
            ))
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-mypeken-light-gray bg-white px-4 py-12 text-center">
              <ShoppingCart className="h-10 w-10 text-mypeken-light-gray" aria-hidden="true" />
              <p className="text-sm text-mypeken-gray">Keranjang kamu masih kosong.</p>
              <Link href="/" className="text-sm font-medium text-mypeken-brand underline">
                Lihat produk
              </Link>
            </div>
          )}
        </div>

        {/* KANAN: ringkasan */}
        <div className="sticky top-6 flex flex-col gap-4 rounded-xl border border-mypeken-light-gray bg-white p-5 shadow-sm">
          <h2 className="border-b border-mypeken-light-gray pb-2 text-base font-bold text-mypeken-black">
            Ringkasan Belanja
          </h2>

          <div className="flex items-center justify-between text-sm">
            <span className="text-mypeken-gray">Total ({totalQty} barang)</span>
            <span className="text-base font-bold text-mypeken-black">
              {formatRupiah(totalPrice)}
            </span>
          </div>

          {items.length > 0 ? (
            <Link
              href="/checkout"
              className="w-full rounded-lg bg-mypeken-brand py-2 text-center font-bold text-white transition-colors hover:bg-mypeken-brand/90"
            >
              Checkout
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-lg bg-mypeken-light-gray py-2 font-bold text-mypeken-gray"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
