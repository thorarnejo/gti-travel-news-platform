import { describe, test, expect } from '@jest/globals'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { render, screen } from '@testing-library/react'

describe('UI Components', () => {
  test('SeverityBadge renders all severity levels', () => {
    const severities = ['low', 'medium', 'high', 'critical']
    
    severities.forEach((severity) => {
      render(<SeverityBadge severity={severity} />)
      expect(screen.getByText(severity.toUpperCase())).toBeInTheDocument()
    })
  })
  
  test('StatusBadge renders all status types', () => {
    const statuses = ['new', 'update', 'warning', 'disruption', 'price_change']
    
    statuses.forEach((status) => {
      render(<StatusBadge status={status} />)
      const label = status === 'price_change' ? 'PRICE CHANGE' : status.toUpperCase()
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })
})
