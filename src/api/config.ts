/** API configuration — single source for base URL and feature flags. */

const API_PREFIX = '/api'

export function isApiEnabled(): boolean {
  if (import.meta.env.VITE_USE_API === 'false') return false
  if (import.meta.env.VITE_USE_API === 'true') return true
  return Boolean(import.meta.env.VITE_API_URL?.trim())
}

/**
 * Resolves the API origin.
 * - Production: `VITE_API_URL` (e.g. https://api.example.com)
 * - Development: empty string → Vite proxy forwards `/api` to the backend
 */
export function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL?.trim()
  if (configured) return configured.replace(/\/$/, '')
  return ''
}

export function buildApiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const withPrefix = normalized.startsWith(API_PREFIX) ? normalized : `${API_PREFIX}${normalized}`
  return `${getApiBaseUrl()}${withPrefix}`
}
