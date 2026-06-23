import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { POS_STATUS_ITEMS } from '@/features/pos/constants/categories'

export function PosStatusBar() {
  const { t } = useAppTranslation('pos')

  return (
    <section className="pos-status-bar h-11 lg:h-14 flex items-center px-3 lg:px-4 gap-2 lg:gap-4 overflow-x-auto pos-hide-scrollbar shrink-0">
      {POS_STATUS_ITEMS.map((item, index) => {
        const Icon = item.icon
        const isGreen = item.tone === 'green'

        return (
          <div
            key={item.id}
            className={`flex items-center gap-2 px-4 min-w-fit ${
              index < POS_STATUS_ITEMS.length - 1 ? 'border-s border-slate-100' : ''
            }`}
          >
            <div className={`p-2 rounded-full ${isGreen ? 'pos-status-icon--ok' : 'pos-status-icon--info'}`}>
              <Icon className="w-4 h-4" aria-hidden />
            </div>
            <div className="text-[10px]">
              {t(item.labelKey)}
              <br />
              <span className={isGreen ? 'pos-status-value--ok' : 'pos-status-value--info'}>
                {t(`status.${item.statusKey}`)}
              </span>
            </div>
          </div>
        )
      })}
    </section>
  )
}
