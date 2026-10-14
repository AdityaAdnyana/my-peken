import HeaderSeller from "@/components/seller/dashboard/headerSeller"
import SideBarSeller from "@/components/seller/dashboard/sideBarSeller"

export default function dashboardSeller(){
    return(
        <main >
            <header>
                <HeaderSeller title="Dashboar Seller"/>
            </header>
            <div className="flex-row">
                <SideBarSeller userName="adit" saldoUser={999999}/>
                <h1>hello</h1>
            </div>
            
            
        </main>

    )
}