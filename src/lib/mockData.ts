// Mock data for testing without database

import type { Article, ArticleListItem, Category, Location, Source, Severity, Status, ArticleFilters, ArticlesResponse } from '@/types'

export const mockCategories: Category[] = [
  { id: 1, slug: 'transport', name: 'Transport', icon: '✈️', description: 'Flight delays, cancellations, strikes', parent_id: null },
  { id: 2, slug: 'entry-rules', name: 'Entry Rules', icon: '🛂', description: 'Visa changes, entry requirements', parent_id: null },
  { id: 3, slug: 'safety', name: 'Safety', icon: '🛡️', description: 'Security alerts, travel advisories', parent_id: null },
  { id: 4, slug: 'attractions', name: 'Attractions', icon: '🏛️', description: 'Closures, booking changes', parent_id: null },
  { id: 5, slug: 'pricing', name: 'Pricing', icon: '🏷️', description: 'Fare changes, new fees', parent_id: null },
  { id: 6, slug: 'disruptions', name: 'Disruptions', icon: '⚠️', description: 'Strikes, weather, outages', parent_id: null },
  { id: 7, slug: 'weather', name: 'Weather', icon: '🌤️', description: 'Storms, typhoons, seasonal conditions', parent_id: null },
  { id: 8, slug: 'health', name: 'Health', icon: '🏥', description: 'Medical advisories, vaccination requirements', parent_id: null },
]

export const mockLocations: Location[] = [
  { id: 1, slug: 'united-kingdom', name: 'United Kingdom', location_type: 'country', country_id: null, city_id: null },
  { id: 2, slug: 'japan', name: 'Japan', location_type: 'country', country_id: null, city_id: null },
  { id: 3, slug: 'united-arab-emirates', name: 'United Arab Emirates', location_type: 'country', country_id: null, city_id: null },
  { id: 4, slug: 'thailand', name: 'Thailand', location_type: 'country', country_id: null, city_id: null },
  { id: 5, slug: 'france', name: 'France', location_type: 'country', country_id: null, city_id: null },
  { id: 6, slug: 'germany', name: 'Germany', location_type: 'country', country_id: null, city_id: null },
  { id: 7, slug: 'spain', name: 'Spain', location_type: 'country', country_id: null, city_id: null },
  { id: 8, slug: 'italy', name: 'Italy', location_type: 'country', country_id: null, city_id: null },
  { id: 9, slug: 'usa', name: 'United States', location_type: 'country', country_id: null, city_id: null },
  { id: 10, slug: 'australia', name: 'Australia', location_type: 'country', country_id: null, city_id: null },
  { id: 11, slug: 'london', name: 'London', location_type: 'city', country_id: 1, city_id: 11 },
  { id: 12, slug: 'dubai', name: 'Dubai', location_type: 'city', country_id: 3, city_id: 12 },
  { id: 13, slug: 'paris', name: 'Paris', location_type: 'city', country_id: 5, city_id: 13 },
  { id: 14, slug: 'tokyo', name: 'Tokyo', location_type: 'city', country_id: 2, city_id: 14 },
  { id: 15, slug: 'frankfurt', name: 'Frankfurt', location_type: 'city', country_id: 6, city_id: 15 },
  { id: 16, slug: 'barcelona', name: 'Barcelona', location_type: 'city', country_id: 7, city_id: 16 },
  { id: 17, slug: 'new-york', name: 'New York', location_type: 'city', country_id: 9, city_id: 17 },
  { id: 18, slug: 'bangkok', name: 'Bangkok', location_type: 'city', country_id: 4, city_id: 18 },
]

