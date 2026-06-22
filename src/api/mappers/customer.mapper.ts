import type {
  CreateCustomerDto,
  CustomerDto,
  UpdateCustomerDto,
} from '@/api/types'
import type { CustomerFormValues, CustomerRow, CustomerStatus, CustomerType } from '@/features/crm/types'

function inferCustomerType(dto: CustomerDto): CustomerType {
  if (dto.taxNumber?.startsWith('7')) return 'government'
  if (dto.crNumber || dto.taxNumber) return 'company'
  return 'individual'
}

function inferStatus(dto: CustomerDto): CustomerStatus {
  if (dto.isActive === false) return 'suspended'
  return 'active'
}

export function mapCustomerDtoToRow(dto: CustomerDto, index: number): CustomerRow {
  const customerId = dto.customerId ?? index + 1
  const code = dto.accountCode
    ? `C${String(dto.accountCode).padStart(4, '0')}`
    : `C${String(customerId).padStart(4, '0')}`

  return {
    customerId,
    id: String(customerId),
    code,
    name: dto.customerName ?? dto.customerNameEn ?? '—',
    customerNameEn: dto.customerNameEn ?? undefined,
    phone: dto.phone ?? '—',
    address: dto.address ?? undefined,
    city: dto.address?.split(/[,،]/)[0]?.trim() || '—',
    totalTransactions: 0,
    balanceDue: 0,
    lastPurchaseDate: dto.dateCreated?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    dateCreated: dto.dateCreated ?? undefined,
    status: inferStatus(dto),
    isActive: dto.isActive ?? true,
    customerType: inferCustomerType(dto),
    taxId: dto.taxNumber ?? undefined,
    crNumber: dto.crNumber ?? undefined,
    creditLimit: dto.creditLimit ?? undefined,
    notes: dto.notes ?? undefined,
    groupId: dto.groupId ?? undefined,
    group: dto.groupName ?? undefined,
    salesmanId: dto.salesmanId ?? undefined,
    salesRep: dto.salesmanName ?? undefined,
    accountId: dto.accountId ?? undefined,
    accountCode: dto.accountCode ?? undefined,
  }
}

export function mapCustomerDtosToRows(dtos: CustomerDto[]): CustomerRow[] {
  return dtos.map((dto, i) => mapCustomerDtoToRow(dto, i))
}

export function mapRowToFormValues(row: CustomerRow): CustomerFormValues {
  return {
    customerName: row.name === '—' ? '' : row.name,
    customerNameEn: row.customerNameEn ?? '',
    address: row.address ?? '',
    phone: row.phone === '—' ? '' : row.phone,
    taxNumber: row.taxId ?? '',
    crNumber: row.crNumber ?? '',
    creditLimit: row.creditLimit ?? null,
    notes: row.notes ?? '',
    isActive: row.isActive ?? true,
    groupId: row.groupId ?? 0,
    salesmanId: row.salesmanId ?? null,
    accountId: row.accountId ?? null,
    accountCode: row.accountCode ?? null,
  }
}

export function mapDtoToFormValues(dto: CustomerDto): CustomerFormValues {
  return mapRowToFormValues(mapCustomerDtoToRow(dto, 0))
}

export function mapFormToCreateDto(form: CustomerFormValues): CreateCustomerDto {
  return {
    customerName: form.customerName.trim(),
    customerNameEn: form.customerNameEn.trim() || null,
    address: form.address.trim() || null,
    phone: form.phone.trim() || null,
    taxNumber: form.taxNumber.trim() || null,
    crNumber: form.crNumber.trim() || null,
    creditLimit: form.creditLimit,
    notes: form.notes.trim() || null,
    isActive: form.isActive,
    groupId: form.groupId,
    salesmanId: form.salesmanId,
    accountId: form.accountId,
    accountCode: form.accountCode,
  }
}

export function mapFormToUpdateDto(customerId: number, form: CustomerFormValues): UpdateCustomerDto {
  return {
    customerId,
    ...mapFormToCreateDto(form),
  }
}

export function filterCustomers(
  rows: CustomerRow[],
  filters: import('@/features/crm/types').CustomerFilters,
): CustomerRow[] {
  return rows.filter((row) => {
    if (filters.name && !row.name.includes(filters.name)) return false
    if (filters.phone && !row.phone.includes(filters.phone)) return false
    if (filters.code && !row.code.toLowerCase().includes(filters.code.toLowerCase())) return false
    if (filters.taxId && !row.taxId?.includes(filters.taxId)) return false
    if (filters.group && row.group !== filters.group) return false
    if (filters.salesRep && row.salesRep !== filters.salesRep) return false
    if (filters.customerType && row.customerType !== filters.customerType) return false
    if (filters.status && row.status !== filters.status) return false
    if (filters.city && row.city !== filters.city) return false
    if (filters.creditStatus === 'exceeded' && (row.creditLimit ?? 0) <= 0) return false
    if (filters.creditStatus === 'within_limit' && (row.creditLimit ?? 0) > 0) return false
    return true
  })
}
