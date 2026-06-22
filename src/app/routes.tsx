import { Routes, Route } from 'react-router-dom'
import { RootLayout } from '@/app/layouts/RootLayout'
import { GuestRoute, ProtectedRoute, RootRedirect } from '@/features/auth/components/RouteGuards'
import { AuthLayout } from '@/features/auth/layout/AuthLayout'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { CustomersPage } from '@/features/crm/pages/CustomersPage'
import { DashboardLayout } from '@/features/dashboard/layout/DashboardLayout'
import { ComingSoonPage } from '@/features/dashboard/pages/ComingSoonPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { PosLayout } from '@/features/pos/layout/PosLayout'
import { PosPage } from '@/features/pos/pages/PosPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/crm" element={<CustomersPage />} />
            <Route path="/reports" element={<ComingSoonPage page="reports" />} />
            <Route path="/inventory" element={<ComingSoonPage page="inventory" />} />
            <Route path="/settings" element={<ComingSoonPage page="settings" />} />
          </Route>

          <Route element={<PosLayout />}>
            <Route path="/pos" element={<PosPage />} />
          </Route>
        </Route>

        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RootRedirect />} />
      </Route>
    </Routes>
  )
}
