"use client"

import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home, MapPin, ShoppingCart, Store } from "lucide-react"
import { Button } from "./ui/button"
import { Item, ItemMedia } from "./ui/item"
import { useCart } from "@/context/cart-context"

const Navbar = () => {
    const { totalQty } = useCart();

    return (
        <header>
            <div className="flex justify-end-safe px-7 py-1 text-sm bg-mypeken-light-gray">
                <Link href={"/help"} className="text-mypeken-brand font-medium hover:underline">
                    Tanya Mbok Putu
                </Link>
            </div>

            <nav aria-label="Navigasi Utama" className="w-full flex items-center justify-between border-b border-gray-200 pb-4 bg-mypeken-white p-3">
                {/* LEFT */}
                <Link href={"/"} className="flex items-center">
                    <p className="hidden md:block text-xl font-bold tracking-wider text-mypeken-brand">MyPeken</p>
                </Link>
                {/* CENTER */}
                <div className="flex items-center grow px-7">
                    <SearchBar/>
                </div>
                {/* RIGHT */}
                <div className="flex items-center gap-6">
                    <Link href={"/"} aria-label="Beranda">
                        <Home className="w-4 h-4 text-mypeken-gray"/>
                    </Link>
                    <Link href={"/"} aria-label="Notifikasi">
                        <Bell className="w-4 h-4 text-mypeken-gray"/>
                    </Link>
                    <Link href={"/cart"} aria-label="Keranjang Belanja" className="relative">
                        <ShoppingCart className="w-4 h-4 text-mypeken-gray"/>
                        {totalQty > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-mypeken-highligh px-1 text-[10px] font-semibold text-white">
                                {totalQty}
                            </span>
                        )}
                    </Link>
                    <Link href={"/Mydashboard"} aria-label="Toko Saya">
                        <Store className="w-4 h-4 text-mypeken-gray"/>
                    </Link>
                    <Button variant={"secondary"}><Link href={"/login"}>Masuk</Link></Button>
                    <Button variant={"default"}><Link href={"/register"}>Daftar</Link></Button>
                </div>
            </nav>

            <div className="flex justify-end-safe px-7 bg-mypeken-white border-b border-gray-200 pb-2">
                <Item className="flex justify-end-safe py-1.5">
                    <ItemMedia variant={"icon"}>
                        <MapPin className="text-mypeken-brand" />
                    </ItemMedia>
                    <ItemMedia>
                        <p className="text-xs sm:text-sm">Dikirim ke <b>Jalan Mahendradatta No X Denpasar</b></p>
                    </ItemMedia>
                </Item>
            </div>
        </header>
    )
}

export default Navbar
