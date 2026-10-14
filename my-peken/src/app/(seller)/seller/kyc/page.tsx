import type { Metadata } from "next";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { KycRegistrationForm } from "@/components/seller/kyc-registration-form";

export const metadata: Metadata = {
  title: "Pendaftaran Profil & KYC Toko | MyPeken Seller",
  description: "Daftarkan profil toko dan lengkapi verifikasi KYC untuk mulai berjualan di MyPeken.",
};

export default function SellerKycPage() {
  return (
    <main className="grid grid-cols-1 gap-6 py-6 md:grid-cols-[220px_1fr]">
      <SellerSidebar />
      <KycRegistrationForm />
    </main>
  );
}
