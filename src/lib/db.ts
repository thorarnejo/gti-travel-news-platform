import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Check if we should use mock data
const USE_MOCK_DATA = !process.env.DATABASE_URL || process.env.USE_MOCK_DATA === 'true'

// Only create pool if database is configured
export const pool = USE_MOCK_DATA 
  ? null as any 
  : new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

if (!USE_MOCK_DATA) {
  pool.on('error', (err: Error) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  if (USE_MOCK_DATA || !pool) {
    throw new Error('Database not available. Use mock data instead.')
  }
  const result = await pool.query(text, params)
  return result.rows as T[]
}

export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  if (USE_MOCK_DATA || !pool) {
    throw new Error('Database not available. Use mock data instead.')
  }
  const rows = await query<T>(text, params)
  return rows[0] || null
}

export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  if (USE_MOCK_DATA || !pool) {
    throw new Error('Database not available. Use mock data instead.')
  }
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

export async function closePool(): Promise<void> {
  if (!USE_MOCK_DATA && pool) {
    await pool.end()
  }
}
