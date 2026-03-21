import type { Article, HeroImage } from '@/types'

interface ArticleFilters {
  category?: string
  location?: string
  severity?: string
  sortBy?: 'latest' | 'severity'
}

// In-memory source used by client pages until API hydration is fully wired.
export const sampleArticles: Article[] = [
  {
    id: 'a1',
    slug: 'london-heathrow-security-strike-delays',
    title: 'Heathrow warns of longer security queues during weekend staffing action',
    summary: 'Security processing times are expected to increase during peak departure windows.',
    category: 'flights',
    location: {
      country: 'United Kingdom',
      city: 'London',
      countryCode: 'GB',
    },
    severity: 'high',
    status: 'disruption',
    articleStatus: 'active',
    publishedAt: '2026-03-21T16:30:00.000Z',
    updatedAt: '2026-03-21T18:10:00.000Z',
    tl_dr: [
      'London: Heathrow expects longer security lines this weekend.',
      'Passengers are advised to arrive at least 3 hours before departure for international flights.',
      'Airlines may close bag drop earlier if terminal congestion worsens.',
    ],
    body: [
      'Heathrow Airport has issued an operational advisory ahead of planned staffing action affecting selected security lanes. Terminal teams are prioritizing families, reduced mobility passengers, and near-departure flights, but longer wait times are still expected in morning and late-afternoon peaks.',
      'Several carriers have also updated check-in recommendations and warned that passengers arriving close to departure may miss baggage deadlines. Airport operations remain active, but on-time performance is likely to be impacted through the weekend.',
    ],
    whatThisMeans: 'Travelers departing Heathrow should expect slower pre-flight processing and build extra time into airport arrival plans.',
    whatChanged: 'Security staffing levels dropped for selected shifts, increasing queue times at screening checkpoints.',
    whoIsAffected: 'All departing passengers at Heathrow, especially international travelers with checked baggage.',
    whatToDo: 'Arrive early, check your airline app for gate and bag-drop changes, and keep boarding documents ready before reaching security.',
    sources: [
      {
        name: 'Heathrow Airport Operational Updates',
        url: 'https://www.heathrow.com',
        isOfficial: true,
        type: 'official',
      },
    ],
    impactRegions: ['London', 'United Kingdom', 'Europe'],
    relatedArticles: ['tokyo-entry-system-maintenance-notice'],
  },
  {
    id: 'a2',
    slug: 'tokyo-entry-system-maintenance-notice',
    title: 'Japan immigration e-gates set for overnight maintenance at major airports',
    summary: 'Automated entry processing may be slower overnight due to scheduled system maintenance.',
    category: 'visa',
    location: {
      country: 'Japan',
      city: 'Tokyo',
      countryCode: 'JP',
    },
    severity: 'medium',
    status: 'update',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-21T10:00:00.000Z',
    updatedAt: '2026-03-21T12:45:00.000Z',
    tl_dr: [
      'Tokyo: Overnight maintenance may slow automated immigration lanes.',
      'Manual counters will remain open but may have longer processing times.',
      'Travelers should keep printed arrival details available as backup.',
    ],
    body: [
      'Japan immigration authorities announced planned maintenance for e-gate infrastructure serving international arrivals at key airports including Haneda and Narita. During the maintenance window, some automated kiosks may be intermittently unavailable.',
      'Officials state that all required border checks will continue through staffed counters. However, queue times may vary as arriving passenger volumes rise during late-night inbound waves.',
    ],
    whatThisMeans: 'Entry remains open, but processing may be slower than normal if automated lanes are temporarily unavailable.',
    whatChanged: 'Planned maintenance was confirmed for overnight hours affecting parts of the e-gate system.',
    whoIsAffected: 'International arrivals using automated immigration processing in Tokyo.',
    whatToDo: 'Allow extra time for arrival formalities and keep passport, return itinerary, and accommodation details ready for manual checks.',
    sources: [
      {
        name: 'Immigration Services Agency of Japan',
        url: 'https://www.moj.go.jp/isa/',
        isOfficial: true,
        type: 'official',
      },
    ],
    impactRegions: ['Tokyo', 'Japan', 'East Asia'],
    relatedArticles: ['london-heathrow-security-strike-delays'],
  },
  {
    id: 'a3',
    slug: 'bangkok-heat-advisory-outdoor-tours',
    title: 'Bangkok heat advisory prompts tour operators to adjust daytime schedules',
    summary: 'High daytime temperatures are leading operators to move some activities to early morning and evening.',
    category: 'safety',
    location: {
      country: 'Thailand',
      city: 'Bangkok',
      countryCode: 'TH',
    },
    severity: 'low',
    status: 'warning',
    articleStatus: 'active',
    publishedAt: '2026-03-20T09:15:00.000Z',
    updatedAt: '2026-03-21T08:20:00.000Z',
    tl_dr: [
      'Bangkok: Heat advisories are in effect during peak afternoon hours.',
      'Some guided tours are shifting itineraries to cooler periods.',
      'Hydration and sun protection are strongly recommended for outdoor travel.',
    ],
    body: [
      'Local weather conditions in Bangkok have remained above seasonal averages this week, triggering public-health heat guidance. Tourism providers reported schedule adjustments for walking routes, temple visits, and river excursions to reduce midday exposure.',
      'Public transport and indoor attractions remain fully accessible, and no city-wide travel restrictions are currently in place. Officials continue to encourage preventive measures for visitors unfamiliar with tropical heat conditions.',
    ],
    whatThisMeans: 'Travel plans can proceed, but comfort and safety improve with adjusted activity times and hydration planning.',
    whatChanged: 'Operators and local authorities expanded heat-risk messaging and shifted selected tour timings.',
    whoIsAffected: 'Visitors participating in outdoor activities in Bangkok during afternoon hours.',
    whatToDo: 'Wear light clothing, carry water, use sun protection, and consider scheduling outdoor plans before 11:00 or after 16:00.',
    sources: [
      {
        name: 'Thai Meteorological Department',
        url: 'https://www.tmd.go.th/en/',
        isOfficial: true,
        type: 'official',
      },
    ],
    impactRegions: ['Bangkok', 'Thailand', 'Southeast Asia'],
  },
]

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
