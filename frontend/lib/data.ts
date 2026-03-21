import type { Article, HeroImage } from '@/types'

interface ArticleFilters {
  category?: string
  location?: string
  severity?: string
  sortBy?: 'latest' | 'severity'
}

// In-memory source used by client pages. Keep empty until API hydration is wired.
export const sampleArticles: Article[] = []

// Filter + sort articles (sync for client components)
export function getArticles(filters?: ArticleFilters): Article[] {
  let articles = [...sampleArticles]

  if (!filters) return articles

  if (filters.category) {
    articles = articles.filter((article) => article.category === filters.category)
  }

  if (filters.location) {
    const query = filters.location.toLowerCase()
    articles = articles.filter((article) => {
      const city = article.location.city?.toLowerCase() ?? ''
      const country = article.location.country.toLowerCase()
      return city.includes(query) || country.includes(query)
    })
  }

  if (filters.severity) {
    articles = articles.filter((article) => article.severity === filters.severity)
  }

  if (filters.sortBy === 'severity') {
    const rank: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 }
    articles.sort((a, b) => (rank[b.severity] ?? 0) - (rank[a.severity] ?? 0))
  } else {
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  return articles
}

// Optional async fetch helper for pages/components that need API data directly
export async function fetchArticlesFromApi(): Promise<Article[]> {
  try {
    const response = await fetch('/api/articles')
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    return data.articles || []
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

// Categories
export function getCategories() {
  return [
    { slug: 'flights', name: 'Flights', icon: 'plane' },
    { slug: 'hotels', name: 'Hotels', icon: 'hotel' },
    { slug: 'destinations', name: 'Destinations', icon: 'map-pin' },
    { slug: 'visa', name: 'Visa', icon: 'passport' },
    { slug: 'safety', name: 'Safety', icon: 'shield' },
  ]
}

// Locations
export function getLocations() {
  return [
    { slug: 'united-kingdom', name: 'United Kingdom', type: 'country' },
    { slug: 'japan', name: 'Japan', type: 'country' },
    { slug: 'thailand', name: 'Thailand', type: 'country' },
    { slug: 'france', name: 'France', type: 'country' },
    { slug: 'usa', name: 'United States', type: 'country' },
  ]
}

// Get single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = getArticles()
    return articles.find((a) => a.slug === slug) || null
  } catch {
    return null
  }
}

// Legacy helper retained for compatibility
export function getArticlesSync(): Article[] {
  return getArticles()
}

export const articleHeroImages: Record<string, HeroImage> = {}
