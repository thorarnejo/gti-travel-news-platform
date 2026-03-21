import Link from 'next/link'
import { MapPin, Clock, Plane, Building, Map, FileText, Shield, Cloud, CloudSun } from 'lucide-react'
import type { ArticleListItem } from '@/types'
import { StatusBadge, ArticleStatusBadge } from '@/components/ui/StatusBadge'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { cn, formatTimeAgo } from '@/lib/utils'
import { articleHeroImages } from '@/lib/data'

const categoryIcons: Record<string, React.ElementType> = {
  transport: Plane,
  'entry-rules': FileText,
  safety: Shield,
  attractions: Map,
  pricing: Building,
  disruptions: Cloud,
  flights: Plane,
  hotels: Building,
  destinations: Map,
  visa: FileText,
  weather: CloudSun,
}

interface ArticleCardProps {
  article: ArticleListItem
  variant?: 'default' | 'compact' | 'featured'
  className?: string
  isFeatured?: boolean
}

function getPrimaryLocationName(locations: { name: string; location_type: string }[]): string {
  if (!locations || locations.length === 0) return 'Unknown'
  const city = locations.find(l => l.location_type === 'city')
  const country = locations.find(l => l.location_type === 'country')
  if (city && country) return `${city.name}, ${country.name}`
  return locations[0].name
}

function formatTag(value?: string): string {
  if (!value) return ''
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function ArticleCard({ article, variant = 'default', className, isFeatured = false }: ArticleCardProps) {
  const CategoryIcon = categoryIcons[article.category.slug] || Map
  const locationName = getPrimaryLocationName(article.locations)
  const heroImage = article.heroImage

  if (variant === 'compact') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          'block p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-primary/50 transition-colors',
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <CategoryIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <Link href={`/category/${article.category.slug}`} className="text-xs text-muted-foreground capitalize hover:text-primary">
                {article.category.name}
              </Link>
              {article.articleStatus && (
                <ArticleStatusBadge articleStatus={article.articleStatus} />
              )}
            </div>
            <h3 className="font-medium text-sm line-clamp-2 leading-snug">{article.headline}</h3>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <SeverityBadge severity={article.severity} />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <Link href={`/location/${locationName.toLowerCase().replace(/,?\s*[\w\s]+$/, '').trim()}`} className="hover:text-primary capitalize">
              {locationName}
            </Link>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.published_at ? formatTimeAgo(article.published_at) : 'Draft'}
          </span>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          'block p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all',
          className
        )}
      >
        <div className="flex items-center gap-2 mb-3">
          <CategoryIcon className="h-5 w-5 text-primary" />
          <Link href={`/category/${article.category.slug}`} className="text-sm font-medium text-primary hover:underline capitalize">
            {article.category.name}
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href={`/location/${locationName.toLowerCase().replace(/,?\s*[\w\s]+$/, '').trim()}`} className="text-xs text-muted-foreground hover:text-primary capitalize">
            {locationName}
          </Link>
          {article.articleStatus && (
            <>
              <span className="text-muted-foreground">•</span>
              <ArticleStatusBadge articleStatus={article.articleStatus} />
            </>
          )}
        </div>
        <h2 className="text-xl font-bold mb-2 leading-tight">{article.headline}</h2>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.summary}</p>
        <div className="flex items-center gap-3">
          <SeverityBadge severity={article.severity} />
          <StatusBadge status={article.status} />
        </div>
      </Link>
    )
  }

  if (isFeatured) {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          'block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all',
          className
        )}
      >
        {heroImage && (
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="w-full h-52 md:h-64 object-cover"
          />
        )}

        <div className="p-5 md:p-6 bg-orange-50">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-white text-xs font-medium border border-orange-200 text-orange-900">{formatTag(article.category.name)}</span>
            <span className="px-2.5 py-1 rounded-full bg-white text-xs font-medium border border-orange-200 text-orange-900">{formatTag(article.severity)}</span>
            <span className="px-2.5 py-1 rounded-full bg-white text-xs font-medium border border-orange-200 text-orange-900">{formatTag(article.status)}</span>
            {article.articleStatus && (
              <span className="px-2.5 py-1 rounded-full bg-white text-xs font-medium border border-orange-200 text-orange-900">{formatTag(article.articleStatus)}</span>
            )}
          </div>

          <h3 className="font-semibold text-lg md:text-xl mb-2 leading-snug">{article.headline}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.summary}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="capitalize">{locationName}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.published_at ? formatTimeAgo(article.published_at) : 'Draft'}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        'block p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all',
        className
      )}
    >
      <div className="flex items-start gap-4 md:gap-6">
        <div className="flex-1 min-w-0 order-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-md bg-muted">
              <CategoryIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide capitalize">
              {article.category.name}
            </span>
            {article.articleStatus && <ArticleStatusBadge articleStatus={article.articleStatus} />}
          </div>

          <h3 className="font-semibold text-base mb-2 leading-snug line-clamp-2">{article.headline}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{article.summary}</p>

          <div className="flex items-center flex-wrap gap-2 mb-3">
            <SeverityBadge severity={article.severity} />
            <StatusBadge status={article.status} />
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="capitalize">{locationName}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.published_at ? formatTimeAgo(article.published_at) : 'Draft'}
            </span>
          </div>
        </div>

        {heroImage && (
          <div className="order-2 shrink-0 w-32 md:w-44 lg:w-56">
            <div className="aspect-video overflow-hidden rounded-lg border border-gray-200">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
