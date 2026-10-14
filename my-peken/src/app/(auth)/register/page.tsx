import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar - MyPeken",
  description: "Halaman pendaftaran akun MyPeken",
};


export default function RegisterPage() {
  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center md:justify-end px-4">
      <div className="hidden md:flex flex-1" />

      <RegisterForm />
    </div>
  );
}
