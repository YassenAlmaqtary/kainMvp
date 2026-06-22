export const DASHBOARD_HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBU8vgZvE9eEgFZqU6oHrtHvUAQGTodNQIGu07iPZ_ob76WFgr61a1yfVoM8QHpHlu9UYCBhqOJLqRkpYm_HU_imMlD9oDIOIBcBb0-CkjvHKdVe0p8RZGuaLybFT2jxyQWpIsSc4VYzFTAwDtiUsc1WGP4JOUxwTvRfv1Gz5XzC7mmIYrUjDLcckxyYyBJR92Ij7l5rmrev-cb5Rx1_f03Nijb-02c2_cJbeVI-yTYGg8lJbVvBNogSKb8N-Ou9fazxg'

export const DASHBOARD_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAAK9hT1BWZJHhUBMHARJSFohjRg3CmfT_c7UxOTPjOuWf9_K7Emoh9bJPhBYl8zbcNO4usMFXAjnfwG1gsaZq2PRP_WDsJrQn7Kxn3EAo9SlsICgEYQuKaQKCBGf9RfPz-1zi_imZiWUcb_QxqxEXBKKVTsVociXVgVTAjw0c2ofLcrvB-CJ4TjLo29ZxLNIqreHuTPXcpBYOTqZcJVOQWc-Z6WQAI0Ei76fQVfotS1Poaw0E9NYT9'

export interface DashboardDecisionItem {
  id: string
  count: number
  labelKey: string
  actionKey: string
  variant: 'red' | 'amber' | 'indigo' | 'rose' | 'orange' | 'slate'
  primaryAction?: boolean
}

export const DASHBOARD_DECISIONS: DashboardDecisionItem[] = [
  { id: 'zatca', count: 3, labelKey: 'decisions.zatca', actionKey: 'decisions.fixNow', variant: 'red', primaryAction: true },
  { id: 'unposted', count: 4, labelKey: 'decisions.unposted', actionKey: 'decisions.review', variant: 'amber' },
  { id: 'sync', count: 5, labelKey: 'decisions.syncFailed', actionKey: 'decisions.resync', variant: 'indigo' },
  { id: 'negativeStock', count: 2, labelKey: 'decisions.negativeStock', actionKey: 'decisions.handle', variant: 'rose' },
  { id: 'lowStock', count: 8, labelKey: 'decisions.lowStock', actionKey: 'decisions.createPo', variant: 'orange' },
  { id: 'pendingApproval', count: 12, labelKey: 'decisions.pendingApproval', actionKey: 'decisions.reviewNow', variant: 'slate' },
]

export interface DashboardMetric {
  id: string
  labelKey: string
  value: string
  change: number
  trend: 'up' | 'down'
  chart: 'blue' | 'indigo' | 'emerald' | 'rose' | 'slate' | 'purple'
}

export const DASHBOARD_METRICS: DashboardMetric[] = [
  { id: 'revenueToday', labelKey: 'metrics.revenueToday', value: '125,430', change: 18, trend: 'up', chart: 'blue' },
  { id: 'revenueMonth', labelKey: 'metrics.revenueMonth', value: '2,845,120', change: 24, trend: 'up', chart: 'indigo' },
  { id: 'cashPosition', labelKey: 'metrics.cashPosition', value: '1,599,820', change: 27, trend: 'up', chart: 'emerald' },
  { id: 'receivables', labelKey: 'metrics.receivables', value: '920,300', change: 18, trend: 'down', chart: 'rose' },
  { id: 'payables', labelKey: 'metrics.payables', value: '612,450', change: 6, trend: 'down', chart: 'slate' },
  { id: 'netProfit', labelKey: 'metrics.netProfit', value: '352,480', change: 14, trend: 'up', chart: 'purple' },
]

export interface DashboardTask {
  id: string
  titleKey: string
  subtitleKey: string
  timeKey: string
  variant: 'emerald' | 'blue' | 'amber' | 'purple'
  highlighted?: boolean
}

export const DASHBOARD_TASKS: DashboardTask[] = [
  { id: '1', titleKey: 'tasks.approvePo', subtitleKey: 'tasks.approvePoRef', timeKey: 'tasks.time1', variant: 'emerald', highlighted: true },
  { id: '2', titleKey: 'tasks.inventoryReview', subtitleKey: 'tasks.inventoryReviewRef', timeKey: 'tasks.time2', variant: 'blue' },
  { id: '3', titleKey: 'tasks.followClient', subtitleKey: 'tasks.followClientRef', timeKey: 'tasks.time3', variant: 'amber' },
  { id: '4', titleKey: 'tasks.reviewInvoice', subtitleKey: 'tasks.reviewInvoiceRef', timeKey: 'tasks.time4', variant: 'purple' },
]

export interface DashboardActivity {
  id: string
  messageKey: string
  timeKey: string
  variant: 'emerald' | 'blue' | 'purple'
  dimmed?: boolean
}

export const DASHBOARD_ACTIVITIES: DashboardActivity[] = [
  { id: '1', messageKey: 'activity.payment', timeKey: 'activity.time1', variant: 'emerald' },
  { id: '2', messageKey: 'activity.poApproved', timeKey: 'activity.time2', variant: 'blue' },
  { id: '3', messageKey: 'activity.newCustomer', timeKey: 'activity.time3', variant: 'purple', dimmed: true },
]

export interface DashboardMiniStat {
  id: string
  labelKey: string
  value: number
  variant: 'emerald' | 'blue' | 'amber' | 'rose'
}

export const DASHBOARD_MINI_STATS: DashboardMiniStat[] = [
  { id: 'openOrders', labelKey: 'miniStats.openOrders', value: 28, variant: 'emerald' },
  { id: 'pendingShipments', labelKey: 'miniStats.pendingShipments', value: 15, variant: 'blue' },
  { id: 'pendingInventory', labelKey: 'miniStats.pendingInventory', value: 7, variant: 'amber' },
  { id: 'openReturns', labelKey: 'miniStats.openReturns', value: 6, variant: 'rose' },
]

export interface DashboardQuickAction {
  id: string
  labelKey: string
  icon: 'userPlus' | 'users' | 'calendar' | 'cart' | 'gift' | 'wallet'
}

export const DASHBOARD_QUICK_ACTIONS: DashboardQuickAction[] = [
  { id: 'supplier', labelKey: 'quickActions.supplier', icon: 'userPlus' },
  { id: 'customer', labelKey: 'quickActions.customer', icon: 'users' },
  { id: 'journal', labelKey: 'quickActions.journal', icon: 'calendar' },
  { id: 'purchaseOrder', labelKey: 'quickActions.purchaseOrder', icon: 'cart' },
  { id: 'invoice', labelKey: 'quickActions.invoice', icon: 'gift' },
  { id: 'collection', labelKey: 'quickActions.collection', icon: 'wallet' },
]
