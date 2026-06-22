import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingScreen } from '@/shared/components/LoadingScreen'
import { useAuth } from '@/shared/context/AuthContext'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />

  return <Outlet />
}

export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  if (isLoading) return <LoadingScreen />
  if (isAuthenticated) return <Navigate to={from} replace />

  return <Outlet />
}

export function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <LoadingScreen />
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}
