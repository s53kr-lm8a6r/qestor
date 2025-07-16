# 🍪 Reactive Browser Storage

A comprehensive, type-safe React hooks library for managing cookies, localStorage, and sessionStorage with automatic synchronization and reactive state management.

## ✨ Features

- 🔄 **Reactive State Management** - Changes automatically sync across components
- 🌐 **Cross-tab Synchronization** - Storage changes sync between browser tabs
- 🛡️ **Type Safety** - Full TypeScript support with generic types
- ⚡ **SSR Compatible** - Works with Next.js server-side rendering
- ⏰ **TTL Support** - localStorage items can have expiration times
- 🔧 **Error Handling** - Graceful fallbacks when storage is unavailable
- 📊 **Loading States** - Track when data is being loaded
- 🔄 **Data Migration** - Move data between storage types
- 🍪 **Advanced Cookie Options** - Full control over cookie settings
- 🚀 **Auto-loading** - Loads existing data from storage on startup

## 📦 Installation

The library is already included in your project. Simply import from:

```typescript
import { useCookies, useLocalStorage, useBrowserStorage } from '@/lib/reactive_browser_storage';
```

## 🚀 Quick Start

### Basic Cookie Management

```tsx
import { useCookies } from '@/lib/reactive_browser_storage';

function LoginComponent() {
  const { cookies, setCookie, removeCookie, getCookie } = useCookies();

  const handleLogin = () => {
    setCookie('user', 'john_doe', {
      expires: 7, // 7 days
      secure: true,
      sameSite: 'strict',
    });
  };

  const handleLogout = () => {
    removeCookie('user');
  };

  return (
    <div>
      <p>Current user: {getCookie('user') || 'Not logged in'}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

### Type-safe localStorage

```tsx
import { useLocalStorage } from '@/lib/reactive_browser_storage';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

function SettingsComponent() {
  const userPrefs = useLocalStorage<UserPreferences>('userPreferences', {
    theme: 'light',
    language: 'en',
    notifications: true,
  });

  const toggleTheme = () => {
    if (userPrefs.value) {
      userPrefs.setValue({
        ...userPrefs.value,
        theme: userPrefs.value.theme === 'light' ? 'dark' : 'light',
      });
    }
  };

  if (userPrefs.isLoading) {
    return <div>Loading preferences...</div>;
  }

  return (
    <div>
      <p>Current theme: {userPrefs.value?.theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Unified Storage Management

```tsx
import { useBrowserStorage } from '@/lib/reactive_browser_storage';

function DataManager() {
  const storage = useBrowserStorage();

  const saveUserData = () => {
    const userData = {
      id: '123',
      name: 'John Doe',
      preferences: { theme: 'dark' },
    };

    // Save to different storage types
    storage.setItem('userId', userData.id, 'cookie', { expires: 30 });
    storage.setItem('userData', userData, 'localStorage');
    storage.setItem('sessionData', { timestamp: Date.now() }, 'sessionStorage');
  };

  const migrateData = () => {
    // Migrate specific keys from localStorage to sessionStorage
    storage.migrateData('localStorage', 'sessionStorage', ['userData']);
  };

  return (
    <div>
      <button onClick={saveUserData}>Save User Data</button>
      <button onClick={migrateData}>Migrate Data</button>
      <p>Loading: {storage.isLoading ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## 📚 API Reference

### `useCookies(initialCookies?)`

Manages browser cookies with reactive state updates.

#### Parameters
- `initialCookies?: Record<string, string>` - Initial cookie values

#### Returns
```typescript
interface UseCookiesReturn {
  cookies: Record<string, string>;
  getCookie: (name: string) => string | null;
  setCookie: (name: string, value: string, options?: CookieOptions) => void;
  removeCookie: (name: string, options?: Partial<CookieOptions>) => void;
  clearCookies: () => void;
}
```

#### Cookie Options
```typescript
interface CookieOptions {
  expires?: Date | string | number; // Days or specific date
  maxAge?: number;                  // Seconds
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}
```

### `useLocalStorage<T>(key, defaultValue?, ttl?)`

Manages a single localStorage item with optional TTL.

#### Parameters
- `key: string` - Storage key
- `defaultValue?: T` - Default value if none exists
- `ttl?: number` - Time to live in milliseconds

#### Returns
```typescript
interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T, ttl?: number) => void;
  removeValue: () => void;
  isLoading: boolean;
}
```

### `useLocalStorageObject()`

Manages all localStorage items as a single object.

#### Returns
```typescript
interface UseLocalStorageObjectReturn {
  data: Record<string, unknown>;
  getValue: <T>(key: string) => T | null;
  setValue: <T>(key: string, value: T, ttl?: number) => void;
  removeValue: (key: string) => void;
  clear: () => void;
  isLoading: boolean;
}
```

### `useSessionStorage<T>(key, defaultValue?)`

Manages a single sessionStorage item.

#### Parameters
- `key: string` - Storage key
- `defaultValue?: T` - Default value if none exists

#### Returns
```typescript
interface UseSessionStorageReturn<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
  isLoading: boolean;
}
```

### `useBrowserStorage(initialCookies?)`

Unified interface for managing all storage types.

#### Returns
```typescript
interface UseBrowserStorageReturn {
  // Individual storage hooks
  cookies: UseCookiesReturn;
  localStorage: UseLocalStorageObjectReturn;
  sessionStorage: UseSessionStorageObjectReturn;

