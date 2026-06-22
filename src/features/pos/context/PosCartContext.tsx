import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { INITIAL_CART_ITEMS } from '@/features/pos/constants/data'
import { POS_PRODUCT_PLACEHOLDER } from '@/features/pos/constants/assets'
import type { PosCartItem, PosProduct } from '@/features/pos/types'
import { clampQuantity, formatAmount, formatQuantity, parseAmount, quantityStep } from '@/shared/utils/format'

const TAX_RATE = 0.15

interface PosCartContextValue {
  items: PosCartItem[]
  paidAmount: string
  itemCount: number
  totalQuantity: string
  subtotal: number
  discounts: number
  tax: number
  grandTotal: number
  paid: number
  remaining: number
  paymentMessage: string | null
  updateQuantity: (id: string, direction: 1 | -1) => void
  addProduct: (product: PosProduct) => void
  clearCart: () => void
  handleKeypad: (key: string) => void
  completePayment: () => void
}

const PosCartContext = createContext<PosCartContextValue | null>(null)

function computeLineTotal(item: PosCartItem): PosCartItem {
  const qty = parseAmount(item.quantity)
  const lineTotal = qty * parseAmount(item.price) - parseAmount(item.discount)
  return { ...item, total: formatAmount(Math.max(0, lineTotal)) }
}

function computeCartMetrics(items: PosCartItem[]) {
  const lines = items.map(computeLineTotal)
  const subtotal = lines.reduce((sum, item) => sum + parseAmount(item.total), 0)
  const discounts = lines.reduce((sum, item) => sum + parseAmount(item.discount), 0)
  const tax = subtotal * TAX_RATE
  const grandTotal = subtotal + tax
  const itemCount = lines.length
  const totalQuantity = lines
    .reduce((sum, item) => sum + parseAmount(item.quantity), 0)
    .toFixed(2)

  return { lines, subtotal, discounts, tax, grandTotal, itemCount, totalQuantity }
}

function productToCartItem(product: PosProduct, index: number): PosCartItem {
  const isScale = product.isScaleItem
  const quantity = isScale ? '1.000' : '1'
  const unitKey = isScale ? 'kg' : 'piece'

  return computeLineTotal({
    id: `${product.id}-${Date.now()}`,
    index,
    productId: product.id,
    name: product.name,
    imageUrl: product.imageUrl ?? POS_PRODUCT_PLACEHOLDER,
    quantity,
    unitKey,
    unitName: product.unitName,
    price: formatAmount(product.price),
    discount: '0.00',
    total: formatAmount(product.price),
    sku: product.sku,
    weight: isScale ? quantity : undefined,
    isScaleItem: isScale,
  })
}

export function PosCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState(INITIAL_CART_ITEMS)
  const [paidAmount, setPaidAmount] = useState('0.00')
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null)

  const metrics = useMemo(() => computeCartMetrics(items), [items])
  const paid = parseAmount(paidAmount)
  const remaining = Math.max(0, metrics.grandTotal - paid)

  const reindex = (list: PosCartItem[]) => list.map((item, i) => ({ ...item, index: i + 1 }))

  const addProduct = useCallback((product: PosProduct) => {
    setPaymentMessage(null)
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id && !item.isScaleItem)
      if (existing) {
        return reindex(
          prev.map((item) => {
            if (item.id !== existing.id) return item
            const step = quantityStep(item.isScaleItem)
            const nextQty = parseAmount(item.quantity) + step
            return computeLineTotal({
              ...item,
              quantity: formatQuantity(nextQty, item.isScaleItem),
            })
          }),
        )
      }
      return reindex([...prev, productToCartItem(product, prev.length + 1)])
    })
  }, [])

  const updateQuantity = useCallback((id: string, direction: 1 | -1) => {
    setPaymentMessage(null)
    setItems((prev) =>
      reindex(
        prev
          .map((item) => {
            if (item.id !== id) return item
            const step = quantityStep(item.isScaleItem)
            const nextQty = clampQuantity(parseAmount(item.quantity) + direction * step, item.isScaleItem)
            if (nextQty <= 0) return null
            const quantity = formatQuantity(nextQty, item.isScaleItem)
            const updated = { ...item, quantity }
            if (item.isScaleItem && item.weight) {
              updated.weight = quantity
            }
            return computeLineTotal(updated)
          })
          .filter((item): item is PosCartItem => item != null),
      ),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setPaidAmount('0.00')
    setPaymentMessage(null)
  }, [])

  const handleKeypad = useCallback((key: string) => {
    setPaymentMessage(null)

    if (key === 'backspace') {
      setPaidAmount((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)))
      return
    }

    if (key === 'clear') {
      setPaidAmount('0.00')
      return
    }

    if (key === 'multiply' || key === 'sound') return

    setPaidAmount((prev) => {
      const base = prev === '0.00' || prev === '0' ? '' : prev.replace(/\.00$/, '')
      const next = `${base}${key}`
      if (!/^\d*\.?\d{0,2}$/.test(next)) return prev
      return next || '0'
    })
  }, [])

  const completePayment = useCallback(() => {
    if (items.length === 0) {
      setPaymentMessage('empty')
      return
    }
    if (paid < metrics.grandTotal) {
      setPaymentMessage('insufficient')
      return
    }
    setPaymentMessage('success')
    setItems([])
    setPaidAmount('0.00')
  }, [items.length, metrics.grandTotal, paid])

  useEffect(() => {
    if (!paymentMessage) return
    const timer = setTimeout(() => setPaymentMessage(null), 3000)
    return () => clearTimeout(timer)
  }, [paymentMessage])

  const value = useMemo(
    () => ({
      items: metrics.lines,
      paidAmount,
      itemCount: metrics.itemCount,
      totalQuantity: metrics.totalQuantity,
      subtotal: metrics.subtotal,
      discounts: metrics.discounts,
      tax: metrics.tax,
      grandTotal: metrics.grandTotal,
      paid,
      remaining,
      paymentMessage,
      updateQuantity,
      addProduct,
      clearCart,
      handleKeypad,
      completePayment,
    }),
    [
      metrics,
      paidAmount,
      paid,
      remaining,
      paymentMessage,
      updateQuantity,
      addProduct,
      clearCart,
      handleKeypad,
      completePayment,
    ],
  )

  return <PosCartContext.Provider value={value}>{children}</PosCartContext.Provider>
}

export function usePosCart() {
  const context = useContext(PosCartContext)
  if (!context) throw new Error('usePosCart must be used within PosCartProvider')
  return context
}
