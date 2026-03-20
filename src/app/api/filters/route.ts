import { NextResponse } from 'next/server'
import { getFilters } from '@/lib/articleService'

export async function GET() {
  try {
    const filters = await getFilters()
    return NextResponse.json({ filters })
  } catch (error) {
    console.error('Error fetching filters:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch filters' } },
      { status: 500 }
    )
  }
}
