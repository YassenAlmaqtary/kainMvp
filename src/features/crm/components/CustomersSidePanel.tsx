import type { CustomerDistributionSlice, CustomerRiskItem } from '@/features/crm/types'
import { CRM_RISK_VARIANTS } from '@/features/crm/components/crmStyles'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

function DistributionChart({ slices }: { slices: CustomerDistributionSlice[] }) {
  const { t } = useAppTranslation('crm')
  const gradient = slices.map((slice, i) => {
    const start = slices.slice(0, i).reduce((sum, s) => sum + s.value, 0)
    const end = start + slice.value
    return `${slice.color} ${start}% ${end}%`
  }).join(', ')

  return (
    <div className="dashboard-card p-4">
      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">{t('distribution.title')}</h4>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-32 h-32 rounded-full relative"
          style={{ background: slices.length ? `conic-gradient(${gradient})` : '#e2e8f0' }}
          role="img"
          aria-label={t('distribution.title')}
        >
          <div className="absolute inset-4 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-slate-900 dark:text-white">100%</span>
          </div>
        </div>
        <ul className="w-full space-y-2">
          {slices.map((slice) => (
            <li key={slice.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                <span className="text-slate-600 dark:text-slate-400">{t(slice.labelKey)}</span>
              </div>
              <span className="font-medium text-slate-900 dark:text-white">{slice.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

interface CustomersSidePanelProps {
  risks: CustomerRiskItem[]
  distribution: CustomerDistributionSlice[]
}

export function CustomersSidePanel({ risks, distribution }: CustomersSidePanelProps) {
  const { t } = useAppTranslation('crm')

  return (
    <div className="space-y-4 xl:col-span-3 xl:order-1 ltr:xl:order-3">
      <div className="dashboard-card p-4">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">{t('alerts.title')}</h4>
        <ul className="space-y-2">
          {risks.map((risk) => {
            const styles = CRM_RISK_VARIANTS[risk.variant]
            return (
              <li
                key={risk.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${styles.icon.split(' ')[0]}`} />
                  <span className="text-xs text-slate-600 dark:text-slate-400 truncate">{t(risk.labelKey)}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white shrink-0 ms-2">
                  {risk.count}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      <DistributionChart slices={distribution} />
    </div>
  )
}
