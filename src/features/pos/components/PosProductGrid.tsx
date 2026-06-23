import { Package, Search } from 'lucide-react'
import { POS_PRODUCT_PLACEHOLDER } from '@/features/pos/constants/assets'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import type { PosProduct } from '@/features/pos/types'
import { cn } from '@/shared/utils/cn'
import { formatAmount } from '@/shared/utils/format'

interface PosProductGridProps {
  products: PosProduct[]
  isLoading?: boolean
  onSelect: (product: PosProduct) => void
  className?: string
}

export function PosProductGrid({ products, isLoading, onSelect, className }: PosProductGridProps) {
  const { t } = useAppTranslation('pos')
  const gridClassName = cn(
    'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3 shrink-0 pb-1 max-h-28 sm:max-h-32 lg:max-h-36 overflow-y-auto',
    className,
  )

  if (isLoading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-20 rounded-lg bg-slate-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    if (className?.includes('hidden')) return null
    return <p className="text-center text-xs text-slate-400 py-4 shrink-0">{t('catalog.empty')}</p>
  }

  return (
    <div className={gridClassName}>
      {products.slice(0, 21).map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => onSelect(product)}
          className="flex flex-col items-center p-2 bg-white rounded-lg border border-transparent hover:border-pos-blue transition-colors text-center min-h-[72px]"
        >
          <img
            src={product.imageUrl ?? POS_PRODUCT_PLACEHOLDER}
            alt=""
            className="w-8 h-8 rounded object-cover mb-1 border border-slate-100"
          />
          <span className="text-[10px] leading-tight line-clamp-2">{product.name}</span>
          <span className="text-[9px] text-pos-blue font-bold mt-0.5">{formatAmount(product.price)}</span>
        </button>
      ))}
    </div>
  )
}

interface PosCatalogSearchProps {
  value: string
  onChange: (value: string) => void
  onScanSubmit: () => void
  resultCount?: number
}

export function PosCatalogSearch({ value, onChange, onScanSubmit, resultCount }: PosCatalogSearchProps) {
  const { t } = useAppTranslation('pos')

  return (
    <div className="flex gap-2 shrink-0">
      <div className="flex-1 relative">
        <input
          className="w-full h-10 sm:h-12 pe-10 sm:pe-12 ps-10 sm:ps-12 text-sm sm:text-base rounded-lg border border-pos-border focus:ring-2 focus:ring-pos-blue focus:border-pos-blue outline-none bg-white"
          placeholder={t('search.placeholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onScanSubmit()
            }
          }}
        />
        <Search className="absolute end-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden />
        <Package className="absolute start-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden />
      </div>
      {resultCount != null && value.trim() ? (
        <span className="self-center text-xs text-slate-500 shrink-0">{t('catalog.results', { count: resultCount })}</span>
      ) : null}
    </div>
  )
}

export function filterProductsByCategory(products: PosProduct[], categoryId: string): PosProduct[] {
  if (categoryId === 'all') return products
  return products.filter((p) => p.groupName === categoryId)
}

export function deriveProductGroups(products: PosProduct[]): { id: string; label: string }[] {
  const groups = new Set<string>()
  for (const p of products) {
    if (p.groupName) groups.add(p.groupName)
  }
  return Array.from(groups).map((id) => ({ id, label: id }))
}
