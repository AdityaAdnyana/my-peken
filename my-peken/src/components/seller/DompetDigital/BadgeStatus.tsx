"use client";

import { StatusPenarikan } from "./types";

interface BadgeStatusProps {
    status: StatusPenarikan;
}

export default function BadgeStatus({ status }: BadgeStatusProps) {
    const style = {
        approve: "bg-mypeken-brand/15 text-mypeken-white",
        pending: "bg-mypeken-cta/15 text-mypeken-white",
        reject: "bg-mypeken-highligh/15 text-mypeken-white",
    }[status];

    const label = {
        approve: "Berhasil",
        pending: "Menunggu",
        reject: "Ditolak",
    }[status];

    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${style}`}>
            {label}
        </span>
    )
}
