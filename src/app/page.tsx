import Link from 'next/link'
import { FeedList } from '@/components/feed/FeedList'
import { FilterBar } from '@/components/filters/FilterBar'
import { getArticles } from '@/lib/data'
import type { ArticleFilters, ArticleListItem } from '@/types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'GTI Travel News | Real-Time Travel Alerts',
  description: 'Real-time travel alerts, news, and updates',
}

function mapSeverityParam(severity?: string): ArticleFilters['severity'] | undefined {
  if (!severity) return undefined
  const normalized = severity.toLowerCase()

  if (normalized === 'c') return 'critical'
  if (normalized === 'h') return 'high'
  if (normalized === 'm') return 'medium'
  if (normalized === 'l') return 'low'

  if (['critical', 'high', 'medium', 'low'].includes(normalized)) {
    return normalized as ArticleFilters['severity']
  }

  return undefined
}

function mapTimeRangeToFrom(timeRange?: string): string | undefined {
  if (!timeRange) return undefined

  const now = new Date()
  const from = new Date(now)

  if (timeRange === '24h') from.setHours(from.getHours() - 24)
  else if (timeRange === '7d') from.setDate(from.getDate() - 7)
  else if (timeRange === '30d') from.setDate(from.getDate() - 30)
  else return undefined

  return from.toISOString()
}

function formatTickerDate(date: string | null): string {
  if (!date) return 'Unknown date'
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const rawSortBy = typeof searchParams.sortBy === 'string' ? searchParams.sortBy : 'latest'
  const rawTimeRange = typeof searchParams.timeRange === 'string' ? searchParams.timeRange : undefined

  const filters: ArticleFilters = {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    location: typeof searchParams.location === 'string' ? searchParams.location : undefined,
    severity: mapSeverityParam(typeof searchParams.severity === 'string' ? searchParams.severity : undefined),
    status: typeof searchParams.status === 'string' ? (searchParams.status as any) : undefined,
    from: mapTimeRangeToFrom(rawTimeRange),
    sort: rawSortBy === 'severity' ? 'severity' : 'published_at',
    order: 'desc',
  }

  let articles: ArticleListItem[] = []
  let latestNews: ArticleListItem[] = []

  try {
    articles = await getArticles(filters)
    latestNews = await getArticles({
      sort: 'published_at',
      order: 'desc',
      limit: 5,
    })
    console.log(`Loaded ${articles.length} articles`)
  } catch (e) {
    console.error('Fetch error:', e)
    articles = []
    latestNews = []
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-red-50 to-background py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
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

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
              Global Travels
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              What changed. Who is affected. What to do now.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background/80">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Latest News</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {latestNews.slice(0, 5).map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.slug}`}
                className="min-w-[260px] sm:min-w-[320px] max-w-[360px] rounded-lg border border-border bg-card px-3 py-2 hover:border-primary/50 transition-colors"
              >
                <p className="text-sm font-medium line-clamp-2">{item.headline}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatTickerDate(item.published_at)} • {item.category?.name || 'General'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border py-4">
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

      <section className="container mx-auto px-4 py-8">
        <FeedList articles={articles} loading={false} error={null} />
      </section>
    </div>
  )
}
