"use client";

import { useState, type ReactElement } from "react";
import {
    Award,
    Clock,
    MapPin,
    PackageCheck,
    RotateCcw,
    ShieldCheck,
    Star,
    Store,
    Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemVariant } from "../ItemVariant";
import { ProductType, ProductVariant } from "../Product";
import { StoreMeta } from "@/services/ProductService";
import { formatRupiah } from "./priceUtils";

interface ProductInfoSectionProps {
    product: ProductType;
    storeName: string;
    storeMeta?: StoreMeta;
    activeVariant?: ProductVariant;
    availableStock: number;
    minOrder: number;
    unitPrice: number;
    originalUnitPrice: number;
    discountPct: number;
    averageRating: number;
    totalReviews: number;
    onSelectVariant: (variant: ProductVariant) => void;
}

export function ProductInfoSection({
    product,
    storeName,
    storeMeta,
    activeVariant,
    availableStock,
    minOrder,
    unitPrice,
    originalUnitPrice,
    discountPct,
    averageRating,
    totalReviews,
    onSelectVariant,
}: ProductInfoSectionProps) {
    const [isFollowingStore, setIsFollowingStore] = useState<boolean>(false);

    return (
        <section
            aria-labelledby="product-title-heading"
            className="product-info-col space-y-5"
        >
            {/* HEADER INFO */}
            <header className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    {product.hook && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-mypeken-brand/10 px-3 py-0.5 text-xs font-bold text-mypeken-brand">
                            <Award className="h-3.5 w-3.5" aria-hidden="true" />
                            {product.hook}
                        </span>
                    )}
                    <span className="rounded-full bg-mypeken-light-gray/60 px-2.5 py-0.5 text-xs font-medium capitalize text-mypeken-black">
                        {product.category}
                    </span>
                </div>

                <h1
                    id="product-title-heading"
                    className="text-xl sm:text-2xl font-bold text-mypeken-black leading-snug"
                >
                    {product.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-sm text-mypeken-gray pt-0.5">
                    <span>
                        Terjual{" "}
                        <strong className="text-mypeken-black">{product.sellQuantity}</strong>
                    </span>
                    <span aria-hidden="true">•</span>
                    <a
                        href="#ulasan-produk"
                        className="inline-flex items-center gap-1 font-bold text-mypeken-cta hover:underline"
                    >
                        <Star
                            className="h-4 w-4 fill-mypeken-cta text-mypeken-cta"
                            aria-hidden="true"
                        />
                        <span>{averageRating}</span>
                        <span className="font-normal text-mypeken-gray">
                            ({totalReviews} ulasan)
                        </span>
                    </a>
                </div>

                {/* PRICE BOX */}
                <div className="pt-2">
                    <p className="text-2xl sm:text-3xl font-bold text-mypeken-brand">
                        {formatRupiah(unitPrice)}
                    </p>
                    {discountPct > 0 && (
                        <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm">
                            <span className="rounded bg-mypeken-highligh/15 px-1.5 py-0.5 font-bold text-mypeken-highligh">
                                {Math.round(discountPct)}% OFF
                            </span>
                            <span className="text-mypeken-gray line-through">
                                {formatRupiah(originalUnitPrice)}
                            </span>
                        </div>
                    )}
                </div>
            </header>

            {/* VARIANT SELECTOR */}
            {product.variant && product.variant.length > 0 && (
                <div className="border-t border-mypeken-light-gray pt-4 space-y-2.5">
                    <h2 className="text-sm font-semibold text-mypeken-black">
                        Pilih Varian:{" "}
                        <span className="font-normal text-mypeken-brand">
                            {activeVariant?.name}
                        </span>
                    </h2>
                    {generateVariant({
                        product,
                        selectedVariantId: activeVariant?.id || "",
                        onSelectVariant,
                    })}
                </div>
            )}

            {/* STATUS STOK */}
            <div className="border-t border-mypeken-light-gray pt-4 flex items-center justify-between text-sm">
                <span className="font-medium text-mypeken-gray">Status Stok:</span>
                {availableStock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-mypeken-brand">
                        <PackageCheck className="h-4 w-4" aria-hidden="true" />
                        Tersedia, Stok {availableStock} Item
                    </span>
                ) : (
                    <span className="font-semibold text-mypeken-highligh">Tidak Tersedia</span>
                )}
            </div>

            {/* 1. DETAIL & DESKRIPSI (DITULIS KE BAWAH TANPA CARD) */}
            <div className="border-t border-mypeken-light-gray pt-4 space-y-3 text-sm leading-relaxed">
                <h2 className="text-base font-bold text-mypeken-black">
                    Detail & Deskripsi
                </h2>
                <dl className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm">
                    <div>
                        <dt className="text-mypeken-gray">Minimum Beli</dt>
                        <dd className="font-semibold text-mypeken-black">{minOrder} Item</dd>
                    </div>
                    <div>
                        <dt className="text-mypeken-gray">Status Produk</dt>
                        <dd className="font-semibold text-mypeken-black">
                            {product.availabilityStatus || "Ready Stock"}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-mypeken-gray">SKU Produk</dt>
                        <dd className="font-semibold text-mypeken-black">
                            {product.sku || "-"}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-mypeken-gray">Kategori</dt>
                        <dd className="font-semibold capitalize text-mypeken-black">
                            {product.category}
                        </dd>
                    </div>
                </dl>
                <p className="text-mypeken-black whitespace-pre-line">
                    {product.description}
                </p>
                {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {product.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-mypeken-light-gray/60 px-2 py-0.5 text-xs text-mypeken-black"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* 2. DIMENSI & SPESIFIKASI (DITULIS KE BAWAH TANPA CARD) */}
            <div className="border-t border-mypeken-light-gray pt-4 space-y-2.5 text-sm">
                <h2 className="text-base font-bold text-mypeken-black">
                    Dimensi & Spesifikasi
                </h2>
                <dl className="product-specs-grid text-sm">
                    <div className="flex justify-between border-b border-mypeken-light-gray pb-1.5">
                        <dt className="text-mypeken-gray">Lebar:</dt>
                        <dd className="font-medium text-mypeken-black">
                            {product.dimensions?.width != null
                                ? `${product.dimensions.width} cm`
                                : "-"}
                        </dd>
                    </div>
                    <div className="flex justify-between border-b border-mypeken-light-gray pb-1.5">
                        <dt className="text-mypeken-gray">Tinggi:</dt>
                        <dd className="font-medium text-mypeken-black">
                            {product.dimensions?.height != null
                                ? `${product.dimensions.height} cm`
                                : "-"}
                        </dd>
                    </div>
                    <div className="flex justify-between border-b border-mypeken-light-gray pb-1.5">
                        <dt className="text-mypeken-gray">Panjang:</dt>
                        <dd className="font-medium text-mypeken-black">
                            {product.dimensions?.length != null
                                ? `${product.dimensions.length} cm`
                                : "-"}
                        </dd>
                    </div>
                    <div className="flex justify-between border-b border-mypeken-light-gray pb-1.5">
                        <dt className="text-mypeken-gray">Berat:</dt>
                        <dd className="font-medium text-mypeken-black">
                            {product.weight != null ? `${product.weight * 100} g` : "-"}
                        </dd>
                    </div>
                </dl>
            </div>

            {/* 3. INFO PENTING (DITULIS KE BAWAH TANPA CARD) */}
            <div className="border-t border-mypeken-light-gray pt-4 space-y-3 text-sm">
                <h2 className="text-base font-bold text-mypeken-black">Info Penting</h2>
                <div className="flex items-start gap-2.5">
                    <ShieldCheck
                        className="h-5 w-5 shrink-0 text-mypeken-brand mt-0.5"
                        aria-hidden="true"
                    />
                    <div>
                        <p className="font-semibold text-mypeken-black">Garansi & Kualitas</p>
                        <p className="text-xs text-mypeken-gray">
                            {product.warrantyInformation || storeMeta?.defaultWarranty}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-2.5">
                    <RotateCcw
                        className="h-5 w-5 shrink-0 text-mypeken-brand mt-0.5"
                        aria-hidden="true"
                    />
                    <div>
                        <p className="font-semibold text-mypeken-black">
                            Kebijakan Pengembalian
                        </p>
                        <p className="text-xs text-mypeken-gray">
                            {product.returnPolicy || storeMeta?.defaultReturnPolicy}
                        </p>
                    </div>
                </div>
            </div>

            {/* STORE INFO & SHIPPING ORIGIN (TANPA CARD) */}
            <section
                aria-label="Informasi Toko dan Pengiriman"
                className="border-t border-mypeken-light-gray pt-4 space-y-4"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mypeken-brand text-mypeken-white font-bold">
                            <Store className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-bold text-mypeken-black text-base">
                                    {storeName}
                                </h3>
                                {storeMeta?.badge && (
                                    <span className="rounded bg-mypeken-brand/15 px-2 py-0.5 text-[11px] font-semibold text-mypeken-brand">
                                        {storeMeta.badge}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mypeken-gray">
                                <span className="inline-flex items-center gap-1">
                                    <Star
                                        className="h-3.5 w-3.5 fill-mypeken-cta text-mypeken-cta"
                                        aria-hidden="true"
                                    />
                                    <strong className="text-mypeken-black">{averageRating}</strong>{" "}
                                    ({totalReviews} ulasan)
                                </span>
                                <span aria-hidden="true">•</span>
                                <span className="inline-flex items-center gap-1">
                                    <Clock
                                        className="h-3.5 w-3.5 text-mypeken-brand"
                                        aria-hidden="true"
                                    />
                                    Proses pesanan:{" "}
                                    <strong className="text-mypeken-black">
                                        {storeMeta?.processTime}
                                    </strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant={isFollowingStore ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsFollowingStore((prev) => !prev)}
                        className="cursor-pointer shrink-0 border-mypeken-light-gray"
                    >
                        {isFollowingStore ? "Mengikuti Toko" : "+ Ikuti Toko"}
                    </Button>
                </div>

                <div className="border-t border-mypeken-light-gray pt-3 space-y-2 text-xs sm:text-sm">
                    <h3 className="font-semibold text-mypeken-black flex items-center gap-2">
                        <Truck className="h-4 w-4 text-mypeken-brand" aria-hidden="true" />
                        Informasi Pengiriman
                    </h3>
                    <div className="flex items-center justify-between text-mypeken-gray">
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-mypeken-brand" aria-hidden="true" />
                            Dikirim dari:
                        </span>
                        <strong className="text-mypeken-black">{storeMeta?.origin}</strong>
                    </div>
                    <div className="flex items-center justify-between text-mypeken-gray">
                        <span>Estimasi tiba:</span>
                        <strong className="text-mypeken-black">
                            {product.shippingInformation || storeMeta?.defaultShippingEstimate}
                        </strong>
                    </div>
                    {storeMeta?.localShippingCost != null && (
                        <div className="flex items-center justify-between text-mypeken-gray">
                            <span>Ongkos Kirim Kurir Lokal:</span>
                            <strong className="text-mypeken-brand">
                                Mulai {formatRupiah(storeMeta.localShippingCost)}
                            </strong>
                        </div>
                    )}
                </div>
            </section>
        </section>
    );
}

function generateVariant({
    product,
    selectedVariantId,
    onSelectVariant,
}: {
    product: ProductType;
    selectedVariantId: string;
    onSelectVariant: (variant: ProductVariant) => void;
}) {
    const productVariant = product.variant || [];
    const variant_count = productVariant.length;

    if (variant_count > 10) {
        return (
            <p role="alert" className="text-sm text-mypeken-highligh">
                Terlalu Banyak Variant, Gagal Memuat...
            </p>
        );
    }

    const variantComponent: ReactElement[] = productVariant.map((variant) => (
        <ItemVariant
            key={variant.id}
            variant={variant}
            isSelected={variant.id === selectedVariantId}
            onSelect={onSelectVariant}
            formatPrice={formatRupiah}
        />
    ));

    return (
        <div
            role="radiogroup"
            aria-label="Pilihan varian produk"
            className="product-variants-grid"
        >
            {variantComponent}
        </div>
    );
}
