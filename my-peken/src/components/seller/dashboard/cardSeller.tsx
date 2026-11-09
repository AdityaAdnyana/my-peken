"use client";

import Link from "next/link";

interface CardSellerProps {
    title: string;
    cHref?: string;
    notif?: string;
}



export default function CardSeller({ title, cHref = "/", notif="0" }: CardSellerProps) {
    return (
        <Link href={cHref}>
            <div className=" h-50  w-90 bg-mypeken-white border-1 border-mypeken-grey m-1 shadow-lg divide-y-2 p-4  ">
                <p className="text-2xl "> {title}</p>
                <p className="text-6xl p-6"> {notif} </p>
            </div>
        </Link>
    )
}