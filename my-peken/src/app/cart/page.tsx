import type { Metadata } from "next";
import { CartContent } from "@/components/buyer/CartContent";

export const metadata: Metadata = {
  title: "Keranjang - MyPeken",
  description: "Daftar produk di keranjang belanja MyPeken.",
};

export default function CartPage() {
  return <CartContent />;
}
