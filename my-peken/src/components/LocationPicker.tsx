// src/components/LocationPicker.tsx
"use client"

import { useState } from "react"
import { LocateFixed, MapPin, X } from "lucide-react"
import { Button } from "./ui/button"
import { Item, ItemMedia } from "./ui/item"
import { Spinner } from "./ui/spinner"
import { getCurrentAddress } from "@/services/LocationService"

export default function LocationPicker() {
    const [isOpen, setIsOpen] = useState(false)
    const [address, setAddress] = useState("Belum Terdefinisi")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSelectCurrentLocation = async () => {
        setLoading(true)
        setError("")
        try {
            const newAddress = await getCurrentAddress()
            setAddress(newAddress)
            setIsOpen(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Gagal memuat lokasi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
            >
                <Item className="flex justify-end-safe py-1.5">
                    <ItemMedia variant="icon">
                        <MapPin className="text-mypeken-brand" />
                    </ItemMedia>
                    <ItemMedia>
                        <p className="text-xs sm:text-sm">
                            Dikirim ke <b>{address}</b>
                        </p>
                    </ItemMedia>
                </Item>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl space-y-4">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="size-5 cursor-pointer" />
                        </button>

                        <div>
                            <h2 className="text-lg font-bold">Mau kirim belanjaan kemana?</h2>
                            <p className="text-sm text-gray-500">
                                Biar pengalaman belanjamu lebih baik, pilih alamat dulu.
                            </p>
                        </div>

                        <div className="rounded-lg border border-mypeken-brand bg-emerald-50/60 p-3 text-sm">
                            <p className="font-semibold text-gray-900">{address}</p>
                        </div>

                        {error && <p className="text-xs text-mypeken-highligh">{error}</p>}

                        <Button
                            onClick={handleSelectCurrentLocation}
                            disabled={loading}
                            className="w-full gap-2 cursor-pointer"
                        >
                            {loading ? <Spinner /> : <LocateFixed className="size-4" />}
                            {loading ? "Mendeteksi lokasi..." : "Gunakan Lokasi Saat Ini"}
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}