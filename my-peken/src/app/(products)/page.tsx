import ProductList from "@/components/buyer/ProductList"
import Loading from "@/components/general/Loading";
import { Suspense } from "react";

export const instant = false

const ProductPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ category: string }>
}) => {
    const category = (await searchParams).category;
    return (
        <div className="">
            <Suspense fallback={<Loading message="Memuat halaman..."/>}>
                <ProductList category={category} params={"products"}/>
            </Suspense>
        </div>
    )
}

export default ProductPage
