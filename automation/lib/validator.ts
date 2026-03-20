// Validator - Validates articles before publishing
import { GeneratedArticle, ValidationResult, SourceConfig } from '../types/pipeline';
import { DEFAULT_PIPELINE_CONFIG } from '../types/pipeline';
const sourcesConfig = require('../config/sources.json');

export class Validator {
  private config = DEFAULT_PIPELINE_CONFIG;

  validate(article: GeneratedArticle, sourceId: string): ValidationResult {
    const source = this.getSourceConfig(sourceId);
    
    // Calculate individual scores
    const sourceTrust = this.calculateSourceTrust(source);
    const recency = this.calculateRecency(article.lastUpdated);
    const impactClarity = this.calculateImpactClarity(article);
    const completeness = this.calculateCompleteness(article);
    const isDuplicate = false; // Will be checked separately

    // Calculate overall score
    const weights = { sourceTrust: 0.25, recency: 0.20, impactClarity: 0.30, completeness: 0.25 };
    const score = 
      sourceTrust * weights.sourceTrust +
      recency * weights.recency +
      impactClarity * weights.impactClarity +
      completeness * weights.completeness;

    const roundedScore = Math.round(score * 100) / 100;

    // Generate reasons
    const reasons: string[] = [];
    if (sourceTrust < 0.8) reasons.push(`Source trust score ${sourceTrust} below threshold`);
    if (recency < 0.7) reasons.push('Article may be outdated');
    if (impactClarity < 0.7) reasons.push('Impact on travelers not clearly stated');
    if (completeness < 0.9) reasons.push('Article structure incomplete');

    // Determine action
    const shouldPublish = roundedScore >= this.config.autoPublishThreshold && !isDuplicate;

    return {
      score: roundedScore,
      sourceTrust,
      recency,
      impactClarity,
      completeness,
      isDuplicate,
      shouldPublish,
      reasons: reasons.length > 0 ? reasons : ['All validation checks passed'],
    };
  }

  private getSourceConfig(sourceId: string): SourceConfig | undefined {
    return sourcesConfig.sources.find(s => s.id === sourceId);
  }

  private calculateSourceTrust(source?: SourceConfig): number {
    if (!source) return 0.5;
    return source.trustScore;
  }

  private calculateRecency(lastUpdated: Date): number {
    const hoursDiff = (new Date().getTime() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff <= 6) return 1.0;
    if (hoursDiff <= 12) return 0.95;
    if (hoursDiff <= 24) return 0.90;
    if (hoursDiff <= 36) return 0.80;
    if (hoursDiff <= 48) return 0.70;
    return 0.50;
  }

  private calculateImpactClarity(article: GeneratedArticle): number {
    let score = 0;
    
    // Check TL;DR has clear impact
    if (article.tldr.length > 20 && article.tldr.includes('.')) score += 0.25;
    
    // Check what_changed is specific
    if (article.whatChanged.length > 30) score += 0.25;
    
    // Check who_is_affected identifies specific group
    if (article.whoIsAffected.includes('Passengers') || article.whoIsAffected.includes('Travelers')) score += 0.25;
    
    // Check what_to_do has actionable steps
    if (article.whatToDo.includes('1.') || article.whatToDo.includes('Contact')) score += 0.25;
    
    return Math.min(score, 1.0);
  }

  private calculateCompleteness(article: GeneratedArticle): number {
    let score = 0;
    
    // Required fields
    if (article.title?.length > 10) score += 0.15;
    if (article.slug?.length > 5) score += 0.10;
    if (article.tldr?.length > 20) score += 0.15;
    if (article.whatChanged?.length > 20) score += 0.15;
    if (article.whoIsAffected?.length > 20) score += 0.15;
    if (article.whatToDo?.length > 20) score += 0.15;
    if (article.sources?.length > 0) score += 0.15;
    
    return Math.min(score, 1.0);
  }

  // Check for duplicates
  async checkDuplicate(contentHash: string): Promise<boolean> {
    // This would query the deduplication_log table
    // For now, return false (not a duplicate)
    return false;
  }
}

export const validator = new Validator();
