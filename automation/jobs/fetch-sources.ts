#!/usr/bin/env node
// Scheduled job: Fetch sources and populate queue
import { sourceFetcher } from '../lib/fetcher';
import { relevanceFilter } from '../lib/filter';
import { pool } from '../../src/lib/db';

async function fetchSources() {
  console.log('🚀 Starting source fetch job...');
  console.log(`⏰ ${new Date().toISOString()}`);

  try {
    // Fetch from all sources
    const rawItems = await sourceFetcher.fetchAll();
    console.log(`📡 Fetched ${rawItems.length} total items`);

    if (rawItems.length === 0) {
      console.log('ℹ️ No items fetched');
      process.exit(0);
    }

    // Filter for relevance
    const { relevant, filtered } = relevanceFilter.filterBatch(rawItems);
    console.log(`🔍 Filtered: ${relevant.length} relevant, ${filtered.length} removed`);

    // Log filtered reasons
    const filterReasons = filtered.reduce((acc, f) => {
      acc[f.reason] = (acc[f.reason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('Filter breakdown:', filterReasons);

    // Insert relevant items into queue
    let inserted = 0;
    let duplicates = 0;

    for (const item of relevant) {
      try {
        // Check for duplicates
        const existing = await pool.query(
          `SELECT id FROM ingestion_queue 
           WHERE source_id = $1 AND raw_url = $2 AND DATE(fetched_at) = CURRENT_DATE`,
          [item.sourceId, item.url]
        );

        if (existing.rows.length > 0) {
          duplicates++;
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

    console.log(`✅ Inserted ${inserted} items, ${duplicates} duplicates skipped`);
    console.log('✅ Fetch job complete');
    process.exit(0);

  } catch (error) {
    console.error('❌ Fetch job failed:', error);
    process.exit(1);
  }
}

fetchSources();
