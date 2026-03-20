// Relevance Filter - Filters out irrelevant or low-quality items
import { RawSourceItem, IngestionQueueItem, RelevanceCriteria } from '../types/pipeline';

export class RelevanceFilter {
  // Keywords that indicate travel impact
  private readonly travelKeywords = [
    'flight', 'cancelled', 'delay', 'disruption', 'strike',
    'closure', 'closed', 'open', 'reopen', 'suspended',
    'restriction', 'restrictions', 'ban', 'banned', 'prohibited',
    'visa', 'passport', 'entry', 'border', 'customs',
    'advisory', 'warning', 'alert', 'notice',
    'route', 'service', 'schedule', 'timetable',
    'airport', 'airline', 'terminal', 'gate',
    'ferry', 'rail', 'train', 'bus', 'transport',
    'weather', 'storm', 'hurricane', 'earthquake', 'flood',
    'maintenance', 'construction', 'repair',
  ];

  // Keywords that indicate non-travel content
  private readonly rejectKeywords = [
    'lifestyle', 'fashion', 'foodie', 'wellness', 'spa',
    'review', 'opinion', 'editorial', 'column',
    'luxury', 'premium', 'exclusive', 'vip',
    'promotion', 'sale', 'discount', 'deal',
    'competition', 'contest', 'giveaway',
  ];

  // Generic travel inspiration phrases
  private readonly genericInspiration = [
    'top 10', 'best places', 'hidden gems', 'must visit',
    'bucket list', 'travel inspiration', 'wanderlust',
    'travel guide', 'travel tips', 'plan your trip',
  ];

  filter(item: RawSourceItem): { isRelevant: boolean; reason?: string } {
    const title = item.title.toLowerCase();
    const content = (item.content || '').toLowerCase();
    const combined = `${title} ${content}`;

    // Check 1: Has travel impact keywords
    const hasTravelImpact = this.travelKeywords.some(kw => combined.includes(kw.toLowerCase()));
    if (!hasTravelImpact) {
      return { isRelevant: false, reason: 'No travel impact keywords' };
    }

    // Check 2: Not generic inspiration
    const isGeneric = this.genericInspiration.some(phrase => title.includes(phrase.toLowerCase()));
    if (isGeneric) {
      return { isRelevant: false, reason: 'Generic travel inspiration content' };
    }

    // Check 3: Not rejected content type
    const isRejected = this.rejectKeywords.some(kw => combined.includes(kw.toLowerCase()));
    if (isRejected) {
      return { isRelevant: false, reason: 'Non-actionable content type' };
    }

    // Check 4: Has specific actionable information
    const hasActionableInfo = this.hasActionableInfo(combined);
    if (!hasActionableInfo) {
      return { isRelevant: false, reason: 'No actionable information' };
    }

    // Check 5: Is recent (within 48 hours)
    const isRecent = this.isRecent(item.publishedAt);
    if (!isRecent) {
      return { isRelevant: false, reason: 'Not recent (older than 48 hours)' };
    }

    return { isRelevant: true };
  }

  private hasActionableInfo(text: string): boolean {
    // Look for specific actionable patterns
    const actionablePatterns = [
      /\b(from|until|between)\b.*\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}/, // dates
      /\b(from|until|between)\b.*\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i, // month names
      /\d{4}[-\/]\d{2}[-\/]\d{2}/, // ISO dates
      /\b(affected|routes|services|airports|terminals)\b/i, // specific entities
      /\b(passengers|travelers|visitors|tourists)\b/i, // affected people
      /\b(must|should|need to|required to|advised to)\b/i, // action words
    ];

    return actionablePatterns.some(pattern => pattern.test(text));
  }

  private isRecent(publishedAt?: Date): boolean {
    if (!publishedAt) return true; // Assume recent if no date
    
    const now = new Date();
    const hoursDiff = (now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60);
    return hoursDiff <= 48;
  }

  // Batch filter multiple items
  filterBatch(items: RawSourceItem[]): { relevant: RawSourceItem[]; filtered: { item: RawSourceItem; reason: string }[] } {
    const relevant: RawSourceItem[] = [];
    const filtered: { item: RawSourceItem; reason: string }[] = [];

    for (const item of items) {
      const result = this.filter(item);
      if (result.isRelevant) {
        relevant.push(item);
      } else {
        filtered.push({ item, reason: result.reason || 'Unknown' });
      }
    }

    return { relevant, filtered };
  }
}

export const relevanceFilter = new RelevanceFilter();
