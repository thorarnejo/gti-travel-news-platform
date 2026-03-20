// Full Pipeline Test - With Simulated Travel News
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_pC1WvKbB2iMP',
  host: 'ep-falling-meadow-ag627iy8-pooler.c-2.eu-central-1.aws.neon.tech',
  port: 5432,
  database: 'neondb',
  ssl: { rejectUnauthorized: false }
});

// Simulated travel news items (as would come from real sources)
const simulatedItems = [
  {
    sourceId: 'eurocontrol',
    sourceName: 'Eurocontrol',
    title: 'Severe Weather Delays Flights Across Northern Europe',
    url: 'https://www.eurocontrol.int/news/weather-delays-2024',
    content: 'Severe weather conditions are causing significant delays to flights across Northern Europe today. Passengers should expect delays of 2-4 hours. Airlines are advising travelers to check flight status before departure.',
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    sourceId: 'sas-alerts',
    sourceName: 'SAS Airlines',
    title: 'Pilot Strike Cancelled - Flights Resume Normal Schedule',
    url: 'https://www.flysas.com/en/news/pilot-strike-cancelled',
    content: 'The planned pilot strike has been cancelled following successful negotiations. All flights will operate as scheduled. Passengers with bookings can travel as planned.',
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    sourceId: 'uk-gov-travel',
    sourceName: 'UK Foreign Office',
    title: 'New Entry Requirements for UK Travelers to France',
    url: 'https://www.gov.uk/foreign-travel-advice/france',
    content: 'New entry requirements for UK travelers visiting France take effect from next month. Travelers must complete online registration before departure.',
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    sourceId: 'lufthansa-news',
    sourceName: 'Lufthansa',
    title: 'Top 10 Best Places to Visit in Germany This Summer',
    url: 'https://newsroom.lufthansagroup.com/top-10-places',
    content: 'Discover the most beautiful destinations in Germany this summer. From Bavarian castles to Berlin nightlife, here are our top picks.',
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    sourceId: 'norwegian-alerts',
    sourceName: 'Norwegian',
    title: 'Flight DY1234 Oslo-London Cancelled Due to Technical Issue',
    url: 'https://www.norwegian.com/en/news/flight-cancelled',
    content: 'Flight DY1234 from Oslo to London has been cancelled due to a technical issue with the aircraft. Passengers are being rebooked on alternative flights.',
    publishedAt: new Date(),
    fetchedAt: new Date()
  }
];

// Travel keywords for filtering
const travelKeywords = [
  'flight', 'cancelled', 'delay', 'disruption', 'strike',
  'closure', 'closed', 'open', 'reopen', 'suspended',
  'restriction', 'restrictions', 'ban', 'banned', 'prohibited',
  'visa', 'passport', 'entry', 'border', 'customs',
  'advisory', 'warning', 'alert', 'notice',
  'route', 'service', 'schedule', 'timetable',
  'airport', 'airline', 'terminal', 'gate',
  'ferry', 'rail', 'train', 'bus', 'transport',
  'weather', 'storm', 'hurricane', 'earthquake', 'flood',
  'maintenance', 'construction', 'repair', 'airspace',
];

const rejectKeywords = [
  'lifestyle', 'fashion', 'foodie', 'wellness', 'spa',
  'review', 'opinion', 'editorial', 'column',
  'luxury', 'premium', 'exclusive', 'vip',
  'promotion', 'sale', 'discount', 'deal',
  'competition', 'contest', 'giveaway',
];

const genericInspiration = [
  'top 10', 'best places', 'hidden gems', 'must visit',
  'bucket list', 'travel inspiration', 'wanderlust',
  'travel guide', 'travel tips', 'plan your trip',
];

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

