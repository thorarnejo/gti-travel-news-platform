import { query, queryOne, transaction } from '@/lib/db'
import { getMockArticles, getMockArticleBySlug, getMockCategories, getMockLocations } from '@/lib/mockData'
import type {
  Article,
  ArticleListItem,
  ArticleFilters,
  ArticlesResponse,
  CreateArticleInput,
  UpdateArticleInput,
  Category,
  Location,
  LocationType,
  Source,
  FiltersResponse,
} from '@/types'

// Check if we should use mock data (when database is not available)
const USE_MOCK_DATA = !process.env.DATABASE_URL || process.env.USE_MOCK_DATA === 'true'

// ============================================================
// QUERY BUILDERS
// ============================================================

function buildWhereClause(filters: ArticleFilters): { where: string; whereNoAlias: string; params: any[]; paramIndex: number } {
  const conditions: string[] = ['a.is_published = TRUE']
  const params: any[] = []
  let paramIndex = 1

  if (filters.category) {
    conditions.push(`c.slug = $${paramIndex++}`)
    params.push(filters.category)
  }

  if (filters.location) {
    conditions.push(`l.slug = $${paramIndex++}`)
    params.push(filters.location)
  }

  if (filters.severity) {
    conditions.push(`a.severity = $${paramIndex++}`)
    params.push(filters.severity)
  }

  if (filters.status) {
    conditions.push(`a.status = $${paramIndex++}`)
    params.push(filters.status)
  }

  if (filters.from) {
    conditions.push(`a.published_at >= $${paramIndex++}`)
    params.push(filters.from)
  }

  if (filters.to) {
    conditions.push(`a.published_at <= $${paramIndex++}`)
    params.push(filters.to)
  }

  if (filters.q) {
    conditions.push(`a.search_vector @@ plainto_tsquery('english', $${paramIndex++})`)
    params.push(filters.q)
  }

  return {
    where: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    whereNoAlias: conditions.length > 0 ? `WHERE ${conditions.map(c => c.replace(/a\./g, 'articles.').replace(/c\./g, 'categories.').replace(/l\./g, 'locations.').replace(/al\./g, 'article_locations.')).join(' AND ')}` : '',
    params,
    paramIndex,
  }
}

function buildOrderByClause(sort?: string, order?: string): string {
  const direction = order === 'asc' ? 'ASC' : 'DESC'

  switch (sort) {
    case 'severity':
      return `ORDER BY CASE a.severity WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 WHEN 'low' THEN 4 END ${direction}, a.published_at DESC`
    case 'created_at':
      return `ORDER BY a.created_at ${direction}`
    case 'published_at':
    default:
      return `ORDER BY a.published_at ${direction}`
  }
}

// ============================================================
// ARTICLE QUERIES
// ============================================================

