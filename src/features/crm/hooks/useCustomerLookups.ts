import { useQuery } from '@tanstack/react-query'
import { fetchCustomerGroups, fetchSalesmen } from '@/features/crm/services/customers'
import { queryKeys } from '@/shared/api/queryKeys'

export function useCustomerLookups() {
  const groupsQuery = useQuery({
    queryKey: queryKeys.crm.groups(),
    queryFn: fetchCustomerGroups,
    staleTime: 5 * 60_000,
  })

  const salesmenQuery = useQuery({
    queryKey: queryKeys.crm.salesmen(),
    queryFn: fetchSalesmen,
    staleTime: 5 * 60_000,
  })

  const groups = (groupsQuery.data ?? []).filter((g) => g.isActive !== false)
  const salesmen = (salesmenQuery.data ?? []).filter((s) => s.isActive !== false)

  return {
    groups,
    salesmen,
    isLoading: groupsQuery.isLoading || salesmenQuery.isLoading,
  }
}
