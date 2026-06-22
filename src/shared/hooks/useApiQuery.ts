import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { callApi } from '@/api'
import type { CallApiOptions } from '@/api/registry/types'
import { ApiError } from '@/api/errors'

type ApiQueryOptions<TData, TSelected = TData> = Omit<
  UseQueryOptions<TData, ApiError, TSelected, QueryKey>,
  'queryKey' | 'queryFn'
> & {
  queryKey: QueryKey
  endpoint: string
  callOptions?: CallApiOptions
}

/**
 * TanStack Query wrapper around `callApi` — use for all server reads in UI.
 *
 * @example
 * const { data } = useApiQuery({
 *   queryKey: ['products', 'list'],
 *   endpoint: 'products.list',
 * })
 */
export function useApiQuery<TData, TSelected = TData>(
  options: ApiQueryOptions<TData, TSelected>,
): UseQueryResult<TSelected, ApiError> {
  const { endpoint, callOptions, ...queryOptions } = options

  return useQuery<TData, ApiError, TSelected>({
    ...queryOptions,
    queryFn: () => callApi<TData>(endpoint, callOptions),
  })
}
