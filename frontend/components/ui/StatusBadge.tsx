'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertTriangle, AlertCircle, Info, XCircle, TrendingUp, CheckCircle, Clock, Activity } from 'lucide-react'

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
  className?: string
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

// Article Status Badge: Active / Ongoing / Resolved (for article cards and pages)
const articleStatusVariants = cva(
  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
  {
    variants: {
      articleStatus: {
        'active': 'bg-red-100 text-red-800 border-red-200',
        'ongoing': 'bg-amber-100 text-amber-800 border-amber-200',
        'resolved': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      },
    },
    defaultVariants: {
      articleStatus: 'active',
    },
  }
)

const articleStatusConfig = {
  active: { icon: Activity, label: 'Active' },
  ongoing: { icon: Clock, label: 'Ongoing' },
  resolved: { icon: CheckCircle, label: 'Resolved' },
}

interface ArticleStatusBadgeProps extends VariantProps<typeof articleStatusVariants> {
  articleStatus?: 'active' | 'ongoing' | 'resolved'
  className?: string
}

export function ArticleStatusBadge({ articleStatus, className }: ArticleStatusBadgeProps) {
  if (!articleStatus) return null
  const config = articleStatusConfig[articleStatus]
  const Icon = config.icon

  return (
    <span className={cn(articleStatusVariants({ articleStatus }), className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}

export { statusVariants, articleStatusVariants }
