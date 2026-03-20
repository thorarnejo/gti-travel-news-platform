'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { CategoryFilter } from './CategoryFilter'
import { LocationFilter } from './LocationFilter'
import { SeverityFilter } from './SeverityFilter'
import { SortSelect } from './SortSelect'
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react'

interface FilterBarProps {
  className?: string
  categories: { slug: string; name: string; icon?: string }[]
  locations: { slug: string; name: string }[]
}

export function FilterBar({ className, categories, locations }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isExpanded, setIsExpanded] = useState(false)

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

  const activeCategory = searchParams.get('category') || ''
  const activeLocation = searchParams.get('location') || ''
  const activeSeverity = searchParams.get('severity') || ''
  const activeTimeRange = searchParams.get('timeRange') || ''

  // Count active filters
  const activeCount = [
    activeCategory, activeLocation, activeSeverity, activeTimeRange
  ].filter(Boolean).length

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile/Compact View */}
      <div className="bg-card border border-border rounded-xl">
        {/* Header Row - Always visible */}
        <div className="flex items-center gap-2 p-3">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isExpanded || hasActiveFilters
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                {activeCount}
              </span>
            )}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {/* Quick Category Scroll */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <CategoryFilter
              value={activeCategory}
              onChange={(val) => updateFilter('category', val || null)}
              categories={categories.map(c => c.slug)}
              compact
            />
          </div>

          {/* Sort Dropdown - Always visible */}
          <SortSelect
            value={searchParams.get('sortBy') || 'latest'}
            onChange={(val) => updateFilter('sortBy', val)}
          />

          {/* Clear Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="Clear all filters"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="border-t border-border p-3 space-y-3">
            {/* Location & Severity Row */}
            <div className="flex flex-wrap items-center gap-2">
              <LocationFilter
                value={activeLocation}
                onChange={(val) => updateFilter('location', val || null)}
                locations={locations.map(l => l.name)}
              />
              <SeverityFilter
                value={activeSeverity}
                onChange={(val) => updateFilter('severity', val || null)}
              />
            </div>

            {/* Quick Time Filters */}
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Time:</span>
              <TimeRangeFilters 
                currentValue={activeTimeRange}
                onChange={(val) => updateFilter('timeRange', val || null)}
              />
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
                <span className="text-xs text-muted-foreground">Active:</span>
                <ActiveFiltersDisplay 
                  category={activeCategory}
                  location={activeLocation}
                  severity={activeSeverity}
                  timeRange={activeTimeRange}
                  categories={categories}
                  locations={locations}
                  onClearCategory={() => updateFilter('category', null)}
                  onClearLocation={() => updateFilter('location', null)}
                  onClearSeverity={() => updateFilter('severity', null)}
                  onClearTimeRange={() => updateFilter('timeRange', null)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function TimeRangeFilters({ currentValue, onChange }: { currentValue: string; onChange: (val: string | null) => void }) {
  const ranges = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
  ]

  return (
    <>
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(currentValue === range.value ? null : range.value)}
          className={cn(
            'px-2.5 py-1 text-xs font-medium rounded-full transition-colors',
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

interface ActiveFiltersDisplayProps {
  category: string
  location: string
  severity: string
  timeRange: string
  categories: { slug: string; name: string }[]
  locations: { slug: string; name: string }[]
  onClearCategory: () => void
  onClearLocation: () => void
  onClearSeverity: () => void
  onClearTimeRange: () => void
}

function ActiveFiltersDisplay({
  category, location, severity, timeRange,
  categories, locations,
  onClearCategory, onClearLocation, onClearSeverity, onClearTimeRange
}: ActiveFiltersDisplayProps) {
  const items = []
  
  if (category) {
    const cat = categories.find(c => c.slug === category)
    items.push({
      label: cat?.name || category,
      onClear: onClearCategory,
      color: 'bg-blue-100 text-blue-700'
    })
  }
  
  if (location) {
    const loc = locations.find(l => l.slug === location)
    items.push({
      label: loc?.name || location,
      onClear: onClearLocation,
      color: 'bg-green-100 text-green-700'
    })
  }
  
  if (severity) {
    items.push({
      label: severity.charAt(0).toUpperCase() + severity.slice(1),
      onClear: onClearSeverity,
      color: 'bg-red-100 text-red-700'
    })
  }
  
  if (timeRange) {
    items.push({
      label: timeRange === '24h' ? '24h' : timeRange === '7d' ? '7 days' : '30 days',
      onClear: onClearTimeRange,
      color: 'bg-purple-100 text-purple-700'
    })
  }

  return (
    <>
      {items.map((item, idx) => (
        <span
          key={idx}
          className={cn(
            'inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full',
            item.color
          )}
        >
          {item.label}
          <button
            onClick={item.onClear}
            className="hover:bg-black/10 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
    </>
  )
}
