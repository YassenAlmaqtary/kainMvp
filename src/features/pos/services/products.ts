import {
  callApi,
  isApiEnabled,
  mapProductLookupToPos,
  mapProductResponseToPos,
} from '@/api'
import type { ProductLookupDto, ProductResponseDto } from '@/api/types'
import { DEMO_POS_PRODUCTS } from '@/features/pos/constants/demoProducts'
import type { PosProduct } from '@/features/pos/types'

export async function fetchPosProducts(): Promise<PosProduct[]> {
  if (!isApiEnabled()) {
    return DEMO_POS_PRODUCTS
  }

  try {
    const products = await callApi<ProductResponseDto[]>('products.list')
    const active = products.filter((p) => p.status !== false)
    if (active.length > 0) {
      return active.map(mapProductResponseToPos)
    }
  } catch {
    // fall through to lookups
  }

  try {
    const lookups = await callApi<ProductLookupDto[]>('lookups.products')
    return lookups.map((item) => mapProductLookupToPos(item))
  } catch {
    return DEMO_POS_PRODUCTS
  }
}

export async function searchPosProducts(query: string): Promise<PosProduct[]> {
  if (!isApiEnabled()) {
    const q = query.trim().toLowerCase()
    return DEMO_POS_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku?.includes(q) || p.barcode?.includes(q),
    )
  }

  try {
    const results = await callApi<{ productId: number }[]>('products.search', { query: { q: query } })
    const ids = results.map((r) => r.productId)
    if (ids.length === 0) return []

    const all = await callApi<ProductResponseDto[]>('products.list')
    const byId = new Map(all.map((p) => [p.productId, p]))
    return ids
      .map((id) => byId.get(id))
      .filter((p): p is ProductResponseDto => p != null)
      .map(mapProductResponseToPos)
  } catch {
    const all = await fetchPosProducts()
    const q = query.trim().toLowerCase()
    return all.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku?.includes(q) || p.barcode?.includes(q),
    )
  }
}
