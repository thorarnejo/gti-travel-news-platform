// Types for GTI Automated News Pipeline

export interface SourceConfig {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'api' | 'web';
  trustScore: number;
  category: string;
  regions: string[];
  fetchMethod: 'rss' | 'api' | 'scrape';
  rssUrl?: string;
  apiEndpoint?: string;
  selector?: string;
  active: boolean;
}

export interface RawSourceItem {
  id?: string;
  sourceId: string;
  title: string;
  url: string;
  content?: string;
  summary?: string;
  publishedAt?: Date;
  fetchedAt: Date;
}

export interface IngestionQueueItem {
  id: string;
  sourceId: string;
  rawTitle: string;
  rawUrl: string;
  rawContent?: string;
  rawSummary?: string;
  publishedAt?: Date;
  fetchedAt: Date;
  status: QueueStatus;
  filterReason?: string;
  processingStartedAt?: Date;
  processingCompletedAt?: Date;
  errorMessage?: string;
  retryCount: number;
}

export type QueueStatus = 
  | 'pending'
  | 'processing'
  | 'filtered'
  | 'classified'
  | 'generated'
  | 'validated'
  | 'published'
  | 'rejected'
  | 'error';

export interface ClassificationResult {
  category: string;
  location?: string;
  status: 'active' | 'resolved' | 'ongoing';
  severity: 'critical' | 'high' | 'medium' | 'low';
  affectedTravelers?: string;
  timeline?: string;
  impactScope?: string;
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  tldr: string;
  whatChanged: string;
  whoIsAffected: string;
  whatToDo: string;
  sources: string;
  category: string;
  location?: string;
  status: 'active' | 'resolved' | 'ongoing';
  severity: 'critical' | 'high' | 'medium' | 'low';
  lastUpdated: Date;
}

export interface ValidationResult {
  score: number;
  sourceTrust: number;
  recency: number;
  impactClarity: number;
  completeness: number;
  isDuplicate: boolean;
  shouldPublish: boolean;
  reasons: string[];
}

export interface ArticleDraft {
  id: string;
  queueItemId: string;
  title: string;
  slug: string;
  tldr: string;
  whatChanged: string;
  whoIsAffected: string;
  whatToDo: string;
  sources: string;
  category: string;
  location?: string;
  status: 'active' | 'resolved' | 'ongoing';
  severity: 'critical' | 'high' | 'medium' | 'low';
  lastUpdated: Date;
  publishedDate?: Date;
  validationScore: number;
  validationDetails?: Record<string, any>;
  draftStatus: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'published';
  reviewReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublishAudit {
  id: string;
  draftId: string;
  action: 'published' | 'rejected' | 'queued' | 'error';
  reason: string;
  confidenceScore?: number;
  publishedArticleId?: string;
  executedAt: Date;
}

export interface PipelineConfig {
  autoPublishThreshold: number;
  reviewQueueThreshold: number;
  maxRetries: number;
  fetchIntervalMinutes: number;
  processIntervalMinutes: number;
  maxArticleAgeHours: number;
  deduplicationWindowHours: number;
}

export const DEFAULT_PIPELINE_CONFIG: PipelineConfig = {
  autoPublishThreshold: 0.85,
  reviewQueueThreshold: 0.60,
  maxRetries: 3,
  fetchIntervalMinutes: 15,
  processIntervalMinutes: 5,
  maxArticleAgeHours: 48,
  deduplicationWindowHours: 72,
};

// Relevance filter criteria
export interface RelevanceCriteria {
  travelImpact: boolean;
  recency: boolean;
  specificity: boolean;
  actionability: boolean;
}

// Source registry entry (DB)
export interface SourceRegistry {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'api' | 'web';
  trustScore: number;
  category: string;
  regions: string[];
  fetchMethod: string;
  rssUrl?: string;
  apiEndpoint?: string;
  selector?: string;
  active: boolean;
  lastFetched?: Date;
  createdAt: Date;
  updatedAt: Date;
}
