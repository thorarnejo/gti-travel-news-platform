'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertTriangle, AlertCircle, Info, XCircle, TrendingUp } from 'lucide-react'

const statusVariants = cva(
  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
  {
    variants: {
      status: {
        'new': 'bg-blue-100 text-blue-800 border-blue-200',
        'update': 'bg-purple-100 text-purple-800 border-purple-200',
        'warning': 'bg-amber-100 text-amber-800 border-amber-200',
        'disruption': 'bg-red-100 text-red-800 border-red-200',
        'price-change': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      },
    },
    defaultVariants: {
      status: 'new',
    },
  }
)

const statusConfig = {
  new: { icon: Info, label: 'New' },
  update: { icon: AlertCircle, label: 'Update' },
  warning: { icon: AlertTriangle, label: 'Warning' },
  disruption: { icon: XCircle, label: 'Disruption' },
  'price-change': { icon: TrendingUp, label: 'Price Change' },
}

interface StatusBadgeProps extends VariantProps<typeof statusVariants> {
  status?: 'new' | 'update' | 'warning' | 'disruption' | 'price-change'
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (!status) return null
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span className={cn(statusVariants({ status }), className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}

export { statusVariants }
