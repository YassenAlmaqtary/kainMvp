import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage, SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/shared/i18n'
import type { Namespace } from '@/shared/i18n/namespaces'

export function useAppTranslation(ns: Namespace = 'common') {
  return useTranslation(ns)
}

export function useLanguage() {
  const { i18n } = useTranslation()

  const language = (i18n.language === 'en' ? 'en' : 'ar') as SupportedLanguage

  const changeLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguage(lang)
  }, [])

  return {
    language,
    languages: SUPPORTED_LANGUAGES,
    changeLanguage,
    isRtl: language === 'ar',
  }
}
