"use client"
import { useProductDetail } from "@/services/ProductService";
import Image from "next/image";
import Loading from "../general/Loading";
import { InboxIcon } from "lucide-react"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Button } from "../ui/button";
import { ItemVariant } from "./ItemVariant";
import { ProductType } from "./Product";
import type { ReactElement } from "react";

const ProductDetail = ({ id, params }: { id: string, params: "productpage" }) => {

    const { product, isLoading, isError } = useProductDetail(id);
    if (isLoading) return (<Loading message="Memuat data..." />);
    if (isError || !product) return (<p text-center text-mypeken-highligh mt-8>Gagal memuat produk</p>);


    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="product-thumbnail col-span-2 col-start-1">
                <div className="relative aspect-square">
                    <Image src={product.thumbnail} alt={product.title} fill className="object-contain" />
                </div>
            </div>
            <div className="col-span-2 col-start-3 text-mypeken-black text-center">
                <div>
                    <div>
                        <p>{product.hook || "Produk Unggul"}</p>
                    </div>
                    <div>
                        <h1>{product.title}</h1>
                    </div>
                    <div>
                        <p>Terjual {product.sellQuantity || "N/A"} | Rating {product.rating}</p>
                    </div>
                    <div>
                        <p>Rp {product.price}</p>
                    </div>
                </div>

                <div>
                    <div>
                        {product.variant?.length > 0 && generateVariant({ product })}
                    </div>
                    <div>
                        Informasi produk
                    </div>
                    <div>
                        Deskripsi
                    </div>
                    <div>
                        Ketersedian | Stok
                    </div>
                </div>

                <div>
                    Nama Toko
                    Rating rata-rata, jumlah ulasan
                    Rata-rata waktu proses toko
                </div>
                <div>
                    Daerah pengirim
                </div>
            </div>
            <div className="col-span-2 col-start-5 bg-mypeken-brand text-mypeken-white text-center">
                Formulir tambah transaksi
            </div>
            <div className="col-span-2 col-start-3 bg-mypeken-brand text-mypeken-white text-center">
                Rating dan Ulasan
                <div>
                    Box Rating
                </div>
                <div>Ulasan</div>
            </div>
        </div>
    );
};


function generateVariant({product} : {product : ProductType}){

    let productVariant = product.variant;
    let variant_count = productVariant.length;

    let variantComponent: ReactElement[] = []

    productVariant.forEach(variant => {
       variantComponent.push(<ItemVariant variant={variant}/>); 
    });
    

    
    
    if (variant_count > 10) {
        return <p>Terlalu Banyak Variant, Gagal Memuat...</p>;
    }

    return(
        <div className={`grid grid-cols-${variant_count}`}>
            {variantComponent}
        </div>
    );

};


export default ProductDetail;