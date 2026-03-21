#!/usr/bin/env node

import { Pool } from 'pg'
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
import path from 'path'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

dotenv.config({ path: path.join(projectRoot, '.env.local') })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

async function runMigration() {
  try {
    console.log('Running subscribers migration...')
    
    const migrationPath = path.join(projectRoot, 'db', 'migrations', '003_subscribers_schema.sql')
    const sql = await readFile(migrationPath, 'utf8')
    
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      await client.query(sql)
      await client.query('COMMIT')
      console.log('✅ Subscribers migration completed successfully')
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

runMigration()
