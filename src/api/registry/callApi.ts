import { apiRequest } from '@/api/client'
import type { CallApiOptions, EndpointDef, HttpMethod } from '@/api/registry/types'
import { API_ENDPOINTS, type ApiEndpointKey } from '@/api/registry/endpoints'
import { WIRED_ENDPOINTS, type WiredEndpointKey } from '@/api/registry/wired'

export type EndpointKey = ApiEndpointKey | WiredEndpointKey

const REF_INDEX = new Map<string, string>()
const PATH_METHOD_INDEX = new Map<string, string>()

function indexEndpoint(key: string, def: EndpointDef) {
  REF_INDEX.set(def.ref, key)
  REF_INDEX.set(def.ref.replace('/api', ''), key)
  REF_INDEX.set(`${def.method} ${def.path}`, key)
  PATH_METHOD_INDEX.set(`${def.method}:${def.path}`, key)
}

for (const [key, def] of Object.entries(API_ENDPOINTS)) {
  indexEndpoint(key, def)
}
for (const [key, def] of Object.entries(WIRED_ENDPOINTS)) {
  indexEndpoint(key, def)
}

/** Accepts registry key, `GET /api/Products`, or `GET /Products` */
export function resolveEndpointKey(ref: string): EndpointKey {
  const trimmed = ref.trim()

  if (trimmed in API_ENDPOINTS) return trimmed as ApiEndpointKey
  if (trimmed in WIRED_ENDPOINTS) return trimmed as WiredEndpointKey

  const fromRef = REF_INDEX.get(trimmed)
  if (fromRef) return fromRef as EndpointKey

  const normalized = trimmed.startsWith('GET ') || trimmed.startsWith('POST ')
    ? trimmed
    : null
  if (normalized) {
    const hit = REF_INDEX.get(normalized) ?? REF_INDEX.get(normalized.replace('/api', ''))
    if (hit) return hit as EndpointKey
  }

  throw new Error(`Unknown API endpoint ref: "${ref}". Use a registry key or "METHOD /api/Path".`)
}

export function getEndpointDef(key: EndpointKey): EndpointDef {
  return (WIRED_ENDPOINTS[key as WiredEndpointKey] ??
    API_ENDPOINTS[key as ApiEndpointKey]) as EndpointDef
}

function applyPathParams(pathTemplate: string, params?: Record<string, string | number>): string {
  if (!params) return pathTemplate
  return Object.entries(params).reduce(
    (path, [name, value]) => path.replace(`{${name}}`, encodeURIComponent(String(value))),
    pathTemplate,
  )
}

function applyQuery(path: string, query?: CallApiOptions['query']): string {
  if (!query) return path
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue
    params.set(key, String(value))
  }
  const qs = params.toString()
  return qs ? `${path}?${qs}` : path
}

/**
 * Unified API caller — single entry point for all HTTP requests.
 *
 * @example
 * await callApi('products.list')
 * await callApi('GET /api/Products/search', { query: { q: 'rice' } })
 * await callApi('users.getById', { params: { id: 1 } })
 */
export async function callApi<T>(ref: string, options: CallApiOptions = {}): Promise<T> {
  const key = resolveEndpointKey(ref)
  const def = getEndpointDef(key)
  const pathWithParams = applyPathParams(def.path, options.params)
  const pathWithQuery = applyQuery(pathWithParams, options.query)

  return apiRequest<T>(pathWithQuery, {
    method: def.method as HttpMethod,
    body: options.body,
    auth: options.auth ?? def.auth ?? true,
    raw: options.raw,
    timeoutMs: options.timeoutMs,
  })
}

export function listEndpointsByTag(tag: string): EndpointDef[] {
  return Object.values(API_ENDPOINTS).filter((e) => e.tag === tag)
}

export function getUiBindings(ref: string) {
  const key = resolveEndpointKey(ref)
  return WIRED_ENDPOINTS[key as WiredEndpointKey]?.ui ?? []
}

export { API_ENDPOINTS, WIRED_ENDPOINTS }
