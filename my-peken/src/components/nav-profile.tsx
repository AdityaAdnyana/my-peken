"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarSeparator } from "@/components/ui/sidebar"
import { WalletCardsIcon } from "lucide-react"

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
      <div className="flex items-center gap-3 px-3 py-4">
        <Avatar className="size-12 shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-lg font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-base font-semibold">{user.name}</span>
      </div>

      <SidebarSeparator />

      {/* ── Bagian 2: Saldo ── */}
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border-2 border-green-600">
          <WalletCardsIcon className="size-4 text-green-600" />
        </div>
        <span className="flex-1 text-sm">Saldo</span>
        <span className="text-sm font-medium">{formatRupiah(saldo)}</span>
      </div>

    </div>
  )
}
