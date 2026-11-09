"use client";
import CreateProduk from "@/components/seller/DashboardProduk/CreateProduk";
import ProductList from "@/components/buyer/ProductList";
import { ProductType } from "@/components/buyer/types";
import SearchBar from "@/components/SearchBar";
import { Link } from "lucide-react";
import { Button } from "@base-ui/react";

export default function CreateProdukPage() {
    return (
        <div className="flex flex-col gap-2">
            <CreateProduk onAdd={(newProduct: ProductType) => {

                console.log("New product added:", newProduct);
                alert(`New product added: ${newProduct.name}`);
            }} />
            <h2 className="text-lg font-semibold mt-4">Daftar Produk</h2>
            <div className="grid flex-row  gap-4">
                <SearchBar />
                <Button  className="bg-mypeken-brand text-white py-2 px-4 rounded">
                    <Link href="/(seller)/CreateProduk">Tambah Produk</Link>
                </Button>                
            </div>
            <ProductList category="all" params="products" />
            <ProductList category="all" params="products" />
        </div>
    )
}