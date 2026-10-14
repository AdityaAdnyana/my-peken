import { UserRound, Wallet, ChevronUp } from "lucide-react";

const SECTIONS = [
  {
    title: "Kotak Masuk",
    items: [{ label: "Chat", badge: 5 }, { label: "Ulasan" }, { label: "Pesanan Dikomplain" }],
  },
  {
    title: "Pembelian",
    items: [{ label: "Menunggu Pembayaran" }, { label: "Daftar Transaksi" }],
  },
];

export function SellerSidebar() {
  return (
    <aside className="h-fit overflow-hidden rounded-xl border border-mypeken-light-gray bg-white">
      {/* Profil kosong dulu) */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mypeken-light-gray text-mypeken-gray">
          <UserRound className="h-5 w-5" />
        </div>
        <p className="font-semibold text-mypeken-black">Aditya</p>
      </div>

      {/* Saldo */}
      <div className="flex items-center justify-between border-t border-mypeken-light-gray px-4 py-4 text-sm">
        <span className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-mypeken-brand" />
          Saldo
        </span>
        <span>Rp0</span>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="border-t border-mypeken-light-gray py-3">
          <div className="flex items-center justify-between px-4 text-sm font-semibold text-mypeken-black">
            {section.title}
            <ChevronUp className="h-4 w-4 text-mypeken-gray" />
          </div>
          <ul className="mt-2 flex flex-col gap-1">
            {section.items.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between px-4 py-1 pl-6 text-sm text-mypeken-black/90"
              >
                {item.label}
                {"badge" in item && item.badge ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-mypeken-highligh px-1 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
