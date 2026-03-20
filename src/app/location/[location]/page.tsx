import { FeedList } from '@/components/feed/FeedList'
import { FilterBar } from '@/components/filters/FilterBar'
import { getArticles } from '@/lib/data'
import type { ArticleFilters, ArticleListItem } from '@/types'
import { MapPin } from 'lucide-react'

// Server component - no 'use client' directive
export default async function LocationPage({
  params,
  searchParams,
}: {
  params: { location: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const decodedLocation = decodeURIComponent(params.location)

  // Build filters from search params
  const sortValue = typeof searchParams.sortBy === 'string' ? searchParams.sortBy : typeof searchParams.sort === 'string' ? searchParams.sort : 'published_at'
  const filters: ArticleFilters = {
    location: decodedLocation,
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    severity: typeof searchParams.severity === 'string' ? (searchParams.severity as any) : undefined,
    status: typeof searchParams.status === 'string' ? (searchParams.status as any) : undefined,
    sort: sortValue === 'published_at' || sortValue === 'severity' || sortValue === 'created_at' ? sortValue : 'published_at',
    order: typeof searchParams.order === 'string' ? (searchParams.order as any) : 'desc',
  }

  // Fetch articles server-side
  let articles: ArticleListItem[] = []
  let error: string | null = null
  try {
    articles = await getArticles(filters)
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load articles'
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <MapPin className="h-4 w-4" />
            {decodedLocation}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Travel News: {decodedLocation}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Latest updates, alerts, and important information for {decodedLocation}.
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-4">
        <div className="container mx-auto px-4">
          <FilterBar categories={[]} locations={[]} />
        </div>
      </div>

      {/* Feed */}
      <section className="container mx-auto px-4 py-8">
        <FeedList articles={articles} loading={false} error={error} />
      </section>
    </div>
  )
}
