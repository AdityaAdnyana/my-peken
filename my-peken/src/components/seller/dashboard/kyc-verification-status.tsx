"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { BadgeCheck, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STORAGE_KEY = "mypeken_kyc_submission";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

const getSnapshot = () => window.sessionStorage.getItem(STORAGE_KEY) ?? "";
const getServerSnapshot = () => "";

function parseSubmission(raw: string): { namaToko?: string; namaPemilik?: string } {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as { namaToko?: string; namaPemilik?: string };
  } catch {
    return {};
  }
}

export function KycVerificationStatus() {
  const rawSubmission = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { namaToko, namaPemilik } = parseSubmission(rawSubmission);
  const greetingName = namaPemilik || "Aditya";

  return (
    <section aria-labelledby="kyc-status-heading" className="flex flex-col gap-5">
      <h1 id="kyc-status-heading" className="text-xl font-semibold text-neutral-900 sm:text-2xl">
        Pendaftaran Profil &amp; KYC Toko
      </h1>

      <Card className="bg-white ring-mypeken-light-gray">
        <CardContent className="flex flex-col items-center gap-0 px-5 pt-6 pb-4 text-center sm:px-10 sm:pt-8">
          <div className="flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 88 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20">
              <rect x="14" y="8" width="50" height="58" rx="6" fill="#F7F7F7" stroke="#B3B3B3" strokeWidth="5.5" />
              <line x1="25" y1="23" x2="53" y2="23" stroke="#B3B3B3" strokeWidth="5" strokeLinecap="round" />
              <line x1="25" y1="36" x2="53" y2="36" stroke="#B3B3B3" strokeWidth="5" strokeLinecap="round" />
              <line x1="25" y1="49" x2="47" y2="49" stroke="#B3B3B3" strokeWidth="5" strokeLinecap="round" />
              <circle cx="60" cy="58" r="16" fill="#FAF0DC" stroke="#F2CA74" strokeWidth="2.5" />
              <path d="M60 49V58L66 63" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 className="mt-5 text-lg font-bold text-neutral-900 sm:text-xl">
            Pengajuan Toko Sedang Diverifikasi
          </h2>

          <p className="mt-3 max-w-[440px] text-xs leading-relaxed text-neutral-700 sm:text-sm">
            Halo {greetingName}, data profil toko{namaToko ? ` (${namaToko})` : ""}, KYC, dan informasi lokasi Anda
            telah kami terima. Tim Admin MyPeken sedang meninjau dokumen Anda (Maksimal 1 &times; 24 Jam Kerja).
          </p>

          <div className="relative mt-8 w-full max-w-[440px]">
            <div
              className="absolute top-[18px] right-4 left-4 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-[#ECEAE9]"
              aria-hidden="true"
            >
              <div className="h-full w-1/2 rounded-l-full bg-[#088218]" />
            </div>

            <ol aria-label="Tahapan verifikasi KYC toko" className="relative grid grid-cols-3">
              <li className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#088218]">
                  <BadgeCheck className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <span className="mt-2.5 text-xs font-bold text-neutral-900">Data dikirim</span>
              </li>

              <li aria-current="step" className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F5BA45] bg-[#FDF0D5]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B47A00]" aria-hidden="true" />
                </div>
                <span className="mt-2.5 text-xs font-semibold text-[#9A6700]">Verifikasi Admin</span>
              </li>

              <li className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E6E5] text-xs font-semibold text-neutral-600">
                  3
                </div>
                <span className="mt-2.5 text-xs font-semibold text-neutral-600">Toko Aktif</span>
              </li>
            </ol>
          </div>

          <div className="mt-8 flex w-full max-w-[430px] items-start gap-2.5 rounded-xl bg-[#E8F1FD] px-4 py-4 text-left sm:px-5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1E60D5]" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-[#1B4FB0]">
              Sambil menunggu persetujuan toko, Anda dapat menggunakan akun ini untuk berbelanja produk UMKM lainnya di
              MyPeken.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/seller/kyc"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-300 px-5 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-mypeken-brand sm:text-sm"
            >
              Kembali ke Form
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#088218] px-6 text-xs font-semibold text-white transition-colors hover:bg-[#066d14] focus-visible:outline-2 focus-visible:outline-mypeken-brand sm:text-sm"
            >
              Lanjut belanja dulu
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
