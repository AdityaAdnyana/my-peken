"use client";

interface headerSellerProps{
    title? : string ;
}

function Logo() {
    return(
        <div className="flex flex-warp">
            <link  href="/" className="text-[#2E6F40] text-xl">MyPeken</link>
            <link  href="/" className="text-[#4A4A4A] text-base">Seller</link>
        </div>
    );
}

export default function headerSeller({title = "MyPeken Seller"} :headerSellerProps){
    return (
    <header className="bg-[#F2F0EF] flex flex-row "> 
        <Logo/>
    </header>)
}