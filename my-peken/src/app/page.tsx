import Image from "next/image"
import ProductList from "@/components/buyer/ProductList"
import { Suspense } from "react";
import Loading from "@/components/general/Loading";

export const instant = false

const Homepage = async ({
    searchParams,
}: {
    searchParams: Promise<{ category: string }>;
}) => {
    const category = (await searchParams).category;
    return (
        <Suspense fallback={<Loading message="Memuat halaman..."/>}>
            <div className="">
                <div className="relative aspect-3/1 mb-12">
                    <Image src="/dummy-banner-mypeken.png" alt="Featured Product" fill />
                </div>
                <ProductList category={category} params={"homepage"}/>
            </div>
        </Suspense>
    )
}

export default Homepage
