"use client";

import { useCallback, useEffect, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface FetchState<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
}

function getFriendlyError(err: unknown): string {
  if (err instanceof TypeError) {
    return "Gagal memuat data. Periksa koneksi Anda lalu coba lagi.";
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return "Terjadi kesalahan saat memuat data referensi.";
}

function isOptionArray(payload: unknown): payload is SelectOption[] {
  return (
    Array.isArray(payload) &&
    payload.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as SelectOption).value === "string" &&
        typeof (item as SelectOption).label === "string"
    )
  );
}

export function useFetchOptions(url: string, label: string) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<FetchState<SelectOption>>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadOptions() {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const msg =
            res.status === 404
              ? `Data ${label} tidak ditemukan (404).`
              : `Gagal memuat daftar ${label} (kode ${res.status}).`;
          throw new Error(msg);
        }

        const json: unknown = await res.json();
        if (!isOptionArray(json) || json.length === 0) {
          throw new Error(`Daftar ${label} kosong atau format tidak valid.`);
        }

        if (!controller.signal.aborted) {
          setState({ data: json, isLoading: false, error: null });
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setState({ data: [], isLoading: false, error: getFriendlyError(err) });
      }
    }

    loadOptions();
    return () => controller.abort();
  }, [url, label, attempt]);

  const retry = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, retry };
}

