// Storage utility classes
export {
  CookieUtils,
  LocalStorageUtils,
  SessionStorageUtils,
  type CookieOptions,
  type StorageItem,
} from "./utils/storageUtils";

// Cookie hooks
export { useCookies, type UseCookiesReturn } from "./hooks/useCookies";

// localStorage hooks
export {
  useLocalStorage,
  useLocalStorageObject,
  type UseLocalStorageReturn,
  type UseLocalStorageObjectReturn,
} from "./hooks/useLocalStorage";

// sessionStorage hooks
export {
  useSessionStorage,
  useSessionStorageObject,
  type UseSessionStorageReturn,
  type UseSessionStorageObjectReturn,
} from "./hooks/useSessionStorage";

// Unified browser storage hooks
export {
  useBrowserStorage,
  useStorageItem,
  type UseBrowserStorageReturn,
  type StorageType,
} from "./hooks/useBrowserStorage";
