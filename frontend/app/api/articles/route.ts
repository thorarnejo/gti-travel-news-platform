import { NextResponse } from 'next/server'
import { getArticles, getCategories, getLocations } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const filters = {
    category: searchParams.get('category') || undefined,
    location: searchParams.get('location') || undefined,
    severity: searchParams.get('severity') || undefined,
    status: searchParams.get('status') || undefined,
    sortBy: searchParams.get('sortBy') || 'latest',
  }

  const articles = getArticles(filters)

  return NextResponse.json({
    articles,
    meta: {
      total: articles.length,
      filters,
      available: {
        categories: getCategories(),
        locations: getLocations(),
      },
    },
  })
}
