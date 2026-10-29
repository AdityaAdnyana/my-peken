import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home, ShoppingCart, Store } from "lucide-react"
import { Button } from "./ui/button"

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
            {/* LEFT */}
            <Link href={"/"} className="flex items-center">
                <p className="hidden md:block text-xl font-bold tracking-wider text-mypeken-brand">MyPeken</p>
            </Link>
            {/* RIGHT */}
            <div className="flex items-center gap-6">
                <SearchBar/>
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
    )
}

export default Navbar