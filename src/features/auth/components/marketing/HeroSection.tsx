import { Shield } from 'lucide-react'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { Logo } from '@/shared/ui/Logo'
import { FeatureGrid } from './FeatureGrid'
import { DashboardPreview } from './DashboardPreview'

export function HeroSection() {
  const { t } = useAppTranslation('marketing')
  const { t: tCommon } = useAppTranslation('common')

  return (
    <section
      className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-between relative overflow-hidden"
      aria-label={t('hero.ariaLabel')}
    >
      <div className="mb-12">
        <Logo size="md" />
      </div>

      <div className="z-10 text-center md:text-start">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-slate-900 dark:text-white">
          <span className="text-kayan-blue">{tCommon('brandName')}</span>
          <br />
          {t('hero.headline')}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl md:me-auto mb-12 leading-relaxed">
          {t('hero.description')}
        </p>

        <FeatureGrid />
        <DashboardPreview />
      </div>

      <div className="mt-auto pt-20 flex flex-wrap gap-8 items-center text-xs text-slate-500 z-10">
        <div>{t('hero.copyright', { year: new Date().getFullYear() })}</div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
            <Shield className="h-4 w-4 text-kayan-blue" aria-hidden />
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-200">{t('hero.securityTitle')}</p>
            <p>{t('hero.securityDescription')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
