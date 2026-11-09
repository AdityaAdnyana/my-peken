export type ProductDimensions = {
    width?: number;
    height?: number;
    depth?: number;
    length?: number;
};

export type ProductReview = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
    variantName?: string;
};

export type ProductVariant = {
    id: string;
    name: string;
    description?: string;
    priceDelta?: number;
    stock?: number;
};

export type ProductMeta = {
    createdAt?: string;
    updatedAt?: string;
    barcode?: string;
    qrCode?: string;
};

export type ProductType = {
    id: string | number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    tags?: string[];
    brand?: string;
    sku?: string;
    weight?: number;
    dimensions?: ProductDimensions;
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: ProductReview[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: ProductMeta;
    images?: string[];
    thumbnail: string;
    hook?: string;
    sellQuantity?: number;
    variant?: ProductVariant[];
};

export type ProductsType = ProductType[];

/** Satu baris keranjang: produk + varian + jumlah */
export type CartItemType = {
    key: string;              // `${productId}-${variantId ?? "default"}`
    productId: string | number;
    title: string;
    thumbnail: string;
    unitPrice: number;
    qty: number;
    variantId?: string;
    variantName?: string;
    note?: string;
    storeName?: string;
};
