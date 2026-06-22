import { buildApiUrl } from '@/api/config'
import { ApiError } from '@/api/errors'
import { API_ENDPOINTS } from '@/api/registry/endpoints'
import { getStoredSession, updateStoredTokens } from '@/api/session'
import type { ApiResponse, AuthResponseDto, RefreshTokenRequestDto } from '@/api/types'

export interface RequestConfig extends Omit<RequestInit, 'body'> {
  /** Request body — serialized as JSON unless FormData. */
  body?: unknown
  /** Attach Bearer token (default: true). Set false for login/refresh. */
  auth?: boolean
  /** Return raw JSON without unwrapping `ApiResponse`. */
  raw?: boolean
  /** Internal: skip automatic refresh retry. */
  _retry?: boolean
  /** Abort request after N ms (default 15s). Set 0 to disable. */
  timeoutMs?: number
}

function buildHeaders(body: unknown, auth: boolean, initHeaders?: HeadersInit): Headers {
  const headers = new Headers(initHeaders)

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData
  if (body !== undefined && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (auth) {
    const session = getStoredSession()
    if (session?.token) {
      headers.set('Authorization', `Bearer ${session.token}`)
    }
  }

  return headers
}

async function parseJsonSafe(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function unwrapApiResponse<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'success' in payload) {
    const envelope = payload as ApiResponse<T>
    if (!envelope.success) {
      throw new ApiError(
        envelope.message ?? 'Request failed',
        200,
        envelope.errors ?? [],
        envelope,
      )
    }
    if (envelope.data === null || envelope.data === undefined) {
      throw new ApiError(envelope.message ?? 'Empty response data', 200, envelope.errors ?? [], envelope)
    }
    return envelope.data
  }
  return payload as T
}

async function refreshAccessToken(): Promise<boolean> {
  const session = getStoredSession()
  if (!session?.token || !session.refreshToken) return false

  const payload: RefreshTokenRequestDto = {
    token: session.token,
    refreshToken: session.refreshToken,
  }

  try {
    const response = await fetch(buildApiUrl(API_ENDPOINTS['auth.refreshToken'].path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const body = await response.json().catch(() => null)
    if (!response.ok) return false

    const envelope = body as ApiResponse<AuthResponseDto>
    if (!envelope?.success || !envelope.data?.token || !envelope.data.refreshToken || !envelope.data.tokenExpiration) {
      return false
    }

    updateStoredTokens(envelope.data.token, envelope.data.refreshToken, envelope.data.tokenExpiration)
    return true
  } catch {
    return false
  }
}

export async function apiRequest<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const { body, auth = true, raw = false, _retry = false, timeoutMs = 15_000, ...init } = config
  const url = path.startsWith('http') ? path : buildApiUrl(path)

  const controller = new AbortController()
  const parentSignal = init.signal
  if (parentSignal) {
    if (parentSignal.aborted) controller.abort()
    else parentSignal.addEventListener('abort', () => controller.abort(), { once: true })
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined
  if (timeoutMs > 0) {
    timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  }

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: buildHeaders(body, auth, init.headers),
      body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    })

    const payload = await parseJsonSafe(response)

    if (response.status === 401 && auth && !_retry) {
      const refreshed = await refreshAccessToken()
      if (refreshed) {
        return apiRequest<T>(path, { ...config, _retry: true })
      }
    }

    if (!response.ok) {
      const envelope = payload as ApiResponse<unknown> | null
      const message =
        (envelope && typeof envelope === 'object' && 'message' in envelope && envelope.message) ||
        (typeof payload === 'string' ? payload : response.statusText) ||
        'Request failed'
      const errors =
        envelope && typeof envelope === 'object' && Array.isArray(envelope.errors) ? envelope.errors : []
      throw new ApiError(String(message), response.status, errors, payload)
    }

    if (raw) return payload as T
    return unwrapApiResponse<T>(payload)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timed out', 408, ['TIMEOUT'])
    }
    throw error
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}
