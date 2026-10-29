import { AppSidebar } from "@/components/seller/dashboard/app-sidebar"
import HeaderSeller from "@/components/seller/dashboard/headerSeller"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function SellerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SidebarProvider >
                <AppSidebar />
                <SidebarInset>
                    <header>
                            <SidebarTrigger />
                            <HeaderSeller />
                    </header>
                    <main className="p-5">
                        {children}
                    </main>
                </SidebarInset>

            </SidebarProvider>
        </div>
    )
}