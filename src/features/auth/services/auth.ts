import {
  callApi,
  clearStoredSession,
  getStoredSession,
  isApiEnabled,
  isTokenExpired,
  mapAuthToSession,
  mapUserFromProfile,
  storeSession,
} from '@/api'
import type { AuthResponseDto, UserResponseDto } from '@/api/types'
import type { StoredAuthSession } from '@/api/session'
import type { LoginCredentials, User } from '@/shared/types/user'
import { LoginError, toLoginError } from '@/features/auth/services/auth.errors'

/** Registry key — see src/api/registry/wired.ts */
export const LOGIN_ENDPOINT = 'auth.login' as const

const DEMO_USER: User = {
  id: '1',
  name: 'أحمد محمد',
  email: 'admin@kayan.sa',
  role: 'admin',
}

const DEMO_PASSWORD = '123456'

function createDemoSession(user: User, token = 'demo-kayan-token'): StoredAuthSession {
  return {
    user,
    token,
    refreshToken: token,
    tokenExpiration: new Date(Date.now() + 86_400_000).toISOString(),
    userId: Number(user.id) || 1,
  }
}

export async function login(credentials: LoginCredentials): Promise<StoredAuthSession> {
  if (isApiEnabled()) {
    return loginWithApi(credentials)
  }
  return loginWithDemo(credentials)
}

async function loginWithApi(credentials: LoginCredentials): Promise<StoredAuthSession> {
  try {
    const auth = await callApi<AuthResponseDto>(LOGIN_ENDPOINT, {
      body: {
        userName: credentials.userName.trim(),
        password: credentials.password,
      },
      auth: false,
    })

    const session = mapAuthToSession(auth)
    storeSession(session, credentials.rememberMe)
    return session
  } catch (error) {
    throw toLoginError(error)
  }
}

async function loginWithDemo(credentials: LoginCredentials): Promise<StoredAuthSession> {
  await delay(800)

  if (credentials.userName !== DEMO_USER.email || credentials.password !== DEMO_PASSWORD) {
    throw new LoginError('INVALID_CREDENTIALS')
  }

  const session = createDemoSession({ ...DEMO_USER, email: credentials.userName })
  storeSession(session, credentials.rememberMe)
  return session
}

export async function loginWithGoogle(rememberMe: boolean): Promise<StoredAuthSession> {
  if (isApiEnabled()) {
    throw new LoginError('UNKNOWN', 'GOOGLE_AUTH_NOT_SUPPORTED')
  }

  await delay(1000)

  const session = createDemoSession({
    ...DEMO_USER,
    name: 'Google User',
    email: 'user@gmail.com',
  })
  storeSession(session, rememberMe)
  return session
}

export async function getCurrentUser(): Promise<User | null> {
  const session = getStoredSession()
  if (!session) return null

  if (isApiEnabled()) {
    if (isTokenExpired(session)) {
      clearStoredSession()
      return null
    }

    try {
      const profile = await callApi<UserResponseDto>('users.getById', {
        params: { id: session.userId },
        timeoutMs: 8_000,
      })
      return mapUserFromProfile(profile)
    } catch {
      return session.user
    }
  }

  return session.user
}

export async function logout(): Promise<void> {
  if (isApiEnabled()) {
    try {
      await callApi('auth.logout')
    } catch {
      // ignore network errors on logout
    }
  }
  clearStoredSession()
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { LoginError, toLoginError }
