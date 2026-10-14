"use client";

interface sideBarProps{
    userName :string
    saldoUser : DoubleRange
    fotoSRC? : string 
}

interface opsionProps{
    iconName? : string 
}

interface profileProps{
    userNameP : string
    fotoSRCP ?: string
}

export default function sideBarSeller({userName,saldoUser,fotoSRC = "tempat foto default"}: sideBarProps){
    return(
        <aside className="bg-mypeken-white flex flex-column shadow-xl">

        </aside>
    )
}

function profile({userNameP,fotoSRCP = "tempat foto default"} : profileProps) {
    return(
        <div className="flex flex-warp bg-mypeken-white shadow">
                
        </div>
    )
} 

