import type { FeatureItem } from '@/features/auth/constants/features'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

interface FeatureCardProps {
  feature: FeatureItem
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const { t } = useAppTranslation('marketing')
  const Icon = feature.icon

  return (
    <div className="feature-card p-4 rounded-2xl text-center">
      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-kayan-blue rounded-lg flex items-center justify-center mx-auto mb-3">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
        {t(`features.${feature.id}.title`)}
      </h3>
      <p className="text-xs text-slate-400 mt-1">{t(`features.${feature.id}.description`)}</p>
    </div>
  )
}