  // Factory functions
  useLocalStorageItem: <T>(key: string, defaultValue?: T, ttl?: number) => UseLocalStorageReturn<T>;
  useSessionStorageItem: <T>(key: string, defaultValue?: T) => UseSessionStorageReturn<T>;

  // Unified methods
  getItem: <T>(key: string, storageType: StorageType) => T | string | null;
  setItem: <T>(key: string, value: T, storageType: StorageType, options?: CookieOptions | number) => void;
  removeItem: (key: string, storageType: StorageType, options?: Partial<CookieOptions>) => void;
  clearStorage: (storageType: StorageType) => void;

  // Cross-storage utilities
  migrateData: (fromStorage: StorageType, toStorage: StorageType, keys?: string[]) => void;
  syncData: (key: string, fromStorage: StorageType, toStorage: StorageType) => void;

  // Global state
  isLoading: boolean;
}
```

### `useStorageItem<T>(key, storageType, defaultValue?, options?)`

Convenience hook for managing a single storage item.

#### Parameters
- `key: string` - Storage key
- `storageType: 'cookie' | 'localStorage' | 'sessionStorage'` - Storage type
- `defaultValue?: T` - Default value
- `options?: CookieOptions | number` - Cookie options or localStorage TTL

## 🎯 Advanced Usage Examples

### Shopping Cart with Persistence

```tsx
import { useLocalStorage, useSessionStorage } from '@/lib/reactive_browser_storage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function ShoppingCart() {
  // Persistent cart that survives browser restarts
  const cart = useLocalStorage<CartItem[]>('cart', []);

  // Temporary checkout form data
  const checkoutForm = useSessionStorage<{
    email: string;
    address: string;
  }>('checkoutForm', { email: '', address: '' });

  const addToCart = (item: CartItem) => {
    if (cart.value) {
      const existingItem = cart.value.find(i => i.id === item.id);
      if (existingItem) {
        cart.setValue(
          cart.value.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        );
      } else {
        cart.setValue([...cart.value, item]);
      }
    }
  };

  const updateCheckoutForm = (field: keyof typeof checkoutForm.value, value: string) => {
    if (checkoutForm.value) {
      checkoutForm.setValue({
        ...checkoutForm.value,
        [field]: value,
      });
    }
  };

  const checkout = () => {
    // Process order...
    cart.removeValue(); // Clear cart after successful order
    checkoutForm.removeValue(); // Clear form data
  };

  if (cart.isLoading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div>
      <h3>Cart ({cart.value?.length || 0} items)</h3>
      {cart.value?.map(item => (
        <div key={item.id}>
          {item.name} - ${item.price} x {item.quantity}
        </div>
      ))}

      <div>
        <input
          placeholder="Email"
          value={checkoutForm.value?.email || ''}
          onChange={(e) => updateCheckoutForm('email', e.target.value)}
        />
        <input
          placeholder="Address"
          value={checkoutForm.value?.address || ''}
          onChange={(e) => updateCheckoutForm('address', e.target.value)}
        />
        <button onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
}
```

### User Authentication System

```tsx
import { useCookies, useLocalStorage } from '@/lib/reactive_browser_storage';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function useAuth() {
  // Store auth token in httpOnly cookie (if set server-side)
  const { getCookie, setCookie, removeCookie } = useCookies();

  // Store user data in localStorage
  const userData = useLocalStorage<User>('user');

  // Store session preferences
  const sessionPrefs = useLocalStorage<{
    rememberMe: boolean;
    lastLogin: number;
  }>('sessionPrefs');

  const login = async (email: string, password: string, rememberMe: boolean) => {
    // Authenticate...
    const user = await authenticate(email, password);
    const token = await getToken();

    // Set secure cookie for token
    setCookie('auth_token', token, {
      secure: true,
      sameSite: 'strict',
      expires: rememberMe ? 30 : undefined, // 30 days if remember me
    });

    // Store user data
    userData.setValue(user);

    // Update session preferences
    sessionPrefs.setValue({
      rememberMe,
      lastLogin: Date.now(),
    });
  };

  const logout = () => {
    removeCookie('auth_token');
    userData.removeValue();
  };

  const isAuthenticated = !!getCookie('auth_token') && !!userData.value;

  return {
    user: userData.value,
    isAuthenticated,
    isLoading: userData.isLoading,
    login,
    logout,
  };
}

// Implement the authenticate and getToken functions
async function authenticate(email: string, password: string): Promise<User> {
  // Your authentication logic here
  throw new Error('Not implemented');
}

