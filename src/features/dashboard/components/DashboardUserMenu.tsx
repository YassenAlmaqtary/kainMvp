import { ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'
import { DASHBOARD_AVATAR_URL } from '@/features/dashboard/constants/data'
import { useAuth } from '@/shared/context/AuthContext'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { useLogout } from '@/shared/hooks/useLogout'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

interface DashboardUserMenuProps {
  compact?: boolean
}

export function DashboardUserMenu({ compact = false }: DashboardUserMenuProps) {
  const { t } = useAppTranslation('dashboard')
  const { t: tLayout } = useAppTranslation('layout')
  const { user } = useAuth()
  const { signOut, isLoggingOut } = useLogout()
  const [open, setOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), open)

  const handleLogout = async () => {
    await signOut()
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 lg:gap-3 ps-3 lg:ps-6 border-s border-slate-200 dark:border-slate-700 hover:opacity-90 transition-opacity"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {!compact ? (
          <div className="text-end hidden sm:block min-w-0">
            <p className="text-sm font-bold text-slate-800 dark:text-white truncate max-w-[140px]">
              {user?.name ?? '—'}
            </p>
            <p className="text-[10px] text-slate-500">{t('topBar.roleValue')}</p>
          </div>
        ) : null}
        <img
          src={DASHBOARD_AVATAR_URL}
          alt=""
          className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-slate-100 dark:border-slate-700 object-cover shrink-0"
        />
        <ChevronDown
          className={`w-4 h-4 text-slate-400 hidden sm:block transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-full mt-2 end-0 min-w-[200px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden z-50"
        >
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user?.name ?? '—'}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email ?? user?.name ?? ''}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            disabled={isLoggingOut}
            onClick={() => void handleLogout()}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-60"
          >
            <LogOut className="w-4 h-4 shrink-0" aria-hidden />
            {isLoggingOut ? t('topBar.loggingOut') : tLayout('nav.logout')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
