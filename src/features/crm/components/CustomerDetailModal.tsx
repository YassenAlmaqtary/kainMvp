import { Loader2, Trash2 } from 'lucide-react'
import type { CustomerDto } from '@/api/types'
import { CUSTOMER_STATUS_STYLES } from '@/features/crm/components/crmStyles'
import type { CustomerRow } from '@/features/crm/types'
import { useAppTranslation, useLanguage } from '@/shared/hooks/useLanguage'

interface CustomerDetailModalProps {
  customer: CustomerRow | null
  detail?: CustomerDto | null
  isLoading?: boolean
  isDeleting?: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-700/50 text-sm">
      <span className="text-slate-500 shrink-0">{label}</span>
      <span className="text-slate-900 dark:text-white text-end">{value}</span>
    </div>
  )
}

export function CustomerDetailModal({
  customer,
  detail,
  isLoading,
  isDeleting,
  onClose,
  onEdit,
  onDelete,
}: CustomerDetailModalProps) {
  const { t } = useAppTranslation('crm')
  const { language } = useLanguage()

  if (!customer) return null

  const data = detail ?? null
  const displayName = data?.customerName ?? customer.name
  const status = customer.status

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label={t('form.close')}
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg dashboard-card shadow-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500 font-mono">{customer.code}</p>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{displayName}</h2>
              <span
                className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${CUSTOMER_STATUS_STYLES[status]}`}
              >
                {t(`status.${status}`)}
              </span>
            </div>
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> : null}
          </div>
        </div>

        <div className="px-5 py-4 max-h-[60vh] overflow-y-auto dashboard-custom-scrollbar">
          <DetailRow label={t('table.phone')} value={data?.phone ?? customer.phone} />
          <DetailRow label={t('table.city')} value={customer.city} />
          <DetailRow label={t('form.address')} value={data?.address ?? customer.address} />
          <DetailRow label={t('form.taxNumber')} value={data?.taxNumber ?? customer.taxId} />
          <DetailRow label={t('form.crNumber')} value={data?.crNumber ?? customer.crNumber} />
          <DetailRow label={t('filters.group')} value={data?.groupName ?? customer.group} />
          <DetailRow label={t('filters.salesRep')} value={data?.salesmanName ?? customer.salesRep} />
          <DetailRow
            label={t('form.creditLimit')}
            value={
              data?.creditLimit ?? customer.creditLimit
                ? new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US').format(
                    data?.creditLimit ?? customer.creditLimit ?? 0,
                  )
                : null
            }
          />
          <DetailRow label={t('form.notes')} value={data?.notes ?? customer.notes} />
          <DetailRow
            label={t('form.dateCreated')}
            value={
              data?.dateCreated
                ? new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US').format(
                    new Date(data.dateCreated),
                  )
                : customer.dateCreated
                  ? new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US').format(
                      new Date(customer.dateCreated),
                    )
                  : null
            }
          />
        </div>

        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-60"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {t('form.delete')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            {t('form.close')}
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="px-4 py-2 text-sm bg-kayan-erp-blue text-white rounded-xl hover:bg-blue-700"
          >
            {t('form.edit')}
          </button>
        </div>
      </div>
    </div>
  )
}
