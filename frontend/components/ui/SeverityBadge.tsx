'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const severityVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
  {
    variants: {
      severity: {
        low: 'bg-green-100 text-green-800 border-green-200',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        high: 'bg-orange-100 text-orange-800 border-orange-200',
        critical: 'bg-red-100 text-red-800 border-red-200',
      },
    },
    defaultVariants: {
      severity: 'low',
    },
  }
)

const severityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

interface SeverityBadgeProps extends VariantProps<typeof severityVariants> {
  severity?: 'low' | 'medium' | 'high' | 'critical'
  showDot?: boolean
}

export function SeverityBadge({ severity, className, showDot = true }: SeverityBadgeProps) {
  if (!severity) return null

  return (
    <span className={cn(severityVariants({ severity }), className)}>
      {showDot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full mr-1.5',
            severity === 'low' && 'bg-green-500',
            severity === 'medium' && 'bg-yellow-500',
            severity === 'high' && 'bg-orange-500',
            severity === 'critical' && 'bg-red-500 animate-pulse'
          )}
        />
      )}
      {severityLabels[severity]}
    </span>
  )
}

export { severityVariants }
