"use client";

import { useCookies, type UseCookiesReturn } from "./useCookies";
import {
  useLocalStorage,
  useLocalStorageObject,
  type UseLocalStorageReturn,
  type UseLocalStorageObjectReturn,
} from "./useLocalStorage";
import {
  useSessionStorage,
  useSessionStorageObject,
  type UseSessionStorageReturn,
  type UseSessionStorageObjectReturn,
} from "./useSessionStorage";
import type { CookieOptions } from "../utils/storageUtils";

export type StorageType = "cookie" | "localStorage" | "sessionStorage";

export interface UseBrowserStorageReturn {
  // Cookie management
  cookies: UseCookiesReturn;

  // localStorage management
  localStorage: UseLocalStorageObjectReturn;
  useLocalStorageItem: <T>(
    key: string,
    defaultValue?: T,
    ttl?: number
  ) => UseLocalStorageReturn<T>;

  // sessionStorage management
  sessionStorage: UseSessionStorageObjectReturn;
  useSessionStorageItem: <T>(
    key: string,
    defaultValue?: T
  ) => UseSessionStorageReturn<T>;

  // Unified storage methods
  getItem: <T>(key: string, storageType: StorageType) => T | string | null;
  setItem: <T>(
    key: string,
    value: T,
    storageType: StorageType,
    options?: CookieOptions | number
  ) => void;
  removeItem: (
    key: string,
    storageType: StorageType,
    options?: Partial<CookieOptions>
  ) => void;
  clearStorage: (storageType: StorageType) => void;

  // Cross-storage utilities
  migrateData: (
    fromStorage: StorageType,
    toStorage: StorageType,
    keys?: string[]
  ) => void;
  syncData: (
    key: string,
    fromStorage: StorageType,
    toStorage: StorageType
  ) => void;

  // Global state
  isLoading: boolean;
}

export function useBrowserStorage(
  initialCookies?: Record<string, string>
): UseBrowserStorageReturn {
  // Initialize individual storage hooks
  const cookies = useCookies(initialCookies);
  const localStorage = useLocalStorageObject();
  const sessionStorage = useSessionStorageObject();

  // Unified get method
  const getItem = <T>(
    key: string,
    storageType: StorageType
  ): T | string | null => {
    switch (storageType) {
      case "cookie":
        return cookies.getCookie(key) as T | string | null;
      case "localStorage":
        return localStorage.getValue<T>(key);
      case "sessionStorage":
        return sessionStorage.getValue<T>(key);
      default:
        return null;
    }
  };

  // Unified set method
  const setItem = <T>(
    key: string,
    value: T,
    storageType: StorageType,
    options?: CookieOptions | number
  ) => {
    switch (storageType) {
      case "cookie":
        if (typeof value === "string") {
          cookies.setCookie(key, value, options as CookieOptions);
        } else {
          cookies.setCookie(
            key,
            JSON.stringify(value),
            options as CookieOptions
          );
        }
        break;
      case "localStorage":
        localStorage.setValue(
          key,
          value,
          typeof options === "number" ? options : undefined
        );
        break;
      case "sessionStorage":
        sessionStorage.setValue(key, value);
        break;
    }
  };

  // Unified remove method
  const removeItem = (
    key: string,
    storageType: StorageType,
    options?: Partial<CookieOptions>
  ) => {
    switch (storageType) {
      case "cookie":
        cookies.removeCookie(key, options);
        break;
      case "localStorage":
        localStorage.removeValue(key);
        break;
      case "sessionStorage":
        sessionStorage.removeValue(key);
        break;
    }
  };

  // Clear specific storage type
  const clearStorage = (storageType: StorageType) => {
    switch (storageType) {
      case "cookie":
        cookies.clearCookies();
        break;
      case "localStorage":
        localStorage.clear();
        break;
      case "sessionStorage":
        sessionStorage.clear();
        break;
    }
  };

  // Migrate data between storage types
  const migrateData = (
    fromStorage: StorageType,
    toStorage: StorageType,
    keys?: string[]
  ) => {
    let sourceKeys: string[] = [];

    // Get keys to migrate
    if (keys) {
      sourceKeys = keys;
    } else {
      switch (fromStorage) {
        case "cookie":
          sourceKeys = Object.keys(cookies.cookies);
          break;
        case "localStorage":
          sourceKeys = Object.keys(localStorage.data);
          break;
        case "sessionStorage":
          sourceKeys = Object.keys(sessionStorage.data);
          break;
      }
    }

    // Migrate each key
    sourceKeys.forEach((key) => {
      const value = getItem(key, fromStorage);
      if (value !== null) {
        setItem(key, value, toStorage);
      }
    });
  };

  // Sync data between storage types
  const syncData = (
    key: string,
    fromStorage: StorageType,
    toStorage: StorageType
  ) => {
    const value = getItem(key, fromStorage);
    if (value !== null) {
      setItem(key, value, toStorage);
    }
  };

  // Factory functions for individual storage items
  const useLocalStorageItem = <T>(
    key: string,
    defaultValue?: T,
    ttl?: number
  ) => {
    return useLocalStorage<T>(key, defaultValue, ttl);
  };

  const useSessionStorageItem = <T>(key: string, defaultValue?: T) => {
    return useSessionStorage<T>(key, defaultValue);
  };

  // Calculate global loading state
  const isLoading = localStorage.isLoading || sessionStorage.isLoading;

  return {
    // Individual storage hooks
    cookies,
    localStorage,
    sessionStorage,

    // Factory functions
    useLocalStorageItem,
    useSessionStorageItem,

    // Unified methods
    getItem,
    setItem,
    removeItem,
    clearStorage,

    // Cross-storage utilities
    migrateData,
    syncData,

    // Global state
    isLoading,
  };
}

// Convenience hook for specific storage item with automatic type inference
export function useStorageItem<T = unknown>(
  key: string,
  storageType: StorageType,
  defaultValue?: T,
  options?: CookieOptions | number
) {
  const storage = useBrowserStorage();

  switch (storageType) {
    case "localStorage":
      return storage.useLocalStorageItem<T>(
        key,
        defaultValue,
        typeof options === "number" ? options : undefined
      );
    case "sessionStorage":
      return storage.useSessionStorageItem<T>(key, defaultValue);
    case "cookie":
      // For cookies, we'll create a simplified version
      const cookies = storage.cookies;
      return {
        value: cookies.getCookie(key) as T | null,
        setValue: (value: T) => {
          const stringValue =
            typeof value === "string" ? value : JSON.stringify(value);
          cookies.setCookie(key, stringValue, options as CookieOptions);
        },
        removeValue: () =>
          cookies.removeCookie(key, options as Partial<CookieOptions>),
        isLoading: false,
      };
    default:
      throw new Error(`Unsupported storage type: ${storageType}`);
  }
}
