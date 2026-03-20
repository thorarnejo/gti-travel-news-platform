#!/usr/bin/env node
// Controlled Mode Queue Processing - Production Ready
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load config
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/controlled-mode.json'), 'utf8'));

// Database connection (Neon)
const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_pC1WvKbB2iMP',
  host: 'ep-falling-meadow-ag627iy8-pooler.c-2.eu-central-1.aws.neon.tech',
  port: 5432,
  database: 'neondb',
  ssl: { rejectUnauthorized: false }
});

// Ensure log directory exists
const logDir = config.logging.log_dir;
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Initialize log file
const timestamp = new Date().toISOString().replace(/:/g, '-');
const logFile = path.join(logDir, `process-${timestamp}.log`);
const runStats = {
  started: new Date().toISOString(),
  fetched: 0,
  filtered: 0,
  duplicates: 0,
  processed: 0,
  published: 0,
  review_queue: 0,
  rejected: 0,
  failed: 0,
  items: []
};

function log(message, level = 'info') {
  const entry = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
  console.log(entry);
  fs.appendFileSync(logFile, entry + '\n');
}

async function processQueue() {
  log('🚀 Starting CONTROLLED MODE queue processing');
  log(`Dry run: ${config.dry_run ? 'ENABLED' : 'DISABLED'}`);
  log(`Auto-publish threshold: ${config.thresholds.auto_publish_min_score}`);
  log(`Review queue threshold: ${config.thresholds.review_queue_min_score}`);

  try {
    // Get pending items
    const pendingResult = await pool.query(
      `SELECT * FROM ingestion_queue WHERE status = 'pending' ORDER BY fetched_at ASC LIMIT 20`
    );

    const pendingItems = pendingResult.rows;
    runStats.fetched = pendingItems.length;
    log(`📋 Processing ${pendingItems.length} pending items`);

    if (pendingItems.length === 0) {
      log('ℹ️ No pending items to process');
      await saveRunLog();
      await pool.end();
      process.exit(0);
    }

    for (const item of pendingItems) {
      try {
        // Update status to processing
        await pool.query(
          `UPDATE ingestion_queue SET status = 'processing', processing_started_at = NOW() WHERE id = $1`,
          [item.id]
        );

        // Check source policy
        const sourcePolicy = getSourcePolicy(item.source_id);
        log(`Processing from ${item.source_id} (policy: ${sourcePolicy.policy})`);

        // Step 1: Classify
        const classification = classify(item);
        
        // Step 2: Apply controlled validation
        const validation = await controlledValidate(item, classification, sourcePolicy);
        
        log(`📊 Score: ${validation.score} | Source: ${item.source_id} | Policy: ${sourcePolicy.policy}`);
        log(`   Decision: ${validation.decision} | Reason: ${validation.reason}`);

        // Generate article content
        const article = generateArticle(item, classification);

        // Track item
        runStats.items.push({
          source: item.source_id,
          title: item.raw_title.substring(0, 80),
          score: validation.score,
          decision: validation.decision,
          reason: validation.reason
        });

        // Execute decision
        if (validation.decision === 'publish') {
          await handlePublish(item, article, validation, sourcePolicy);
          runStats.published++;
        } else if (validation.decision === 'review') {
          await handleReview(item, article, validation);
          runStats.review_queue++;
        } else {
          await handleReject(item, validation);
          runStats.rejected++;
        }

        runStats.processed++;

      } catch (error) {
        log(`❌ Error processing item ${item.id}: ${error.message}`, 'error');
        await pool.query(
          `UPDATE ingestion_queue SET status = 'error', error_message = $2 WHERE id = $1`,
          [item.id, error.message]
        );
        runStats.failed++;
      }
    }

    await saveRunLog();
    log('\n✅ Queue processing complete');
    log(`📊 Summary: ${runStats.published} published, ${runStats.review_queue} review, ${runStats.rejected} rejected, ${runStats.failed} failed`);

    await pool.end();
    process.exit(0);

  } catch (error) {
    log(`❌ Queue processing failed: ${error.message}`, 'error');
    await saveRunLog();
    await pool.end();
    process.exit(1);
  }
}

function getSourcePolicy(sourceId) {
  for (const [policyName, policy] of Object.entries(config.source_policies)) {
    if (policy.sources.includes(sourceId)) {
      return { policy: policyName, ...policy };
    }
  }
  // Default: strict review
  return {
    policy: 'default',
    trust_boost: -0.10,
    auto_publish_eligible: false,
    review_only: true,
    min_score: 0.95
  };
}

