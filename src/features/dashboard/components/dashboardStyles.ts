export const DECISION_VARIANTS = {
  red: {
    hover: 'hover:bg-red-50 dark:hover:bg-red-950/30',
    icon: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
    iconHover: 'group-hover:bg-red-200 dark:group-hover:bg-red-900/60',
  },
  amber: {
    hover: 'hover:bg-amber-50 dark:hover:bg-amber-950/30',
    icon: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    iconHover: '',
  },
  indigo: {
    hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-950/30',
    icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    iconHover: '',
  },
  rose: {
    hover: 'hover:bg-rose-50 dark:hover:bg-rose-950/30',
    icon: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
    iconHover: '',
  },
  orange: {
    hover: 'hover:bg-orange-50 dark:hover:bg-orange-950/30',
    icon: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
    iconHover: '',
  },
  slate: {
    hover: 'hover:bg-slate-50 dark:hover:bg-slate-800/50',
    icon: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    iconHover: '',
  },
} as const

export const TASK_VARIANTS = {
  emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
} as const

export const ACTIVITY_VARIANTS = {
  emerald: { dot: 'bg-emerald-500', icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
  blue: { dot: 'bg-blue-500', icon: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  purple: { dot: 'bg-purple-500', icon: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
} as const

export const MINI_STAT_VARIANTS = {
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
} as const

export const METRIC_CHART_COLORS = {
  blue: ['bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-500', 'bg-blue-200'],
  indigo: ['bg-indigo-100', 'bg-indigo-500', 'bg-indigo-300', 'bg-indigo-200'],
  emerald: 'bg-emerald-500',
  rose: 'bg-rose-50 dark:bg-rose-950/30',
  slate: 'bg-slate-50 dark:bg-slate-800',
  purple: 'bg-purple-50 dark:bg-purple-950/30',
} as const
