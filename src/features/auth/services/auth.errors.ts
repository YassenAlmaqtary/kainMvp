import { ApiError } from '@/api/errors'

export type LoginErrorCode = 'INVALID_CREDENTIALS' | 'AUTH_TOKEN_MISSING' | 'NETWORK_ERROR' | 'UNKNOWN'

export class LoginError extends Error {
  readonly code: LoginErrorCode

  constructor(code: LoginErrorCode, message?: string) {
    super(message ?? code)
    this.name = 'LoginError'
    this.code = code
  }
}

export function toLoginError(error: unknown): LoginError {
  if (error instanceof LoginError) return error

  if (error instanceof ApiError) {
    if (error.status === 401) {
      return new LoginError('INVALID_CREDENTIALS', error.message)
    }
    if (error.status === 0) {
      return new LoginError('NETWORK_ERROR', error.message)
    }
    return new LoginError('UNKNOWN', error.message)
  }

  if (error instanceof Error) {
    if (error.message === 'AUTH_TOKEN_MISSING') {
      return new LoginError('AUTH_TOKEN_MISSING', error.message)
    }
    if (error.message === 'INVALID_CREDENTIALS') {
      return new LoginError('INVALID_CREDENTIALS')
    }
  }

  return new LoginError('UNKNOWN')
}
