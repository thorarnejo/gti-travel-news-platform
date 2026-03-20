#!/usr/bin/env node
// Scheduled job: Fetch sources and populate queue
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment
require('dotenv').config();

// Database connection (Neon)
const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_pC1WvKbB2iMP',
  host: 'ep-falling-meadow-ag627iy8-pooler.c-2.eu-central-1.aws.neon.tech',
  port: 5432,
  database: 'neondb',
  ssl: { rejectUnauthorized: false }
});

// Load sources
const sourcesConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/sources.json'), 'utf8'));

// Travel keywords for filtering
const travelKeywords = [
  'flight', 'cancelled', 'delay', 'disruption', 'strike',
  'closure', 'closed', 'open', 'reopen', 'suspended',
  'restriction', 'restrictions', 'ban', 'banned', 'prohibited',
  'visa', 'passport', 'entry', 'border', 'customs',
  'advisory', 'warning', 'alert', 'notice',
  'route', 'service', 'schedule', 'timetable',
  'airport', 'airline', 'terminal', 'gate',
  'ferry', 'rail', 'train', 'bus', 'transport',
  'weather', 'storm', 'hurricane', 'earthquake', 'flood',
  'maintenance', 'construction', 'repair', 'airspace',
];

const rejectKeywords = [
  'lifestyle', 'fashion', 'foodie', 'wellness', 'spa',
  'review', 'opinion', 'editorial', 'column',
  'luxury', 'premium', 'exclusive', 'vip',
  'promotion', 'sale', 'discount', 'deal',
  'competition', 'contest', 'giveaway',
];

const genericInspiration = [
  'top 10', 'best places', 'hidden gems', 'must visit',
  'bucket list', 'travel inspiration', 'wanderlust',
  'travel guide', 'travel tips', 'plan your trip',
];

