// Mock data for testing without database
export const mockCategories = [
  { id: 1, slug: 'transport', name: 'Transport', icon: 'plane', description: 'Flight delays, cancellations, strikes', sort_order: 1, parent_id: null },
  { id: 2, slug: 'entry-rules', name: 'Entry Rules', icon: 'passport', description: 'Visa changes, entry requirements', sort_order: 2, parent_id: null },
  { id: 3, slug: 'safety', name: 'Safety', icon: 'shield', description: 'Security alerts, travel advisories', sort_order: 3, parent_id: null },
  { id: 4, slug: 'attractions', name: 'Attractions', icon: 'landmark', description: 'Closures, booking changes', sort_order: 4, parent_id: null },
  { id: 5, slug: 'pricing', name: 'Pricing', icon: 'tag', description: 'Fare changes, new fees', sort_order: 5, parent_id: null },
  { id: 6, slug: 'disruptions', name: 'Disruptions', icon: 'alert', description: 'Strikes, weather, outages', sort_order: 6, parent_id: null },
]

import type { Location } from '@/types'

export const mockLocations: Location[] = [
  { id: 1, slug: 'united-kingdom', name: 'United Kingdom', location_type: 'country', country_id: null, city_id: null },
  { id: 2, slug: 'japan', name: 'Japan', location_type: 'country', country_id: null, city_id: null },
  { id: 3, slug: 'united-arab-emirates', name: 'United Arab Emirates', location_type: 'country', country_id: null, city_id: null },
  { id: 4, slug: 'thailand', name: 'Thailand', location_type: 'country', country_id: null, city_id: null },
  { id: 5, slug: 'france', name: 'France', location_type: 'country', country_id: null, city_id: null },
  { id: 6, slug: 'london', name: 'London', location_type: 'city', country_id: 1, city_id: 6 },
  { id: 7, slug: 'dubai', name: 'Dubai', location_type: 'city', country_id: 3, city_id: 7 },
  { id: 8, slug: 'paris', name: 'Paris', location_type: 'city', country_id: 5, city_id: 8 },
  { id: 9, slug: 'tokyo', name: 'Tokyo', location_type: 'city', country_id: 2, city_id: 9 },
]

