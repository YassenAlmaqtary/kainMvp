import { AlertCircle, RefreshCw } from 'lucide-react'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

interface CustomersErrorBannerProps {
  message?: string
  onRetry?: () => void
}

export function CustomersErrorBanner({ message, onRetry }: CustomersErrorBannerProps) {
  const { t } = useAppTranslation('crm')

  return (
    <div className="dashboard-card p-4 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-start gap-3 flex-1">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-red-800 dark:text-red-300">{t('errors.loadFailed')}</p>
          <p className="text-sm text-red-600/80 dark:text-red-400/80">{message ?? t('errors.tryAgain')}</p>
        </div>
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          {t('errors.retry')}
        </button>
      ) : null}
    </div>
  )
}
