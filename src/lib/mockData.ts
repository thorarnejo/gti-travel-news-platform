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
    slug: 'heathrow-flight-cancellations-2026-ground-strike-travel-disruption',
    headline: 'Heathrow Flight Cancellations 2026: Ground Strike Delays 340 Flights — What Travelers Must Know',
    summary: 'British Airways and Virgin Atlantic ground handling staff at Heathrow Terminal 5 have announced a 48-hour strike, cancelling over 340 flights and affecting approximately 60,000 passengers.',
    body: 'The strike stems from a pay dispute between Unite the Union and British Airways management over a 7% pay increase demand. The walkout affects check-in, baggage handling, and aircraft turnaround operations.',
    tldr: [
      'Heathrow Airport: 340+ flights cancelled across British Airways and Virgin Atlantic terminals',
      'Strike runs March 15, 06:00 GMT – March 17, 22:00 GMT with full Terminal 5 closure',
      'Rebook to alternate dates or consider Eurostar to Paris/Brussels as alternatives',
      'Check flight status on ba.com or virginatlantic.com before leaving for the airport',
      'Arrive only after confirming your flight is operational — stranded passengers reported at terminals',
    ],
    what_changed: 'British Airways and Virgin Atlantic ground handling staff at Heathrow Terminal 5 have announced a 48-hour strike from March 15–17, 2026. The walkout affects check-in, baggage handling, and aircraft turnaround operations. Approximately 340 flights have been cancelled, with another 120 facing significant delays.\n\nFor travelers already in London or with upcoming bookings, the immediate impact is significant: baggage systems at Terminal 5 will be unmanned, meaning checked bags on affected flights will not be loaded. Passengers should not check bags if possible and should carry essential items in cabin baggage. Rebooking wait times at Heathrow have exceeded 3 hours as of March 14.\n\nIf your flight is cancelled, airlines are legally required to offer a full refund or rebooking on the next available service — but during a strike, next available could be 2–3 days out. Priority should be given to calling your airline before going to the airport, as counter queues are severely impacted.',
    who_is_affected: 'All passengers with British Airways or Virgin Atlantic flights departing from or arriving at Heathrow Airport between March 15 06:00 GMT and March 17 22:00 GMT. This includes connecting passengers and those travelling to/from London from international destinations.',
    what_to_do: 'Check your flight status on ba.com or virginatlantic.com before leaving for the airport — do not rely on third-party booking sites\nRebook to alternate dates free of charge if your flight is cancelled — most airlines are waving change fees for affected passengers\nConsider Eurostar services to Paris or Brussels as alternatives — cross-Channel routes are unaffected by this strike\nKeep your booking reference ready when contacting call centres — expect long wait times and consider online chat options\nArrive at the airport only after confirming your flight status — Heathrow has reported stranded passengers sleeping at terminals\nPack essential medications and documents in cabin baggage — checked bags may not be processed on cancelled flights',
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
    slug: 'japan-digital-nomad-visa-launch-2026-remote-worker-entry-rules',
    headline: 'Japan Digital Nomad Visa 2026: New Entry Rules Allow 6-Month Remote Work Stays',
    summary: 'Japan will begin accepting applications for its new Digital Nomad Visa on June 1, 2026, allowing remote workers earning $50,000+ annually to stay up to six months.',
    body: 'Japan announces digital nomad visa program as part of effort to attract international talent.',
    tldr: [
      'Japan: Digital Nomad Visa applications open June 1, 2026 with 6-month stay allowance',
      'Minimum annual income of $50,000 USD required — tax returns or employment contracts accepted',
      'Private health insurance with ¥10 million minimum coverage mandatory for approval',
      'Citizens of 49 countries eligible at launch including UK, USA, Germany, France, and Australia',
      'Register with local city hall within 14 days of arrival — penalties apply for non-compliance',
    ],
    what_changed: 'Japan will introduce a new Digital Nomad Visa starting June 1, 2026. The visa allows remote workers employed by companies outside Japan to live and work in the country for up to 6 months, with the possibility of extension. This is part of Japan\'s broader effort to attract international talent and boost tourism spending in regional areas beyond Tokyo.\n\nThe timing is significant: with Japan\'s aging population and labor shortages in service industries, the government is explicitly targeting remote workers who can contribute to local economies without competing for domestic jobs. Travelers should note this is strictly a remote work visa — freelancers accepting Japanese clients or Japanese companies are not eligible and would need standard work authorization.\n\nFor those planning to apply, the documentation requirements are substantial. Japanese immigration is notoriously strict about verification, and incomplete applications have been rejected at high rates in similar programs launched by neighboring countries.',
    who_is_affected: 'Remote workers earning at least $50,000 USD annually who work for companies registered outside Japan. Applicants must have private health insurance covering medical expenses in Japan. Citizens of 49 designated countries are eligible at launch.',
    what_to_do: 'Gather proof of annual income (tax returns, employment contracts, or bank statements) — translations into Japanese or English required\nObtain private health insurance valid in Japan with minimum coverage of ¥10 million — verify with your provider that Japan is explicitly covered\nApply online at the Japan Immigration Bureau website at least 4 weeks before planned travel — processing can take up to 6 weeks\nRegister with the local city hall within 14 days of arrival — this is a legal requirement, not optional\nKeep your visa status strictly separate from Japanese employment — any paid work from Japanese sources voids the visa',
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
    slug: 'dubai-hotel-tax-increase-2026-accommodation-pricing-change',
    headline: 'Dubai Hotel Tax Increase 2026: 15% Rate Hike Adds $30–50 Per Night for Travelers',
    summary: 'Dubai\'s municipal tourist tax on hotel accommodation rises from 10% to 15% on April 1, 2026, adding $20–60 per night to typical hotel stays.',
    body: 'Dubai tourism tax increase announced by DTCM.',
    tldr: [
      'Dubai: Hotel tourist tax jumps from 10% to 15% on April 1, 2026 — adding $30–50 per night',
      'All hotels, resorts, serviced apartments, and Airbnb-style rentals subject to new rate',
      'Book and prepay hotel stays before April 1 to lock in current 10% rates — most platforms honour pre-bookings',
      'Consider Abu Dhabi or Ras Al Khaimah as alternatives with lower or no tourist taxes',
      'Total Dubai trip budgets for a 5-night stay at a 5-star hotel will increase by approximately $150–250',
    ],
    what_changed: 'The Dubai Tourism and Commerce Marketing (DTCM) has announced an increase in the municipal tourist tax on accommodation from 10% to 15%, effective April 1, 2026. This applies to all commercial accommodation including hotels, serviced apartments, and holiday homes. The tax is added to the room rate before the standard 5% VAT, meaning the effective total tax burden rises from 15.5% to 20.75%.\n\nFor travelers who have already booked and prepaid for stays after April 1, the situation is more nuanced. Some booking platforms have announced they will honour pre-April prices, while others will pass the increase directly to guests. Travelers should check their booking confirmation emails and contact their hotel directly if the tax increase would be applied to an existing reservation.\n\nBudget-conscious travelers may want to explore alternatives: Abu Dhabi\'s tourist tax remains at 6%, and the recently developed Northern Emirates (Ras Al Khaimah, Fujairah) have no equivalent tax. Dubai\'s excellent metro and taxi network makes day trips from these areas entirely feasible.',
    who_is_affected: 'All travellers staying in Dubai hotels, resorts, or short-term rental properties from April 1, 2026 onwards. Business travellers and tourists on package holidays will see increased costs. Bookings made before the announcement with pre-payment may be exempt.',
    what_to_do: 'Book and prepay hotel stays before April 1 to lock current 10% tax rates — contact your hotel or platform to confirm they will honour the rate\nBudget an additional $30–50 per night for 5-star hotels and $15–25 for mid-range properties — factor this into your total trip cost\nConsider staying in Abu Dhabi, Ras Al Khaimah, or Sharjah — all offer lower accommodation taxes and are accessible by road\nUse price comparison sites that show total cost including all taxes — the advertised Dubai rate may look cheaper before tax\nCheck if your booking platform will honour pre-April prices — platforms like Booking.com and hotels.com have different policies',
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
    slug: 'thailand-dengue-fever-outbreak-2026-health-advisory',
    headline: 'Thailand Dengue Fever Outbreak 2026: Bangkok and Southern Regions Under Health Alert',
    summary: 'The Thailand Ministry of Public Health reports a 40% increase in dengue fever cases, with Bangkok and southern provinces most affected. Travellers advised to take mosquito precautions.',
    body: 'Thailand health advisory issued by Ministry of Public Health.',
    tldr: [
      'Thailand: Dengue cases up 40% year-over-year with Bangkok and southern provinces at highest risk',
      'Peak season runs through October 2026 — mosquito activity strongest during rainy months',
      'Use DEET mosquito repellent (30%+ concentration) on all exposed skin, reapplying every 4 hours',
      'High fever, severe headache, or rash appearing within 2 weeks of arrival requires immediate medical attention',
      'Verify your travel insurance covers medical treatment and evacuation in Thailand before departure',
    ],
    what_changed: 'The Thailand Ministry of Public Health has issued a health advisory due to a 40% increase in dengue fever cases across the country. Bangkok and the southern provinces of Phuket, Krabi, Surat Thani, and Songkhla have seen the highest concentrations. The advisory is in effect through October 2026, coinciding with the end of rainy season when mosquito breeding grounds are most prevalent.\n\nDengue is a serious illness transmitted by Aedes mosquitoes, which are most active during daylight hours — unlike malaria mosquitoes that are nocturnal. There is no widely available vaccine for all travelers, though Dengvaxia is available for those who have had a previous dengue infection. Symptoms typically appear 4–10 days after being bitten and include high fever, severe headache, joint and muscle pain, and rash.\n\nTravelers should know that dengue can be fatal in its severe form (dengue hemorrhagic fever), particularly for those who have had a previous dengue infection. The immediate practical impact is that outdoor activities during daylight hours in affected areas carry genuine risk. Indoor, air-conditioned accommodation significantly reduces exposure.',
    who_is_affected: 'All travellers visiting Thailand, particularly Bangkok and southern provinces during the rainy season (May–October). Adventure travellers, those staying in non-air-conditioned accommodation, and visitors spending time near mosquitoes are at higher risk.',
    what_to_do: 'Use DEET-based mosquito repellent (minimum 30% concentration) on exposed skin — apply every 3–4 hours and after swimming\nWear long sleeves and pants, especially during dawn and dusk when Aedes mosquitoes are most active\nStay in air-conditioned or screened accommodations when possible — fans alone are insufficient as mosquitoes can pass through standard screens\nSeek immediate medical attention if high fever, severe headache, rash, or joint pain develops within 14 days of arrival\nPurchase travel insurance that explicitly covers dengue treatment and medical evacuation before traveling',
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
    slug: 'paris-short-term-rental-crackdown-2026-airbnb-closures',
    headline: 'Paris Short-Term Rental Closures 2026: Unregistered Airbnb Listings Face Removal',
    summary: 'Paris authorities require all short-term rental hosts to register with the city by May 1, 2026. Unregistered listings will be removed from platforms and hosts face fines up to €50,000.',
    body: 'Paris short-term rental regulation enforcement begins.',
    tldr: [
      'Paris: 10,000+ short-term rental listings face removal from Airbnb and Booking.com after May 1, 2026',
      'All rentals must display a valid registration number — verify before booking any Paris apartment',
      'Book hotels as a reliable alternative — they are exempt from the new licensing requirements',
      'Existing bookings at unregistered properties may be cancelled with limited recourse for guests',
      'Fines up to €50,000 for hosts operating without registration — enforcement has historically been inconsistent',
    ],
    what_changed: 'Paris authorities have announced that all short-term rental hosts (Airbnb, VRBO, Booking.com) must register with the city by May 1, 2026. The registration system will verify that the property is the host\'s primary residence and enforce the 120-night annual cap. Unregistered listings will be removed from all platforms.\n\nFor travelers, the practical impact is immediate: approximately 50,000 listings exist in Paris, and city inspectors estimate 60–70% are non-compliant with existing regulations (operating as commercial ventures rather than primary residences). The May 1 deadline is the first time platforms have been given a hard cutoff date for enforcement rather than the gradual approach seen since 2019.\n\nThe biggest risk is not to future travelers but to those who have already booked. Several travel platforms have stated they will not proactively cancel bookings, meaning guests may arrive at properties only to find the listing has been removed. Travelers with existing bookings should contact their host directly to confirm registration status and have a hotel backup plan ready.',
    who_is_affected: 'Travellers booking Airbnb or other short-term rentals in Paris for stays after May 1, 2026. Existing bookings at unregistered properties may be cancelled. The regulation affects approximately 50,000 listings in Paris.',
    what_to_do: 'Verify your host has a valid Paris registration number (format: \"Numéro de déclaration\*\*\") before booking — ask directly if not displayed\nBook hotels as a backup for critical travel dates — they are not subject to these licensing requirements\nCheck your booking platform\'s cancellation policy carefully — some offer protection for房东-related cancellations\nLook for the registration number displayed in the listing or on the platform\'s listing page — if missing, do not book\nConsider staying in adjacent areas like Versailles, Saint-Germain-en-Laye, or Le Marais which have better compliance rates',
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
    slug: 'tokyo-cherry-blossom-crowds-2026-earliest-peak-bloom',
    headline: 'Tokyo Cherry Blossom Crowds 2026: Peak Bloom March 28 Brings Record Hanami Visitation',
    summary: 'The Japan Meteorological Agency forecasts Tokyo\'s cherry blossom peak on March 28, 2026 — five days earlier than average and the earliest in 10 years. Hanami crowds expected to shatter records.',
    body: 'Tokyo cherry blossom forecast updated by Japan Meteorological Agency.',
    tldr: [
      'Tokyo: Peak cherry blossom (sakura) predicted March 28, 2026 — earliest in a decade with 5+ days early',
      'Ueno Park, Shinjuku Gyoen, and Meguro River will draw record crowds — arrive before 7 AM for any chance of space',
      'Book all Tokyo accommodation immediately — vacancy rates below 15% for March 25–April 5 window',
      'Restaurant reservations near major hanami spots fully booked for peak weekend — book weeks ahead',
      'Consider Kawagoe or Kamakura as quieter alternatives with their own cherry blossom displays',
    ],
    what_changed: 'The Japan Meteorological Agency has updated the 2026 cherry blossom (sakura) forecast for Tokyo. Peak bloom is now expected on March 28, five days earlier than the historical average of April 2. This is the earliest bloom since 2016, due to warmer winter and spring temperatures. The early bloom affects not just Tokyo but the broader Kanto region, with Yokohama and Kawasaki also expecting peak conditions 2–3 days ahead of their normal schedules.\n\nFor travelers, the practical impact is significant: Japan\'s cherry blossom season is the most photographed natural event in the country, and early arrival means fewer days to catch peak conditions. hanami (flower viewing) is a cultural tradition, and major parks will be at capacity from mid-morning onwards. Budget accommodations in central Tokyo that typically cost ¥8,000–¥12,000 per night are being priced at ¥25,000+ during the peak window.\n\nThe timing is particularly challenging for international travelers who planned around traditional April travel windows. A traveler who booked a Tokyo trip for April 1–5 based on historical averages would now be arriving after peak bloom has passed — petals begin falling within 5–7 days of peak, and rain or wind can accelerate this dramatically.',
    who_is_affected: 'Travellers planning cherry blossom (hanami) visits to Tokyo and surrounding areas between March 22 and April 5, 2026. Domestic and international tourism to Tokyo during this period is expected to surge.',
    what_to_do: 'Book accommodation immediately as availability is extremely limited — central Tokyo hotels are 85%+ full for March 25–April 3\nReserve restaurant tables near major parks weeks in advance — popular hanami viewing restaurants are fully booked\nVisit Ueno Park, Shinjuku Gyoen, or Meguro River before 7 AM to secure any kind of space — gates open at various times\nConsider day trips to less crowded areas like Kawagoe, Kamakura, or Enoshima — all have cherry blossoms and fewer tourists\nBring a portable chair or blanket and arrive at your chosen spot by 6:30 AM during peak weekend days',
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
    slug: 'europe-pilot-strike-flight-cancellations-2026-six-countries',
    headline: 'Europe-Wide Flight Cancellations 2026: Pilot Strike Grounds 1,200 Flights Across 6 Countries',
    summary: 'A coordinated 72-hour pilot strike by Cockpit (Germany), SNPL (France), and Sepla (Spain) has forced the cancellation of 1,200 flights affecting Paris CDG, Frankfurt, and Madrid hubs.',
    body: 'Europe pilot strike coordinated across multiple countries.',
    tldr: [
      'Europe: 1,200+ flights cancelled as pilot strike hits Air France, Lufthansa, Iberia, and subsidiaries',
      'Strike runs March 20–22, 2026 — Paris CDG, Frankfurt, Munich, Madrid, Barcelona worst affected',
      'Rebook on alternative carriers (Emirates, Turkish Airlines) or different dates — free changes available',
      'Arrive at airports prepared for delays and cancellations even on non-strike days due to crew repositioning',
      'EU261 compensation claims can be filed for cancelled flights — document all expenses related to the disruption',
    ],
    what_changed: 'An unprecedented coordinated pilot strike has been announced across six European countries. Pilots unions in Germany (Cockpit), France (SNPL), Spain (Sepla), Italy (ANPAC), Netherlands (VNV), and Belgium (BeaC) will strike for 72 hours from March 20–22, 2026. The strike affects all flights operated by Lufthansa, Air France, Iberia, and their subsidiaries. The scale is the largest coordinated aviation labor action since the 2019 French ATC strikes.\n\nThe disruption cascades far beyond the strike days themselves. Aircraft and crews are positioned for the following days\' schedules, meaning cancellations on March 20 will create knock-on delays through March 24. Passengers on connecting flights operated by affected airlines should check their entire itinerary — a passenger flying Emirates to London, then British Airways onward to the US, may still be impacted if the British Airways connection was rebooked onto an affected airline.\n\nFor immediate travel planning, the most viable alternatives are not other legacy carriers (who have limited spare capacity) but rather low-cost carriers like Ryanair, easyJet, and Wizz Air, or Gulf carriers (Emirates, Qatar, Etihad) who operate independent schedules. Travelers willing to fly indirect routes may find availability on these carriers when direct flights are cancelled.',
    who_is_affected: 'All passengers booked on Lufthansa, Air France, Iberia, KLM, Brussels Airlines, and their subsidiaries between March 20–22, 2026. This includes connecting flights where these airlines operate. Approximately 180,000 passengers are expected to be affected.',
    what_to_do: 'Check your flight status on the airline\'s website before leaving — third-party booking sites may show outdated information\nRebook to alternate dates as soon as possible — availability on alternative dates is filling fast\nConsider alternative carriers such as Emirates, Turkish Airlines, Qatar, or budget carriers — they have independent crew and schedules\nArrive at the airport prepared for long queues even for apparently unaffected flights — cascading delays are common in multi-day strikes\nDocument all expenses for potential EU261 compensation claims — meals, accommodation, and rebooking costs may be claimable',
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
    slug: 'usa-esta-social-media-mandatory-2026-entry-requirement-change',
    headline: 'USA ESTA Social Media Requirement 2026: New Entry Rules Add Mandatory Handle Disclosure',
    summary: 'Starting May 2026, all ESTA applicants must provide social media handles and additional personal information as part of the visa waiver program security updates.',
    body: 'USA ESTA changes announced by DHS.',
    tldr: [
      'USA: ESTA applications from May 1, 2026 must include all social media handles from past 5 years',
      'Platforms required: Twitter/X, Instagram, Facebook, LinkedIn, TikTok, YouTube, Pinterest, and others',
      'Apply for ESTA at least 72 hours before travel — processing time has doubled from pre-2026 levels',
      'Existing valid ESTAs remain valid until expiration — no retroactive requirement for current approvals',
      'ESTA refusals now more common for incomplete social media disclosure — double-check your application before submitting',
    ],
    what_changed: 'The U.S. Department of Homeland Security has announced updates to the Electronic System for Travel Authorization (ESTA) for the Visa Waiver Program. Starting May 1, 2026, all applicants must provide social media account names/handles from the past five years. The change is part of enhanced vetting procedures for international visitors. The full list of required platforms includes Twitter/X, Instagram, Facebook, LinkedIn, TikTok, YouTube, Pinterest, Reddit, Quora, and several other platforms.\n\nThe practical impact on travelers is substantial. ESTA processing times have already increased from the historical 15–30 minutes to up to 72 hours in some cases. Incomplete applications — particularly those where social media accounts were listed but not all handles provided — are being flagged for manual review, adding weeks to processing times. Travelers who use their real name professionally on social media but have alternative accounts should list all of them.\n\nThe most significant timing consideration: the 5-year lookback means travelers who have changed platforms or deleted accounts may not accurately recall all handles used. Immigration attorneys recommend screenshotting current profiles as evidence of legitimate disclosure if ever questioned. Travelers with common names should note that listing \"John Smith\" as a handle when dozens of people share that name is not sufficient — specific account URLs are preferable.',
    who_is_affected: 'All travellers from Visa Waiver Program (VWP) countries applying for ESTA from May 1, 2026 onwards. This includes citizens of 40 countries including the UK, France, Germany, Australia, Japan, and South Korea. Existing valid ESTAs are not affected until renewal.',
    what_to_do: 'Prepare a list of all social media handles used in the past 5 years — screenshot profiles as backup evidence\nApply for ESTA at least 7 days before travel, not the minimum 72 hours — processing delays are occurring\nEnsure your passport is valid for at least 6 months beyond your planned travel date — this is a separate requirement\nDouble-check all information before submitting — errors or incomplete social media disclosure causes 2–3 week delays\nConsider applying for a B1/B2 visitor visa if ESTA is refused — the visa route avoids the social media requirement entirely',
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
    slug: 'barcelona-tourist-apartment-crackdown-2026-holiday-rental-closures',
    headline: 'Barcelona Tourist Apartment Closures 2026: 10,600 Holiday Rentals Face Non-Renewal',
    summary: 'Barcelona will not renew 10,000 tourist apartment licenses expiring in 2026, restricting holiday rentals to designated tourist zones and imposing strict noise and capacity rules.',
    body: 'Barcelona overtourism measures approved by city council.',
    tldr: [
      'Barcelona: 10,600 holiday rental licenses will not be renewed in 2026 — apartments disappearing fast',
      'Only licensed apartments in designated tourist zones will remain legal after the transition period',
      'Book hotels as a reliable alternative — they are not subject to the new licensing restrictions',
      'Verify any existing apartment booking has a valid license number before arrival — cancellations are mounting',
      'Maximum 6 guests per apartment (down from 10) — larger groups should book hotels or licensed hostels',
    ],
    what_changed: 'Barcelona City Council has approved sweeping measures to combat overtourism. The city will allow approximately 10,000 tourist apartment licenses to expire without renewal in 2026. Remaining licensed apartments must be in designated tourist zones, comply with strict capacity limits (max 6 guests), and observe quiet hours. New license applications are suspended indefinitely.\n\nThe practical impact for travelers cannot be overstated: Barcelona\'s accommodation landscape is undergoing its biggest transformation since the 1992 Olympics. The 10,600 affected licenses represent roughly 40% of all tourist apartments in the city. As enforcement ramps up — platform fines start at €10,000 per listing — many hosts are preemptively removing listings rather than risk penalties.\n\nThe hotel sector, by contrast, is actively expanding. Several new hotels opened in 2025, and the city has fast-tracked hotel license approvals as part of its strategy to shift tourists from residential neighborhoods into proper hospitality infrastructure. For travelers, the immediate practical advice is clear: do not rely on an apartment booking made before January 2026 without independently verifying the listing\'s registration status.',
    who_is_affected: 'Travellers who booked Barcelona apartments through Airbnb, VRBO, or Booking.com for stays in 2026 and beyond. Many existing listings will become illegal. The city expects 30-40% fewer tourist apartments available compared to 2025.',
    what_to_do: 'Verify your apartment has a valid Barcelona tourist license (format: HUTB-XXXXXX) displayed in the listing\nBook hotels as a reliable alternative — they are exempt from these restrictions and availability is improving\nCheck your booking platform\'s cancellation policy carefully — many platforms are not proactively cancelling unregistered listings\nLook for apartments in designated tourist zones like Barri Gòtic, Eixample, or El Born — compliance rates are higher here\nLarger groups (7+ people) should book hotels or licensed hostels immediately — the 6-guest cap eliminates most apartments',
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
    slug: 'australia-working-holiday-visa-expansion-2026-new-countries-entry-rules',
    headline: 'Australia Working Holiday Visa Expansion 2026: New Countries Added, 3-Year Stays Now Possible',
    summary: 'Australia has added 5 new countries to its Working Holiday Maker program and raised the maximum stay for visa holders, effective July 1, 2026.',
    body: 'Australia WHV changes announced by Department of Home Affairs.',
    tldr: [
      'Australia: Working Holiday Visa extended to 3 years (from 2) and 5 new countries added in 2026',
      'Applications open July 1, 2026 — early applications not accepted before the official launch date',
      'Required funds increased to AUD $5,000 minimum — bank statements required as evidence',
      'Age limit remains 35 for most countries — check your specific country\'s agreement terms\n',
      'Regional Australia work requirements eased for second and third-year visa holders',
    ],
    what_changed: 'Australia has announced major changes to its Working Holiday Maker (subclass 417 and 462) visa program. Five new countries will be added to the program — the specific countries have not yet been publicly named pending bilateral agreements — and visa holders will be able to stay up to three years instead of two. Second-year visa holders will have more flexibility in work requirements, and the regional Australia work requirement (88 days of specified work in regional areas for a second-year visa) will be relaxed for 2026 applicants.\n\nThe expansion is timed to address Australia\'s acute labor shortages in agriculture, hospitality, and tourism — particularly in regional Australia. For working holiday makers, this means the traditional path of doing 88 days of farm work in exchange for a second-year visa is being partially replaced by a points-based system that rewards employment in high-demand sectors anywhere in Australia.\n\nFor travelers who already hold or have held a Working Holiday Visa, the new rules create significant opportunities. Those who were previously ineligible for a second year due to the regional work requirement may now qualify under the expanded criteria. However, those who have already used their second-year visa under the old rules cannot retroactively claim additional time.',
    who_is_affected: 'Young travellers aged 18–35 from eligible countries planning to work and holiday in Australia. The changes particularly benefit those seeking longer-term stays and more work flexibility. Citizens of existing program countries can also apply under new rules from July 1.',
    what_to_do: 'Confirm your country is on the eligible list — the 5 new additions will be announced separately before July 1\nGather required documents: passport, bank statements showing AUD $5,000+ funds, health insurance, and proof of enrollment (for 462 visa)\nApply through the Australian Department of Home Affairs website — bookmark the WHV-specific application page\nPlan your work and travel itinerary to take advantage of relaxed regional requirements for second-year applicants\nConsider regional Australia for the experience — even under new rules, regional placement carries bonus points for permanent residency pathways',
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
