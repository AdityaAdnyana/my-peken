"use client";

import { useEffect, useMemo, useState } from "react";
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

const STORAGE_ADDED_KEY = "mypeken_added_products";
const STORAGE_UPDATED_KEY = "mypeken_updated_products";
const STORAGE_DELETED_KEY = "mypeken_deleted_products";

function getLocalAddedProducts(): ProductType[] {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(STORAGE_ADDED_KEY);
    return saved ? JSON.parse(saved) : [];
}

function getLocalUpdatedProducts(): Record<string, Partial<ProductType>> {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem(STORAGE_UPDATED_KEY);
    return saved ? JSON.parse(saved) : {};
}

function getLocalDeletedIds(): string[] {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(STORAGE_DELETED_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function mergeWithLocalChanges(apiProducts: ProductType[]): ProductType[] {
    const added = getLocalAddedProducts();
    const updatedMap = getLocalUpdatedProducts();
    const deletedIds = new Set(getLocalDeletedIds());

    const mergedApi = apiProducts
        .filter((p) => !deletedIds.has(String(p.id)))
        .map((p) => {
            const updates = updatedMap[String(p.id)];
            return updates ? ({ ...p, ...updates } as ProductType) : p;
        });

    const mergedAdded = added
        .filter((p) => !deletedIds.has(String(p.id)))
        .map((p) => {
            const updates = updatedMap[String(p.id)];
            return updates ? ({ ...p, ...updates } as ProductType) : p;
        });

    // Hindari duplikasi ID bila ada di added dan apiProducts
    const existingIds = new Set(mergedAdded.map((p) => String(p.id)));
    const filteredApi = mergedApi.filter((p) => !existingIds.has(String(p.id)));

    return [...mergedAdded, ...filteredApi];
}

// POST produk baru ke https://dummyjson.com/products/add
export async function addProductToApi(newProduct: Omit<ProductType, "id">): Promise<ProductType> {
    const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
        throw new Error(`Gagal menambahkan produk (Status: ${res.status})`);
    }

    const result = await res.json();
    // Beri ID unik berbasis timestamp agar tidak bentrok bila men-submit lebih dari 1 produk baru
    const savedProduct: ProductType = {
        ...newProduct,
        ...result,
        id: Date.now(),
        thumbnail: newProduct.thumbnail || result.thumbnail || "/Sakamoto.jpg",
        images: newProduct.images && newProduct.images.length > 0 ? newProduct.images : [newProduct.thumbnail],
    };

    if (typeof window !== "undefined") {
        const currentAdded = getLocalAddedProducts();
        localStorage.setItem(STORAGE_ADDED_KEY, JSON.stringify([savedProduct, ...currentAdded]));
    }

    return savedProduct;
}

// PUT update produk ke https://dummyjson.com/products/{id}
export async function updateProductInApi(id: string | number, updatedFields: Partial<ProductType>): Promise<ProductType> {
    const isNumericApiId = Number(id) <= 194; // ID bawaan DummyJSON 1-194
    let apiResult: Partial<ProductType> = {};

    if (isNumericApiId) {
        const res = await fetch(`https://dummyjson.com/products/${encodeURIComponent(String(id))}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields),
        });
        if (res.ok) {
            apiResult = await res.json();
        }
    } else {
        // Tetap panggil endpoint DummyJSON (id 1) sebagai simulasi request network sesuai spesifikasi
        await fetch("https://dummyjson.com/products/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields),
        });
    }

    const finalUpdate: Partial<ProductType> = {
        ...apiResult,
        ...updatedFields,
        id,
    };

    if (typeof window !== "undefined") {
        const currentUpdated = getLocalUpdatedProducts();
        currentUpdated[String(id)] = {
            ...(currentUpdated[String(id)] || {}),
            ...finalUpdate,
        };
        localStorage.setItem(STORAGE_UPDATED_KEY, JSON.stringify(currentUpdated));
    }

    return finalUpdate as ProductType;
}

// DELETE produk dari https://dummyjson.com/products/{id}
export async function deleteProductFromApi(id: string | number): Promise<void> {
    const isNumericApiId = Number(id) <= 194;

    if (isNumericApiId) {
        const res = await fetch(`https://dummyjson.com/products/${encodeURIComponent(String(id))}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error(`Gagal menghapus produk (Status: ${res.status})`);
        }
    } else {
        await fetch("https://dummyjson.com/products/1", {
            method: "DELETE",
        });
    }

    if (typeof window !== "undefined") {
        const currentDeleted = getLocalDeletedIds();
        if (!currentDeleted.includes(String(id))) {
            localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify([...currentDeleted, String(id)]));
        }
    }
}

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

    const [mergedProducts, setMergedProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        if (data?.products) {
            setMergedProducts(mergeWithLocalChanges(data.products as ProductType[]));
        }
    }, [data]);

    return {
        products: mergedProducts.length > 0 || data?.products ? mergedProducts : ((data?.products || []) as ProductType[]),
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

    const localAdded = typeof window !== "undefined"
        ? getLocalAddedProducts().find((p) => String(p.id) === resolvedId)
        : undefined;

    const {
        data: productData,
        error: productError,
        isLoading: isProductLoading,
        mutate,
    } = useSWR<ProductType>(
        localAdded ? null : `https://dummyjson.com/products/${encodeURIComponent(resolvedId)}`,
        fetcher,
        { shouldRetryOnError: false }
    );

    const product: ProductType | undefined = useMemo(() => {
        const localAdded = typeof window !== "undefined"
            ? getLocalAddedProducts().find((p) => String(p.id) === resolvedId)
            : undefined;
        const rawProduct = localAdded || productData;
        if (!rawProduct) return undefined;

        const localUpdates = typeof window !== "undefined" ? getLocalUpdatedProducts()[resolvedId] : undefined;
        const mergedRawProduct = { ...rawProduct, ...(localUpdates || {}) } as ProductType;
        return normalizeProduct(mergedRawProduct);
    }, [productData, resolvedId]);

    const hasLocalAdded = typeof window !== "undefined" && Boolean(getLocalAddedProducts().find((p) => String(p.id) === resolvedId));

    return {
        product,
        storeMeta: metaData.stores.default,
        isLoading: hasLocalAdded ? false : isProductLoading,
        isError: hasLocalAdded ? undefined : productError,
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
