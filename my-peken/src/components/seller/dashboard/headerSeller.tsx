import styles from ".../SellerStyle.css";
"use client";

interface headerSellerProps{
    title? : string ;
}

export default function headerSeller({title = "MyPeken Seller"} :headerSellerProps){
    return (
    <header className="bg-[#F2F0EF] flex flex-warp "> 
        <div className="flex flex-warp">
            <p className="text-[#2E6F40] text-xl">MyPeken</p>
            <p className="text-[#4A4A4A] text-base">Seller</p>
        </div>
    </header>)
}