import { Trans } from 'react-i18next'
import { CheckCircle, DollarSign, UserPlus } from 'lucide-react'
import { DASHBOARD_ACTIVITIES } from '@/features/dashboard/constants/data'
import { ACTIVITY_VARIANTS } from '@/features/dashboard/components/dashboardStyles'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

const ACTIVITY_ICONS = {
  emerald: DollarSign,
  blue: CheckCircle,
  purple: UserPlus,
} as const

export function DashboardActivityTimeline() {
  const { t } = useAppTranslation('dashboard')

  return (
    <div className="dashboard-card p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white">{t('activity.title')}</h3>
        <button type="button" className="text-kayan-erp-blue text-xs hover:underline">
          {t('activity.viewAll')}
        </button>
      </div>
      <div className="relative space-y-5 lg:space-y-6">
        <div className="absolute end-4 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-700" />
        {DASHBOARD_ACTIVITIES.map((activity) => {
          const styles = ACTIVITY_VARIANTS[activity.variant]
          const Icon = ACTIVITY_ICONS[activity.variant]

          return (
            <div
              key={activity.id}
              className={`relative flex items-center gap-4 pe-10 ${activity.dimmed ? 'opacity-50' : ''}`}
            >
              <div className={`absolute end-3 w-2 h-2 rounded-full ${styles.dot} z-10`} />
              <div className={`${styles.icon} p-2 rounded-lg shrink-0`}>
                <Icon className="w-4 h-4" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  <Trans
                    i18nKey={activity.messageKey}
                    ns="dashboard"
                    components={{ bold: <span className="font-bold" /> }}
                  />
                </p>
                <span className="text-[10px] text-slate-400">{t(activity.timeKey)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
