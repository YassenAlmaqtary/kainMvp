import { ChevronLeft, ChevronRight, Hexagon, LogOut, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { DASHBOARD_NAV_ITEMS } from '@/features/dashboard/constants/navigation'
import { useDashboardLayout } from '@/features/dashboard/context/DashboardLayoutContext'
import { useLogout } from '@/shared/hooks/useLogout'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

export function DashboardSidebar() {
  const { t } = useAppTranslation('dashboard')
  const { t: tLayout } = useAppTranslation('layout')
  const { signOut } = useLogout()
  const { sidebarCollapsed, mobileSidebarOpen, toggleSidebar, setMobileSidebarOpen } = useDashboardLayout()

  const widthClass = sidebarCollapsed ? 'dashboard-sidebar--collapsed' : 'dashboard-sidebar'

  return (
    <>
      {mobileSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label={t('nav.collapse')}
          onClick={() => setMobileSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`dashboard-sidebar ${widthClass} text-white flex flex-col fixed inset-y-0 start-0 z-50 transition-all duration-200 max-lg:transition-transform ${
          mobileSidebarOpen
            ? 'max-lg:translate-x-0'
            : 'max-lg:-translate-x-full rtl:max-lg:translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 lg:p-6 flex items-center gap-3">
          <div className="bg-white p-1 rounded shrink-0">
            <Hexagon className="w-7 h-7 lg:w-8 lg:h-8 text-kayan-erp-dark" aria-hidden />
          </div>
          {!sidebarCollapsed ? (
            <div className="min-w-0">
              <h1 className="font-bold text-lg leading-none truncate">{t('brand.title')}</h1>
              <span className="text-[10px] opacity-70 tracking-widest uppercase">{t('brand.subtitle')}</span>
            </div>
          ) : null}
          <button
            type="button"
            className="ms-auto lg:hidden p-1 text-slate-400 hover:text-white"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label={t('nav.collapse')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 lg:px-4 space-y-1 mt-2 overflow-y-auto dashboard-custom-scrollbar">
          {DASHBOARD_NAV_ITEMS.map(({ id, labelKey, icon: Icon, to, badge }) => {
            const content = (
              <>
                <Icon className="w-5 h-5 shrink-0" aria-hidden />
                {!sidebarCollapsed ? <span className="truncate">{t(labelKey)}</span> : null}
                {!sidebarCollapsed && badge ? (
                  <span className="ms-auto bg-kayan-erp-blue text-[10px] px-2 py-0.5 rounded-full text-white">
                    {badge}
                  </span>
                ) : null}
              </>
            )

            const className = ({ isActive }: { isActive: boolean }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'dashboard-nav-active'
                  : 'text-slate-300 hover:bg-white/10'
              } ${sidebarCollapsed ? 'justify-center' : ''}`

            if (to) {
              return (
                <NavLink
                  key={id}
                  to={to}
                  className={className}
                  onClick={() => setMobileSidebarOpen(false)}
                  end={to === '/dashboard'}
                >
                  {content}
                </NavLink>
              )
            }

            return (
              <button
                key={id}
                type="button"
                className={`w-full ${className({ isActive: false })}`}
                disabled
                title={t(labelKey)}
              >
                {content}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-300 hover:bg-red-500/20 hover:text-white transition-colors text-sm"
            title={tLayout('nav.logout')}
          >
            <LogOut className="w-5 h-5 shrink-0" aria-hidden />
            {!sidebarCollapsed ? <span>{tLayout('nav.logout')}</span> : null}
          </button>
          <button
            type="button"
            onClick={toggleSidebar}
            className="w-full flex items-center justify-between text-slate-400 hover:text-white transition-colors text-sm hidden lg:flex"
          >
            {!sidebarCollapsed ? <span>{t('nav.collapse')}</span> : null}
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 mx-auto rtl:rotate-180" aria-hidden />
            ) : (
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" aria-hidden />
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
