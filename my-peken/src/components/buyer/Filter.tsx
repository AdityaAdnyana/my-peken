"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"

const FilterContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentSort = searchParams.get("sort") || "newest";

    const handleFilter = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex items-center justify-end gap-2 text-sm text-mypeken-gray my-6">
            <label htmlFor="sort">Sort by:</label>
            <select
                name="sort"
                id="sort"
                value={currentSort}
                className="ring-1 ring-mypeken-gray shadow-md p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand"
                onChange={(e) => handleFilter(e.target.value)}
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>
    );
};

const Filter = () => {
    return (
        <Suspense fallback={<div role="status" aria-live="polite">Loading filter...</div>}>
            <FilterContent />
        </Suspense>
    );
};

export default Filter;
