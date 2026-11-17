// Tipe data untuk komponen DompetDigital seller

export type StatusPenarikan = "approve" | "pending" | "reject";

export interface PenjualanBulan {
    bulan: string; // format: "YYYY-MM"
    labelBulan: string; // format: "Januari 2026"
    totalPenjualan: number;
}

export interface PengeluaranItem {
    id: number;
    tanggal: string; // format: "YYYY-MM-DD"
    keterangan: string;
    jumlah: number;
}

export interface HistoryPenarikan {
    id: number;
    tanggal: string; // format: "YYYY-MM-DD HH:mm"
    jumlah: number;
    nomorRekening: string;
    namaBank: string;
    status: StatusPenarikan;
    alasan?: string; // ada bila status pending atau reject
    memerlukanVerifikasi: boolean;
}

export interface DataPenarikanAdmin {
    idPenarikan: number;
    namaSeller: string;
    jumlah: number;
    nomorRekening: string;
    namaBank: string;
    saldoToko: number;
    tanggalPengajuan: string;
    status: StatusPenarikan;
    alasan?: string;
}
