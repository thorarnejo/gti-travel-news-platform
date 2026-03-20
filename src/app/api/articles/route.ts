import { NextRequest, NextResponse } from 'next/server'
import { getArticles } from '@/lib/articleService'
import type { ArticleFilters, Severity, Status } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters: ArticleFilters = {
      category: searchParams.get('category') || undefined,
      location: searchParams.get('location') || undefined,
      severity: (searchParams.get('severity') || undefined) as Severity | undefined,
      status: (searchParams.get('status') || undefined) as Status | undefined,
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      q: searchParams.get('q') || undefined,
      sort: (searchParams.get('sort') as ArticleFilters['sort']) || 'published_at',
      order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 20,
    }

    // Validate severity
    if (filters.severity && !['low', 'medium', 'high', 'critical'].includes(filters.severity)) {
      return NextResponse.json(
        { error: { code: 'INVALID_SEVERITY', message: 'Invalid severity filter' } },
        { status: 400 }
      )
    }

    // Validate status
    if (filters.status && !['new', 'update', 'warning', 'disruption', 'price_change'].includes(filters.status)) {
      return NextResponse.json(
        { error: { code: 'INVALID_STATUS', message: 'Invalid status filter' } },
        { status: 400 }
      )
    }

    // Validate page
    if (filters.page && filters.page < 1) {
      return NextResponse.json(
        { error: { code: 'INVALID_PAGE', message: 'Page must be at least 1' } },
        { status: 400 }
      )
    }

    // Validate limit
    if (filters.limit && (filters.limit < 1 || filters.limit > 100)) {
      return NextResponse.json(
        { error: { code: 'INVALID_LIMIT', message: 'Limit must be between 1 and 100' } },
        { status: 400 }
      )
    }

    const result = await getArticles(filters)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch articles' } },
      { status: 500 }
    )
  }
}
