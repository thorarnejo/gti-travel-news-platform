// Manual test of GTI News Pipeline - JavaScript version
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database connection
const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_pC1WvKbB2iMP',
  host: 'ep-falling-meadow-ag627iy8-pooler.c-2.eu-central-1.aws.neon.tech',
  port: 5432,
  database: 'neondb',
  ssl: { rejectUnauthorized: false }
});

// Load sources
const sourcesConfig = JSON.parse(fs.readFileSync('./automation/config/sources.json', 'utf8'));

// Simulated fetcher for testing
async function fetchSources() {
  console.log('🚀 Starting manual pipeline test...\n');
  console.log('==========================================');
  console.log('STEP 1: FETCH SOURCES');
  console.log('==========================================\n');
  
  const activeSources = sourcesConfig.sources.filter(s => s.active);
  console.log(`📡 Found ${activeSources.length} active sources`);
  
  let totalFetched = 0;
  const results = [];
  
  // Test fetch from RSS sources (these we can actually test)
  const rssSources = activeSources.filter(s => s.fetchMethod === 'rss' && s.rssUrl);
  console.log(`📡 Testing ${rssSources.length} RSS sources:\n`);
  
  for (const source of rssSources) {
    try {
      console.log(`  Fetching ${source.name}...`);
      const response = await fetch(source.rssUrl, {
        headers: { 'User-Agent': 'GTI-NewsBot/1.0' },
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) {
        console.log(`    ⚠️  HTTP ${response.status}`);
        continue;
      }
      
      const xml = await response.text();
      const items = parseRSS(xml, source);
      console.log(`    ✅ ${items.length} items fetched`);
      totalFetched += items.length;
      results.push({ source: source.name, items: items.length, sample: items[0]?.title?.substring(0, 60) });
    } catch (error) {
      console.log(`    ❌ Error: ${error.message.substring(0, 50)}`);
    }
  }
  
  console.log(`\n📊 Fetch Results:`);
  console.log(`   Total items fetched: ${totalFetched}`);
  
  return { totalFetched, results };
}

function parseRSS(xml, source) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/;
  const linkRegex = /<link>([\s\S]*?)<\/link>/;
  const descRegex = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/;
  const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;
  
  let match;
  let count = 0;
  while ((match = itemRegex.exec(xml)) !== null && count < 5) {
    const content = match[1];
    const titleMatch = titleRegex.exec(content);
    const linkMatch = linkRegex.exec(content);
    const descMatch = descRegex.exec(content);
    const pubDateMatch = pubDateRegex.exec(content);
    
    if (titleMatch && linkMatch) {
      items.push({
        sourceId: source.id,
        title: cleanText(titleMatch[1]),
        url: cleanText(linkMatch[1]),
        content: cleanText(descMatch?.[1] || ''),
        publishedAt: pubDateMatch ? new Date(pubDateMatch[1]) : new Date(),
        fetchedAt: new Date()
      });
      count++;
    }
  }
  
  return items;
}

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Run test
fetchSources().then(async ({ totalFetched, results }) => {
  console.log('\n==========================================');
  console.log('STEP 2: FILTER & CLASSIFY (Simulated)');
  console.log('==========================================\n');
  
  const travelKeywords = ['flight', 'cancelled', 'delay', 'visa', 'border', 'travel', 'airport', 'airline'];
  const rejectKeywords = ['lifestyle', 'fashion', 'foodie', 'wellness', 'review', 'opinion'];
  
  let filteredCount = 0;
  let relevantCount = 0;
  
  console.log('🔍 Simulating relevance filter...\n');
  console.log('Filter rules:');
  console.log('  ✓ Must have travel impact keywords');
  console.log('  ✓ Not generic inspiration content');
  console.log('  ✓ Not non-actionable content');
  console.log('');
  
  // In a real run, this would process actual items
  console.log(`   Sample: "Flight Delays at Heathrow Due to Weather"`);
  console.log(`   → ✓ PASS (contains "flight", "delays")`);
  console.log(`   Sample: "Top 10 Best Places to Visit in Paris"`);
  console.log(`   → ✗ FAIL (generic inspiration: "top 10")`);
  console.log('');
  
  console.log('🏷️  Classification would determine:');
  console.log('   - Category (airline, airport, rail, government, etc.)');
  console.log('   - Location (Heathrow, Paris, Germany, etc.)');
  console.log('   - Severity (critical, high, medium, low)');
  console.log('   - Status (active, resolved, ongoing)');
  
  console.log('\n==========================================');
  console.log('STEP 3: DATABASE STATUS');
  console.log('==========================================\n');
  
  const queueCount = await pool.query('SELECT COUNT(*) FROM ingestion_queue');
  const draftsCount = await pool.query('SELECT COUNT(*) FROM article_drafts');
  const articlesCount = await pool.query('SELECT COUNT(*) FROM articles');
  
  console.log(`📊 Current database state:`);
  console.log(`   Queue items: ${queueCount.rows[0].count}`);
  console.log(`   Drafts: ${draftsCount.rows[0].count}`);
  console.log(`   Published articles: ${articlesCount.rows[0].count}`);
  
  console.log('\n==========================================');
  console.log('✅ MANUAL TEST COMPLETE');
  console.log('==========================================\n');
  
  console.log('Summary:');
  console.log(`   - Sources configured: ${sourcesConfig.sources.length}`);
  console.log(`   - Active sources: ${sourcesConfig.sources.filter(s => s.active).length}`);
  console.log(`   - RSS sources testable: ${sourcesConfig.sources.filter(s => s.active && s.rssUrl).length}`);
  console.log(`   - Articles fetched (test): ${totalFetched}`);
  console.log(`   - Database ready: ✓`);
  
  console.log('\n⚠️  NEXT STEPS:');
  console.log('   1. Fix TypeScript compilation issues');
  console.log('   2. Implement real RSS/API fetching');
  console.log('   3. Add duplicate detection');
  console.log('   4. Configure auto-publish thresholds');
  console.log('   5. Test end-to-end before enabling cron');
  
  await pool.end();
}).catch(e => {
  console.error('Error:', e);
  pool.end();
});
