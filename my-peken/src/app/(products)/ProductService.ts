import useSWR from 'swr'
import { error } from "console";

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useProduct() {
    const { data, error, isLoading } = useSWR('https://dummyjson.com/products', fetcher)

    return{
        products: data?.products || [],
        isLoading,
        isError: error
    }
}

export function useProductDetail(id: string | number){
    const { data, error, isLoading } = useSWR(
        id ? `https://dummyjson.com/products${id}` : null, 
        fetcher
    )

    return {
        product: data,
        isLoading,
        isError: error
    }
}