export async function getArticles(filters: ArticleFilters = {}): Promise<ArticlesResponse> {
  if (USE_MOCK_DATA) {
    return getMockArticles(filters) as ArticlesResponse;
  }

  const page = filters.page || 1
  const limit = Math.min(filters.limit || 20, 100)
  const offset = (page - 1) * limit

  const { where, whereNoAlias, params, paramIndex: baseIndex } = buildWhereClause(filters)
  const orderBy = buildOrderByClause(filters.sort, filters.order)

  // Get total count
  const countQuery = `
    SELECT COUNT(DISTINCT articles.id) as total
    FROM articles
    JOIN categories ON categories.id = articles.category_id
    LEFT JOIN article_locations ON article_locations.article_id = articles.id
    LEFT JOIN locations ON locations.id = article_locations.location_id
    ${whereNoAlias}
  `
  const countResult = await queryOne<{ total: string }>(countQuery, params)
  const total = parseInt(countResult?.total || '0', 10)

  // Get articles with pagination - using CTE for proper ordering and deduplication
  const articlesParams = [...params, limit, offset]
  const limitIndex = baseIndex
  const offsetIndex = baseIndex + 1
  
  // Build ORDER BY without aliases
  const articleOrderBy = orderBy
    .replace(/a\./g, 'articles.')
    .replace(/c\./g, 'categories.')
  
  const articlesQuery = `
    WITH filtered_articles AS (
      SELECT DISTINCT articles.id
      FROM articles
      JOIN categories ON categories.id = articles.category_id
      JOIN article_locations ON article_locations.article_id = articles.id
      JOIN locations ON locations.id = article_locations.location_id
      ${whereNoAlias}
    ),
    ordered_articles AS (
      SELECT articles.*, categories.id as cat_id, categories.slug as cat_slug, categories.name as cat_name, categories.icon as cat_icon
      FROM articles
      JOIN categories ON categories.id = articles.category_id
      WHERE articles.id IN (SELECT id FROM filtered_articles)
      ${articleOrderBy}
      LIMIT $${limitIndex} OFFSET $${offsetIndex}
    )
    SELECT
      oa.id,
      oa.slug,
      oa.status,
      oa.severity,
      oa.headline,
      oa.summary,
      oa.tldr,
      oa.what_to_do,
      oa.image_url,
      oa.published_at,
      oa.updated_at,
      jsonb_build_object(
        'id', oa.cat_id,
        'slug', oa.cat_slug,
        'name', oa.cat_name,
        'icon', oa.cat_icon
      ) as category,
      COALESCE(
        (
          SELECT JSON_AGG(
            jsonb_build_object(
              'id', l.id,
              'slug', l.slug,
              'name', l.name,
              'location_type', l.location_type
            )
          )
          FROM article_locations al2
          JOIN locations l ON l.id = al2.location_id
          WHERE al2.article_id = oa.id
        ),
        '[]'
      ) as locations
    FROM ordered_articles oa
  `

  const rows = await query<any>(articlesQuery, articlesParams)

  const articles: ArticleListItem[] = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    status: row.status,
    severity: row.severity,
    headline: row.headline,
    summary: row.summary,
    tldr: row.tldr || [],
    what_to_do: row.what_to_do ?? null,
    image_url: row.image_url ?? null,
    published_at: row.published_at ?? null,
    updated_at: row.updated_at,
    category: row.category,
    locations: row.locations || [],
  }))

  return {
    articles,
    meta: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  } as ArticlesResponse;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (USE_MOCK_DATA) {
    return getMockArticleBySlug(slug) as Article | null
  }

  const articleQuery = `
    SELECT
      a.*,
      jsonb_build_object(
        'id', c.id,
        'slug', c.slug,
        'name', c.name,
        'description', c.description,
        'icon', c.icon,
        'parent_id', c.parent_id
      ) as category
    FROM articles a
    JOIN categories c ON c.id = a.category_id
    WHERE a.slug = $1 AND a.is_published = TRUE
  `

  const row = await queryOne<any>(articleQuery, [slug])
  if (!row) return null

  // Get locations
  const locationsQuery = `
    SELECT l.*
    FROM locations l
    JOIN article_locations al ON al.location_id = l.id
    WHERE al.article_id = $1
    ORDER BY al.is_primary DESC, l.name ASC
  `
  const locations = await query<Location>(locationsQuery, [row.id])

  // Get sources
  const sourcesQuery = `
    SELECT s.*
    FROM sources s
    JOIN article_sources sas ON sas.source_id = s.id
    WHERE sas.article_id = $1
    ORDER BY s.priority ASC
  `
  const sources = await query<Source>(sourcesQuery, [row.id])

  return {
    ...row,
    category: row.category,
    locations,
    sources,
  }
}

