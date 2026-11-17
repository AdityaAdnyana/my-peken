"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EditProduc from "@/components/seller/DashboardProduk/EditProduc";

function EditProductContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "1";

    return <EditProduc productId={id} />;
}

export default function EditProductPage() {
    return (
        <main className="flex flex-col gap-4 p-4">
            <Link href="/DashboardProduk" className="text-sm text-mypeken-brand underline">
                Kembali ke Etalase Produk
            </Link>
            <Suspense fallback={<p className="text-sm text-mypeken-gray">Memuat form edit...</p>}>
                <EditProductContent />
            </Suspense>
        </main>
    );
}
