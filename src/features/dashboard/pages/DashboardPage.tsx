import {
  DashboardActivityTimeline,
  DashboardDecisionCenter,
  DashboardHero,
  DashboardMetricsGrid,
  DashboardMiniStats,
  DashboardQuickActionsPanel,
  DashboardTasksPanel,
} from '@/features/dashboard/components'
import { usePageTitle } from '@/shared/hooks/usePageTitle'

export function DashboardPage() {
  usePageTitle('dashboard')

  return (
    <div className="space-y-4 lg:space-y-6 pb-8">
      <DashboardHero />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
        <div className="xl:col-span-8 space-y-4 lg:space-y-6">
          <DashboardDecisionCenter />
          <DashboardMetricsGrid />
        </div>
        <div className="xl:col-span-4">
          <DashboardTasksPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
        <div className="xl:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <DashboardActivityTimeline />
          <DashboardMiniStats />
        </div>
        <div className="xl:col-span-4">
          <DashboardQuickActionsPanel />
        </div>
      </div>
    </div>
  )
}
