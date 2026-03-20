import { FeedList } from '@/components/feed/FeedList'
import { FilterBar } from '@/components/filters/FilterBar'
import { getArticles, getFilters } from '@/lib/data'
import type { ArticleFilters, ArticleListItem, FiltersResponse } from '@/types'
import { Activity } from 'lucide-react'

// Force dynamic rendering - don't cache this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Server component - no 'use client' directive
export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Build filters from search params
  const sortValue = typeof searchParams.sortBy === 'string' ? searchParams.sortBy : typeof searchParams.sort === 'string' ? searchParams.sort : 'published_at'
  const filters: ArticleFilters = {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    location: typeof searchParams.location === 'string' ? searchParams.location : undefined,
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

  // Fetch filters for the filter bar
  let filterData: { categories: any[]; locations: any[]; severities: any[]; statuses: any[] } = { categories: [], locations: [], severities: [], statuses: [] }
  try {
    filterData = await getFilters()
  } catch {
    // Use fallback data if API fails
    filterData = {
      categories: [
        { slug: 'transport', name: 'Transport', icon: '✈️' },
        { slug: 'entry-rules', name: 'Entry Rules', icon: '🛂' },
        { slug: 'safety', name: 'Safety', icon: '⚠️' },
        { slug: 'attractions', name: 'Attractions', icon: '🎭' },
        { slug: 'pricing', name: 'Pricing', icon: '💰' },
        { slug: 'disruptions', name: 'Disruptions', icon: '🔴' },
      ],
      locations: [
        { slug: 'united-kingdom', name: 'United Kingdom', location_type: 'country' },
        { slug: 'japan', name: 'Japan', location_type: 'country' },
        { slug: 'united-arab-emirates', name: 'UAE', location_type: 'country' },
        { slug: 'thailand', name: 'Thailand', location_type: 'country' },
        { slug: 'france', name: 'France', location_type: 'country' },
      ],
      severities: ['low', 'medium', 'high', 'critical'],
      statuses: ['new', 'update', 'warning', 'disruption', 'price_change'],
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-red-50 to-background py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 h-3 w-3 bg-red-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium text-red-600 uppercase tracking-wide">
                Live Updates
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Updated moments ago</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Global Travel Disruptions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Real-time alerts on flight cancellations, entry rule changes, and safety warnings. 
              Actionable updates to keep your travel plans on track.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border py-4">
        <div className="container mx-auto px-4">
          <FilterBar 
            categories={[
              { slug: 'transport', name: 'Transport', icon: 'plane' },
              { slug: 'entry-rules', name: 'Entry Rules', icon: 'passport' },
              { slug: 'safety', name: 'Safety', icon: 'shield' },
              { slug: 'attractions', name: 'Attractions', icon: 'landmark' },
              { slug: 'pricing', name: 'Pricing', icon: 'tag' },
              { slug: 'disruptions', name: 'Disruptions', icon: 'alert' },
            ]} 
            locations={[
              { slug: 'united-kingdom', name: 'United Kingdom' },
              { slug: 'japan', name: 'Japan' },
              { slug: 'united-arab-emirates', name: 'UAE' },
              { slug: 'thailand', name: 'Thailand' },
              { slug: 'france', name: 'France' },
            ]} 
          />
        </div>
      </div>

      {/* Feed */}
      <section className="container mx-auto px-4 py-8">
        <FeedList articles={articles} loading={false} error={error} />
      </section>
    </div>
  )
}
