import { useAppTranslation } from '@/shared/hooks/useLanguage'
import { Logo } from '@/shared/ui/Logo'
import { LoginForm } from './LoginForm'

export function LoginCard() {
  const { t } = useAppTranslation('login')

  return (
    <section className="w-full md:w-2/5 flex items-center justify-center p-6 md:p-12" aria-label={t('ariaLabel')}>
      <div className="glass-card w-full max-w-lg rounded-[2.5rem] p-10 md:p-14">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo size="sm" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{t('welcome')}</h2>
          <p className="text-slate-400">{t('subtitle')}</p>
        </div>

        <LoginForm />

        <div className="mt-10 flex justify-center gap-6 text-sm">
          <p className="text-slate-400">
            {t('noAccount')}{' '}
            <a href="#" className="text-kayan-blue font-bold hover:underline">
              {t('contactAdmin')}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
