"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FormatRupiah from "@/components/FormatRupiah";
import DaftarRefund from "./DaftarRefund";
import HistoryPenarikanBuyerList from "./HistoryPenarikanBuyerList";
import { HistoryPenarikanBuyer } from "./types";
import {
    dataAkunBuyer,
    dataHistoryPenarikanDummy,
    dataRefundDummy,
    getHistoryPenarikanBuyer,
    hitungTotalDitarik,
    hitungTotalRefund,
} from "./dataDompetBuyer";

export default function SaldoSaya() {
    const [historyPenarikan, setHistoryPenarikan] = useState<HistoryPenarikanBuyer[]>(dataHistoryPenarikanDummy);

    useEffect(() => {
        setHistoryPenarikan(getHistoryPenarikanBuyer());
    }, []);

    const totalRefund = hitungTotalRefund(dataRefundDummy);
    const totalDitarik = hitungTotalDitarik(historyPenarikan);
    const saldoBuyer = totalRefund - totalDitarik;

    return (
        <div className="flex flex-col gap-5 p-4">
            {/* Header Saldo */}
            <div className="bg-mypeken-brand text-white rounded-xl p-5 shadow-md flex flex-row justify-between items-center">
                <div>
                    <p className="text-sm opacity-80">Saldo Kamu</p>
                    <FormatRupiah nilai={saldoBuyer} className="block text-3xl font-bold mt-1" />
                    <p className="text-xs opacity-70 mt-1">{dataAkunBuyer.namaBuyer}</p>
                    <div className="flex flex-row gap-4 mt-3">
                        <div>
                            <p className="text-xs opacity-60">Total Refund Masuk</p>
                            <FormatRupiah nilai={totalRefund} prefix="+ " className="text-sm font-semibold" />
                        </div>
                        <div>
                            <p className="text-xs opacity-60">Total Ditarik</p>
                            <FormatRupiah nilai={totalDitarik} prefix="- " className="text-sm font-semibold" />
                        </div>
                    </div>
                </div>
                <Link
                    href="/PenarikanSaldoSaya"
                    className="bg-mypeken-white text-mypeken-brand font-semibold text-sm py-2 px-4 rounded-lg hover:opacity-90"
                >
                    Tarik Saldo
                </Link>
            </div>

            {/* Daftar Refund */}
            <DaftarRefund refunds={dataRefundDummy} />

            {/* History Penarikan */}
            <HistoryPenarikanBuyerList history={historyPenarikan} />
        </div>
    )
}
