import ProductDetail from "@/components/buyer/ProductDetail"

const ProductPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ id: string}>
}) => {
    const id = (await searchParams).id;
    return (
        <div className="">
            <ProductDetail id={id}/>
        </div>
    )
}

export default ProductPage