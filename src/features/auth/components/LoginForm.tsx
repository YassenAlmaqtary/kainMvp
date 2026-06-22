import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { type FormEvent, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isApiEnabled } from '@/api/config'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { useAuth } from '@/shared/context/AuthContext'
import { LoginError } from '@/features/auth/services/auth.errors'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Input } from '@/shared/ui/Input'
import type { FormErrors, LoginFormData } from '@/features/auth/types'
import { hasErrors, validateLoginForm } from '@/shared/utils/validation'

function resolveSubmitError(error: unknown, t: (key: string) => string): string {
  if (error instanceof LoginError) {
    switch (error.code) {
      case 'INVALID_CREDENTIALS':
        return t('invalidCredentials')
      case 'AUTH_TOKEN_MISSING':
        return t('tokenMissing')
      case 'NETWORK_ERROR':
        return t('networkError')
      default:
        if (error.message === 'GOOGLE_AUTH_NOT_SUPPORTED') return t('googleNotSupported')
        return error.message || t('loginError')
    }
  }
  return t('loginError')
}

export function LoginForm() {
  const { t, i18n } = useAppTranslation('login')
  const { t: tCommon } = useAppTranslation('common')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/dashboard'
  const apiMode = isApiEnabled()

  const [formData, setFormData] = useState<LoginFormData>({
    userName: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    setErrors((prev) => (hasErrors(prev) ? validateLoginForm(formData, tCommon) : prev))
  }, [i18n.language])

  const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field as keyof FormErrors]
        return next
      })
    }
    setSubmitError(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validateLoginForm(formData, tCommon)

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setSubmitError(null)

    try {
      await login(formData)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setSubmitError(resolveSubmitError(err, t))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {apiMode ? (
        <p className="text-xs text-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-lg px-3 py-2">
          {t('apiHint')}
        </p>
      ) : null}

      <Input
        label={apiMode ? t('userName') : t('email')}
        type="text"
        name="userName"
        autoComplete="username"
        placeholder={apiMode ? t('userNamePlaceholder') : t('emailPlaceholder')}
        icon={User}
        value={formData.userName}
        onChange={(e) => handleChange('userName', e.target.value)}
        error={errors.userName}
      />

      <Input
        label={t('password')}
        type={showPassword ? 'text' : 'password'}
        name="password"
        autoComplete="current-password"
        placeholder={t('passwordPlaceholder')}
        icon={Lock}
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={errors.password}
        endAdornment={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label={showPassword ? t('hidePassword') : t('showPassword')}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        }
      />

      <div className="flex items-center justify-between text-sm">
        <Checkbox
          label={t('rememberMe')}
          checked={formData.rememberMe}
          onChange={(e) => handleChange('rememberMe', e.target.checked)}
        />
        <a href="#" className="text-kayan-blue font-medium hover:underline">
          {t('forgotPassword')}
        </a>
      </div>

      {submitError ? (
        <p className="text-sm text-red-500 text-center" role="alert">
          {submitError}
        </p>
      ) : null}

      <Button type="submit" isLoading={isLoading} className="w-full">
        {!isLoading ? <Lock className="h-5 w-5" aria-hidden /> : null}
        {t('submit')}
      </Button>

      {!apiMode ? (
        <p className="text-xs text-center text-slate-400">{t('demoHint')}</p>
      ) : null}
    </form>
  )
}
