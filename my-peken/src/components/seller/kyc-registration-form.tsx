"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, BadgeCheck, Loader2, MapPin, Store, Wallet } from "lucide-react";
import { InputField, SelectField, UploadBox } from "./kyc/kyc-fields";
import { useFetchOptions } from "./kyc/use-fetch-options";

interface KycFormData {
  namaToko: string;
  nomorTelepon: string;
  deskripsiToko: string;
  nik: string;
  bank: string;
  nomorRekening: string;
  namaPemilik: string;
  provinsi: string;
  kabupaten: string;
  alamatLengkap: string;
}

type UploadKey = "logoToko" | "fotoKtp" | "selfieKtp";
type FieldKey = keyof KycFormData | UploadKey;

interface FileEntry {
  file: File | null;
  preview: string | null;
}

const INITIAL_FORM: KycFormData = {
  namaToko: "", nomorTelepon: "", deskripsiToko: "", nik: "", bank: "",
  nomorRekening: "", namaPemilik: "", provinsi: "Provinsi Bali", kabupaten: "", alamatLengkap: "",
};

const EMPTY_FILES: Record<UploadKey, FileEntry> = {
  logoToko: { file: null, preview: null },
  fotoKtp: { file: null, preview: null },
  selfieKtp: { file: null, preview: null },
};

const FIELD_ORDER: Array<{ key: FieldKey; id: string }> = [
  { key: "namaToko", id: "nama-toko" }, { key: "nomorTelepon", id: "nomor-telepon" },
  { key: "deskripsiToko", id: "deskripsi-toko" }, { key: "logoToko", id: "logo-toko-btn" },
  { key: "nik", id: "nik" }, { key: "fotoKtp", id: "foto-ktp-btn" }, { key: "selfieKtp", id: "selfie-ktp-btn" },
  { key: "bank", id: "pilih-bank" }, { key: "nomorRekening", id: "nomor-rekening" },
  { key: "namaPemilik", id: "nama-pemilik" }, { key: "kabupaten", id: "kabupaten" },
  { key: "alamatLengkap", id: "alamat-toko" },
];

const colHeadCls = "flex items-center gap-2 border-b border-neutral-200 pb-3";
const subcardCls = "flex flex-col gap-3 rounded-xl border border-mypeken-light-gray p-3.5 md:p-4";
const resetBtnCls = "cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-mypeken-brand max-[479px]:w-full";
const submitBtnCls = "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#088218] px-5 py-2 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#066d14] focus-visible:outline-2 focus-visible:outline-mypeken-brand disabled:cursor-not-allowed disabled:opacity-65 max-[479px]:w-full";

const PHONE_RE = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;

function validateKyc(data: KycFormData, files: Record<UploadKey, FileEntry>) {
  const errs: Partial<Record<FieldKey, string>> = {};
  if (data.namaToko.trim().length < 3) errs.namaToko = "Nama toko minimal 3 karakter.";
  if (!PHONE_RE.test(data.nomorTelepon.trim()))
    errs.nomorTelepon = "Masukkan nomor HP aktif Indonesia (contoh: 081234567890).";
  if (data.deskripsiToko.trim().length < 10) errs.deskripsiToko = "Deskripsi singkat minimal 10 karakter.";
  if (!files.logoToko.file) errs.logoToko = "Foto/logo toko wajib diunggah.";
  if (!/^\d{16}$/.test(data.nik)) errs.nik = "NIK wajib terdiri dari 16 digit angka.";
  if (!files.fotoKtp.file) errs.fotoKtp = "Foto KTP wajib diunggah.";
  if (!files.selfieKtp.file) errs.selfieKtp = "Foto selfie dengan KTP wajib diunggah.";
  if (!data.bank) errs.bank = "Silakan pilih bank pencairan.";
  if (!/^\d{8,20}$/.test(data.nomorRekening)) errs.nomorRekening = "Nomor rekening harus 8-20 digit angka.";
  if (data.namaPemilik.trim().length < 3) errs.namaPemilik = "Nama pemilik rekening minimal 3 karakter.";
  if (!data.kabupaten) errs.kabupaten = "Silakan pilih kabupaten/kota di Bali.";
  if (data.alamatLengkap.trim().length < 10) errs.alamatLengkap = "Alamat lengkap toko minimal 10 karakter.";
  return errs;
}

