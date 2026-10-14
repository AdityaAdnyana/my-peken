import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home, ShoppingCart } from "lucide-react"

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
                    <Home className="w-4 h-4 text-gray-600"/>
                </Link>
                <Bell className="w-4 h-4 text-gray-600"/>
                <ShoppingCart className="w-4 h-4 text-gray-600"/>
                <Link href={"/login"}>Sign In</Link>
            </div>
        </nav>
    )
}

export default Navbar