export async function createArticle(input: CreateArticleInput): Promise<Article> {
  const slug = input.headline
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 200)

  return transaction(async (client) => {
    // Insert article
    const insertResult = await client.query(
      `INSERT INTO articles (
        slug, status, severity, headline, summary, body, tldr,
        what_changed, who_is_affected, what_to_do,
        category_id, image_url, original_url, is_published, published_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        slug,
        input.status || 'new',
        input.severity || 'medium',
        input.headline,
        input.summary,
        input.body,
        input.tldr || [],
        input.what_changed || null,
        input.who_is_affected || null,
        input.what_to_do || null,
        input.category_id,
        input.image_url || null,
        input.original_url || null,
        input.is_published || false,
        input.is_published ? new Date().toISOString() : null,
      ]
    )

    const article = insertResult.rows[0]

    // Insert location associations
    if (input.location_ids && input.location_ids.length > 0) {
      const locationValues = input.location_ids
        .map((_, i) => `($1, $${i + 2}, ${i === 0 ? 'TRUE' : 'FALSE'})`)
        .join(', ')
      await client.query(
        `INSERT INTO article_locations (article_id, location_id, is_primary) VALUES ${locationValues}`,
        [article.id, ...input.location_ids]
      )
    }

    // Insert source associations
    if (input.source_ids && input.source_ids.length > 0) {
      const sourceValues = input.source_ids.map((_, i) => `($1, $${i + 2})`).join(', ')
      await client.query(
        `INSERT INTO article_sources (article_id, source_id) VALUES ${sourceValues}`,
        [article.id, ...input.source_ids]
      )
    }

    return getArticleBySlug(article.slug) as Promise<Article>
  })
}

export async function updateArticle(id: number, input: UpdateArticleInput): Promise<Article | null> {
  return transaction(async (client) => {
    // Build dynamic update query
    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    const fields: (keyof UpdateArticleInput)[] = [
      'headline', 'summary', 'body', 'tldr', 'what_changed',
      'who_is_affected', 'what_to_do', 'status', 'severity',
      'category_id', 'image_url', 'original_url',
    ]

    for (const field of fields) {
      if (input[field] !== undefined) {
        updates.push(`${field} = $${paramIndex++}`)
        values.push(input[field])
      }
    }

    if (input.is_published !== undefined) {
      updates.push(`is_published = $${paramIndex++}`)
      values.push(input.is_published)
      if (input.is_published) {
        updates.push(`published_at = COALESCE(published_at, NOW())`)
      }
    }

    if (updates.length === 0) {
      const existing = await client.query('SELECT * FROM articles WHERE id = $1', [id])
      if (existing.rows.length === 0) return null
      return getArticleBySlug(existing.rows[0].slug)
    }

    values.push(id)
    const updateResult = await client.query(
      `UPDATE articles SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    )

    if (updateResult.rows.length === 0) return null

    // Update location associations if provided
    if (input.location_ids !== undefined) {
      await client.query('DELETE FROM article_locations WHERE article_id = $1', [id])
      if (input.location_ids.length > 0) {
        const locationValues = input.location_ids
          .map((_, i) => `($1, $${i + 2}, ${i === 0 ? 'TRUE' : 'FALSE'})`)
          .join(', ')
        await client.query(
          `INSERT INTO article_locations (article_id, location_id, is_primary) VALUES ${locationValues}`,
          [id, ...input.location_ids]
        )
      }
    }

    // Update source associations if provided
    if (input.source_ids !== undefined) {
      await client.query('DELETE FROM article_sources WHERE article_id = $1', [id])
      if (input.source_ids.length > 0) {
        const sourceValues = input.source_ids.map((_, i) => `($1, $${i + 2})`).join(', ')
        await client.query(
          `INSERT INTO article_sources (article_id, source_id) VALUES ${sourceValues}`,
          [id, ...input.source_ids]
        )
      }
    }

    const article = await client.query('SELECT slug FROM articles WHERE id = $1', [id])
    return getArticleBySlug(article.rows[0].slug)
  })
}

// ============================================================
// FILTER QUERIES
// ============================================================

export async function getFilters(): Promise<FiltersResponse> {
  if (USE_MOCK_DATA) {
    return {
      categories: getMockCategories().map(c => ({ slug: c.slug, name: c.name, icon: c.icon })),
      locations: getMockLocations().map(l => ({ slug: l.slug, name: l.name, location_type: l.location_type as 'country' | 'city' })),
      severities: ['low', 'medium', 'high', 'critical'],
      statuses: ['new', 'update', 'warning', 'disruption', 'price_change'],
    }
  }

  const categoriesQuery = `
    SELECT slug, name, icon
    FROM categories
    ORDER BY sort_order ASC, name ASC
  `
  const categories = await query<Pick<Category, 'slug' | 'name' | 'icon'>>(categoriesQuery)

  const locationsQuery = `
    SELECT slug, name, location_type
    FROM locations
    ORDER BY location_type DESC, name ASC
  `
  const locations = await query<Pick<Location, 'slug' | 'name' | 'location_type'>>(locationsQuery)

  return {
    categories,
    locations,
    severities: ['low', 'medium', 'high', 'critical'],
    statuses: ['new', 'update', 'warning', 'disruption', 'price_change'],
  }
}

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK_DATA) {
    return getMockCategories()
  }
  return query<Category>(
    'SELECT * FROM categories ORDER BY sort_order ASC, name ASC'
  )
}

export async function getLocations(type?: 'country' | 'city'): Promise<Location[]> {
  if (USE_MOCK_DATA) {
    let locations = getMockLocations()
    if (type) {
      locations = locations.filter(l => l.location_type === type)
    }
    return locations
  }
  const results = type
    ? await query('SELECT * FROM locations WHERE location_type = $1 ORDER BY name ASC', [type])
    : await query('SELECT * FROM locations ORDER BY location_type DESC, name ASC')
  return results.map((row: any) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    location_type: row.location_type as LocationType,
    country_id: row.country_id,
    city_id: row.city_id,
  }))
}
