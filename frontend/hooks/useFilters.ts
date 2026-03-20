'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useFilters() {
  const searchParams = useSearchParams()

  const filters = useMemo(() => ({
    category: searchParams.get('category') || undefined,
    location: searchParams.get('location') || undefined,
    severity: searchParams.get('severity') || undefined,
    status: searchParams.get('status') || undefined,
    sortBy: searchParams.get('sortBy') || 'latest',
    timeRange: searchParams.get('timeRange') || undefined,
  }), [searchParams])

  const hasActiveFilters = useMemo(() => {
    return !!(filters.category || filters.location || filters.severity || filters.status || filters.timeRange)
  }, [filters])

  return { filters, hasActiveFilters }
}
