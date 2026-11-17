"use client";

import { useState } from "react";
import FormatRupiah from "@/components/FormatRupiah";
import { MINIMUM_TARIK_BUYER } from "./dataDompetBuyer";
import { HistoryPenarikanBuyer } from "./types";

interface FormPenarikanBuyerProps {
    saldoBuyer: number;
    onTarik: (data: HistoryPenarikanBuyer) => void;
}

export default function FormPenarikanBuyer({ saldoBuyer, onTarik }: FormPenarikanBuyerProps) {
    const [jumlah, setJumlah] = useState("");
    const [nomorRekening, setNomorRekening] = useState("");
    const [namaBank, setNamaBank] = useState("");
    const [error, setError] = useState<React.ReactNode>("");
    const [sukses, setSukses] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSukses(false);

        const nominal = parseFloat(jumlah);

        if (isNaN(nominal) || nominal <= 0) {
            setError("Masukkan jumlah yang valid.");
            return;
        }
        if (nominal < MINIMUM_TARIK_BUYER) {
            setError(<>Minimum penarikan adalah <FormatRupiah nilai={MINIMUM_TARIK_BUYER} />.</>);
            return;
        }
        if (nominal > saldoBuyer) {
            setError("Jumlah penarikan melebihi saldo kamu.");
            return;
        }
        if (!namaBank.trim()) {
            setError("Masukkan nama bank tujuan.");
            return;
        }
        if (!nomorRekening.trim()) {
            setError("Masukkan nomor rekening tujuan.");
            return;
        }

        // Error handling penarikan: bila nomor rekening tidak valid (kurang dari 8 digit angka),
        // catat di riwayat dengan status "gagal"
        const digitRekening = nomorRekening.replace(/[^0-9]/g, "");
        if (digitRekening.length < 8) {
            const dataGagal: HistoryPenarikanBuyer = {
                id: Date.now(),
                tanggal: new Date().toLocaleString("id-ID"),
                jumlah: nominal,
                nomorRekening,
                namaBank,
                status: "gagal",
                alasan: "Nomor rekening tidak valid (minimal 8 digit angka)",
            };
            onTarik(dataGagal);
            setError("Penarikan gagal: Nomor rekening tidak valid (minimal 8 digit angka). Tercatat di riwayat.");
            return;
        }

        const dataBerhasil: HistoryPenarikanBuyer = {
            id: Date.now(),
            tanggal: new Date().toLocaleString("id-ID"),
            jumlah: nominal,
            nomorRekening,
            namaBank,
            status: "berhasil",
        };

        onTarik(dataBerhasil);
        setSukses(true);
        setJumlah("");
        setNomorRekening("");
        setNamaBank("");
        setTimeout(() => setSukses(false), 4000);
    }

    return (
        <div className="bg-mypeken-white border border-mypeken-light-gray rounded-xl p-5 shadow-sm">
            <p className="font-bold text-lg mb-1">Tarik Saldo</p>
            <p className="text-sm text-mypeken-gray mb-4">Min: <FormatRupiah nilai={MINIMUM_TARIK_BUYER} /></p>

            {sukses && (
                <div className="mb-3 p-3 bg-mypeken-brand/10 border border-mypeken-brand/30 rounded-lg text-sm text-mypeken-brand">
                    Penarikan saldo berhasil! Saldo kamu dan riwayat penarikan telah diperbarui.
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Jumlah Penarikan</label>
                    <div className="flex flex-row items-center border border-mypeken-light-gray rounded-lg overflow-hidden">
                        <span className="px-3 py-2 bg-mypeken-light-gray/40 text-mypeken-gray text-sm border-r border-mypeken-light-gray">Rp</span>
                        <input
                            type="number"
                            placeholder="Masukkan jumlah..."
                            value={jumlah}
                            min={MINIMUM_TARIK_BUYER}
                            max={saldoBuyer}
                            onChange={(e) => setJumlah(e.target.value)}
                            className="flex-1 px-3 py-2 text-sm outline-none"
                            required
                        />
                    </div>
                    <p className="text-xs text-mypeken-gray">Saldo tersedia: <FormatRupiah nilai={saldoBuyer} /></p>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Nama Bank</label>
                    <input
                        type="text"
                        placeholder="Contoh: Bank BCA"
                        value={namaBank}
                        onChange={(e) => setNamaBank(e.target.value)}
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Nomor Rekening</label>
                    <input
                        type="text"
                        placeholder="Contoh: 1234-5678-9012"
                        value={nomorRekening}
                        onChange={(e) => setNomorRekening(e.target.value)}
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm outline-none"
                        required
                    />
                </div>

                {error && (
                    <p className="text-xs text-mypeken-highligh">{error}</p>
                )}

                <button
                    type="submit"
                    className="bg-mypeken-brand text-white py-2 px-4 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                    Tarik Saldo
                </button>
            </form>
        </div>
    )
}
