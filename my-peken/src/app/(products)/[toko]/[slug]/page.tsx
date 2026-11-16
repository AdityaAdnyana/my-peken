import ProductDetail from "@/components/buyer/ProductDetail"
import Loading from "@/components/general/Loading";
import { Suspense } from "react";

export const instant = false

const ProductPage = () => {
    return (
        <div className="">
            <Suspense fallback={<Loading message="Memuat halaman..."/>}>
                <ProductDetail params={"productpage"} />
            </Suspense>
        </div>
    )
}

export default ProductPage