import { CheckCircle, ChevronDown, FileText, Package, Users } from 'lucide-react'
import { DASHBOARD_TASKS } from '@/features/dashboard/constants/data'
import { TASK_VARIANTS } from '@/features/dashboard/components/dashboardStyles'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

const TASK_ICONS = {
  emerald: CheckCircle,
  blue: Package,
  amber: Users,
  purple: FileText,
} as const

export function DashboardTasksPanel() {
  const { t } = useAppTranslation('dashboard')

  return (
    <div className="dashboard-card p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white">{t('tasks.title')}</h3>
        <button type="button" className="text-kayan-erp-blue text-xs hover:underline">
          {t('tasks.viewAll')}
        </button>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto dashboard-custom-scrollbar">
        {DASHBOARD_TASKS.map((task) => {
          const Icon = TASK_ICONS[task.variant]
          return (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                task.highlighted ? 'bg-slate-50 dark:bg-slate-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${TASK_VARIANTS[task.variant]}`}>
                <Icon className="w-5 h-5" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{t(task.titleKey)}</p>
                <p className="text-xs text-slate-500 truncate">{t(task.subtitleKey)}</p>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 shrink-0">{t(task.timeKey)}</span>
            </div>
          )
        })}
      </div>
      <button
        type="button"
        className="w-full mt-4 lg:mt-6 flex items-center justify-center gap-2 text-kayan-erp-blue text-xs font-semibold hover:gap-3 transition-all"
      >
        <span>{t('tasks.viewAllTasks')}</span>
        <ChevronDown className="w-4 h-4 -rotate-90 rtl:rotate-90" aria-hidden />
      </button>
    </div>
  )
}
