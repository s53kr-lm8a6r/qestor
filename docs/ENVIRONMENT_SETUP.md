# Environment Variables Setup

This guide explains how to set up shared environment variables across the Qestor monorepo.

## Quick Setup

1. **Create environment file**:
   ```bash
   pnpm run env:setup
   ```
   This copies `env.example` to `.env` in the root directory.

2. **Install dotenv-cli** (if not already installed):
   ```bash
   pnpm add --save-dev -w dotenv-cli
   ```

3. **Edit the .env file**:
   ```bash
   # Edit the .env file with your specific values
   nano .env  # or use your preferred editor
   ```

## How It Works

### Shared .env File Location
- **Root level**: `.env` (shared across all apps)
- **App specific**: `apps/web/.env.local` (overrides for web app)
- **App specific**: `apps/api/.env.local` (overrides for API app)

### Environment Variable Loading Order
1. **System environment variables** (highest priority)
2. **App-specific `.env.local`** files
3. **Shared root `.env`** file (lowest priority)

### Available Environment Files
- `.env` - Shared configuration (committed to git)
- `.env.local` - Local overrides (gitignored)
- `.env.development` - Development-specific (gitignored)
- `.env.production` - Production-specific (committed to git)

## Configuration Details

### Next.js (Web App)
The web app loads environment variables in this order:
1. System environment variables
2. `apps/web/.env.local`
3. Root `.env` file
4. Built-in Next.js defaults

Environment variables are exposed to the browser when prefixed with `NEXT_PUBLIC_`.

### NestJS (API)
The API loads environment variables using dotenv-cli:
1. System environment variables
2. `apps/api/.env.local`
3. Root `.env` file

All environment variables are available server-side in `process.env`.

## Usage Examples

### In Next.js Components
```tsx
// Client-side (must be prefixed with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side (API routes, getServerSideProps, etc.)
const jwtSecret = process.env.JWT_SECRET;
```

### In NestJS Services
```typescript
@Injectable()
export class ConfigService {
  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'default-secret';
  }

  get databaseUrl(): string {
    return process.env.DATABASE_URL || 'postgresql://localhost:5432/qestor';
  }
}
```

## Security Best Practices

1. **Never commit sensitive data**:
   - Use `.env.local` for secrets
   - Use `.env.example` for templates

2. **Use different secrets per environment**:
   - Development: Simple secrets
   - Production: Complex, randomly generated secrets

3. **Validate environment variables**:
   ```typescript
   // In your app startup
   if (!process.env.JWT_SECRET) {
     throw new Error('JWT_SECRET is required');
   }
   ```

4. **Use a secrets management system in production**:
   - AWS Secrets Manager
   - Azure Key Vault
   - HashiCorp Vault

## Troubleshooting

### Environment variables not loading
1. Check file permissions on `.env`
2. Verify dotenv-cli is installed
3. Check for syntax errors in `.env` file
4. Ensure no spaces around `=` in `.env`

### Variables not available in browser
1. Prefix with `NEXT_PUBLIC_` for client-side access
2. Restart development server after adding variables
3. Check Next.js config for explicit env mapping

### CORS issues
1. Verify `CORS_ORIGINS` includes your frontend URL
2. Check API logs for CORS configuration
3. Ensure protocol (http/https) matches

## File Structure
```
qestor/
├── .env                     # Shared environment variables
├── .env.example            # Template for new environments
├── .env.local              # Local overrides (gitignored)
├── .env.production         # Production-specific
├── apps/
│   ├── web/
│   │   ├── .env.local      # Web app local overrides
│   │   └── next.config.ts  # Next.js env configuration
│   └── api/
│       ├── .env.local      # API local overrides
│       └── src/main.ts     # NestJS env usage
└── docs/
    └── ENVIRONMENT_SETUP.md # This documentation
```
