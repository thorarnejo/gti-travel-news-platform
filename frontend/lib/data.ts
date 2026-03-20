import type { Article } from '@/types'

// Sample data - 5+ articles for the feed
export const sampleArticles: Article[] = [
  {
    id: '1',
    slug: 'london-heathrow-flight-cancellations-storm',
    title: 'London Heathrow Travel Disruptions March 2024: Storm Horus Impact on Flights',
    summary: 'London Heathrow Airport has cancelled over 120 flights as Storm Horus brings heavy winds and rain to southern England. Airlines advise passengers to check their flight status before heading to the airport.',
    category: 'flights',
    location: { country: 'United Kingdom', city: 'London', countryCode: 'GB' },
    severity: 'high',
    status: 'disruption',
    articleStatus: 'active',
    publishedAt: '2026-03-19T14:30:00Z',
    updatedAt: '2026-03-19T22:15:00Z',
    tl_dr: [
      'Storm Horus has caused 120+ flight cancellations at London Heathrow — expect delays of 2-4 hours on remaining flights, affecting both domestic and international routes.',
      'British Airways, Virgin Atlantic, and American Airlines are most affected, with combined cancellations exceeding 127 flights as of 10pm GMT.',
      'Rebooking fees waived for affected passengers — contact your airline directly for alternative routing through Gatwick, Stansted, or Luton.',
    ],
    whatThisMeans: 'If you\'re flying to or from London Heathrow today or tomorrow, expect significant delays or cancellations. Wind gusts up to 70mph have forced runway closures. Consider rerouting through other London airports or travelling tomorrow if your trip isn\'t urgent.',
    whatChanged: 'British Airways, Virgin Atlantic, and American Airlines have cancelled a combined 127 flights. Wind gusts up to 70mph have forced runway closures. Air traffic control imposing flow restrictions across UK airspace.',
    whoIsAffected: 'Passengers travelling to/from London Heathrow (LHR) on March 19-20. Particularly affected: transatlantic routes, European connections, and domestic UK flights. Rail alternatives may be available.',
    whatToDo: 'Check your airline app for real-time status before leaving home. Arrive 3+ hours early. Consider rebooking to alternative London airports (Gatwick, Stansted). Keep your booking reference ready. Join standby lists early if rebooking.',
    sources: [
      { name: 'Heathrow Airport Official', url: 'https://www.heathrow.com', isOfficial: true, lastUpdated: '2026-03-19T22:00:00Z', type: 'official' },
      { name: 'NATs Air Traffic Control', url: 'https://www.nats.aero', isOfficial: true, lastUpdated: '2026-03-19T21:30:00Z', type: 'official' },
      { name: 'Met Office Weather Warnings', url: 'https://www.metoffice.gov.uk', isOfficial: true, lastUpdated: '2026-03-19T20:00:00Z', type: 'official' },
      { name: 'BBC Travel News', url: 'https://bbc.com/travel', lastUpdated: '2026-03-19T21:00:00Z', type: 'news' },
    ],
    impactRegions: ['London', 'Southeast England', 'East England'],
  },
  {
    id: '2',
    slug: 'japan-visa-entry-requirements-update',
    title: 'Japan Travel Requirements April 2024: eVISA Mandate for Tourists from 68 Countries',
    summary: 'Japan announces new documentation requirements for tourists from 68 countries effective April 1. Electronic travel authorization will be mandatory before departure.',
    category: 'visa',
    location: { country: 'Japan', countryCode: 'JP' },
    severity: 'medium',
    status: 'update',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-19T09:00:00Z',
    updatedAt: '2026-03-19T18:30:00Z',
    tl_dr: [
      'Japan\'s eVISA system becomes mandatory for tourists from visa-exempt countries starting April 1, 2024 — apply at least 2 weeks before travel.',
      'The eVISA approval takes 5-7 business days to process — without it, you won\'t be able to board your flight to Japan.',
      'Citizens of USA, UK, Canada, Australia, France, Germany, and Singapore are among the 68 countries affected by this new requirement.',
    ],
    whatThisMeans: 'If you\'re planning a trip to Japan from a visa-exempt country, you now need to apply for eVISA approval before you fly. This adds 1-2 weeks to your planning timeline. Start your application immediately if travelling after April 1 to ensure approval before departure.',
    whatChanged: 'The eVISA platform replaces the current stamp-on-arrival system. Tourists must submit passport details, travel itinerary, and accommodation bookings online before departure. Approval required before boarding flights.',
    whoIsAffected: 'Citizens of 68 countries previously eligible for visa-free entry to Japan. Major markets affected: USA, UK, Canada, Australia, France, Germany, Singapore. Business travellers may qualify for different visa categories.',
    whatToDo: 'Register at https://evisa.mofa.go.jp at least 2 weeks before travel. Print your eVISA approval document and keep it accessible. Ensure passport validity 6+ months beyond your travel dates. Double-check your approved dates match your flight.',
    sources: [
      { name: 'Ministry of Foreign Affairs Japan', url: 'https://www.mofa.go.jp', isOfficial: true, lastUpdated: '2026-03-19T09:00:00Z', type: 'official' },
      { name: 'Japan eVISA Portal', url: 'https://evisa.mofa.go.jp', isOfficial: true, lastUpdated: '2026-03-19T18:00:00Z', type: 'official' },
      { name: 'Japan Times News', url: 'https://japantimes.co.jp', lastUpdated: '2026-03-19T12:00:00Z', type: 'news' },
    ],
    impactRegions: ['Tokyo', 'Osaka', 'Kyoto', 'All Japan'],
  },
  {
    id: '3',
    slug: 'dubai-hotels-spring-break-price-surge',
    title: 'Dubai Hotel Prices March-April 2024: 45% Spring Break Surge and Alternatives',
    summary: 'Dubai hotel rates hit record highs as spring break demand collides with limited supply during Ramadan. Travellers advised to book early or consider alternatives.',
    category: 'hotels',
    location: { country: 'United Arab Emirates', city: 'Dubai', countryCode: 'AE' },
    severity: 'low',
    status: 'price-change',
    articleStatus: 'active',
    publishedAt: '2026-03-18T16:00:00Z',
    updatedAt: '2026-03-19T10:00:00Z',
    tl_dr: [
      'Dubai hotel prices are up 45% compared to last year — mid-range hotels now average $250/night, with 5-star properties averaging $450/night.',
      'Ramadan has reduced hotel supply as some properties close for renovations, compounding the spring break demand surge.',
      'Abu Dhabi hotels are 30% cheaper on average and only 90 minutes away — consider staying there and day-tripping to Dubai.',
    ],
    whatThisMeans: 'Visiting Dubai during spring break (March 15 - April 15) will cost significantly more than usual. Budget-minded travellers should either book immediately to lock in current rates, or consider Abu Dhabi as a base. Apartment hotels and vacation rentals may offer better value than traditional hotels.',
    whatChanged: 'Average daily rates for 4-star hotels jumped from $172 to $249. 5-star properties now average $450/night. Shorter booking windows are driving dynamic pricing. Ramadan reduced supply further as some properties use the low season for renovations.',
    whoIsAffected: 'Spring break travellers (March 15 - April 15) to Dubai. Budget-conscious families most impacted. Business travellers may find better corporate rates through their companies. Digital nomads with long-term bookings may face renewal sticker shock.',
    whatToDo: 'Book immediately if not done — rates will likely increase further. Consider Abu Dhabi as a base (90min drive to Dubai). Use points/miles for free nights. Look at apartment hotels and vacation rentals for better value. Mid-week travel is cheaper than weekends.',
    sources: [
      { name: 'STR Hotel Data', url: 'https://str.com', lastUpdated: '2026-03-19T08:00:00Z', type: 'news' },
      { name: 'Booking.com Trends', url: 'https://news.booking.com', lastUpdated: '2026-03-18T16:00:00Z', type: 'news' },
      { name: 'UAE Tourism Board', url: 'https://visitabudhabi.ae', isOfficial: true, lastUpdated: '2026-03-19T10:00:00Z', type: 'official' },
    ],
    impactRegions: ['Dubai', 'Abu Dhabi'],
  },
  {
    id: '4',
    slug: 'thailand-safety-advisory-southern-regions',
    title: 'Thailand Travel Advisory 2024: US State Dept Warning for Southern Provinces',
    summary: 'The US State Department has elevated travel advisory for southern Thailand provinces due to ongoing security concerns near the Malaysian border.',
    category: 'safety',
    location: { country: 'Thailand', countryCode: 'TH' },
    severity: 'high',
    status: 'warning',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-17T12:00:00Z',
    updatedAt: '2026-03-19T08:00:00Z',
    tl_dr: [
      'US Embassy recommends reconsidering travel to Songkhla, Narathiwat, Yala, and Pattani provinces — advisory upgraded to Level 3 (Reconsider Travel).',
      'Bangkok, Chiang Mai, Phuket, Koh Samui, and most tourist islands remain safe with no change to current travel advice.',
      'Some Malaysia-Thailand border crossings are temporarily closed — if crossing by land, check status beforehand and allow extra time.',
    ],
    whatThisMeans: 'If you\'re heading to southern Thailand near the Malaysian border, you should reassess whether your trip is necessary. The security situation has deteriorated, and the US government has limited ability to assist travellers in these areas. Popular tourist destinations elsewhere in Thailand are unaffected.',
    whatChanged: 'Advisory upgraded from Level 2 (Exercise Caution) to Level 3 (Reconsider Travel) for 4 southern provinces. Increased military presence reported. Some border crossings to Malaysia temporarily closed. Travel insurance premiums for the region are likely to increase.',
    whoIsAffected: 'Travellers planning visits to southern Thailand provinces, especially those near the Malaysian border. Package tours may be rerouted. Dive operators in the southern region may see cancellations. Adventure tourists heading to border areas most at risk.',
    whatToDo: 'Avoid southern border provinces unless travel is essential. Bangkok, central Thailand, and popular islands (Phuket, Koh Samui, Phi Phi) remain safe. Register with US Embassy STEP program for safety updates. Maintain situational awareness if visiting other southern areas. Check travel insurance coverage carefully.',
    sources: [
      { name: 'US State Department Travel Advisory', url: 'https://travel.state.gov', isOfficial: true, lastUpdated: '2026-03-19T08:00:00Z', type: 'official' },
      { name: 'UK FCDO Travel Advice', url: 'https://gov.uk/foreign-travel-advice/thailand', isOfficial: true, lastUpdated: '2026-03-19T08:00:00Z', type: 'official' },
      { name: 'Bangkok Post', url: 'https://bangkokpost.com', lastUpdated: '2026-03-19T06:00:00Z', type: 'news' },
    ],
    impactRegions: ['Songkhla', 'Narathiwat', 'Yala', 'Pattani', 'Southern Thailand Border'],
  },
  {
    id: '5',
    slug: 'paris-olympics-2024-airbnb-regulations',
    title: 'Paris Travel July-August 2024: Airbnb Caps and Hotel Alternatives During Olympics',
    summary: 'Paris authorities have introduced emergency short-term rental regulations limiting Airbnb listings to 120 days/year in central areas ahead of the 2024 Olympics.',
    category: 'hotels',
    location: { country: 'France', city: 'Paris', countryCode: 'FR' },
    severity: 'medium',
    status: 'update',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-16T14:00:00Z',
    updatedAt: '2026-03-18T16:00:00Z',
    tl_dr: [
      'Paris has capped Airbnb rentals at 120 days/year in central districts — many hosts exceed this and may have to cancel bookings or face €10,000 fines.',
      'Hotels in outer arrondissements are booking up fast — Paris hotel demand expected to increase 15% during Olympics with limited supply.',
      'Book accommodations well ahead of July-August 2024 Olympics and verify your host has proper registration to avoid last-minute cancellations.',
    ],
    whatThisMeans: 'If you\'re relying on Airbnb for your Paris Olympics trip, verify your host is registered and won\'t exceed the 120-night limit. Hotels in central Paris will be expensive and scarce — consider staying in outer arrondissements or nearby cities like Versailles or Saint-Denis for better availability.',
    whatChanged: 'New regulations require registration numbers on all listings. Properties without registration face immediate removal. Primary residences limited to 120 nights; secondary homes to 90 nights annually. Some hosts have already cancelled bookings exceeding the limit.',
    whoIsAffected: 'Travellers relying on Airbnb in central Paris (1st-4th, 9th-12th arrondissements). Long-term rental market may see relief as properties return. Hotel demand expected to increase 15%. Budget travellers most impacted.',
    whatToDo: 'Book accommodations immediately if not done. Verify your Airbnb has proper registration number displayed. Consider hotels in outer arrondissements (13th-20th) for better availability. Look at Versailles or Disneyland Paris area for more options. Use hotel points if available.',
    sources: [
      { name: 'Ville de Paris', url: 'https://www.paris.fr', isOfficial: true, lastUpdated: '2026-03-18T16:00:00Z', type: 'official' },
      { name: 'Airbnb Newsroom', url: 'https://news.airbnb.com', lastUpdated: '2026-03-17T10:00:00Z', type: 'news' },
      { name: 'France24', url: 'https://france24.com', lastUpdated: '2026-03-16T14:00:00Z', type: 'news' },
    ],
    impactRegions: ['Paris', 'Île-de-France', 'Versailles'],
  },
  {
    id: '6',
    slug: 'tokyo-cherry-blossom-season-tourism-surge',
    title: 'Tokyo Sakura Season 2024: Cherry Blossom Record Tourism and Best Viewing Tips',
    summary: 'Tokyo welcomes record 12 million visitors during sakura season. Popular spots implement crowd management measures as cherry blossoms peak earliest on record.',
    category: 'destinations',
    location: { country: 'Japan', city: 'Tokyo', countryCode: 'JP' },
    severity: 'low',
    status: 'new',
    articleStatus: 'active',
    publishedAt: '2026-03-19T06:00:00Z',
    updatedAt: '2026-03-19T06:00:00Z',
    tl_dr: [
      'Tokyo cherry blossoms peaked on March 19 — earliest on record — with full bloom expected through April 10 in most areas.',
      'Record 12 million visitors expected during sakura season — Ueno Park, Meguro River, and Shinjuku Gyoen are extremely crowded.',
      'Book hotels 3+ weeks ahead for April visits — flight prices at premium and availability extremely limited.',
    ],
    whatThisMeans: 'Tokyo\'s cherry blossom season is in full swing, but visitor numbers are overwhelming popular spots. If you\'re visiting Tokyo in late March or early April, plan to visit parks early morning (6-8am) for the best experience. Consider lesser-known spots like Koishikawa Korakuen for a more peaceful hanami.',
    whatChanged: 'Japan Meteorological Corporation reports cherry blossoms peaked on March 19 in Tokyo (earliest on record). Yasukuni Shrine, Ueno Park, and Meguro River seeing 3x normal crowds. Extended hanami celebrations with food vendors and events throughout the city.',
    whoIsAffected: 'Travellers to Tokyo March 19 - April 10. Photography enthusiasts, cultural tourists, families most impacted. Hotel availability extremely limited. Flight prices at premium for weekend travel. Local residents avoiding peak spots.',
    whatToDo: 'Book accommodations immediately for April visits. Visit parks early morning (6-8am) for fewer crowds. Try Shinjuku Gyoen or Koishikawa Korakuen for managed spaces. Reserve restaurants near popular spots weeks in advance. Respect hanami etiquette — noreserved picnics in many parks.',
    sources: [
      { name: 'Japan Meteorological Corporation', url: 'https://sakura.weathermap.jp', isOfficial: true, lastUpdated: '2026-03-19T06:00:00Z', type: 'official' },
      { name: 'Japan National Tourism Organization', url: 'https://jnto.org', isOfficial: true, lastUpdated: '2026-03-19T06:00:00Z', type: 'official' },
      { name: 'Tokyo Shimbun', url: 'https://tokyosimbun.com', lastUpdated: '2026-03-19T06:00:00Z', type: 'news' },
    ],
    impactRegions: ['Tokyo', 'Yokohama', 'Kamakura', 'Greater Tokyo Area'],
  },
]

