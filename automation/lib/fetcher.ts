// Source Fetcher - Fetches content from registered sources
import { SourceConfig, RawSourceItem } from '../types/pipeline';
const sourcesConfig = require('../config/sources.json');

export class SourceFetcher {
  private sources: SourceConfig[] = sourcesConfig.sources.filter(s => s.active);

  async fetchAll(): Promise<RawSourceItem[]> {
    const results: RawSourceItem[] = [];
    
    for (const source of this.sources) {
      try {
        const items = await this.fetchSource(source);
        results.push(...items);
        console.log(`✅ Fetched ${items.length} items from ${source.name}`);
      } catch (error) {
        console.error(`❌ Failed to fetch from ${source.name}:`, error);
      }
    }
    
    return results;
  }

  private async fetchSource(source: SourceConfig): Promise<RawSourceItem[]> {
    switch (source.fetchMethod) {
      case 'rss':
        return this.fetchRSS(source);
      case 'api':
        return this.fetchAPI(source);
      case 'scrape':
        return this.fetchWeb(source);
      default:
        throw new Error(`Unknown fetch method: ${source.fetchMethod}`);
    }
  }

  private async fetchRSS(source: SourceConfig): Promise<RawSourceItem[]> {
    if (!source.rssUrl) {
      throw new Error(`No RSS URL for source ${source.id}`);
    }

    const response = await fetch(source.rssUrl, {
      headers: {
        'User-Agent': 'GTI-NewsBot/1.0 (Travel News Aggregator)',
      },
    });

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();
    return this.parseRSS(xml, source);
  }

  private parseRSS(xml: string, source: SourceConfig): RawSourceItem[] {
    const items: RawSourceItem[] = [];
    
    // Simple regex-based RSS parsing (for production, use a proper XML parser)
    const itemRegex = /<item>([<s\S]*?)<\/item>/g;
    const titleRegex = /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([<\s\S]*?)<\/title>/;
    const linkRegex = /<link>([<\s\S]*?)<\/link>/;
    const descRegex = /<description><!\[CDATA\[([\s\S]*?)\]\]\u003e<\/description>|<description>([<\s\S]*?)<\/description>/;
    const pubDateRegex = /<pubDate>([<\s\S]*?)<\/pubDate>/;

    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];
      
      const titleMatch = titleRegex.exec(itemContent);
      const linkMatch = linkRegex.exec(itemContent);
      const descMatch = descRegex.exec(itemContent);
      const pubDateMatch = pubDateRegex.exec(itemContent);

      if (titleMatch && linkMatch) {
        const title = (titleMatch[1] || titleMatch[2] || '').trim();
        const url = (linkMatch[1] || '').trim();
        const description = (descMatch?.[1] || descMatch?.[2] || '').trim();
        const pubDate = pubDateMatch ? new Date(pubDateMatch[1]) : undefined;

        // Skip if title or URL is empty
        if (!title || !url) continue;

        items.push({
          sourceId: source.id,
          title: this.cleanText(title),
          url: this.cleanUrl(url),
          content: this.cleanText(description),
          summary: this.cleanText(description).substring(0, 500),
          publishedAt: pubDate,
          fetchedAt: new Date(),
        });
      }
    }

    return items;
  }

  private async fetchAPI(source: SourceConfig): Promise<RawSourceItem[]> {
    if (!source.apiEndpoint) {
      throw new Error(`No API endpoint for source ${source.id}`);
    }

    const response = await fetch(source.apiEndpoint, {
      headers: {
        'User-Agent': 'GTI-NewsBot/1.0',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API fetch failed: ${response.status}`);
    }

    const data = await response.json();
    return this.parseAPIResponse(data, source);
  }

  private parseAPIResponse(data: any, source: SourceConfig): RawSourceItem[] {
    // Generic API parser - customize per API structure
    const items: RawSourceItem[] = [];
    
    // Handle common API structures
    const results = Array.isArray(data) ? data : data.results || data.items || data.data || [];
    
    for (const item of results) {
      const title = item.title || item.headline || item.name;
      const url = item.url || item.link || item.webUrl;
      const content = item.description || item.summary || item.body || item.content;
      const publishedAt = item.publishedAt || item.published || item.date ? new Date(item.publishedAt || item.published || item.date) : undefined;

      if (title && url) {
        items.push({
          sourceId: source.id,
          title: this.cleanText(title),
          url: this.cleanUrl(url),
          content: this.cleanText(content || ''),
          summary: this.cleanText(content || '').substring(0, 500),
          publishedAt,
          fetchedAt: new Date(),
        });
      }
    }

    return items;
  }

  private async fetchWeb(source: SourceConfig): Promise<RawSourceItem[]> {
    // Web scraping requires more sophisticated handling
    // For now, return empty - implement with proper scraper
    console.log(`⚠️ Web scraping not yet implemented for ${source.name}`);
    return [];
  }

  private cleanText(text: string): string {
    if (!text) return '';
    return text
      .replace(/&lt;!\[CDATA\[/g, '')
      .replace(/\]\]>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  private cleanUrl(url: string): string {
    if (!url) return '';
    return url
      .replace(/^\s+/, '')
      .replace(/\s+$/, '')
      .replace(/^\/\//, 'https://');
  }

  getActiveSources(): SourceConfig[] {
    return this.sources;
  }

  getSourceById(id: string): SourceConfig | undefined {
    return this.sources.find(s => s.id === id);
  }
}

export const sourceFetcher = new SourceFetcher();
