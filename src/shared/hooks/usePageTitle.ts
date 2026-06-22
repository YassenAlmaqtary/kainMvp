import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { PageKey } from '@/shared/i18n/namespaces'

export function usePageTitle(page: PageKey) {
  const { t, i18n } = useTranslation('layout')

  useEffect(() => {
    document.title = t(`pages.${page}.title`)
  }, [page, i18n.language, t])
}
