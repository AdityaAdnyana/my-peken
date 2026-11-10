import { HistoryPenarikan, PengeluaranItem, PenjualanBulan } from "./types";

// Konstanta batas penarikan
export const MINIMUM_TARIK = 50000;
export const MAKSIMUM_TARIK_SEKALI = 30000000;         // 30 juta
export const BATAS_VERIFIKASI_NOMINAL = 20000000;      // 20 juta
export const PERSEN_VERIFIKASI_SALDO = 0.4;            // 40%

// Data dummy akun seller (nomor rekening dari pendaftaran akun)
export const dataAkunSeller = {
    namaSeller: "Toko Pak Budi",
    nomorRekening: "1234-5678-9012",
    namaBank: "Bank BCA",
}

export const dataPengeluaranDummy: PengeluaranItem[] = [
    { id: 1, tanggal: "2026-10-05", keterangan: "Biaya packaging", jumlah: 500000 },
    { id: 2, tanggal: "2026-10-12", keterangan: "Ongkos kirim retur", jumlah: 150000 },
    { id: 3, tanggal: "2026-10-20", keterangan: "Biaya iklan", jumlah: 1000000 },
    { id: 4, tanggal: "2026-11-02", keterangan: "Biaya packaging", jumlah: 300000 },
    { id: 5, tanggal: "2026-11-07", keterangan: "Bayar listrik toko", jumlah: 450000 },
    { id: 6, tanggal: "2026-09-10", keterangan: "Biaya iklan", jumlah: 800000 },
]

export const dataHistoryDummy: HistoryPenarikan[] = [
    {
        id: 1,
        tanggal: "2026-10-01 09:30",
        jumlah: 2000000,
        nomorRekening: "1234-5678-9012",
        namaBank: "Bank BCA",
        status: "approve",
        memerlukanVerifikasi: false,
    },
    {
        id: 2,
        tanggal: "2026-10-15 14:00",
        jumlah: 5000000,
        nomorRekening: "1234-5678-9012",
        namaBank: "Bank BCA",
        status: "pending",
        alasan: "Sedang dalam proses verifikasi admin",
        memerlukanVerifikasi: true,
    },
    {
        id: 3,
        tanggal: "2026-09-20 11:15",
        jumlah: 1500000,
        nomorRekening: "1234-5678-9012",
        namaBank: "Bank BCA",
        status: "reject",
        alasan: "Data rekening tidak sesuai dengan data pendaftaran",
        memerlukanVerifikasi: false,
    },
]

// Penyimpanan sementara agar data sinkron saat pindah halaman
let pengeluaranStore: PengeluaranItem[] = [...dataPengeluaranDummy];
let historySellerStore: HistoryPenarikan[] = [...dataHistoryDummy];

export function getPengeluaranSeller(): PengeluaranItem[] {
    if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem("mypeken_pengeluaran_seller");
        if (saved) {
            pengeluaranStore = JSON.parse(saved);
        }
    }
    return pengeluaranStore;
}

export function tambahPengeluaranSeller(item: PengeluaranItem): PengeluaranItem[] {
    const current = getPengeluaranSeller();
    pengeluaranStore = [...current, item];
    if (typeof window !== "undefined") {
        sessionStorage.setItem("mypeken_pengeluaran_seller", JSON.stringify(pengeluaranStore));
    }
    return pengeluaranStore;
}

export function getHistoryPenarikanSeller(): HistoryPenarikan[] {
    if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem("mypeken_history_seller");
        if (saved) {
            historySellerStore = JSON.parse(saved);
        }
    }
    return historySellerStore;
}

export function tambahHistoryPenarikanSeller(entry: HistoryPenarikan): HistoryPenarikan[] {
    const current = getHistoryPenarikanSeller();
    historySellerStore = [entry, ...current];
    if (typeof window !== "undefined") {
        sessionStorage.setItem("mypeken_history_seller", JSON.stringify(historySellerStore));
    }
    return historySellerStore;
}

// Helper perhitungan
export function getBulanLabel(bulan: string): string {
    const [tahun, bln] = bulan.split("-");
    const namaBulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    return `${namaBulan[parseInt(bln) - 1]} ${tahun}`;
}

export function groupPengeluaranPerBulan(pengeluaran: PengeluaranItem[]): Record<string, number> {
    return pengeluaran.reduce((acc, item) => {
        const bulan = item.tanggal.slice(0, 7); // "YYYY-MM"
        acc[bulan] = (acc[bulan] || 0) + item.jumlah;
        return acc;
    }, {} as Record<string, number>);
}

export function hitungSaldoToko(
    penjualan: PenjualanBulan[],
    pengeluaran: PengeluaranItem[],
    historyPenarikan: HistoryPenarikan[] = []
): number {
    const totalPenjualan = penjualan.reduce((acc, p) => acc + p.totalPenjualan, 0);
    const totalPengeluaran = pengeluaran.reduce((acc, p) => acc + p.jumlah, 0);
    const totalPenarikanBerhasil = historyPenarikan
        .filter(h => h.status === "approve")
        .reduce((acc, h) => acc + h.jumlah, 0);
    return totalPenjualan - totalPengeluaran - totalPenarikanBerhasil;
}

// penarikan dana yg perlu menunggu verifikasi hanya bila penarikan >= 20.000.000 || penarikan >= 0.4 * totalSaldo
export function cekPerluVerifikasi(jumlah: number, saldoToko: number): boolean {
    // Sementara di-comment untuk testing penarikan tanpa verifikasi (langsung mengurangi saldo):
    // if (jumlah >= BATAS_VERIFIKASI_NOMINAL || jumlah >= PERSEN_VERIFIKASI_SALDO * saldoToko) {
    //     return true;
    // }
    return false;
}
