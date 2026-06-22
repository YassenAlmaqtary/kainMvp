import { Outlet } from 'react-router-dom'
import { LayoutToolbar } from '@/shared/components/LayoutToolbar'
import { SiteFooter } from '@/shared/components/SiteFooter'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative font-sans text-slate-800 dark:text-slate-200">
      <LayoutToolbar />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
