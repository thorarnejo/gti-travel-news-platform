// Shared types for GTI News Platform

export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type Status = 'new' | 'update' | 'warning' | 'disruption' | 'price_change'
export type LocationType = 'country' | 'city'

export interface Article {
  id: number
  slug: string
  status: Status
  severity: Severity
  headline: string
  summary: string
  body: string
  tldr: string[]
  what_changed: string | null
  who_is_affected: string | null
  what_to_do: string | null
  image_url: string | null
  original_url: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  category: Category
  locations: Location[]
  sources: Source[]
}

export interface ArticleListItem {
  id: number
  slug: string
  status: Status
  severity: Severity
  headline: string
  summary: string
  tldr: string[]
  what_to_do: string | null
  image_url: string | null
  published_at: string | null
  updated_at: string
  category: Category
  locations: Location[]
}

export interface Category {
  id: number
  slug: string
  name: string
  description: string | null
  icon: string | null
  parent_id: number | null
}

export interface Location {
  id: number
  slug: string
  name: string
  location_type: LocationType
  country_id: number | null
  city_id: number | null
}

export interface Source {
  id: number
  slug: string
  name: string
  website_url: string | null
  logo_url: string | null
}

export interface ArticleFilters {
  category?: string
  location?: string
  severity?: Severity
  status?: Status
  from?: string
  to?: string
  q?: string
  sort?: 'published_at' | 'severity' | 'created_at'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface FiltersResponse {
  categories: Pick<Category, 'slug' | 'name' | 'icon'>[]
  locations: Pick<Location, 'slug' | 'name' | 'location_type'>[]
  severities: Severity[]
  statuses: Status[]
}

export interface ArticlesResponse {
  articles: ArticleListItem[]
  meta: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface CreateArticleInput {
  headline: string
  summary: string
  body: string
  tldr?: string[]
  what_changed?: string
  who_is_affected?: string
  what_to_do?: string
  status?: Status
  severity?: Severity
  category_id: number
  location_ids?: number[]
  source_ids?: number[]
  image_url?: string
  original_url?: string
  is_published?: boolean
}

export interface UpdateArticleInput {
  headline?: string
  summary?: string
  body?: string
  tldr?: string[]
  what_changed?: string
  who_is_affected?: string
  what_to_do?: string
  status?: Status
  severity?: Severity
  category_id?: number
  location_ids?: number[]
  source_ids?: number[]
  image_url?: string
  original_url?: string
  is_published?: boolean
}

// API response envelope
export interface ApiResponse<T> {
  data?: T
  error?: {
    code: string
    message: string
  }
}
