"use client";

import Link  from "next/link";

interface sideBarProps{
    userName :string;
    saldoUser : number;
    fotoSRC? : string ;
}

interface subOpsionProps{
    opsionNameO : string;
    href? : string
}

interface profileProps{
    userNameP : string;
    fotoSRCP ?: string;
}

interface saldoProps{
    saldoS: number;
    iconS : string;
}

export default function SideBarSeller({userName,saldoUser,fotoSRC = "tempat foto default"}: sideBarProps){
    return(
        <aside className="bg-mypeken-white flex flex-col shadow-2xl border-mypeken-rounded devide-y-10 w-60">
            <Profile userNameP ={userName} fotoSRCP = {fotoSRC}/>
            <Saldo saldoS={saldoUser} iconS="money"/>
            <p className="font-bold text-base">Pembelian</p>
            <div className="flex flex-column">
                <SubOpsion opsionNameO="chat" href="/"/>
                <SubOpsion opsionNameO="ulasan" href="/"/>
                <SubOpsion opsionNameO="komplain pesanan" href="/"/>
            </div>
            <p className="font-bold text-base">Pembelian</p>
            <div className="flex flex-column">
                <SubOpsion opsionNameO="telah dibayar" href="/"/>
                <SubOpsion opsionNameO="daftar transaksi" href="/"/>
                <SubOpsion opsionNameO="penjualan " href="/"/>
            </div>
            
        </aside>
    )
}

function Profile({userNameP,fotoSRCP = "tempat foto default"} : profileProps) {
    return(
        <div className="flex flex-warp bg-mypeken-white shadow">
            <img src="fotoSRCP" alt="foto profile" className="rounded-full w-22 h-22 bg-mypeken-grey" /> 
            <p className="text-mypeken-black font-bold text-lg">{userNameP}</p>           
        </div>
    )
} 

function Saldo({saldoS,iconS}: saldoProps){
   return(
        <div className="flex flex-row  bg-mypeken-white ">
            <p>{iconS}</p>
            <p>Saldo anda : Rp{saldoS}</p>
        </div>
   );
}

function SubOpsion({opsionNameO,href="/" }:subOpsionProps){
    return(
        <div className="flex flex-row bg-mypeken-white">
            <Link href={href} >
                <p>{opsionNameO}</p>
            </Link>
        </div>
    )
}

