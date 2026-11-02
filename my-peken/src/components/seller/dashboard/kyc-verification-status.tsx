import { BadgeCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function KycVerificationStatus() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold text-mypeken-black sm:text-2xl">
        Pendaftaran Profil &amp; KYC Toko
      </h1>

      <Card className="bg-white ring-mypeken-light-gray">
        <CardContent className="flex flex-col items-center gap-0 px-6 pt-4 pb-2 text-center sm:px-10 sm:pt-8 sm:pb-4">
          {/*  Dokumen & Jam Verifikasi */}
          <div className="flex items-center justify-center" aria-hidden="true">
            <svg
              viewBox="0 0 88 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20"
            >
              {/* Dokumen */}
              <rect
                x="14"
                y="8"
                width="50"
                height="58"
                rx="6"
                fill="#F7F7F7"
                stroke="#B3B3B3"
                strokeWidth="5.5"
              />
              <line
                x1="25"
                y1="23"
                x2="53"
                y2="23"
                stroke="#B3B3B3"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1="25"
                y1="36"
                x2="53"
                y2="36"
                stroke="#B3B3B3"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1="25"
                y1="49"
                x2="47"
                y2="49"
                stroke="#B3B3B3"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Badge Jam */}
              <circle
                cx="60"
                cy="58"
                r="16"
                fill="#FAF0DC"
                stroke="#F2CA74"
                strokeWidth="2.5"
              />
              <path
                d="M60 49V58L66 63"
                stroke="#8C8C8C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Judul & Deskripsi */}
          <h2 className="mt-5 text-lg font-bold text-neutral-900 sm:text-xl">
            Pengajuan Toko Sedang Diverifikasi
          </h2>

          <p className="mt-3 max-w-[440px] text-xs leading-relaxed text-mypeken-black sm:text-sm">
            Halo Aditya, data profil toko, KYC, dan informasi lokasi Anda telah kami
            terima. Tim Admin MyPeken sedang meninjau dokumen Anda (Maksimal 1 &times; 24
            Jam Kerja).
          </p>

          <div className="relative mt-8 w-full max-w-[440px]">
            {/* Garis Penghubung */}
            <div
              className="absolute top-[18px] right-4 left-4 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-[#ECEAE9]"
              aria-hidden="true"
            >
              <div className="h-full w-1/2 rounded-l-full bg-[#07A81A]" />
            </div>

            <ol className="relative grid grid-cols-3">

              {/* Data dikirim */}
              <li className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#07A81A]">
                  <BadgeCheck className="h-6 w-6 text-[#0B2410]" strokeWidth={1.8} />
                </div>
                <span className="mt-2.5 text-xs font-bold text-neutral-900">
                  Data dikirim
                </span>
              </li>

              {/* Verifikasi Admin */}
              <li className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F5BA45] bg-[#FDF0D5]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F5BA45]" />
                </div>
                <span className="mt-2.5 text-xs font-semibold text-[#F5BA45]">
                  Verifikasi Admin
                </span>
              </li>

              {/* Toko Aktif */}
              <li className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E6E5] text-xs font-semibold text-[#9CA3AF]">
                  3
                </div>
                <span className="mt-2.5 text-xs font-semibold text-[#9CA3AF]">
                  Toko Aktif
                </span>
              </li>
            </ol>
          </div>

          {/* Info */}
          <div className="mt-8 flex w-full max-w-[430px] items-start gap-2.5 rounded-xl bg-[#E8F1FD] px-4 py-4 text-left sm:px-5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1E60D5]" />
            <p className="text-xs leading-relaxed text-[#1E60D5]">
              Sambil menunggu persetujuan toko, Anda dapat menggunakan akun ini untuk
              berbelanja produk UMKM lainnya di MyPeken
            </p>
          </div>

          <div className="mt-8">
            <Button
              type="button"
              className="h-10 rounded-xl bg-[#07A81A] px-6 text-xs font-semibold text-white hover:bg-[#069216] sm:text-sm"
            >
              Lanjut belanja dulu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

