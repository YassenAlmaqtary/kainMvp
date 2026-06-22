import { Building2, Droplets, Sun, Wind } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'
import { DASHBOARD_HERO_IMAGE } from '@/features/dashboard/constants/data'
import { useAuth } from '@/shared/context/AuthContext'
import { useAppTranslation, useLanguage } from '@/shared/hooks/useLanguage'

function formatHeroDateTime(language: string) {
  const now = new Date()
  const date = new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now)
  const time = new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now)
  return { date, time }
}

export function DashboardHero() {
  const { t } = useAppTranslation('dashboard')
  const { user } = useAuth()
  const { language } = useLanguage()
  const [datetime, setDatetime] = useState(() => formatHeroDateTime(language))

  useEffect(() => {
    setDatetime(formatHeroDateTime(language))
    const interval = setInterval(() => setDatetime(formatHeroDateTime(language)), 60_000)
    return () => clearInterval(interval)
  }, [language])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      <div
        className="lg:col-span-9 dashboard-hero rounded-2xl min-h-52 lg:h-64 relative overflow-hidden flex items-center px-6 lg:ps-12 border border-slate-200 dark:border-slate-700 shadow-sm"
        style={{ '--dashboard-hero-image': `url('${DASHBOARD_HERO_IMAGE}')` } as CSSProperties}
      >
        <div className="z-10 max-w-lg">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-2">
            {t('hero.greeting', { name: user?.name ?? '' })}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm lg:text-base">
            {t('hero.datetime', { date: datetime.date, time: datetime.time })}
          </p>
          <div className="flex items-center gap-2 text-kayan-erp-dark dark:text-blue-300 font-medium bg-white/60 dark:bg-slate-900/60 backdrop-blur px-4 py-2 rounded-full inline-flex text-sm">
            <Building2 className="w-5 h-5 shrink-0" aria-hidden />
            <span>{t('hero.location')}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 dashboard-card p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white">32°</h3>
            <p className="text-slate-500 text-sm">{t('weather.city')}</p>
            <p className="text-slate-500 text-sm">{t('weather.condition')}</p>
          </div>
          <Sun className="w-14 h-14 lg:w-16 lg:h-16 text-amber-400" aria-hidden />
        </div>
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3" aria-hidden />
              <span>{t('weather.humidity', { value: 45 })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3" aria-hidden />
              <span>{t('weather.wind', { value: 15 })}</span>
            </div>
          </div>
          <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-amber-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
