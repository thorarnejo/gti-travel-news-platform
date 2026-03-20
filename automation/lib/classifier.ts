// Classifier - Classifies content into categories
import { RawSourceItem, ClassificationResult } from '../types/pipeline';

export class Classifier {
  private readonly categoryKeywords: Record<string, string[]> = {
    'airline': ['flight', 'airline', 'carrier', 'aircraft', 'crew', 'pilot', 'cabin'],
    'airport': ['airport', 'terminal', 'runway', 'gate', 'security', 'customs', 'immigration'],
    'rail': ['train', 'rail', 'railway', 'station', 'track', 'metro', 'subway'],
    'ferry': ['ferry', 'boat', 'ship', 'vessel', 'cruise', 'port', 'crossing', 'sailing'],
    'government': ['visa', 'passport', 'border', 'entry', 'restriction', 'advisory', 'embassy'],
    'attraction': ['museum', 'monument', 'park', 'tour', 'visit', 'attraction', 'site', 'landmark'],
    'industry': ['iata', 'icao', 'aviation', 'regulation', 'policy', 'standard'],
  };

  private readonly severityIndicators = {
    critical: ['cancelled', 'suspended', 'closed', 'strike', 'emergency', 'evacuation', 'warning'],
    high: ['delayed', 'disruption', 'severe', 'major', 'significant', 'important'],
    medium: ['changed', 'modified', 'updated', 'affecting', 'impact'],
    low: ['reminder', 'notice', 'minor', 'slight'],
  };

  private readonly locationPatterns = [
    // Airports
    /\b([A-Z]{3})\b/, // IATA codes
    /\b(Heathrow|Gatwick|Stansted|Luton|Charles de Gaulle|Schiphol|Frankfurt|Barcelona|Rome|Venice|Milan|Paris|London|Madrid|Berlin|Munich|Amsterdam|Brussels|Zurich|Vienna|Prague|Warsaw|Oslo|Stockholm|Copenhagen|Helsinki)\b/i,
    // Countries
    /\b(Norway|Sweden|Denmark|Finland|Iceland|Germany|France|Spain|Italy|UK|Britain|Netherlands|Belgium|Switzerland|Austria|Poland|Czech|Portugal|Greece|Turkey|USA|US|Canada|Mexico|Brazil|Argentina|Australia|Japan|China|Thailand|Singapore|UAE|Dubai|Qatar|India|South Africa|Egypt|Morocco)\b/i,
    // Regions
    /\b(Schengen|EU|European Union|Middle East|Asia|Europe|North America|South America|Africa|Oceania|Southeast Asia|Nordic|Baltic|Mediterranean|Caribbean)\b/i,
  ];

  classify(item: RawSourceItem): ClassificationResult {
    const text = `${item.title} ${item.content || ''}`.toLowerCase();
    
    const category = this.classifyCategory(text);
    const location = this.extractLocation(item.title, item.content);
    const status = this.determineStatus(text);
    const severity = this.determineSeverity(text);

    return {
      category,
      location: location || undefined,
      status,
      severity,
    };
  }

  private classifyCategory(text: string): string {
    const scores: Record<string, number> = {};
    
    for (const [category, keywords] of Object.entries(this.categoryKeywords)) {
      scores[category] = keywords.filter(kw => text.includes(kw.toLowerCase())).length;
    }
    
    // Find category with highest score
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted[0][1] > 0 ? sorted[0][0] : 'general';
  }

  private extractLocation(title: string, content?: string): string | null {
    const text = `${title} ${content || ''}`;
    
    for (const pattern of this.locationPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1] || match[0];
      }
    }
    
    // Try to extract from source
    if (title.includes('Oslo')) return 'Oslo';
    if (title.includes('Heathrow')) return 'London Heathrow';
    if (title.includes('Gatwick')) return 'London Gatwick';
    if (title.includes('Charles de Gaulle') || title.includes('CDG')) return 'Paris CDG';
    if (title.includes('Frankfurt')) return 'Frankfurt';
    if (title.includes('Amsterdam') || title.includes('Schiphol')) return 'Amsterdam';
    
    return null;
  }

  private determineStatus(text: string): 'active' | 'resolved' | 'ongoing' {
    const resolvedWords = ['resolved', 'ended', 'lifted', 'reopened', 'resumed', 'back to normal'];
    const ongoingWords = ['ongoing', 'continues', 'extended', 'remains', 'still'];
    
    if (resolvedWords.some(w => text.includes(w))) return 'resolved';
    if (ongoingWords.some(w => text.includes(w))) return 'ongoing';
    return 'active';
  }

  private determineSeverity(text: string): 'critical' | 'high' | 'medium' | 'low' {
    const lowerText = text.toLowerCase();
    
    for (const [level, words] of Object.entries(this.severityIndicators)) {
      if (words.some(w => lowerText.includes(w))) {
        return level as 'critical' | 'high' | 'medium' | 'low';
      }
    }
    
    return 'medium';
  }
}

export const classifier = new Classifier();
