#!/bin/bash
# Setup script for GTI Automated News Pipeline

set -e

echo "🚀 Setting up GTI Automated News Pipeline..."

# Navigate to project directory
cd "$(dirname "$0")/../.."

# Run database migrations
echo "📊 Running database migrations..."
if [ -f "automation/db/migrations/002_automation_schema.sql" ]; then
    psql "$DATABASE_URL" -f automation/db/migrations/002_automation_schema.sql
    echo "✅ Database schema updated"
else
    echo "⚠️ Migration file not found"
fi

# Populate source registry from config
echo "📋 Populating source registry..."
node -e "
const sources = require('./automation/config/sources.json');
const { db } = require('./src/lib/db');

async function populateSources() {
    for (const source of sources.sources) {
        try {
            await db.query(\`
                INSERT INTO source_registry 
                (id, name, url, type, trust_score, category, regions, fetch_method, rss_url, api_endpoint, selector, active)
                VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8, \$9, \$10, \$11, \$12)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    url = EXCLUDED.url,
                    trust_score = EXCLUDED.trust_score,
                    active = EXCLUDED.active,
                    updated_at = NOW()
            \`, [
                source.id,
                source.name,
                source.url,
                source.type,
                source.trustScore,
                source.category,
                source.regions,
                source.fetchMethod,
                source.rssUrl || null,
                source.apiEndpoint || null,
                source.selector || null,
                source.active
            ]);
            console.log(\`✅ Source: \${source.name}\`);
        } catch (err) {
            console.error(\`❌ Failed: \${source.name}\`, err.message);
        }
    }
    console.log('✅ Source registry populated');
    process.exit(0);
}

populateSources();
"

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up cron jobs:"
echo "   */15 * * * * cd $(pwd) && ts-node automation/jobs/fetch-sources.ts"
echo "   */5 * * * * cd $(pwd) && ts-node automation/jobs/process-queue.ts"
echo ""
echo "2. Or run manually for testing:"
echo "   npm run automation:fetch"
echo "   npm run automation:process"
