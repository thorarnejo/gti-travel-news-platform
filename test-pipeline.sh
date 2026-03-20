#!/bin/bash
# Manual test script for GTI News Automation Pipeline

set -e

echo "=========================================="
echo "🧪 GTI News Pipeline - Manual Test"
echo "=========================================="
echo ""

# Set environment variables
export DATABASE_URL="postgresql://neondb_owner:npg_pC1WvKbB2iMP@ep-falling-meadow-ag627iy8-pooler.c-2.eu-central-1.aws.neon.tech:5432/neondb?sslmode=require"
export USE_MOCK_DATA="false"
export NEXT_PUBLIC_SITE_URL="http://localhost:3000"

echo "📊 Checking database connection..."
node -e "
const { Pool } = require('pg');
const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_pC1WvKbB2iMP',
  host: 'ep-falling-meadow-ag627iy8-pooler.c-2.eu-central-1.aws.neon.tech',
  port: 5432,
  database: 'neondb',
  ssl: { rejectUnauthorized: false }
});
pool.query('SELECT NOW() as now, COUNT(*) as articles FROM articles')
  .then(r => {
    console.log('✅ Connected to Neon at', r.rows[0].now);
    console.log('✅ Current articles in DB:', r.rows[0].articles);
    pool.end();
  })
  .catch(e => { console.error('❌ DB Error:', e.message); pool.end(); process.exit(1); });
"

echo ""
echo "=========================================="
echo "✅ Environment ready"
echo "=========================================="
echo ""
echo "To run pipeline tests:"
echo "  1. npm run automation:fetch  - Fetch from sources"
echo "  2. npm run automation:process - Process queue"
echo ""
