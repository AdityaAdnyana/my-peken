import CardSeller from "@/components/seller/dashboard/cardSeller"

export default function dashboardSeller() {
    return (
        <main >
            <div className="flex flex-col ">
                <div className="basis-1/3 shadow-lg">
                    <div className="flex flex-row p-3">
                        <img src="/Sakamoto.jpg" alt="" className="rounded-xl w-40 h-40  " />
                        <div className=" flex-col p-4 ">
                            <p className="font-bold text-2xl">Hallo,Nama</p>
                            <p className="text-xl"> ini kabar terbaru toko mu</p>
                        </div>
                    </div>
                </div>

                <div className="basis-2/3 shadow-lg   ">
                    <div className="flex flex-col">
                        <p className="font-bold text-2xl">Penting Hari Ini</p>
                        <p className="text-xl"> Aktivitas Hari Ini</p>                       
                        <div className="flex flex-wrap bg-mypeken-white devide-4 ">
                            <CardSeller title="Pesan Baru" notif="2"/>
                            <CardSeller title="Siap Dikirim" notif="1"/>
                            <CardSeller title="Komplain Pesanan" />
                            <CardSeller title="Chat Belum Dibaca" notif="1"/>
                            <CardSeller title="Diskusi Belum Dibaca" notif="0"/>
                            
                                                        
       
                        </div>
                    </div>
                </div>
            </div>

        </main>

    )
}