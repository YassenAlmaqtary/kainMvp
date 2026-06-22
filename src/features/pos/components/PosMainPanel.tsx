import { ChevronDown, MoreVertical, Scale, ShoppingCart, Trash2, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  filterProductsByCategory,
  PosCatalogSearch,
  PosProductGrid,
} from '@/features/pos/components/PosProductGrid'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { usePosCart } from '@/features/pos/context/PosCartContext'
import { POS_PRODUCT_PLACEHOLDER } from '@/features/pos/constants/assets'
import { POS_QUICK_ACTIONS } from '@/features/pos/constants/categories'
import type { PosCartItem, PosProduct } from '@/features/pos/types'
import { cn } from '@/shared/utils/cn'

function QuantityControl({
  item,
  onIncrease,
  onDecrease,
}: {
  item: PosCartItem
  onIncrease: () => void
  onDecrease: () => void
}) {
  const { t } = useAppTranslation('pos')

  return (
    <div className="flex items-center border rounded overflow-hidden w-24 h-8 mx-auto">
      <button type="button" onClick={onIncrease} className="w-1/3 bg-slate-50 hover:bg-slate-100 h-full">
        +
      </button>
      <input
        className={cn(
          'w-1/3 border-x border-slate-100 text-center p-0 focus:ring-0 focus:outline-none bg-white',
          item.isScaleItem ? 'text-xs' : 'text-sm',
        )}
        value={item.quantity}
        readOnly
        aria-label={t('cart.columns.quantity')}
      />
      <button type="button" onClick={onDecrease} className="w-1/3 bg-slate-50 hover:bg-slate-100 h-full">
        -
      </button>
    </div>
  )
}

function CartRow({
  item,
  onIncrease,
  onDecrease,
}: {
  item: PosCartItem
  onIncrease: () => void
  onDecrease: () => void
}) {
  const { t } = useAppTranslation('pos')

  return (
    <tr className="hover:bg-slate-50">
      <td className="p-3 text-slate-400">{item.index}</td>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <img
            alt=""
            className="w-10 h-10 rounded border object-cover shrink-0"
            src={item.imageUrl ?? POS_PRODUCT_PLACEHOLDER}
          />
          <div className="min-w-0">
            <div className="font-bold truncate">{item.name}</div>
            {item.sku ? <div className="text-[10px] text-slate-400">{t('cart.itemCode', { code: item.sku })}</div> : null}
            {item.weight ? <div className="text-[10px] text-green-600">{t('cart.weight', { value: item.weight })}</div> : null}
          </div>
        </div>
      </td>
      <td className="p-3">
        <QuantityControl item={item} onIncrease={onIncrease} onDecrease={onDecrease} />
      </td>
      <td className="p-3 text-center">{item.unitName ?? t(`cart.units.${item.unitKey}`)}</td>
      <td className="p-3 text-center">{item.price}</td>
      <td className="p-3 text-center">{item.discount}</td>
      <td className="p-3 text-center font-bold">{item.total}</td>
      <td className="p-3 text-center">
        {item.isScaleItem ? (
          <Scale className="w-4 h-4 text-slate-400 inline" aria-hidden />
        ) : (
          <MoreVertical className="w-4 h-4 text-slate-300 inline" aria-hidden />
        )}
      </td>
    </tr>
  )
}

const actionVariants = {
  default: 'bg-white border border-pos-border text-pos-blue hover:bg-blue-50',
  primary: 'bg-blue-50 border border-pos-blue text-pos-blue',
  danger: 'bg-red-50 border border-pos-red/30 text-pos-red',
  warning: 'bg-white border border-pos-border text-orange-500',
}

interface PosMainPanelProps {
  products: PosProduct[]
  productsLoading?: boolean
  categoryId: string
}

