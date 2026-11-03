"use client"

import { useState } from "react"
import Categories from "./Categories"
import ProductCard from "./ProductCard"
import { ProductType } from "./Product"
import Link from "next/link"
import Filter from "./Filter"
import {useProduct} from "@/services/ProductService"
import Loading from "../general/Loading"

const ProductList = ({ category, params }: { category: string, params: "homepage" | "products" }) => {
    const { products, isLoading, isError } = useProduct();
    if (isLoading) return <Loading message="memuat data..."/>
    if (isError) return <p className="text-center text-mypeken-highligh mt-8">Error {isError}</p>
    
    category === null ? "all" : category;
    const filteredProducts = category === "all" ? products : products.filter((product: ProductType) => product.category === category);
    return (
        <div className="">
            <Categories />
            {params === "products" && <Filter />}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
                {filteredProducts.map((product: ProductType) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <p className="text-center text-mypeken-gray mt-8">Produk tidak ditemukan. <p className="text-center text-mypeken-gray mt-8">Category saat ini: {category}</p></p>
            )}
            <Link href={category ? `/products/?category=${category}` : "/products"} className="flex justify-end mt-4 underline text-sm text-mypeken-gray">Lihat Semua Produk</Link>
        </div>
    );
};

export default ProductList