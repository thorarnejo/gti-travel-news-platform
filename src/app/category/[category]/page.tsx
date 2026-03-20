import { FeedList } from '@/components/feed/FeedList'
import { FilterBar } from '@/components/filters/FilterBar'
import { getArticles } from '@/lib/data'
import type { ArticleFilters, ArticleListItem } from '@/types'
import { Plane } from 'lucide-react'
import Link from 'next/link'

const categoryLabels: Record<string, string> = {
  flights: 'Flights',
  hotels: 'Hotels',
  destinations: 'Destinations',
  visa: 'Visa & Entry',
  safety: 'Safety',
  weather: 'Weather',
  transport: 'Transport',
  accommodation: 'Accommodation',
  events: 'Events',
  prices: 'Prices',
  airports: 'Airports',
}

const validCategories = ['flights', 'hotels', 'destinations', 'visa', 'safety', 'weather', 'transport', 'accommodation', 'events', 'prices', 'airports']

// Server component - no 'use client' directive
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { category } = params
  const label = categoryLabels[category] || category

  // Validate category
  if (!validCategories.includes(category)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The category &quot;{category}&quot; doesn&apos;t exist.
          </p>
          <Link href="/" className="text-primary hover:underline">
            Return to Live Feed
          </Link>
        </div>
      </div>
    )
  }

  // Build filters from search params
  const sortValue = typeof searchParams.sortBy === 'string' ? searchParams.sortBy : typeof searchParams.sort === 'string' ? searchParams.sort : 'published_at'
  const filters: ArticleFilters = {
    category,
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Plane className="h-4 w-4" />
            {label} News
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {label} News & Alerts
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Latest updates, disruptions, and important information about {label.toLowerCase()}.
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
