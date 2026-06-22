export class ApiError extends Error {
  readonly status: number
  readonly errors: string[]
  readonly body: unknown

  constructor(message: string, status: number, errors: string[] = [], body?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
    this.body = body
  }

  static isUnauthorized(error: unknown): error is ApiError {
    return error instanceof ApiError && error.status === 401
  }

  static fromUnknown(error: unknown, fallbackMessage = 'Request failed'): ApiError {
    if (error instanceof ApiError) return error
    if (error instanceof Error) return new ApiError(error.message, 0)
    return new ApiError(fallbackMessage, 0)
  }
}
