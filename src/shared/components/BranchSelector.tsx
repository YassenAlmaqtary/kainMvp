import { ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useBranch } from '@/shared/context/BranchContext'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { cn } from '@/shared/utils/cn'

interface BranchSelectorProps {
  variant?: 'dashboard' | 'pos'
  className?: string
}

export function BranchSelector({ variant = 'dashboard', className }: BranchSelectorProps) {
  const { t } = useAppTranslation('common')
  const { branches, activeBranch, setActiveBranchId, isLoading } = useBranch()
  const [open, setOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), open)

  if (branches.length <= 1) {
    return (
      <div className={cn('flex items-center gap-2 min-w-0', className)}>
        <MapPin className={cn('shrink-0', variant === 'pos' ? 'w-4 h-4 opacity-70' : 'w-5 h-5 text-slate-400')} />
        <div className="leading-tight min-w-0 text-start">
          {variant === 'dashboard' ? (
            <>
              <p className="text-xs text-slate-500 truncate">{activeBranch?.branchName ?? t('branch.label')}</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{t('branch.active')}</p>
            </>
          ) : (
            <>
              <p className="pos-header-meta-label">{t('branch.label')}</p>
              <p className="pos-header-meta-value truncate">{activeBranch?.branchName ?? '—'}</p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative min-w-0', className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isLoading}
        className={cn(
          'flex items-center gap-2 text-start min-w-0 w-full',
          variant === 'dashboard' && 'cursor-pointer group',
          variant === 'pos' && 'hover:opacity-90 transition-opacity',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('branch.change')}
      >
        <MapPin className={cn('shrink-0', variant === 'pos' ? 'w-4 h-4 opacity-70' : 'w-5 h-5 text-slate-400')} />
        <div className="leading-tight min-w-0 flex-1">
          {variant === 'dashboard' ? (
            <>
              <p className="text-xs text-slate-500 truncate">{activeBranch?.branchName}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-slate-800 dark:text-white">{t('branch.change')}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </div>
            </>
          ) : (
            <>
              <p className="pos-header-meta-label">{t('branch.label')}</p>
              <p className="pos-header-meta-value truncate flex items-center gap-1">
                {activeBranch?.branchName ?? '—'}
                <ChevronDown className="w-3 h-3 opacity-70 shrink-0" />
              </p>
            </>
          )}
        </div>
      </button>

      {open ? (
        <ul
          role="listbox"
          className={cn(
            'absolute top-full mt-1 min-w-[200px] max-w-[280px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-50',
            variant === 'dashboard' ? 'start-0' : 'end-0',
          )}
        >
          {branches.map((branch) => (
            <li key={branch.branchId} role="option" aria-selected={activeBranch?.branchId === branch.branchId}>
              <button
                type="button"
                onClick={() => {
                  void setActiveBranchId(branch.branchId)
                  setOpen(false)
                }}
                className={cn(
                  'w-full px-3 py-2 text-sm text-start hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors truncate',
                  activeBranch?.branchId === branch.branchId && 'text-kayan-erp-blue font-semibold bg-blue-50/50 dark:bg-blue-900/20',
                )}
              >
                {branch.branchName}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
