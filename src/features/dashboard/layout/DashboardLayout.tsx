import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from '@/features/dashboard/components/DashboardSidebar'
import { DashboardTopBar } from '@/features/dashboard/components/DashboardTopBar'
import { DashboardLayoutProvider, useDashboardLayout } from '@/features/dashboard/context/DashboardLayoutContext'

function DashboardLayoutContent() {
  const { sidebarCollapsed } = useDashboardLayout()

  const mainOffset = sidebarCollapsed ? 'lg:ms-[4.5rem]' : 'lg:ms-64'

  return (
    <div className="dashboard-shell flex min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <DashboardSidebar />
      <div className={`flex-1 flex flex-col min-w-0 ${mainOffset} transition-[margin] duration-200`}>
        <DashboardTopBar />
        <div className="flex-1 p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export function DashboardLayout() {
  return (
    <DashboardLayoutProvider>
      <DashboardLayoutContent />
    </DashboardLayoutProvider>
  )
}
