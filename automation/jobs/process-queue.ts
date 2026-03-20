#!/usr/bin/env node
// Scheduled job: Process queue items through pipeline
import { pipeline } from '../lib/pipeline';

async function processQueue() {
  console.log('🚀 Starting queue processing job...');
  
  try {
    const stats = await pipeline.runPipeline();
    
    console.log('📊 Pipeline stats:', {
      fetched: stats.fetched,
      filtered: stats.filtered,
      classified: stats.classified,
      generated: stats.generated,
      published: stats.published,
      queued: stats.queued,
      errors: stats.errors,
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Queue processing failed:', error);
    process.exit(1);
  }
}

processQueue();
