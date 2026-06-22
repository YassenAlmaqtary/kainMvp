import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { cn } from '@/shared/utils/cn'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { box: 'w-10 h-10', inner: 'w-5 h-5 border-4', title: 'text-2xl', subtitle: 'text-[8px]' },
  md: { box: 'w-12 h-12', inner: 'w-6 h-6 border-4', title: 'text-3xl', subtitle: 'text-[10px]' },
  lg: { box: 'w-14 h-14', inner: 'w-7 h-7 border-4', title: 'text-4xl', subtitle: 'text-xs' },
}

export function Logo({ size = 'md', className }: LogoProps) {
  const { t } = useAppTranslation('common')
  const s = sizes[size]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          s.box,
          'bg-kayan-blue rotate-45 flex items-center justify-center rounded-lg shadow-lg shadow-blue-200 dark:shadow-blue-900/30',
        )}
        aria-hidden
      >
        <div className={cn(s.inner, 'border-white rounded-sm -rotate-45')} />
      </div>
      <div>
        <h1 className={cn(s.title, 'font-bold tracking-tight text-slate-900 dark:text-white leading-none')}>
          {t('brandName')}
        </h1>
        <p className={cn(s.subtitle, 'tracking-[0.3em] font-bold text-slate-500 uppercase')}>KAYAN</p>
      </div>
    </div>
  )
}
