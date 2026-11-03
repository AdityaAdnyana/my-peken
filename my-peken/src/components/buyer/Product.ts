export type ProductType = {
    id: string | number;
    title: string;
    description: string;
    category: string;
    price:number;
    thumbnail: string;
    variant: [];
}

export type ProductsType = ProductType[]