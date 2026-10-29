"use client";

import Link from "next/link";

interface headerSellerProps{
    title? : string ;
}

function Logo() {
    return(
        <div className="flex flex-warp pl-5">
            <Link href="/" className="text-mypeken-brand text-4xl font-bold">MyPeken</Link>
            <Link href="/" className="text-mypeken-black text-2xl font-bold">Seller</Link>
        </div>
    );
}

export default function headerSeller({title = "MyPeken Seller"} :headerSellerProps){
    return (
    <header className=" bg-mypeken-white flex flex-row shadow-lg "> 
        <Logo/>
    </header>)
}