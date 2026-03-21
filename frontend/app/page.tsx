'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { FeedList } from '@/components/feed/FeedList'
import { FilterBar } from '@/components/filters/FilterBar'
import { getArticles, getCategories, getLocations } from '@/lib/data'
import { Plane } from 'lucide-react'

function HomeContent() {
  const searchParams = useSearchParams()
  
  const filters = {
    category: searchParams.get('category') || undefined,
    location: searchParams.get('location') || undefined,
    severity: searchParams.get('severity') || undefined,
    sortBy: searchParams.get('sortBy') || 'latest',
  }

  const articles = getArticles(filters)
  const categories = getCategories()
  const locations = getLocations()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Plane className="h-4 w-4" />
            Live Updates
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Travel News Live Feed
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time alerts, updates, and news to help you travel smarter. 
            From flight disruptions to visa changes, we keep you informed.
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-4">
        <div className="container mx-auto px-4">
          <FilterBar
            categories={categories}
            locations={locations}
          />
        </div>
      </div>

      {/* Feed */}
      <section className="container mx-auto px-4 py-8">
        <FeedList articles={articles} />
      </section>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-8 w-8 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading feed...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
