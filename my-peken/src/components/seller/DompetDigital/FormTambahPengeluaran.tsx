"use client";

import { useState } from "react";
import { PengeluaranItem } from "./types";

interface FormTambahPengeluaranProps {
    onTambah: (item: PengeluaranItem) => void;
}

export default function FormTambahPengeluaran({ onTambah }: FormTambahPengeluaranProps) {
    const [form, setForm] = useState({ tanggal: "", keterangan: "", jumlah: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onTambah({
            id: Date.now(),
            tanggal: form.tanggal,
            keterangan: form.keterangan,
            jumlah: parseFloat(form.jumlah),
        });
        setForm({ tanggal: "", keterangan: "", jumlah: "" });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-3 pt-3 border-t border-mypeken-light-gray">
            <p className="text-sm font-semibold text-mypeken-black">+ Tambah Pengeluaran</p>
            <div className="flex flex-row gap-2 flex-wrap">
                <input
                    type="date"
                    value={form.tanggal}
                    onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                    className="border border-mypeken-light-gray rounded-lg px-2 py-1 text-sm flex-1 min-w-32"
                    required
                />
                <input
                    type="text"
                    placeholder="Keterangan pengeluaran"
                    value={form.keterangan}
                    onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                    className="border border-mypeken-light-gray rounded-lg px-2 py-1 text-sm flex-1 min-w-40"
                    required
                />
                <input
                    type="number"
                    placeholder="Jumlah (Rp)"
                    value={form.jumlah}
                    onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
                    className="border border-mypeken-light-gray rounded-lg px-2 py-1 text-sm flex-1 min-w-32"
                    required
                />
                <button
                    type="submit"
                    className="bg-mypeken-brand text-white px-4 py-1 rounded-lg text-sm font-semibold"
                >
                    Tambah
                </button>
            </div>
        </form>
    )
}
