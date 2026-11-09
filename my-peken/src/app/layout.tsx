import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserratHeading = Montserrat({ subsets: ["latin"], variable: "--font-heading" });

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyPeken - Pasar Digital Lokal Bali",
  description: "Belanja kebutuhan pasar segar dan produk UMKM Bali terbaik di MyPeken",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "bg-background text-foreground h-full",
          "antialiased",
          montserrat.variable,
          inter.variable,
          "font-sans",
          montserratHeading.variable
        )}
      >
        <img
          src="/doodle-art/my-peken-doodle-art.png"
          alt="Dekorasi Latar Belakang MyPeken"
          className="fixed inset-0 w-full h-full object-cover -z-10 opacity-25"
        />
        <div>
          <Navbar />
          <main className="bg-mypeken-white mx-auto flex flex-1 flex-col gap-x-6 p-4 sm:px-6 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
            {children}
            <div className="w-full">
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