// Full article page data - the first article with complete details
export const fullArticleData: Article = sampleArticles[0]

export function getArticles(filters?: {
  category?: string
  location?: string
  severity?: string
  status?: string
  sortBy?: string
}): Article[] {
  let articles = [...sampleArticles]

  if (filters?.category) {
    articles = articles.filter(a => a.category === filters.category)
  }
  if (filters?.location) {
    articles = articles.filter(a => 
      a.location.country.toLowerCase().includes(filters.location!.toLowerCase()) ||
      a.location.city?.toLowerCase().includes(filters.location!.toLowerCase())
    )
  }
  if (filters?.severity) {
    articles = articles.filter(a => a.severity === filters.severity)
  }
  if (filters?.status) {
    articles = articles.filter(a => a.status === filters.status)
  }

  if (filters?.sortBy === 'severity') {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    articles.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
  } else {
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  return articles
}

export function getArticleBySlug(slug: string): Article | undefined {
  return sampleArticles.find(a => a.slug === slug)
}

export function getCategories(): string[] {
  return ['flights', 'hotels', 'destinations', 'visa', 'safety', 'weather']
}

export function getLocations(): string[] {
  const locations = new Set<string>()
  sampleArticles.forEach(a => {
    locations.add(a.location.country)
    if (a.location.city) locations.add(a.location.city)
  })
  return Array.from(locations)
}
