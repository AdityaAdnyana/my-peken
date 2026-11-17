"use client";

import Link from "next/link";
import {
    ProductDetailProvider,
    useProductDetailContext,
} from "@/context/product-detail-context";
import { ProductImageGallery } from "./product-detail/ProductImageGallery";
import { ProductInfoSection } from "./product-detail/ProductInfoSection";
import { ProductCheckoutSidebar } from "./product-detail/ProductCheckoutSidebar";
import { ProductReviewsSection } from "./product-detail/ProductReviewsSection";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductDetailProps {
    params: "productpage";
}

const ProductDetailContent = ({ params }: ProductDetailProps) => {
    const { product, storeName, activeVariant } = useProductDetailContext();

    return (
        <article
            aria-label={`Detail produk ${product.title}`}
            data-page={params}
            className="space-y-8 text-mypeken-black"
        >
            {/* BREADCRUMB NAVIGATION */}
            <Breadcrumb>
                <BreadcrumbList className="text-xs sm:text-sm text-mypeken-gray">
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            render={<Link href="/" />}
                            className="hover:text-mypeken-brand hover:underline"
                        >
                            Beranda
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>/</BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            render={<Link href={`/?category=${encodeURIComponent(product.category)}`} />}
                            className="capitalize hover:text-mypeken-brand hover:underline"
                        >
                            {product.category}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>/</BreadcrumbSeparator>

                    <BreadcrumbItem>{storeName}</BreadcrumbItem>

                    <BreadcrumbSeparator>/</BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-mypeken-brand line-clamp-1 max-w-xs">
                            {product.title}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* MAIN 3-COLUMN PRODUCT GRID */}
            <div className="product-detail-grid">
                <ProductImageGallery />

                <ProductInfoSection />

                <ProductCheckoutSidebar key={activeVariant?.id || "default-variant"} />
            </div>

            {/* RATING DAN ULASAN PEMBELI */}
            <ProductReviewsSection />
        </article>
    );
};

const ProductDetail = ({ params }: ProductDetailProps) => (
    <ProductDetailProvider>
        <ProductDetailContent params={params} />
    </ProductDetailProvider>
);

export default ProductDetail;