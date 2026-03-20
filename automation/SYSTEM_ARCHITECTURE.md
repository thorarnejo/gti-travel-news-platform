# GTI Automated Travel News Pipeline - System Architecture

## Overview

A 6-stage automated pipeline that discovers, processes, and publishes travel news with minimal human intervention.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        SOURCE REGISTRY                          │
│  (Curated whitelist of 20+ trusted travel news sources)        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 1: SOURCE FETCH                                          │
│  - Scheduled crawling of RSS/API/web pages                     │
│  - Store raw source data in ingestion queue                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 2: RELEVANCE FILTER                                      │
│  - Filter by: travel-impact, recency, specificity, actionability│
│  - Reject: inspiration, opinion, lifestyle, duplicates         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 3: CLASSIFICATION                                        │
│  - Assign: category, location, status, severity                │
│  - Extract: affected travelers, timeline, impact scope           │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 4: ARTICLE GENERATION                                    │
│  - Generate structured article with all required fields          │
│  - Format: TL;DR, What Changed, Who Affected, What To Do         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 5: VALIDATION LAYER                                      │
│  - Score: source trust, recency, impact clarity, completeness   │
│  - Decision: Auto-publish OR Review Queue                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  AUTO-PUBLISH   │    │  REVIEW QUEUE   │
│  (High confidence)│   │  (Human review) │
└─────────────────┘    └─────────────────┘
```

## Data Flow

1. **Cron triggers** fetch job every 15 minutes
2. **Source Fetcher** checks all registered sources
3. **Raw items** stored in `ingestion_queue` table
4. **Pipeline worker** processes queue items sequentially
5. **Validated articles** auto-published or sent to review
6. **Audit log** tracks all decisions

## Database Schema Additions

### ingestion_queue
- id, source_id, raw_title, raw_url, raw_content, fetched_at, status

### source_registry
- id, name, url, type (rss|api|web), trust_score, category, active, last_fetched

### article_drafts
- id, queue_item_id, title, slug, tldr, what_changed, who_affected, what_to_do, sources, validation_score, status

### publish_audit
- id, draft_id, action (published|rejected|queued), reason, timestamp

## File Structure

```
automation/
├── config/
│   └── sources.json              # Source registry
├── lib/
│   ├── fetcher.ts                # Source fetching logic
│   ├── classifier.ts             # Content classification
│   ├── generator.ts              # Article generation
│   ├── validator.ts              # Validation scoring
│   └── publisher.ts              # Publishing logic
├── jobs/
│   ├── fetch-sources.ts          # Scheduled fetch job
│   └── process-queue.ts          # Pipeline processor
├── queue/
│   └── queue-manager.ts          # Queue operations
├── types/
│   └── pipeline.ts               # TypeScript types
└── SYSTEM_ARCHITECTURE.md        # This file
```

## Auto-Publish Thresholds

- Source trust score: ≥ 0.8
- Recency: ≤ 24 hours
- Impact clarity: ≥ 0.7
- Completeness: ≥ 0.9
- **Overall confidence: ≥ 0.85**

## Cron Schedule

- Fetch: Every 15 minutes
- Process: Every 5 minutes
- Cleanup: Daily at 03:00
