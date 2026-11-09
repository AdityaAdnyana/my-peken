"use client";

import Link from "next/link";
import TambahProduct from "@/components/seller/DashboardProduk/TambahProduct";

export default function TambahProductPage() {
    return (
        <main className="flex flex-col gap-4 p-4">
            <Link href="/DashboardProduk" className="text-sm text-mypeken-brand underline">
                Kembali ke Etalase Produk
            </Link>
            <TambahProduct />
        </main>
    );
}