async function controlledValidate(item, classification, sourcePolicy) {
  const baseScore = calculateBaseScore(item, classification);
  const adjustedScore = Math.min(1.0, Math.max(0, baseScore + (sourcePolicy.trust_boost || 0)));
  
  const result = {
    score: Math.round(adjustedScore * 100) / 100,
    decision: 'reject',
    reason: ''
  };

  // Check minimum score
  if (result.score < config.thresholds.reject_below_score) {
    result.reason = `Score ${result.score} below minimum ${config.thresholds.reject_below_score}`;
    return result;
  }

  // Check if source is review-only
  if (sourcePolicy.review_only) {
    if (result.score >= config.thresholds.review_queue_min_score) {
      result.decision = 'review';
      result.reason = `Review-only source (${sourcePolicy.policy}), score ${result.score}`;
    } else {
      result.reason = `Review-only source, score ${result.score} below review threshold`;
    }
    return result;
  }

  // Check auto-publish eligibility
  if (!sourcePolicy.auto_publish_eligible) {
    result.decision = 'review';
    result.reason = `Source not auto-publish eligible`;
    return result;
  }

  // Apply media/news stricter rules
  if (sourcePolicy.policy === 'news_media' || sourcePolicy.policy === 'aviation_blogs') {
    const extraReqs = sourcePolicy.extra_requirements || {};
    
    // Check for required travel impact keywords
    if (extraReqs.require_travel_impact_keywords) {
      const hasImpact = extraReqs.require_travel_impact_keywords.some(
        kw => item.raw_title.toLowerCase().includes(kw) || (item.raw_content || '').toLowerCase().includes(kw)
      );
      if (!hasImpact) {
        result.decision = 'review';
        result.reason = `Media source: missing required impact keywords`;
        return result;
      }
    }

    // Check for specific location
    if (extraReqs.require_specific_location && !classification.location) {
      result.decision = 'review';
      result.reason = `Media source: no specific location detected`;
      return result;
    }

    // Check content length
    if (extraReqs.min_content_length && (item.raw_content || '').length < extraReqs.min_content_length) {
      result.decision = 'review';
      result.reason = `Media source: content too short (${item.raw_content?.length} chars)`;
      return result;
    }

    // Media sources need higher score for auto-publish
    const mediaThreshold = config.thresholds.auto_publish_min_score + 
                          (config.thresholds.media_sources_extra_threshold || 0.05);
    if (result.score >= mediaThreshold) {
      result.decision = 'publish';
      result.reason = `High confidence (${result.score}) for media source`;
    } else if (result.score >= config.thresholds.review_queue_min_score) {
      result.decision = 'review';
      result.reason = `Media source: score ${result.score}, needs review`;
    }
    return result;
  }

  // Standard auto-publish check
  if (result.score >= config.thresholds.auto_publish_min_score) {
    result.decision = 'publish';
    result.reason = `High confidence score: ${result.score}`;
  } else if (result.score >= config.thresholds.review_queue_min_score) {
    result.decision = 'review';
    result.reason = `Score ${result.score}: borderline, sent to review`;
  } else {
    result.reason = `Score ${result.score}: below thresholds`;
  }

  return result;
}

function calculateBaseScore(item, classification) {
  let score = 0.70; // Base score

  // Completeness
  if (item.raw_title.length > 30) score += 0.05;
  if (item.raw_content && item.raw_content.length > 100) score += 0.05;
  if (classification.location) score += 0.05;

  // Category clarity
  if (classification.category !== 'general') score += 0.05;

  // Severity clarity
  if (classification.severity !== 'low') score += 0.05;

  // Recency
  const ageHours = (new Date() - new Date(item.published_at)) / (1000 * 60 * 60);
  if (ageHours < 6) score += 0.05;

  return Math.min(1.0, score);
}

async function handlePublish(item, article, validation, sourcePolicy) {
  if (config.dry_run) {
    log(`   [DRY RUN] Would publish: "${article.title.substring(0, 50)}..."`);
    await pool.query(
      `UPDATE ingestion_queue SET status = 'dry_run', processing_completed_at = NOW() WHERE id = $1`,
      [item.id]
    );
    return;
  }

  // Get category_id
  const categoryResult = await pool.query(
    `SELECT id FROM categories WHERE slug = $1 OR name ILIKE $2 LIMIT 1`,
    [article.category, article.category]
  );
  const categoryId = categoryResult.rows[0]?.id || 1;

  // Map status
  const statusMap = { 'active': 'disruption', 'resolved': 'update', 'ongoing': 'warning' };
  const mappedStatus = statusMap[article.status] || 'update';

  // Insert article
  const body = `${article.whatChanged}\n\n${article.whoIsAffected}\n\n${article.whatToDo}`;
  
  const articleResult = await pool.query(
    `INSERT INTO articles 
     (headline, slug, summary, body, tldr, what_changed, who_is_affected, what_to_do, 
      original_url, category_id, status, severity, published_at, updated_at, is_published)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW(), true)
     RETURNING id`,
    [
      article.title,
      article.slug,
      article.tldr,
      body,
      [article.tldr],
      article.whatChanged,
      article.whoIsAffected,
      article.whatToDo,
      article.sources,
      categoryId,
      mappedStatus,
      article.severity
    ]
  );

  const articleId = articleResult.rows[0].id;

  // Update queue
  await pool.query(
    `UPDATE ingestion_queue SET status = 'published', processing_completed_at = NOW() WHERE id = $1`,
    [item.id]
  );

  log(`   🎉 PUBLISHED: Article ${articleId}`);
}

