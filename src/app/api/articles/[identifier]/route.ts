import { NextRequest, NextResponse } from 'next/server'
import { getArticleBySlug, updateArticle } from '@/lib/articleService'
import type { UpdateArticleInput } from '@/types'

interface Params {
  params: Promise<{ identifier: string }>
}

// GET /api/articles/[identifier] - Fetch by slug
export async function GET(request: NextRequest, context: Params) {
  try {
    const { identifier } = await context.params

    if (!identifier) {
      return NextResponse.json(
        { error: { code: 'MISSING_SLUG', message: 'Article slug is required' } },
        { status: 400 }
      )
    }

    const article = await getArticleBySlug(identifier)

    if (!article) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: `Article '${identifier}' not found` } },
        { status: 404 }
      )
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch article' } },
      { status: 500 }
    )
  }
}

// PATCH /api/articles/[identifier] - Update by ID (numeric)
export async function PATCH(request: NextRequest, context: Params) {
  try {
    const { identifier } = await context.params
    const articleId = parseInt(identifier, 10)

    if (isNaN(articleId) || articleId < 1) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Article ID must be a positive integer' } },
        { status: 400 }
      )
    }

    const body: UpdateArticleInput = await request.json()

    // Validate status if provided
    if (body.status && !['new', 'update', 'warning', 'disruption', 'price_change'].includes(body.status)) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid status value' } },
        { status: 400 }
      )
    }

    // Validate severity if provided
    if (body.severity && !['low', 'medium', 'high', 'critical'].includes(body.severity)) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid severity value' } },
        { status: 400 }
      )
    }

    const article = await updateArticle(articleId, body)

    if (!article) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: `Article with ID ${articleId} not found` } },
        { status: 404 }
      )
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to update article' } },
      { status: 500 }
    )
  }
}