async function runFullPipelineTest() {
  console.log('🚀 GTI NEWS PIPELINE - FULL TEST (SIMULATED)');
  console.log('=============================================\n');
  
  const stats = {
    fetched: 0,
    filtered: 0,
    classified: 0,
    generated: 0,
    published: 0,
    queued: 0,
    errors: 0
  };
  
  // STEP 1: FETCH (Simulated)
  console.log('STEP 1: FETCH SOURCES (Simulated)');
  console.log('----------------------------------');
  console.log(`Simulated items: ${simulatedItems.length}\n`);
  
  simulatedItems.forEach((item, i) => {
    console.log(`  ${i+1}. ${item.title.substring(0, 50)}...`);
  });
  
  stats.fetched = simulatedItems.length;
  
  // STEP 2: FILTER
  console.log('\n\nSTEP 2: RELEVANCE FILTER');
  console.log('-------------------------');
  
  const relevant = [];
  const filtered = [];
  
  for (const item of simulatedItems) {
    const result = filterItem(item);
    if (result.isRelevant) {
      relevant.push(item);
      console.log(`✅ PASS: "${item.title.substring(0, 40)}..."`);
    } else {
      filtered.push({ item, reason: result.reason });
      console.log(`❌ FAIL: "${item.title.substring(0, 40)}..." - ${result.reason}`);
    }
  }
  
  stats.filtered = filtered.length;
  
  console.log(`\n📊 Filter Results:`);
  console.log(`   Relevant: ${relevant.length}`);
  console.log(`   Filtered: ${filtered.length}`);
  
  // STEP 3: CLASSIFY & GENERATE
  console.log('\n\nSTEP 3: CLASSIFY & GENERATE');
  console.log('----------------------------');
  
  const generated = [];
  
  for (const item of relevant) {
    try {
      const classification = classify(item);
      const article = generateArticle(item, classification);
      generated.push({ item, classification, article });
      stats.classified++;
      stats.generated++;
      
      console.log(`\n📝 Generated: "${article.title.substring(0, 50)}..."`);
      console.log(`   Category: ${classification.category}`);
      console.log(`   Severity: ${classification.severity}`);
      console.log(`   Location: ${classification.location || 'N/A'}`);
    } catch (e) {
      console.error(`   ❌ Error: ${e.message}`);
      stats.errors++;
    }
  }
  
  // STEP 4: VALIDATE
  console.log('\n\nSTEP 4: VALIDATE');
  console.log('-----------------');
  
  for (const g of generated) {
    const validation = validate(g.article, g.item.sourceId);
    console.log(`\n✓ "${g.article.title.substring(0, 40)}..."`);
    console.log(`   Score: ${validation.score} | Publish: ${validation.shouldPublish ? 'YES' : 'NO'}`);
    
    if (validation.shouldPublish) {
      stats.published++;
    } else {
      stats.queued++;
      console.log(`   Reason: ${validation.reasons.join(', ')}`);
    }
  }
  
  // STEP 5: SHOW SAMPLE ARTICLES
  console.log('\n\n========================================');
  console.log('STEP 5: SAMPLE GENERATED ARTICLES');
  console.log('========================================');
  
  for (let i = 0; i < Math.min(3, generated.length); i++) {
    const g = generated[i];
    console.log(`\n--- Article ${i + 1} ---`);
    console.log(`Title: ${g.article.title}`);
    console.log(`Category: ${g.article.category}`);
    console.log(`Severity: ${g.article.severity}`);
    console.log(`Location: ${g.article.location || 'N/A'}`);
    console.log(`\nTL;DR: ${g.article.tldr}`);
    console.log(`\nWhat Changed: ${g.article.whatChanged}`);
    console.log(`\nWho Is Affected: ${g.article.whoIsAffected}`);
    console.log(`\nWhat To Do: ${g.article.whatToDo}`);
    console.log(`\nSource: ${g.article.sources}`);
    console.log('');
  }
  
  // QUALITY CHECK
  console.log('========================================');
  console.log('STEP 6: QUALITY VALIDATION');
  console.log('========================================');
  
  for (let i = 0; i < Math.min(3, generated.length); i++) {
    const g = generated[i];
    console.log(`\n--- Article ${i + 1} Quality Check ---`);
    
    // Title quality
    const titleOk = g.article.title.length > 10 && g.article.title.length < 100;
    console.log(`Title quality: ${titleOk ? '✅' : '❌'} (${g.article.title.length} chars)`);
    
    // Category correctness
    const categoryOk = ['airline', 'airport', 'rail', 'ferry', 'government', 'industry'].includes(g.article.category);
    console.log(`Category: ${categoryOk ? '✅' : '❌'} (${g.article.category})`);
    
    // Severity
    const severityOk = ['critical', 'high', 'medium', 'low'].includes(g.article.severity);
    console.log(`Severity: ${severityOk ? '✅' : '❌'} (${g.article.severity})`);
    
    // Location
    const locationOk = g.article.location !== null;
    console.log(`Location: ${locationOk ? '✅' : '⚠️'} (${g.article.location || 'Not detected'})`);
    
    // Action advice
    const actionOk = g.article.whatToDo.includes('1.');
    console.log(`Actionable advice: ${actionOk ? '✅' : '❌'}`);
    
    // Source link
    const sourceOk = g.article.sources.startsWith('http');
    console.log(`Source link: ${sourceOk ? '✅' : '❌'}`);
    
    // Overall
    const allOk = titleOk && categoryOk && severityOk && actionOk && sourceOk;
    console.log(`Overall: ${allOk ? '✅ PASS' : '❌ FAIL'}`);
  }
  
  // FINAL STATS
  console.log('\n\n========================================');
  console.log('📊 FINAL PIPELINE STATS');
  console.log('========================================');
  console.log(`Fetched:     ${stats.fetched}`);
  console.log(`Filtered:    ${stats.filtered}`);
  console.log(`Classified:  ${stats.classified}`);
  console.log(`Generated:   ${stats.generated}`);
  console.log(`Published:   ${stats.published}`);
  console.log(`Queued:      ${stats.queued}`);
  console.log(`Errors:      ${stats.errors}`);
  
  // DB Status
  console.log('\n📊 DATABASE STATUS');
  const queueCount = await pool.query('SELECT COUNT(*) FROM ingestion_queue');
  const draftsCount = await pool.query('SELECT COUNT(*) FROM article_drafts');
  const articlesCount = await pool.query('SELECT COUNT(*) FROM articles');
  
  console.log(`Queue items: ${queueCount.rows[0].count}`);
  console.log(`Drafts: ${draftsCount.rows[0].count}`);
  console.log(`Articles: ${articlesCount.rows[0].count}`);
  
  console.log('\n========================================');
  console.log('✅ TEST COMPLETE');
  console.log('========================================');
  
  await pool.end();
}

