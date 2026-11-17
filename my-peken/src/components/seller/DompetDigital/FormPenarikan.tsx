"use client";

import { useState } from "react";
import FormatRupiah from "@/components/FormatRupiah";
import { DataPenarikanAdmin } from "./types";
import {
    BATAS_VERIFIKASI_NOMINAL,
    MAKSIMUM_TARIK_SEKALI,
    MINIMUM_TARIK,
    PERSEN_VERIFIKASI_SALDO,
    cekPerluVerifikasi,
} from "./dataDompet";

interface FormPenarikanProps {
    saldoToko: number;
    nomorRekening: string;
    namaBank: string;
    namaSeller: string;
    onKirimPenarikan: (data: DataPenarikanAdmin) => void;
}

export default function FormPenarikan({ saldoToko, nomorRekening, namaBank, namaSeller, onKirimPenarikan }: FormPenarikanProps) {
    const [jumlah, setJumlah] = useState("");
    const [error, setError] = useState<React.ReactNode>("");
    const [sukses, setSukses] = useState(false);

    const maksimalTarik = Math.min(saldoToko, MAKSIMUM_TARIK_SEKALI);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nominal = parseFloat(jumlah);
        setError("");

        if (isNaN(nominal) || nominal <= 0) {
            setError("Masukkan jumlah yang valid.");
            return;
        }
        if (nominal < MINIMUM_TARIK) {
            setError(<>Minimum penarikan adalah <FormatRupiah nilai={MINIMUM_TARIK} />.</>);
            return;
        }
        if (nominal > saldoToko) {
            setError("Jumlah penarikan melebihi saldo toko.");
            return;
        }
        if (nominal > MAKSIMUM_TARIK_SEKALI) {
            setError(<>Maksimum penarikan per sekali adalah <FormatRupiah nilai={MAKSIMUM_TARIK_SEKALI} />.</>);
            return;
        }

        const perluVerifikasi = cekPerluVerifikasi(nominal, saldoToko);

        const dataPenarikan: DataPenarikanAdmin = {
            idPenarikan: Date.now(),
            namaSeller,
            jumlah: nominal,
            nomorRekening,
            namaBank,
            saldoToko,
            tanggalPengajuan: new Date().toLocaleString("id-ID"),
            status: perluVerifikasi ? "pending" : "approve",
            alasan: perluVerifikasi ? "Menunggu verifikasi admin" : undefined,
        }

        onKirimPenarikan(dataPenarikan);
        setSukses(true);
        setJumlah("");
        setTimeout(() => setSukses(false), 4000);
    }

    return (
        <div className="bg-mypeken-white border border-mypeken-light-gray rounded-xl p-5 shadow-sm">
            <p className="font-bold text-lg mb-1">Tarik Dana</p>
            <p className="text-sm text-mypeken-gray mb-4">
                Min: <FormatRupiah nilai={MINIMUM_TARIK} /> · Maks per tarik: <FormatRupiah nilai={MAKSIMUM_TARIK_SEKALI} />
            </p>

            {sukses && (
                <div className="mb-3 p-3 bg-mypeken-brand/10 border border-mypeken-brand/30 rounded-lg text-sm text-mypeken-brand">
                    Permintaan penarikan berhasil dikirim! Saldo toko dan riwayat penarikan telah diperbarui.
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Nomor Rekening</label>
                    <input
                        type="text"
                        value={`${namaBank} - ${nomorRekening}`}
                        disabled
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 bg-mypeken-light-gray/40 text-mypeken-gray text-sm cursor-not-allowed"
                    />
                    <p className="text-xs text-mypeken-gray">Nomor rekening sesuai pendaftaran akun. Ubah di Pengaturan Akun.</p>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Jumlah Penarikan</label>
                    <div className="flex flex-row items-center border border-mypeken-light-gray rounded-lg overflow-hidden">
                        <span className="px-3 py-2 bg-mypeken-light-gray/40 text-mypeken-gray text-sm border-r border-mypeken-light-gray">Rp</span>
                        <input
                            type="number"
                            placeholder="Masukkan jumlah..."
                            value={jumlah}
                            min={MINIMUM_TARIK}
                            max={maksimalTarik}
                            onChange={(e) => setJumlah(e.target.value)}
                            className="flex-1 px-3 py-2 text-sm outline-none"
                            required
                        />
                    </div>
                    <p className="text-xs text-mypeken-gray">Saldo tersedia: <FormatRupiah nilai={saldoToko} /></p>
                </div>

                {/* Sementara di-comment untuk testing tanpa verifikasi
                <div className="p-3 bg-mypeken-cta/10 border border-mypeken-cta/40 rounded-lg text-xs text-mypeken-cta">
                    Penarikan minimal <FormatRupiah nilai={BATAS_VERIFIKASI_NOMINAL} /> atau 40% dari total saldo (<FormatRupiah nilai={saldoToko * PERSEN_VERIFIKASI_SALDO} />) memerlukan verifikasi admin.
                </div>
                */}

                {error && (
                    <p className="text-xs text-mypeken-highligh">{error}</p>
                )}

                <button
                    type="submit"
                    className="bg-mypeken-brand text-white py-2 px-4 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                    Tarik Dana
                </button>
            </form>
        </div>
    )
}
