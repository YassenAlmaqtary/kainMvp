import type { LucideIcon } from 'lucide-react'
import {
  Barcode,
  Box,
  Coffee,
  Container,
  Home,
  LayoutGrid,
  Leaf,
  MoreHorizontal,
  Percent,
  Printer,
  RotateCcw,
  Scale,
  Scan,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Sparkles,
  SprayCan,
  Star,
  Tag,
  Ticket,
  User,
  Wallet,
  Wifi,
} from 'lucide-react'

export interface PosCategory {
  id: string
  icon: LucideIcon
  labelKey: string
}

export const POS_CATEGORIES: PosCategory[] = [
  { id: 'all', icon: LayoutGrid, labelKey: 'categories.all' },
  { id: 'drinks', icon: Coffee, labelKey: 'categories.drinks' },
  { id: 'dryFood', icon: Box, labelKey: 'categories.dryFood' },
  { id: 'fresh', icon: Leaf, labelKey: 'categories.fresh' },
  { id: 'dairy', icon: Container, labelKey: 'categories.dairy' },
  { id: 'frozen', icon: Snowflake, labelKey: 'categories.frozen' },
  { id: 'cleaning', icon: SprayCan, labelKey: 'categories.cleaning' },
  { id: 'personalCare', icon: Sparkles, labelKey: 'categories.personalCare' },
  { id: 'household', icon: Home, labelKey: 'categories.household' },
  { id: 'more', icon: MoreHorizontal, labelKey: 'categories.more' },
]

export interface PosStatusItem {
  id: string
  icon: LucideIcon
  labelKey: string
  statusKey: 'connected' | 'open'
  tone: 'green' | 'blue'
}

export const POS_STATUS_ITEMS: PosStatusItem[] = [
  { id: 'zatca', icon: ShieldCheck, labelKey: 'status.zatca', statusKey: 'connected', tone: 'green' },
  { id: 'connection', icon: Wifi, labelKey: 'status.connection', statusKey: 'connected', tone: 'green' },
  { id: 'printer', icon: Printer, labelKey: 'status.printer', statusKey: 'connected', tone: 'green' },
  { id: 'scale', icon: Scale, labelKey: 'status.scale', statusKey: 'connected', tone: 'green' },
  { id: 'cashDrawer', icon: Wallet, labelKey: 'status.cashDrawer', statusKey: 'open', tone: 'blue' },
  { id: 'scanner', icon: Scan, labelKey: 'status.scanner', statusKey: 'connected', tone: 'green' },
]

export interface PosQuickAction {
  id: string
  icon: LucideIcon
  labelKey: string
  variant: 'default' | 'primary' | 'danger' | 'warning'
}

export const POS_QUICK_ACTIONS: PosQuickAction[] = [
  { id: 'coupon', icon: Ticket, labelKey: 'quickActions.coupon', variant: 'default' },
  { id: 'reprint', icon: Printer, labelKey: 'quickActions.reprint', variant: 'primary' },
  { id: 'changePrice', icon: Tag, labelKey: 'quickActions.changePrice', variant: 'primary' },
  { id: 'discount', icon: Percent, labelKey: 'quickActions.discount', variant: 'warning' },
  { id: 'customer', icon: User, labelKey: 'quickActions.customer', variant: 'primary' },
  { id: 'return', icon: RotateCcw, labelKey: 'quickActions.return', variant: 'danger' },
  { id: 'recall', icon: ShoppingCart, labelKey: 'quickActions.recall', variant: 'primary' },
]

export const POS_QUICK_CATEGORIES = [
  { id: 'fastItems', emoji: null as string | null, icon: Star, labelKey: 'quickCategories.fastItems' },
  { id: 'noBarcode', emoji: null, icon: Barcode, labelKey: 'quickCategories.noBarcode' },
  { id: 'meat', emoji: '🥩', icon: null as LucideIcon | null, labelKey: 'quickCategories.meat' },
  { id: 'bakery', emoji: '🍞', icon: null, labelKey: 'quickCategories.bakery' },
  { id: 'fruits', emoji: '🍎', icon: null, labelKey: 'quickCategories.fruits' },
  { id: 'vegetables', emoji: '🥦', icon: null, labelKey: 'quickCategories.vegetables' },
  { id: 'eggs', emoji: '🥚', icon: null, labelKey: 'quickCategories.eggs' },
]

export const KEYPAD_KEYS = [
  ['7', '8', '9', 'backspace'],
  ['4', '5', '6', 'clear'],
  ['1', '2', '3', 'multiply'],
  ['0', '00', '.', 'sound'],
] as const
