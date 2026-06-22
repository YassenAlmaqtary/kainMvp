import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MessageCircle,
  MoreVertical,
  SlidersHorizontal,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { CUSTOMER_STATUS_STYLES } from '@/features/crm/components/crmStyles'
import type { CustomerRow } from '@/features/crm/types'
import { useAppTranslation, useLanguage } from '@/shared/hooks/useLanguage'

interface CustomersTableProps {
  customers: CustomerRow[]
  isLoading?: boolean
  onView: (customer: CustomerRow) => void
  onEdit: (customer: CustomerRow) => void
  onDelete: (customer: CustomerRow) => void
}

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function CustomersTable({ customers, isLoading, onView, onEdit, onDelete }: CustomersTableProps) {
  const { t } = useAppTranslation('crm')
  const { language } = useLanguage()
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(25)
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(customers.length / pageSize))
  const safePage = Math.min(page, totalPages)

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return customers.slice(start, start + pageSize)
  }, [customers, safePage, pageSize])

  return (
    <div className="dashboard-card overflow-hidden xl:col-span-6 xl:order-2">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden />
            {t('table.displayOptions')}
          </button>
          <label className="flex items-center gap-2 text-xs text-slate-500">
            {t('table.show')}
            <select
              className="px-2 py-1 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value) as (typeof PAGE_SIZE_OPTIONS)[number])
                setPage(1)
              }}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {t('table.entries')}
          </label>
        </div>
        <p className="text-xs text-slate-500">
          {t('table.total', { count: customers.length })}
        </p>
      </div>

      <div className="overflow-x-auto dashboard-custom-scrollbar">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs">
              <th className="px-4 py-3 text-start font-medium">{t('table.code')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('table.name')}</th>
              <th className="px-4 py-3 text-start font-medium hidden md:table-cell">{t('table.phone')}</th>
              <th className="px-4 py-3 text-start font-medium hidden lg:table-cell">{t('table.city')}</th>
              <th className="px-4 py-3 text-start font-medium hidden xl:table-cell">{t('table.transactions')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('table.balance')}</th>
              <th className="px-4 py-3 text-start font-medium hidden lg:table-cell">{t('table.lastPurchase')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('table.status')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                  {t('table.loading')}
                </td>
              </tr>
            ) : pageRows.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                  {t('table.empty')}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                    {row.code}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onView(row)}
                      className="text-kayan-erp-blue hover:underline font-medium text-start"
                    >
                      {row.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-600 dark:text-slate-400" dir="ltr">
                    {row.phone}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">{row.city}</td>
                  <td className="px-4 py-3 hidden xl:table-cell">{row.totalTransactions}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      row.balanceDue > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {formatCurrency(row.balanceDue, language)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-500 text-xs">
                    {formatDate(row.lastPurchaseDate, language)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${CUSTOMER_STATUS_STYLES[row.status]}`}
                    >
                      {t(`status.${row.status}`)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(row)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                        aria-label={t('table.edit')}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onView(row)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                        aria-label={t('table.view')}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const phone = row.phone.replace(/\D/g, '')
                          if (phone) window.open(`https://wa.me/966${phone.replace(/^0/, '')}`, '_blank')
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-emerald-600"
                        aria-label={t('table.whatsapp')}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(row)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-red-500"
                        aria-label={t('table.delete')}
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {t('table.pageInfo', {
            from: customers.length === 0 ? 0 : (safePage - 1) * pageSize + 1,
            to: Math.min(safePage * pageSize, customers.length),
            total: customers.length,
          })}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label={t('table.prev')}
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
          </button>
          <span className="px-3 text-xs text-slate-600 dark:text-slate-400">
            {safePage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label={t('table.next')}
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  )
}