export const mockArticles = [
  {
    id: 1,
    slug: 'heathrow-ground-staff-strike-march-2026',
    headline: 'Heathrow Ground Staff Strike March 15–17',
    summary: 'British Airways ground handlers announce 48-hour strike affecting 300+ flights',
    tldr: ['300+ flights cancelled', 'March 15–17, 06:00–22:00 GMT', 'British Airways most affected', 'Rebooking available'],
    what_to_do: 'Check your flight status on ba.com and rebook to alternate dates free of charge.',
    status: 'disruption',
    severity: 'critical',
    image_url: null,
    category: mockCategories[0],
    locations: [mockLocations[0], mockLocations[5]],
    what_changed: 'British Airways ground handling staff at Heathrow Terminal 5 have announced a 48-hour strike from March 15–17, 2026. The strike will affect all BA flights from Terminal 5.',
    who_is_affected: 'All passengers with British Airways flights departing from or arriving at Heathrow Terminal 5 between March 15 06:00 GMT and March 17 22:00 GMT.',
    sources: [
      { name: 'British Airways', url: 'https://www.britishairways.com', published_at: '2026-03-14T10:00:00Z' },
      { name: 'BBC News', url: 'https://www.bbc.com', published_at: '2026-03-14T09:30:00Z' },
    ],
    published_at: '2026-03-14T12:00:00Z',
    updated_at: '2026-03-14T12:00:00Z',
  },
  {
    id: 2,
    slug: 'japan-new-digital-nomad-visa-june-2026',
    headline: 'Japan Launches Digital Nomad Visa June 2026',
    summary: 'New 6-month visa for remote workers earning $50K+ annually',
    tldr: ['6-month visa duration', '$50K minimum income required', 'Applications open June 1', 'No local employment allowed'],
    status: 'new',
    severity: 'medium',
    image_url: null,
    category: mockCategories[1],
    locations: [mockLocations[1]],
    what_changed: 'Japan will introduce a new Digital Nomad Visa starting June 1, 2026. The visa allows remote workers to stay in Japan for up to 6 months while employed by companies outside Japan.',
    who_is_affected: 'Remote workers earning at least $50,000 USD annually who work for companies registered outside Japan. Applicants must have private health insurance.',
    what_to_do: '1. Gather proof of income (tax returns, employment contracts)\n2. Obtain private health insurance covering Japan\n3. Apply online at the Japan Immigration Bureau website\n4. Visa processing takes 2–4 weeks',
    sources: [
      { name: 'Japan Immigration Bureau', url: 'https://www.moj.go.jp', published_at: '2026-03-10T00:00:00Z' },
    ],
    published_at: '2026-03-10T08:00:00Z',
    updated_at: '2026-03-10T08:00:00Z',
  },
  {
    id: 3,
    slug: 'dubai-tourist-tax-increase-2026',
    headline: 'Dubai Increases Hotel Tourist Tax to 15%',
    summary: 'Municipal tourist tax on accommodation rises from 10% to 15% effective April 1',
    tldr: ['Tax increases from 10% to 15%', 'Effective April 1, 2026', 'Applies to all hotels and short-term rentals', 'Expected $20–50/night increase'],
    status: 'price_change',
    severity: 'high',
    image_url: null,
    category: mockCategories[4],
    locations: [mockLocations[2], mockLocations[6]],
    what_changed: 'The Dubai Tourism and Commerce Marketing (DTCM) has announced an increase in the municipal tourist tax on accommodation from 10% to 15%, effective April 1, 2026.',
    who_is_affected: 'All travelers staying in Dubai hotels, resorts, or short-term rental properties. The tax applies to the room rate before VAT and other fees.',
    what_to_do: '1. Book hotel stays before April 1 to lock current rates\n2. Budget an additional $20–50 per night for luxury hotels\n3. Consider staying in neighboring Emirates with lower taxes',
    sources: [
      { name: 'DTCM', url: 'https://www.visitdubai.com', published_at: '2026-03-12T00:00:00Z' },
    ],
    published_at: '2026-03-12T10:00:00Z',
    updated_at: '2026-03-12T10:00:00Z',
  },
  {
    id: 4,
    slug: 'thailand-rainy-season-health-advisory',
    headline: 'Thailand Issues Health Advisory for Rainy Season',
    summary: 'Dengue fever cases up 40% in Bangkok; travelers advised to take precautions',
    tldr: ['Dengue cases up 40%', 'Bangkok and southern provinces affected', 'Mosquito repellent essential', 'Seek medical attention if fever develops'],
    status: 'warning',
    severity: 'medium',
    image_url: null,
    category: mockCategories[2],
    locations: [mockLocations[3]],
    what_changed: 'The Thailand Ministry of Public Health has issued a health advisory due to a 40% increase in dengue fever cases in Bangkok and southern provinces. The advisory is in effect through October 2026.',
    who_is_affected: 'All travelers visiting Bangkok and southern Thailand provinces, particularly during the rainy season (May–October).',
    what_to_do: '1. Use DEET-based mosquito repellent\n2. Wear long sleeves and pants in evening hours\n3. Stay in air-conditioned accommodations when possible\n4. Seek immediate medical attention if fever, headache, or rash develops',
    sources: [
      { name: 'Thailand Ministry of Public Health', url: 'https://www.moph.go.th', published_at: '2026-03-15T00:00:00Z' },
    ],
    published_at: '2026-03-15T06:00:00Z',
    updated_at: '2026-03-15T06:00:00Z',
  },
  {
    id: 5,
    slug: 'paris-airbnb-registration-required',
    headline: 'Paris Requires Airbnb Host Registration by May 2026',
    summary: 'New law mandates all short-term rental hosts register with city; 120-day cap enforced',
    tldr: ['Registration mandatory by May 1', '120-day annual rental cap', 'Unregistered listings removed', 'Fines up to €50,000'],
    status: 'new',
    severity: 'high',
    image_url: null,
    category: mockCategories[3],
    locations: [mockLocations[4], mockLocations[7]],
    what_changed: 'Paris authorities have announced that all short-term rental hosts (Airbnb, Vrbo, etc.) must register with the city by May 1, 2026. Unregistered listings will be removed from platforms.',
    who_is_affected: 'Travelers booking Airbnb or other short-term rentals in Paris. Existing bookings after May 1 may be cancelled if the host is not registered.',
    what_to_do: '1. Verify your host is registered (ask for registration number)\n2. Book hotels as backup\n3. Expect reduced availability and higher prices\n4. Check cancellation policies carefully',
    sources: [
      { name: 'Paris City Hall', url: 'https://www.paris.fr', published_at: '2026-03-08T00:00:00Z' },
    ],
    published_at: '2026-03-08T14:00:00Z',
    updated_at: '2026-03-08T14:00:00Z',
  },
  {
    id: 6,
    slug: 'tokyo-cherry-blossom-forecast-2026',
    headline: 'Tokyo Cherry Blossom Forecast: March 28 Peak',
    summary: 'Japan Meteorological Agency forecasts early bloom; hanami crowds expected',
    tldr: ['Peak bloom: March 28', 'Earliest bloom in 10 years', 'Major parks crowded', 'Book restaurants in advance'],
    status: 'update',
    severity: 'low',
    image_url: null,
    category: mockCategories[3],
    locations: [mockLocations[1], mockLocations[8]],
    what_changed: 'The Japan Meteorological Agency has updated the 2026 cherry blossom forecast. Tokyo is now expected to reach peak bloom on March 28, five days earlier than the average.',
    who_is_affected: 'Travelers planning cherry blossom (hanami) visits to Tokyo and surrounding areas between March 25 and April 5.',
    what_to_do: '1. Book accommodation immediately (availability is low)\n2. Reserve restaurants near Ueno Park and Shinjuku Gyoen\n3. Visit early morning (before 8 AM) to avoid crowds\n4. Consider day trips to less crowded areas like Kawagoe',
    sources: [
      { name: 'Japan Meteorological Agency', url: 'https://www.jma.go.jp', published_at: '2026-03-18T00:00:00Z' },
    ],
    published_at: '2026-03-18T09:00:00Z',
    updated_at: '2026-03-18T09:00:00Z',
  },
]

