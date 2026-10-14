"use client";

interface sideBarProps{
    userName :string
    saldoUser : DoubleRange
    fotoSRC? : string 
}

interface opsionProps{
    iconName? : string 
}

export default function sideBarSeller({userName,saldoUser,fotoSRC = "tempat foto default"}: sideBarProps){
    return(
        <aside className="bg-[#F2F0EF] flex flex-column shadow-xl">

        </aside>
    )
}

