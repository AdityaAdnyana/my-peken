"use client";
import CreateProduk from "@/components/seller/DashboardProduk/CreateProduk";
import ProductList from "@/components/buyer/ProductList";
import { ProductType } from "@/components/buyer/types";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function CreateProdukPage() {
    return (
        <div className="flex flex-col gap-2">
            <CreateProduk onAdd={(newProduct: ProductType) => {
                // Handle the new product addition here
                console.log("New product added:", newProduct);
                alert(`New product added: ${newProduct.name}`);
            }} />
            <h2 className="text-lg font-semibold mt-4">Daftar Produk</h2>
            <SearchBar />
            <ProductList category="all" params="products" />
           <ProductList category="all" params="products" />
        </div>
    )
}