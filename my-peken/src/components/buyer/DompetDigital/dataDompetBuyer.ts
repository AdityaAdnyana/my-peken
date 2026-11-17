import { HistoryPenarikanBuyer, RefundItem } from "./types";

// Konstanta
export const MINIMUM_TARIK_BUYER = 10000;

// Data dummy
export const dataAkunBuyer = {
    namaBuyer: "Budi Santoso",
}

export const dataRefundDummy: RefundItem[] = [
    {
        id: 1,
        tanggal: "2026-10-10",
        namaProduk: "Green Bell Pepper",
        jumlahRefund: 990000,
        alasanRefund: "Produk rusak saat diterima",
    },
    {
        id: 2,
        tanggal: "2026-10-22",
        namaProduk: "Beef Steak",
        jumlahRefund: 99000,
        alasanRefund: "Produk tidak sesuai deskripsi",
    },
    {
        id: 3,
        tanggal: "2026-11-01",
        namaProduk: "Cat Food",
        jumlahRefund: 99000,
        alasanRefund: "Paket tidak terkirim",
    },
]

export const dataHistoryPenarikanDummy: HistoryPenarikanBuyer[] = [
    {
        id: 1,
        tanggal: "2026-10-25 10:00",
        jumlah: 500000,
        nomorRekening: "9876-5432-1098",
        namaBank: "Bank Mandiri",
        status: "berhasil",
    },
    {
        id: 2,
        tanggal: "2026-11-03 15:30",
        jumlah: 300000,
        nomorRekening: "123",
        namaBank: "Bank Mandiri",
        status: "gagal",
        alasan: "Nomor rekening tujuan tidak valid",
    },
]

// Penyimpanan sementara agar data sinkron saat pindah halaman
let historyBuyerStore: HistoryPenarikanBuyer[] = [...dataHistoryPenarikanDummy];

export function getHistoryPenarikanBuyer(): HistoryPenarikanBuyer[] {
    if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem("mypeken_history_buyer");
        if (saved) {
            historyBuyerStore = JSON.parse(saved);
        }
    }
    return historyBuyerStore;
}

export function tambahHistoryPenarikanBuyer(entry: HistoryPenarikanBuyer): HistoryPenarikanBuyer[] {
    const current = getHistoryPenarikanBuyer();
    historyBuyerStore = [entry, ...current];
    if (typeof window !== "undefined") {
        sessionStorage.setItem("mypeken_history_buyer", JSON.stringify(historyBuyerStore));
    }
    return historyBuyerStore;
}

// Helper perhitungan
export function hitungTotalRefund(refunds: RefundItem[]): number {
    return refunds.reduce((acc, r) => acc + r.jumlahRefund, 0);
}

export function hitungTotalDitarik(history: HistoryPenarikanBuyer[]): number {
    return history
        .filter(h => h.status === "berhasil")
        .reduce((acc, h) => acc + h.jumlah, 0);
}
