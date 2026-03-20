'use client'

import { cn } from '@/lib/utils'
import { Plane, Building, Map, FileText, Shield, Cloud } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CategoryFilterProps {
  value: string
  onChange: (value: string) => void
  categories: string[]
}

const categoryIcons: Record<string, React.ElementType> = {
  flights: Plane,
  hotels: Building,
  destinations: Map,
  visa: FileText,
  safety: Shield,
  weather: Cloud,
}

const categoryLabels: Record<string, string> = {
  flights: 'Flights',
  hotels: 'Hotels',
  destinations: 'Destinations',
  visa: 'Visa',
  safety: 'Safety',
  weather: 'Weather',
}

export function CategoryFilter({ value, onChange, categories }: CategoryFilterProps) {
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
        const Icon = categoryIcons[category] || Map
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
