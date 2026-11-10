import { fetcher } from "./ProductService"

export async function getCurrentAddress(): Promise<string> {
    if (!("geolocation" in navigator)) {
        throw new Error("Browser tidak mendukung geolokasi.")
    }
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, () => {
            reject(new Error("Izin lokasi ditolak atau gagal dideteksi."))
        })
    })

    const { latitude, longitude } = position.coords

    const data = await fetcher(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=id`
    )

    const { road, suburb, village, city, town } = data.address || {}
    const shortAddress = [road, suburb || village, city || town]
        .filter(Boolean)
        .join(", ")

    return shortAddress || data.display_name
}