async function fetchSources() {
  console.log('🚀 Starting source fetch job...');
  console.log(`⏰ ${new Date().toISOString()}`);

  try {
    const activeSources = sourcesConfig.sources.filter(s => s.active);
    console.log(`📡 Found ${activeSources.length} active sources`);

    // Fetch from RSS sources only (most reliable)
    const rssSources = activeSources.filter(s => s.fetchMethod === 'rss' && s.rssUrl);
    console.log(`📡 Testing ${rssSources.length} RSS sources`);

    const allItems = [];

    for (const source of rssSources) {
      try {
        console.log(`  Fetching ${source.name}...`);
        const response = await fetch(source.rssUrl, {
          headers: { 'User-Agent': 'GTI-NewsBot/1.0' },
          signal: AbortSignal.timeout(15000)
        });

        if (!response.ok) {
          console.log(`    ⚠️  HTTP ${response.status}`);
          continue;
        }

        const xml = await response.text();
        const items = parseRSS(xml, source);
        console.log(`    ✅ ${items.length} items`);
        allItems.push(...items);
      } catch (error) {
        console.log(`    ❌ ${error.message.substring(0, 50)}`);
      }
    }

    console.log(`\n📊 Total fetched: ${allItems.length}`);

    if (allItems.length === 0) {
      console.log('ℹ️ No items fetched');
      await pool.end();
      process.exit(0);
    }

    // Filter for relevance
    const { relevant, filtered } = filterBatch(allItems);
    console.log(`\n🔍 Filtered: ${relevant.length} relevant, ${filtered.length} removed`);

    // Log filtered reasons
    const filterReasons = filtered.reduce((acc, f) => {
      acc[f.reason] = (acc[f.reason] || 0) + 1;
      return acc;
    }, {});
    console.log('Filter breakdown:', filterReasons);

    // Insert relevant items into queue
    let inserted = 0;
    let duplicates = 0;

    for (const item of relevant) {
      try {
        // DUPLICATE DETECTION - Check multiple criteria
        const duplicateCheck = await checkDuplicate(item, pool);
        
        if (duplicateCheck.isDuplicate) {
          duplicates++;
          console.log(`    ⏭️  Duplicate skipped: ${duplicateCheck.reason}`);
          
          // Log to deduplication_log
          await pool.query(
            `INSERT INTO deduplication_log (content_hash, source_url, first_seen_at)
             VALUES ($1, $2, NOW())
             ON CONFLICT (content_hash) DO NOTHING`,
            [hashContent(item.title + item.url), item.url]
          );
          continue;
        }

        // Insert into queue
        await pool.query(
          `INSERT INTO ingestion_queue 
           (source_id, raw_title, raw_url, raw_content, raw_summary, published_at, fetched_at, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')`,
          [
            item.sourceId,
            item.title,
            item.url,
            item.content,
            item.summary,
            item.publishedAt,
            item.fetchedAt,
          ]
        );
        inserted++;
      } catch (error) {
        console.error('Insert error:', error);
      }
    }

    console.log(`\n✅ Inserted ${inserted} items, ${duplicates} duplicates skipped`);
    console.log('✅ Fetch job complete');
    await pool.end();
    process.exit(0);

  } catch (error) {
    console.error('❌ Fetch job failed:', error);
    await pool.end();
    process.exit(1);
  }
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
  while ((match = itemRegex.exec(xml)) !== null && count < 10) {
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
        summary: cleanText(descMatch?.[1] || '').substring(0, 500),
        publishedAt: pubDateMatch ? new Date(pubDateMatch[1]) : new Date(),
        fetchedAt: new Date(),
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

function filterItem(item) {
  const title = item.title.toLowerCase();
  const content = (item.content || '').toLowerCase();
  const combined = `${title} ${content}`;

  const hasTravelImpact = travelKeywords.some(kw => combined.includes(kw.toLowerCase()));
  if (!hasTravelImpact) {
    return { isRelevant: false, reason: 'No travel impact keywords' };
  }

  const isGeneric = genericInspiration.some(phrase => title.includes(phrase.toLowerCase()));
  if (isGeneric) {
    return { isRelevant: false, reason: 'Generic travel inspiration' };
  }

  const isRejected = rejectKeywords.some(kw => combined.includes(kw.toLowerCase()));
  if (isRejected) {
    return { isRelevant: false, reason: 'Non-actionable content type' };
  }

  return { isRelevant: true };
}

function filterBatch(items) {
  const relevant = [];
  const filtered = [];

  for (const item of items) {
    const result = filterItem(item);
    if (result.isRelevant) {
      relevant.push(item);
    } else {
      filtered.push({ item, reason: result.reason });
    }
  }

  return { relevant, filtered };
}

// Create content hash for deduplication
function hashContent(text) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(text.toLowerCase().trim()).digest('hex');
}

// Check for duplicates using multiple criteria
async function checkDuplicate(item, pool) {
  // Check 1: Same URL in last 7 days
  const urlCheck = await pool.query(
    `SELECT id FROM ingestion_queue 
     WHERE raw_url = $1 AND fetched_at > NOW() - INTERVAL '7 days'`,
    [item.url]
  );
  
  if (urlCheck.rows.length > 0) {
    return { isDuplicate: true, reason: 'Same URL in last 7 days' };
  }
  
  // Check 2: Similar title (80% match) in last 7 days
  const titleHash = hashContent(item.title);
  const titleCheck = await pool.query(
    `SELECT id, raw_title FROM ingestion_queue 
     WHERE fetched_at > NOW() - INTERVAL '7 days'`
  );
  
  for (const row of titleCheck.rows) {
    const similarity = calculateSimilarity(item.title, row.raw_title);
    if (similarity > 0.8) {
      return { isDuplicate: true, reason: `Similar title (${Math.round(similarity * 100)}% match)` };
    }
  }
  
  // Check 3: Content hash in deduplication_log
  const contentHash = hashContent(item.title + item.url);
  const hashCheck = await pool.query(
    `SELECT id FROM deduplication_log WHERE content_hash = $1`,
    [contentHash]
  );
  
  if (hashCheck.rows.length > 0) {
    return { isDuplicate: true, reason: 'Content hash match' };
  }
  
  return { isDuplicate: false };
}

// Calculate string similarity (0-1)
function calculateSimilarity(str1, str2) {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  if (s1 === s2) return 1.0;
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

// Levenshtein distance for similarity calculation
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

fetchSources();
