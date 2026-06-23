import { BranchSelector } from '@/shared/components/BranchSelector'
import { Link } from 'react-router-dom'
import { Globe, LayoutDashboard, Menu, Moon, Sun, UserCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAppTranslation, useLanguage } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/context/AuthContext'
import { useTheme } from '@/shared/hooks/useTheme'
import { SUPPORTED_LANGUAGES, setLanguage, type SupportedLanguage } from '@/shared/i18n'
import { POS_LOGO_URL } from '@/features/pos/constants/data'

function useClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return now
}

function PosHeaderMenu() {
  const { t: tLayout } = useAppTranslation('layout')
  const { t: tPos } = useAppTranslation('pos')
  const { t: tCommon } = useAppTranslation('common')
  const { theme, toggleTheme } = useTheme()
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-1 hover:bg-slate-700 rounded text-white"
        aria-label={tPos('header.menu')}
      >
        <Menu className="w-5 h-5" />
      </button>
      {open ? (
        <ul className="absolute end-0 top-full mt-1 min-w-[180px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-50 text-slate-800 dark:text-slate-200">
          <li>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <LayoutDashboard className="w-4 h-4" />
              {tLayout('nav.dashboard')}
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {theme === 'light' ? tCommon('theme.enableDark') : tCommon('theme.enableLight')}
            </button>
          </li>
          {SUPPORTED_LANGUAGES.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => {
                  setLanguage(code as SupportedLanguage)
                  setOpen(false)
                }}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                  language === code ? 'text-pos-blue font-semibold' : ''
                }`}
              >
                <Globe className="w-4 h-4" />
                {tCommon(`languages.${code}`)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function PosHeader() {
  const { t, i18n } = useAppTranslation('pos')
  const { user } = useAuth()
  const now = useClock()

  const time = now.toLocaleTimeString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const date = now.toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="pos-header bg-pos-navy text-white h-12 lg:h-16 flex items-center px-3 lg:px-4 shrink-0 shadow-md z-20">
      <div className="flex items-center gap-2 lg:gap-4 shrink-0">
        <img alt="KAYAN" className="h-8 lg:h-10 object-contain brightness-0 invert" src={POS_LOGO_URL} />
      </div>

      <div className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-6 text-xs overflow-x-auto pos-hide-scrollbar px-2 min-w-0">
        <div className="text-center px-4 border-s pos-header-divider shrink-0">
          <p className="pos-header-meta-label">{t('header.company')}</p>
          <p className="pos-header-meta-value">{t('header.companyValue')}</p>
        </div>
        <div className="text-center px-4 border-s pos-header-divider shrink-0">
          <BranchSelector variant="pos" />
        </div>
        <div className="text-center px-4 border-s pos-header-divider shrink-0">
          <p className="pos-header-meta-label">{t('header.device')}</p>
          <p className="pos-header-meta-value">{t('header.deviceValue')}</p>
        </div>
        <div className="text-center px-4 flex items-center gap-2 shrink-0">
          <div>
            <p className="pos-header-meta-label">{t('header.user')}</p>
            <p className="pos-header-meta-value">{user?.name ?? t('header.userValue')}</p>
          </div>
          <UserCircle className="w-8 h-8 opacity-70 shrink-0" aria-hidden />
        </div>
        <div className="text-center px-4 border-e pos-header-divider shrink-0">
          <p className="pos-header-meta-label">{t('header.batch')}</p>
          <p className="pos-header-meta-value">{t('header.batchValue')}</p>
        </div>
      </div>

      <div className="flex-1 md:flex-none flex items-center justify-end gap-2 lg:gap-4 shrink-0 ms-auto">
        <div className="text-end border-s pos-header-divider ps-2 lg:ps-4 lg:me-4">
          <div className="pos-header-time text-sm lg:text-lg font-bold leading-tight">{time}</div>
          <div className="pos-header-date text-[9px] lg:text-[10px] hidden sm:block">{date}</div>
        </div>
        <PosHeaderMenu />
      </div>
    </header>
  )
}
