import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import arCrm from './locales/ar/crm.json'
import arCommon from './locales/ar/common.json'
import arLayout from './locales/ar/layout.json'
import arLogin from './locales/ar/login.json'
import arDashboard from './locales/ar/dashboard.json'
import arMarketing from './locales/ar/marketing.json'
import arPos from './locales/ar/pos.json'
import enCrm from './locales/en/crm.json'
import enCommon from './locales/en/common.json'
import enDashboard from './locales/en/dashboard.json'
import enLayout from './locales/en/layout.json'
import enLogin from './locales/en/login.json'
import enMarketing from './locales/en/marketing.json'
import enPos from './locales/en/pos.json'
import { DEFAULT_NAMESPACE, NAMESPACES } from './namespaces'

export const SUPPORTED_LANGUAGES = ['ar', 'en'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

const STORAGE_KEY = 'kayan-locale'

function getInitialLanguage(): SupportedLanguage {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'ar' || stored === 'en') return stored
  return navigator.language.startsWith('ar') ? 'ar' : 'en'
}

export function applyDocumentLanguage(lang: SupportedLanguage) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

export function setLanguage(lang: SupportedLanguage) {
  localStorage.setItem(STORAGE_KEY, lang)
  void i18n.changeLanguage(lang)
}

const initialLanguage = getInitialLanguage()
applyDocumentLanguage(initialLanguage)

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      common: arCommon,
      layout: arLayout,
      login: arLogin,
      marketing: arMarketing,
      pos: arPos,
      dashboard: arDashboard,
      crm: arCrm,
    },
    en: {
      common: enCommon,
      layout: enLayout,
      login: enLogin,
      marketing: enMarketing,
      pos: enPos,
      dashboard: enDashboard,
      crm: enCrm,
    },
  },
  lng: initialLanguage,
  fallbackLng: 'ar',
  defaultNS: DEFAULT_NAMESPACE,
  ns: [...NAMESPACES],
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lang) => {
  if (lang === 'ar' || lang === 'en') {
    applyDocumentLanguage(lang)
  }
})

export default i18n
