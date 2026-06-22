export function parseAmount(value: string): number {
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatAmount(value: number): string {
  return value.toFixed(2)
}

export function clampQuantity(value: number, isScaleItem?: boolean): number {
  const min = isScaleItem ? 0.25 : 1
  return Math.max(min, value)
}

export function quantityStep(isScaleItem?: boolean): number {
  return isScaleItem ? 0.25 : 1
}

export function formatQuantity(value: number, isScaleItem?: boolean): string {
  return isScaleItem ? value.toFixed(3) : String(Math.round(value))
}
