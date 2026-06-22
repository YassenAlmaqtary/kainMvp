export interface PosProduct {
  id: number
  name: string
  sku?: string
  barcode?: string
  price: number
  groupName?: string
  imageUrl?: string
  unitName?: string
  isScaleItem: boolean
}

export interface PosCartItem {
  id: string
  index: number
  productId?: number
  name: string
  imageUrl?: string
  quantity: string
  unitKey: 'piece' | 'kg'
  unitName?: string
  price: string
  discount: string
  total: string
  sku?: string
  weight?: string
  isScaleItem?: boolean
}
