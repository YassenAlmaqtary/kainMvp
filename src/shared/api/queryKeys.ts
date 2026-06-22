/** Stable cache keys for TanStack Query — colocate by domain. */
export const queryKeys = {
  pos: {
    all: ['pos'] as const,
    products: (branchId?: number | null) => [...queryKeys.pos.all, 'products', branchId ?? 'default'] as const,
    productSearch: (query: string, branchId?: number | null) =>
      [...queryKeys.pos.all, 'search', query, branchId ?? 'default'] as const,
  },
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...queryKeys.auth.all, 'currentUser'] as const,
  },
} as const
