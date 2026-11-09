"use client";

import useSWR from "swr";
import { ProductType, ProductVariant } from "@/components/buyer/Product";
import rawMetaData from "../../public/mock/product-detail-meta.json";

export interface StoreMeta {
    name: string;
    badge: string;
    processTime: string;
    origin: string;
    localShippingCost: number;
    defaultShippingEstimate: string;
    defaultWarranty: string;
    defaultReturnPolicy: string;
}

interface RawVariantTemplate {
    id: string;
    name: string;
    description: string;
    priceMultiplier: number;
    stockRatio: number;
}

interface ProductDetailMetaResponse {
    stores: {
        default: StoreMeta;
    };
    hooksByCategory: Record<string, string>;
    variantsByCategory: Record<string, RawVariantTemplate[]>;
}

const metaData: ProductDetailMetaResponse = rawMetaData;

export const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("Produk yang Anda cari tidak ditemukan (404).");
        }
        throw new Error(`Gagal memuat data dari server (Status: ${res.status}).`);
    }
    return res.json();
};

export function useProduct() {
    const { data, error, isLoading, mutate } = useSWR(
        "https://dummyjson.com/products",
        fetcher
    );

    return {
        products: (data?.products || []) as ProductType[],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useProductDetail(id?: string | number) {
    // Jika id kosong/undefined, gunakan fallback id "1" agar halaman tetap menampilkan produk
    const resolvedId =
        id !== undefined && id !== null && String(id).trim() !== ""
            ? String(id).trim()
            : "1";

    const {
        data: productData,
        error: productError,
        isLoading: isProductLoading,
        mutate,
    } = useSWR<ProductType>(
        `https://dummyjson.com/products/${encodeURIComponent(resolvedId)}`,
        fetcher,
        { shouldRetryOnError: false }
    );

    const product: ProductType | undefined = productData
        ? normalizeProduct(productData)
        : undefined;

    return {
        product,
        storeMeta: metaData.stores.default,
        isLoading: isProductLoading,
        isError: productError,
        mutate,
    };
}

function normalizeProduct(productData: ProductType): ProductType {
    const categoryKey = (productData.category || "").toLowerCase();
    const templates =
        metaData.variantsByCategory[categoryKey] ||
        metaData.variantsByCategory.default;
    const baseStock = typeof productData.stock === "number" ? productData.stock : 20;

    const fetchedVariants: ProductVariant[] =
        Array.isArray(productData.variant) && productData.variant.length > 0
            ? productData.variant
            : templates.map((tpl) => ({
                  id: `${productData.id}-${tpl.id}`,
                  name: tpl.name,
                  description: tpl.description,
                  priceDelta:
                      Math.round(productData.price * tpl.priceMultiplier * 100) / 100,
                  stock: Math.max(1, Math.floor(baseStock * tpl.stockRatio)),
              }));

    const idNum = Number(productData.id) || 1;
    const computedSellQuantity =
        productData.sellQuantity ??
        idNum * 25 + (productData.reviews?.length || 0) * 10;

    return {
        ...productData,
        hook:
            productData.hook ||
            metaData.hooksByCategory[categoryKey] ||
            metaData.hooksByCategory.default,
        sellQuantity: computedSellQuantity,
        dimensions: {
            width: productData.dimensions?.width,
            height: productData.dimensions?.height,
            depth: productData.dimensions?.depth,
            length: productData.dimensions?.length ?? productData.dimensions?.depth,
        },
        variant: fetchedVariants,
    };
}