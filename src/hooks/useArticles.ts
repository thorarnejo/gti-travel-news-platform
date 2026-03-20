'use client'

import { useEffect, useState } from 'react'

export function useArticles(filters?: {
  category?: string
  location?: string
  severity?: string
  status?: string
  sortBy?: string
  sort?: string
  order?: string
}) {
  const [articles, setArticles] = useState<import('@/types').ArticleListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (filters?.category) params.set('category', filters.category)
        if (filters?.location) params.set('location', filters.location)
        if (filters?.severity) params.set('severity', filters.severity)
        if (filters?.status) params.set('status', filters.status)
        // Support both sort and sortBy for compatibility
        const sortValue = filters?.sort || filters?.sortBy
        if (sortValue) params.set('sort', sortValue)
        if (filters?.order) params.set('order', filters.order)

        const response = await fetch(`/api/articles?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch articles')

        const responseData = await response.json()
        setArticles(responseData.articles)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [filters?.category, filters?.location, filters?.severity, filters?.status, filters?.sort, filters?.sortBy, filters?.order])

  return { articles, loading, error }
}
