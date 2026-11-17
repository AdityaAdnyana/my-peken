"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { CartItemCard } from "./CartItemCard";
import { useCart } from "@/context/cart-context";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { formatRupiah } from "../utils/priceUtils";

const COURIERS = [
  { id: "jne", label: "JNE" },
  { id: "gojek", label: "GO-JEK" },
  { id: "shopee", label: "Shopee Express" },
];

const PAYMENTS = [
  { id: "bca", label: "BCA Virtual Account" },
  { id: "bri", label: "BRI Virtual Account" },
  { id: "alfamart", label: "Alfamart" },
];

export function CheckoutContent() {
  const { ready } = useRequireAuth();
  const { items, hydrated, totalPrice } = useCart();
  const [courier, setCourier] = useState("jne");
  const [payment, setPayment] = useState("bca");

  if (!ready || !hydrated) {
    return <p className="p-3 text-sm text-mypeken-gray">Memuat checkout...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
        <p className="text-sm text-mypeken-gray">Belum ada produk untuk di-checkout.</p>
        <Link href="/cart" className="text-sm font-medium text-mypeken-brand underline">
          Kembali ke keranjang
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="p-3 text-2xl font-bold text-mypeken-black">Checkout</h1>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* KIRI: alamat, produk, kurir */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-start justify-between gap-4 rounded-xl border border-mypeken-light-gray bg-white p-5 shadow-sm">
            <div>
              <p className="mb-2 flex items-center gap-1 text-xs font-bold tracking-wide text-mypeken-gray uppercase">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Alamat Pengiriman
              </p>
              <p className="text-sm font-bold text-mypeken-black">Kost • Chandra</p>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-mypeken-gray">
                Jalan Wonokromo Tengah V no. 14
              </p>
            </div>
            {/* Halaman ubah alamat belum ada */}
            <button
              type="button"
              disabled
              className="shrink-0 cursor-not-allowed rounded-lg border border-mypeken-light-gray px-3 py-1.5 text-xs font-bold text-mypeken-gray opacity-60"
            >
              Ganti
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <CartItemCard key={item.key} item={item} />
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-mypeken-light-gray bg-white p-4 shadow-sm">
            <label htmlFor="kurir" className="shrink-0 text-sm font-bold text-mypeken-black">
              Pilih Kurir Pengiriman:
            </label>
            <select
              id="kurir"
              name="kurir"
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              className="w-full max-w-xs cursor-pointer rounded-lg border border-mypeken-light-gray bg-white p-2.5 text-sm text-mypeken-black outline-none focus:border-mypeken-brand focus:ring-1 focus:ring-mypeken-brand"
            >
              {COURIERS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* KANAN: pembayaran */}
        <aside className="sticky top-6 flex flex-col gap-4 rounded-xl border border-mypeken-light-gray bg-white p-5 shadow-sm">
          <h2 className="border-b border-mypeken-light-gray pb-2 text-sm font-bold text-mypeken-black">
            Metode Pembayaran
          </h2>

          <div className="flex flex-col gap-3 text-xs">
            {PAYMENTS.map((option) => (
              <label key={option.id} className="flex cursor-pointer items-center justify-between">
                <span className="font-bold text-mypeken-black">{option.label}</span>
                <input
                  type="radio"
                  name="payment"
                  value={option.id}
                  checked={payment === option.id}
                  onChange={(e) => setPayment(e.target.value)}
                  className="h-4 w-4 cursor-pointer accent-mypeken-brand"
                />
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-mypeken-light-gray pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-mypeken-black">Total Tagihan</span>
              <span className="text-base font-bold text-mypeken-black">
                {formatRupiah(totalPrice)}
              </span>
            </div>

            {/* Tombol ini sengaja belum ada logika (milik tim pembayaran) */}
            <button
              type="button"
              className="w-full cursor-pointer rounded-xl bg-mypeken-brand py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-mypeken-brand/90"
            >
              Bayar Sekarang
            </button>
          </div>

          <Link
            href="/cart"
            className="text-center text-xs font-medium text-mypeken-gray underline hover:text-mypeken-brand"
          >
            Kembali ke keranjang
          </Link>
        </aside>
      </div>
    </div>
  );
}
