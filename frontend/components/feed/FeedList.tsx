'use client'

import { ArticleCard } from './ArticleCard'
import type { Article } from '@/types'
import { articleToListItem } from '@/types'
import { Plane } from 'lucide-react'

interface FeedListProps {
  articles: Article[]
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function FeedList({ articles, variant = 'default', className }: FeedListProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Plane className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No articles found</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Try adjusting your filters or check back later for the latest travel news.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {articles.length} article{articles.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="grid gap-4">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={articleToListItem(article)}
            variant={variant}
            isFeatured={variant === 'default' && index === 0}
          />
        ))}
      </div>
    </div>
  )
}
