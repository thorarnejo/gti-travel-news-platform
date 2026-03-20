-- Database schema additions for GTI Automated News Pipeline
-- Run this after the existing schema is in place

-- Source registry table
CREATE TABLE IF NOT EXISTS source_registry (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('rss', 'api', 'web')),
    trust_score DECIMAL(3,2) NOT NULL CHECK (trust_score >= 0 AND trust_score <= 1),
    category VARCHAR(50) NOT NULL,
    regions TEXT[], -- Array of region codes
    fetch_method VARCHAR(20) NOT NULL,
    rss_url TEXT,
    api_endpoint TEXT,
    selector TEXT,
    active BOOLEAN DEFAULT true,
    last_fetched TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ingestion queue for raw fetched items
CREATE TABLE IF NOT EXISTS ingestion_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id VARCHAR(50) NOT NULL REFERENCES source_registry(id),
    raw_title TEXT NOT NULL,
    raw_url TEXT NOT NULL,
    raw_content TEXT,
    raw_summary TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'filtered', 'classified', 'generated', 'validated', 'published', 'rejected', 'error')),
    filter_reason TEXT,
    processing_started_at TIMESTAMP WITH TIME ZONE,
    processing_completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    UNIQUE(source_id, raw_url, DATE(fetched_at))
);

-- Article drafts (pre-validation)
CREATE TABLE IF NOT EXISTS article_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    queue_item_id UUID NOT NULL REFERENCES ingestion_queue(id) ON DELETE CASCADE,
    
    -- Generated content
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tldr TEXT NOT NULL,
    what_changed TEXT NOT NULL,
    who_is_affected TEXT NOT NULL,
    what_to_do TEXT NOT NULL,
    sources TEXT NOT NULL,
    
    -- Classification
    category VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'resolved', 'ongoing')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    
    -- Metadata
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_date TIMESTAMP WITH TIME ZONE,
    
    -- Validation
    validation_score DECIMAL(3,2) NOT NULL CHECK (validation_score >= 0 AND validation_score <= 1),
    validation_details JSONB,
    
    -- Status
    draft_status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (draft_status IN ('draft', 'pending_review', 'approved', 'rejected', 'published')),
    review_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Publish audit log
CREATE TABLE IF NOT EXISTS publish_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    draft_id UUID NOT NULL REFERENCES article_drafts(id),
    action VARCHAR(20) NOT NULL CHECK (action IN ('published', 'rejected', 'queued', 'error')),
    reason TEXT NOT NULL,
    confidence_score DECIMAL(3,2),
    published_article_id UUID REFERENCES articles(id),
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deduplication tracking
CREATE TABLE IF NOT EXISTS deduplication_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_hash VARCHAR(64) NOT NULL UNIQUE,
    source_url TEXT NOT NULL,
    first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    article_draft_id UUID REFERENCES article_drafts(id)
);

-- Pipeline metrics
CREATE TABLE IF NOT EXISTS pipeline_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    source_id VARCHAR(50) REFERENCES source_registry(id),
    items_fetched INTEGER DEFAULT 0,
    items_filtered INTEGER DEFAULT 0,
    items_classified INTEGER DEFAULT 0,
    items_generated INTEGER DEFAULT 0,
    items_validated INTEGER DEFAULT 0,
    items_published INTEGER DEFAULT 0,
    items_queued INTEGER DEFAULT 0,
    items_rejected INTEGER DEFAULT 0,
    avg_processing_time_ms INTEGER,
    errors_count INTEGER DEFAULT 0,
    UNIQUE(metric_date, source_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ingestion_queue_status ON ingestion_queue(status);
CREATE INDEX IF NOT EXISTS idx_ingestion_queue_source ON ingestion_queue(source_id);
CREATE INDEX IF NOT EXISTS idx_ingestion_queue_fetched ON ingestion_queue(fetched_at);
CREATE INDEX IF NOT EXISTS idx_article_drafts_status ON article_drafts(draft_status);
CREATE INDEX IF NOT EXISTS idx_article_drafts_score ON article_drafts(validation_score);
CREATE INDEX IF NOT EXISTS idx_drafts_queue_item ON article_drafts(queue_item_id);
CREATE INDEX IF NOT EXISTS idx_audit_draft ON publish_audit(draft_id);
CREATE INDEX IF NOT EXISTS idx_dedup_hash ON deduplication_log(content_hash);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_source_registry_updated_at ON source_registry;
CREATE TRIGGER update_source_registry_updated_at
    BEFORE UPDATE ON source_registry
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_article_drafts_updated_at ON article_drafts;
CREATE TRIGGER update_article_drafts_updated_at
    BEFORE UPDATE ON article_drafts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default sources from config (run after sources.json is loaded)
-- This will be populated by the setup script
