"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const AUTH_KEY = "mypeken_logged_in";
const AUTH_EVENT = "mypeken:auth";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

// null = belum hydration, sehingga status login & hydrated berubah bersamaan
function getServerSnapshot(): boolean | null {
  return null;
}

type AuthContextValue = {
  isLoggedIn: boolean;
  hydrated: boolean;
  markLoggedIn: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Sumber kebenaran = localStorage, jadi tidak perlu setState di dalam effect
  const snapshot = useSyncExternalStore<boolean | null>(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = snapshot !== null;
  const isLoggedIn = snapshot === true;

  const markLoggedIn = useCallback(() => {
    try {
      localStorage.setItem(AUTH_KEY, "true");
      window.dispatchEvent(new Event(AUTH_EVENT));
    } catch {
      // localStorage tidak tersedia → abaikan
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
      window.dispatchEvent(new Event(AUTH_EVENT));
    } catch {
      // abaikan
    }
  }, []);

  const value = useMemo(
    () => ({ isLoggedIn, hydrated, markLoggedIn, logout }),
    [isLoggedIn, hydrated, markLoggedIn, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
