import type { TFunction } from 'i18next'
import { isApiEnabled } from '@/api/config'
import type { FormErrors, LoginFormData } from '@/features/auth/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLoginForm(data: LoginFormData, t: TFunction<'common'>): FormErrors {
  const errors: FormErrors = {}
  const identifier = data.userName.trim()

  if (!identifier) {
    errors.userName = isApiEnabled() ? t('validation.userNameRequired') : t('validation.emailRequired')
  } else if (!isApiEnabled() && !EMAIL_REGEX.test(identifier)) {
    errors.userName = t('validation.emailInvalid')
  }

  if (!data.password) {
    errors.password = t('validation.passwordRequired')
  } else if (data.password.length < 6) {
    errors.password = t('validation.passwordMinLength')
  }

  return errors
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0
}
