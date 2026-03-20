import type { Article } from '@/types'

// Sample data - 5+ articles for the feed
export const sampleArticles: Article[] = [
  {
    id: '1',
    slug: 'london-heathrow-flight-cancellations-storm',
    title: 'London Heathrow Cancels 120+ Flights Amid Storm Horus',
    summary: 'Heathrow Airport has cancelled over 120 flights as Storm Horus brings heavy winds and rain to southern England. Airlines advise passengers to check their flight status before heading to the airport.',
    category: 'flights',
    location: { country: 'United Kingdom', city: 'London', countryCode: 'GB' },
    severity: 'high',
    status: 'disruption',
    publishedAt: '2026-03-19T14:30:00Z',
    updatedAt: '2026-03-19T22:15:00Z',
    tl_dr: 'Storm Horus has caused significant disruption at London Heathrow with 120+ flight cancellations. Expect delays of 2-4 hours on remaining flights. Rebooking waived for affected passengers.',
    whatChanged: 'British Airways, Virgin Atlantic, and American Airlines have cancelled a combined 127 flights. Wind gusts up to 70mph have forced runway closures. Air traffic control imposing flow restrictions.',
    whoIsAffected: 'Passengers travelling to/from London Heathrow (LHR) on March 19-20. Particularly affected: transatlantic routes, European connections, and domestic UK flights.',
    whatToDo: 'Check your airline app for real-time status. Arrive 3+ hours early. Consider rebooking to alternative London airports (Gatwick, Stansted). Keep your booking reference ready.',
    sources: [
      { name: 'Heathrow Airport Official', url: 'https://www.heathrow.com' },
      { name: 'NATs Air Traffic', url: 'https://www.nats.aero' },
      { name: 'Met Office Weather Warnings', url: 'https://www.metoffice.gov.uk' },
    ],
    impactRegions: ['London', 'Southeast England', 'East England'],
  },
  {
    id: '2',
    slug: 'japan-visa-entry-requirements-update',
    title: 'Japan Tightens Visa Requirements for Short-Term Tourists',
    summary: 'Japan announces new documentation requirements for tourists from 68 countries effective April 1. Electronic travel authorization will be mandatory.',
    category: 'visa',
    location: { country: 'Japan', countryCode: 'JP' },
    severity: 'medium',
    status: 'update',
    publishedAt: '2026-03-19T09:00:00Z',
    updatedAt: '2026-03-19T18:30:00Z',
    tl_dr: 'Japan\'s eVISA system becomes mandatory for tourists from visa-exempt countries starting April 1. Apply at least 2 weeks before travel. Processing takes 5-7 business days.',
    whatChanged: 'The eVISA platform replaces the current stamp-on-arrival system. Tourists must submit passport details, travel itinerary, and accommodation bookings online before departure. Approval required before boarding flights.',
    whoIsAffected: 'Citizens of 68 countries previously eligible for visa-free entry to Japan. Major markets affected: USA, UK, Canada, Australia, France, Germany, Singapore.',
    whatToDo: 'Register at https://evisa.mofa.go.jp at least 2 weeks before travel. Print your eVISA approval document. Ensure passport validity 6+ months beyond travel dates.',
    sources: [
      { name: 'Ministry of Foreign Affairs Japan', url: 'https://www.mofa.go.jp' },
      { name: 'Japan eVISA Portal', url: 'https://evisa.mofa.go.jp' },
    ],
    impactRegions: ['Tokyo', 'Osaka', 'Kyoto', 'All Japan'],
  },
  {
    id: '3',
    slug: 'dubai-hotels-spring-break-price-surge',
    title: 'Dubai Hotel Prices Surge 45% for Spring Break Peak',
    summary: 'Dubai hotel rates hit record highs as spring break demand collides with limited supply. Travellers advised to book early or consider alternatives.',
    category: 'hotels',
    location: { country: 'United Arab Emirates', city: 'Dubai', countryCode: 'AE' },
    severity: 'low',
    status: 'price-change',
    publishedAt: '2026-03-18T16:00:00Z',
    updatedAt: '2026-03-19T10:00:00Z',
    tl_dr: 'Dubai hotel prices up 45% compared to last year. Mid-range hotels now average $250/night. Book 3+ weeks ahead or consider Abu Dhabi (30% cheaper).',
    whatChanged: 'Average daily rates for 4-star hotels jumped from $172 to $249. 5-star properties now average $450/night. Shorter booking windows driving dynamic pricing. Ramadan reduced supply further.',
    whoIsAffected: 'Spring break travellers (March 15 - April 15) to Dubai. Budget-conscious families most impacted. Business travellers may find better corporate rates.',
    whatToDo: 'Book immediately if not done. Consider Abu Dhabi as base (90min drive). Use points/miles for free nights. Look at apartment hotels for better value.',
    sources: [
      { name: 'STR Hotel Data', url: 'https://str.com' },
      { name: 'Booking.com Trends', url: 'https://news.booking.com' },
    ],
    impactRegions: ['Dubai', 'Abu Dhabi'],
  },
  {
    id: '4',
    slug: 'thailand-safety-advisory-southern-regions',
    title: 'US State Dept Issues New Travel Advisory for Southern Thailand',
    summary: 'The US State Department has elevated travel advisory for southern Thailand provinces due to ongoing security concerns near the Malaysian border.',
    category: 'safety',
    location: { country: 'Thailand', countryCode: 'TH' },
    severity: 'high',
    status: 'warning',
    publishedAt: '2026-03-17T12:00:00Z',
    updatedAt: '2026-03-19T08:00:00Z',
    tl_dr: 'US Embassy recommends reconsidering travel to Songkhla, Narathiwat, Yala, and Pattani provinces. Bangkok, Chiang Mai, islands unaffected. Exercise caution if visiting other southern areas.',
    whatChanged: 'Advisory upgraded from Level 2 (Exercise Caution) to Level 3 (Reconsider Travel) for 4 southern provinces. Increased military presence reported. Some border crossings to Malaysia temporarily closed.',
    whoIsAffected: 'Travellers planning visits to southern Thailand provinces, especially those near the Malaysian border. Package tours may be rerouted. Travel insurance premiums likely to increase.',
    whatToDo: 'Avoid southern border provinces unless essential. Bangkok, central Thailand, and popular islands (Phuket, Koh Samui) remain safe. Register with US Embassy STEP program. Maintain situational awareness.',
    sources: [
      { name: 'US State Department Travel Advisory', url: 'https://travel.state.gov' },
      { name: 'UK FCDO Travel Advice', url: 'https://gov.uk/foreign-travel-advice/thailand' },
    ],
    impactRegions: ['Songkhla', 'Narathiwat', 'Yala', 'Pattani'],
  },
  {
    id: '5',
    slug: 'paris-olympics-2024-airbnb-price-regulation',
    title: 'Paris Implements Emergency Airbnb Regulations Ahead of Olympics',
    summary: 'Paris authorities have introduced emergency short-term rental regulations limiting Airbnb listings to 120 days/year in central areas.',
    category: 'hotels',
    location: { country: 'France', city: 'Paris', countryCode: 'FR' },
    severity: 'medium',
    status: 'update',
    publishedAt: '2026-03-16T14:00:00Z',
    updatedAt: '2026-03-18T16:00:00Z',
    tl_dr: 'Paris has capped Airbnb rentals at 120 days/year in central districts. Hosts must register and display number prominently. Fines up to €10,000 for violations.',
    whatChanged: 'New regulations require registration numbers on all listings. Properties without registration face immediate removal. Primary residences limited to 120 nights; secondary homes to 90 nights annually.',
    whoIsAffected: 'Travellers relying on Airbnb in central Paris (1st-4th, 9th-12th arrondissements). Long-term rental market may see relief as properties return. Hotel demand expected to increase 15%.',
    whatToDo: 'Book accommodations well ahead of planned visits. Verify your Airbnb has proper registration. Consider hotels in outer arrondissements for better availability and rates.',
    sources: [
      { name: 'Ville de Paris', url: 'https://www.paris.fr' },
      { name: 'Airbnb Newsroom', url: 'https://news.airbnb.com' },
    ],
    impactRegions: ['Paris', 'Île-de-France'],
  },
  {
    id: '6',
    slug: 'tokyo-cherry-blossom-season-tourism-surge',
    title: 'Tokyo Cherry Blossom Season Breaks Tourism Records',
    summary: 'Tokyo welcomes record 12 million visitors during sakura season. Popular spots implement crowd management measures.',
    category: 'destinations',
    location: { country: 'Japan', city: 'Tokyo', countryCode: 'JP' },
    severity: 'low',
    status: 'new',
    publishedAt: '2026-03-19T06:00:00Z',
    updatedAt: '2026-03-19T06:00:00Z',
    tl_dr: 'Tokyo\'s cherry blossom season in full bloom. Record visitor numbers expected through April 10. Book popular spots (Ueno, Meguro) in advance. Consider lesser-known locations for better experience.',
    whatChanged: 'Japan Meteorological Corporation reports cherry blossoms peaked on March 19 in Tokyo (earliest on record). Yasukuni Shrine, Ueno Park, and Meguro River seeing 3x normal crowds. Extended hanami celebrations.',
    whoIsAffected: 'Travellers to Tokyo March 19 - April 10. Photography enthusiasts, cultural tourists, families. Hotel availability extremely limited. Flight prices at premium.',
    whatToDo: 'Book accommodations immediately for April visits. Visit parks early morning (6-8am) for fewer crowds. Try Shinjuku Gyoen or Koishikawa Korakuen for managed spaces. Respect hanami etiquette.',
    sources: [
      { name: 'Japan Meteorological Corporation', url: 'https://sakura.weathermap.jp' },
      { name: 'Tokyo Tourism', url: 'https://travel Tokyo.com' },
    ],
    impactRegions: ['Tokyo', 'Yokohama', 'Kamakura'],
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
