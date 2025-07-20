export interface CookieOptions {
  expires?: Date | string | number;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export interface StorageItem<T = unknown> {
  value: T;
  timestamp: number;
  expires?: number;
}

// Cookie utilities
export class CookieUtils {
  static set(
    name: string,
    value: string,
    options: CookieOptions = {}
  ): boolean {
    if (typeof document === "undefined") return false;

    try {
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
      )}`;

      if (options.expires) {
        if (typeof options.expires === "number") {
          const date = new Date();
          date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
          cookieString += `; expires=${date.toUTCString()}`;
        } else if (typeof options.expires === "string") {
          cookieString += `; expires=${options.expires}`;
        } else {
          cookieString += `; expires=${options.expires.toUTCString()}`;
        }
      }

      if (options.maxAge) {
        cookieString += `; max-age=${options.maxAge}`;
      }

      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }

      if (options.path) {
        cookieString += `; path=${options.path}`;
      }

      if (options.secure) {
        cookieString += "; secure";
      }

      if (options.httpOnly) {
        cookieString += "; httponly";
      }

      if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
      }

      document.cookie = cookieString;
      return true;
    } catch (error) {
      console.error("Failed to set cookie:", error);
      return false;
    }
  }

  static get(name: string): string | null {
    if (typeof document === "undefined") return null;

    try {
      const nameEQ = encodeURIComponent(name) + "=";
      const cookies = document.cookie.split(";");

      for (const cookie of cookies) {
        const c = cookie.trim();
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to get cookie:", error);
      return null;
    }
  }

  static remove(name: string, options: Partial<CookieOptions> = {}): boolean {
    return this.set(name, "", {
      ...options,
      expires: new Date(0),
    });
  }

  static getAll(): Record<string, string> {
    if (typeof document === "undefined") return {};

    try {
      const cookies: Record<string, string> = {};
      const cookiesArray = document.cookie.split(";");

      for (const cookie of cookiesArray) {
        const [name, value] = cookie.trim().split("=");
        if (name && value) {
          cookies[decodeURIComponent(name)] = decodeURIComponent(value);
        }
      }
      return cookies;
    } catch (error) {
      console.error("Failed to get all cookies:", error);
      return {};
    }
  }
}

// Local Storage utilities
export class LocalStorageUtils {
  static set<T>(key: string, value: T, ttl?: number): boolean {
    if (typeof window === "undefined") return false;

    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expires: ttl ? Date.now() + ttl : undefined,
      };
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error("Failed to set localStorage item:", error);
      return false;
    }
  }

  static get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    try {
      const itemString = localStorage.getItem(key);
      if (!itemString) return null;

      const item: StorageItem<T> = JSON.parse(itemString);

      // Check if item has expired
      if (item.expires && Date.now() > item.expires) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error("Failed to get localStorage item:", error);
      return null;
    }
  }

  static remove(key: string): boolean {
    if (typeof window === "undefined") return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Failed to remove localStorage item:", error);
      return false;
    }
  }

  static clear(): boolean {
    if (typeof window === "undefined") return false;

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
      return false;
    }
  }

  static getAll(): Record<string, unknown> {
    if (typeof window === "undefined") return {};

    try {
      const items: Record<string, unknown> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          items[key] = this.get(key);
        }
      }
      return items;
    } catch (error) {
      console.error("Failed to get all localStorage items:", error);
      return {};
    }
  }
}

// Session Storage utilities
export class SessionStorageUtils {
  static set<T>(key: string, value: T): boolean {
    if (typeof window === "undefined") return false;

    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error("Failed to set sessionStorage item:", error);
      return false;
    }
  }

  static get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    try {
      const itemString = sessionStorage.getItem(key);
      if (!itemString) return null;

      const item: StorageItem<T> = JSON.parse(itemString);
      return item.value;
    } catch (error) {
      console.error("Failed to get sessionStorage item:", error);
      return null;
    }
  }

  static remove(key: string): boolean {
    if (typeof window === "undefined") return false;

    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Failed to remove sessionStorage item:", error);
      return false;
    }
  }

  static clear(): boolean {
    if (typeof window === "undefined") return false;

    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error("Failed to clear sessionStorage:", error);
      return false;
    }
  }

  static getAll(): Record<string, unknown> {
    if (typeof window === "undefined") return {};

    try {
      const items: Record<string, unknown> = {};
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) {
          items[key] = this.get(key);
        }
      }
      return items;
    } catch (error) {
      console.error("Failed to get all sessionStorage items:", error);
      return {};
    }
  }
}
