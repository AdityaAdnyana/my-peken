"use client"

import Categories from "./Categories"
import ProductCard from "./ProductCard"
import { ProductType } from "./Product"
import Link from "next/link"
import Filter from "./Filter"
import { useProduct } from "@/services/ProductService"
import Loading from "../general/Loading"

const ProductList = ({ category, params }: { category: string, params: "homepage" | "products" }) => {
    const { products, isLoading, isError } = useProduct();
    if (isLoading) return <Loading message="memuat data..." />
    if (isError) {
        return (
            <p role="alert" className="text-center text-mypeken-highligh mt-8">
                Error: {isError instanceof Error ? isError.message : String(isError)}
            </p>
        )
    }

    const activeCategory = category || "all";
    const filteredProducts =
        activeCategory === "all"
            ? products
            : products.filter((product: ProductType) => product.category === activeCategory);

    return (
        <section aria-labelledby="product-catalog-heading">
            <h2 id="product-catalog-heading" className="sr-only">
                Katalog Produk
            </h2>
            <Categories />
            {params === "products" && <Filter />}
            {filteredProducts.length > 0 ? (
                <ul
                    role="list"
                    aria-label="Daftar produk"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12"
                >
                    {filteredProducts.map((product: ProductType) => (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p role="status" aria-live="polite" className="text-center text-mypeken-gray mt-8">
                    Produk tidak ditemukan.
                </p>
            )}
            <div className="flex justify-end mt-4">
                <Link
                    href={category ? `/products/?category=${category}` : "/products"}
                    className="underline text-sm text-mypeken-gray hover:text-mypeken-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand rounded-sm"
                >
                    Lihat Semua Produk
                </Link>
            </div>
        </section>
    );
};

export default ProductList
