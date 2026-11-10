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

interface KycSubmissionState {
  submitted?: boolean;
  namaToko?: string;
  namaPemilik?: string;
}

const STEPS = [
  { step: 1, label: "Data dikirim" },
  { step: 2, label: "Verifikasi Admin" },
  { step: 3, label: "Toko Aktif" },
] as const;

const actionBtnBaseCls =
  "inline-flex h-10 items-center justify-center rounded-xl text-xs font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-mypeken-brand max-[479px]:w-full sm:text-sm";

function parseSubmission(raw: string): KycSubmissionState {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as KycSubmissionState;
    return {
      ...parsed,
      submitted: parsed.submitted === true,
    };
  } catch {
    return {};
  }
}

export function KycVerificationStatus() {
  const rawSubmission = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { submitted = false, namaToko, namaPemilik } = parseSubmission(rawSubmission);
  const greetingName = namaPemilik || "Aditya";
  const activeStep = submitted ? 3 : 1;

  return (
    <section aria-labelledby="kyc-status-heading" className="flex flex-col gap-5">
      <style>{`
        [data-slot="sidebar-wrapper"]:has(#kyc-status-heading) > [data-slot="sidebar"] {
          display: none !important;
        }
        [data-slot="sidebar-wrapper"]:has(#kyc-status-heading) {
          min-height: 0 !important;
        }
      `}</style>

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
              <circle
                cx="60"
                cy="58"
                r="16"
                fill={submitted ? "#E6F4EA" : "#FAF0DC"}
                stroke={submitted ? "#088218" : "#F2CA74"}
                strokeWidth="2.5"
              />
              {submitted ? (
                <path
                  d="M53 58.5L57.5 63L67 53.5"
                  stroke="#088218"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path d="M60 49V58L66 63" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </div>

          <h2 className="mt-5 text-lg font-bold text-neutral-900 sm:text-xl">
            {submitted ? "Pengajuan Toko Disetujui & Toko Aktif" : "Pengajuan Toko Sedang Diverifikasi"}
          </h2>

          <p className="mt-3 max-w-[440px] text-xs leading-relaxed text-neutral-700 sm:text-sm">
            {submitted ? (
              <>
                Halo {greetingName}, data profil toko{namaToko ? ` (${namaToko})` : ""}, KYC, dan informasi lokasi Anda
                telah diterima dan <strong>disetujui oleh Admin MyPeken</strong>. Toko Anda kini sudah aktif!
              </>
            ) : (
              <>
                Halo {greetingName}, silakan lengkapi dan kirim pengajuan profil toko, KYC, serta informasi lokasi Anda
                untuk diverifikasi oleh Tim Admin MyPeken (Maksimal 1 &times; 24 Jam Kerja).
              </>
            )}
          </p>

          <div className="relative mt-8 w-full max-w-[440px]">
            <div
              className="absolute top-[18px] right-4 left-4 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-[#ECEAE9]"
              aria-hidden="true"
            >
              <div
                className={`h-full rounded-full bg-[#088218] transition-all duration-300 motion-reduce:transition-none ${submitted ? "w-full" : "w-0"
                  }`}
              />
            </div>

            <ol aria-label="Tahapan verifikasi KYC toko" className="relative grid grid-cols-3">
              {STEPS.map(({ step, label }) => {
                const isCurrent = step === activeStep;
                const isFirstDefault = !submitted && step === 1;

                return (
                  <li key={step} aria-current={isCurrent ? "step" : undefined} className="flex flex-col items-center">
                    {submitted ? (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#088218]">
                        <BadgeCheck className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden="true" />
                      </div>
                    ) : (
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${isFirstDefault
                            ? "border-2 border-[#F5BA45] bg-[#FDF0D5] text-[#9A6700]"
                            : "bg-[#E8E6E5] text-neutral-600"
                          }`}
                      >
                        {step}
                      </div>
                    )}
                    <span
                      className={`mt-2.5 text-xs ${submitted
                          ? step === 3
                            ? "font-bold text-[#088218]"
                            : "font-bold text-neutral-900"
                          : isFirstDefault
                            ? "font-semibold text-[#9A6700]"
                            : "font-semibold text-neutral-600"
                        }`}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-8 flex w-full max-w-[430px] items-start gap-2.5 rounded-xl bg-[#E8F1FD] px-4 py-4 text-left sm:px-5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1E60D5]" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-[#1B4FB0]">
              {submitted
                ? "Selamat! Pengajuan toko Anda telah disetujui Admin dan Toko sudah Aktif. Anda dapat langsung menuju Dashboard Seller atau lanjut berbelanja di MyPeken."
                : "Sambil menunggu persetujuan toko, Anda dapat menggunakan akun ini untuk berbelanja produk UMKM lainnya di MyPeken."}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-[479px]:w-full max-[479px]:flex-col">
            <Link
              href="/seller/kyc"
              onClick={() => {
                window.sessionStorage.removeItem(STORAGE_KEY);
                window.dispatchEvent(new Event("storage"));
              }}
              className={`${actionBtnBaseCls} border border-neutral-300 px-5 text-neutral-800 hover:bg-neutral-100`}
            >
              Kembali ke Form
            </Link>
            <Link href="/" className={`${actionBtnBaseCls} bg-[#088218] px-6 text-white hover:bg-[#066d14]`}>
              Lanjut belanja dulu
            </Link>
            <Link href="/Mydashboard" className={`${actionBtnBaseCls} bg-[#f5ba45] px-6 text-[#2a210d] hover:bg-[#eab036]`}>
              Dashboard Seller
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
