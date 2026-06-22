import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as authService from '@/features/auth/services/auth'
import { queryKeys } from '@/shared/api/queryKeys'
import type { LoginCredentials, User } from '@/shared/types/user'

/** Auth session: current user query + login/logout mutations (TanStack Query). */
export function useAuthSession() {
  const queryClient = useQueryClient()

  const currentUser = useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: authService.getCurrentUser,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  })

  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (session) => {
      queryClient.setQueryData<User | null>(queryKeys.auth.currentUser(), session.user)
    },
  })

  const loginWithGoogle = useMutation({
    mutationFn: (rememberMe: boolean) => authService.loginWithGoogle(rememberMe),
    onSuccess: (session) => {
      queryClient.setQueryData<User | null>(queryKeys.auth.currentUser(), session.user)
    },
  })

  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData<User | null>(queryKeys.auth.currentUser(), null)
      queryClient.clear()
    },
  })

  return {
    user: currentUser.data ?? null,
    isLoading: currentUser.isPending,
    isAuthenticated: Boolean(currentUser.data),
    login: async (credentials: LoginCredentials) => {
      await login.mutateAsync(credentials)
    },
    loginWithGoogle: async (rememberMe: boolean) => {
      await loginWithGoogle.mutateAsync(rememberMe)
    },
    logout: async () => {
      await logout.mutateAsync()
    },
  }
}
