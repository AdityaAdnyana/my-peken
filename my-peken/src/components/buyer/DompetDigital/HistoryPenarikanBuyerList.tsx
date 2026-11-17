"use client";

import FormatRupiah from "@/components/FormatRupiah";
import BadgeStatusBuyer from "./BadgeStatusBuyer";
import { HistoryPenarikanBuyer } from "./types";

interface HistoryPenarikanBuyerListProps {
    history: HistoryPenarikanBuyer[];
}

export default function HistoryPenarikanBuyerList({ history }: HistoryPenarikanBuyerListProps) {
    return (
        <div className="bg-mypeken-white border border-mypeken-light-gray rounded-xl p-5 shadow-sm">
            <p className="font-bold text-lg mb-4">Riwayat Penarikan</p>

            {history.length === 0 && (
                <p className="text-sm text-mypeken-gray text-center py-4">Belum ada riwayat penarikan.</p>
            )}

            <div className="flex flex-col gap-3">
                {history.map((item) => (
                    <div key={item.id} className="flex flex-row justify-between items-start border-b border-mypeken-light-gray pb-3 last:border-0 last:pb-0">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-mypeken-gray">{item.tanggal}</p>
                            <p className="text-sm font-semibold text-mypeken-black">
                                Penarikan ke {item.namaBank}
                            </p>
                            <p className="text-xs text-mypeken-gray">{item.nomorRekening}</p>
                            {item.status === "gagal" && item.alasan && (
                                <p className="text-xs text-mypeken-highligh italic mt-1">
                                    Alasan: {item.alasan}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <FormatRupiah nilai={item.jumlah} prefix="- " className="text-sm font-bold text-mypeken-black" />
                            <BadgeStatusBuyer status={item.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
