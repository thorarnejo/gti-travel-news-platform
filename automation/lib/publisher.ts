// Publisher - Publishes validated articles to the platform
import { GeneratedArticle, ValidationResult, ArticleDraft } from '../types/pipeline';
import { articleService } from '../../src/lib/articleService';
import { CreateArticleInput } from '../../src/types';

export class Publisher {
  async publish(article: GeneratedArticle, validation: ValidationResult, sourceUrl: string): Promise<{ success: boolean; articleId?: string; error?: string }> {
    try {
      // Only publish if validation passed
      if (!validation.shouldPublish) {
        return { 
          success: false, 
          error: `Validation failed: ${validation.reasons.join(', ')}` 
        };
      }

      // Map to platform article format
      const articleInput: CreateArticleInput = {
        title: article.title,
        slug: article.slug,
        tldr: article.tldr,
        whatChanged: article.whatChanged,
        whoIsAffected: article.whoIsAffected,
        whatToDo: article.whatToDo,
        sources: article.sources,
        category: article.category,
        location: article.location || null,
        status: article.status,
        severity: article.severity,
        lastUpdated: article.lastUpdated.toISOString(),
      };

      // Publish via existing service
      const result = await articleService.createArticle(articleInput);

      if (!result) {
        return { success: false, error: 'Failed to create article in database' };
      }

      return { success: true, articleId: result.id };
    } catch (error) {
      console.error('Publish error:', error);
      return { success: false, error: String(error) };
    }
  }

  async queueForReview(draft: ArticleDraft): Promise<void> {
    // Update draft status to pending_review
    // This would update in the database
    console.log(`📋 Queued for review: ${draft.title}`);
  }

  async reject(draft: ArticleDraft, reason: string): Promise<void> {
    // Update draft status to rejected
    console.log(`❌ Rejected: ${draft.title} - ${reason}`);
  }
}

export const publisher = new Publisher();