// Mock service functions
export function getMockArticles(filters: any = {}) {
  let articles = [...mockArticles]
  
  if (filters.category) {
    articles = articles.filter(a => a.category.slug === filters.category)
  }
  
  if (filters.location) {
    articles = articles.filter(a => 
      a.locations.some(l => l.slug === filters.location)
    )
  }
  
  if (filters.severity) {
    articles = articles.filter(a => a.severity === filters.severity)
  }
  
  if (filters.status) {
    articles = articles.filter(a => a.status === filters.status)
  }
  
  // Sort
  if (filters.sort === 'severity') {
    const severityOrder = { critical: 1, high: 2, medium: 3, low: 4 }
    articles.sort((a, b) => severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder])
  } else {
    // Default: published_at desc
    articles.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
  }
  
  const page = filters.page || 1
  const limit = filters.limit || 20
  const start = (page - 1) * limit
  const end = start + limit
  
  return {
    articles: articles.slice(start, end),
    meta: {
      page,
      limit,
      total: articles.length,
      total_pages: Math.ceil(articles.length / limit),
    }
  };
}

export function getMockArticleBySlug(slug: string) {
  return mockArticles.find(a => a.slug === slug) || null
}

export function getMockCategories() {
  return mockCategories
}

export function getMockLocations() {
  return mockLocations
}
