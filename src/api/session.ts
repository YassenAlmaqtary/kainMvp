import type { UserBranchDto } from '@/api/types'
import type { User } from '@/shared/types/user'

export const SESSION_STORAGE_KEY = 'kayan-auth'

export interface StoredAuthSession {
  user: User
  token: string
  refreshToken: string
  tokenExpiration: string
  userId: number
  roleId?: number | null
  defaultBranchId?: number | null
  branches?: UserBranchDto[]
  isSuperUser?: boolean
}

function readRaw(): string | null {
  return localStorage.getItem(SESSION_STORAGE_KEY) ?? sessionStorage.getItem(SESSION_STORAGE_KEY)
}

export function getStoredSession(): StoredAuthSession | null {
  const raw = readRaw()
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredAuthSession
  } catch {
    return null
  }
}

export function clearStoredSession(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY)
  sessionStorage.removeItem(SESSION_STORAGE_KEY)
}

export function storeSession(session: StoredAuthSession, rememberMe: boolean): void {
  clearStoredSession()
  const storage = rememberMe ? localStorage : sessionStorage
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

export function updateStoredTokens(token: string, refreshToken: string, tokenExpiration: string): void {
  const session = getStoredSession()
  if (!session) return

  const updated: StoredAuthSession = { ...session, token, refreshToken, tokenExpiration }
  const inLocal = localStorage.getItem(SESSION_STORAGE_KEY) !== null
  storeSession(updated, inLocal)
}

export function isTokenExpired(session: StoredAuthSession, skewMs = 60_000): boolean {
  const expiresAt = Date.parse(session.tokenExpiration)
  if (Number.isNaN(expiresAt)) return false
  return Date.now() >= expiresAt - skewMs
}
