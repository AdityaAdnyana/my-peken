"use client";

import { StatusPenarikanBuyer } from "./types";

interface BadgeStatusBuyerProps {
    status: StatusPenarikanBuyer;
}

export default function BadgeStatusBuyer({ status }: BadgeStatusBuyerProps) {
    const style = {
        berhasil: "bg-mypeken-brand/15 text-mypeken-brand",
        gagal: "bg-mypeken-highligh/15 text-mypeken-highligh",
    }[status];

    const label = {
        berhasil: "Berhasil",
        gagal: "Gagal",
    }[status];

    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${style}`}>
            {label}
        </span>
    )
}
