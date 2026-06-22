import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/shared/context/AuthContext'
import { getStoredSession } from '@/api/session'
import type { UserBranchDto } from '@/api/types'
import { isApiEnabled } from '@/api'
import { queryKeys } from '@/shared/api/queryKeys'
import { useApiMutation } from '@/shared/hooks/useApiMutation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ACTIVE_BRANCH_KEY = 'kayan-active-branch'

export interface BranchOption {
  branchId: number
  branchName: string
  isDefault?: boolean
}

const DEMO_BRANCHES: BranchOption[] = [
  { branchId: 1, branchName: 'فرع جدة الرئيسي', isDefault: true },
  { branchId: 2, branchName: 'فرع الرياض' },
]

function readStoredBranchId(): number | null {
  const raw = localStorage.getItem(ACTIVE_BRANCH_KEY) ?? sessionStorage.getItem(ACTIVE_BRANCH_KEY)
  if (!raw) return null
  const id = Number(raw)
  return Number.isFinite(id) ? id : null
}

function persistBranchId(branchId: number) {
  const inLocal = localStorage.getItem(ACTIVE_BRANCH_KEY) !== null || localStorage.getItem('kayan-auth') !== null
  const storage = inLocal ? localStorage : sessionStorage
  storage.setItem(ACTIVE_BRANCH_KEY, String(branchId))
}

function mapSessionBranches(branches: UserBranchDto[]): BranchOption[] {
  return branches.flatMap((b) => {
    if (b.branchId == null) return []
    return [{
      branchId: b.branchId,
      branchName: b.branchName?.trim() || `Branch #${b.branchId}`,
      isDefault: b.isDefault,
    }]
  })
}

function resolveBranchesFromSession(): { branches: BranchOption[]; defaultBranchId: number | null } {
  const session = getStoredSession()
  const sessionBranches = session?.branches?.length ? mapSessionBranches(session.branches) : []
  const branches = sessionBranches.length > 0 ? sessionBranches : isApiEnabled() ? [] : DEMO_BRANCHES
  const defaultBranchId =
    readStoredBranchId() ??
    session?.defaultBranchId ??
    branches.find((b) => b.isDefault)?.branchId ??
    branches[0]?.branchId ??
    null

  if (defaultBranchId != null && session) {
    persistBranchId(defaultBranchId)
  }

  return { branches, defaultBranchId }
}

interface BranchContextValue {
  branches: BranchOption[]
  activeBranch: BranchOption | null
  activeBranchId: number | null
  setActiveBranchId: (branchId: number) => Promise<void>
  isLoading: boolean
}

const BranchContext = createContext<BranchContextValue | null>(null)

export function BranchProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()
  const initial = resolveBranchesFromSession()
  const [branches, setBranches] = useState<BranchOption[]>(initial.branches)
  const [activeBranchId, setActiveBranchIdState] = useState<number | null>(initial.defaultBranchId)

  const setDefaultBranch = useApiMutation<void, { endpoint: string; params: Record<string, number> }>({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.pos.all })
    },
  })

  useEffect(() => {
    const { branches: nextBranches, defaultBranchId } = resolveBranchesFromSession()
    setBranches(nextBranches.length > 0 ? nextBranches : isApiEnabled() ? [] : DEMO_BRANCHES)
    if (defaultBranchId != null) {
      setActiveBranchIdState(defaultBranchId)
    } else if (!isAuthenticated) {
      setActiveBranchIdState(null)
    }
  }, [isAuthenticated])

  const setActiveBranchId = useCallback(
    async (branchId: number) => {
      setActiveBranchIdState(branchId)
      persistBranchId(branchId)

      const session = getStoredSession()
      if (isApiEnabled() && session?.userId) {
        await setDefaultBranch.mutateAsync({
          endpoint: 'userBranches.setDefault',
          params: { userId: session.userId, branchId },
        })
      }
    },
    [setDefaultBranch],
  )

  const activeBranch = branches.find((b) => b.branchId === activeBranchId) ?? branches[0] ?? null

  const value = useMemo(
    () => ({
      branches,
      activeBranch,
      activeBranchId: activeBranch?.branchId ?? null,
      setActiveBranchId,
      isLoading: setDefaultBranch.isPending,
    }),
    [branches, activeBranch, setActiveBranchId, setDefaultBranch.isPending],
  )

  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>
}

export function useBranch() {
  const ctx = useContext(BranchContext)
  if (!ctx) throw new Error('useBranch must be used within BranchProvider')
  return ctx
}
