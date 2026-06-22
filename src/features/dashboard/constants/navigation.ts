import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Calculator,
  CheckCircle,
  Home,
  Monitor,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  UserCog,
  Users,
} from 'lucide-react'

export interface DashboardNavItem {
  id: string
  labelKey: string
  icon: LucideIcon
  to?: string
  badge?: number
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { id: 'decision', labelKey: 'nav.decision', icon: Home, to: '/dashboard' },
  { id: 'sales', labelKey: 'nav.sales', icon: ShoppingBag },
  { id: 'purchases', labelKey: 'nav.purchases', icon: ShoppingCart },
  { id: 'inventory', labelKey: 'nav.inventory', icon: Package, to: '/inventory' },
  { id: 'finance', labelKey: 'nav.finance', icon: Calculator },
  { id: 'pos', labelKey: 'nav.pos', icon: Monitor, to: '/pos' },
  { id: 'crm', labelKey: 'nav.crm', icon: Users },
  { id: 'hr', labelKey: 'nav.hr', icon: UserCog },
  { id: 'reports', labelKey: 'nav.reports', icon: BarChart3, to: '/reports' },
  { id: 'approvals', labelKey: 'nav.approvals', icon: CheckCircle, badge: 12 },
  { id: 'settings', labelKey: 'nav.settings', icon: Settings, to: '/settings' },
]
