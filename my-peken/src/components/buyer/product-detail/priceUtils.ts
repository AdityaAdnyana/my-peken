const USD_TO_IDR_RATE = 16000;

export function formatRupiah(priceValue: number): string {
    const idrAmount =
        priceValue < 1000 ? Math.round(priceValue * USD_TO_IDR_RATE) : Math.round(priceValue);
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(idrAmount);
}

export function formatStoreName(tokoSlug?: string, brand?: string, fallbackName?: string): string {
    if (brand && brand.trim().length > 0) {
        return `${brand} Official Peken`;
    }
    if (tokoSlug && tokoSlug !== "nama-toko") {
        return tokoSlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    return fallbackName || "";
}
