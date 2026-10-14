export type ProductType = {
    id: string | number;
    name: string;
    description: string;
    category: string;
    price:number;
    images: string;
}

export type ProductsType = ProductType[]