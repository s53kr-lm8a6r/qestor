"use client";

import { useState, useEffect, useCallback } from "react";
import { SessionStorageUtils } from "../utils/storageUtils";

export interface UseSessionStorageReturn<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
  isLoading: boolean;
}

export function useSessionStorage<T = unknown>(
  key: string,
  defaultValue?: T
): UseSessionStorageReturn<T> {
  const [value, setStateValue] = useState<T | null>(() => {
    // Load initial value from sessionStorage on startup
    if (typeof window !== "undefined") {
      const stored = SessionStorageUtils.get<T>(key);
      return stored !== null ? stored : defaultValue || null;
    }
    return defaultValue || null;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Function to sync state with sessionStorage
  const syncValue = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = SessionStorageUtils.get<T>(key);
      setStateValue(stored !== null ? stored : defaultValue || null);
    }
  }, [key, defaultValue]);

  // Set value in sessionStorage and update state
  const setValue = useCallback(
    (newValue: T) => {
      const success = SessionStorageUtils.set(key, newValue);
      if (success) {
        setStateValue(newValue);
      }
    },
    [key]
  );

  // Remove value from sessionStorage and update state
  const removeValue = useCallback(() => {
    const success = SessionStorageUtils.remove(key);
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

// Hook for managing multiple sessionStorage items
export interface UseSessionStorageObjectReturn {
  data: Record<string, unknown>;
  getValue: <T>(key: string) => T | null;
  setValue: <T>(key: string, value: T) => void;
  removeValue: (key: string) => void;
  clear: () => void;
  isLoading: boolean;
}

export function useSessionStorageObject(): UseSessionStorageObjectReturn {
  const [data, setData] = useState<Record<string, unknown>>(() => {
    // Load all sessionStorage data on startup
    if (typeof window !== "undefined") {
      return SessionStorageUtils.getAll();
    }
    return {};
  });

  const [isLoading, setIsLoading] = useState(true);

  // Function to sync all data with sessionStorage
  const syncData = useCallback(() => {
    if (typeof window !== "undefined") {
      const allData = SessionStorageUtils.getAll();
      setData(allData);
    }
  }, []);

  // Get specific value
  const getValue = useCallback(<T>(key: string): T | null => {
    return SessionStorageUtils.get<T>(key);
  }, []);

  // Set value
  const setValue = useCallback(<T>(key: string, value: T) => {
    const success = SessionStorageUtils.set(key, value);
    if (success) {
      setData((prev) => ({ ...prev, [key]: value }));
    }
  }, []);

  // Remove value
  const removeValue = useCallback((key: string) => {
    const success = SessionStorageUtils.remove(key);
    if (success) {
      setData((prev) => {
        const newData = { ...prev };
        delete newData[key];
        return newData;
      });
    }
  }, []);

  // Clear all sessionStorage
  const clear = useCallback(() => {
    const success = SessionStorageUtils.clear();
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
