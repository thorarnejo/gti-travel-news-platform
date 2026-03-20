'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { CategoryFilter } from './CategoryFilter'
import { LocationFilter } from './LocationFilter'
import { SeverityFilter } from './SeverityFilter'
import { SortSelect } from './SortSelect'
import { X, Filter, AlertTriangle } from 'lucide-react'

interface FilterBarProps {
  className?: string
  categories: { slug: string; name: string; icon?: string }[]
  locations: { slug: string; name: string }[]
}

export function FilterBar({ className, categories, locations }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  const hasActiveFilters = searchParams.has('category') || 
    searchParams.has('location') || 
    searchParams.has('severity') ||
    searchParams.has('timeRange')

  const isCriticalOnly = searchParams.get('severity') === 'critical'

  return (
    <div className={cn('w-full', className)}>
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col gap-4">
          {/* Top Row - Main Filters */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <CategoryFilter
              value={searchParams.get('category') || ''}
              onChange={(val) => updateFilter('category', val || null)}
              categories={categories.map(c => c.slug)}
            />
            <LocationFilter
              value={searchParams.get('location') || ''}
              onChange={(val) => updateFilter('location', val || null)}
              locations={locations.map(l => l.name)}
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

          {/* Quick Toggles */}
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground mr-2">Quick filters:</span>
            
            {/* Critical Only Toggle */}
            <button
              onClick={() => updateFilter('severity', isCriticalOnly ? null : 'critical')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
                isCriticalOnly
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent'
              )}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Critical only
            </button>

            {/* Time Range Quick Filters */}
            <TimeRangeFilters 
              currentValue={searchParams.get('timeRange') || ''}
              onChange={(val) => updateFilter('timeRange', val || null)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function TimeRangeFilters({ currentValue, onChange }: { currentValue: string; onChange: (val: string | null) => void }) {
  const ranges = [
    { value: '24h', label: 'Last 24h' },
    { value: '7d', label: 'Last 7 days' },
  ]

  return (
    <>
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(currentValue === range.value ? null : range.value)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
            currentValue === range.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          {range.label}
        </button>
      ))}
    </>
  )
}
