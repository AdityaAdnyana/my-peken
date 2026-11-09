// Tipe data untuk komponen DompetDigital buyer

export type StatusPenarikanBuyer = "berhasil" | "gagal";

export interface RefundItem {
    id: number;
    tanggal: string; // "YYYY-MM-DD"
    namaProduk: string;
    jumlahRefund: number;
    alasanRefund: string;
}

export interface HistoryPenarikanBuyer {
    id: number;
    tanggal: string; // "YYYY-MM-DD HH:mm"
    jumlah: number;
    nomorRekening: string;
    namaBank: string;
    status: StatusPenarikanBuyer;
    alasan?: string; // ada bila status gagal (error handling)
}
