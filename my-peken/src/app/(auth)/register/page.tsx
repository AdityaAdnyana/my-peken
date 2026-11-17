import type { Metadata } from "next";
import Image from "next/image";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar - MyPeken",
  description: "Halaman pendaftaran akun MyPeken",
};

// Halaman Registrasi (/register)
export default function RegisterPage() {
  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 px-4">
      {/* Kolom kiri: Ilustrasi Sketsa Pura Bali (hanya tampil di desktop/md ke atas) */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Image
          src="/pura-sketch.png"
          alt="Ilustrasi Pura Ulun Danu Bali"
          width={450}
          height={450}
          className="w-full max-w-[360px] lg:max-w-[420px] h-auto object-contain select-none"
          priority
        />
      </div>

      {/* Kolom kanan: Form Registrasi */}
      <div className="w-full md:w-auto flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
