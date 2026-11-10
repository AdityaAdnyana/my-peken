"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

/** Redirect ke /login kalau belum login. `ready` = boleh render konten. */
export function useRequireAuth() {
  const router = useRouter();
  const { isLoggedIn, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated && !isLoggedIn) router.replace("/login");
  }, [hydrated, isLoggedIn, router]);

  return { ready: hydrated && isLoggedIn };
}
