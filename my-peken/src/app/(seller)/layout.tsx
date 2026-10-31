import { AppSidebar } from "@/components/seller/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="p-5">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
