import { ArrowDown, ArrowUp } from 'lucide-react'
import { DASHBOARD_METRICS } from '@/features/dashboard/constants/data'
import { METRIC_CHART_COLORS } from '@/features/dashboard/components/dashboardStyles'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

function MetricChart({ chart }: { chart: keyof typeof METRIC_CHART_COLORS }) {
  const colors = METRIC_CHART_COLORS[chart]

  if (Array.isArray(colors)) {
    const heights = ['h-1/4', 'h-2/4', 'h-3/4', 'h-full', 'h-1/2']
    return (
      <div className="mt-3 h-8 flex items-end gap-1">
        {colors.map((color, i) => (
          <div key={i} className={`w-full ${color} ${heights[i] ?? 'h-1/2'} rounded-sm`} />
        ))}
      </div>
    )
  }

  if (chart === 'emerald') {
    return (
      <div className="mt-3 h-8 bg-emerald-50 dark:bg-emerald-950/30 rounded relative overflow-hidden">
        <div className={`absolute inset-x-0 bottom-0 ${colors} h-1/3 opacity-20`} />
      </div>
    )
  }

  return <div className={`mt-3 h-8 ${colors} rounded`} />
}

export function DashboardMetricsGrid() {
  const { t } = useAppTranslation('dashboard')

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
      {DASHBOARD_METRICS.map((metric) => {
        const isUp = metric.trend === 'up'
        const trendColor = isUp ? 'text-emerald-500' : 'text-rose-500'
        const TrendIcon = isUp ? ArrowUp : ArrowDown

        return (
          <div key={metric.id} className="dashboard-card p-4">
            <p className="text-[10px] text-slate-500 mb-1 leading-tight">{t(metric.labelKey)}</p>
            <div className="flex items-end justify-between gap-2">
              <div>
                <h4 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white">{metric.value}</h4>
                <span className="text-[10px] text-slate-400">{t('metrics.currency')}</span>
              </div>
              <div className={`${trendColor} flex items-center text-xs shrink-0`}>
                <TrendIcon className="w-3 h-3" aria-hidden />
                {metric.change}%
              </div>
            </div>
            <MetricChart chart={metric.chart} />
          </div>
        )
      })}
    </div>
  )
}
