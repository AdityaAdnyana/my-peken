import { ChevronDown, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



const inputClass = "h-10 bg-white border-mypeken-light-gray";

export function KycRegistrationForm() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold text-mypeken-black sm:text-2xl">
        Pendaftaran Profil &amp; KYC Toko
      </h1>

      <Card className="bg-white ring-mypeken-light-gray">
        <CardContent className="gap-0">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* Profil Toko */}
            <Card className="bg-white ring-mypeken-light-gray">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Profil Toko</CardTitle>
              </CardHeader>
              <CardContent className="gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nama-toko" className="font-normal">
                    Nama Toko
                  </Label>
                  <Input id="nama-toko" name="namaToko" className={inputClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="domain-toko" className="font-normal">
                    Domain Toko
                  </Label>
                  <Input
                    id="domain-toko"
                    name="domainToko"
                    placeholder="mypeken.com/toko/..."
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="kategori-produk" className="font-normal">
                    Kategori Produk
                  </Label>
                  {/* Native select */}
                  <div className="relative">
                    <select
                      id="kategori-produk"
                      name="kategoriProduk"
                      defaultValue=""
                      className="h-10 w-full appearance-none rounded-md border border-mypeken-light-gray bg-white px-3 pr-8 text-sm outline-none"
                    >
                      <option value="" disabled hidden></option>
                      <option value="beras">Beras</option>
                      <option value="daging">Daging</option>
                      <option value="sayur">Sayur</option>
                      <option value="buah">Buah</option>
                      <option value="bumbu">Bumbu &amp; Rempah</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mypeken-gray" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verifikasi KYC & ID Card */}
            <Card className="bg-white ring-mypeken-light-gray">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Verifikasi KYC &amp; ID Card</CardTitle>
              </CardHeader>
              <CardContent className="gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nik" className="font-normal">
                    NIK (Nomor KTP)
                  </Label>
                  <Input
                    id="nik"
                    name="nik"
                    inputMode="numeric"
                    maxLength={16}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm leading-none">Upload Foto KTP</span>

                  {/* Area upload masih tampilan saja*/}
                  <div className="flex h-24 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-mypeken-gray/50 text-mypeken-gray">
                    <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
                    <span className="text-sm">Upload Foto</span>
                  </div>

                  <Button
                    type="button"
                    tabIndex={-1}
                    className="pointer-events-none h-10 w-full bg-mypeken-cta text-white"
                  >
                    Pilih Foto
                  </Button>

                  <p className="text-xs leading-relaxed text-mypeken-black/80">
                    Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang
                    diperbolehkan: .JPG .JPEG .PNG
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <hr className="my-5 border-mypeken-light-gray" />

          <div className="flex justify-end">
            <Button
              type="button"
              tabIndex={-1}
              className="pointer-events-none h-10 px-6 bg-mypeken-brand text-white"
            >
              Kirim Pengajuan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