async function getToken(): Promise<string> {
  // Your token retrieval logic here
  throw new Error('Not implemented');
}
```

### Data Migration and Synchronization

```tsx
import { useBrowserStorage } from '@/lib/reactive_browser_storage';

function DataMigrationExample() {
  const storage = useBrowserStorage();

  const migrateOldData = () => {
    // Migrate old localStorage structure to new format
    const oldUserData = storage.getItem('oldUser', 'localStorage');
    if (oldUserData) {
      // Transform and save to new structure
      const newUserData = transformUserData(oldUserData);
      storage.setItem('user', newUserData, 'localStorage');
      storage.removeItem('oldUser', 'localStorage');
    }
  };

  const syncAcrossStorageTypes = () => {
    // Keep critical data in multiple storage types
    const userData = storage.getItem('user', 'localStorage');
    if (userData) {
      // Backup to sessionStorage
      storage.setItem('userBackup', userData, 'sessionStorage');

      // Store user ID in cookie for server access
      storage.setItem('userId', (userData as any).id, 'cookie', {
        secure: true,
        sameSite: 'strict',
      });
    }
  };

  const cleanupExpiredData = () => {
    // Remove old session data
    const sessionKeys = Object.keys(storage.sessionStorage.data);
    sessionKeys.forEach(key => {
      if (key.startsWith('temp_')) {
        storage.removeItem(key, 'sessionStorage');
      }
    });
  };

  return (
    <div>
      <button onClick={migrateOldData}>Migrate Old Data</button>
      <button onClick={syncAcrossStorageTypes}>Sync Data</button>
      <button onClick={cleanupExpiredData}>Cleanup</button>
    </div>
  );
}

function transformUserData(oldData: unknown): unknown {
  // Your data transformation logic
  return oldData;
}
```

### Cache Management with TTL

```tsx
import { useLocalStorage } from '@/lib/reactive_browser_storage';

function useCachedData<T>(key: string, fetcher: () => Promise<T>, ttl: number = 300000) {
  const cachedData = useLocalStorage<T>(key, undefined, ttl);

  const refreshData = async () => {
    try {
      const freshData = await fetcher();
      cachedData.setValue(freshData, ttl);
      return freshData;
    } catch (error) {
      console.error('Failed to refresh data:', error);
      return cachedData.value;
    }
  };

  // Auto-refresh if no cached data
  React.useEffect(() => {
    if (!cachedData.value && !cachedData.isLoading) {
      refreshData();
    }
  }, [cachedData.value, cachedData.isLoading]);

  return {
    data: cachedData.value,
    isLoading: cachedData.isLoading,
    refresh: refreshData,
    clear: cachedData.removeValue,
  };
}

// Usage
function ProductList() {
  const { data: products, isLoading, refresh } = useCachedData(
    'products',
    () => fetch('/api/products').then(r => r.json()),
    600000 // 10 minutes cache
  );

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div>
      <button onClick={refresh}>Refresh</button>
      {products?.map((product: any) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## 🛡️ Type Safety Examples

### Strict Type Definitions

```tsx
// Define your data types
interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'es' | 'fr' | 'de';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    analytics: boolean;
    cookies: boolean;
  };
}

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  preferences: AppSettings;
}

// Use with full type safety
function TypeSafeExample() {
  const userProfile = useLocalStorage<UserProfile>('userProfile');
  const appSettings = useLocalStorage<AppSettings>('appSettings', {
    theme: 'auto',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      analytics: false,
      cookies: true,
    },
  });

  const updateTheme = (theme: AppSettings['theme']) => {
    if (appSettings.value) {
      appSettings.setValue({
        ...appSettings.value,
        theme,
      });
    }
  };

  // TypeScript will enforce correct types
  return (
    <div>
      <select
        value={appSettings.value?.theme}
        onChange={(e) => updateTheme(e.target.value as AppSettings['theme'])}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto</option>
      </select>
    </div>
  );
}
```

## ⚡ Performance Tips

1. **Use specific hooks when possible**: If you only need localStorage, use `useLocalStorage` instead of `useBrowserStorage`
2. **Minimize re-renders**: Use `useCallback` and `useMemo` when passing storage values to child components
3. **Batch updates**: When updating multiple related values, do it in a single operation when possible
4. **Set appropriate TTL**: Use TTL for cache data to prevent storage bloat
5. **Clean up on unmount**: Clear temporary data when components unmount

## 🔧 Troubleshooting

### Common Issues

**Storage not persisting**: Check if your browser has storage disabled or if you're in incognito mode.

**SSR hydration errors**: Make sure to handle loading states properly and check for `typeof window !== 'undefined'`.

**Cross-tab sync not working**: Ensure you're using the same storage keys across tabs and that the storage events are properly set up.

**Cookie not being set**: Verify that you're not trying to set cookies during SSR, and check your cookie options (secure, sameSite, etc.).

## 🤝 Contributing

This is an internal library. For improvements or bug fixes, please follow the project's contribution guidelines.

## 📄 License

Internal use only.
