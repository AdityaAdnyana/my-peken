import React from "react";
import Link from "next/link";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mypeken-white flex flex-col justify-between p-4 sm:p-6">

      <header className="w-full flex justify-center pt-2 sm:pt-4">
        <Link href="/">
          <span className="font-heading font-bold text-2xl sm:text-3xl text-mypeken-brand tracking-tight hover:opacity-90 transition-opacity">
            MyPeken
          </span>
        </Link>
      </header>

      <main className="w-full flex-1 flex items-center justify-center py-6">
        {children}
      </main>

      <footer className="w-full text-center pb-2 sm:pb-4">
        <p className="text-xs text-mypeken-black/80">
          © 2026, MyPeken |{" "}
          <Link
            href="#"
            className="text-mypeken-cta font-medium hover:underline"
          >
            Bantuan
          </Link>
        </p>
      </footer>
    </div>
  );
}
