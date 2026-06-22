import { Headphones, Info } from 'lucide-react'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

export function SiteFooter() {
  const { t } = useAppTranslation('layout')

  return (
    <footer className="absolute bottom-6 left-0 right-0 px-8 flex flex-col md:flex-row justify-between items-center gap-6 pointer-events-none md:pointer-events-auto">
      <div className="hidden md:flex items-center gap-10">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-slate-400" aria-hidden />
          <span className="text-xs text-slate-500">{t('footer.vision2030')}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="text-start">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('footer.supportTitle')}</p>
          <p className="text-[10px] text-slate-400">{t('footer.supportDescription')}</p>
        </div>
        <div className="w-10 h-10 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400">
          <Headphones className="h-5 w-5" aria-hidden />
        </div>
      </div>
    </footer>
  )
}
