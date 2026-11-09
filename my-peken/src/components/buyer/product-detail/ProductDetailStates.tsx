"use client";

import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import Loading from "@/components/general/Loading";
import { Button } from "@/components/ui/button";

export function ProductDetailSkeleton() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Memuat detail produk"
            className="space-y-6 py-4"
        >
            <div className="flex items-center justify-center">
                <Loading message="Memuat data detail produk..." />
            </div>
            <div className="product-detail-grid animate-pulse">
                <div className="product-gallery-col space-y-3">
                    <div className="aspect-square w-full rounded-xl bg-mypeken-light-gray" />
                    <div className="grid grid-cols-4 gap-2">
                        <div className="aspect-square rounded-lg bg-mypeken-light-gray" />
                        <div className="aspect-square rounded-lg bg-mypeken-light-gray" />
                        <div className="aspect-square rounded-lg bg-mypeken-light-gray" />
                        <div className="aspect-square rounded-lg bg-mypeken-light-gray" />
                    </div>
                </div>
                <div className="product-info-col space-y-4 p-2">
                    <div className="h-4 w-32 rounded bg-mypeken-light-gray" />
                    <div className="h-7 w-3/4 rounded bg-mypeken-light-gray" />
                    <div className="h-4 w-1/2 rounded bg-mypeken-light-gray" />
                    <div className="h-9 w-44 rounded bg-mypeken-light-gray" />
                    <div className="h-24 w-full rounded bg-mypeken-light-gray" />
                    <div className="h-32 w-full rounded bg-mypeken-light-gray" />
                </div>
                <div className="product-checkout-col rounded-xl bg-mypeken-light-gray h-96" />
            </div>
        </div>
    );
}

interface ProductDetailErrorProps {
    error?: unknown;
    onRetry: () => void;
}

export function ProductDetailError({ error, onRetry }: ProductDetailErrorProps) {
    return (
        <section
            role="alert"
            aria-live="assertive"
            className="my-10 mx-auto max-w-lg rounded-2xl border border-mypeken-light-gray bg-white p-8 text-center shadow-md"
        >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-mypeken-highligh/10 text-mypeken-highligh">
                <AlertCircle className="h-8 w-8" aria-hidden="true" />
            </div>
            <h1 className="text-xl font-bold text-mypeken-black">Gagal Memuat Produk</h1>
            <p className="mt-2 text-sm text-mypeken-gray">
                {error instanceof Error
                    ? error.message
                    : "Data produk tidak dapat ditemukan atau sedang terjadi gangguan pada server."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button
                    type="button"
                    variant="default"
                    onClick={onRetry}
                    className="gap-2 bg-mypeken-brand text-mypeken-white cursor-pointer"
                >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    Coba Lagi
                </Button>
                <Link
                    href="/"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-mypeken-light-gray bg-white px-4 text-sm font-medium text-mypeken-black hover:bg-mypeken-light-gray/40"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </section>
    );
}
