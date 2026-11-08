import Link from "next/link"

const Footer = () => {
    return (
        <footer className="flex flex-col flex-center md:flex-row md:items-start md:justify-between border-b md:gap-0 border-gray-200 p-8 pb-4 bg-mypeken-white">
            <div className="flex flex-col gap-4 items-center md:items-start">
                <Link
                    href="/"
                    aria-label="MyPeken - Beranda"
                    className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand"
                >
                    <span className="sr-only md:not-sr-only text-xl font-bold tracking-wider text-mypeken-brand">
                        MyPeken
                    </span>
                </Link>
                <p className="text-sm text-gray-500">© 2026 MyPeken.</p>
                <p className="text-sm text-gray-500">All rights reserved.</p>
            </div>

            <nav aria-label="Tautan informasi umum" className="flex flex-col gap-4 text-sm text-gray-500 items-center md:items-start">
                <h2 className="text-sm font-medium text-mypeken-black">Tautan</h2>
                <ul className="flex flex-col gap-4 items-center md:items-start">
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Homepage</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Kontak</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Terms of Service</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Privacy Policy</Link></li>
                </ul>
            </nav>

            <nav aria-label="Tautan kategori produk" className="flex flex-col gap-4 text-sm text-gray-500 items-center md:items-start">
                <h2 className="text-sm font-medium text-mypeken-black">Kategori</h2>
                <ul className="flex flex-col gap-4 items-center md:items-start">
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Semua Produk</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Beras</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Daging</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Sayur</Link></li>
                </ul>
            </nav>

            <nav aria-label="Tautan tentang perusahaan" className="flex flex-col gap-4 text-sm text-gray-500 items-center md:items-start">
                <h2 className="text-sm font-medium text-mypeken-black">Perusahaan</h2>
                <ul className="flex flex-col gap-4 items-center md:items-start">
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Tentang Kami</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Kontak</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Blog</Link></li>
                    <li><Link href="/" className="hover:text-mypeken-brand focus-visible:outline-none focus-visible:underline">Afiliasi</Link></li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer
