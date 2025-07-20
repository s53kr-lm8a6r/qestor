"use client";

import { useState, useEffect, useCallback } from "react";
import { LocalStorageUtils } from "../utils/storageUtils";

export interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T, ttl?: number) => void;
  removeValue: () => void;
  isLoading: boolean;
}

export function useLocalStorage<T = unknown>(
  key: string,
  defaultValue?: T,
  ttl?: number
): UseLocalStorageReturn<T> {
  const [value, setStateValue] = useState<T | null>(() => {
    // Load initial value from localStorage on startup
    if (typeof window !== "undefined") {
      const stored = LocalStorageUtils.get<T>(key);
      return stored !== null ? stored : defaultValue || null;
    }
    return defaultValue || null;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Function to sync state with localStorage
  const syncValue = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = LocalStorageUtils.get<T>(key);
      setStateValue(stored !== null ? stored : defaultValue || null);
    }
  }, [key, defaultValue]);

  // Set value in localStorage and update state
  const setValue = useCallback(
    (newValue: T, newTtl?: number) => {
      const success = LocalStorageUtils.set(key, newValue, newTtl || ttl);
      if (success) {
        setStateValue(newValue);
      }
    },
    [key, ttl]
  );

  // Remove value from localStorage and update state
  const removeValue = useCallback(() => {
    const success = LocalStorageUtils.remove(key);
    if (success) {
      setStateValue(defaultValue || null);
    }
  }, [key, defaultValue]);

  // Listen for storage events and changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        syncValue();
      }
    };

    const handleFocus = () => {
      syncValue();
    };

    // Initial sync
    syncValue();
    setIsLoading(false);

    // Listen for storage events
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [key, syncValue]);

  return {
    value,
    setValue,
    removeValue,
    isLoading,
  };
}

// Hook for managing multiple localStorage items
export interface UseLocalStorageObjectReturn {
  data: Record<string, unknown>;
  getValue: <T>(key: string) => T | null;
  setValue: <T>(key: string, value: T, ttl?: number) => void;
  removeValue: (key: string) => void;
  clear: () => void;
  isLoading: boolean;
}

export function useLocalStorageObject(): UseLocalStorageObjectReturn {
  const [data, setData] = useState<Record<string, unknown>>(() => {
    // Load all localStorage data on startup
    if (typeof window !== "undefined") {
      return LocalStorageUtils.getAll();
    }
    return {};
  });

  const [isLoading, setIsLoading] = useState(true);

  // Function to sync all data with localStorage
  const syncData = useCallback(() => {
    if (typeof window !== "undefined") {
      const allData = LocalStorageUtils.getAll();
      setData(allData);
    }
  }, []);

  // Get specific value
  const getValue = useCallback(<T>(key: string): T | null => {
    return LocalStorageUtils.get<T>(key);
  }, []);

  // Set value
  const setValue = useCallback(<T>(key: string, value: T, ttl?: number) => {
    const success = LocalStorageUtils.set(key, value, ttl);
    if (success) {
      setData((prev) => ({ ...prev, [key]: value }));
    }
  }, []);

  // Remove value
  const removeValue = useCallback((key: string) => {
    const success = LocalStorageUtils.remove(key);
    if (success) {
      setData((prev) => {
        const newData = { ...prev };
        delete newData[key];
        return newData;
      });
    }
  }, []);

  // Clear all localStorage
  const clear = useCallback(() => {
    const success = LocalStorageUtils.clear();
    if (success) {
      setData({});
    }
  }, []);

  // Listen for storage events
  useEffect(() => {
    const handleStorageChange = () => {
      syncData();
    };

    // Initial sync
    syncData();
    setIsLoading(false);

    // Listen for storage events
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, [syncData]);

  return {
    data,
    getValue,
    setValue,
    removeValue,
    clear,
    isLoading,
  };
}
