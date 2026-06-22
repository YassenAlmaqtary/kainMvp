import { useMemo, useState } from 'react'
import { PosCategorySidebar } from '@/features/pos/components/PosCategorySidebar'
import { PosFooter } from '@/features/pos/components/PosFooter'
import { PosHeader } from '@/features/pos/components/PosHeader'
import { PosInvoicePanel } from '@/features/pos/components/PosInvoicePanel'
import { PosMainPanel } from '@/features/pos/components/PosMainPanel'
import { deriveProductGroups } from '@/features/pos/components/PosProductGrid'
import { PosStatusBar } from '@/features/pos/components/PosStatusBar'
import { PosCartProvider } from '@/features/pos/context/PosCartContext'
import { usePosProducts } from '@/features/pos/hooks/usePosProducts'
import { usePageTitle } from '@/shared/hooks/usePageTitle'

function PosPageContent() {
  usePageTitle('pos')
  const { products, isLoading } = usePosProducts()
  const [categoryId, setCategoryId] = useState('all')
  const apiGroups = useMemo(() => deriveProductGroups(products), [products])

  return (
    <>
      <PosHeader />
      <PosStatusBar />
      <div className="pos-main-container">
        <PosCategorySidebar activeId={categoryId} onSelect={setCategoryId} apiGroups={apiGroups} />
        <PosMainPanel products={products} productsLoading={isLoading} categoryId={categoryId} />
        <PosInvoicePanel />
      </div>
      <PosFooter />
    </>
  )
}

export function PosPage() {
  return (
    <PosCartProvider>
      <PosPageContent />
    </PosCartProvider>
  )
}
