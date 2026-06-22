#!/usr/bin/env node
/**
 * Builds endpoint registry from openapi/swagger.json.
 * Run: npm run api:registry  (included in api:sync)
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const swaggerPath = path.join(root, 'openapi', 'swagger.json')
const outDir = path.join(root, 'src', 'api', 'registry')
const outFile = path.join(outDir, 'endpoints.ts')

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function toCamelCase(value) {
  return value
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^./, (c) => c.toLowerCase())
}

function tagToSlug(tag) {
  return tag.charAt(0).toLowerCase() + tag.slice(1).replace(/\s+/g, '')
}

function inferAction(method, apiPath) {
  const lower = apiPath.toLowerCase()
  const segments = apiPath.replace(/^\/api\/?/, '').split('/').filter(Boolean)
  const last = segments[segments.length - 1] ?? ''
  const secondLast = segments[segments.length - 2] ?? ''
  const hasParam = segments.some((s) => s.startsWith('{'))

  if (lower.includes('/login')) return 'login'
  if (lower.includes('refresh-token')) return 'refreshToken'
  if (lower.includes('/logout')) return 'logout'
  if (last === 'set-default') return 'setDefault'
  if (last === 'search') return 'search'
  if (last === 'lookup' || last === 'lookups') return 'lookup'

  const lookupsIdx = segments.findIndex((s) => s.toLowerCase() === 'lookups')
  if (lookupsIdx >= 0 && segments[lookupsIdx + 1]) {
    return toCamelCase(segments[lookupsIdx + 1])
  }

  if (['post', 'put', 'patch'].includes(method) && hasParam && !last.startsWith('{')) {
    return toCamelCase(last)
  }

  if (method === 'get') {
    if (!hasParam && segments.length > 1) {
      return `get${capitalize(toCamelCase(last))}`
    }
    if (!hasParam) return 'list'
    if (last.startsWith('{')) {
      if (/^\{id\}$/i.test(last)) return 'getById'
      if (secondLast && !secondLast.startsWith('{')) {
        const part = toCamelCase(secondLast)
        return part === 'id' ? 'getById' : `getBy${capitalize(part)}`
      }
      return 'getById'
    }
    return 'getById'
  }

  switch (method) {
    case 'post':
      return hasParam ? 'action' : 'create'
    case 'put':
    case 'patch':
      return 'update'
    case 'delete':
      return 'delete'
    default:
      return method
  }
}

function buildPathTemplate(apiPath) {
  return apiPath.startsWith('/api') ? apiPath.slice(4) || '/' : apiPath
}

function makeUniqueKey(baseKey, used) {
  if (!used.has(baseKey)) {
    used.add(baseKey)
    return baseKey
  }
  let i = 2
  while (used.has(`${baseKey}__${i}`)) i += 1
  const key = `${baseKey}__${i}`
  used.add(key)
  return key
}

async function main() {
  const raw = await readFile(swaggerPath, 'utf8')
  const spec = JSON.parse(raw)
  const usedKeys = new Set()
  const entries = []

  for (const [apiPath, methods] of Object.entries(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const operation = methods[method]
      if (!operation) continue

      const tag = operation.tags?.[0] ?? 'Api'
      const tagSlug = tagToSlug(tag)
      const action = inferAction(method, apiPath)
      const key = makeUniqueKey(`${tagSlug}.${action}`, usedKeys)
      const pathTemplate = buildPathTemplate(apiPath)
      const hasParams = apiPath.includes('{')

      entries.push({
        key,
        method: method.toUpperCase(),
        path: pathTemplate,
        tag,
        summary: operation.summary ?? operation.description ?? '',
        auth: !/login|refresh-token/i.test(apiPath),
        hasParams,
        ref: `${method.toUpperCase()} ${apiPath}`,
      })
    }
  }

  entries.sort((a, b) => a.key.localeCompare(b.key))

  const lines = entries.map((e) => {
    const summary = e.summary.replace(/'/g, "\\'").replace(/\n/g, ' ')
    return `  '${e.key}': {
    method: '${e.method}',
    path: '${e.path}',
    tag: '${e.tag}',
    summary: '${summary}',
    auth: ${e.auth},
    hasParams: ${e.hasParams},
    ref: '${e.ref}',
  },`
  })

  const content = `/**
 * AUTO-GENERATED — do not edit.
 * Regenerate: npm run api:registry
 */
import type { HttpMethod } from '@/api/registry/types'

export interface EndpointRecord {
  method: HttpMethod
  path: string
  tag: string
  summary: string
  auth: boolean
  hasParams: boolean
  ref: string
}

export const API_ENDPOINTS = {
${lines.join('\n')}
} as const satisfies Record<string, EndpointRecord>

export type ApiEndpointKey = keyof typeof API_ENDPOINTS
`

  await mkdir(outDir, { recursive: true })
  await writeFile(outFile, content, 'utf8')
  console.log(`Generated ${entries.length} endpoints → ${outFile}`)
}

main().catch((err) => {
  console.error(err.message ?? err)
  process.exit(1)
})
