import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query'
import { callApi } from '@/api'
import type { CallApiOptions } from '@/api/registry/types'
import { ApiError } from '@/api/errors'

type ApiMutationVariables = CallApiOptions & { endpoint: string }

type ApiMutationOptions<TData, TVariables extends ApiMutationVariables = ApiMutationVariables> = Omit<
  UseMutationOptions<TData, ApiError, TVariables>,
  'mutationFn'
>

/**
 * TanStack Query wrapper for POST/PUT/PATCH/DELETE via `callApi`.
 *
 * @example
 * const create = useApiMutation<ProductDto>({
 *   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
 * })
 * create.mutate({ endpoint: 'products.create', body: payload })
 */
export function useApiMutation<TData, TVariables extends ApiMutationVariables = ApiMutationVariables>(
  options?: ApiMutationOptions<TData, TVariables>,
): UseMutationResult<TData, ApiError, TVariables> {
  return useMutation<TData, ApiError, TVariables>({
    ...options,
    mutationFn: ({ endpoint, ...callOptions }) => callApi<TData>(endpoint, callOptions),
  })
}
