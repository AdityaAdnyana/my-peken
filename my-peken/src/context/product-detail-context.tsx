"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useProductDetail, type StoreMeta } from "@/services/ProductService";
import type { ProductReview, ProductType, ProductVariant } from "@/components/buyer/Product";
import { formatStoreName } from "@/components/utils/priceUtils";
import {
    ProductDetailError,
    ProductDetailSkeleton,
} from "@/components/buyer/product-detail/ProductDetailStates";

interface ProductDetailContextValue {
    product: ProductType;
    title: string;
    storeMeta?: StoreMeta;
    storeName: string;
    images: string[];
    currentImage: string;
    selectedImageIdx: number;
    onSelectImage: (idx: number) => void;
    activeVariant?: ProductVariant;
    activeVariantName?: string;
    onSelectVariant: (variant: ProductVariant) => void;
    availableStock: number;
    minOrder: number;
    unitPrice: number;
    originalUnitPrice: number;
    discountPct: number;
    allReviews: ProductReview[];
    totalReviews: number;
    averageRating: number;
    onAddReview: (review: ProductReview) => void;
}

const ProductDetailContext = createContext<ProductDetailContextValue>({} as ProductDetailContextValue);

export function ProductDetailProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const routeParams = useParams<{ toko?: string; slug?: string }>();

    const effectiveId = searchParams.get("id") || "";
    const effectiveToko = routeParams?.toko;

    const { product, storeMeta, isLoading, isError, mutate } = useProductDetail(effectiveId);

    const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [customReviews, setCustomReviews] = useState<ProductReview[]>([]);

    const images = useMemo(() => {
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

    const currentImage = images[selectedImageIdx] || product.thumbnail;

    const value: ProductDetailContextValue = {
        product,
        title: product.title,
        storeMeta,
        storeName,
        images,
        currentImage,
        selectedImageIdx,
        onSelectImage: setSelectedImageIdx,
        activeVariant,
        activeVariantName: activeVariant?.name,
        onSelectVariant: (variant) => setSelectedVariantId(variant.id),
        availableStock,
        minOrder,
        unitPrice,
        originalUnitPrice,
        discountPct,
        allReviews,
        totalReviews: allReviews.length,
        averageRating,
        onAddReview: (newReview) => setCustomReviews((prev) => [newReview, ...prev]),
    };

    return (
        <ProductDetailContext.Provider value={value}>
            {children}
        </ProductDetailContext.Provider>
    );
}

export function useProductDetailContext() {
    return useContext(ProductDetailContext);
}