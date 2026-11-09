import { DataPenarikanAdmin } from "@/components/seller/DompetDigital/types";

// Controller untuk mengirim data penarikan dana seller ke admin
// Admin nantinya dapat approve / pending / reject beserta alasannya
export async function kirimKeAdmin(data: DataPenarikanAdmin) {
    const dataKirim = {
        idPenarikan: data.idPenarikan,
        namaSeller: data.namaSeller,
        jumlah: data.jumlah,
        nomorRekening: data.nomorRekening,
        namaBank: data.namaBank,
        saldoToko: data.saldoToko,
        tanggalPengajuan: data.tanggalPengajuan,
        status: "pending",
    }

    console.log("[Controller Admin] Data penarikan yang memerlukan verifikasi:", dataKirim);

    // Aktifkan bila backend sudah siap:
    // const res = await fetch("/api/admin/verifikasi-penarikan", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(dataKirim),
    // });
    // return res.json();

    return dataKirim;
}
