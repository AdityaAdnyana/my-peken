"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useProductDetail } from "@/services/ProductService";
import { ProductReview, ProductVariant } from "./Product";
import { formatStoreName } from "./product-detail/priceUtils";
import {
    ProductDetailError,
    ProductDetailSkeleton,
} from "./product-detail/ProductDetailStates";
import { ProductImageGallery } from "./product-detail/ProductImageGallery";
import { ProductInfoSection } from "./product-detail/ProductInfoSection";
import { ProductCheckoutSidebar } from "./product-detail/ProductCheckoutSidebar";
import { ProductReviewsSection } from "./product-detail/ProductReviewsSection";

interface ProductDetailProps {
    id?: string;
    toko?: string;
    slug?: string;
    params: "productpage";
}

const ProductDetail = ({ id, toko, params }: ProductDetailProps) => {
    const searchParams = useSearchParams();
    const routeParams = useParams<{ toko?: string; slug?: string }>();

    const effectiveId = id || searchParams.get("id") || "1";
    const effectiveToko = toko || routeParams?.toko;

    const { product, storeMeta, isLoading, isError, mutate } = useProductDetail(effectiveId);

    const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [customReviews, setCustomReviews] = useState<ProductReview[]>([]);

    const galleryImages = useMemo(() => {
        if (!product) return [];
        const imgs =
            Array.isArray(product.images) && product.images.length > 0
                ? product.images
                : [product.thumbnail];
        return imgs.includes(product.thumbnail) ? imgs : [product.thumbnail, ...imgs];
    }, [product]);

    const activeVariant: ProductVariant | undefined = useMemo(() => {
        if (!product?.variant || product.variant.length === 0) return undefined;
        if (selectedVariantId) {
            return product.variant.find((v) => v.id === selectedVariantId) || product.variant[0];
        }
        return product.variant[0];
    }, [product, selectedVariantId]);

    const allReviews = useMemo(() => {
        const apiReviews = product?.reviews || [];
        return [...customReviews, ...apiReviews];
    }, [product?.reviews, customReviews]);

    if (isLoading) {
        return <ProductDetailSkeleton />;
    }

    if (isError || !product) {
        return <ProductDetailError error={isError} onRetry={() => mutate()} />;
    }

    const minOrder = Math.max(1, product.minimumOrderQuantity || 1);
    const availableStock =
        typeof activeVariant?.stock === "number"
            ? activeVariant.stock
            : typeof product.stock === "number"
            ? product.stock
            : 0;

    const unitPrice = product.price + (activeVariant?.priceDelta || 0);
    const discountPct = product.discountPercentage || 0;
    const originalUnitPrice =
        discountPct > 0 ? unitPrice / (1 - discountPct / 100) : unitPrice;

    const storeName = formatStoreName(effectiveToko, product.brand, storeMeta?.name);
    const averageRating =
        allReviews.length > 0
            ? Number(
                  (
                      allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length
                  ).toFixed(1)
              )
            : product.rating || 0;

    const currentImage = galleryImages[selectedImageIdx] || product.thumbnail;

    return (
        <article
            aria-label={`Detail produk ${product.title}`}
            data-page={params}
            className="space-y-8 text-mypeken-black"
        >
            {/* BREADCRUMB NAVIGATION */}
            <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-mypeken-gray"
            >
                <ol className="flex flex-wrap items-center gap-1.5">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-mypeken-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand rounded px-1"
                        >
                            Beranda
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                        <Link
                            href={`/?category=${encodeURIComponent(product.category)}`}
                            className="capitalize hover:text-mypeken-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand rounded px-1"
                        >
                            {product.category}
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li className="text-mypeken-gray">{storeName}</li>
                    <li aria-hidden="true">/</li>
                    <li
                        aria-current="page"
                        className="font-semibold text-mypeken-brand line-clamp-1 max-w-xs"
                    >
                        {product.title}
                    </li>
                </ol>
            </nav>

            {/* MAIN 3-COLUMN PRODUCT GRID */}
            <div className="product-detail-grid">
                <ProductImageGallery
                    title={product.title}
                    images={galleryImages}
                    selectedImageIdx={selectedImageIdx}
                    onSelectImage={setSelectedImageIdx}
                />

                <ProductInfoSection
                    product={product}
                    storeName={storeName}
                    storeMeta={storeMeta}
                    activeVariant={activeVariant}
                    availableStock={availableStock}
                    minOrder={minOrder}
                    unitPrice={unitPrice}
                    originalUnitPrice={originalUnitPrice}
                    discountPct={discountPct}
                    averageRating={averageRating}
                    totalReviews={allReviews.length}
                    onSelectVariant={(variant) => setSelectedVariantId(variant.id)}
                />

                <ProductCheckoutSidebar
                    key={activeVariant?.id || "default-variant"}
                    product={product}
                    currentImage={currentImage}
                    activeVariant={activeVariant}
                    availableStock={availableStock}
                    minOrder={minOrder}
                    unitPrice={unitPrice}
                    originalUnitPrice={originalUnitPrice}
                    discountPct={discountPct}
                    storeName={storeName}
                />
            </div>

            {/* RATING DAN ULASAN PEMBELI */}
            <ProductReviewsSection
                allReviews={allReviews}
                averageRating={averageRating}
                activeVariantName={activeVariant?.name}
                onAddReview={(newReview) =>
                    setCustomReviews((prev) => [newReview, ...prev])
                }
            />
        </article>
    );
};

export default ProductDetail;
