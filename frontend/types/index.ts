export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type Status = 'new' | 'update' | 'warning' | 'disruption' | 'price-change'
export type Category = 'flights' | 'hotels' | 'destinations' | 'visa' | 'safety' | 'weather'

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
  publishedAt: string
  updatedAt: string
  tl_dr: string
  whatChanged: string
  whoIsAffected: string
  whatToDo: string
  sources: Array<{
    name: string
    url: string
  }>
  impactRegions: string[]
  relatedArticles?: string[]
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
