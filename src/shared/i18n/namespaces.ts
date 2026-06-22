export const NAMESPACES = ['common', 'layout', 'login', 'marketing', 'pos', 'dashboard'] as const

export type Namespace = (typeof NAMESPACES)[number]

export const DEFAULT_NAMESPACE: Namespace = 'common'

export type PageKey = 'login' | 'dashboard' | 'pos' | 'reports' | 'inventory' | 'settings'
