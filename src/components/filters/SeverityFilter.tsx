'use client'

import { cn } from '@/lib/utils'

interface SeverityFilterProps {
  value: string
  onChange: (value: string) => void
}

const severityOptions = [
  { value: '', label: 'All Severities' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'low', label: 'Low', color: 'bg-green-500' },
]

export function SeverityFilter({ value, onChange }: SeverityFilterProps) {
  return (
    <div className="flex items-center gap-1 px-3 py-1.5 bg-background border border-border rounded-full">
      <span className="text-xs text-muted-foreground mr-1">Severity:</span>
      {severityOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full transition-colors',
            value === option.value
              ? 'bg-foreground text-background'
              : 'hover:bg-muted'
          )}
        >
          {option.value && (
            <span className={cn('h-2 w-2 rounded-full', option.color)} />
          )}
          {option.label}
        </button>
      ))}
    </div>
  )
}
