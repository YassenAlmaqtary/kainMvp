export const PRODUCT_IMAGES = {
  rice: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLi-0uD46Lg7e6NgjZ8Qa6QCO6qmgQyzBtQWrvzaV0MZEiQ0MK_KwBDlEulsil2SXDolvetKBLn-Bie0C6RDudOmzAzWFe2TmMm2ZDyjxpgOdAwST_hS2ogx-9oXbFwtsDJEwjG9c3fpB-xczz0vFZJ2dWuT0KP7zWR0Cs8f_JkikZzwFggra-8shkrhSXDz0MGZ9mCvVW6ACq8KctrXeglXxLZ2gZomN1zuLCDC3mllqd7SPoEF3ufwiThN8B021uNnMIZgwtAzUR',
  sugar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADUWUyEA_AYe0YpZdmATFXJP1NJItphnxcxSmRE7WnmC6vx6HKV7xeFfg9h7sk6wLTM7kU8nQxkPTbmsnTW9O0zG7GYmhI2hDZeQmB2lgRIWktQXhX6yUvRke4HKnh0dMsllvKelTJtluv0JtxZ-B8hp-Y1ytkuxnzqXYHnNJeFVBkVQOUeHv687f2g732_-pFlQWrapwXLHNz9_LgIoxJJJwtT-hRBdaW7DpFCAWUrfU0hEJgGK2DyFlm-wYKAfmXsh7nXgCOKHwV',
  banana: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP2oHaxj6kS1uB9Xg-sx-QVmtiSs051SshXuvelbfVAEMk0rckI_2YOEPrLd2qzBzgB-gT0HwoQv4f7YAumSo51wGttwZafoBQgxI4oC8j7f4TuVPJrXVaY99n6Lz6fkIjTKhr7ASFb6VbDcpq-R4kYEKQm_QOHy18CGGweofdw4hXE4FA6nsZX94xdWXJn_TJUv2R1DXKQprY9TGEF-Y3FPq_Dw7XrIEENeT7Jyi5JITjHNx-vJVJNGqvmkOIphRbraI58KDVBN-R',
} as const

export const POS_LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA9IrahngHa9BkBte29uSF8CTATcylW_N0yLViF5BR8YQwhG7tpfuxg27MNPFNmirU6wmqg71onuMiIEifuMCooF1RbnqjZSRn3aA_AcTj51Fp6s2WvDMr7Ko2Kwv07JMOsMR_yXgJcC6YasXdCSigbHIkz2W0f1-U5TvjDYZOMSrBfWPMBC4S1rqGQC4JKgX9UPyZLrqm-f5q_clxusSCPc4TSjCAFy3iT8WfL7uG0napplTpSp1KkQlTXkbvdkm7pYQkY1MFH37dk'

import type { PosCartItem } from '@/features/pos/types'

export const INITIAL_CART_ITEMS: PosCartItem[] = [
  {
    id: '1',
    index: 1,
    productId: 100234,
    name: 'أرز بسمتي 5 كجم',
    imageUrl: PRODUCT_IMAGES.rice,
    quantity: '2',
    unitKey: 'piece',
    price: '38.00',
    discount: '0.00',
    total: '76.00',
    sku: '100234',
  },
  {
    id: '2',
    index: 2,
    productId: 100235,
    name: 'سكر 1 كجم',
    imageUrl: PRODUCT_IMAGES.sugar,
    quantity: '1',
    unitKey: 'piece',
    price: '25.00',
    discount: '0.00',
    total: '25.00',
  },
  {
    id: '3',
    index: 5,
    productId: 100236,
    name: 'موز',
    imageUrl: PRODUCT_IMAGES.banana,
    quantity: '1.250',
    unitKey: 'kg',
    price: '7.00',
    discount: '0.00',
    total: '8.75',
    weight: '1.250',
    isScaleItem: true,
  },
]
