import { Moon, Sun } from 'lucide-react'
import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { useTheme } from '@/shared/hooks/useTheme'
import { Button } from '@/shared/ui/Button'

export function ThemeToggle() {
  const { t } = useAppTranslation('common')
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="md"
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? t('theme.enableDark') : t('theme.enableLight')}
      className="p-2 !h-auto"
    >
      {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
    </Button>
  )
}
