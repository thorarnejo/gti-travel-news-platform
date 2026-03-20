// Pipeline Orchestrator - Main pipeline controller
import { sourceFetcher } from './fetcher';
import { relevanceFilter } from './filter';
import { classifier } from './classifier';
import { articleGenerator } from './generator';
import { validator } from './validator';
import { publisher } from './publisher';
import { RawSourceItem, IngestionQueueItem, ClassificationResult, GeneratedArticle, ValidationResult } from '../types/pipeline';

export class PipelineOrchestrator {
  async runPipeline(): Promise<{
    fetched: number;
    filtered: number;
    classified: number;
    generated: number;
    published: number;
    queued: number;
    errors: number;
  }> {
    const stats = {
      fetched: 0,
      filtered: 0,
      classified: 0,
      generated: 0,
      published: 0,
      queued: 0,
      errors: 0,
    };

    try {
      console.log('🚀 Starting pipeline run...');

      // Stage 1: Fetch
      console.log('📡 Stage 1: Fetching sources...');
      const rawItems = await sourceFetcher.fetchAll();
      stats.fetched = rawItems.length;
      console.log(`✅ Fetched ${rawItems.length} items`);

      if (rawItems.length === 0) {
        console.log('ℹ️ No new items to process');
        return stats;
      }

      // Stage 2: Filter
      console.log('🔍 Stage 2: Filtering...');
      const filterResult = relevanceFilter.filterBatch(rawItems);
      stats.filtered = filterResult.filtered.length;
      console.log(`✅ ${filterResult.relevant.length} relevant, ${filterResult.filtered.length} filtered out`);

      // Stage 3-6: Process each relevant item
      for (const item of filterResult.relevant) {
        try {
          const result = await this.processItem(item);
          
          if (result.published) stats.published++;
          else if (result.queued) stats.queued++;
          
          stats.classified++;
          stats.generated++;
        } catch (error) {
          console.error(`❌ Error processing item:`, error);
          stats.errors++;
        }
      }

      console.log('✅ Pipeline complete:', stats);
      return stats;

    } catch (error) {
      console.error('❌ Pipeline error:', error);
      stats.errors++;
      return stats;
    }
  }

  private async processItem(rawItem: RawSourceItem): Promise<{ published: boolean; queued: boolean }> {
    // Stage 3: Classify
    const classification = classifier.classify(rawItem);
    console.log(`🏷️ Classified: ${classification.category} | ${classification.severity} | ${classification.location || 'no location'}`);

    // Create queue item
    const queueItem: IngestionQueueItem = {
      id: crypto.randomUUID(),
      sourceId: rawItem.sourceId,
      rawTitle: rawItem.title,
      rawUrl: rawItem.url,
      rawContent: rawItem.content,
      rawSummary: rawItem.summary,
      publishedAt: rawItem.publishedAt,
      fetchedAt: rawItem.fetchedAt,
      status: 'classified',
      retryCount: 0,
    };

    // Stage 4: Generate
    const generatedArticle = articleGenerator.generate(queueItem, classification);
    console.log(`📝 Generated: "${generatedArticle.title.substring(0, 60)}..."`);

    // Stage 5: Validate
    const validation = validator.validate(generatedArticle, rawItem.sourceId);
    console.log(`✓ Validation score: ${validation.score} | Publish: ${validation.shouldPublish}`);

    // Stage 6: Publish or Queue
    if (validation.shouldPublish) {
      const result = await publisher.publish(generatedArticle, validation, rawItem.url);
      
      if (result.success) {
        console.log(`🎉 Published: ${result.articleId}`);
        return { published: true, queued: false };
      } else {
        console.log(`⚠️ Publish failed: ${result.error}`);
        return { published: false, queued: true };
      }
    } else {
      console.log(`📋 Queued for review: ${validation.reasons.join(', ')}`);
      return { published: false, queued: true };
    }
  }
}

export const pipeline = new PipelineOrchestrator();
