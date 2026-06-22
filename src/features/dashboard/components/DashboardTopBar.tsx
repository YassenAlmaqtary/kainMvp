import {
  Bell,
  Building2,
  ChevronDown,
  Mail,
  Menu,
  Search,
  Settings,
  Star,
} from 'lucide-react'
import { useDashboardLayout } from '@/features/dashboard/context/DashboardLayoutContext'
import { useAppTranslation, useLanguage } from '@/shared/hooks/useLanguage'
import { BranchSelector } from '@/shared/components/BranchSelector'
import { DashboardUserMenu } from '@/features/dashboard/components/DashboardUserMenu'
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher'
import { ThemeToggle } from '@/shared/components/ThemeToggle'

export function DashboardTopBar() {
  const { t } = useAppTranslation('dashboard')
  const { t: tCommon } = useAppTranslation('common')
  const { language } = useLanguage()
  const { setMobileSidebarOpen } = useDashboardLayout()

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:gap-6 min-w-0">
          <button
            type="button"
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label={t('nav.decision')}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700">
              <Building2 className="w-5 h-5 text-slate-500" aria-hidden />
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-xs text-slate-500 truncate">{t('topBar.company')}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-slate-800 dark:text-white">{t('topBar.changeCompany')}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" aria-hidden />
              </div>
            </div>
          </div>

          <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-700" />

          <div className="hidden md:block">
            <BranchSelector variant="dashboard" />
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6 shrink-0">
          <div className="hidden xl:flex items-center gap-4 border-s border-slate-200 dark:border-slate-700 ps-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">{t('topBar.fiscalYear')}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 rounded-full">
                {t('topBar.active')}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">{t('topBar.role')}</span>
              <span className="text-xs font-bold text-slate-800 dark:text-white">{t('topBar.roleValue')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">{t('topBar.language')}</span>
              <span className="text-xs font-bold text-slate-800 dark:text-white">{tCommon(`languages.${language}`)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button type="button" className="relative p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" aria-label={t('topBar.notifications')}>
              <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute -top-1 -end-1 bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                12
              </span>
            </button>
            <button type="button" className="relative p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hidden sm:block" aria-label={t('topBar.messages')}>
              <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute -top-1 -end-1 bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                5
              </span>
            </button>
            <ThemeToggle />
          </div>

          <DashboardUserMenu />
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md lg:max-w-lg">
          <Search className="absolute inset-y-0 start-3 my-auto w-4 h-4 text-slate-400 pointer-events-none" aria-hidden />
          <input
            type="search"
            className="w-full ps-10 pe-20 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-kayan-erp-blue focus:border-kayan-erp-blue outline-none"
            placeholder={t('topBar.searchPlaceholder')}
          />
          <span className="absolute inset-y-0 end-3 flex items-center text-[10px] text-slate-400 border border-slate-300 dark:border-slate-600 rounded px-1 my-2 hidden sm:flex">
            {t('topBar.searchShortcut')}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            aria-label={t('nav.settings')}
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
          >
            <Star className="w-4 h-4" aria-hidden />
            <span className="hidden sm:inline">{t('topBar.favorites')}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
