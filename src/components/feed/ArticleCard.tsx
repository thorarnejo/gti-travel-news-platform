'use client'

import Link from 'next/link'
import { MapPin, Clock, Plane, Building, Map, FileText, Shield, Cloud, Zap, AlertCircle, Users } from 'lucide-react'
import type { ArticleListItem } from '@/types'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { cn, formatTimeAgo, isRecent } from '@/lib/utils'

const categoryIcons: Record<string, React.ElementType> = {
  transport: Plane,
  'entry-rules': FileText,
  safety: Shield,
  attractions: Map,
  pricing: Building,
  disruptions: Cloud,
}

interface ArticleCardProps {
  article: ArticleListItem
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

function getPrimaryLocationName(locations: { name: string; location_type: string }[]): string {
  if (!locations || locations.length === 0) return 'Unknown'
  const city = locations.find(l => l.location_type === 'city')
  const country = locations.find(l => l.location_type === 'country')
  if (city && country) return `${city.name}, ${country.name}`
  return locations[0].name
}

function getActionLine(whatToDo: string | null | undefined): string {
  if (!whatToDo) return 'No immediate action required.'
  const firstLine = whatToDo.split('\n').find(l => l.trim()) || ''
  return firstLine
    .replace(/^\d+\.\s*/, '')
    .replace(/^-\s*/, '')
    .trim()
    .slice(0, 80) + (firstLine.length > 80 ? '...' : '')
}

function getTldrLine(tldr: string[] | undefined): string {
  if (!tldr || tldr.length === 0) return 'No TL;DR available.'
  return tldr[0]
}

export function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  const CategoryIcon = categoryIcons[article.category.slug] || Map
  const locationName = getPrimaryLocationName(article.locations)
  const actionLine = getActionLine(article.what_to_do)
  const tldrLine = getTldrLine(article.tldr)
  const isNew = article.published_at && isRecent(article.published_at, 2)
  const isCritical = article.severity === 'critical'

  if (variant === 'compact') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          'block p-4 bg-card rounded-lg border transition-colors',
          isCritical
            ? 'border-red-300 hover:border-red-400 shadow-sm'
            : 'border-border hover:border-primary/50',
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <CategoryIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground capitalize">{article.category.name}</span>
              {isNew && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full">
                  <Zap className="h-2.5 w-2.5" />
                  NEW
                </span>
              )}
            </div>
            <h3 className={cn('font-medium text-sm line-clamp-2 leading-snug', isCritical && 'text-red-700')}>
              {article.headline}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <SeverityBadge severity={article.severity} />
          </div>
        </div>

        <div className="mt-2 rounded-md border border-blue-100 bg-blue-50 p-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-800 mb-1">TL;DR</p>
          <p className="text-xs text-blue-900 line-clamp-2">{tldrLine}</p>
        </div>

        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {locationName}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.published_at ? formatTimeAgo(article.published_at) : 'Draft'}
          </span>
        </div>
        <p className="mt-2 text-xs text-amber-700 font-medium flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {actionLine}
        </p>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          'block p-6 rounded-xl border transition-all',
          isCritical
            ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-300 hover:border-red-400 shadow-md'
            : 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40',
          className
        )}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={cn('p-1.5 rounded-lg', isCritical ? 'bg-red-200' : 'bg-primary/20')}>
            <CategoryIcon className={cn('h-5 w-5', isCritical ? 'text-red-700' : 'text-primary')} />
          </div>
          <span className={cn('text-sm font-medium capitalize', isCritical ? 'text-red-700' : 'text-primary')}>
            {article.category.name}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground capitalize">{locationName}</span>
          {isNew && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              <Zap className="h-3 w-3" />
              NEW
            </span>
          )}
        </div>
        <h2 className={cn('text-xl font-bold mb-3 leading-tight', isCritical && 'text-red-900')}>{article.headline}</h2>

        <div className="mb-4 rounded-md border border-blue-100 bg-blue-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-800 mb-1">TL;DR</p>
          <p className="text-sm text-blue-900 line-clamp-2">{tldrLine}</p>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <SeverityBadge severity={article.severity} />
          <StatusBadge status={article.status} />
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Affected: {locationName}
          </span>
        </div>
        <p className="text-sm text-amber-800 font-medium flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4" />
          {actionLine}
        </p>
      </Link>
    )
  }

  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        'block p-5 rounded-lg border transition-all',
        isCritical
          ? 'bg-card border-red-300 hover:border-red-400 shadow-sm'
          : 'bg-card border-border hover:border-primary/50 hover:shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className={cn('p-2 rounded-lg', isCritical ? 'bg-red-100' : 'bg-muted')}>
            <CategoryIcon className={cn('h-4 w-4', isCritical ? 'text-red-600' : 'text-muted-foreground')} />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-xs font-medium uppercase tracking-wide capitalize',
                isCritical ? 'text-red-700' : 'text-muted-foreground'
              )}
            >
              {article.category.name}
            </span>
            {isNew && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full">
                <Zap className="h-2.5 w-2.5" />
                NEW
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SeverityBadge severity={article.severity} />
          <StatusBadge status={article.status} />
        </div>
      </div>

      <h3 className={cn('font-semibold text-base mb-3 leading-snug line-clamp-2', isCritical && 'text-red-800')}>
        {article.headline}
      </h3>

      <div className="mb-3 rounded-md border border-blue-100 bg-blue-50 p-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-800 mb-1">TL;DR</p>
        <p className="text-sm text-blue-900 line-clamp-2">{tldrLine}</p>
      </div>

      <div className="flex items-start gap-1.5 mb-3 p-2 bg-amber-50 rounded-md border border-amber-100">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 font-medium line-clamp-2">{actionLine}</p>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span className="capitalize">Affected: {locationName}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {article.published_at ? formatTimeAgo(article.published_at) : 'Draft'}
        </span>
      </div>
    </Link>
  )
}
