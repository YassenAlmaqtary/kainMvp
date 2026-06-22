import { Loader2, X } from 'lucide-react'
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import type { CustomerGroupDto, SalesmanDto } from '@/api/types'
import type { CustomerFormValues } from '@/features/crm/types'
import { EMPTY_CUSTOMER_FORM } from '@/features/crm/types'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

interface ModalShellProps {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

function ModalShell({ title, onClose, children, footer }: ModalShellProps) {
  const { t } = useAppTranslation('crm')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label={t('form.close')}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="customer-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col dashboard-card shadow-xl"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 id="customer-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
            aria-label={t('form.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 dashboard-custom-scrollbar">{children}</div>
        {footer ? (
          <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const fieldClass =
  'w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-kayan-erp-blue/30'

interface CustomerFormModalProps {
  mode: 'create' | 'edit'
  initialValues?: CustomerFormValues
  groups: CustomerGroupDto[]
  salesmen: SalesmanDto[]
  isSubmitting?: boolean
  errorMessage?: string | null
  onClose: () => void
  onSubmit: (values: CustomerFormValues) => void
}

export function CustomerFormModal({
  mode,
  initialValues,
  groups,
  salesmen,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: CustomerFormModalProps) {
  const { t } = useAppTranslation('crm')
  const [form, setForm] = useState<CustomerFormValues>(initialValues ?? EMPTY_CUSTOMER_FORM)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    setForm(initialValues ?? EMPTY_CUSTOMER_FORM)
  }, [initialValues])

  function updateField<K extends keyof CustomerFormValues>(key: K, value: CustomerFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.customerName.trim()) {
      setValidationError(t('form.errors.nameRequired'))
      return
    }
    if (!form.groupId) {
      setValidationError(t('form.errors.groupRequired'))
      return
    }
    setValidationError(null)
    onSubmit(form)
  }

  return (
    <ModalShell
      title={mode === 'create' ? t('form.createTitle') : t('form.editTitle')}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            {t('form.cancel')}
          </button>
          <button
            type="submit"
            form="customer-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-kayan-erp-blue text-white rounded-xl hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {mode === 'create' ? t('form.create') : t('form.save')}
          </button>
        </>
      }
    >
      <form id="customer-form" onSubmit={handleSubmit} className="space-y-4">
        {(validationError || errorMessage) ? (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
            {validationError ?? errorMessage}
          </p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t('form.customerName')} *</label>
            <input
              className={fieldClass}
              value={form.customerName}
              onChange={(e) => updateField('customerName', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t('form.customerNameEn')}</label>
            <input
              className={fieldClass}
              value={form.customerNameEn}
              onChange={(e) => updateField('customerNameEn', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t('form.phone')}</label>
            <input
              className={fieldClass}
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t('form.group')} *</label>
            <select
              className={fieldClass}
              value={form.groupId || ''}
              onChange={(e) => updateField('groupId', Number(e.target.value))}
              required
            >
              <option value="">{t('form.selectGroup')}</option>
              {groups.map((g) => (
                <option key={g.groupId} value={g.groupId}>
                  {g.groupNameAr ?? g.groupNameEn ?? g.groupId}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t('form.salesman')}</label>
            <select
              className={fieldClass}
              value={form.salesmanId ?? ''}
              onChange={(e) =>
                updateField('salesmanId', e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">{t('form.none')}</option>
              {salesmen.map((s) => (
                <option key={s.salesmanId} value={s.salesmanId}>
                  {s.salesmanNameAr ?? s.salesmanNameEn ?? s.salesmanId}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t('form.creditLimit')}</label>
            <input
              type="number"
              className={fieldClass}
              value={form.creditLimit ?? ''}
              onChange={(e) =>
                updateField('creditLimit', e.target.value ? Number(e.target.value) : null)
              }
              min={0}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t('form.taxNumber')}</label>
            <input
              className={fieldClass}
              value={form.taxNumber}
              onChange={(e) => updateField('taxNumber', e.target.value)}
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t('form.crNumber')}</label>
            <input
              className={fieldClass}
              value={form.crNumber}
              onChange={(e) => updateField('crNumber', e.target.value)}
              dir="ltr"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1">{t('form.address')}</label>
          <input
            className={fieldClass}
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1">{t('form.notes')}</label>
          <textarea
            className={`${fieldClass} min-h-20 resize-y`}
            value={form.notes}
            onChange={(e) => updateField('notes', e.target.value)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => updateField('isActive', e.target.checked)}
            className="rounded border-slate-300"
          />
          {t('form.isActive')}
        </label>
      </form>
    </ModalShell>
  )
}
