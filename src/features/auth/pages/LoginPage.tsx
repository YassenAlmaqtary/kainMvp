import { HeroSection } from '@/features/auth/components/marketing/HeroSection'
import { LoginCard } from '@/features/auth/components/LoginCard'
import { usePageTitle } from '@/shared/hooks/usePageTitle'

export function LoginPage() {
  usePageTitle('login')

  return (
    <>
      <HeroSection />
      <LoginCard />
    </>
  )
}
