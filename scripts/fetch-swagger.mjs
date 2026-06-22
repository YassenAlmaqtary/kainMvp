#!/usr/bin/env node
/**
 * Downloads the OpenAPI spec from the Kian ERP backend.
 * Usage: npm run api:fetch
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'openapi')
const outFile = path.join(outDir, 'swagger.json')

const swaggerUrl =
  process.env.VITE_SWAGGER_URL ?? 'http://localhost:5000/swagger/v1/swagger.json'

async function main() {
  console.log(`Fetching OpenAPI spec from ${swaggerUrl} ...`)
  const response = await fetch(swaggerUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch swagger (${response.status} ${response.statusText})`)
  }

  const spec = await response.json()
  await mkdir(outDir, { recursive: true })
  await writeFile(outFile, JSON.stringify(spec, null, 2), 'utf8')

  const pathCount = Object.keys(spec.paths ?? {}).length
  const tagCount = new Set(
    Object.values(spec.paths ?? {}).flatMap((methods) =>
      Object.values(methods).flatMap((op) => op.tags ?? []),
    ),
  ).size

  console.log(`Saved ${outFile}`)
  console.log(`  paths: ${pathCount}`)
  console.log(`  tags:  ${tagCount}`)
}

main().catch((err) => {
  console.error(err.message ?? err)
  process.exit(1)
})
