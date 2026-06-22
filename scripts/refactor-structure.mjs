#!/usr/bin/env node
/**
 * One-time project restructure: feature-based + shared layers.
 * Run: node scripts/refactor-structure.mjs
 */
import { mkdir, rename, readFile, writeFile, readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const src = path.join(root, 'src')

/** @type {Record<string, string>} old relative from src -> new relative from src */
const MOVES = {
  'contexts/AuthContext.tsx': 'shared/context/AuthContext.tsx',
  'contexts/BranchContext.tsx': 'shared/context/BranchContext.tsx',
  'contexts/ThemeContext.tsx': 'shared/context/ThemeContext.tsx',
  'contexts/DashboardLayoutContext.tsx': 'features/dashboard/context/DashboardLayoutContext.tsx',
  'contexts/PosCartContext.tsx': 'features/pos/context/PosCartContext.tsx',

  'components/auth/AuthRoutes.tsx': 'features/auth/components/RouteGuards.tsx',
  'components/login/LoginForm.tsx': 'features/auth/components/LoginForm.tsx',
  'components/login/LoginCard.tsx': 'features/auth/components/LoginCard.tsx',
  'components/marketing/DashboardPreview.tsx': 'features/auth/components/marketing/DashboardPreview.tsx',
  'components/marketing/FeatureCard.tsx': 'features/auth/components/marketing/FeatureCard.tsx',
  'components/marketing/FeatureGrid.tsx': 'features/auth/components/marketing/FeatureGrid.tsx',
  'components/marketing/HeroSection.tsx': 'features/auth/components/marketing/HeroSection.tsx',

  'components/dashboard/DashboardActivityTimeline.tsx': 'features/dashboard/components/DashboardActivityTimeline.tsx',
  'components/dashboard/DashboardDecisionCenter.tsx': 'features/dashboard/components/DashboardDecisionCenter.tsx',
  'components/dashboard/DashboardHero.tsx': 'features/dashboard/components/DashboardHero.tsx',
  'components/dashboard/DashboardMetricsGrid.tsx': 'features/dashboard/components/DashboardMetricsGrid.tsx',
  'components/dashboard/DashboardMiniStats.tsx': 'features/dashboard/components/DashboardMiniStats.tsx',
  'components/dashboard/DashboardQuickActionsPanel.tsx': 'features/dashboard/components/DashboardQuickActionsPanel.tsx',
  'components/dashboard/DashboardSidebar.tsx': 'features/dashboard/components/DashboardSidebar.tsx',
  'components/dashboard/DashboardTasksPanel.tsx': 'features/dashboard/components/DashboardTasksPanel.tsx',
  'components/dashboard/DashboardTopBar.tsx': 'features/dashboard/components/DashboardTopBar.tsx',
  'components/dashboard/DashboardUserMenu.tsx': 'features/dashboard/components/DashboardUserMenu.tsx',
  'components/dashboard/dashboardStyles.ts': 'features/dashboard/components/dashboardStyles.ts',
  'components/dashboard/index.ts': 'features/dashboard/components/index.ts',

  'components/pos/PosCategorySidebar.tsx': 'features/pos/components/PosCategorySidebar.tsx',
  'components/pos/PosFooter.tsx': 'features/pos/components/PosFooter.tsx',
  'components/pos/PosHeader.tsx': 'features/pos/components/PosHeader.tsx',
  'components/pos/PosInvoicePanel.tsx': 'features/pos/components/PosInvoicePanel.tsx',
  'components/pos/PosMainPanel.tsx': 'features/pos/components/PosMainPanel.tsx',
  'components/pos/PosProductGrid.tsx': 'features/pos/components/PosProductGrid.tsx',
  'components/pos/PosStatusBar.tsx': 'features/pos/components/PosStatusBar.tsx',

  'components/layout/BranchSelector.tsx': 'shared/components/BranchSelector.tsx',
  'components/layout/LanguageSwitcher.tsx': 'shared/components/LanguageSwitcher.tsx',
  'components/layout/LayoutToolbar.tsx': 'shared/components/LayoutToolbar.tsx',
  'components/layout/SiteFooter.tsx': 'shared/components/SiteFooter.tsx',
  'components/layout/ThemeToggle.tsx': 'shared/components/ThemeToggle.tsx',

  'components/ui/Button.tsx': 'shared/ui/Button.tsx',
  'components/ui/Checkbox.tsx': 'shared/ui/Checkbox.tsx',
  'components/ui/Input.tsx': 'shared/ui/Input.tsx',
  'components/ui/Logo.tsx': 'shared/ui/Logo.tsx',

  'layouts/AuthLayout.tsx': 'features/auth/layout/AuthLayout.tsx',
  'layouts/DashboardLayout.tsx': 'features/dashboard/layout/DashboardLayout.tsx',
  'layouts/PosLayout.tsx': 'features/pos/layout/PosLayout.tsx',
  'layouts/RootLayout.tsx': 'app/layouts/RootLayout.tsx',

  'pages/LoginPage.tsx': 'features/auth/pages/LoginPage.tsx',
  'pages/DashboardPage.tsx': 'features/dashboard/pages/DashboardPage.tsx',
  'pages/ComingSoonPage.tsx': 'features/dashboard/pages/ComingSoonPage.tsx',
  'pages/PosPage.tsx': 'features/pos/pages/PosPage.tsx',

  'services/auth.ts': 'features/auth/services/auth.ts',
  'services/auth.errors.ts': 'features/auth/services/auth.errors.ts',
  'services/products.ts': 'features/pos/services/products.ts',

  'hooks/useLanguage.ts': 'shared/hooks/useLanguage.ts',
  'hooks/usePageTitle.ts': 'shared/hooks/usePageTitle.ts',
  'hooks/useTheme.ts': 'shared/hooks/useTheme.ts',
  'hooks/usePosProducts.ts': 'features/pos/hooks/usePosProducts.ts',

  'constants/dashboard/data.ts': 'features/dashboard/constants/data.ts',
  'constants/dashboard/navigation.ts': 'features/dashboard/constants/navigation.ts',
  'constants/pos/categories.ts': 'features/pos/constants/categories.ts',
  'constants/pos/data.ts': 'features/pos/constants/data.ts',
  'constants/pos/demoProducts.ts': 'features/pos/constants/demoProducts.ts',
  'constants/features.ts': 'features/auth/constants/features.ts',

  'utils/cn.ts': 'shared/utils/cn.ts',
  'utils/format.ts': 'shared/utils/format.ts',
  'utils/validation.ts': 'shared/utils/validation.ts',

  'i18n/index.ts': 'shared/i18n/index.ts',
  'i18n/namespaces.ts': 'shared/i18n/namespaces.ts',
  'theme/initTheme.ts': 'shared/theme/initTheme.ts',

  'types/auth.ts': 'shared/types/user.ts',
  'types/pos.ts': 'features/pos/types.ts',

  'App.tsx': 'app/App.tsx',
}

const DELETE = [
  'layouts/MainLayout.tsx',
  'components/layout/MainHeader.tsx',
  'hooks/useApiQuery.ts',
  'services/index.ts',
  'types/index.ts',
]

const IMPORT_REPLACEMENTS = [
  ['@/contexts/AuthContext', '@/shared/context/AuthContext'],
  ['@/contexts/BranchContext', '@/shared/context/BranchContext'],
  ['@/contexts/ThemeContext', '@/shared/context/ThemeContext'],
  ['@/contexts/DashboardLayoutContext', '@/features/dashboard/context/DashboardLayoutContext'],
  ['@/contexts/PosCartContext', '@/features/pos/context/PosCartContext'],

  ['@/components/auth/AuthRoutes', '@/features/auth/components/RouteGuards'],
  ['@/components/login/', '@/features/auth/components/'],
  ['@/components/marketing/', '@/features/auth/components/marketing/'],
  ['@/components/dashboard/', '@/features/dashboard/components/'],
  ['@/components/pos/', '@/features/pos/components/'],
  ['@/components/layout/', '@/shared/components/'],
  ['@/components/ui/', '@/shared/ui/'],

  ['@/layouts/AuthLayout', '@/features/auth/layout/AuthLayout'],
  ['@/layouts/DashboardLayout', '@/features/dashboard/layout/DashboardLayout'],
  ['@/layouts/PosLayout', '@/features/pos/layout/PosLayout'],
  ['@/layouts/RootLayout', '@/app/layouts/RootLayout'],

  ['@/pages/LoginPage', '@/features/auth/pages/LoginPage'],
  ['@/pages/DashboardPage', '@/features/dashboard/pages/DashboardPage'],
  ['@/pages/ComingSoonPage', '@/features/dashboard/pages/ComingSoonPage'],
  ['@/pages/PosPage', '@/features/pos/pages/PosPage'],

  ['@/services/auth.errors', '@/features/auth/services/auth.errors'],
  ['@/services/auth', '@/features/auth/services/auth'],
  ['@/services/products', '@/features/pos/services/products'],

  ['@/hooks/useLanguage', '@/shared/hooks/useLanguage'],
  ['@/hooks/usePageTitle', '@/shared/hooks/usePageTitle'],
  ['@/hooks/useTheme', '@/shared/hooks/useTheme'],
  ['@/hooks/usePosProducts', '@/features/pos/hooks/usePosProducts'],

  ['@/constants/dashboard/', '@/features/dashboard/constants/'],
  ['@/constants/pos/', '@/features/pos/constants/'],
  ['@/constants/features', '@/features/auth/constants/features'],

  ['@/utils/', '@/shared/utils/'],
  ["from './i18n'", "from '@/shared/i18n'"],
  ["from './App'", "from '@/app/App'"],
  ['@/theme/initTheme', '@/shared/theme/initTheme'],

  ['@/types/auth', '@/shared/types/user'],
  ['@/types/pos', '@/features/pos/types'],
  ['@/types', '@/features/auth/types'],
]

async function ensureDir(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true })
}

