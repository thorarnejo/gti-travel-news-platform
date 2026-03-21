import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function GET() {
  try {
    const client = await pool.connect();
    
    const result = await client.query(`
      SELECT 
        a.id,
        a.slug,
        a.headline as title,
        a.summary,
        a.body,
        a.status,
        a.severity,
        a.tldr,
        a.what_changed as "whatChanged",
        a.who_is_affected as "whoIsAffected",
        a.what_to_do as "whatToDo",
        a.published_at as "publishedAt",
        a.updated_at as "updatedAt",
        c.slug as category,
        COALESCE(
          json_agg(
            json_build_object(
              'country', co.country_name,
              'city', ci.city_name,
              'countryCode', co.iso_code
            )
          ) FILTER (WHERE co.country_name IS NOT NULL),
          '[]'
        ) as locations
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN article_locations al ON a.id = al.article_id
      LEFT JOIN locations l ON al.location_id = l.id
      LEFT JOIN countries co ON l.country_id = co.id
      LEFT JOIN cities ci ON l.city_id = ci.id
      WHERE a.is_published = true
      GROUP BY a.id, a.slug, a.headline, a.summary, a.body, a.status, a.severity, 
               a.tldr, a.what_changed, a.who_is_affected, a.what_to_do,
               a.published_at, a.updated_at, c.slug
      ORDER BY a.published_at DESC
      LIMIT 50
    `);
    
    client.release();
    
    return NextResponse.json({ articles: result.rows });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
