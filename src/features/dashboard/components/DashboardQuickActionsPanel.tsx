import { Calendar, Gift, ShoppingCart, UserPlus, Users, Wallet } from 'lucide-react'
import { DASHBOARD_QUICK_ACTIONS } from '@/features/dashboard/constants/data'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

const QUICK_ACTION_ICONS = {
  userPlus: UserPlus,
  users: Users,
  calendar: Calendar,
  cart: ShoppingCart,
  gift: Gift,
  wallet: Wallet,
} as const

export function DashboardQuickActionsPanel() {
  const { t } = useAppTranslation('dashboard')

  return (
    <div className="dashboard-card p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white">{t('quickActions.title')}</h3>
        <button type="button" className="text-kayan-erp-blue text-xs hover:underline">
          {t('quickActions.customize')}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {DASHBOARD_QUICK_ACTIONS.map((action) => {
          const Icon = QUICK_ACTION_ICONS[action.icon]
          return (
            <button
              key={action.id}
              type="button"
              className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-start group"
            >
              <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg group-hover:bg-kayan-erp-blue group-hover:text-white transition-colors shrink-0">
                <Icon className="w-5 h-5" aria-hidden />
              </div>
              <span className="text-sm text-slate-800 dark:text-slate-200">{t(action.labelKey)}</span>
            </button>
          )
        })}
      </div>
      <button
        type="button"
        className="w-full mt-4 lg:mt-6 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors"
      >
        {t('quickActions.viewAll')}
      </button>
    </div>
  )
}
