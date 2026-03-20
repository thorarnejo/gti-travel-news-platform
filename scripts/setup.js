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
})

async function setupDatabase() {
  try {
    console.log('Setting up GTI News Platform database...')
    
    // Run migration
    console.log('\n1️⃣ Running migration...')
    const migrationPath = path.join(projectRoot, 'db', 'migrations', '001_initial_schema.sql')
    const migrationSql = await readFile(migrationPath, 'utf8')
    
    // Run seed
    console.log('\n2️⃣ Loading seed data...')
    const seedPath = path.join(projectRoot, 'db', 'seeds', 'seed_data.sql')
    const seedSql = await readFile(seedPath, 'utf8')
    
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      
      // Run migration
      console.log('   Executing schema migration...')
      await client.query(migrationSql)
      
      // Run seed
      console.log('   Loading seed data...')
      await client.query(seedSql)
      
      await client.query('COMMIT')
      console.log('\n✅ Database setup completed successfully!')
      console.log('\nYou can now start the application with:')
      console.log('   npm run dev')
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

setupDatabase()