'use client'

import { cn } from '@/lib/utils'
import { Plane, Building, Map, FileText, Shield, Cloud, Landmark, Tag, AlertCircle, Bookmark } from 'lucide-react'

interface CategoryFilterProps {
  value: string
  onChange: (value: string) => void
  categories: string[]
  compact?: boolean
}

const categoryIcons: Record<string, React.ElementType> = {
  flights: Plane,
  hotels: Building,
  destinations: Map,
  visa: FileText,
  safety: Shield,
  weather: Cloud,
  transport: Plane,
  'entry-rules': FileText,
  attractions: Landmark,
  pricing: Tag,
  disruptions: AlertCircle,
}

const categoryLabels: Record<string, string> = {
  flights: 'Flights',
  hotels: 'Hotels',
  destinations: 'Dest',
  visa: 'Visa',
  safety: 'Safety',
  weather: 'Weather',
  transport: 'Transport',
  'entry-rules': 'Entry',
  attractions: 'Sights',
  pricing: 'Deals',
  disruptions: 'Alerts',
}

export function CategoryFilter({ value, onChange, categories, compact = false }: CategoryFilterProps) {
  if (compact) {
    // Horizontal scrollable compact view
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange('')}
          className={cn(
            'flex-shrink-0 px-2.5 py-1.5 text-xs font-medium rounded-full border transition-colors whitespace-nowrap',
            !value
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background border-border hover:border-primary/50'
          )}
        >
          All
        </button>
        {categories.map((category) => {
          const Icon = categoryIcons[category] || Bookmark
          const isSelected = value === category

          return (
            <button
              key={category}
              onClick={() => onChange(isSelected ? '' : category)}
              className={cn(
                'flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-full border transition-colors whitespace-nowrap',
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border hover:border-primary/50'
              )}
            >
              <Icon className="h-3 w-3" />
              <span className="hidden sm:inline">{categoryLabels[category] || category}</span>
              <span className="sm:hidden">{categoryLabels[category]?.slice(0, 4) || category.slice(0, 4)}</span>
            </button>
          )
        })}
      </div>
    )
  }

  // Full grid view for expanded mode
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={cn(
          'px-3 py-1.5 text-sm rounded-full border transition-colors',
          !value
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background border-border hover:border-primary/50'
        )}
      >
        All
      </button>
      {categories.map((category) => {
        const Icon = categoryIcons[category] || Bookmark
        const isSelected = value === category

        return (
          <button
            key={category}
            onClick={() => onChange(isSelected ? '' : category)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-colors',
              isSelected
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border hover:border-primary/50'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {categoryLabels[category] || category}
          </button>
        )
      })}
    </div>
  )
}
