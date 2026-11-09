import type { Metadata } from "next";
import { KycVerificationStatus } from "@/components/seller/kyc-verification-status";

export const metadata: Metadata = {
  title: "Status Verifikasi KYC Toko | MyPeken Seller",
  description:
    "Status pengajuan pendaftaran profil dan verifikasi KYC toko Anda di MyPeken.",
};

export default function SellerKycVerificationPage() {
  return (
    <div className="w-full">
      <KycVerificationStatus />
    </div>
  );
}
