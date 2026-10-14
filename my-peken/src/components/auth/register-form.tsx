"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GoogleButton } from "./google-button";

export function RegisterForm() {

  const [identifier, setIdentifier] = useState("");

  const isFilled = identifier.trim().length > 0;

  // logic nyusul
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFilled) return;

  };

  return (
    <div className="w-full max-w-[380px] sm:max-w-[400px] bg-mypeken-white border border-mypeken-light-gray rounded-xl p-6 sm:p-7 shadow-xs">

      <div className="text-center mb-5">
        <h1 className="text-base sm:text-lg font-bold text-mypeken-black">
          Daftar Sekarang
        </h1>
        <p className="text-xs text-mypeken-black/80 mt-1">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-mypeken-cta font-medium hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>

      <GoogleButton text="Google" />

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-mypeken-light-gray" />
        <span className="px-3 text-[11px] sm:text-xs text-mypeken-black/70">
          atau masuk dengan
        </span>
        <div className="flex-1 h-px bg-mypeken-light-gray" />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Nomor HP atau Email"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-mypeken-light-gray rounded-lg text-mypeken-black placeholder:text-mypeken-gray/60 focus:outline-none focus:border-mypeken-brand focus:ring-1 focus:ring-mypeken-brand transition"
          />

          <p className="text-[11px] text-mypeken-gray mt-1">
            Contoh: 08123456789
          </p>

          <div className="text-right mt-2 mb-4">
            <Link
              href="#"
              className="text-[11px] sm:text-xs text-mypeken-cta font-medium hover:underline"
            >
              Butuh bantuan?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFilled}
          className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${isFilled
            ? "bg-mypeken-cta text-white hover:opacity-90 cursor-pointer"
            : "bg-mypeken-light-gray text-mypeken-black cursor-not-allowed"
            }`}
        >
          Daftar
        </button>
      </form>
    </div>
  );
}