async function moveFile(fromRel, toRel) {
  const from = path.join(src, fromRel)
  const to = path.join(src, toRel)
  try {
    await stat(from)
  } catch {
    console.warn(`Skip (missing): ${fromRel}`)
    return
  }
  await ensureDir(to)
  await rename(from, to)
  console.log(`Moved: ${fromRel} → ${toRel}`)
}

async function walkDir(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'api' || entry.name === 'generated' || entry.name === 'locales') continue
      await walkDir(full, files)
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function updateImports() {
  const files = await walkDir(src)
  files.push(path.join(src, 'main.tsx'), path.join(src, 'index.css'))

  for (const file of files) {
    let content
    try {
      content = await readFile(file, 'utf8')
    } catch {
      continue
    }
    let updated = content
    for (const [from, to] of IMPORT_REPLACEMENTS) {
      updated = updated.split(from).join(to)
    }
    if (updated !== content) {
      await writeFile(file, updated, 'utf8')
    }
  }
}

async function moveLocales() {
  const from = path.join(src, 'i18n', 'locales')
  const to = path.join(src, 'shared', 'i18n', 'locales')
  try {
    await stat(from)
    await ensureDir(to)
    await rename(from, to)
    console.log('Moved: i18n/locales → shared/i18n/locales')
  } catch {
    console.warn('Locales already moved or missing')
  }
}

async function deleteFiles() {
  for (const rel of DELETE) {
    const full = path.join(src, rel)
    try {
      await unlink(full)
      console.log(`Deleted: ${rel}`)
    } catch {
      /* already gone */
    }
  }
}

async function main() {
  for (const [from, to] of Object.entries(MOVES)) {
    await moveFile(from, to)
  }
  await moveLocales()
  await deleteFiles()
  await updateImports()
  console.log('\nDone. Run npm run build to verify.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
