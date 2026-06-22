import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  mapFormToCreateDto,
  mapFormToUpdateDto,
  mapRowToFormValues,
} from '@/api/mappers/customer.mapper'
import type { CustomerFormValues } from '@/features/crm/types'
import {
  createCustomer,
  deleteCustomer,
  fetchCustomerById,
  updateCustomer,
} from '@/features/crm/services/customers'
import { queryKeys } from '@/shared/api/queryKeys'

export function useCustomerDetail(customerId: number | null, enabled = true) {
  return useQuery({
    queryKey: queryKeys.crm.customer(customerId ?? 0),
    queryFn: () => fetchCustomerById(customerId!),
    enabled: enabled && customerId != null && customerId > 0,
  })
}

export function useCustomerMutations() {
  const queryClient = useQueryClient()

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.crm.all })
  }

  const create = useMutation({
    mutationFn: (form: CustomerFormValues) => createCustomer(mapFormToCreateDto(form)),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: ({ customerId, form }: { customerId: number; form: CustomerFormValues }) =>
      updateCustomer(customerId, mapFormToUpdateDto(customerId, form)),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (customerId: number) => deleteCustomer(customerId),
    onSuccess: invalidate,
  })

  return { create, update, remove }
}

export { mapRowToFormValues }
