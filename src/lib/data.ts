// Data access layer - API client for GTI News Platform

import type {
  Article,
  ArticleListItem,
  ArticleFilters,
  ArticlesResponse,
  Category,
  Location,
  FiltersResponse,
} from '@/types'
import { getMockArticleBySlug, getMockArticles, getMockCategories, getMockLocations } from './mockData'

// Use current origin in browser, or absolute URL on server
// For server-side rendering, we need the full production URL
const API_BASE = typeof window !== 'undefined'
  ? ''  // Empty string means use current origin in browser
  : 'https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app'

// ============================================================
// API CLIENT
// ============================================================

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}/api${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.error?.message || `HTTP ${response.status}`)
  }

  return response.json()
}

// ============================================================
// ARTICLE API
// ============================================================

export async function getArticles(filters: ArticleFilters = {}): Promise<ArticleListItem[]> {
  const params = new URLSearchParams()

  if (filters.category) params.set('category', filters.category)
  if (filters.location) params.set('location', filters.location)
  if (filters.severity) params.set('severity', filters.severity)
  if (filters.status) params.set('status', filters.status)
  if (filters.from) params.set('from', filters.from)
  if (filters.to) params.set('to', filters.to)
  if (filters.q) params.set('q', filters.q)
  if (filters.sort) params.set('sort', filters.sort)
  if (filters.order) params.set('order', filters.order)
  if (filters.page) params.set('page', String(filters.page))
  if (filters.limit) params.set('limit', String(filters.limit))

  const queryString = params.toString()
  const endpoint = `/articles${queryString ? `?${queryString}` : ''}`

  try {
    const response = await apiFetch<ArticlesResponse>(endpoint)
    return response.articles
  } catch (error) {
    // Fallback to mock data if API unavailable
    const mock = getMockArticles(filters)
    return mock.articles
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await apiFetch<{ article: Article }>(`/articles/${slug}`)
    return response.article
  } catch (error) {
    // Fallback to mock data if API unavailable (e.g., during local dev)
    const mockArticle = getMockArticleBySlug(slug)
    if (mockArticle) return mockArticle
    if (error instanceof Error && error.message.includes('404')) {
      return null
    }
    throw error
  }
}

export async function createArticle(input: {
  headline: string
  summary: string
  body: string
  tldr?: string[]
  what_changed?: string
  who_is_affected?: string
  what_to_do?: string
  status?: string
  severity?: string
  category_id: number
  location_ids?: number[]
  source_ids?: number[]
  image_url?: string
  original_url?: string
  is_published?: boolean
}): Promise<Article> {
  const response = await apiFetch<{ article: Article }>('/articles/create', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return response.article
}

export async function updateArticle(
  id: number,
  input: {
    headline?: string
    summary?: string
    body?: string
    tldr?: string[]
    what_changed?: string
    who_is_affected?: string
    what_to_do?: string
    status?: string
    severity?: string
    category_id?: number
    location_ids?: number[]
    source_ids?: number[]
    image_url?: string
    original_url?: string
    is_published?: boolean
  }
): Promise<Article | null> {
  try {
    const response = await apiFetch<{ article: Article }>(`/articles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
    return response.article
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return null
    }
    throw error
  }
}

// ============================================================
// FILTER API
// ============================================================

export async function getFilters(): Promise<FiltersResponse> {
  const response = await apiFetch<{ filters: FiltersResponse }>('/filters')
  return response.filters
}

export async function getCategories(): Promise<string[]> {
  const response = await apiFetch<{ categories: Category[] }>('/categories')
  return response.categories.map((c) => c.slug)
}

export async function getLocations(): Promise<string[]> {
  const response = await apiFetch<{ locations: Location[] }>('/locations')
  const locationSet = new Set<string>()
  response.locations.forEach((l) => {
    locationSet.add(l.name)
  })
  return Array.from(locationSet)
}

// ============================================================
// FALLBACK DATA (for when API is unavailable)
// ============================================================

export const fallbackArticles: ArticleListItem[] = [
  {
    id: 1,
    slug: 'europe-pilot-strike-march-2026',
    status: 'disruption',
    severity: 'critical',
    headline: 'Europe-Wide Pilot Strike Grounds 1,200 Flights Across 6 Countries',
    summary: 'A coordinated 72-hour pilot strike across Air France, Lufthansa, and Iberia has forced the cancellation of over 1,200 flights affecting major hubs including Paris CDG, Frankfurt, and Madrid.',
    tldr: ['Check airline website for your flight status before leaving for the airport', 'Rebooking via alternative carriers may be faster'],
    what_to_do: 'Check airline website for your flight status before leaving for the airport.',
    image_url: null,
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 1, slug: 'flights', name: 'Flights', description: null, icon: '✈️', parent_id: null },
    locations: [
      { id: 1, slug: 'france', name: 'France', location_type: 'country', country_id: 1, city_id: null },
      { id: 2, slug: 'germany', name: 'Germany', location_type: 'country', country_id: 2, city_id: null },
    ],
  },
  {
    id: 2,
    slug: 'thailand-visa-exempt-extended-2026',
    status: 'update',
    severity: 'medium',
    headline: 'Thailand Extends Visa-Exempt Stay to 60 Days for 93 Countries',
    summary: 'The Thai Cabinet approved a doubling of visa-exempt stay limits from 30 to 60 days for citizens of 93 countries, effective 1 April 2026.',
    tldr: ['Visa-exempt stay now 60 days (doubled from 30)', 'Still capped at 90 days per 180-day rolling period'],
    what_to_do: 'Verify your eligibility and check passport validity (minimum 6 months).',
    image_url: null,
    published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: { id: 2, slug: 'visa', name: 'Visa & Entry', description: null, icon: '🛂', parent_id: null },
    locations: [
      { id: 6, slug: 'thailand', name: 'Thailand', location_type: 'country', country_id: 6, city_id: null },
    ],
  },
]

export const fallbackCategories = ['flights', 'visa', 'safety', 'transport', 'weather', 'accommodation', 'events', 'prices', 'airports']
export const fallbackLocations = ['France', 'Germany', 'Spain', 'Italy', 'Japan', 'Thailand', 'United States', 'United Kingdom', 'Australia', 'Brazil']
