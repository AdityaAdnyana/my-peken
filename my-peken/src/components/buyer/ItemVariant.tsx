"use client";

import { CheckCircle2, Package } from "lucide-react";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import { ProductVariant } from "./Product";

interface ItemVariantProps {
    variant: ProductVariant;
    isSelected?: boolean;
    onSelect?: (variant: ProductVariant) => void;
    formatPrice?: (amount: number) => string;
}

export function ItemVariant({
    variant,
    isSelected = false,
    onSelect,
    formatPrice,
}: ItemVariantProps) {
    const isOutOfStock = typeof variant.stock === "number" && variant.stock <= 0;
    const deltaLabel =
        variant.priceDelta && variant.priceDelta > 0
            ? `+${formatPrice ? formatPrice(variant.priceDelta) : `Rp ${variant.priceDelta}`}`
            : "Harga Dasar";

    return (
        <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isOutOfStock}
            disabled={isOutOfStock}
            onClick={() => !isOutOfStock && onSelect?.(variant)}
            className={`w-full text-left rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand focus-visible:ring-offset-2 ${
                isOutOfStock
                    ? "opacity-50 cursor-not-allowed bg-mypeken-light-gray/50"
                    : "cursor-pointer"
            }`}
        >
            <Item
                variant="outline"
                size="sm"
                className={`w-full h-full transition-all duration-200 ${
                    isSelected
                        ? "border-2 border-mypeken-brand bg-mypeken-brand/10 text-mypeken-black shadow-sm"
                        : "border-mypeken-light-gray bg-white hover:border-mypeken-brand/60 hover:bg-mypeken-light-gray/30"
                }`}
            >
                <ItemMedia variant="icon">
                    {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-mypeken-brand" aria-hidden="true" />
                    ) : (
                        <Package className="w-4 h-4 text-mypeken-gray" aria-hidden="true" />
                    )}
                </ItemMedia>
                <ItemContent>
                    <ItemTitle className="font-semibold text-mypeken-black flex items-center justify-between w-full gap-1">
                        <span>{variant.name}</span>
                    </ItemTitle>
                    <ItemDescription className="text-xs text-mypeken-gray">
                        {variant.description || deltaLabel}
                        {variant.priceDelta && variant.priceDelta > 0 ? ` (${deltaLabel})` : ""}
                    </ItemDescription>
                </ItemContent>
            </Item>
        </button>
    );
}
