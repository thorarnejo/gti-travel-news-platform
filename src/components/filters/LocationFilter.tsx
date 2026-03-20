'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { MapPin, ChevronDown, X } from 'lucide-react'

interface LocationFilterProps {
  value: string
  onChange: (value: string) => void
  locations: { slug: string; name: string }[]
}

export function LocationFilter({ value, onChange, locations }: LocationFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLocation = locations.find((loc) => loc.slug === value)

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border transition-colors',
          value
            ? 'bg-primary/10 border-primary/30 text-primary'
            : 'bg-background border-border hover:border-primary/50'
        )}
      >
        <MapPin className="h-3.5 w-3.5" />
        <span>{selectedLocation?.name || 'Location'}</span>
        {value ? (
          <X
            className="h-3.5 w-3.5 hover:text-foreground/80"
            onClick={(e) => {
              e.stopPropagation()
              onChange('')
            }}
          />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-2 border-b border-border">
            <input
              type="text"
              placeholder="Search locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {filteredLocations.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">No locations found</p>
            ) : (
              filteredLocations.map((location) => (
                <button
                  key={location.slug}
                  onClick={() => {
                    onChange(location.slug)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-sm text-left rounded-md transition-colors',
                    value === location.slug
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted'
                  )}
                >
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  {location.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