function filterItem(item) {
  const title = item.title.toLowerCase();
  const content = (item.content || '').toLowerCase();
  const combined = `${title} ${content}`;
  
  // Check 1: Has travel impact keywords
  const hasTravelImpact = travelKeywords.some(kw => combined.includes(kw.toLowerCase()));
  if (!hasTravelImpact) {
    return { isRelevant: false, reason: 'No travel impact keywords' };
  }
  
  // Check 2: Not generic inspiration
  const isGeneric = genericInspiration.some(phrase => title.includes(phrase.toLowerCase()));
  if (isGeneric) {
    return { isRelevant: false, reason: 'Generic travel inspiration' };
  }
  
  // Check 3: Not rejected content type
  const isRejected = rejectKeywords.some(kw => combined.includes(kw.toLowerCase()));
  if (isRejected) {
    return { isRelevant: false, reason: 'Non-actionable content type' };
  }
  
  return { isRelevant: true };
}

function classify(item) {
  const text = `${item.title} ${item.content || ''}`.toLowerCase();
  
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
  
  // Location extraction
  const locationPatterns = [
    /\b(Heathrow|Gatwick|Stansted|Luton|CDG|Charles de Gaulle|Frankfurt|Amsterdam|Schiphol|Barcelona|Rome|Milan|Venice|Paris|London|Madrid|Berlin|Munich|Brussels|Zurich|Vienna|Prague|Warsaw|Oslo|Stockholm|Copenhagen|Helsinki)\b/i,
    /\b(Norway|Sweden|Denmark|Germany|France|Spain|Italy|UK|Britain|Netherlands|Belgium|Switzerland|Austria|Poland|Portugal|Greece|Turkey|USA|US|Thailand|Japan|Australia|Europe|Northern Europe)\b/i,
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
  const title = item.title.trim();
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60)
    .replace(/-+$/, '');
  
  const location = classification.location || 'affected areas';
  const severity = classification.severity;
  
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
  
  const whatChanged = `Travel services have been ${classification.status}. This is a ${severity} level update affecting ${location}.`;
  
  let whoIsAffected = '';
  if (classification.category === 'airline') {
    whoIsAffected = `Passengers with flights to, from, or through ${location}`;
  } else if (classification.category === 'airport') {
    whoIsAffected = `All travelers using ${location} airport`;
  } else if (classification.category === 'industry') {
    whoIsAffected = `Airlines and travelers in ${location} airspace`;
  } else if (classification.category === 'government') {
    whoIsAffected = `All travelers entering ${location}`;
  } else {
    whoIsAffected = `Travelers planning to visit ${location}`;
  }
  
  let whatToDo = '';
  if (severity === 'critical') {
    whatToDo = '1. Contact your airline/operator immediately. 2. Check alternative routes. 3. Consider travel insurance claims. 4. Monitor official sources for updates.';
  } else if (severity === 'high') {
    whatToDo = '1. Verify your booking status. 2. Check for rebooking options. 3. Allow extra time at the airport/station. 4. Sign up for alerts from your carrier.';
  } else {
    whatToDo = '1. Review your itinerary. 2. Check if your specific route is affected. 3. Have backup plans ready. 4. Monitor for further updates.';
  }
  
  return {
    title,
    slug,
    tldr,
    whatChanged,
    whoIsAffected,
    whatToDo,
    sources: item.url,
    category: classification.category,
    location: classification.location,
    status: classification.status,
    severity: classification.severity,
    lastUpdated: new Date()
  };
}

function validate(article, sourceId) {
  // Source trust scores
  const trustScores = {
    'eurocontrol': 0.95,
    'sas-alerts': 0.95,
    'uk-gov-travel': 1.0,
    'lufthansa-news': 0.9,
    'norwegian-alerts': 0.95
  };
  
  const sourceTrust = trustScores[sourceId] || 0.5;
  
  // Calculate scores
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

runFullPipelineTest().catch(e => {
  console.error('Error:', e);
  pool.end();
});
