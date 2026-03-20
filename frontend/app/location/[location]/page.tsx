'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { FeedList } from '@/components/feed/FeedList'
import { FilterBar } from '@/components/filters/FilterBar'
import { getArticles, getCategories, getLocations } from '@/lib/data'
import { Plane, MapPin } from 'lucide-react'
import Link from 'next/link'

function LocationContent({ location }: { location: string }) {
  const searchParams = useSearchParams()
  const categories = getCategories()
  const locations = getLocations()

  const filters = {
    location,
    category: searchParams.get('category') || undefined,
    severity: searchParams.get('severity') || undefined,
    sortBy: searchParams.get('sortBy') || 'latest',
  }

  const articles = getArticles(filters)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Travel News: {location}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Latest updates, alerts, and important information for {location}.
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

export default function LocationPage({ params }: { params: { location: string } }) {
  const decodedLocation = decodeURIComponent(params.location)

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <LocationContent location={decodedLocation} />
    </Suspense>
  )
}
