import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { stitch } from '@google/stitch-sdk'

const PROJECT_ID = process.env.STITCH_PROJECT_ID ?? '11176325023286957467'
const OUT_DIR = join(process.cwd(), 'stitch-assets')

function loadApiKey() {
  if (process.env.STITCH_API_KEY) return process.env.STITCH_API_KEY
  const mcpPath = join(homedir(), '.cursor', 'mcp.json')
  const mcp = JSON.parse(readFileSync(mcpPath, 'utf8'))
  const key = mcp?.mcpServers?.stitch?.headers?.['X-Goog-Api-Key']
  if (!key) throw new Error('STITCH_API_KEY not found')
  return key
}

function slugify(title) {
  return title
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 40) || 'screen'
}

async function download(url, filePath) {
  if (!url) return false
  const res = await fetch(url)
  if (!res.ok) return false
  writeFileSync(filePath, Buffer.from(await res.arrayBuffer()))
  return true
}

async function main() {
  process.env.STITCH_API_KEY = loadApiKey()
  mkdirSync(OUT_DIR, { recursive: true })

  const project = stitch.project(PROJECT_ID)
  const screens = await project.screens()

  console.log(`Found ${screens.length} screen(s) in project ${PROJECT_ID}`)

  const manifest = []

  for (const screen of screens) {
    const screenId = screen.id || screen.screenId
    const title = screen.data?.title || screen.title || screenId
    const slug = slugify(title)
    const dir = join(OUT_DIR, slug)
    mkdirSync(dir, { recursive: true })

    const fullScreen = await project.getScreen(screenId)
    const htmlUrl = await fullScreen.getHtml()
    const imageUrl = await fullScreen.getImage()

    let hasHtml = false
    if (htmlUrl) {
      const htmlRes = await fetch(htmlUrl)
      if (htmlRes.ok) {
        writeFileSync(join(dir, 'index.html'), await htmlRes.text())
        hasHtml = true
      }
    }

    const hasImage = await download(imageUrl, join(dir, 'preview.png'))

    manifest.push({ screenId, title, slug, hasHtml, hasImage })
    console.log(`- ${title} → stitch-assets/${slug}/`)
  }

  writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log('Done.')
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
