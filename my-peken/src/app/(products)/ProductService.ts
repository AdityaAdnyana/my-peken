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
