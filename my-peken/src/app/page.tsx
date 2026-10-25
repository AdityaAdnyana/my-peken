import Image from "next/image"
import ProductList from "@/components/buyer/ProductList"
const Homepage = async ({
    searchParams,
}: {
    searchParams: Promise<{ category: string}>;
}) => {
    const category = (await searchParams).category;
    return (
        <div className="">
            <div className="relative aspect-[3/1] mb-12">
                <Image src="/dummy-banner-mypeken.png" alt="Featured Product" fill/>
            </div>
            <ProductList category={category}/>
        </div>
    )
}

export default Homepage