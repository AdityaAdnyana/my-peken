"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import {
    AlertCircle,
    CheckCircle2,
    MessageSquare,
    Minus,
    PencilLine,
    Plus,
    Share2,
    ShoppingBag,
    ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductType, ProductVariant } from "../Product";
import { formatRupiah } from "../../utils/priceUtils";
import { useAddToCart } from "@/hooks/use-add-to-cart";

interface ProductCheckoutSidebarProps {
    product: ProductType;
    currentImage: string;
    activeVariant?: ProductVariant;
    availableStock: number;
    minOrder: number;
    unitPrice: number;
    originalUnitPrice: number;
    discountPct: number;
    storeName: string;
}

export function ProductCheckoutSidebar({
    product,
    currentImage,
    activeVariant,
    availableStock,
    minOrder,
    unitPrice,
    originalUnitPrice,
    discountPct,
    storeName,
}: ProductCheckoutSidebarProps) {
    const addToCart = useAddToCart();

    const [quantityInput, setQuantityInput] = useState<string>(String(minOrder));
    const [note, setNote] = useState<string>("");
    const [showNoteInput, setShowNoteInput] = useState<boolean>(false);
    const [orderError, setOrderError] = useState<string | null>(null);
    const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
    const [shareFeedback, setShareFeedback] = useState<string | null>(null);

    const parsedQty = parseInt(quantityInput, 10);
    const safeQuantity = Number.isNaN(parsedQty) ? minOrder : Math.max(1, parsedQty);

    const subtotalPrice = unitPrice * safeQuantity;
    const totalSavings = (originalUnitPrice - unitPrice) * safeQuantity;

    const validateOrder = (rawQty: string, currentNote: string): string | null => {
        if (availableStock <= 0) {
            return "Maaf, stok produk untuk varian ini sedang habis.";
        }
        if (rawQty.trim() === "") {
            return "Jumlah pembelian tidak boleh kosong.";
        }
        const qty = parseInt(rawQty, 10);
        if (Number.isNaN(qty) || qty < 1) {
            return "Jumlah pembelian harus berupa angka minimal 1.";
        }
        if (qty < minOrder) {
            return `Minimum pembelian untuk produk ini adalah ${minOrder} item.`;
        }
        if (qty > availableStock) {
            return `Jumlah melebihi stok yang tersedia (Maksimal ${availableStock} item).`;
        }
        if (currentNote.length > 144) {
            return "Catatan pembeli maksimal 144 karakter.";
        }
        return null;
    };

    const updateOrder = (nextQty: string, nextNote: string) => {
        setOrderSuccess(null);
        setQuantityInput(nextQty);
        setNote(nextNote);
        setOrderError(validateOrder(nextQty, nextNote));
    };

    const handleOrderSubmit = (actionType: "cart" | "buy", e?: FormEvent) => {
        e?.preventDefault();
        setOrderSuccess(null);
        const errorMsg = validateOrder(quantityInput, note);
        setOrderError(errorMsg);
        if (errorMsg) return;

        // Belum login → hook simpan pending item & redirect ke /login
        const added = addToCart(product, {
            qty: safeQuantity,
            unitPrice,
            variant: activeVariant,
            note,
            storeName,
            buyNow: actionType === "buy",
        });
        if (!added) return;

        const variantLabel = activeVariant ? ` (${activeVariant.name})` : "";
        setOrderSuccess(
            actionType === "cart"
                ? `Berhasil menambahkan ${safeQuantity}x "${product.title}"${variantLabel} ke keranjang!`
                : `Mengarahkan ${safeQuantity}x "${product.title}"${variantLabel} ke halaman checkout...`
        );
    };

    const handleShare = async () => {
        try {
            if (navigator.clipboard && window.location.href) {
                await navigator.clipboard.writeText(window.location.href);
                setShareFeedback("Tautan produk disalin!");
                return;
            }
        } catch {
            // Fallback jika clipboard gagal
        } finally {
            setTimeout(() => setShareFeedback(null), 2500);
        }
        setShareFeedback("Siap dibagikan");
    };

    return (
        <aside
            aria-label="Atur jumlah dan catatan pembelian"
            className="product-checkout-col rounded-2xl border border-mypeken-light-gray bg-white p-5 shadow-md text-mypeken-black space-y-4"
        >
            <div className="border-b border-mypeken-light-gray pb-3">
                <h2 className="text-base font-bold text-mypeken-brand">Atur jumlah & catatan</h2>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-mypeken-light-gray/30 p-2.5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white border border-mypeken-light-gray">
                    <Image
                        src={currentImage}
                        alt={product.title}
                        fill
                        className="object-contain p-1"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-mypeken-black">
                        {product.title}
                    </p>
                    <p className="text-xs font-medium text-mypeken-brand">{activeVariant?.name}</p>
                </div>
            </div>

            <form
                noValidate
                onSubmit={(e) => handleOrderSubmit("cart", e)}
                className="space-y-4"
            >
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor="order-quantity"
                            className="text-xs font-semibold text-mypeken-gray"
                        >
                            Jumlah Beli
                        </Label>
                        <span className="text-xs text-mypeken-gray">
                            Stok: <strong className="text-mypeken-black">{availableStock}</strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-mypeken-light-gray bg-white">
                            <button
                                type="button"
                                aria-label="Kurangi jumlah"
                                disabled={safeQuantity <= minOrder || availableStock <= 0}
                                onClick={() => updateOrder(String(Math.max(1, safeQuantity - 1)), note)}
                                className="flex h-9 w-9 items-center justify-center text-mypeken-black hover:bg-mypeken-light-gray/40 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer rounded-l-lg"
                            >
                                <Minus className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <Input
                                id="order-quantity"
                                type="number"
                                inputMode="numeric"
                                min={minOrder}
                                max={availableStock}
                                value={quantityInput}
                                onChange={(e) => updateOrder(e.target.value, note)}
                                aria-invalid={Boolean(orderError)}
                                aria-describedby={orderError ? "order-error-msg" : undefined}
                                className="h-9 w-16 border-0 text-center font-semibold text-mypeken-black focus-visible:ring-0"
                            />
                            <button
                                type="button"
                                aria-label="Tambah jumlah"
                                disabled={safeQuantity >= availableStock || availableStock <= 0}
                                onClick={() => updateOrder(String(safeQuantity + 1), note)}
                                className="flex h-9 w-9 items-center justify-center text-mypeken-brand hover:bg-mypeken-light-gray/40 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer rounded-r-lg"
                            >
                                <Plus className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                        <span className="text-xs text-mypeken-gray">Min. beli {minOrder}</span>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <button
                        type="button"
                        onClick={() => setShowNoteInput((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-mypeken-brand hover:underline cursor-pointer"
                    >
                        <PencilLine className="h-3.5 w-3.5" aria-hidden="true" />
                        {showNoteInput ? "Sembunyikan Catatan" : "+ Tambah Catatan Pembeli"}
                    </button>

                    {showNoteInput && (
                        <div className="space-y-1">
                            <Label htmlFor="order-note" className="sr-only">
                                Catatan untuk penjual
                            </Label>
                            <Input
                                id="order-note"
                                type="text"
                                placeholder="Contoh: Pilih yang masih segar / bungkus rapat"
                                value={note}
                                onChange={(e) => updateOrder(quantityInput, e.target.value)}
                                aria-invalid={note.length > 144}
                                className="border-mypeken-light-gray bg-white text-xs"
                            />
                            <div className="flex justify-end text-[11px] text-mypeken-gray">
                                <span
                                    className={
                                        note.length > 144 ? "text-mypeken-highligh font-bold" : ""
                                    }
                                >
                                    {note.length}/144 karakter
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {orderError && (
                    <div
                        id="order-error-msg"
                        role="alert"
                        className="flex items-start gap-2 rounded-lg bg-mypeken-highligh/10 p-2.5 text-xs font-medium text-mypeken-highligh"
                    >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{orderError}</span>
                    </div>
                )}

                {orderSuccess && (
                    <div
                        role="status"
                        aria-live="polite"
                        className="flex items-start gap-2 rounded-lg bg-mypeken-brand/10 p-2.5 text-xs font-medium text-mypeken-brand"
                    >
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{orderSuccess}</span>
                    </div>
                )}

                <div className="border-t border-mypeken-light-gray pt-3 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-mypeken-gray">Subtotal</span>
                        <span className="text-lg font-bold text-mypeken-brand">
                            {formatRupiah(subtotalPrice)}
                        </span>
                    </div>
                    {discountPct > 0 && (
                        <p className="text-right text-xs text-mypeken-highligh font-medium">
                            Hemat {formatRupiah(totalSavings)}
                        </p>
                    )}
                </div>

                <div className="product-action-buttons flex flex-col gap-2.5 pt-1">
                    <Button
                        type="submit"
                        disabled={availableStock <= 0}
                        className="w-full h-10 gap-2 bg-mypeken-brand text-mypeken-white hover:bg-mypeken-brand/90 font-semibold cursor-pointer"
                    >
                        <ShoppingCart className="h-4 w-4" aria-hidden="true" />+ Keranjang
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={availableStock <= 0}
                        onClick={() => handleOrderSubmit("buy")}
                        className="w-full h-10 gap-2 border-2 border-mypeken-brand text-mypeken-brand hover:bg-mypeken-brand/10 font-semibold cursor-pointer"
                    >
                        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                        Beli Langsung
                    </Button>
                </div>
            </form>

            <div className="flex items-center justify-around border-t border-mypeken-light-gray pt-3 text-xs font-medium text-mypeken-gray">
                <button
                    type="button"
                    onClick={() =>
                        setOrderSuccess(`Membuka ruang obrolan dengan ${storeName}...`)
                    }
                    className="inline-flex items-center gap-1 hover:text-mypeken-brand cursor-pointer"
                >
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    Chat Penjual
                </button>
                <span aria-hidden="true" className="text-mypeken-light-gray">
                    |
                </span>
                <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1 hover:text-mypeken-brand cursor-pointer"
                >
                    <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {shareFeedback || "Bagikan"}
                </button>
            </div>
        </aside>
    );
}