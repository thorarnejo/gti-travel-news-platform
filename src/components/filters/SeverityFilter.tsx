'use client'

import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'

interface SeverityFilterProps {
  value: string
  onChange: (value: string) => void
}

const severityOptions = [
  { value: '', label: 'All', fullLabel: 'All Severities', color: 'bg-gray-500' },
  { value: 'critical', label: 'C', fullLabel: 'Critical', color: 'bg-red-500', textColor: 'text-red-600' },
  { value: 'high', label: 'H', fullLabel: 'High', color: 'bg-orange-500', textColor: 'text-orange-600' },
  { value: 'medium', label: 'M', fullLabel: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  { value: 'low', label: 'L', fullLabel: 'Low', color: 'bg-green-500', textColor: 'text-green-600' },
]

export function SeverityFilter({ value, onChange }: SeverityFilterProps) {
  const selectedOption = severityOptions.find(o => o.value === value) || severityOptions[0]

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground hidden sm:inline">Severity:</span>
      
      <div className="flex items-center bg-muted rounded-full p-1">
        {severityOptions.map((option) => {
          const isSelected = value === option.value
          
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex items-center justify-center px-2.5 py-1.5 text-xs font-medium rounded-full transition-all min-w-[28px]',
                isSelected
                  ? cn('text-white shadow-sm', option.color)
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10'
              )}
              title={option.fullLabel}
            >
              {option.value === 'critical' && isSelected ? (
                <AlertTriangle className="h-3 w-3" />
              ) : (
                option.label
              )}
            </button>
          )
        })}
      </div>

      {/* Show selected label on desktop */}
      <span className={cn(
        'text-xs font-medium hidden lg:inline',
        selectedOption.textColor || 'text-muted-foreground'
      )}>
        {selectedOption.fullLabel}
      </span>
    </div>
  )
}
