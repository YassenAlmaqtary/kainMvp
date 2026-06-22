import { useState } from 'react'
import { mapDtoToFormValues, mapRowToFormValues } from '@/api/mappers/customer.mapper'
import { CustomerDetailModal } from '@/features/crm/components/CustomerDetailModal'
import { CustomerFormModal } from '@/features/crm/components/CustomerFormModal'
import {
  CustomersErrorBanner,
  CustomersFilterPanel,
  CustomersInsights,
  CustomersKpiGrid,
  CustomersPageHeader,
  CustomersRiskCenter,
  CustomersSidePanel,
  CustomersTable,
} from '@/features/crm/components'
import { useCustomerDetail, useCustomerMutations } from '@/features/crm/hooks/useCustomerMutations'
import { useCustomerLookups } from '@/features/crm/hooks/useCustomerLookups'
import { useCustomers } from '@/features/crm/hooks/useCustomers'
import { downloadCsv, exportCustomersCsv } from '@/features/crm/services/customers'
import type { CustomerFormValues, CustomerRow } from '@/features/crm/types'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { useAppTranslation } from '@/shared/hooks/useLanguage'

type FormMode = 'create' | 'edit' | null

export function CustomersPage() {
  usePageTitle('crm')
  const { t } = useAppTranslation('crm')

  const {
    customers,
    stats,
    filterOptions,
    isLoading,
    isError,
    error,
    filters,
    setFilters,
    applyFilters,
    resetFilters,
    refetch,
  } = useCustomers()

  const { groups, salesmen } = useCustomerLookups()
  const { create, update, remove } = useCustomerMutations()

  const [formMode, setFormMode] = useState<FormMode>(null)
  const [editingCustomer, setEditingCustomer] = useState<CustomerRow | null>(null)
  const [viewCustomer, setViewCustomer] = useState<CustomerRow | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const detailQuery = useCustomerDetail(viewCustomer?.customerId ?? null, Boolean(viewCustomer))

  function openCreate() {
    setEditingCustomer(null)
    setFormError(null)
    setFormMode('create')
  }

  function openEdit(customer: CustomerRow) {
    setViewCustomer(null)
    setEditingCustomer(customer)
    setFormError(null)
    setFormMode('edit')
  }

  function openView(customer: CustomerRow) {
    setViewCustomer(customer)
  }

  function closeForm() {
    setFormMode(null)
    setEditingCustomer(null)
    setFormError(null)
  }

  function handleExport() {
    const csv = exportCustomersCsv(customers)
    downloadCsv(`customers-${new Date().toISOString().slice(0, 10)}.csv`, csv)
  }

  function handleFormSubmit(form: CustomerFormValues) {
    setFormError(null)
    if (formMode === 'create') {
      create.mutate(form, {
        onSuccess: closeForm,
        onError: (err) => setFormError(err.message),
      })
      return
    }
    if (formMode === 'edit' && editingCustomer) {
      update.mutate(
        { customerId: editingCustomer.customerId, form },
        {
          onSuccess: closeForm,
          onError: (err) => setFormError(err.message),
        },
      )
    }
  }

  function handleDeleteFromTable(customer: CustomerRow) {
    if (!window.confirm(t('form.deleteConfirm', { name: customer.name }))) return
    remove.mutate(customer.customerId)
  }

  function handleDeleteFromDetail() {
    if (!viewCustomer) return
    if (!window.confirm(t('form.deleteConfirm', { name: viewCustomer.name }))) return
    remove.mutate(viewCustomer.customerId, {
      onSuccess: () => setViewCustomer(null),
    })
  }

  const formInitialValues: CustomerFormValues | undefined =
    formMode === 'edit' && editingCustomer
      ? mapRowToFormValues(editingCustomer)
      : formMode === 'edit' && detailQuery.data
        ? mapDtoToFormValues(detailQuery.data)
        : undefined

  return (
    <div className="space-y-4 lg:space-y-6 pb-8">
      <CustomersPageHeader onNew={openCreate} onExport={handleExport} />

      {isError ? (
        <CustomersErrorBanner message={error?.message} onRetry={() => void refetch()} />
      ) : null}

      <CustomersKpiGrid kpis={stats.kpis} />
      <CustomersRiskCenter risks={stats.risks} />
      <CustomersInsights insights={stats.insights} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
        <CustomersFilterPanel
          filters={filters}
          onChange={setFilters}
          onSearch={applyFilters}
          onReset={resetFilters}
          groups={filterOptions.groups}
          salesReps={filterOptions.salesReps}
          cities={filterOptions.cities}
        />
        <CustomersTable
          customers={customers}
          isLoading={isLoading}
          onView={openView}
          onEdit={openEdit}
          onDelete={handleDeleteFromTable}
        />
        <CustomersSidePanel risks={stats.risks} distribution={stats.distribution} />
      </div>

      {formMode ? (
        <CustomerFormModal
          mode={formMode}
          initialValues={formInitialValues}
          groups={groups}
          salesmen={salesmen}
          isSubmitting={create.isPending || update.isPending}
          errorMessage={formError}
          onClose={closeForm}
          onSubmit={handleFormSubmit}
        />
      ) : null}

      {viewCustomer ? (
        <CustomerDetailModal
          customer={viewCustomer}
          detail={detailQuery.data}
          isLoading={detailQuery.isLoading}
          isDeleting={remove.isPending}
          onClose={() => setViewCustomer(null)}
          onEdit={() => openEdit(viewCustomer)}
          onDelete={handleDeleteFromDetail}
        />
      ) : null}
    </div>
  )
}
