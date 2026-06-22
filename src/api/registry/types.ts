export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

export interface EndpointDef {
  method: HttpMethod
  path: string
  tag: string
  summary?: string
  auth?: boolean
  hasParams?: boolean
  /** Canonical ref e.g. GET /api/Products */
  ref: string
}

export interface CallApiOptions {
  params?: Record<string, string | number>
  query?: Record<string, string | number | boolean | undefined | null>
  body?: unknown
  auth?: boolean
  raw?: boolean
  timeoutMs?: number
}

export interface UiBinding {
  /** Page route id (matches PageKey or custom) */
  page: string
  /** React component name */
  component: string
  /** Hook or context that consumes this endpoint */
  consumer: string
  /** Optional notes for maintainers */
  notes?: string
}

export interface WiredEndpoint extends EndpointDef {
  /** Service function path e.g. auth.login */
  service?: string
  /** UI surfaces using this endpoint */
  ui: UiBinding[]
}
