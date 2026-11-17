import type { Metadata } from "next";
import { CheckoutContent } from "@/components/buyer/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout - MyPeken",
  description: "Selesaikan pesanan dan pilih metode pembayaran di MyPeken.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
