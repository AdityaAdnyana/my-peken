"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Search } from "lucide-react";
import { ProductType } from "@/components/buyer/Product";
import { useProduct } from "@/services/ProductService";
import FormatRupiah from "@/components/FormatRupiah";

interface SellerProductCardProps {
    product: ProductType;
}

function SellerProductCard({ product }: SellerProductCardProps) {
    const router = useRouter();
    const idrPrice = product.price < 1000 ? Math.round(product.price * 18000) : Math.round(product.price);

    const handleEditClick = () => {
        router.push(`/EditProduct?id=${product.id}`);
    };

    return (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white flex flex-col justify-between">
            {/* IMAGE */}
            <div className="relative aspect-square">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-contain p-4 hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={handleEditClick}
                />
                {product.isHidden && (
                    <span className="absolute top-2 right-2 bg-mypeken-cta/20 text-mypeken-cta text-xs font-semibold px-2 py-1 rounded-full">
                        Hidden
                    </span>
                )}
            </div>

            {/* DETAIL */}
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-medium">{product.title}</h1>
                    <p className="text-xs text-mypeken-gray">
                        Kategori: {product.category} · Stok: {product.stock ?? 0}
                    </p>
                </div>
                <p className="text-sm text-mypeken-gray line-clamp-2">{product.description}</p>

                {/* PRICE AND EDIT BUTTON */}
                <div className="flex items-center justify-between">
                    <FormatRupiah nilai={idrPrice} className="font-medium text-mypeken-brand" />
                    <button
                        type="button"
                        onClick={handleEditClick}
                        className="flex items-center gap-2 ring-1 ring-mypeken-light-gray shadow-lg rounded-md px-3 py-1 text-sm cursor-pointer hover:text-mypeken-white hover:bg-mypeken-brand transition-all duration-300"
                    >
                        <Pencil className="w-4 h-4" />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Etalase() {
    const { products, isLoading, isError } = useProduct();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter((product: ProductType) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return (
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            (product.brand && product.brand.toLowerCase().includes(query))
        );
    });

    return (
        <div className="flex flex-col gap-6 p-4">
            {/* Header, Search, & Button Tambah Produk */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-mypeken-black">Etalase Produk</h2>

                <div className="flex flex-row items-center gap-3 flex-1 max-w-xl">
                    <div className="flex items-center grow gap-2 rounded-md ring-1 ring-mypeken-light-gray bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-mypeken-brand">
                        <Search className="w-4 h-4 text-mypeken-gray shrink-0" />
                        <input
                            type="search"
                            placeholder="Cari produk di etalase..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>

                    <Link
                        href="/TambahProduct"
                        className="flex items-center gap-2 bg-mypeken-brand text-white text-sm font-semibold py-2 px-4 rounded-md shadow-md hover:opacity-90 shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Produk
                    </Link>
                </div>
            </div>

            {/* Info hasil pencarian */}
            {searchQuery.trim() !== "" && (
                <p className="text-sm text-mypeken-gray">
                    Menampilkan {filteredProducts.length} hasil pencarian untuk &quot;{searchQuery}&quot;
                </p>
            )}

            {/* Status Loading / Error */}
            {isLoading && (
                <p className="text-center text-mypeken-gray py-8">Memuat produk etalase...</p>
            )}

            {isError && (
                <p className="text-center text-mypeken-highligh py-8">
                    Gagal memuat data produk.
                </p>
            )}

            {/* Daftar Produk */}
            {!isLoading && !isError && (
                <>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product: ProductType) => (
                                <SellerProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-mypeken-gray py-8">
                            Produk tidak ditemukan.
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
