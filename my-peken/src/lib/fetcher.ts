export const fetcher = async (url: string, notFoundMessage = "Data yang Anda cari tidak ditemukan (404).") => {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error(notFoundMessage);
        }
        throw new Error(`Gagal memuat data dari server (Status: ${res.status}).`);
    }
    return res.json();
};
