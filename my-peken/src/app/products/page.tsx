import ProductList from "@/components/buyer/ProductList"

const ProductPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ category: string}>
}) => {
    const category = (await searchParams).category;
    return (
        <div className="">
            <ProductList category={category}/>
        </div>
    )
}

export default ProductPage