import {
  AlertTriangle,
  Clock,
  FileText,
  Package,
  RefreshCw,
  TrendingDown,
} from 'lucide-react'
import { DASHBOARD_DECISIONS } from '@/features/dashboard/constants/data'
import { DECISION_VARIANTS } from '@/features/dashboard/components/dashboardStyles'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

const DECISION_ICONS = {
  zatca: AlertTriangle,
  unposted: FileText,
  sync: RefreshCw,
  negativeStock: TrendingDown,
  lowStock: Package,
  pendingApproval: Clock,
} as const

export function DashboardDecisionCenter() {
  const { t } = useAppTranslation('dashboard')

  return (
    <div className="dashboard-card p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white">{t('decisions.title')}</h3>
        <button type="button" className="text-kayan-erp-blue text-xs hover:underline">
          {t('decisions.viewAll')}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {DASHBOARD_DECISIONS.map((item) => {
          const styles = DECISION_VARIANTS[item.variant]
          const Icon = DECISION_ICONS[item.id as keyof typeof DECISION_ICONS] ?? AlertTriangle

          return (
            <div
              key={item.id}
              className={`p-3 lg:p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center gap-2 transition-colors group ${styles.hover}`}
            >
              <div className={`p-2 rounded-lg ${styles.icon} ${styles.iconHover}`}>
                <Icon className="w-5 h-5" aria-hidden />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{item.count}</span>
              <p className="text-[10px] text-slate-500 text-center leading-tight">{t(item.labelKey)}</p>
              <button
                type="button"
                className={`text-[10px] px-3 py-1 rounded w-full mt-1 ${
                  item.primaryAction
                    ? 'bg-kayan-erp-blue text-white hover:bg-blue-700'
                    : 'border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {t(item.actionKey)}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
