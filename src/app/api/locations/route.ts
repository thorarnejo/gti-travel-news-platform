import { NextRequest, NextResponse } from 'next/server'
import { getLocations } from '@/lib/articleService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type && !['country', 'city'].includes(type)) {
      return NextResponse.json(
        { error: { code: 'INVALID_TYPE', message: 'Type must be "country" or "city"' } },
        { status: 400 }
      )
    }

    const locations = await getLocations(type as 'country' | 'city' | undefined)
    return NextResponse.json({ locations })
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch locations' } },
      { status: 500 }
    )
  }
}
