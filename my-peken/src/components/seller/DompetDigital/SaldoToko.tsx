"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FormatRupiah from "@/components/FormatRupiah";
import PenjualanToko, { dataPenjualan } from "./PenjualanToko";
import PengeluaranPerBulan from "./PengeluaranPerBulan";
import HistoryPenarikanList from "./HistoryPenarikanList";
import { HistoryPenarikan, PengeluaranItem } from "./types";
import {
    dataAkunSeller,
    dataHistoryDummy,
    dataPengeluaranDummy,
    getHistoryPenarikanSeller,
    getPengeluaranSeller,
    hitungSaldoToko,
    tambahPengeluaranSeller,
} from "./dataDompet";

export default function SaldoToko() {
    const [pengeluaran, setPengeluaran] = useState<PengeluaranItem[]>(dataPengeluaranDummy);
    const [historyPenarikan, setHistoryPenarikan] = useState<HistoryPenarikan[]>(dataHistoryDummy);

    useEffect(() => {
        setPengeluaran(getPengeluaranSeller());
        setHistoryPenarikan(getHistoryPenarikanSeller());
    }, []);

    const saldoToko = hitungSaldoToko(dataPenjualan, pengeluaran, historyPenarikan);

    const handleTambahPengeluaran = (item: PengeluaranItem) => {
        const updated = tambahPengeluaranSeller(item);
        setPengeluaran([...updated]);
    }

    return (
        <div className="flex flex-col gap-5 p-4">
            {/* Header Saldo */}
            <div className="bg-mypeken-brand text-white rounded-xl p-5 shadow-md flex flex-row justify-between items-center">
                <div>
                    <p className="text-sm opacity-80">Saldo Toko Kamu</p>
                    <FormatRupiah nilai={saldoToko} className="block text-3xl font-bold mt-1" />
                    <p className="text-xs opacity-70 mt-1">{dataAkunSeller.namaSeller} · {dataAkunSeller.namaBank}</p>
                </div>
                <Link
                    href="/PenarikanSaldoToko"
                    className="bg-mypeken-white text-mypeken-brand font-semibold text-sm py-2 px-4 rounded-lg hover:opacity-90"
                >
                    Tarik Dana
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                {/* Pendapatan Kotor */}
                <PenjualanToko />

                {/* Pendapatan Bersih per Bulan */}
                <PengeluaranPerBulan
                    pengeluaran={pengeluaran}
                    penjualan={dataPenjualan}
                    onTambahPengeluaran={handleTambahPengeluaran}
                />
            </div>

            {/* History Penarikan */}
            <HistoryPenarikanList history={historyPenarikan} />
        </div>
    )
}
