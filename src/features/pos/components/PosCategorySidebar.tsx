import { LayoutGrid, Search } from 'lucide-react'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { POS_CATEGORIES } from '@/features/pos/constants/categories'

interface PosCategorySidebarProps {
  activeId: string
  onSelect: (id: string) => void
  apiGroups?: { id: string; label: string }[]
}

export function PosCategorySidebar({ activeId, onSelect, apiGroups }: PosCategorySidebarProps) {
  const { t } = useAppTranslation('pos')

  const categories =
    apiGroups && apiGroups.length > 0
      ? [{ id: 'all', label: t('categories.all') }, ...apiGroups.map((g) => ({ id: g.id, label: g.label }))]
      : POS_CATEGORIES.map((c) => ({ id: c.id, label: t(c.labelKey) }))

  return (
    <aside className="pos-sidebar-left bg-white border-e border-pos-border flex flex-col overflow-y-auto">
      <div className="p-3 border-b border-pos-border flex items-center justify-between shrink-0">
        <span className="font-bold text-sm">{t('categories.title')}</span>
        <Search className="w-4 h-4 text-slate-400" aria-hidden />
      </div>
      <div className="flex flex-col">
        {categories.map((category) => {
          const isActive = activeId === category.id

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`flex flex-col items-center gap-1 p-3 border-b border-slate-50 transition-colors ${
                isActive ? 'pos-category-active' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {category.id === 'all' ? (
                <LayoutGrid className="w-5 h-5" aria-hidden />
              ) : (
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold uppercase text-pos-blue">
                  {category.label.slice(0, 2)}
                </span>
              )}
              <span className="text-xs leading-tight text-center line-clamp-2">{category.label}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