export function PosMainPanel({ products, productsLoading, categoryId }: PosMainPanelProps) {
  const { t } = useAppTranslation('pos')
  const { items, itemCount, totalQuantity, updateQuantity, clearCart, addProduct } = usePosCart()
  const [search, setSearch] = useState('')

  const catalogProducts = useMemo(() => {
    const byCategory = filterProductsByCategory(products, categoryId)
    if (!search.trim()) return byCategory
    const q = search.trim().toLowerCase()
    return byCategory.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.barcode?.includes(search.trim()),
    )
  }, [products, categoryId, search])

  const filteredCartItems = items.filter((item) => {
    if (!search.trim()) return true
    const q = search.trim().toLowerCase()
    return item.name.toLowerCase().includes(q) || item.sku?.includes(search.trim())
  })

  const handleScanSubmit = () => {
    const q = search.trim()
    if (!q) return
    const match =
      products.find((p) => p.barcode === q || p.sku === q) ??
      products.find((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    if (match) {
      addProduct(match)
      setSearch('')
    }
  }

  return (
    <main className="pos-content-middle p-4 gap-4">
      <PosCatalogSearch
        value={search}
        onChange={setSearch}
        onScanSubmit={handleScanSubmit}
        resultCount={catalogProducts.length}
      />

      <div className="flex gap-2 shrink-0 -mt-2">
        <button
          type="button"
          onClick={handleScanSubmit}
          className="bg-blue-50 text-pos-blue border border-pos-blue px-4 py-2 rounded-lg flex items-center gap-2 font-bold shrink-0 h-10 text-sm"
        >
          <Zap className="w-4 h-4" aria-hidden />
          {t('search.quickProduct')}
        </button>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm border border-pos-border flex flex-col overflow-hidden min-h-0">
        <div className="pos-cart-header p-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" aria-hidden />
            <span className="font-bold">{t('cart.title', { count: itemCount })}</span>
          </div>
          <ChevronDown className="w-5 h-5 opacity-80" aria-hidden />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredCartItems.length === 0 ? (
            <p className="p-8 text-center text-slate-400 text-sm">{t('cart.empty')}</p>
          ) : (
            <table className="w-full text-sm text-end">
              <thead className="bg-slate-50 text-slate-500 sticky top-0 z-10">
                <tr>
                  <th className="p-3 font-medium text-start">{t('cart.columns.index')}</th>
                  <th className="p-3 font-medium text-start">{t('cart.columns.item')}</th>
                  <th className="p-3 font-medium text-center">{t('cart.columns.quantity')}</th>
                  <th className="p-3 font-medium text-center">{t('cart.columns.unit')}</th>
                  <th className="p-3 font-medium text-center">{t('cart.columns.price')}</th>
                  <th className="p-3 font-medium text-center">{t('cart.columns.discount')}</th>
                  <th className="p-3 font-medium text-center">{t('cart.columns.total')}</th>
                  <th className="p-3 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCartItems.map((item) => (
                  <CartRow
                    key={item.id}
                    item={item}
                    onIncrease={() => updateQuantity(item.id, 1)}
                    onDecrease={() => updateQuantity(item.id, -1)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-pos-border flex justify-between items-center gap-4 shrink-0">
          <div className="text-xs text-slate-500">
            {t('cart.summary', {
              items: itemCount,
              quantity: totalQuantity,
            })}
          </div>
          <button
            type="button"
            onClick={clearCart}
            disabled={items.length === 0}
            className="text-pos-red border border-pos-red/20 px-3 py-1 rounded-md text-xs font-bold hover:bg-red-50 flex items-center gap-1 shrink-0 disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden />
            {t('cart.clear')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 shrink-0">
        {POS_QUICK_ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              type="button"
              className={cn('pos-action-grid-btn rounded-lg border', actionVariants[action.variant])}
            >
              <Icon className="w-6 h-6 mb-1" aria-hidden />
              <span className="text-[10px] font-bold leading-tight">{t(action.labelKey)}</span>
            </button>
          )
        })}
      </div>

      <PosProductGrid
        products={catalogProducts}
        isLoading={productsLoading}
        onSelect={addProduct}
      />
    </main>
  )
}
