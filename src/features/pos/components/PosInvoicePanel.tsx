import { Asterisk, CreditCard, Delete, Eraser, FileText, Volume2 } from 'lucide-react'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { usePosCart } from '@/features/pos/context/PosCartContext'
import { KEYPAD_KEYS } from '@/features/pos/constants/categories'
import { formatAmount } from '@/shared/utils/format'

export function PosInvoicePanel() {
  const { t } = useAppTranslation('pos')
  const {
    subtotal,
    discounts,
    tax,
    grandTotal,
    paid,
    remaining,
    paymentMessage,
    handleKeypad,
    completePayment,
  } = usePosCart()

  const paymentFeedback =
    paymentMessage === 'success'
      ? t('invoice.paymentSuccess')
      : paymentMessage === 'insufficient'
        ? t('invoice.paymentInsufficient')
        : paymentMessage === 'empty'
          ? t('invoice.paymentEmpty')
          : null

  const renderKey = (key: (typeof KEYPAD_KEYS)[number][number]) => {
    const onClick = () => handleKeypad(key)

    if (key === 'backspace') {
      return (
        <button
          key={key}
          type="button"
          onClick={onClick}
          aria-label={t('keypad.backspace')}
          className="bg-pos-red text-white flex items-center justify-center rounded-lg h-full min-h-10 hover:bg-red-600"
        >
          <Delete className="w-6 h-6" aria-hidden />
        </button>
      )
    }
    if (key === 'clear') {
      return (
        <button
          key={key}
          type="button"
          onClick={onClick}
          aria-label={t('keypad.clear')}
          className="bg-pos-orange text-white flex items-center justify-center rounded-lg h-full min-h-10 hover:bg-orange-500"
        >
          <Eraser className="w-6 h-6" aria-hidden />
        </button>
      )
    }
    if (key === 'multiply') {
      return (
        <button
          key={key}
          type="button"
          onClick={onClick}
          aria-label={t('keypad.multiply')}
          className="bg-indigo-400 text-white flex items-center justify-center rounded-lg h-full min-h-10 hover:bg-indigo-500"
        >
          <Asterisk className="w-6 h-6" aria-hidden />
        </button>
      )
    }
    if (key === 'sound') {
      return (
        <button
          key={key}
          type="button"
          onClick={onClick}
          aria-label={t('keypad.sound')}
          className="bg-pos-blue text-white flex items-center justify-center rounded-lg h-full min-h-10 hover:bg-blue-500"
        >
          <Volume2 className="w-6 h-6" aria-hidden />
        </button>
      )
    }

    return (
      <button
        key={key}
        type="button"
        onClick={onClick}
        className="bg-slate-700 text-white font-bold text-base lg:text-xl rounded-lg h-full min-h-9 lg:min-h-10 hover:bg-slate-600"
      >
        {key}
      </button>
    )
  }

  return (
    <aside className="pos-sidebar-right bg-white border-s border-pos-border flex flex-col p-2 sm:p-3 lg:p-4 shadow-[-5px_0_15px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="shrink-0 mb-2 lg:mb-3">
        <div className="flex items-center gap-2 mb-1.5 lg:mb-2">
          <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-pos-blue shrink-0" aria-hidden />
          <h2 className="font-bold text-sm lg:text-base text-pos-blue">{t('invoice.title')}</h2>
        </div>
        <div className="pos-invoice-summary text-xs lg:text-sm">
          <div className="hidden sm:flex justify-between">
            <span className="text-slate-500">{t('invoice.subtotal')}</span>
            <span className="font-bold">{formatAmount(subtotal)}</span>
          </div>
          <div className="hidden sm:flex justify-between">
            <span className="text-slate-500">{t('invoice.discounts')}</span>
            <span className="font-bold">{formatAmount(discounts)}</span>
          </div>
          <div className="hidden sm:flex justify-between">
            <span className="text-slate-500">{t('invoice.tax')}</span>
            <span className="font-bold">{formatAmount(tax)}</span>
          </div>
          <div className="pos-invoice-summary-total pt-1 sm:pt-2 lg:pt-3 border-t border-dashed sm:border-t-2 border-slate-100">
            <div className="text-[10px] text-slate-500 mb-0.5 lg:mb-1">{t('invoice.grandTotal')}</div>
            <div className="flex justify-between items-end">
              <span className="text-xl lg:text-2xl font-black text-pos-blue">{formatAmount(grandTotal)}</span>
              <span className="text-base lg:text-lg font-bold text-pos-blue ms-1">{t('invoice.currency')}</span>
            </div>
          </div>
          <div className="flex justify-between text-pos-green">
            <span>{t('invoice.paid')}</span>
            <span className="font-bold">{formatAmount(paid)}</span>
          </div>
          <div className="flex justify-between text-pos-red">
            <span>{t('invoice.remaining')}</span>
            <span className="font-bold">{formatAmount(remaining)}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={completePayment}
        className="pos-pay-btn w-full text-white py-2.5 lg:py-3 rounded-xl flex items-center justify-center gap-2 lg:gap-3 shadow-lg shadow-green-100 transition-colors mb-2 lg:mb-3 shrink-0"
      >
        <span className="text-lg lg:text-2xl font-bold">{t('invoice.pay')}</span>
        <CreditCard className="w-6 h-6 lg:w-8 lg:h-8" aria-hidden />
      </button>

      {paymentFeedback ? (
        <p
          className={`text-xs text-center mb-2 lg:mb-3 shrink-0 ${paymentMessage === 'success' ? 'text-pos-green' : 'text-pos-red'}`}
          role="status"
        >
          {paymentFeedback}
        </p>
      ) : null}

      <div className="pos-keypad-grid grid grid-cols-4 grid-rows-4 gap-1 lg:gap-1.5">
        {KEYPAD_KEYS.flat().map((key) => renderKey(key))}
      </div>
    </aside>
  )
}
