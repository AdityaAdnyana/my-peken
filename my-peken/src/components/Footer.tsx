import Link from "next/link"

const Footer = () => {
    return (
        <div className="flex flex-col flex-center md:flex-row md:items-start md:justify-between border-b md:gap-0 border-gray-200 p-8 pb-4 bg-mypeken-white">
            <div className="flex flex-col gap-4 items-center md:items-start">
                <Link href={"/"} className="flex items-center">
                    <p className="hidden md:block text-xl font-bold tracking-wider text-mypeken-brand">
                        MyPeken
                    </p>
                </Link>
                <p className="text-sm text-gray-400">© 2026 MyPeken.</p>
                <p className="text-sm text-gray-400">All rights reserved.</p>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-mypeken-black">Links</p>
                <Link href="/">Homepage</Link>
                <Link href="/">Kontak</Link>
                <Link href="/">Terms of Service</Link>
                <Link href="/">Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-mypeken-black">Links</p>
                <Link href="/">Semua Produk</Link>
                <Link href="/">Beras</Link>
                <Link href="/">Daging</Link>
                <Link href="/">Sayur</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-mypeken-black">Links</p>
                <Link href="/">Tentang Kami</Link>
                <Link href="/">Kontak</Link>
                <Link href="/">Blog</Link>
                <Link href="/">Afiliasi</Link>
            </div>
        </div>
    ) 
}

export default Footer