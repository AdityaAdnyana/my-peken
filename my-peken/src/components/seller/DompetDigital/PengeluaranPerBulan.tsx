"use client";

import FormatRupiah from "@/components/FormatRupiah";
import FormTambahPengeluaran from "./FormTambahPengeluaran";
import { PengeluaranItem, PenjualanBulan } from "./types";
import { getBulanLabel, groupPengeluaranPerBulan } from "./dataDompet";

interface PengeluaranPerBulanProps {
    pengeluaran: PengeluaranItem[];
    penjualan: PenjualanBulan[];
    onTambahPengeluaran: (item: PengeluaranItem) => void;
}

export default function PengeluaranPerBulan({ pengeluaran, penjualan, onTambahPengeluaran }: PengeluaranPerBulanProps) {
    const grouped = groupPengeluaranPerBulan(pengeluaran);
    const semuaBulan = Array.from(
        new Set([...Object.keys(grouped), ...penjualan.map(p => p.bulan)])
    ).sort().reverse();

    return (
        <div className="bg-mypeken-white border border-mypeken-light-gray rounded-xl p-5 shadow-sm flex flex-col max-h-[540px]">
            <p className="font-bold text-lg mb-1">Pendapatan Bersih per Bulan</p>
            <p className="text-sm text-mypeken-gray mb-4">Penjualan dikurangi pengeluaran per bulan</p>

            {/* List scrollable seukuran komponen PenjualanToko */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-2 flex-1">
                {semuaBulan.map((bulan) => {
                    const penjualanBulan = penjualan.find(p => p.bulan === bulan)?.totalPenjualan || 0;
                    const pengeluaranBulan = grouped[bulan] || 0;
                    const bersih = penjualanBulan - pengeluaranBulan;
                    const rincian = pengeluaran.filter(p => p.tanggal.slice(0, 7) === bulan);

                    return (
                        <div key={bulan} className="border border-mypeken-light-gray rounded-lg p-3">
                            <p className="text-sm font-bold text-mypeken-black mb-2">{getBulanLabel(bulan)}</p>
                            <div className="flex flex-col gap-1 text-xs text-mypeken-gray">
                                <div className="flex justify-between">
                                    <span>Pendapatan Kotor</span>
                                    <FormatRupiah nilai={penjualanBulan} className="text-mypeken-brand font-semibold" />
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Pengeluaran</span>
                                    <FormatRupiah nilai={pengeluaranBulan} prefix="- " className="text-mypeken-highligh font-semibold" />
                                </div>
                                <div className="flex justify-between pt-1 border-t border-mypeken-light-gray">
                                    <span className="font-bold text-mypeken-black">Pendapatan Bersih</span>
                                    <FormatRupiah
                                        nilai={bersih}
                                        className={`font-bold ${bersih >= 0 ? "text-mypeken-brand" : "text-mypeken-highligh"}`}
                                    />
                                </div>
                            </div>

                            {/* Rincian pengeluaran bulan ini */}
                            {rincian.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-dashed border-mypeken-light-gray">
                                    <p className="text-xs text-mypeken-gray mb-1">Rincian Pengeluaran:</p>
                                    {rincian.map(p => (
                                        <div key={p.id} className="flex justify-between text-xs text-mypeken-gray">
                                            <span>{p.tanggal} · {p.keterangan}</span>
                                            <FormatRupiah nilai={p.jumlah} prefix="- " />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <FormTambahPengeluaran onTambah={onTambahPengeluaran} />
        </div>
    )
}
