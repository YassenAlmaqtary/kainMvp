import type {
  CreateCustomerDto,
  CustomerDto,
  CustomerGroupDto,
  SalesmanDto,
  UpdateCustomerDto,
} from '@/api/types'
import { callApi, isApiEnabled } from '@/api'
import { mapCustomerDtosToRows } from '@/api/mappers/customer.mapper'
import { DEMO_CUSTOMERS } from '@/features/crm/constants/mockData'
import type { CustomerRow } from '@/features/crm/types'

async function callCustomersApi<T>(ref: string, options?: Parameters<typeof callApi>[1]): Promise<T> {
  return callApi<T>(ref, { timeoutMs: 15_000, ...options })
}

export async function fetchCustomers(): Promise<CustomerRow[]> {
  if (!isApiEnabled()) {
    return DEMO_CUSTOMERS
  }

  const dtos = await callCustomersApi<CustomerDto[]>('customers.list')
  return mapCustomerDtosToRows(dtos)
}

export async function fetchCustomerById(id: number): Promise<CustomerDto> {
  return callCustomersApi<CustomerDto>('customers.getById', { params: { id } })
}

export async function createCustomer(payload: CreateCustomerDto): Promise<CustomerDto> {
  return callCustomersApi<CustomerDto>('customers.create', { body: payload })
}

export async function updateCustomer(id: number, payload: UpdateCustomerDto): Promise<CustomerDto> {
  return callCustomersApi<CustomerDto>('customers.update', { params: { id }, body: payload })
}

export async function deleteCustomer(id: number): Promise<void> {
  await callCustomersApi<unknown>('customers.delete', { params: { id } })
}

export async function fetchCustomerGroups(): Promise<CustomerGroupDto[]> {
  if (!isApiEnabled()) return []
  return callCustomersApi<CustomerGroupDto[]>('customerGroups.list')
}

export async function fetchSalesmen(): Promise<SalesmanDto[]> {
  if (!isApiEnabled()) return []
  return callCustomersApi<SalesmanDto[]>('salesmen.list')
}

export function exportCustomersCsv(customers: CustomerRow[]): string {
  const headers = [
    'code',
    'name',
    'phone',
    'city',
    'taxId',
    'group',
    'salesRep',
    'status',
    'creditLimit',
    'dateCreated',
  ]
  const rows = customers.map((c) =>
    [
      c.code,
      c.name,
      c.phone,
      c.city,
      c.taxId ?? '',
      c.group ?? '',
      c.salesRep ?? '',
      c.status,
      c.creditLimit ?? '',
      c.dateCreated ?? c.lastPurchaseDate,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(','),
  )
  return [headers.join(','), ...rows].join('\n')
}

export function downloadCsv(filename: string, content: string) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
