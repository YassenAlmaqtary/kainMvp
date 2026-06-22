import type { ProductLookupDto, ProductResponseDto } from '@/api/types'
import type { PosProduct } from '@/features/pos/types'

const SCALE_UNIT_PATTERN = /كilo|kilogram|kg|كجم|جرام|gram|weight|وزن/i

function isScaleUnit(unitName?: string | null): boolean {
  if (!unitName) return false
  return SCALE_UNIT_PATTERN.test(unitName)
}

function pickSalesUnit(product: ProductResponseDto) {
  const units = product.units ?? []
  return units.find((u) => u.isSalesUnit) ?? units.find((u) => u.isBaseUnit) ?? units[0]
}

export function mapProductResponseToPos(product: ProductResponseDto): PosProduct {
  const salesUnit = pickSalesUnit(product)
  const unitName = salesUnit?.unitName ?? undefined
  const scale = isScaleUnit(unitName)
  const productId = product.productId ?? 0

  return {
    id: productId,
    name: product.productName?.trim() || `Product #${productId}`,
    sku: product.proCode ?? undefined,
    barcode: salesUnit?.barcode ?? undefined,
    price: product.defaultSalesPrice ?? 0,
    groupName: product.groupName ?? undefined,
    imageUrl: product.productImage ?? undefined,
    unitName,
    isScaleItem: scale,
  }
}

export function mapProductLookupToPos(lookup: ProductLookupDto, price = 0): PosProduct {
  const id = lookup.id ?? 0
  return {
    id,
    name: lookup.name?.trim() || `Product #${id}`,
    barcode: lookup.barcode ?? undefined,
    price,
    isScaleItem: false,
  }
}
