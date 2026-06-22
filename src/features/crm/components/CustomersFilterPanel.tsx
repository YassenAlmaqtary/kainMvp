import { ChevronDown, RotateCcw, Search } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { FILTER_OPTIONS } from '@/features/crm/constants/mockData'
import type { CustomerFilters } from '@/features/crm/types'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

interface CustomersFilterPanelProps {
  filters: CustomerFilters
  onChange: (filters: CustomerFilters) => void
  onSearch: () => void
  onReset: () => void
  groups?: string[]
  salesReps?: string[]
  cities?: string[]
}

function FilterField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div>
      <label className="block text-[10px] text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-kayan-erp-blue/30'

const selectClass = `${inputClass} appearance-none`

export function CustomersFilterPanel({
  filters,
  onChange,
  onSearch,
  onReset,
  groups: groupsProp,
  salesReps: salesRepsProp,
  cities: citiesProp,
}: CustomersFilterPanelProps) {
  const { t } = useAppTranslation('crm')
  const [advancedOpen, setAdvancedOpen] = useState(true)

  const groups = groupsProp?.length ? groupsProp : [...FILTER_OPTIONS.groups]
  const salesReps = salesRepsProp?.length ? salesRepsProp : [...FILTER_OPTIONS.salesReps]
  const cities = citiesProp?.length ? citiesProp : [...FILTER_OPTIONS.cities]

  function updateField<K extends keyof CustomerFilters>(key: K, value: CustomerFilters[K]) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <aside className="dashboard-card p-4 lg:p-5 h-fit xl:col-span-3 xl:order-3 ltr:xl:order-1">
      <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t('filters.title')}</h3>

      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{t('filters.quickSearch')}</p>
        <FilterField label={t('filters.name')}>
          <input
            type="text"
            className={inputClass}
            value={filters.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder={t('filters.namePlaceholder')}
          />
        </FilterField>
        <FilterField label={t('filters.phone')}>
          <input
            type="text"
            className={inputClass}
            value={filters.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </FilterField>
        <FilterField label={t('filters.code')}>
          <input
            type="text"
            className={inputClass}
            value={filters.code}
            onChange={(e) => updateField('code', e.target.value)}
          />
        </FilterField>
        <FilterField label={t('filters.taxId')}>
          <input
            type="text"
            className={inputClass}
            value={filters.taxId}
            onChange={(e) => updateField('taxId', e.target.value)}
          />
        </FilterField>

        <button
          type="button"
          className="flex items-center justify-between w-full text-xs font-medium text-slate-600 dark:text-slate-400 pt-2"
          onClick={() => setAdvancedOpen((o) => !o)}
        >
          {t('filters.advanced')}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>

        {advancedOpen ? (
          <div className="space-y-3">
            <FilterField label={t('filters.branch')}>
              <select
                className={selectClass}
                value={filters.branch}
                onChange={(e) => updateField('branch', e.target.value)}
              >
                <option value="">{t('filters.all')}</option>
                {FILTER_OPTIONS.branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label={t('filters.group')}>
              <select
                className={selectClass}
                value={filters.group}
                onChange={(e) => updateField('group', e.target.value)}
              >
                <option value="">{t('filters.all')}</option>
                {groups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label={t('filters.salesRep')}>
              <select
                className={selectClass}
                value={filters.salesRep}
                onChange={(e) => updateField('salesRep', e.target.value)}
              >
                <option value="">{t('filters.all')}</option>
                {salesReps.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label={t('filters.customerType')}>
              <select
                className={selectClass}
                value={filters.customerType}
                onChange={(e) => updateField('customerType', e.target.value)}
              >
                <option value="">{t('filters.all')}</option>
                {FILTER_OPTIONS.customerTypes.map((type) => (
                  <option key={type} value={type}>
                    {t(`customerTypes.${type}`)}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label={t('filters.status')}>
              <select
                className={selectClass}
                value={filters.status}
                onChange={(e) => updateField('status', e.target.value)}
              >
                <option value="">{t('filters.all')}</option>
                {FILTER_OPTIONS.statuses.map((s) => (
                  <option key={s} value={s}>
                    {t(`status.${s}`)}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label={t('filters.creditStatus')}>
              <select
                className={selectClass}
                value={filters.creditStatus}
                onChange={(e) => updateField('creditStatus', e.target.value)}
              >
                <option value="">{t('filters.all')}</option>
                {FILTER_OPTIONS.creditStatuses.map((c) => (
                  <option key={c} value={c}>
                    {t(`creditStatus.${c}`)}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label={t('filters.city')}>
              <select
                className={selectClass}
                value={filters.city}
                onChange={(e) => updateField('city', e.target.value)}
              >
                <option value="">{t('filters.all')}</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FilterField>
          </div>
        ) : null}
      </div>

      <div className="flex gap-2 mt-5">
        <button
          type="button"
          onClick={onSearch}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-kayan-erp-blue text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Search className="w-4 h-4" aria-hidden />
          {t('filters.search')}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" aria-hidden />
          {t('filters.reset')}
        </button>
      </div>
    </aside>
  )
}
