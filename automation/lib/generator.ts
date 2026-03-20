// Article Generator - Generates structured articles from classified items
import { IngestionQueueItem, ClassificationResult, GeneratedArticle } from '../types/pipeline';

export class ArticleGenerator {
  generate(item: IngestionQueueItem, classification: ClassificationResult): GeneratedArticle {
    const title = this.generateTitle(item.rawTitle, classification);
    const slug = this.generateSlug(title);
    const tldr = this.generateTLDR(item, classification);
    const whatChanged = this.generateWhatChanged(item, classification);
    const whoIsAffected = this.generateWhoIsAffected(item, classification);
    const whatToDo = this.generateWhatToDo(item, classification);
    const sources = this.generateSources(item);

    return {
      title,
      slug,
      tldr,
      whatChanged,
      whoIsAffected,
      whatToDo,
      sources,
      category: classification.category,
      location: classification.location,
      status: classification.status,
      severity: classification.severity,
      lastUpdated: new Date(),
    };
  }

  private generateTitle(rawTitle: string, classification: ClassificationResult): string {
    // Clean up and format the title
    let title = rawTitle.trim();
    
    // Remove source prefixes if present
    title = title.replace(/^[^:]+:\s*/i, '');
    
    // Ensure it ends with impact indicator for severe items
    if (classification.severity === 'critical' && !title.includes('Alert')) {
      title = `Travel Alert: ${title}`;
    }

    // Capitalize properly
    return this.properCase(title);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60)
      .replace(/-+$/, '');
  }

  private generateTLDR(item: IngestionQueueItem, classification: ClassificationResult): string {
    const severity = classification.severity;
    const location = classification.location || 'affected areas';
    
    let tldr = '';
    
    if (severity === 'critical') {
      tldr = `Urgent: Major travel disruption in ${location}. Immediate action required.`;
    } else if (severity === 'high') {
      tldr = `Significant changes affecting travel to ${location}. Check details before departure.`;
    } else if (severity === 'medium') {
      tldr = `Travel conditions in ${location} have changed. Review guidance for affected travelers.`;
    } else {
      tldr = `Minor travel update for ${location}. Check if your plans are affected.`;
    }

    return tldr;
  }

  private generateWhatChanged(item: IngestionQueueItem, classification: ClassificationResult): string {
    // Extract what changed from the raw content
    const content = item.rawContent || item.rawTitle;
    
    // Look for change indicators
    const changePatterns = [
      /(suspended|cancelled|delayed|closed|opened|resumed|restricted)/i,
      /(new|updated|revised|modified|changed)\s+(rules|regulations|requirements|policy)/i,
      /(from|starting|effective)\s+\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}/i,
    ];

    let whatChanged = '';
    
    for (const pattern of changePatterns) {
      const match = content.match(pattern);
      if (match) {
        whatChanged = `Travel services ${match[0].toLowerCase()}. `;
        break;
      }
    }

    whatChanged += `The situation is ${classification.status}. `;
    
    if (classification.severity === 'critical' || classification.severity === 'high') {
      whatChanged += 'This is a significant change affecting travel plans.';
    }

    return whatChanged || 'Travel conditions have been updated. Review the details below.';
  }

  private generateWhoIsAffected(item: IngestionQueueItem, classification: ClassificationResult): string {
    const location = classification.location || 'the affected area';
    
    let whoIsAffected = '';
    
    if (classification.category === 'airline') {
      whoIsAffected = `Passengers with flights to, from, or through ${location}`;
    } else if (classification.category === 'airport') {
      whoIsAffected = `All travelers using ${location} airport`;
    } else if (classification.category === 'rail') {
      whoIsAffected = `Rail passengers traveling ${location} routes`;
    } else if (classification.category === 'ferry') {
      whoIsAffected = `Ferry passengers on ${location} crossings`;
    } else if (classification.category === 'government') {
      whoIsAffected = `All travelers entering or transiting ${location}`;
    } else {
      whoIsAffected = `Travelers planning to visit ${location}`;
    }

    // Add specifics based on severity
    if (classification.severity === 'critical') {
      whoIsAffected += '. This affects immediate and near-term travel plans.';
    } else {
      whoIsAffected += '. Check specific dates for your travel.';
    }

    return whoIsAffected;
  }

  private generateWhatToDo(item: IngestionQueueItem, classification: ClassificationResult): string {
    const severity = classification.severity;
    
    let whatToDo = '';
    
    if (severity === 'critical') {
      whatToDo = '1. Contact your airline/operator immediately. 2. Check alternative routes. 3. Consider travel insurance claims. 4. Monitor official sources for updates.';
    } else if (severity === 'high') {
      whatToDo = '1. Verify your booking status. 2. Check for rebooking options. 3. Allow extra time at the airport/station. 4. Sign up for alerts from your carrier.';
    } else if (severity === 'medium') {
      whatToDo = '1. Review your itinerary. 2. Check if your specific route is affected. 3. Have backup plans ready. 4. Monitor for further updates.';
    } else {
      whatToDo = '1. Be aware of the situation. 2. Check before departure. 3. Follow official guidance.';
    }

    return whatToDo;
  }

  private generateSources(item: IngestionQueueItem): string {
    return item.rawUrl;
  }

  private properCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      // Keep acronyms uppercase
      if (txt.length <= 3 && txt === txt.toUpperCase()) {
        return txt;
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

export const articleGenerator = new ArticleGenerator();
