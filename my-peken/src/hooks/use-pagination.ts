"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function usePagination(perPage = 8, syncUrl = true) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [localPage, setLocalPage] = useState(1);

    const rawPage = syncUrl ? Number(searchParams.get("page")) || 1 : localPage;

    const paginate = <T,>(items: T[]) => {
        const totalPages = Math.max(1, Math.ceil(items.length / perPage));
        const currentPage = Math.min(Math.max(1, rawPage), totalPages);
        const start = (currentPage - 1) * perPage;

        return {
            paginatedItems: items.slice(start, start + perPage),
            currentPage,
            totalPages,
        };
    };

    const goToPage = (page: number) => {
        if (!syncUrl) {
            setLocalPage(page);
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        router.push(`${pathname}?${params.toString()}`, { scroll: true });
    };

    return { paginate, goToPage };
}