import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Masuk - MyPeken",
  description: "Halaman masuk akun MyPeken",
};


export default function LoginPage() {
  return <LoginForm />;
}
