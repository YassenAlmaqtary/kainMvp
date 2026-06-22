import { FEATURE_ITEMS } from '@/features/auth/constants/features'
import { FeatureCard } from './FeatureCard'

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {FEATURE_ITEMS.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  )
}
