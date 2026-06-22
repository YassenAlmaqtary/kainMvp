export type CustomerStatus = 'active' | 'suspended' | 'blocked' | 'under_review'

export type CustomerType = 'individual' | 'company' | 'government' | 'other'

export interface CustomerRow {
  customerId: number
  id: string
  code: string
  name: string
  customerNameEn?: string
  phone: string
  address?: string
  city: string
  totalTransactions: number
  balanceDue: number
  lastPurchaseDate: string
  dateCreated?: string
  status: CustomerStatus
  isActive?: boolean
  customerType: CustomerType
  taxId?: string
  crNumber?: string
  creditLimit?: number
  notes?: string
  branch?: string
  groupId?: number
  group?: string
  salesmanId?: number
  salesRep?: string
  accountId?: number
  accountCode?: number
}

export interface CustomerFormValues {
  customerName: string
  customerNameEn: string
  address: string
  phone: string
  taxNumber: string
  crNumber: string
  creditLimit: number | null
  notes: string
  isActive: boolean
  groupId: number
  salesmanId: number | null
  accountId: number | null
  accountCode: number | null
}

export const EMPTY_CUSTOMER_FORM: CustomerFormValues = {
  customerName: '',
  customerNameEn: '',
  address: '',
  phone: '',
  taxNumber: '',
  crNumber: '',
  creditLimit: null,
  notes: '',
  isActive: true,
  groupId: 0,
  salesmanId: null,
  accountId: null,
  accountCode: null,
}

export interface CustomerKpi {
  id: string
  labelKey: string
  value: string
  subtextKey?: string
  subtextValue?: string | number
  trend?: 'up' | 'down'
  trendValue?: string
  chart: 'blue' | 'indigo' | 'emerald' | 'rose' | 'slate' | 'purple'
}

export interface CustomerRiskItem {
  id: string
  labelKey: string
  descriptionKey: string
  count: number
  variant: 'red' | 'amber' | 'orange' | 'rose' | 'indigo'
}

export interface CustomerInsight {
  id: string
  titleKey: string
  variant: 'emerald' | 'amber' | 'blue'
  name?: string
  amount?: string
  messageKey?: string
  messageValue?: string | number
}

export interface CustomerDistributionSlice {
  id: CustomerType
  labelKey: string
  value: number
  color: string
}

export interface CustomerFilters {
  name: string
  phone: string
  code: string
  taxId: string
  branch: string
  group: string
  salesRep: string
  customerType: string
  status: string
  creditStatus: string
  city: string
}

export const EMPTY_CUSTOMER_FILTERS: CustomerFilters = {
  name: '',
  phone: '',
  code: '',
  taxId: '',
  branch: '',
  group: '',
  salesRep: '',
  customerType: '',
  status: '',
  creditStatus: '',
  city: '',
}
