/**
 * Standard data-fetching pattern for Kayan ERP frontend.
 *
 * READ  → service function + useQuery (or useApiQuery for simple endpoints)
 * WRITE → service function + useApiMutation / useMutation
 * AUTH  → useAuthSession (query + mutations) via AuthProvider
 */

export { useApiQuery } from '@/shared/hooks/useApiQuery'
export { useApiMutation } from '@/shared/hooks/useApiMutation'
export { queryKeys } from '@/shared/api/queryKeys'
export { queryClient } from '@/shared/api/queryClient'