async function handleReview(item, article, validation) {
  // Save to drafts for manual review
  const draftResult = await pool.query(
    `INSERT INTO article_drafts 
     (queue_item_id, title, slug, tldr, what_changed, who_is_affected, what_to_do, 
      sources, category, location, status, severity, validation_score, draft_status, review_reason)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending_review', $14)
     RETURNING id`,
    [
      item.id,
      article.title,
      article.slug,
      article.tldr,
      article.whatChanged,
      article.whoIsAffected,
      article.whatToDo,
      article.sources,
      article.category,
      article.location,
      article.status,
      article.severity,
      validation.score,
      validation.reason
    ]
  );

  await pool.query(
    `UPDATE ingestion_queue SET status = 'review', filter_reason = $2, processing_completed_at = NOW() WHERE id = $1`,
    [item.id, validation.reason]
  );

  log(`   📋 REVIEW QUEUE: Draft ${draftResult.rows[0].id}`);
}

async function handleReject(item, validation) {
  await pool.query(
    `UPDATE ingestion_queue SET status = 'rejected', filter_reason = $2, processing_completed_at = NOW() WHERE id = $1`,
    [item.id, validation.reason]
  );

  log(`   ❌ REJECTED: ${validation.reason}`);
}

function classify(item) {
  const text = `${item.raw_title} ${item.raw_content || ''}`.toLowerCase();
  
  // Category detection
  const categories = {
    'airline': ['flight', 'airline', 'carrier', 'aircraft', 'crew', 'pilot'],
    'airport': ['airport', 'terminal', 'runway', 'gate', 'security'],
    'rail': ['train', 'rail', 'railway', 'station', 'track'],
    'government': ['visa', 'passport', 'border', 'entry', 'restriction'],
    'attraction': ['museum', 'park', 'tour', 'attraction'],
    'industry': ['aviation', 'regulation', 'policy']
  };

  let category = 'general';
  let maxScore = 0;
  for (const [cat, keywords] of Object.entries(categories)) {
    const score = keywords.filter(kw => text.includes(kw)).length;
    if (score > maxScore) {
      maxScore = score;
      category = cat;
    }
  }

  // Severity
  const severities = {
    critical: ['cancelled', 'suspended', 'closed', 'strike', 'emergency'],
    high: ['delayed', 'disruption', 'severe', 'major'],
    medium: ['changed', 'updated', 'affecting']
  };

  let severity = 'medium';
  for (const [level, words] of Object.entries(severities)) {
    if (words.some(w => text.includes(w))) {
      severity = level;
      break;
    }
  }

  // Location
  const locations = [
    /\b(Heathrow|Gatwick|JFK|CDG|Frankfurt|Narita|Dubai|Singapore|Amsterdam)\b/i,
    /\b(London|Paris|Tokyo|New York|Dubai|Singapore|Hong Kong|Sydney)\b/i,
    /\b(UK|USA|France|Germany|Japan|Australia|Norway|Sweden)\b/i
  ];

  let location = null;
  for (const pattern of locations) {
    const match = text.match(pattern);
    if (match) {
      location = match[1];
      break;
    }
  }

  // Status
  const status = text.includes('resolved') || text.includes('ended') ? 'resolved' : 
                 text.includes('ongoing') ? 'ongoing' : 'active';

  return { category, severity, location, status };
}

function generateArticle(item, classification) {
  const title = item.raw_title.trim().replace(/\s+/g, ' ');
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);

  const location = classification.location || 'affected areas';
  
  return {
    title,
    slug,
    tldr: `Travel ${classification.status}: ${title.substring(0, 80)}...`,
    whatChanged: `Service update for ${classification.category} operations in ${location}. Status: ${classification.status}.`,
    whoIsAffected: `Travelers using ${classification.category} services in ${location}.`,
    whatToDo: '1. Check current status. 2. Verify bookings. 3. Monitor updates.',
    sources: item.raw_url,
    category: classification.category,
    location: classification.location,
    status: classification.status,
    severity: classification.severity
  };
}

async function saveRunLog() {
  runStats.ended = new Date().toISOString();
  const summaryFile = path.join(logDir, `summary-${new Date().toISOString().split('T')[0]}.json`);
  fs.appendFileSync(summaryFile, JSON.stringify(runStats) + '\n');
}

processQueue();
