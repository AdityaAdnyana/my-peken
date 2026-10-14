"use client"

import { useState } from "react"
import Categories from "./Categories"
import ProductCard from "./ProductCard"
import { ProductType } from "./types"

//TEMPORARY 
const products: ProductType[] = [
    {
      id: 25,
      name: "Green Bell Pepper",
      description: "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
      category: "vegetables",
      price: 99000,
      images: "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp",
    },
    {
      id: 26,
      name: "Green Chili Pepper",
      description: "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
      category: "vegetables",
      price: 99000,
      images: "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp",
    },
    {
      id: 17,
      name: "Beef Steak",
      description: "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
      category: "meat",
      price: 99000,
      images: "https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp",
    },
    {
      id: 18,
      name: "Cat Food",
      description: "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
      category: "pet-supplies",
      price: 99000,
      images: "https://cdn.dummyjson.com/product-images/groceries/cat-food/1.webp",
    },
    {
      id: 19,
      name: "Chicken Meat",
      description: "Fresh and tender chicken meat, suitable for various culinary preparations.",
      category: "meat",
      price: 99000,
      images: "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp",
    },
];

const ProductList = () => {
    const [category, setCategory] = useState("all")
    const filteredProducts = category === "all" ? products : products.filter(product => product.category === category)

    return(
        <div className="">
            <Categories selected={category} onSelect={setCategory}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
                {filteredProducts.map(product=>(
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductList