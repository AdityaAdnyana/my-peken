"use client"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { ProductType } from "./Product"
import { usePathname, useRouter } from "next/navigation"
import { formatRupiah } from "../utils/priceUtils"

const ProductCard = ({ product }: { product: ProductType }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handlePathChange = () => {
        const namaToko = "nama-toko"
        const slug = product.title.replaceAll(" ", "-").toLowerCase()
        router.push(`/${namaToko}/${slug}?id=${product.id}`, { scroll: false });
    };
    return (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white">
            {/* IMAGE */}
            <div className="relative aspect-square">
                <Image src={product.thumbnail} alt={product.title} fill className="object-contain p-4 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => handlePathChange()} />
            </div>
            {/* DETAIL */}
            <div className="flex flex-col gap-4 p-4">
                <h1 className="font-medium">{product.title}</h1>
                <p className="text-sm text-mypeken-gray">{product.description}</p>
                {/* PRICE AND ADD TO CART */}
                <div className="flex items-center justify-between">
                    <p className="font-medium text-mypeken-brand">{formatRupiah(product.price)}</p>
                    <button className="flex items-center gap-2 ring-1 ring-mypeken-light-gray shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-mypeken-white hover:bg-mypeken-brand transition-all duration-300">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
