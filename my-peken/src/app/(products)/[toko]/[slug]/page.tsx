import ProductDetail from "@/components/buyer/ProductDetail"
import Loading from "@/components/general/Loading";
import { Suspense } from "react";

export const instant = false

const ProductPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) => {
    const id = (await searchParams).id;
    return (
        <div className="">
            <Suspense fallback={<Loading message="Memuat halaman..."/>}>
                <ProductDetail id={id} params={"productpage"} />
            </Suspense>
        </div>
    )
}

export default ProductPage
