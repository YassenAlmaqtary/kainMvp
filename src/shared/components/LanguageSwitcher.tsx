import { ChevronDown, Globe } from 'lucide-react'
import { useState } from 'react'
import { useAppTranslation, useLanguage } from '@/shared/hooks/useLanguage'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import type { SupportedLanguage } from '@/shared/i18n'

export function LanguageSwitcher() {
  const { t } = useAppTranslation('common')
  const { language, languages, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false), isOpen)

  const handleLanguageChange = (code: SupportedLanguage) => {
    changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t(`languages.${language}`)}
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span>{t(`languages.${language}`)}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          aria-label={t(`languages.${language}`)}
          className="absolute start-0 top-full mt-2 min-w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden z-50"
        >
          {languages.map((code) => (
            <li key={code} role="option" aria-selected={language === code}>
              <button
                type="button"
                onClick={() => handleLanguageChange(code)}
                className={`w-full px-4 py-2 text-sm text-start hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                  language === code ? 'text-kayan-blue font-semibold bg-blue-50/50 dark:bg-blue-900/20' : ''
                }`}
              >
                {t(`languages.${code}`)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
