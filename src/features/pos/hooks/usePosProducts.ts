import { useQuery } from '@tanstack/react-query'
import { fetchPosProducts } from '@/features/pos/services/products'
import { queryKeys } from '@/shared/api/queryKeys'
import { useBranch } from '@/shared/context/BranchContext'

export function usePosProducts() {
  const { activeBranchId } = useBranch()

  const query = useQuery({
    queryKey: queryKeys.pos.products(activeBranchId),
    queryFn: fetchPosProducts,
    staleTime: 5 * 60_000,
  })

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  }
}
