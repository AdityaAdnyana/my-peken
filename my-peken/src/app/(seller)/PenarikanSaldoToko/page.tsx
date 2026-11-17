"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FormPenarikan from "@/components/seller/DompetDigital/FormPenarikan";
import { dataPenjualan } from "@/components/seller/DompetDigital/PenjualanToko";
import {
    dataAkunSeller,
    dataHistoryDummy,
    dataPengeluaranDummy,
    getHistoryPenarikanSeller,
    getPengeluaranSeller,
    hitungSaldoToko,
    tambahHistoryPenarikanSeller,
} from "@/components/seller/DompetDigital/dataDompet";
import { DataPenarikanAdmin, HistoryPenarikan, PengeluaranItem } from "@/components/seller/DompetDigital/types";
import { kirimKeAdmin } from "@/services/penarikanController";

export default function PenarikanSaldoTokoPage() {
    const [pengeluaran, setPengeluaran] = useState<PengeluaranItem[]>(dataPengeluaranDummy);
    const [historyPenarikan, setHistoryPenarikan] = useState<HistoryPenarikan[]>(dataHistoryDummy);

    useEffect(() => {
        setPengeluaran(getPengeluaranSeller());
        setHistoryPenarikan(getHistoryPenarikanSeller());
    }, []);

    const saldoToko = hitungSaldoToko(dataPenjualan, pengeluaran, historyPenarikan);

    const handleKirimPenarikan = (data: DataPenarikanAdmin) => {
        const entryBaru: HistoryPenarikan = {
            id: data.idPenarikan,
            tanggal: data.tanggalPengajuan,
            jumlah: data.jumlah,
            nomorRekening: data.nomorRekening,
            namaBank: data.namaBank,
            status: data.status,
            alasan: data.alasan,
            memerlukanVerifikasi: data.status === "pending",
        };

        const updatedHistory = tambahHistoryPenarikanSeller(entryBaru);
        setHistoryPenarikan([...updatedHistory]);

        // bila memerlukan verifikasi, kirim ke admin lewat controller
        if (data.status === "pending") {
            kirimKeAdmin(data);
        }
        console.log("[PenarikanSaldoToko] Penarikan diajukan:", data);
    }

    return (
        <main className="flex flex-col gap-4 p-4">
            <Link href="/DompetDigital" className="text-sm text-mypeken-brand underline">
                Kembali ke Dompet Digital
            </Link>
            <FormPenarikan
                saldoToko={saldoToko}
                nomorRekening={dataAkunSeller.nomorRekening}
                namaBank={dataAkunSeller.namaBank}
                namaSeller={dataAkunSeller.namaSeller}
                onKirimPenarikan={handleKirimPenarikan}
            />
        </main>
    )
}