export function KycRegistrationForm() {
  const router = useRouter();
  const [form, setForm] = useState<KycFormData>(INITIAL_FORM);
  const [files, setFiles] = useState<Record<UploadKey, FileEntry>>(EMPTY_FILES);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [formAlert, setFormAlert] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const previewsRef = useRef<Record<UploadKey, string | null>>({
    logoToko: null, fotoKtp: null, selfieKtp: null,
  });

  const bankOpts = useFetchOptions("/data/banks.json", "bank");
  const kabupatenOpts = useFetchOptions("/data/kabupaten.json", "kabupaten");

  useEffect(() => {
    sessionStorage.removeItem("mypeken_kyc_submission");
    window.dispatchEvent(new Event("storage"));
    const active = previewsRef.current;
    return () => Object.values(active).forEach((url) => url && URL.revokeObjectURL(url));
  }, []);

  function updateField<K extends keyof KycFormData>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    if (formAlert) setFormAlert(null);
  }

  function handleBlur<K extends keyof KycFormData>(key: K) {
    if (!form[key].trim()) return;
    const fieldErr = validateKyc(form, files)[key];
    setErrors((prev) => ({ ...prev, [key]: fieldErr }));
  }

  function handleFileSelect(key: UploadKey, file: File) {
    const prevUrl = previewsRef.current[key];
    if (prevUrl) URL.revokeObjectURL(prevUrl);
    const nextUrl = URL.createObjectURL(file);
    previewsRef.current[key] = nextUrl;
    setFiles((prev) => ({ ...prev, [key]: { file, preview: nextUrl } }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    if (formAlert) setFormAlert(null);
  }

  function handleFileRemove(key: UploadKey) {
    const prevUrl = previewsRef.current[key];
    if (prevUrl) URL.revokeObjectURL(prevUrl);
    previewsRef.current[key] = null;
    setFiles((prev) => ({ ...prev, [key]: { file: null, preview: null } }));
  }

  function handleReset() {
    Object.values(previewsRef.current).forEach((url) => url && URL.revokeObjectURL(url));
    previewsRef.current = { logoToko: null, fotoKtp: null, selfieKtp: null };
    setForm(INITIAL_FORM);
    setFiles(EMPTY_FILES);
    setErrors({});
    setFormAlert(null);
    sessionStorage.removeItem("mypeken_kyc_submission");
    window.dispatchEvent(new Event("storage"));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateKyc(form, files);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFormAlert("Mohon periksa kembali kolom yang masih kosong atau belum sesuai.");
      const firstInvalid = FIELD_ORDER.find((item) => nextErrors[item.key]);
      if (firstInvalid) document.getElementById(firstInvalid.id)?.focus();
      return;
    }

    setIsSubmitting(true);
    setFormAlert(null);
    try {
      sessionStorage.setItem(
        "mypeken_kyc_submission",
        JSON.stringify({
          submitted: true,
          namaToko: form.namaToko.trim(),
          namaPemilik: form.namaPemilik.trim(),
        })
      );
      window.dispatchEvent(new Event("storage"));
      router.push("/seller/kyc/verification");
    } catch {
      setIsSubmitting(false);
      setFormAlert("Gagal mengirim pengajuan. Silakan coba beberapa saat lagi.");
    }
  }

  return (
    <section aria-labelledby="kyc-heading" className="flex flex-col gap-5">
      <style>{`
        [data-slot="sidebar-wrapper"]:has(#kyc-heading) > [data-slot="sidebar"] {
          display: none !important;
        }
        [data-slot="sidebar-wrapper"]:has(#kyc-heading) {
          min-height: 0 !important;
        }
      `}</style>
      <h1 id="kyc-heading" className="text-xl font-semibold text-neutral-900 sm:text-2xl">
        Pendaftaran Profil &amp; KYC Toko
      </h1>

      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        className="rounded-xl border border-mypeken-light-gray bg-white p-4.5 max-[479px]:p-3.5 sm:p-6 xl:px-8 xl:py-7"
      >
        {formAlert && (
          <div role="alert" aria-live="assertive" className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{formAlert}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <section aria-labelledby="profil-toko-title" className="flex min-w-0 flex-col gap-4">
            <header className={colHeadCls}>
              <Store className="h-5 w-5 text-neutral-800" aria-hidden="true" />
              <h2 id="profil-toko-title" className="text-base font-semibold text-neutral-900">Profil Toko</h2>
            </header>

            <InputField id="nama-toko" name="namaToko" label="Nama Toko" required maxLength={50}
              counter={`${form.namaToko.length}/50 karakter`} counterValid={form.namaToko.trim().length >= 3}
              value={form.namaToko} onChange={(v) => updateField("namaToko", v)} onBlur={() => handleBlur("namaToko")}
              placeholder="Masukkan nama toko" error={errors.namaToko} />

            <InputField id="nomor-telepon" name="nomorTelepon" type="tel" inputMode="tel" label="Nomor Telepon Toko"
              required maxLength={15} counter={`${form.nomorTelepon.length} digit`}
              counterValid={PHONE_RE.test(form.nomorTelepon.trim())} value={form.nomorTelepon}
              onChange={(v) => updateField("nomorTelepon", v.replace(/[^\d+]/g, "").slice(0, 15))}
              onBlur={() => handleBlur("nomorTelepon")} placeholder="Contoh: 081234567890"
              hint="Gunakan nomor telepon aktif untuk menerima verifikasi & pesanan pembeli" error={errors.nomorTelepon} />

            <InputField id="deskripsi-toko" name="deskripsiToko" label="Deskripsi Singkat Toko" required multiline rows={4}
              maxLength={300} counter={`${form.deskripsiToko.length}/300 karakter`}
              counterValid={form.deskripsiToko.trim().length >= 10} value={form.deskripsiToko}
              onChange={(v) => updateField("deskripsiToko", v)} onBlur={() => handleBlur("deskripsiToko")}
              placeholder="Ceritakan produk unggulan atau ciri khas toko Anda" error={errors.deskripsiToko} />

            <UploadBox id="logo-toko" label="Upload Foto/Logo Toko" hint="Upload Foto" variant="large" required
              file={files.logoToko.file} previewUrl={files.logoToko.preview}
              onFileSelect={(f) => handleFileSelect("logoToko", f)} onRemove={() => handleFileRemove("logoToko")}
              error={errors.logoToko} />
          </section>

          <section aria-labelledby="verifikasi-title" className="flex min-w-0 flex-col gap-4">
            <header className={colHeadCls}>
              <BadgeCheck className="h-5 w-5 text-neutral-900" aria-hidden="true" />
              <h2 id="verifikasi-title" className="text-base font-semibold text-neutral-900">
                Verifikasi Identitas &amp; Operasional
              </h2>
            </header>

            <InputField id="nik" name="nik" label="NIK (Nomor KTP)" required inputMode="numeric" maxLength={16}
              counter={`${form.nik.length}/16 digit`} counterValid={/^\d{16}$/.test(form.nik)} value={form.nik}
              onChange={(v) => updateField("nik", v.replace(/\D/g, "").slice(0, 16))}
              onBlur={() => handleBlur("nik")} placeholder="Masukkan 16 digit NIK" error={errors.nik} />

            <div className="grid grid-cols-2 gap-3 max-[479px]:grid-cols-1 md:gap-4">
              <UploadBox id="foto-ktp" label="Foto KTP" hint="Scan/Foto Asli" required
                file={files.fotoKtp.file} previewUrl={files.fotoKtp.preview}
                onFileSelect={(f) => handleFileSelect("fotoKtp", f)} onRemove={() => handleFileRemove("fotoKtp")}
                error={errors.fotoKtp} />
              <UploadBox id="selfie-ktp" label="Selfie dengan KTP" hint="Wajah terlihat jelas" required
                file={files.selfieKtp.file} previewUrl={files.selfieKtp.preview}
                onFileSelect={(f) => handleFileSelect("selfieKtp", f)} onRemove={() => handleFileRemove("selfieKtp")}
                error={errors.selfieKtp} />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="flex items-center gap-2 text-sm font-medium text-neutral-800">
                <Wallet className="h-4 w-4 text-neutral-700" aria-hidden="true" />
                Informasi Rekening Pencairan
              </legend>
              <div className={subcardCls}>
                <SelectField id="pilih-bank" name="bank" label="Bank Pencairan" placeholder="Pilih Bank" required hideLabel
                  value={form.bank} options={bankOpts.data} loading={bankOpts.isLoading} fetchError={bankOpts.error}
                  onRetry={bankOpts.retry} onChange={(v) => updateField("bank", v)} error={errors.bank} />
                <InputField id="nomor-rekening" name="nomorRekening" label="Nomor Rekening" required hideLabel
                  inputMode="numeric" maxLength={20} counter={`${form.nomorRekening.length}/20 digit (min. 8)`}
                  counterValid={/^\d{8,20}$/.test(form.nomorRekening)} placeholder="Nomor Rekening"
                  value={form.nomorRekening} onBlur={() => handleBlur("nomorRekening")}
                  onChange={(v) => updateField("nomorRekening", v.replace(/\D/g, "").slice(0, 20))} error={errors.nomorRekening} />
                <InputField id="nama-pemilik" name="namaPemilik" label="Nama Pemilik" required hideLabel maxLength={60}
                  counter={`${form.namaPemilik.length}/60 karakter (min. 3)`}
                  counterValid={form.namaPemilik.trim().length >= 3}
                  placeholder="Nama Pemilik" value={form.namaPemilik} onBlur={() => handleBlur("namaPemilik")}
                  onChange={(v) => updateField("namaPemilik", v)} error={errors.namaPemilik} />
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <legend className="flex items-center gap-2 text-sm font-medium text-neutral-800">
                <MapPin className="h-4 w-4 text-neutral-700" aria-hidden="true" />
                Lokasi &amp; Alamat Toko
              </legend>
              <div className={subcardCls}>
                <InputField id="provinsi" name="provinsi" label="Provinsi" hideLabel readOnly value={form.provinsi} />
                <SelectField id="kabupaten" name="kabupaten" label="Kabupaten" placeholder="Kabupaten" required hideLabel
                  value={form.kabupaten} options={kabupatenOpts.data} loading={kabupatenOpts.isLoading}
                  fetchError={kabupatenOpts.error} onRetry={kabupatenOpts.retry}
                  onChange={(v) => updateField("kabupaten", v)} error={errors.kabupaten} />
                <InputField id="alamat-toko" name="alamatLengkap" label="Alamat Lengkap Toko" required hideLabel multiline rows={3}
                  maxLength={250} counter={`${form.alamatLengkap.length}/250 karakter`}
                  counterValid={form.alamatLengkap.trim().length >= 10}
                  placeholder="Alamat Lengkap Toko (Jalan, Banjar, dll)" value={form.alamatLengkap}
                  onBlur={() => handleBlur("alamatLengkap")} onChange={(v) => updateField("alamatLengkap", v)} error={errors.alamatLengkap} />
              </div>
            </fieldset>
          </section>
        </div>

        <footer className="mt-7 flex flex-col gap-4 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-relaxed text-neutral-500">
            Besar file : maksimum 10MB (.JPG, .JPEG, .PNG) Seluruh data dilindungi ketentuan privasi MyPeken.
          </p>
          <div className="flex items-center justify-end gap-3 max-[479px]:w-full max-[479px]:flex-col-reverse">
            <button type="button" onClick={handleReset} disabled={isSubmitting} className={resetBtnCls}>
              Reset
            </button>
            <button type="submit" disabled={isSubmitting} className={submitBtnCls}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
              {isSubmitting ? "Mengirim..." : "Kirim Pengajuan"}
            </button>
          </div>
        </footer>
      </form>
    </section>
  );
}
