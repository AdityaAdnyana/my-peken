"use client"
import { useProductDetail } from "@/services/ProductService";
import Image from "next/image";
import Loading from "../general/Loading";

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
            <div className="col-span-2 col-start-3 bg-mypeken-brand text-mypeken-white text-center">
                <div>
                    <div>
                        Product Hook
                    </div>
                    <div>
                        Judul Produk
                    </div>
                    <div>
                        Jumlah Terjual | Rating
                    </div>
                    <div>
                        Harga
                    </div>
                </div>

                <div>
                    <div>
                        Variant   
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


export default ProductDetail;