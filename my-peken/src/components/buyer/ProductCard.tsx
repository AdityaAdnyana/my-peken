"use client"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { ProductType } from "./types"

const ProductCard = ({product} :{product:ProductType}) => {
    return (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white">
            {/* IMAGE */}
            <div className="relative aspect-square">
                <Image src={product.images} alt={product.name} fill className="object-contain p-4 hover:scale-105 transition-all duration-300"/>
            </div>
            {/* DETAIL */}
            <div className="flex flex-col gap-4 p-4">
                <h1 className="font-medium">{product.name}</h1>
                <p className="text-sm text-mypeken-gray">{product.description}</p>
                <div className="flex items-center justify-between">
                    <p className="font-medium text-mypeken-brand">Rp {product.price}</p>
                    <button className="flex items-center gap-2 ring-1 ring-mypeken-light-gray shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-mypeken-white hover:bg-mypeken-brand transition-all duration-300">
                        <ShoppingCart className="w-4 h-4"/>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard