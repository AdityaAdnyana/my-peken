import type { Metadata } from "next";
import { KycRegistrationForm } from "@/components/seller/kyc-registration-form";

export const metadata: Metadata = {
  title: "Pendaftaran Profil & KYC Toko | MyPeken Seller",
  description: "Daftarkan profil toko dan lengkapi verifikasi KYC untuk mulai berjualan di MyPeken.",
};

export default function SellerKycPage() {
  return (
    <div className="w-full">
      <KycRegistrationForm />
    </div>
  );
}
