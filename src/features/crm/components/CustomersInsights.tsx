import { TrendingUp, UserCheck, Users } from 'lucide-react'
import { CRM_INSIGHT_VARIANTS } from '@/features/crm/components/crmStyles'
import type { CustomerInsight } from '@/features/crm/types'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

const INSIGHT_ICONS = {
  best: UserCheck,
  trend: TrendingUp,
  followUp: Users,
} as const

interface CustomersInsightsProps {
  insights: CustomerInsight[]
}

export function CustomersInsights({ insights }: CustomersInsightsProps) {
  const { t } = useAppTranslation('crm')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
      {insights.map((insight) => {
        const Icon = INSIGHT_ICONS[insight.id as keyof typeof INSIGHT_ICONS] ?? Users
        const variantClass = CRM_INSIGHT_VARIANTS[insight.variant]

        return (
          <div key={insight.id} className={`dashboard-card p-4 border ${variantClass}`}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80">
                <Icon className="w-5 h-5 text-kayan-erp-blue" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">{t(insight.titleKey)}</p>
                {insight.name ? (
                  <>
                    <p className="font-bold text-slate-900 dark:text-white truncate">{insight.name}</p>
                    <p className="text-sm text-kayan-erp-blue font-semibold mt-1">
                      {t('insights.purchaseAmount', { amount: insight.amount })}
                    </p>
                  </>
                ) : insight.messageKey ? (
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t(insight.messageKey, { value: insight.messageValue })}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