// 10 realistic travel news articles
export const mockArticles: Article[] = [
  {
    id: 1,
    slug: 'heathrow-ground-staff-strike-march-2026',
    headline: 'Heathrow Ground Staff Strike: 340 Flights Cancelled March 15–17',
    summary: 'British Airways and Virgin Atlantic ground handling staff at Heathrow Terminal 5 have announced a 48-hour strike, cancelling over 340 flights and affecting approximately 60,000 passengers.',
    body: 'The strike stems from a pay dispute between Unite the Union and British Airways management over a 7% pay increase demand. The walkout affects check-in, baggage handling, and aircraft turnaround operations.',
    tldr: [
      '340+ flights cancelled across British Airways and Virgin Atlantic',
      'Strike runs March 15, 06:00 GMT – March 17, 22:00 GMT',
      'Terminal 5 operations severely impacted',
      'Rebooking and refunds available through airline websites',
      'Alternative transport via Eurostar or regional airports recommended',
    ],
    what_changed: 'British Airways and Virgin Atlantic ground handling staff at Heathrow Terminal 5 have announced a 48-hour strike from March 15–17, 2026. The walkout affects check-in, baggage handling, and aircraft turnaround operations. Approximately 340 flights have been cancelled, with another 120 facing significant delays.',
    who_is_affected: 'All passengers with British Airways or Virgin Atlantic flights departing from or arriving at Heathrow Airport between March 15 06:00 GMT and March 17 22:00 GMT. This includes connecting passengers and those travelling to/from London from international destinations.',
    what_to_do: 'Check your flight status on ba.com or virginatlantic.com before leaving for the airport\nRebook to alternate dates free of charge if your flight is cancelled\nConsider Eurostar services to Paris or Brussels as alternatives\nKeep your booking reference ready when contacting call centres\nArrive at the airport only after confirming your flight status',
    status: 'disruption',
    severity: 'critical',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[0],
    locations: [mockLocations[0], mockLocations[10]],
    sources: [
      { id: 1, slug: 'british-airways', name: 'British Airways', website_url: 'https://www.britishairways.com', logo_url: null },
      { id: 2, slug: 'bbc-news', name: 'BBC News', website_url: 'https://www.bbc.com/news', logo_url: null },
      { id: 3, slug: 'heathrow', name: 'Heathrow Airport', website_url: 'https://www.heathrow.com', logo_url: null },
    ],
    published_at: '2026-03-14T12:00:00Z',
    created_at: '2026-03-14T12:00:00Z',
    updated_at: '2026-03-14T15:30:00Z',
  },
  {
    id: 2,
    slug: 'japan-digital-nomad-visa-launch-june-2026',
    headline: 'Japan Launches Digital Nomad Visa: 6-Month Stay for Remote Workers',
    summary: 'Japan will begin accepting applications for its new Digital Nomad Visa on June 1, 2026, allowing remote workers earning $50,000+ annually to stay up to six months.',
    body: 'Japan announces digital nomad visa program as part of effort to attract international talent.',
    tldr: [
      '6-month visa duration with possibility of extension',
      'Minimum annual income of $50,000 USD required',
      'Applications open June 1, 2026',
      'Private health insurance covering Japan mandatory',
      'No employment within Japan permitted',
    ],
    what_changed: 'Japan will introduce a new Digital Nomad Visa starting June 1, 2026. The visa allows remote workers employed by companies outside Japan to live and work in the country for up to 6 months. This is part of Japan\'s effort to attract international talent and boost tourism spending.',
    who_is_affected: 'Remote workers earning at least $50,000 USD annually who work for companies registered outside Japan. Applicants must have private health insurance covering medical expenses in Japan. Citizens of 49 designated countries are eligible at launch.',
    what_to_do: 'Gather proof of annual income (tax returns, employment contracts, or bank statements)\nObtain private health insurance valid in Japan with minimum coverage of ¥10 million\nApply online at the Japan Immigration Bureau website\nAllow 2–4 weeks for visa processing\nRegister with the local city hall within 14 days of arrival',
    status: 'new',
    severity: 'medium',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[1],
    locations: [mockLocations[1], mockLocations[13]],
    sources: [
      { id: 4, slug: 'japan-immigration', name: 'Japan Immigration Bureau', website_url: 'https://www.immimoj.go.jp', logo_url: null },
      { id: 5, slug: 'jnto', name: 'Japan National Tourism Organization', website_url: 'https://www.jnto.or.jp', logo_url: null },
    ],
    published_at: '2026-03-10T08:00:00Z',
    created_at: '2026-03-10T08:00:00Z',
    updated_at: '2026-03-10T08:00:00Z',
  },
  {
    id: 3,
    slug: 'dubai-tourist-tax-increase-april-2026',
    headline: 'Dubai Increases Hotel Tourist Tax to 15%: What Travellers Need to Know',
    summary: 'Dubai\'s municipal tourist tax on hotel accommodation rises from 10% to 15% on April 1, 2026, adding $20–60 per night to typical hotel stays.',
    body: 'Dubai tourism tax increase announced by DTCM.',
    tldr: [
      'Tax increases from 10% to 15% effective April 1, 2026',
      'Applies to all hotels, resorts, and short-term rentals (Airbnb, VRBO)',
      'Average additional cost of $30–50 per night for luxury hotels',
      'Pre-April bookings grandfathered at current rates',
      'Consider neighboring Emirates for lower taxes',
    ],
    what_changed: 'The Dubai Tourism and Commerce Marketing (DTCM) has announced an increase in the municipal tourist tax on accommodation from 10% to 15%, effective April 1, 2026. This applies to all commercial accommodation including hotels, serviced apartments, and holiday homes. The tax is added to the room rate before VAT.',
    who_is_affected: 'All travellers staying in Dubai hotels, resorts, or short-term rental properties from April 1, 2026 onwards. Business travellers and tourists on package holidays will see increased costs. Bookings made before the announcement with pre-payment may be exempt.',
    what_to_do: 'Book hotel stays before April 1 to lock current 10% tax rates\nBudget an additional $30–50 per night for 5-star hotels\nConsider staying in Abu Dhabi, Ras Al Khaimah, or Sharjah with lower taxes\nUse price comparison sites that show total cost including all taxes\nCheck if your booking platform will honour pre-April prices',
    status: 'price_change',
    severity: 'high',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[4],
    locations: [mockLocations[2], mockLocations[11]],
    sources: [
      { id: 6, slug: 'dtcm', name: 'Dubai DTCM', website_url: 'https://www.visitdubai.com', logo_url: null },
      { id: 7, slug: 'khaleej-times', name: 'Khaleej Times', website_url: 'https://www.khaleejtimes.com', logo_url: null },
    ],
    published_at: '2026-03-12T10:00:00Z',
    created_at: '2026-03-12T10:00:00Z',
    updated_at: '2026-03-12T14:00:00Z',
  },
  {
    id: 4,
    slug: 'thailand-dengue-fever-advisory-2026',
    headline: 'Thailand Issues Dengue Fever Alert: Cases Up 40% in Bangkok and South',
    summary: 'The Thailand Ministry of Public Health reports a 40% increase in dengue fever cases, with Bangkok and southern provinces most affected. Travellers advised to take mosquito precautions.',
    body: 'Thailand health advisory issued by Ministry of Public Health.',
    tldr: [
      'Dengue cases up 40% year-over-year in Thailand',
      'Bangkok, Phuket, Krabi, and southern provinces at highest risk',
      'Mosquito repellent with DEET essential',
      'Symptoms include high fever, severe headache, joint pain',
      'Seek immediate medical attention if fever develops',
    ],
    what_changed: 'The Thailand Ministry of Public Health has issued a health advisory due to a 40% increase in dengue fever cases across the country. Bangkok and the southern provinces of Phuket, Krabi, Surat Thani, and Songkhla have seen the highest concentrations. The advisory is in effect through October 2026, the end of rainy season.',
    who_is_affected: 'All travellers visiting Thailand, particularly Bangkok and southern provinces during the rainy season (May–October). Adventure travellers, those staying in non-air-conditioned accommodation, and visitors spending time near mosquitoes are at higher risk.',
    what_to_do: 'Use DEET-based mosquito repellent (minimum 30% concentration) on exposed skin\nWear long sleeves and pants, especially during dawn and dusk\nStay in air-conditioned or screened accommodations when possible\nRemove standing water near your accommodation\nSeek immediate medical attention if fever, headache, or rash develops\nConsider travel insurance that covers medical evacuation',
    status: 'warning',
    severity: 'medium',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[7],
    locations: [mockLocations[3], mockLocations[17]],
    sources: [
      { id: 8, slug: 'thailand-moph', name: 'Thailand Ministry of Public Health', website_url: 'https://www.moph.go.th', logo_url: null },
      { id: 9, slug: 'cdc', name: 'CDC Travel Health', website_url: 'https://wwwnc.cdc.gov/travel', logo_url: null },
    ],
    published_at: '2026-03-15T06:00:00Z',
    created_at: '2026-03-15T06:00:00Z',
    updated_at: '2026-03-15T06:00:00Z',
  },
  {
    id: 5,
    slug: 'paris-airbnb-registration-deadline-may-2026',
    headline: 'Paris Airbnb Registration Deadline: Unregistered Listings Face Removal',
    summary: 'Paris authorities require all short-term rental hosts to register with the city by May 1, 2026. Unregistered listings will be removed from platforms and hosts face fines up to €50,000.',
    body: 'Paris short-term rental regulation enforcement begins.',
    tldr: [
      'Registration mandatory for all short-term rentals by May 1, 2026',
      'Annual rental cap of 120 nights enforced',
      'Unregistered listings to be removed from Airbnb, VRBO, Booking.com',
      'Fines up to €50,000 for non-compliant hosts',
      'Existing bookings after May 1 may be cancelled',
    ],
    what_changed: 'Paris authorities have announced that all short-term rental hosts (Airbnb, VRBO, Booking.com) must register with the city by May 1, 2026. The registration system will verify that the property is the host\'s primary residence and enforce the 120-night annual cap. Unregistered listings will be removed from all platforms.',
    who_is_affected: 'Travellers booking Airbnb or other short-term rentals in Paris for stays after May 1, 2026. Existing bookings at unregistered properties may be cancelled. The regulation affects approximately 50,000 listings in Paris.',
    what_to_do: 'Verify your host has a valid registration number before booking\nBook hotels as a backup, especially for critical travel dates\nCheck cancellation policies carefully before booking\nLook for the registration number in the listing or ask the host directly\nConsider hotels which are exempt from this regulation',
    status: 'new',
    severity: 'high',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[3],
    locations: [mockLocations[4], mockLocations[12]],
    sources: [
      { id: 10, slug: 'paris-city-hall', name: 'Paris City Hall', website_url: 'https://www.paris.fr', logo_url: null },
      { id: 11, slug: 'le-monde', name: 'Le Monde', website_url: 'https://www.lemonde.fr', logo_url: null },
    ],
    published_at: '2026-03-08T14:00:00Z',
    created_at: '2026-03-08T14:00:00Z',
    updated_at: '2026-03-08T14:00:00Z',
  },
  {
    id: 6,
    slug: 'tokyo-cherry-blossom-forecast-2026-march-28',
    headline: 'Tokyo Cherry Blossom Peak: March 28 — Earliest in a Decade',
    summary: 'The Japan Meteorological Agency forecasts Tokyo\'s cherry blossom peak on March 28, 2026 — five days earlier than average and the earliest in 10 years. Hanami crowds expected.',
    body: 'Tokyo cherry blossom forecast updated by Japan Meteorological Agency.',
    tldr: [
      'Peak bloom predicted for March 28, 2026',
      'Earliest cherry blossom season in Tokyo since 2016',
      'Best viewing spots: Ueno Park, Shinjuku Gyoen, Meguro River',
      'Book accommodation and restaurants immediately',
      'Visit before 8 AM to avoid peak crowds',
    ],
    what_changed: 'The Japan Meteorological Agency has updated the 2026 cherry blossom (sakura) forecast for Tokyo. Peak bloom is now expected on March 28, five days earlier than the historical average of April 2. This is the earliest bloom since 2016, due to warmer winter and spring temperatures.',
    who_is_affected: 'Travellers planning cherry blossom (hanami) visits to Tokyo and surrounding areas between March 22 and April 5, 2026. Domestic and international tourism to Tokyo during this period is expected to surge.',
    what_to_do: 'Book accommodation immediately as availability is extremely limited\nReserve restaurant tables near major parks weeks in advance\nVisit Ueno Park, Shinjuku Gyoen, or Meguro River before 8 AM\nConsider day trips to less crowded areas like Kawagoe or Kamakura\nBring a picnic blanket and arrive early to secure a spot',
    status: 'update',
    severity: 'low',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[3],
    locations: [mockLocations[1], mockLocations[13]],
    sources: [
      { id: 12, slug: 'jma', name: 'Japan Meteorological Agency', website_url: 'https://www.jma.go.jp', logo_url: null },
      { id: 13, slug: 'jnto-sakura', name: 'JNTO Sakura Guide', website_url: 'https://www.jnto.or.jp/sakura', logo_url: null },
    ],
    published_at: '2026-03-18T09:00:00Z',
    created_at: '2026-03-18T09:00:00Z',
    updated_at: '2026-03-18T09:00:00Z',
  },
  {
    id: 7,
    slug: 'europe-wide-pilot-strike-march-2026',
    headline: 'Europe-Wide Pilot Strike: 1,200 Flights Cancelled Across 6 Countries',
    summary: 'A coordinated 72-hour pilot strike by Cockpit (Germany), SNPL (France), and Sepla (Spain) has forced the cancellation of 1,200 flights affecting Paris CDG, Frankfurt, and Madrid hubs.',
    body: 'Europe pilot strike coordinated across multiple countries.',
    tldr: [
      '1,200+ flights cancelled across Air France, Lufthansa, Iberia, and subsidiaries',
      'Strike runs March 20–22, 2026, 00:01–23:59 local time each day',
      'Paris CDG, Frankfurt, Munich, Madrid, Barcelona worst affected',
      'Re-booking on alternative dates free of charge',
      'EU261 compensation may apply for cancelled flights',
    ],
    what_changed: 'A unprecedented coordinated pilot strike has been announced across six European countries. Pilots unions in Germany (Cockpit), France (SNPL), Spain (Sepla), Italy (ANPAC), Netherlands (VNV), and Belgium (BeaC) will strike for 72 hours from March 20–22, 2026. The strike affects all flights operated by Lufthansa, Air France, Iberia, and their subsidiaries.',
    who_is_affected: 'All passengers booked on Lufthansa, Air France, Iberia, KLM, Brussels Airlines, and their subsidiaries between March 20–22, 2026. This includes connecting flights where these airlines operate. Approximately 180,000 passengers are expected to be affected.',
    what_to_do: 'Check your flight status on the airline\'s website before leaving\nRebook to alternate dates — most airlines offering free changes\nConsider alternative carriers such as Emirates, Turkish Airlines, or budget carriers\nArrive at the airport prepared for long queues even for unaffected flights\nDocument all expenses for potential EU261 compensation claims',
    status: 'disruption',
    severity: 'critical',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[5],
    locations: [mockLocations[4], mockLocations[5], mockLocations[6]],
    sources: [
      { id: 14, slug: 'lufthansa', name: 'Lufthansa', website_url: 'https://www.lufthansa.com', logo_url: null },
      { id: 15, slug: 'air-france', name: 'Air France', website_url: 'https://www.airfrance.com', logo_url: null },
      { id: 16, slug: 'eurocontrol', name: 'Eurocontrol', website_url: 'https://www.eurocontrol.int', logo_url: null },
    ],
    published_at: '2026-03-17T08:00:00Z',
    created_at: '2026-03-17T08:00:00Z',
    updated_at: '2026-03-17T16:00:00Z',
  },
  {
    id: 8,
    slug: 'usa-esta-application-changes-2026',
    headline: 'USA Requires New ESTA Information: Social Media Handles Now Mandatory',
    summary: 'Starting May 2026, all ESTA applicants must provide social media handles and additional personal information as part of the visa waiver program security updates.',
    body: 'USA ESTA changes announced by DHS.',
    tldr: [
      'Social media handles now required for all ESTA applications',
      'Changes effective May 1, 2026 for all new applications',
      'Platforms include Twitter/X, Instagram, Facebook, TikTok, etc.',
      'Existing ESTAs remain valid until expiration',
      'Processing time extended to 72 hours as of May 2026',
    ],
    what_changed: 'The U.S. Department of Homeland Security has announced updates to the Electronic System for Travel Authorization (ESTA) for the Visa Waiver Program. Starting May 1, 2026, all applicants must provide social media account names/handles from the past five years. The change is part of enhanced vetting procedures for international visitors.',
    who_is_affected: 'All travellers from Visa Waiver Program (VWP) countries applying for ESTA from May 1, 2026 onwards. This includes citizens of 40 countries including the UK, France, Germany, Australia, Japan, and South Korea. Existing valid ESTAs are not affected until renewal.',
    what_to_do: 'Prepare a list of all social media handles used in the past 5 years\nApply for ESTA at least 72 hours before travel (extended processing)\nEnsure your passport is valid for at least 6 months beyond travel\nDouble-check all information before submitting — errors cause delays\nConsider applying for a B1/B2 visitor visa if ESTA is refused',
    status: 'new',
    severity: 'medium',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[1],
    locations: [mockLocations[8], mockLocations[16]],
    sources: [
      { id: 17, slug: 'dhs', name: 'U.S. Department of Homeland Security', website_url: 'https://www.dhs.gov', logo_url: null },
      { id: 18, slug: 'cbp', name: 'U.S. Customs and Border Protection', website_url: 'https://www.cbp.gov', logo_url: null },
    ],
    published_at: '2026-03-16T12:00:00Z',
    created_at: '2026-03-16T12:00:00Z',
    updated_at: '2026-03-16T12:00:00Z',
  },
  {
    id: 9,
    slug: 'barcelona-overtourism-measures-2026',
    headline: 'Barcelona Limits Tourist Apartments: New Rules for Holiday Rentals',
    summary: 'Barcelona will not renew 10,000 tourist apartment licenses expiring in 2026, restricting holiday rentals to designated tourist zones and imposing strict noise and capacity rules.',
    body: 'Barcelona overtourism measures approved by city council.',
    tldr: [
      '10,000 tourist apartment licenses will not be renewed in 2026',
      'Only licensed apartments in designated tourist zones permitted',
      'Maximum 6 guests per apartment (down from 10)',
      'Quiet hours 10 PM – 8 AM strictly enforced',
      'Fines of €10,000–€40,000 for rule violations',
    ],
    what_changed: 'Barcelona City Council has approved sweeping measures to combat overtourism. The city will allow approximately 10,000 tourist apartment licenses to expire without renewal in 2026. Remaining licensed apartments must be in designated tourist zones, comply with strict capacity limits (max 6 guests), and observe quiet hours. New license applications are suspended indefinitely.',
    who_is_affected: 'Travellers who booked Barcelona apartments through Airbnb, VRBO, or Booking.com for stays in 2026 and beyond. Many existing listings will become illegal. The city expects 30-40% fewer tourist apartments available compared to 2025.',
    what_to_do: 'Verify your apartment has a valid license (licence number must be displayed)\nBook only on platforms that verify license compliance\nConsider hotels as alternative — they are not affected by these rules\nLook for apartments in designated tourist zones like Barri Gòtic or Eixample\nCheck cancellation policies carefully before booking',
    status: 'update',
    severity: 'high',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[3],
    locations: [mockLocations[6], mockLocations[15]],
    sources: [
      { id: 19, slug: 'barcelona-ajuntament', name: 'Barcelona City Council', website_url: 'https://ajuntament.barcelona.cat', logo_url: null },
      { id: 20, slug: 'el-pais', name: 'El País', website_url: 'https://elpais.com', logo_url: null },
    ],
    published_at: '2026-03-13T11:00:00Z',
    created_at: '2026-03-13T11:00:00Z',
    updated_at: '2026-03-13T11:00:00Z',
  },
  {
    id: 10,
    slug: 'australia-working-holiday-visa-changes-2026',
    headline: 'Australia Expands Working Holiday Visa: More Countries Added, New Rules',
    summary: 'Australia has added 5 new countries to its Working Holiday Maker program and raised the maximum stay for visa holders, effective July 1, 2026.',
    body: 'Australia WHV changes announced by Department of Home Affairs.',
    tldr: [
      '5 new countries added to Working Holiday Visa program',
      'Maximum stay extended from 2 years to 3 years',
      'Work restriction放宽 for second-year visa holders',
      'Applications open July 1, 2026',
      'Age limit remains 35 for most countries',
    ],
    what_changed: 'Australia has announced major changes to its Working Holiday Maker (subclass 417 and 462) visa program. Five new countries will be added to the program, and visa holders will be able to stay up to three years instead of two. Second-year visa holders will have more flexibility in work requirements. These changes take effect July 1, 2026.',
    who_is_affected: 'Young travellers aged 18–35 from eligible countries planning to work and holiday in Australia. The changes particularly benefit those seeking longer-term stays and more work flexibility. Citizens of existing program countries can also apply under new rules from July 1.',
    what_to_do: 'Check if your country is newly eligible for the Working Holiday Visa\nGather required documents: passport, proof of funds (AUD $5,000+), health insurance\nApply through the Australian Department of Home Affairs website\nPlan your work and travel itinerary in advance\nConsider regional Australia for additional visa extensions',
    status: 'new',
    severity: 'medium',
    image_url: null,
    original_url: null,
    is_published: true,
    category: mockCategories[1],
    locations: [mockLocations[9]],
    sources: [
      { id: 21, slug: 'home-affairs', name: 'Australian Dept of Home Affairs', website_url: 'https://www.homeaffairs.gov.au', logo_url: null },
      { id: 22, slug: 'abc-news', name: 'ABC News Australia', website_url: 'https://abc.net.au/news', logo_url: null },
    ],
    published_at: '2026-03-11T09:00:00Z',
    created_at: '2026-03-11T09:00:00Z',
    updated_at: '2026-03-11T09:00:00Z',
  },
]

// Mock service functions
export function getMockArticles(filters: ArticleFilters = {}): ArticlesResponse {
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
    const severityOrder: Record<Severity, number> = { critical: 1, high: 2, medium: 3, low: 4 }
    articles.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
  } else {
    articles.sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
  }
  
  const page = filters.page || 1
  const limit = filters.limit || 20
  const start = (page - 1) * limit
  const end = start + limit
  
  return {
    articles: articles.slice(start, end) as ArticleListItem[],
    meta: {
      page,
      limit,
      total: articles.length,
      total_pages: Math.ceil(articles.length / limit),
    }
  }
}

export function getMockArticleBySlug(slug: string): Article | null {
  return mockArticles.find(a => a.slug === slug) || null
}

export function getMockCategories(): Category[] {
  return mockCategories
}

export function getMockLocations(): Location[] {
  return mockLocations
}
