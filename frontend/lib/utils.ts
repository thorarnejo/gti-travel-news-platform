import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateString)
}

export function severityToColor(severity: string): string {
  const colors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
  }
  return colors[severity as keyof typeof colors] || colors.low
}

export function statusToColor(status: string): string {
  const colors = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    update: 'bg-purple-100 text-purple-800 border-purple-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    disruption: 'bg-red-100 text-red-800 border-red-200',
    'price-change': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  }
  return colors[status as keyof typeof colors] || colors.new
}

export function categoryToIcon(category: string): string {
  const icons: Record<string, string> = {
    flights: '✈️',
    hotels: '🏨',
    destinations: '🗺️',
    visa: '📋',
    safety: '⚠️',
    weather: '🌤️',
  }
  return icons[category] || '📰'
}
