import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import type { PageKey } from '@/shared/i18n/namespaces'

interface ComingSoonPageProps {
  page: PageKey
}

export function ComingSoonPage({ page }: ComingSoonPageProps) {
  const { t } = useAppTranslation('common')
  const { t: tLayout } = useAppTranslation('layout')
  usePageTitle(page)

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
        {tLayout(`pages.${page}.title`)}
      </h1>
      <p className="text-slate-500 mb-8">{t('comingSoon.description')}</p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-kayan-blue text-white rounded-xl font-medium hover:bg-kayan-dark-blue transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        {t('comingSoon.backToDashboard')}
      </Link>
    </main>
  )
}
