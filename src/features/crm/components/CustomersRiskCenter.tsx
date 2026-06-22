import { AlertTriangle } from 'lucide-react'
import { CRM_RISK_VARIANTS } from '@/features/crm/components/crmStyles'
import type { CustomerRiskItem } from '@/features/crm/types'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

interface CustomersRiskCenterProps {
  risks: CustomerRiskItem[]
}

export function CustomersRiskCenter({ risks }: CustomersRiskCenterProps) {
  const { t } = useAppTranslation('crm')

  return (
    <div className="dashboard-card p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-900 dark:text-white">{t('risks.title')}</h3>
        <button type="button" className="text-kayan-erp-blue text-xs hover:underline">
          {t('risks.viewAll')}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {risks.map((item) => {
          const styles = CRM_RISK_VARIANTS[item.variant]

          return (
            <div
              key={item.id}
              className={`p-3 lg:p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col gap-2 transition-colors ${styles.hover}`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-lg ${styles.icon}`}>
                  <AlertTriangle className="w-4 h-4" aria-hidden />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">{item.count}</span>
              </div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{t(item.labelKey)}</p>
              <p className="text-[10px] text-slate-500 leading-tight">{t(item.descriptionKey)}</p>
              <button
                type="button"
                className="text-[10px] text-kayan-erp-blue hover:underline text-start mt-auto"
              >
                {t('risks.viewDetails')}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
