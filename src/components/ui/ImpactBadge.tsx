'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const impactVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
  {
    variants: {
      variant: {
        regional: 'bg-slate-100 text-slate-700 border-slate-200',
        localized: 'bg-gray-100 text-gray-700 border-gray-200',
        widespread: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      },
    },
    defaultVariants: {
      variant: 'regional',
    },
  }
)

const impactLabels = {
  regional: 'Regional Impact',
  localized: 'Localized',
  widespread: 'Widespread',
}

interface ImpactBadgeProps extends VariantProps<typeof impactVariants> {
  variant?: 'regional' | 'localized' | 'widespread'
  regions?: string[]
  className?: string
}

export function ImpactBadge({ variant = 'regional', regions = [], className }: ImpactBadgeProps) {
  return (
    <span className={cn(impactVariants({ variant }), className)}>
      {impactLabels[variant]}
      {regions.length > 0 && (
        <span className="ml-1 text-foreground/60">
          ({regions.slice(0, 2).join(', ')}{regions.length > 2 ? ` +${regions.length - 2}` : ''})
        </span>
      )}
    </span>
  )
}

export { impactVariants }
