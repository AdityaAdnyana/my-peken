"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarSeparator } from "@/components/ui/sidebar"
import { WalletCardsIcon } from "lucide-react"

export const BanknoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></g>
  </svg>
);

interface NavProfileProps {
  user: {
    name: string
    avatar: string
  }
  saldo?: number
}

export function NavProfile({ user, saldo = 0 }: NavProfileProps) {
  // Format angka ke Rupiah: 0 → "Rp0", 150000 → "Rp150.000"
  const formatRupiah = (amount: number) =>
    "Rp" + new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(amount)

  return (
    // Sembunyikan komponen ini saat sidebar collapse ke icon-only mode
    <div className="flex flex-col group-data-[collapsible=icon]:hidden">

      {/* ── Bagian 1: Profile ── */}
      <Link
        href="/Mydashboard"
        className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-mypeken-light-gray/40 transition-colors"
      >
        <Avatar className="size-12 shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-lg font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-base font-semibold">{user.name}</span>
      </Link>

      <SidebarSeparator />

      {/* ── Bagian 2: Saldo ── */}
      <Link
        href="/DompetDigital"
        className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-mypeken-light-gray/40 transition-colors"
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border-2 border-green-600">
          <WalletCardsIcon className="size-4 text-green-600" />
        </div>
        <span className="flex-1 text-sm">Saldo</span>
        <span className="text-sm font-medium">{formatRupiah(saldo)}</span>
      </Link>

    </div>
  )
}
