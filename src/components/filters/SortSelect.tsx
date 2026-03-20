'use client'

import { cn } from '@/lib/utils'
import { ArrowUpDown } from 'lucide-react'

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
}

const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'severity', label: 'Highest Severity' },
]

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'px-2 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20'
        )}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
