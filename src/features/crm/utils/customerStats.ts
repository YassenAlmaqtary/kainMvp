import type { CustomerRow, CustomerType } from '@/features/crm/types'
import type { CustomerDistributionSlice, CustomerInsight, CustomerKpi, CustomerRiskItem } from '@/features/crm/types'

const DISTRIBUTION_COLORS: Record<CustomerType, string> = {
  individual: '#0055ff',
  company: '#6366f1',
  government: '#10b981',
  other: '#f59e0b',
}

function formatCount(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

function pct(part: number, total: number): string {
  if (total === 0) return '0%'
  return `${Math.round((part / total) * 100)}%`
}

export function buildCustomerKpis(customers: CustomerRow[]): CustomerKpi[] {
  const total = customers.length
  const active = customers.filter((c) => c.isActive !== false).length
  const inactive = customers.filter((c) => c.isActive === false).length
  const now = new Date()
  const newMonth = customers.filter((c) => {
    if (!c.dateCreated) return false
    const d = new Date(c.dateCreated)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
  const withCredit = customers.filter((c) => (c.creditLimit ?? 0) > 0).length
  const suspended = customers.filter((c) => c.status === 'suspended').length

  return [
    { id: 'total', labelKey: 'kpis.total', value: formatCount(total), trend: 'up', trendValue: '—', chart: 'blue' },
    {
      id: 'active',
      labelKey: 'kpis.active',
      value: formatCount(active),
      subtextKey: 'kpis.ofTotal',
      subtextValue: pct(active, total),
      chart: 'emerald',
    },
    {
      id: 'newMonth',
      labelKey: 'kpis.newMonth',
      value: formatCount(newMonth),
      trend: newMonth > 0 ? 'up' : undefined,
      trendValue: newMonth > 0 ? `${newMonth}` : undefined,
      chart: 'indigo',
    },
    {
      id: 'installment',
      labelKey: 'kpis.installment',
      value: formatCount(withCredit),
      subtextKey: 'kpis.ofTotal',
      subtextValue: pct(withCredit, total),
      chart: 'purple',
    },
    {
      id: 'late',
      labelKey: 'kpis.late',
      value: formatCount(suspended),
      trend: suspended > 0 ? 'up' : undefined,
      trendValue: suspended > 0 ? `${suspended}` : undefined,
      chart: 'rose',
    },
    {
      id: 'inactive',
      labelKey: 'kpis.inactive',
      value: formatCount(inactive),
      trend: inactive > 0 ? 'down' : undefined,
      trendValue: inactive > 0 ? pct(inactive, total) : undefined,
      chart: 'slate',
    },
  ]
}

export function buildCustomerRisks(customers: CustomerRow[]): CustomerRiskItem[] {
  const suspended = customers.filter((c) => c.status === 'suspended').length
  const blocked = customers.filter((c) => c.status === 'blocked').length
  const review = customers.filter((c) => c.status === 'under_review').length
  const noPurchase90 = customers.filter((c) => {
    const d = new Date(c.lastPurchaseDate)
    const days = (Date.now() - d.getTime()) / 86_400_000
    return days > 90
  }).length
  const highCredit = customers.filter((c) => (c.creditLimit ?? 0) >= 50_000).length

  return [
    {
      id: 'late',
      labelKey: 'risks.late',
      descriptionKey: 'risks.lateDesc',
      count: suspended,
      variant: 'red',
    },
    {
      id: 'credit',
      labelKey: 'risks.credit',
      descriptionKey: 'risks.creditDesc',
      count: highCredit,
      variant: 'amber',
    },
    {
      id: 'noPurchase',
      labelKey: 'risks.noPurchase',
      descriptionKey: 'risks.noPurchaseDesc',
      count: noPurchase90,
      variant: 'orange',
    },
    {
      id: 'suspended',
      labelKey: 'risks.suspended',
      descriptionKey: 'risks.suspendedDesc',
      count: blocked,
      variant: 'rose',
    },
    {
      id: 'review',
      labelKey: 'risks.review',
      descriptionKey: 'risks.reviewDesc',
      count: review,
      variant: 'indigo',
    },
  ]
}

export function buildCustomerInsights(customers: CustomerRow[]): CustomerInsight[] {
  const active = customers.filter((c) => c.isActive !== false)
  const best = [...active].sort((a, b) => (b.creditLimit ?? 0) - (a.creditLimit ?? 0))[0]
  const suspended = customers.filter((c) => c.status === 'suspended').length
  const noPurchase90 = customers.filter((c) => {
    const d = new Date(c.lastPurchaseDate)
    return (Date.now() - d.getTime()) / 86_400_000 > 90
  }).length

  return [
    {
      id: 'best',
      titleKey: 'insights.best',
      variant: 'emerald',
      name: best?.name ?? '—',
      amount: best?.creditLimit ? formatCount(best.creditLimit) : '0',
    },
    {
      id: 'trend',
      titleKey: 'insights.trend',
      variant: 'amber',
      messageKey: 'insights.trendMessage',
      messageValue: suspended,
    },
    {
      id: 'followUp',
      titleKey: 'insights.followUp',
      variant: 'blue',
      messageKey: 'insights.followUpMessage',
      messageValue: noPurchase90,
    },
  ]
}

export function buildCustomerDistribution(customers: CustomerRow[]): CustomerDistributionSlice[] {
  const total = customers.length || 1
  const counts: Record<CustomerType, number> = {
    individual: 0,
    company: 0,
    government: 0,
    other: 0,
  }
  for (const c of customers) counts[c.customerType]++

  return (Object.keys(counts) as CustomerType[]).map((id) => ({
    id,
    labelKey: `distribution.${id}`,
    value: Math.round((counts[id] / total) * 100),
    color: DISTRIBUTION_COLORS[id],
  }))
}
