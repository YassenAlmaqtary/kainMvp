import {
  ChevronDown,
  Download,
  MoreHorizontal,
  Plus,
  Upload,
} from 'lucide-react'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

interface CustomersPageHeaderProps {
  onNew: () => void
  onExport: () => void
}

export function CustomersPageHeader({ onNew, onExport }: CustomersPageHeaderProps) {
  const { t } = useAppTranslation('crm')

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <nav className="text-xs text-slate-500 mb-1" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>{t('breadcrumb.home')}</li>
            <li aria-hidden>/</li>
            <li className="text-kayan-erp-blue font-medium">{t('breadcrumb.current')}</li>
          </ol>
        </nav>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
          {t('title')}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-kayan-erp-blue text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" aria-hidden />
          {t('actions.new')}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          title={t('actions.importSoon')}
        >
          <Upload className="w-4 h-4" aria-hidden />
          {t('actions.import')}
        </button>
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <Download className="w-4 h-4" aria-hidden />
          {t('actions.export')}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          {t('actions.more')}
          <ChevronDown className="w-4 h-4" aria-hidden />
        </button>
        <button
          type="button"
          className="p-2 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          aria-label={t('actions.more')}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
