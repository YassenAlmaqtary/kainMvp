import { PRODUCT_IMAGES } from '@/features/pos/constants/data'
import type { PosProduct } from '@/features/pos/types'

export const DEMO_POS_PRODUCTS: PosProduct[] = [
  {
    id: 100234,
    name: 'أرز بسمتي 5 كجم',
    sku: '100234',
    price: 38,
    groupName: 'dryFood',
    imageUrl: PRODUCT_IMAGES.rice,
    unitName: 'piece',
    isScaleItem: false,
  },
  {
    id: 100235,
    name: 'سكر 1 كجم',
    sku: '100235',
    price: 25,
    groupName: 'dryFood',
    imageUrl: PRODUCT_IMAGES.sugar,
    unitName: 'piece',
    isScaleItem: false,
  },
  {
    id: 100236,
    name: 'موز',
    sku: '100236',
    price: 7,
    groupName: 'fresh',
    imageUrl: PRODUCT_IMAGES.banana,
    unitName: 'kg',
    isScaleItem: true,
  },
]
