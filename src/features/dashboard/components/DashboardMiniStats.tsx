import { Clock, Info, ShoppingBag, Users } from 'lucide-react'
import { DASHBOARD_MINI_STATS } from '@/features/dashboard/constants/data'
import { MINI_STAT_VARIANTS } from '@/features/dashboard/components/dashboardStyles'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

const MINI_STAT_ICONS = {
  openOrders: Users,
  pendingShipments: Info,
  pendingInventory: Clock,
  openReturns: ShoppingBag,
} as const

export function DashboardMiniStats() {
  const { t } = useAppTranslation('dashboard')

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
      {DASHBOARD_MINI_STATS.map((stat) => {
        const Icon = MINI_STAT_ICONS[stat.id as keyof typeof MINI_STAT_ICONS] ?? Info
        return (
          <div key={stat.id} className="dashboard-card p-4 flex items-center gap-3">
            <div className={`p-3 rounded-lg shrink-0 ${MINI_STAT_VARIANTS[stat.variant]}`}>
              <Icon className="w-6 h-6" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">{t(stat.labelKey)}</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
