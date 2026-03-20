import { NextRequest, NextResponse } from 'next/server'
import { createArticle } from '@/lib/articleService'
import type { CreateArticleInput } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: CreateArticleInput = await request.json()

    // Validation
    if (!body.headline || typeof body.headline !== 'string' || body.headline.trim().length === 0) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Headline is required' } },
        { status: 400 }
      )
    }

    if (!body.summary || typeof body.summary !== 'string' || body.summary.trim().length === 0) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Summary is required' } },
        { status: 400 }
      )
    }

    if (!body.body || typeof body.body !== 'string' || body.body.trim().length === 0) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Body is required' } },
        { status: 400 }
      )
    }

    if (!body.category_id || typeof body.category_id !== 'number') {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'category_id is required and must be a number' } },
        { status: 400 }
      )
    }

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

    const article = await createArticle(body)

    return NextResponse.json({ article }, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to create article' } },
      { status: 500 }
    )
  }
}
