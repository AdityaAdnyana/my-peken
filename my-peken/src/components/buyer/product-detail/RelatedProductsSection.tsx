"use client";

import Link from "next/link";
import { useRelatedProducts } from "@/services/ProductService";
import Loading from "@/components/general/Loading";
import { Button } from "@/components/ui/button";
import ProductCard from "../ProductCard";

interface RelatedProductsSectionProps {
    category: string;
    excludeId: string | number;
}

export function RelatedProductsSection({ category, excludeId }: RelatedProductsSectionProps) {
    const { relatedProducts, isLoading, isError, mutate } = useRelatedProducts(
        category,
        excludeId
    );

    return (
        <section aria-labelledby="related-products-heading" className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
                <h2
                    id="related-products-heading"
                    className="text-lg sm:text-xl font-bold text-mypeken-black"
                >
                    Produk Serupa di Kategori Ini
                </h2>
                <Link
                    href={`/?category=${encodeURIComponent(category)}`}
                    className="text-sm font-medium text-mypeken-brand hover:underline"
                >
                    Lihat Semua
                </Link>
            </div>

            {isLoading ? (
                <Loading message="Memuat produk serupa..." />
            ) : isError ? (
                <div className="flex items-center justify-between rounded-xl border border-mypeken-highligh/30 bg-white p-4 text-sm text-mypeken-highligh">
                    <span>Gagal memuat produk serupa.</span>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => mutate()}
                        className="cursor-pointer"
                    >
                        Muat Ulang
                    </Button>
                </div>
            ) : relatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-mypeken-gray">
                    Tidak ada produk serupa lainnya untuk kategori ini.
                </p>
            )}
        </section>
    );
}
