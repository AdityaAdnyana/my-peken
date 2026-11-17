"use client";

import FormatRupiah from "@/components/FormatRupiah";
import { RefundItem } from "./types";

interface DaftarRefundProps {
    refunds: RefundItem[];
}

export default function DaftarRefund({ refunds }: DaftarRefundProps) {
    return (
        <div className="bg-mypeken-white border border-mypeken-light-gray rounded-xl p-5 shadow-sm">
            <p className="font-bold text-lg mb-1">Sumber Saldo Refund</p>
            <p className="text-sm text-mypeken-gray mb-4">Dana refund dari pengembalian barang</p>

            {refunds.length === 0 && (
                <p className="text-sm text-mypeken-gray text-center py-4">Belum ada data refund.</p>
            )}

            <div className="flex flex-col gap-3">
                {refunds.map((item) => (
                    <div key={item.id} className="flex flex-row justify-between items-start border-b border-mypeken-light-gray pb-3 last:border-0 last:pb-0">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-mypeken-gray">{item.tanggal}</p>
                            <p className="text-sm font-semibold text-mypeken-black">{item.namaProduk}</p>
                            <p className="text-xs text-mypeken-gray italic">{item.alasanRefund}</p>
                        </div>
                        <FormatRupiah nilai={item.jumlahRefund} prefix="+ " className="text-sm font-bold text-mypeken-brand" />
                    </div>
                ))}
            </div>
        </div>
    )
}
