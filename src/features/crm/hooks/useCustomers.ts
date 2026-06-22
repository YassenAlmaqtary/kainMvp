import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { filterCustomers } from '@/api/mappers/customer.mapper'
import { isApiEnabled } from '@/api'
import { EMPTY_CUSTOMER_FILTERS } from '@/features/crm/types'
import type { CustomerFilters } from '@/features/crm/types'
import { fetchCustomers } from '@/features/crm/services/customers'
import {
  buildCustomerDistribution,
  buildCustomerInsights,
  buildCustomerKpis,
  buildCustomerRisks,
} from '@/features/crm/utils/customerStats'
import { queryKeys } from '@/shared/api/queryKeys'

export function useCustomers() {
  const [draftFilters, setDraftFilters] = useState<CustomerFilters>(EMPTY_CUSTOMER_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<CustomerFilters>(EMPTY_CUSTOMER_FILTERS)

  const query = useQuery({
    queryKey: queryKeys.crm.customers(),
    queryFn: fetchCustomers,
    staleTime: 30_000,
    retry: isApiEnabled() ? 1 : 0,
  })

  const allCustomers = query.data ?? []

  const filteredCustomers = useMemo(
    () => filterCustomers(allCustomers, appliedFilters),
    [allCustomers, appliedFilters],
  )

  const stats = useMemo(
    () => ({
      kpis: buildCustomerKpis(allCustomers),
      risks: buildCustomerRisks(allCustomers),
      insights: buildCustomerInsights(allCustomers),
      distribution: buildCustomerDistribution(allCustomers),
    }),
    [allCustomers],
  )

  const filterOptions = useMemo(() => {
    const groups = [...new Set(allCustomers.map((c) => c.group).filter(Boolean))] as string[]
    const salesReps = [...new Set(allCustomers.map((c) => c.salesRep).filter(Boolean))] as string[]
    const cities = [...new Set(allCustomers.map((c) => c.city).filter((c) => c && c !== '—'))] as string[]
    return { groups, salesReps, cities }
  }, [allCustomers])

  function applyFilters() {
    setAppliedFilters({ ...draftFilters })
  }

  function resetFilters() {
    setDraftFilters(EMPTY_CUSTOMER_FILTERS)
    setAppliedFilters(EMPTY_CUSTOMER_FILTERS)
  }

  return {
    customers: filteredCustomers,
    allCustomers,
    stats,
    filterOptions,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isApiMode: isApiEnabled(),
    filters: draftFilters,
    setFilters: setDraftFilters,
    applyFilters,
    resetFilters,
    refetch: query.refetch,
  }
}
