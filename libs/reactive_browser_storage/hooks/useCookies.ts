"use client";

import { useState, useEffect, useCallback } from "react";
import { CookieUtils, type CookieOptions } from "../utils/storageUtils";

export interface UseCookiesReturn {
  cookies: Record<string, string>;
  getCookie: (name: string) => string | null;
  setCookie: (name: string, value: string, options?: CookieOptions) => void;
  removeCookie: (name: string, options?: Partial<CookieOptions>) => void;
  clearCookies: () => void;
}

export function useCookies(
  initialCookies?: Record<string, string>
): UseCookiesReturn {
  const [cookies, setCookies] = useState<Record<string, string>>(() => {
    // Load initial cookies from browser on startup
    if (typeof window !== "undefined") {
      return { ...initialCookies, ...CookieUtils.getAll() };
    }
    return initialCookies || {};
  });

  // Function to sync cookies state with actual browser cookies
  const syncCookies = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentCookies = CookieUtils.getAll();
      setCookies(currentCookies);
    }
  }, []);

  // Get specific cookie
  const getCookie = useCallback((name: string): string | null => {
    return CookieUtils.get(name);
  }, []);

  // Set cookie and update state
  const setCookie = useCallback(
    (name: string, value: string, options?: CookieOptions) => {
      const success = CookieUtils.set(name, value, options);
      if (success) {
        setCookies((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  // Remove cookie and update state
  const removeCookie = useCallback(
    (name: string, options?: Partial<CookieOptions>) => {
      const success = CookieUtils.remove(name, options);
      if (success) {
        setCookies((prev) => {
          const newCookies = { ...prev };
          delete newCookies[name];
          return newCookies;
        });
      }
    },
    []
  );

  // Clear all cookies
  const clearCookies = useCallback(() => {
    Object.keys(cookies).forEach((name) => {
      CookieUtils.remove(name);
    });
    setCookies({});
  }, [cookies]);

  // Listen for storage events and cookie changes
  useEffect(() => {
    const handleStorageChange = () => {
      syncCookies();
    };

    // Check for cookie changes periodically
    const interval = setInterval(syncCookies, 1000);

    // Listen for focus events to sync when user returns to tab
    window.addEventListener("focus", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [syncCookies]);

  return {
    cookies,
    getCookie,
    setCookie,
    removeCookie,
    clearCookies,
  };
}
