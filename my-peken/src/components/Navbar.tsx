import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home, MapPin, ShoppingCart, Store } from "lucide-react"
import { Button } from "./ui/button"

const Navbar = () => {
    return (
        <nav>
            <nav className="flex justify-end-safe px-7 bg-mypeken-light-gray">
                <Link href={"/help"} className="text-mypeken-brand">
                    Tanya Mbok Putu
                </Link>
            </nav>

            <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4 bg-mypeken-white p-3">
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
                    <Link href={"/"}>
                        <Home className="w-4 h-4 text-mypeken-gray"/>
                    </Link>
                    <Link href={"/"}>
                        <Bell className="w-4 h-4 text-mypeken-gray"/>
                    </Link>
                    <Link href={"/"}>
                        <ShoppingCart className="w-4 h-4 text-mypeken-gray"/>
                    </Link>
                    <Link href={"/"}>
                        <Store className="w-4 h-4 text-mypeken-gray"/>
                    </Link>
                    <Button variant={"secondary"}><Link href={"./login"}>Masuk</Link></Button>
                    <Button variant={"default"}><Link href={"./register"}>Daftar</Link></Button>
                </div>
            </nav>

            <nav className="flex justify-end-safe px-7 bg-mypeken-white border-b border-gray-200 pb-4">
                <div>
                    <MapPin />
                    <p>Dikirim ke <b>Jalan Mahendradatta No X Denpasar</b></p>
                </div>
            </nav>
        </nav>
        
    )
}

export default Navbar