"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FormPenarikanBuyer from "@/components/buyer/DompetDigital/FormPenarikanBuyer";
import {
    dataHistoryPenarikanDummy,
    dataRefundDummy,
    getHistoryPenarikanBuyer,
    hitungTotalDitarik,
    hitungTotalRefund,
    tambahHistoryPenarikanBuyer,
} from "@/components/buyer/DompetDigital/dataDompetBuyer";
import { HistoryPenarikanBuyer } from "@/components/buyer/DompetDigital/types";

export default function PenarikanSaldoSayaPage() {
    const [historyPenarikan, setHistoryPenarikan] = useState<HistoryPenarikanBuyer[]>(dataHistoryPenarikanDummy);

    useEffect(() => {
        setHistoryPenarikan(getHistoryPenarikanBuyer());
    }, []);

    const saldoBuyer = hitungTotalRefund(dataRefundDummy) - hitungTotalDitarik(historyPenarikan);

    const handleTarik = (dataPenarikan: HistoryPenarikanBuyer) => {
        const updated = tambahHistoryPenarikanBuyer(dataPenarikan);
        setHistoryPenarikan([...updated]);
        console.log("[PenarikanSaldoSaya] Penarikan buyer diajukan:", dataPenarikan);
    }

    return (
        <main className="flex flex-col gap-4 p-4">
            <Link href="/DompetDigitalSaya" className="text-sm text-mypeken-brand underline">
                Kembali ke Dompet Digital
            </Link>
            <FormPenarikanBuyer saldoBuyer={saldoBuyer} onTarik={handleTarik} />
        </main>
    )
}
