import { Beef, Carrot, PawPrint, ShoppingBasket } from "lucide-react"
const categories = [
    { name: "All", icon: <ShoppingBasket className="w-4 h-4"/>, slug: "all" },
    { name: "Vegetables", icon: <Carrot className="w-4 h-4"/>, slug: "vegetables" },
    { name: "Meat", icon: <Beef className="w-4 h-4"/>, slug: "meat" },
    { name: "Pet Supplies", icon: <PawPrint className="w-4 h-4"/>, slug: "pet-supplies" },
]

const Categories = ({selected, onSelect} :{selected:string; onSelect:(slug:string) => void}) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-mypeken-light-gray/40 p-2 rounded-lg mb-6 text-sm">
            {categories.map(category=>(
                <button
                    key={category.slug}
                    onClick={() => onSelect(category.slug)}
                    className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 cursor-pointer ${category.slug === selected ? "bg-mypeken-brand text-mypeken-white" : "text-mypeken-gray hover:bg-white"}`}
                >
                    {category.icon}
                    {category.name}
                </button>
            ))}
        </div>
    )
}

export default Categories