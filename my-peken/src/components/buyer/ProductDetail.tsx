"use client"
import { useProductDetail } from "@/services/ProductService";
import Image from "next/image";
import Loading from "../general/Loading";
import { InboxIcon, Star } from "lucide-react"
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
            <div className="col-span-2 col-start-3 text-mypeken-black">
                <div>
                    <div>
                        <p className="text-mypeken-brand font-bold">{product.hook || "Produk Unggul"}</p>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl">{product.title}</h1>
                    </div>
                    <div className="flex text-sm pt-1.5">
                        <p>Terjual {product.sellQuantity || "N/A"} |</p>
                        <p className="text-mypeken-cta font-bold">⭐{product.rating}</p>
                    </div>
                    <div className="pt-2">
                        <p className="text-mypeken-brand font-semibold text-2xl">Rp {product.price}</p>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 pt-2">
                    <div>
                        {product.variant?.length > 0 && generateVariant({ product })}
                    </div>
                    <div>
                        <p className="flex text-mypeken-gray">Minimum beli: <p className="text-mypeken-black px-2">{product.minimumOrderQuantity}</p></p>
                        <div>
                            <p className="text-mypeken-black">Dimensi dan Berat: </p>
                            <p className="flex text-mypeken-gray">Lebar: <p className="text-mypeken-black px-2">{product.dimensions.width != null ? `${product.dimensions.width}cm` : "-" }</p></p>
                            <p className="flex text-mypeken-gray">Tinggi: <p className="text-mypeken-black px-2">{product.dimensions.height != null ? `${product.dimensions.height}cm` : "-" }</p></p>
                            <p className="flex text-mypeken-gray">Panjang: <p className="text-mypeken-black px-2">{product.dimensions.length != null ? `${product.dimensions.length}cm`: "-"}</p></p>
                            <p className="flex text-mypeken-gray">Berat: <p className="text-mypeken-black px-2">{product.weight != null ? `${product.weight}g`: "-"}</p></p>
                        </div>
                    </div>
                    <div className="pt-2">
                        <p>{product.description}</p>
                    </div>
                    <div className="pt-2 font-medium">
                        {product.stock > 0 ? <p className="text-mypeken-brand">Tersedia, Stok {product.stock} Item</p> : <p className="text-mypeken-highligh">Tidak Tersedia</p>} 
                    </div>
                </div>
{/* 
                <div>
                    Nama Toko
                    Rating rata-rata, jumlah ulasan
                    Rata-rata waktu proses toko
                </div>
                <div>
                    Daerah pengirim
                </div> */}

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