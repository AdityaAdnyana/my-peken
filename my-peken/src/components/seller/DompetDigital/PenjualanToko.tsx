"use client";

import FormatRupiah from "@/components/FormatRupiah";
import { PenjualanBulan } from "./types";

// Data dummy penjualan - nantinya bisa diganti dari API
const dataPenjualan: PenjualanBulan[] = [
    { bulan: "2026-01", labelBulan: "Januari 2026", totalPenjualan: 12500000 },
    { bulan: "2026-02", labelBulan: "Februari 2026", totalPenjualan: 9800000 },
    { bulan: "2026-03", labelBulan: "Maret 2026", totalPenjualan: 15200000 },
    { bulan: "2026-04", labelBulan: "April 2026", totalPenjualan: 11000000 },
    { bulan: "2026-05", labelBulan: "Mei 2026", totalPenjualan: 18750000 },
    { bulan: "2026-06", labelBulan: "Juni 2026", totalPenjualan: 22300000 },
    { bulan: "2026-07", labelBulan: "Juli 2026", totalPenjualan: 19600000 },
    { bulan: "2026-08", labelBulan: "Agustus 2026", totalPenjualan: 16400000 },
    { bulan: "2026-09", labelBulan: "September 2026", totalPenjualan: 21000000 },
    { bulan: "2026-10", labelBulan: "Oktober 2026", totalPenjualan: 24500000 },
    { bulan: "2026-11", labelBulan: "November 2026", totalPenjualan: 8200000 },
];

interface BarPenjualanProps {
    label: string;
    nilai: number;
    nilaiMax: number;
}

function BarPenjualan({ label, nilai, nilaiMax }: BarPenjualanProps) {
    const persen = nilaiMax > 0 ? (nilai / nilaiMax) * 100 : 0;
    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between text-xs text-mypeken-gray">
                <span>{label}</span>
                <FormatRupiah nilai={nilai} />
            </div>
            <div className="w-full bg-mypeken-light-gray/50 rounded-full h-3">
                <div
                    className="bg-mypeken-brand h-3 rounded-full transition-all duration-500"
                    style={{ width: `${persen}%` }}
                />
            </div>
        </div>
    )
}

export default function PenjualanToko() {
    const nilaiMax = Math.max(...dataPenjualan.map(d => d.totalPenjualan));
    const totalSemua = dataPenjualan.reduce((acc, d) => acc + d.totalPenjualan, 0);

    return (
        <div className="bg-mypeken-white border border-mypeken-light-gray rounded-xl p-5 shadow-sm">
            <p className="font-bold text-lg mb-1">Pendapatan Kotor Penjualan</p>
            <p className="text-sm text-mypeken-gray mb-4">Rekapitulasi penjualan per bulan</p>

            <div className="flex flex-col gap-3">
                {dataPenjualan.map((item) => (
                    <BarPenjualan
                        key={item.bulan}
                        label={item.labelBulan}
                        nilai={item.totalPenjualan}
                        nilaiMax={nilaiMax}
                    />
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-mypeken-light-gray flex flex-row justify-between items-center">
                <p className="text-sm font-semibold text-mypeken-gray">Total Keseluruhan</p>
                <FormatRupiah nilai={totalSemua} className="text-base font-bold text-mypeken-brand" />
            </div>
        </div>
    )
}

// export data penjualan agar bisa dipakai SaldoToko
export { dataPenjualan };
