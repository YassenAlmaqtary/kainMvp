import type { CustomerStatus } from '@/features/crm/types'

export const CRM_RISK_VARIANTS = {
  red: {
    hover: 'hover:bg-red-50 dark:hover:bg-red-950/30',
    icon: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
  },
  amber: {
    hover: 'hover:bg-amber-50 dark:hover:bg-amber-950/30',
    icon: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
  },
  orange: {
    hover: 'hover:bg-orange-50 dark:hover:bg-orange-950/30',
    icon: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  },
  rose: {
    hover: 'hover:bg-rose-50 dark:hover:bg-rose-950/30',
    icon: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
  },
  indigo: {
    hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-950/30',
    icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
  },
} as const

export const CRM_INSIGHT_VARIANTS = {
  emerald: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20',
  amber: 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20',
  blue: 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20',
} as const

export const CUSTOMER_STATUS_STYLES: Record<CustomerStatus, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  suspended: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  blocked: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  under_review: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
}
