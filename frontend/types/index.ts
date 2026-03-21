export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type Status = 'new' | 'update' | 'warning' | 'disruption' | 'price-change'
export type ArticleStatus = 'active' | 'ongoing' | 'resolved'  // For article cards/pages
export type Category = 'flights' | 'hotels' | 'destinations' | 'visa' | 'safety' | 'weather'

export interface Source {
  name: string
  url: string
  lastUpdated?: string
  isOfficial?: boolean
  type?: 'official' | 'news'
}

export interface HeroImage {
  src: string
  alt: string
}

export interface InlineMedia {
  id: string
  type: 'image' | 'map' | 'chart' | 'embed'
  src: string
  title?: string
  caption?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  summary: string
  category: Category
  location: {
    country: string
    city?: string
    countryCode: string
  }
  severity: Severity
  status: Status
  articleStatus?: ArticleStatus  // Active/Ongoing/Resolved for display
  publishedAt: string
  updatedAt: string
  tl_dr: string[]  // Array of bullets with context - FIRST BULLET MUST START WITH LOCATION NAME
  body: string[]  // SEO body section - 2-3 paragraphs of news story
  whatThisMeans: string  // Practical impact summary for travelers
  whatChanged: string
  whoIsAffected: string
  whatToDo: string  // Category-specific action items
  sources: Source[]
  impactRegions: string[]
  relatedArticles?: string[]  // Array of article slugs for related articles section
  heroImage?: HeroImage
  inlineMedia?: InlineMedia[]
}

export interface FilterState {
  category?: Category
  location?: string
  severity?: Severity
  status?: Status
  timeRange?: '1h' | '6h' | '24h' | '7d' | '30d'
  sortBy?: 'latest' | 'severity'
}

export interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'compact' | 'featured'
}

export interface ArticleListItem {
  slug: string
  headline: string
  summary: string
  category: { name: string; slug: string }
  severity: Severity
  status: Status
  articleStatus?: ArticleStatus
  locations: { name: string; location_type: string }[]
  published_at: string
  updated_at?: string
}

// Helper to convert Article to ArticleListItem for feed display
export function articleToListItem(article: Article): ArticleListItem {
  return {
    slug: article.slug,
    headline: article.title,
    summary: article.summary,
    category: { name: article.category, slug: article.category },
    severity: article.severity,
    status: article.status,
    articleStatus: article.articleStatus,
    locations: article.location.city 
      ? [
          { name: article.location.city, location_type: 'city' },
          { name: article.location.country, location_type: 'country' }
        ]
      : [
          { name: article.location.country, location_type: 'country' }
        ],
    published_at: article.publishedAt,
    updated_at: article.updatedAt,
  }
}
