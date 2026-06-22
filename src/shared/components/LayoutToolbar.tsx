import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher'
import { ThemeToggle } from '@/shared/components/ThemeToggle'

export function LayoutToolbar() {
  return (
    <div className="fixed top-6 end-6 z-50 flex items-center gap-2">
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  )
}
