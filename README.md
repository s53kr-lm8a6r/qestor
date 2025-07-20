# Qestor Monorepo

A pnpm workspace monorepo containing both the frontend web application and backend API service.

## Project Structure

```
qestor/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # NestJS backend API
├── libs/             # Shared libraries
│   └── reactive_browser_storage/  # Browser storage hooks and utilities
├── pnpm-workspace.yaml
└── package.json      # Root workspace configuration
```

## Architecture

- **Frontend**: Next.js application running on port 3000
- **Backend**: NestJS API running on port 3001
- **Single Port Access**: All requests go through port 3000 with path-based routing:
  - `/` - Next.js web application
  - `/api/*` - Proxied to NestJS backend

## Development

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation
```bash
pnpm install
```

### Development Mode
Start both applications simultaneously:
```bash
pnpm run dev
```

Or run them individually:
```bash
# Web app only
pnpm run dev:web

# API only
pnpm run dev:api
```

### Production Build
```bash
pnpm run build
pnpm run start
```

## Available Scripts

- `pnpm run dev` - Start both web and API in development mode
- `pnpm run dev:web` - Start only the web application
- `pnpm run dev:api` - Start only the API
- `pnpm run build` - Build both applications for production
- `pnpm run start` - Start both applications in production mode
- `pnpm run lint` - Run linting on both applications
- `pnpm run test` - Run tests
- `pnpm run env:setup` - Copy env.example to .env for initial setup

## API Integration

The Next.js application is configured to proxy all `/api/*` requests to the NestJS backend. This allows both applications to be accessed from a single port (3000) while maintaining separation of concerns.

### Example API Call
```javascript
// This will be proxied to http://localhost:3001/api/health
const response = await fetch('/api/health');
const data = await response.json();
```

## Technology Stack

### Frontend (`apps/web`)
- Next.js 15.3.5
- React 19
- TypeScript
- Material-UI
- Emotion

### Backend (`apps/api`)
- NestJS 11
- TypeScript
- Express
- Jest for testing

## Shared Packages

### @qestor/reactive-browser-storage
A TypeScript React hooks library for browser storage management:
- **localStorage hooks** - Persistent storage with TTL support
- **sessionStorage hooks** - Session-scoped storage
- **Cookie hooks** - HTTP cookie management with options
- **Unified browser storage** - Consistent API across storage types

```tsx
import { useLocalStorage } from '@qestor/reactive-browser-storage';

function MyComponent() {
  const { value, setValue } = useLocalStorage('user-settings', { theme: 'dark' });
  // ...
}
```

## Workspace Configuration

This project uses pnpm workspaces for monorepo management. Each application in `apps/` and shared library in `libs/` is a separate package with its own dependencies and build configuration.

Dependencies are automatically hoisted to the root `node_modules` when possible, reducing disk space and improving install times. Shared libraries use `workspace:*` protocol for internal dependencies.
