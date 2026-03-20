#!/usr/bin/env node
// Scheduled job: Process queue items through pipeline
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment
require('dotenv').config();

// Database connection (Neon)
const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_pC1WvKbB2iMP',
  host: 'ep-falling-meadow-ag627iy8-pooler.c-2.eu-central-1.aws.neon.tech',
  port: 5432,
  database: 'neondb',
  ssl: { rejectUnauthorized: false }
});

// Load sources config for trust scores
const sourcesConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/sources.json'), 'utf8'));

// Category classification
const categoryKeywords = {
  'airline': ['flight', 'airline', 'carrier', 'aircraft', 'crew', 'pilot', 'cabin'],
  'airport': ['airport', 'terminal', 'runway', 'gate', 'security', 'customs', 'immigration'],
  'rail': ['train', 'rail', 'railway', 'station', 'track', 'metro', 'subway'],
  'ferry': ['ferry', 'boat', 'ship', 'vessel', 'cruise', 'port', 'crossing', 'sailing'],
  'government': ['visa', 'passport', 'border', 'entry', 'restriction', 'advisory', 'embassy'],
  'attraction': ['museum', 'monument', 'park', 'tour', 'visit', 'attraction', 'site', 'landmark'],
  'industry': ['iata', 'icao', 'aviation', 'regulation', 'policy', 'standard', 'eurocontrol', 'airspace'],
};

const severityIndicators = {
  critical: ['cancelled', 'suspended', 'closed', 'strike', 'emergency', 'evacuation', 'warning', 'severe'],
  high: ['delayed', 'disruption', 'severe', 'major', 'significant', 'important', 'affecting'],
  medium: ['changed', 'modified', 'updated', 'affecting', 'impact'],
  low: ['reminder', 'notice', 'minor', 'slight'],
};

