'use client'

import { ArticleCard } from './ArticleCard'
import type { ArticleListItem } from '@/types'
import { Plane, Activity } from 'lucide-react'

interface FeedListProps {
  articles: ArticleListItem[]
  loading?: boolean
  error?: string | null
  className?: string
}

export function FeedList({ articles, loading, error, className }: FeedListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <Plane className="h-8 w-8 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading travel alerts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="p-4 rounded-full bg-red-100 mb-4">
          <Activity className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-red-700">Failed to load alerts</h3>
        <p className="text-muted-foreground text-sm max-w-sm">{error}</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Plane className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No alerts found</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Try adjusting filters or check back for new travel alerts.
        </p>
      </div>
    )
  }

  // Separate critical articles
  const criticalArticles = articles.filter(a => a.severity === 'critical')
  const otherArticles = articles.filter(a => a.severity !== 'critical')

  return (
    <div className={className}>
      {/* Critical Section */}
      {criticalArticles.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            <h2 className="font-bold text-red-700 uppercase tracking-wide text-sm">
              Breaking / Critical
            </h2>
            <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
              {criticalArticles.length}
            </span>
          </div>
          <div className="grid gap-4">
            {criticalArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Other Articles */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Showing {otherArticles.length} {otherArticles.length === 1 ? 'alert' : 'alerts'}
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          {otherArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
