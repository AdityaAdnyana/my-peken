"use client";

import { useRef, useState } from "react";
import { ChevronDown, CloudUpload, ImageIcon, Loader2, RotateCcw, Trash2 } from "lucide-react";
import type { SelectOption } from "./use-fetch-options";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png"]);

const fieldCls =
  "w-full rounded-lg border border-mypeken-light-gray bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-500 transition-colors motion-reduce:transition-none focus-visible:border-mypeken-brand focus-visible:ring-3 focus-visible:ring-mypeken-brand/20 focus-visible:outline-none aria-invalid:border-red-600 read-only:bg-neutral-50 read-only:text-neutral-600";

const pickBtnCls =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#f5ba45] px-3.5 py-2 text-xs font-semibold text-[#2a210d] transition-colors motion-reduce:transition-none hover:bg-[#eab036] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mypeken-brand";

const dropzoneCls =
  "flex flex-col items-center justify-center gap-2.5 rounded-xl border border-mypeken-light-gray bg-white text-center transition-colors motion-reduce:transition-none data-[dragging=true]:border-dashed data-[dragging=true]:border-mypeken-brand data-[dragging=true]:bg-emerald-50/40 data-[invalid=true]:border-red-600";

export interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  hint?: string;
  counter?: string;
  error?: string;
  type?: "text" | "tel";
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  readOnly?: boolean;
  required?: boolean;
  hideLabel?: boolean;
  multiline?: boolean;
  rows?: number;
}

export function InputField({
  id, name, label, value, onChange, placeholder, hint, counter,
  error, type = "text", inputMode, maxLength, readOnly = false,
  required = false, hideLabel = false, multiline = false, rows = 3,
}: InputFieldProps) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div className={hideLabel ? "sr-only" : "flex items-center justify-between gap-2"}>
        <label htmlFor={id} className="text-sm font-medium text-neutral-800">
          {label}
          {required && <span className="ml-0.5 text-red-600" aria-hidden="true">*</span>}
        </label>
        {counter && <span className="text-xs text-neutral-500" aria-live="polite">{counter}</span>}
      </div>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${fieldCls} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={fieldCls}
        />
      )}

      {hint && <p id={`${id}-hint`} className="text-xs text-neutral-500">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  loading?: boolean;
  fetchError?: string | null;
  onRetry?: () => void;
  error?: string;
  required?: boolean;
  hideLabel?: boolean;
}

export function SelectField({
  id, name, label, placeholder, value, options, onChange,
  loading = false, fetchError = null, onRetry, error,
  required = false, hideLabel = false,
}: SelectFieldProps) {
  const errId = `${id}-error`;
  const activeError = fetchError || error;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={hideLabel ? "sr-only" : "text-sm font-medium text-neutral-800"}>
        {label}
        {required && <span className="ml-0.5 text-red-600" aria-hidden="true">*</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          disabled={loading || Boolean(fetchError)}
          onChange={(e) => onChange(e.target.value)}
          aria-busy={loading}
          aria-required={required}
          aria-invalid={Boolean(activeError)}
          aria-describedby={activeError ? errId : undefined}
          className={`${fieldCls} appearance-none pr-9 disabled:bg-neutral-50 disabled:text-neutral-500`}
        >
          <option value="">{loading ? `Memuat ${label.toLowerCase()}...` : placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {loading ? (
          <Loader2 className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-neutral-500 motion-reduce:animate-none" aria-hidden="true" />
        ) : (
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
        )}
      </div>

      {fetchError ? (
        <div id={errId} role="alert" className="flex items-center justify-between gap-2 rounded-md bg-red-50 px-2.5 py-1.5 text-xs text-red-700">
          <span>{fetchError}</span>
          {onRetry && (
            <button type="button" onClick={onRetry} className="inline-flex shrink-0 cursor-pointer items-center gap-1 font-semibold underline hover:text-red-900">
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              Coba Lagi
            </button>
          )}
        </div>
      ) : (
        error && <p id={errId} role="alert" className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

export interface UploadBoxProps {
  id: string;
  label: string;
  hint: string;
  file: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  error?: string;
  variant?: "large" | "compact";
  required?: boolean;
}

export function UploadBox({
  id, label, hint, file, previewUrl, onFileSelect, onRemove,
  error, variant = "compact", required = false,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const activeError = fileError || error;
  const errId = `${id}-error`;
  const sizeCls = variant === "large" ? "min-h-40 p-5 min-[480px]:min-h-44 xl:min-h-52" : "min-h-32 p-3.5";

  function processFile(candidate?: File | null) {
    if (!candidate) return;
    if (!ALLOWED_MIME.has(candidate.type)) {
      setFileError("Format file harus .JPG, .JPEG, atau .PNG.");
      return;
    }
    if (candidate.size === 0 || candidate.size > MAX_FILE_BYTES) {
      setFileError("Ukuran file tidak valid atau melebihi batas 10MB.");
      return;
    }
    setFileError(null);
    onFileSelect(candidate);
  }

  function handleRemove() {
    setFileError(null);
    if (inputRef.current) inputRef.current.value = "";
    onRemove();
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutral-800">
        {label}
        {required && <span className="ml-0.5 text-red-600" aria-hidden="true">*</span>}
      </label>

      <input
        ref={inputRef}
        id={id}
        type="file"
        tabIndex={-1}
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        onChange={(e) => processFile(e.target.files?.[0])}
        aria-invalid={Boolean(activeError)}
        aria-describedby={activeError ? errId : undefined}
        className="sr-only"
      />

      <div
        data-dragging={dragging}
        data-invalid={Boolean(activeError)}
        onClick={() => { if (!file) inputRef.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          processFile(e.dataTransfer.files?.[0]);
        }}
        className={`${dropzoneCls} ${sizeCls} ${!file ? "cursor-pointer" : ""}`}
      >
        {!file ? (
          <>
            {variant === "large" && (
              <ImageIcon className="h-9 w-9 text-neutral-800" strokeWidth={1.75} aria-hidden="true" />
            )}
            <p className="text-xs font-medium text-neutral-700">{hint}</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              aria-label={`Pilih foto untuk ${label}`}
              className={pickBtnCls}
            >
              <CloudUpload className="h-3.5 w-3.5" aria-hidden="true" />
              Pilih Foto
            </button>
          </>
        ) : (
          <div className="flex w-full flex-col items-center gap-2">
            {previewUrl && (
              <img src={previewUrl} alt={`Pratinjau ${label}`} className="h-14 w-20 rounded border border-neutral-200 object-cover" />
            )}
            <p className="max-w-full truncate text-xs font-medium text-neutral-800" title={file.name}>
              {file.name} ({(file.size / 1048576).toFixed(2)} MB)
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-label={`Ganti foto untuk ${label}`}
                className={pickBtnCls}
              >
                Ganti
              </button>
              <button
                type="button"
                onClick={handleRemove}
                aria-label={`Hapus ${label}`}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-mypeken-brand"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Hapus
              </button>
            </div>
          </div>
        )}
      </div>

      {activeError && <p id={errId} role="alert" className="text-xs text-red-600">{activeError}</p>}
    </div>
  );
}
