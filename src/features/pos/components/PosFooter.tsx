import { DoorOpen, LifeBuoy, MessageSquare, Power } from 'lucide-react'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { useLogout } from '@/shared/hooks/useLogout'

export function PosFooter() {
  const { t } = useAppTranslation('pos')
  const { signOut } = useLogout()

  return (
    <footer className="pos-footer bg-pos-navy text-white h-12 flex items-center px-4 shrink-0 justify-between">
      <div className="flex items-center gap-6">
        <button type="button" className="flex items-center gap-2 text-sm hover:text-blue-300">
          <LifeBuoy className="w-4 h-4" aria-hidden />
          <span>{t('footer.help')}</span>
        </button>
        <div className="h-6 w-px bg-slate-700" />
        <button type="button" className="flex items-center gap-2 text-sm hover:text-blue-300">
          <MessageSquare className="w-4 h-4" aria-hidden />
          <span>{t('footer.notes')}</span>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex items-center gap-2 text-sm bg-slate-800 px-4 py-1.5 rounded hover:bg-slate-700 transition-colors"
        >
          <DoorOpen className="w-4 h-4" aria-hidden />
          <span>{t('footer.openDrawer')}</span>
        </button>
        <button
          type="button"
          onClick={() => void signOut()}
          className="p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
          aria-label={t('footer.power')}
        >
          <Power className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </footer>
  )
}
