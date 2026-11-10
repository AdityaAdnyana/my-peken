"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemType } from "./Product";
import { formatRupiah } from "../utils/priceUtils";

type CartItemCardProps = {
  item: CartItemType;
  editable?: boolean;
  onIncrease?: (key: string) => void;
  onDecrease?: (key: string) => void;
  onRemove?: (key: string) => void;
};

export function CartItemCard({
  item,
  editable = false,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-mypeken-light-gray bg-white p-3 shadow-sm">
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={80}
        height={80}
        className="h-20 w-20 shrink-0 rounded-lg border border-mypeken-light-gray object-contain p-1"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-mypeken-black">{item.title}</h3>
            {item.variantName && (
              <p className="text-xs font-medium text-mypeken-brand">{item.variantName}</p>
            )}
            {item.storeName && <p className="text-xs text-mypeken-gray">{item.storeName}</p>}
          </div>
          <p className="shrink-0 text-sm font-bold text-mypeken-black">
            {formatRupiah(item.unitPrice)}
          </p>
        </div>

        {item.note && <p className="text-xs italic text-mypeken-gray">Catatan: {item.note}</p>}

        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-mypeken-gray">
            Subtotal:{" "}
            <span className="font-semibold text-mypeken-black">
              {formatRupiah(item.unitPrice * item.qty)}
            </span>
          </p>

          {editable ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-md bg-mypeken-light-gray/40 px-2 py-1">
                <button
                  type="button"
                  aria-label={`Kurangi jumlah ${item.title}`}
                  onClick={() => onDecrease?.(item.key)}
                  className="cursor-pointer text-mypeken-gray transition-colors hover:text-mypeken-brand"
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <span className="min-w-4 text-center text-xs font-medium text-mypeken-black">
                  {item.qty}
                </span>
                <button
                  type="button"
                  aria-label={`Tambah jumlah ${item.title}`}
                  onClick={() => onIncrease?.(item.key)}
                  className="cursor-pointer text-mypeken-gray transition-colors hover:text-mypeken-brand"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                aria-label={`Hapus ${item.title}`}
                onClick={() => onRemove?.(item.key)}
                className="cursor-pointer text-mypeken-gray transition-colors hover:text-mypeken-highligh"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <p className="rounded-md bg-mypeken-light-gray/40 px-2.5 py-1 text-xs font-medium text-mypeken-gray">
              Jumlah: {item.qty}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
