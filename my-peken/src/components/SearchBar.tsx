"use client"

import { Search } from "lucide-react"

const SearchBar = () => {
    return (
        <form
            role="search"
            aria-label="Pencarian produk"
            onSubmit={(e) => e.preventDefault()}
            className="hidden sm:flex items-center grow gap-2 rounded-md ring-1 bg-neutral-50 px-2 py-1 shadow-md focus-within:ring-2 focus-within:ring-mypeken-brand"
        >
            <Search className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
            <label htmlFor="search" className="sr-only">
                Cari produk
            </label>
            <input
                id="search"
                name="search"
                type="search"
                placeholder="Search..."
                autoComplete="off"
                className="w-full bg-transparent text-sm outline-0"
            />
        </form>
    )
}

export default SearchBar
