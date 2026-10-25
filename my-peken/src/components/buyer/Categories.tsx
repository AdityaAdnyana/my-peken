import { Beef, Carrot, PawPrint, ShoppingBasket } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react";
const categories = [
    { name: "All", icon: <ShoppingBasket className="w-4 h-4"/>, slug: "all" },
    { name: "Vegetables", icon: <Carrot className="w-4 h-4"/>, slug: "vegetables" },
    { name: "Meat", icon: <Beef className="w-4 h-4"/>, slug: "meat" },
    { name: "Pet Supplies", icon: <PawPrint className="w-4 h-4"/>, slug: "pet-supplies" },
]

const CategoryButtons = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const selectedCatagory = searchParams.get("category");

    const handleChange = (value:string | null) =>{
        const params = new URLSearchParams(searchParams);
        params.set("category", value || "all");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-mypeken-light-gray/40 p-2 rounded-lg mb-4 text-sm">
            {categories.map(category=>(
                <button
                    className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 cursor-pointer ${
                        category.slug === selectedCatagory ? "bg-mypeken-brand text-mypeken-white" : "text-mypeken-gray hover:bg-white"
                    }`}
                    key={category.name}
                    onClick={()=>handleChange(category.slug)}
                >
                    {category.icon}
                    {category.name}
                </button>
            ))}
        </div>
    )
}

const Categories = () => {
    return (
        <Suspense fallback={<div>Loading categories...</div>}>
            <CategoryButtons />
        </Suspense>
    );
};

export default Categories