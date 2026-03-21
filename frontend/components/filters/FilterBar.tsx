'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { CategoryFilter } from './CategoryFilter'
import { LocationFilter } from './LocationFilter'
import { SeverityFilter } from './SeverityFilter'
import { SortSelect } from './SortSelect'
import { X } from 'lucide-react'

interface FilterBarProps {
  className?: string
  categories: string[]
  locations: string[]
}

export function FilterBar({ className, categories, locations }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value.toLowerCase())
      } else {
        params.delete(key)
      }
      const query = params.toString()
      router.push(query ? `${pathname}?${query}` : pathname)
    },
    [router, pathname, searchParams]
  )

  const clearFilters = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  const hasActiveFilters = searchParams.has('category') || 
    searchParams.has('location') || 
    searchParams.has('severity') ||
    searchParams.has('timeRange')

  return (
    <div className={cn('w-full', className)}>
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col gap-4">
          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3">
            <CategoryFilter
              value={searchParams.get('category') || ''}
              onChange={(val) => updateFilter('category', val || null)}
              categories={categories}
            />
            <LocationFilter
              value={searchParams.get('location') || ''}
              onChange={(val) => updateFilter('location', val || null)}
              locations={locations}
            />
            <SeverityFilter
              value={searchParams.get('severity') || ''}
              onChange={(val) => updateFilter('severity', val || null)}
            />
            <SortSelect
              value={searchParams.get('sortBy') || 'latest'}
              onChange={(val) => updateFilter('sortBy', val)}
            />
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
