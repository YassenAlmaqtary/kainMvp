import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { IMAGES } from '@/features/auth/constants/features'

export function DashboardPreview() {
  const { t } = useAppTranslation('marketing')

  return (
    <div className="relative w-full h-80 mt-10 hidden md:block">
      <img
        alt={t('images.dashboardAlt')}
        className="dashboard-preview absolute end-0 top-0 w-4/5 rounded-2xl border-8 border-white dark:border-slate-700 object-cover object-left-top h-96 rtl:object-left-top ltr:object-right-top"
        src={IMAGES.dashboard}
        loading="lazy"
      />
      <img
        alt={t('images.mobileAlt')}
        className="mobile-preview absolute end-[60%] top-20 w-1/4 rounded-3xl border-8 border-white dark:border-slate-700 object-cover object-center h-80"
        src={IMAGES.mobile}
        loading="lazy"
      />
    </div>
  )
}
