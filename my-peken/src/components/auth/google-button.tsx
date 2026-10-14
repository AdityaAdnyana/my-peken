import React from "react";
import Image from "next/image";

interface GoogleButtonProps {
  text?: string;
  onClick?: () => void;
}

// Komponen tombol Google
export function GoogleButton({ text = "Google", onClick }: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-mypeken-light-gray bg-white/50 hover:bg-white text-sm font-medium text-mypeken-black transition-colors cursor-pointer"
    >
      <Image
        src="/google.png"
        alt="Logo Google"
        width={18}
        height={18}
        className="object-contain"
      />
      <span>{text}</span>
    </button>
  );
}
