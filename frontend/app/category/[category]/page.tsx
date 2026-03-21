'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { FeedList } from '@/components/feed/FeedList'
import { FilterBar } from '@/components/filters/FilterBar'
import { getCategories, getLocations } from '@/lib/data'
import { Plane } from 'lucide-react'
import Link from 'next/link'
import type { Article } from '@/types'

const categoryLabels: Record<string, string> = {
  flights: 'Flights',
  hotels: 'Hotels',
  destinations: 'Destinations',
  visa: 'Visa',
  safety: 'Safety',
  weather: 'Weather',
}

function CategoryContent({ category }: { category: string }) {
  const searchParams = useSearchParams()
  const categories = getCategories().map(c => c.slug)
  const locations = getLocations().map(l => l.name)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  const filters = {
    category,
    location: searchParams.get('location') || undefined,
    severity: searchParams.get('severity') || undefined,
    sortBy: searchParams.get('sortBy') || 'latest',
  }

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then(data => {
        let filtered = data.articles || []
        if (filters.category) {
          filtered = filtered.filter((a: Article) => a.category === filters.category)
        }
        if (filters.severity) {
          filtered = filtered.filter((a: Article) => a.severity === filters.severity)
        }
        setArticles(filtered)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [category])
  const label = categoryLabels[category] || category

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
          <FilterBar categories={categories} locations={locations} />
        </div>
      </div>

      {/* Feed */}
      <section className="container mx-auto px-4 py-8">
        <FeedList articles={articles} />
      </section>
    </div>
  )
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const validCategories = getCategories().map(c => c.slug)

  if (!validCategories.includes(params.category)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The category &quot;{params.category}&quot; doesn&apos;t exist.
          </p>
          <Link href="/" className="text-primary hover:underline">
            Return to Live Feed
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-8 w-8 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <CategoryContent category={params.category} />
    </Suspense>
  )
}