async function processQueue() {
  console.log('🚀 Starting queue processing job...');
  console.log(`⏰ ${new Date().toISOString()}`);

  const stats = {
    fetched: 0,
    filtered: 0,
    classified: 0,
    generated: 0,
    published: 0,
    queued: 0,
    errors: 0
  };

  try {
    // Get pending items from queue
    const pendingResult = await pool.query(
      `SELECT * FROM ingestion_queue WHERE status = 'pending' ORDER BY fetched_at ASC LIMIT 10`
    );

    const pendingItems = pendingResult.rows;
    console.log(`📋 Processing ${pendingItems.length} pending items`);

    if (pendingItems.length === 0) {
      console.log('ℹ️ No pending items to process');
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

        // Step 1: Classify
        const classification = classify(item);
        console.log(`\n🏷️  Classified: ${classification.category} | ${classification.severity}`);

        // Step 2: Generate article
        const article = generateArticle(item, classification);
        console.log(`📝 Generated: "${article.title.substring(0, 50)}..."`);

        // Step 3: Validate
        const validation = validate(article, item.source_id);
        console.log(`✓ Validation score: ${validation.score} | Publish: ${validation.shouldPublish}`);

        // Step 4: Save to drafts
        const draftResult = await pool.query(
          `INSERT INTO article_drafts 
           (queue_item_id, title, slug, tldr, what_changed, who_is_affected, what_to_do, sources, category, location, status, severity, validation_score, draft_status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
            validation.shouldPublish ? 'approved' : 'pending_review'
          ]
        );

        const draftId = draftResult.rows[0].id;

        // Step 5: Auto-publish if validation passes
        if (validation.shouldPublish) {
          try {
            // Get category_id from categories table
            const categoryResult = await pool.query(
              `SELECT id FROM categories WHERE slug = $1 OR name ILIKE $2 LIMIT 1`,
              [article.category, article.category]
            );
            const categoryId = categoryResult.rows[0]?.id || 1; // Default to 1 if not found

            // Map status to valid enum values
            const statusMap = {
              'active': 'disruption',
              'resolved': 'update',
              'ongoing': 'warning'
            };
            const mappedStatus = statusMap[article.status] || 'update';

            // Insert into articles table (auto-publish)
            // Note: tldr is ARRAY type, so we wrap in array
            // body is required - combine content sections
            const body = `${article.whatChanged}\n\n${article.whoIsAffected}\n\n${article.whatToDo}`;
            
            const articleResult = await pool.query(
              `INSERT INTO articles 
               (headline, slug, summary, body, tldr, what_changed, who_is_affected, what_to_do, original_url, category_id, status, severity, published_at, updated_at, is_published)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW(), true)
               RETURNING id`,
              [
                article.title,
                article.slug,
                article.tldr,
                body,
                [article.tldr], // tldr is ARRAY type
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

            // Update draft status to published
            await pool.query(
              `UPDATE article_drafts SET draft_status = 'published' WHERE id = $1`,
              [draftId]
            );

            // Log to publish_audit
            await pool.query(
              `INSERT INTO publish_audit (draft_id, action, reason, confidence_score)
               VALUES ($1, 'published', 'Auto-published: validation passed', $2)`,
              [draftId, validation.score]
            );

            // Update queue status
            await pool.query(
              `UPDATE ingestion_queue SET status = 'published', processing_completed_at = NOW() WHERE id = $1`,
              [item.id]
            );

            stats.published++;
            console.log(`🎉 Auto-published article: ${articleId} (draft: ${draftId})`);

          } catch (publishError) {
            console.error(`❌ Auto-publish failed for draft ${draftId}:`, publishError.message);
            // Keep as approved draft for manual review
            await pool.query(
              `UPDATE ingestion_queue SET status = 'error', error_message = $2, processing_completed_at = NOW() WHERE id = $1`,
              [item.id, `Publish failed: ${publishError.message}`]
            );
            stats.errors++;
          }
        } else {
          await pool.query(
            `UPDATE ingestion_queue SET status = 'filtered', filter_reason = $2, processing_completed_at = NOW() WHERE id = $1`,
            [item.id, validation.reasons.join(', ')]
          );
          stats.queued++;
          console.log(`📋 Queued for review: ${validation.reasons.join(', ')}`);
        }

        stats.classified++;
        stats.generated++;

      } catch (error) {
        console.error(`❌ Error processing item ${item.id}:`, error.message);
        await pool.query(
          `UPDATE ingestion_queue SET status = 'error', error_message = $2 WHERE id = $1`,
          [item.id, error.message]
        );
        stats.errors++;
      }
    }

    console.log('\n✅ Queue processing complete');
    console.log('📊 Stats:', stats);

    await pool.end();
    process.exit(0);

  } catch (error) {
    console.error('❌ Queue processing failed:', error);
    await pool.end();
    process.exit(1);
  }
}

function classify(item) {
  const text = `${item.raw_title} ${item.raw_content || ''}`.toLowerCase();

  // Category
  let category = 'general';
  let maxScore = 0;
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    const score = keywords.filter(kw => text.includes(kw.toLowerCase())).length;
    if (score > maxScore) {
      maxScore = score;
      category = cat;
    }
  }

  // Severity
  let severity = 'medium';
  for (const [level, words] of Object.entries(severityIndicators)) {
    if (words.some(w => text.includes(w.toLowerCase()))) {
      severity = level;
      break;
    }
  }

  // Location extraction - comprehensive patterns
  const locationPatterns = [
    // Major airports (IATA codes and names)
    /\b(ATL|LAX|DXB|HND|ORD|LHR|CDG|AMS|FRA|IST|SIN|ICN|MAD|BCN|FCO|MUC|ZUR|VIE|CPH|OSL|ARN|HEL|DUB|ZRH|BRU|PRG|WAW|BUD|LIS|ATH)\b/,
    /\b(Heathrow|Gatwick|Stansted|Luton|City Airport|Narita|Haneda|Kansai|Charles de Gaulle|Orly|Schiphol|Frankfurt|Munich|Barcelona|El Prat|Rome|Fiumicino|Milan|Malpensa|Venice|Marco Polo|Paris|London|Madrid|Berlin|Brussels|Zurich|Vienna|Prague|Warsaw|Oslo|Stockholm|Copenhagen|Helsinki|Dublin|Lisbon|Athens)\b/i,
    // Cities
    /\b(Tokyo|Osaka|Kyoto|Yokohama|Beijing|Shanghai|Hong Kong|Singapore|Bangkok|Seoul|Delhi|Mumbai|Sydney|Melbourne|Auckland|Dubai|Abu Dhabi|Doha|Istanbul|Cairo|Cape Town|Johannesburg|Rio|Buenos Aires|Santiago|Mexico City|Cancun)\b/i,
    /\b(New York|Los Angeles|Chicago|San Francisco|Miami|Boston|Washington|Seattle|Las Vegas|Denver|Dallas|Houston|Atlanta|Phoenix|Philadelphia)\b/i,
    /\b(London|Manchester|Birmingham|Edinburgh|Glasgow|Liverpool|Bristol|Leeds|Cardiff|Belfast)\b/i,
    /\b(Paris|Lyon|Marseille|Nice|Bordeaux|Toulouse|Strasbourg|Nantes)\b/i,
    /\b(Berlin|Munich|Hamburg|Frankfurt|Cologne|Stuttgart|Dusseldorf|Dresden|Leipzig)\b/i,
    /\b(Rome|Milan|Naples|Turin|Palermo|Genoa|Bologna|Florence|Venice|Verona)\b/i,
    /\b(Barcelona|Madrid|Valencia|Seville|Malaga|Bilbao|Granada|Zaragoza)\b/i,
    /\b(Amsterdam|Rotterdam|The Hague|Utrecht|Eindhoven|Groningen)\b/i,
    /\b(Zurich|Geneva|Basel|Bern|Lausanne|Lucerne)\b/i,
    /\b(Vienna|Salzburg|Innsbruck|Graz|Linz)\b/i,
    /\b(Stockholm|Gothenburg|Malmö|Uppsala)\b/i,
    /\b(Oslo|Bergen|Trondheim|Stavanger)\b/i,
    /\b(Copenhagen|Aarhus|Odense|Aalborg)\b/i,
    /\b(Helsinki|Espoo|Tampere|Turku)\b/i,
    /\b(Warsaw|Krakow|Gdansk|Wroclaw|Poznan|Lodz)\b/i,
    /\b(Prague|Brno|Ostrava|Pilsen)\b/i,
    /\b(Budapest|Debrecen|Szeged|Miskolc)\b/i,
    // Countries
    /\b(United States|USA|UK|Britain|France|Germany|Spain|Italy|Netherlands|Belgium|Switzerland|Austria|Poland|Portugal|Greece|Turkey|Norway|Sweden|Denmark|Finland|Iceland|Ireland|Czech Republic|Hungary|Romania|Bulgaria|Croatia|Slovenia|Slovakia|Serbia|Bosnia|Montenegro|North Macedonia|Albania|Kosovo|Estonia|Latvia|Lithuania|Belarus|Ukraine|Moldova|Russia)\b/i,
    /\b(Japan|China|South Korea|North Korea|India|Pakistan|Bangladesh|Sri Lanka|Nepal|Bhutan|Maldives|Afghanistan|Myanmar|Thailand|Laos|Cambodia|Vietnam|Malaysia|Singapore|Indonesia|Philippines|Brunei|East Timor|Australia|New Zealand|Fiji|Papua New Guinea)\b/i,
    /\b(Canada|Mexico|Cuba|Jamaica|Haiti|Dominican Republic|Puerto Rico|Bahamas|Barbados|Trinidad|Guatemala|Belize|El Salvador|Honduras|Nicaragua|Costa Rica|Panama|Colombia|Venezuela|Ecuador|Peru|Brazil|Bolivia|Chile|Argentina|Uruguay|Paraguay|Guyana|Suriname|French Guiana)\b/i,
    /\b(Morocco|Algeria|Tunisia|Libya|Egypt|Sudan|Chad|Niger|Mali|Burkina Faso|Mauritania|Senegal|Gambia|Guinea|Sierra Leone|Liberia|Ivory Coast|Ghana|Togo|Benin|Nigeria|Cameroon|Central African Republic|Equatorial Guinea|Gabon|Congo|DRC|Angola|Namibia|Botswana|Zimbabwe|Zambia|Malawi|Mozambique|Madagascar|Mauritius|Seychelles|South Africa|Lesotho|Eswatini)\b/i,
    /\b(Saudi Arabia|UAE|United Arab Emirates|Dubai|Abu Dhabi|Qatar|Bahrain|Kuwait|Oman|Yemen|Iraq|Iran|Syria|Lebanon|Jordan|Israel|Palestine|Cyprus|Georgia|Armenia|Azerbaijan|Kazakhstan|Uzbekistan|Turkmenistan|Kyrgyzstan|Tajikistan|Mongolia)\b/i,
    // Regions
    /\b(Europe|European Union|EU|Schengen|Schengen Area|Asia|South Asia|Southeast Asia|East Asia|Middle East|Gulf|North America|South America|Latin America|Central America|Caribbean|Africa|North Africa|Sub-Saharan Africa|Southern Africa|East Africa|West Africa|Central Africa|Oceania|Australasia|Pacific|Balkans|Baltic|Nordic|Mediterranean|Alpine)\b/i,
  ];

  let location = null;
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) {
      location = match[1] || match[0];
      break;
    }
  }

  // Status
  const resolvedWords = ['resolved', 'ended', 'lifted', 'reopened', 'resumed'];
  const ongoingWords = ['ongoing', 'continues', 'extended', 'remains'];
  let status = 'active';
  if (resolvedWords.some(w => text.includes(w))) status = 'resolved';
  else if (ongoingWords.some(w => text.includes(w))) status = 'ongoing';

  return { category, severity, location, status };
}

function generateArticle(item, classification) {
  const title = item.raw_title.trim();
  const content = item.raw_content || '';
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60)
    .replace(/-+$/, '');

  const location = classification.location || 'affected areas';
  const severity = classification.severity;
  const category = classification.category;

  // Extract specific details from content
  const details = extractDetails(title, content);

  // Generate contextual TL;DR
  const tldr = generateTLDR(title, details, severity, location, category);

  // Generate specific What Changed
  const whatChanged = generateWhatChanged(title, details, classification);

  // Generate specific Who Is Affected
  const whoIsAffected = generateWhoIsAffected(title, details, category, location);

  // Generate contextual What To Do
  const whatToDo = generateWhatToDo(severity, category, details);

  return {
    title,
    slug,
    tldr,
    whatChanged,
    whoIsAffected,
    whatToDo,
    sources: item.raw_url,
    category: classification.category,
    location: classification.location,
    status: classification.status,
    severity: classification.severity,
    lastUpdated: new Date()
  };
}

function extractDetails(title, content) {
  const combined = `${title} ${content}`.toLowerCase();
  const details = {
    airline: null,
    airport: null,
    route: null,
    dates: null,
    reason: null
  };

  // Extract airline
  const airlineMatch = combined.match(/\b(united|american|delta|lufthansa|british airways|jetblue|sas|norwegian|emirates|qatar)\b/i);
  if (airlineMatch) details.airline = airlineMatch[1];

  // Extract airport
  const airportMatch = combined.match(/\b(narita|heathrow|gatwick|jfk|cdg|frankfurt|amsterdam|dubai|singapore|tokyo|london|paris)\b/i);
  if (airportMatch) details.airport = airportMatch[1];

  // Extract route
  const routeMatch = title.match(/([A-Z]{3})\s*[-–]\s*([A-Z]{3})/);
  if (routeMatch) details.route = `${routeMatch[1]}-${routeMatch[2]}`;

  // Extract dates
  const dateMatch = combined.match(/\b(from|starting|effective|until)\s+([a-z]+\s+\d{1,2}|\d{1,2}\s+[a-z]+|\d{1,2}[\/\.]\d{1,2})\b/i);
  if (dateMatch) details.dates = dateMatch[2];

  // Extract reason
  const reasonPatterns = [
    /due to ([^.]+)/i,
    /because of ([^.]+)/i,
    /following ([^.]+)/i,
    /after ([^.]+)/i
  ];
  for (const pattern of reasonPatterns) {
    const match = combined.match(pattern);
    if (match) {
      details.reason = match[1].trim();
      break;
    }
  }

  return details;
}

function generateTLDR(title, details, severity, location, category) {
  const airline = details.airline ? details.airline.charAt(0).toUpperCase() + details.airline.slice(1) : null;
  const airport = details.airport ? details.airport.charAt(0).toUpperCase() + details.airport.slice(1) : null;

  if (severity === 'critical') {
    if (airline && airport) {
      return `${airline} operations at ${airport} severely disrupted. Immediate rebooking required for affected passengers.`;
    }
    return `Major travel disruption at ${location}. Check your bookings immediately.`;
  }

  if (severity === 'high') {
    if (title.toLowerCase().includes('cancel')) {
      return `Service cancellations affecting ${location}. Passengers should verify alternative arrangements.`;
    }
    if (title.toLowerCase().includes('delay')) {
      return `Significant delays reported at ${location}. Allow extra time and check status before travel.`;
    }
    return `Important changes to ${category} services at ${location}. Review your travel plans.`;
  }

  if (category === 'government') {
    return `New entry requirements for ${location}. Check documentation before departure.`;
  }

  return `Travel update for ${location}: ${title.substring(0, 60)}...`;
}

function generateWhatChanged(title, details, classification) {
  const location = classification.location || 'the affected area';
  const status = classification.status;
  const severity = classification.severity;

  // Extract key action from title
  let action = 'updated';
  if (title.toLowerCase().includes('cancel')) action = 'cancelled';
  else if (title.toLowerCase().includes('delay')) action = 'delayed';
  else if (title.toLowerCase().includes('suspend')) action = 'suspended';
  else if (title.toLowerCase().includes('resume')) action = 'resumed';
  else if (title.toLowerCase().includes('cease')) action = 'ending';
  else if (title.toLowerCase().includes('new') && title.toLowerCase().includes('requirement')) action = 'new requirements introduced';

  let text = `${action.charAt(0).toUpperCase() + action.slice(1)}`;

  if (details.airline) {
    text += ` for ${details.airline.charAt(0).toUpperCase() + details.airline.slice(1)}`;
  }

  if (details.airport) {
    text += ` at ${details.airport.charAt(0).toUpperCase() + details.airport.slice(1)}`;
  }

  if (details.route) {
    text += ` on route ${details.route}`;
  }

  if (details.dates) {
    text += ` ${details.dates}`;
  }

  if (details.reason) {
    text += ` due to ${details.reason}`;
  }

  text += `. This is currently ${status} with ${severity} impact on travelers.`;

  return text;
}

function generateWhoIsAffected(title, details, category, location) {
  let affected = '';

  if (category === 'airline') {
    if (details.route) {
      affected = `Passengers booked on flights ${details.route}`;
    } else if (details.airport) {
      affected = `Passengers flying to, from, or through ${details.airport}`;
    } else {
      affected = `Passengers with ${details.airline || 'affected airline'} bookings`;
    }
  } else if (category === 'airport') {
    affected = `All travelers using ${details.airport || location} airport`;
  } else if (category === 'rail') {
    affected = `Rail passengers on affected routes through ${location}`;
  } else if (category === 'government') {
    affected = `All travelers entering ${location}`;
  } else {
    affected = `Travelers planning to visit ${location}`;
  }

  // Add specificity based on severity
  if (title.toLowerCase().includes('cease') || title.toLowerCase().includes('end')) {
    affected += '. This affects future bookings and may require rebooking on alternative services.';
  } else if (title.toLowerCase().includes('cancel')) {
    affected += '. Check your specific flight status as not all services may be affected.';
  } else {
    affected += '. Monitor for updates as the situation may change.';
  }

  return affected;
}

function generateWhatToDo(severity, category, details) {
  let actions = [];

  if (severity === 'critical') {
    actions = [
      'Contact your airline/operator immediately for rebooking',
      'Check alternative routes or carriers',
      'Review travel insurance coverage for cancellations',
      'Monitor official sources for real-time updates'
    ];
  } else if (severity === 'high') {
    actions = [
      'Verify your booking status online or via app',
      'Check for rebooking options if affected',
      'Allow extra time at the airport/station',
      'Sign up for alerts from your carrier'
    ];
  } else {
    actions = [
      'Review your itinerary for potential impacts',
      'Check if your specific route is affected',
      'Have backup plans ready',
      'Monitor for further updates'
    ];
  }

  if (category === 'government') {
    actions.unshift('Check entry requirements on official government websites');
  }

  if (details.airline) {
    actions.push(`Visit ${details.airline.charAt(0).toUpperCase() + details.airline.slice(1)} website for specific guidance`);
  }

  return actions.map((a, i) => `${i + 1}. ${a}`).join('. ');
}

function validate(article, sourceId) {
  const source = sourcesConfig.sources.find(s => s.id === sourceId);
  const sourceTrust = source?.trustScore || 0.5;

  const completeness = [
    article.title?.length > 10,
    article.tldr?.length > 20,
    article.whatChanged?.length > 20,
    article.whoIsAffected?.length > 20,
    article.whatToDo?.length > 20,
    article.sources?.length > 0
  ].filter(Boolean).length / 6;

  const impactClarity = (
    article.tldr.includes('.') &&
    (article.whoIsAffected.includes('Passengers') || article.whoIsAffected.includes('Travelers') || article.whoIsAffected.includes('Airlines'))
  ) ? 1.0 : 0.7;

  const score = Math.round((sourceTrust * 0.3 + completeness * 0.4 + impactClarity * 0.3) * 100) / 100;

  const shouldPublish = score >= 0.75;
  const reasons = [];

  if (!shouldPublish) {
    if (score < 0.75) reasons.push('Score below threshold');
    if (completeness < 0.8) reasons.push('Incomplete article');
  }

  return { score, shouldPublish, reasons };
}

processQueue();
