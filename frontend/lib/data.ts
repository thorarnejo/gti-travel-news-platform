import type { Article, HeroImage, InlineMedia } from '@/types'

// Sample data - rewritten to GTI advisory standard
export const sampleArticles: Article[] = [
  {
    id: '1',
    slug: 'london-heathrow-ground-staff-strike-march-15-17',
    title: 'London Heathrow Ground Staff Strike (Mar 15-17): Terminal Handling Disruption and Delays',
    summary: 'ACTION REQUIRED: If you fly via Heathrow before 17 March 23:59 GMT, confirm check-in desk, bag-drop cutoff, and rebooking options with your airline before leaving for the airport.',
    category: 'flights',
    location: { country: 'United Kingdom', city: 'London', countryCode: 'GB' },
    severity: 'high',
    status: 'disruption',
    articleStatus: 'active',
    publishedAt: '2026-03-15T05:30:00Z',
    updatedAt: '2026-03-20T22:30:00Z',
    tl_dr: [
      'London Heathrow: ground handling staff action has disrupted baggage loading and turnaround windows, creating rolling delays and selective cancellations across short-haul and long-haul departures.',
      'Main impact is concentrated in Terminals 2 and 3, with higher missed-connection risk for same-day onward flights through Star Alliance and selected transatlantic banks.',
      'Airlines have opened fee waivers for date changes and same-cabin rerouting where seats exist; airport transfer and hotel costs may still need receipts for reimbursement.',
      'Peak pressure windows are 05:30-10:00 and 16:00-21:00 local time until strike action ends on 17 March.',
    ],
    body: [
      'Who announced it: Unite confirmed industrial action among contracted ground operations teams, and Heathrow published operational advisories with airline-level service notices. What changed: fewer available handlers per shift reduced baggage throughput and aircraft turnaround speed. When it applies: 15 March 00:01 through 17 March 23:59 GMT. Where it applies: London Heathrow, primarily T2/T3, with knock-on effects to onward European and North American sectors.',
      'Who is affected: Primary group is passengers departing or connecting at Heathrow during strike windows. Short-haul travellers face schedule compression and gate changes; connecting passengers face missed onward flights due to tighter minimum connection margins; tourists with checked bags face highest risk of delayed baggage; business travellers face same-day meeting disruption and higher last-minute fare exposure.',
      'FAQ: Q1: Should I still go to the airport if my app says delayed? A: Yes, unless airline status shows cancelled, because desk cutoffs may move. Q2: Will airlines pay hotels? A: For eligible disruptions, many carriers reimburse reasonable costs with receipts, but policy differs by carrier and cause classification. Q3: Can I switch airports? A: In some fare classes yes, if your airline has approved protection via LGW/STN/LTN.',
    ],
    whatThisMeans: 'Expect operational uncertainty even when flights remain listed as operating. The practical risk is not only cancellation; it is also late bag drop, slower security queues after terminal reallocations, and missed onward connections because inbound delays compress transfer time. If your itinerary depends on a same-day connection, your risk profile is high and you should proactively request protection before arriving at the airport.\n\nCost risk is medium to high: rebooked fares can climb quickly, and overnight accommodation near Heathrow is limited during disruption peaks. Access risk is medium because terminal-side congestion extends door-to-gate time. Health risk is low, but traveller fatigue and overnight displacement are realistic consequences if you do not secure an alternative plan in advance.',
    whatChanged: 'Announced by Unite and Heathrow operations updates; handling capacity reduced and baggage turnaround slowed; in force 15-17 March GMT; applies mainly to Heathrow T2/T3 with network-wide knock-on delays.',
    whoIsAffected: 'Primary: Heathrow departures/connectors during strike period. Short-haul: delays and rolling gate changes. Connecting: missed onward flights due to compressed transfer times. Tourists: delayed checked baggage and hotel overnights. Business: missed same-day commitments and premium rebooking costs.',
    whatToDo: '1) Reconfirm flight status and terminal assignment 6-8 hours before departure, then again before leaving for the airport.\n2) If connecting at LHR, request protected rebooking now for later same day or next morning rather than waiting at transfer desk.\n3) Travel with critical items in cabin baggage (medication, chargers, one day of clothing, work documents).\n4) Screenshot waiver policies and keep all receipts for meals, transfers, and accommodation.\n5) If your fare permits, ask about rerouting via Gatwick, Manchester, or direct point-to-point alternatives.\n\nACTION REQUIRED: Secure a protected alternative itinerary before peak bank hours today; availability drops sharply after 16:00 local time.',
    sources: [
      { name: 'Heathrow Airport Operational Updates', url: 'https://www.heathrow.com/latest-news', isOfficial: true, lastUpdated: '2026-03-20T22:00:00Z', type: 'official' },
      { name: 'Unite the Union Announcements', url: 'https://www.unitetheunion.org/news-events', isOfficial: true, lastUpdated: '2026-03-20T20:30:00Z', type: 'official' },
      { name: 'NATS UK Airspace Updates', url: 'https://www.nats.aero', isOfficial: true, lastUpdated: '2026-03-20T21:15:00Z', type: 'official' },
      { name: 'BBC Travel and Transport', url: 'https://www.bbc.com/news/topics/cg66j5dpy39t/transport', lastUpdated: '2026-03-20T21:40:00Z', type: 'news' },
    ],
    impactRegions: ['London Heathrow', 'Greater London', 'South East England'],
    relatedArticles: ['japan-visa-entry-requirements-update', 'paris-olympics-2024-airbnb-regulations', 'thailand-safety-advisory-southern-regions'],
  },
  {
    id: '2',
    slug: 'japan-visa-entry-requirements-update',
    title: 'Japan eVISA Requirement (From Apr 1): Pre-Departure Approval Needed for 68 Markets',
    summary: 'ACTION REQUIRED: If you travel to Japan on or after 1 April, submit your eVISA application now and do not assume check-in will accept visa-free entry at the airport.',
    category: 'visa',
    location: { country: 'Japan', countryCode: 'JP' },
    severity: 'high',
    status: 'update',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-19T09:00:00Z',
    updatedAt: '2026-03-20T19:10:00Z',
    tl_dr: [
      'Japan: Ministry of Foreign Affairs eVISA rollout changes boarding eligibility, and passengers without approved authorization risk airline denial at departure.',
      'Processing is typically 5-7 business days, but manual review can extend to 10 business days during sakura demand peaks.',
      'Requirement applies from 1 April for tourists from 68 previously visa-exempt markets; business and long-stay categories follow separate pathways.',
      'Incomplete accommodation or itinerary data is a common rejection trigger and can force trip postponement.',
    ],
    body: [
      'Who announced it: Japan Ministry of Foreign Affairs and related immigration guidance channels. What changed: pre-travel eVISA authorization replaces arrival-only visa-exempt processing for affected tourist cohorts. When it applies: from 1 April onward, with pre-departure compliance checks already communicated by airlines. Where it applies: all international departures to Japan for affected passports.',
      'Who is affected: Primary group is leisure travellers from the 68 affected countries. Short-haul regional flyers face less schedule buffer if reapplication is needed; connecting long-haul passengers face higher missed-trip risk if first-segment check-in rejects documents; tourists with fixed seasonal bookings (sakura) face higher cost exposure; business travellers should validate whether corporate visa tracks override the tourist route.',
      'FAQ:\n\n**Q1: Can I board with an application receipt only?**\nA: Usually no, carriers expect approved status.\n\n**Q2: How early should I apply?**\nA: Minimum two weeks, ideally three in peak periods.\n\n**Q3: Does this apply to every country?**\nA: No, only designated passport markets listed by MOFA.',
    ],
    whatThisMeans: 'This is a boarding-eligibility issue, not only an immigration-counter issue. If your eVISA is not approved before departure, your airline can deny boarding and your trip fails before you leave origin. That changes traveller behavior: document prep must move earlier, and itinerary/hotel details must be consistent across bookings and application fields.\n\nRisk level is high for near-term departures and medium for travellers planning 3+ weeks out. Cost risk is medium to high because non-refundable flights, peak-season hotel rates, and rescheduling fees can stack quickly when approval is delayed. Access risk is high at check-in; health risk is low.',
    whatChanged: 'MOFA announced mandatory pre-departure eVISA for designated tourist passports; old arrival-style visa-exempt flow no longer sufficient from 1 April; applies across all entry airports in Japan for affected nationals.',
    whoIsAffected: 'Primary: tourists from 68 designated countries. Short-haul: tighter document timing. Connecting: higher denied-boarding impact at first origin. Tourists: risk of losing fixed seasonal bookings. Business: verify whether separate visa category applies before travel day.',
    whatToDo: '1) Submit eVISA now with passport, full accommodation record, and return/onward ticket proof.\n2) Match spellings exactly between passport and all booking confirmations.\n3) Avoid non-refundable add-ons until visa status is approved.\n4) Recheck airline Timatic/document rules 48 hours before departure.\n5) Keep digital and printed copies of approval and supporting documents for check-in.\n\nACTION REQUIRED: Complete and submit your Japan eVISA application today if your departure is within the next 14 days.',
    sources: [
      { name: 'Ministry of Foreign Affairs of Japan', url: 'https://www.mofa.go.jp', isOfficial: true, lastUpdated: '2026-03-20T18:40:00Z', type: 'official' },
      { name: 'Japan eVISA Portal', url: 'https://www.evisa.mofa.go.jp', isOfficial: true, lastUpdated: '2026-03-20T19:00:00Z', type: 'official' },
      { name: 'Japan National Tourism Organization', url: 'https://www.japan.travel/en/', isOfficial: true, lastUpdated: '2026-03-20T17:15:00Z', type: 'official' },
      { name: 'The Japan Times', url: 'https://www.japantimes.co.jp', lastUpdated: '2026-03-20T16:00:00Z', type: 'news' },
    ],
    impactRegions: ['Tokyo', 'Osaka', 'Kyoto', 'All Japan Entry Points'],
    relatedArticles: ['tokyo-cherry-blossom-season-tourism-surge', 'london-heathrow-ground-staff-strike-march-15-17', 'thailand-safety-advisory-southern-regions'],
  },
  {
    id: '3',
    slug: 'dubai-hotels-spring-break-price-surge',
    title: 'Dubai Hotel Price Surge (Mar-Apr): Spring Demand and Ramadan Supply Pressure',
    summary: 'ACTION REQUIRED: Lock accommodation now for Dubai stays through mid-April, or switch base to Abu Dhabi before weekend inventory sells out.',
    category: 'hotels',
    location: { country: 'United Arab Emirates', city: 'Dubai', countryCode: 'AE' },
    severity: 'medium',
    status: 'price-change',
    articleStatus: 'active',
    publishedAt: '2026-03-18T16:00:00Z',
    updatedAt: '2026-03-20T15:10:00Z',
    tl_dr: [
      'Dubai: hotel ADR has climbed sharply as spring-break demand meets Ramadan-adjusted inventory, increasing total trip cost and reducing late-booking options.',
      'Mid-range rooms are frequently pricing above historical norms, with premium areas (Marina, Downtown, Palm) seeing the strongest spikes.',
      'Travellers can lower cost risk by basing in Abu Dhabi or secondary emirates and day-tripping to Dubai.',
      'Delay in booking now translates directly into higher nightly rates and fewer cancellation-friendly options.',
    ],
    body: [
      'Who announced it: market indicators from hospitality trackers and destination updates from UAE tourism channels. What changed: rates rose while flexible inventory tightened, especially for weekend check-ins and beachfront zones. When it applies: current booking window through mid-April. Where it applies: Dubai citywide, strongest in Marina/JBR, Downtown, and Palm Jumeirah.',
      'Who is affected: Primary group is leisure travellers booking within short lead times. Short-haul weekend travellers face peak nightly spikes; connecting stopover travellers face reduced same-area availability; tourists and families face higher total package cost; business travellers may offset via corporate contracts but still face constrained premium inventory.',
      'FAQ: Q1: Is waiting for last-minute deals realistic? A: Low probability in current demand pattern. Q2: Are apartment hotels cheaper? A: Often yes, especially for stays over three nights. Q3: Is Abu Dhabi commuting practical? A: Yes for selected itineraries, but add transfer time and transport cost to compare total value.',
    ],
    whatThisMeans: 'Your main risk is cost escalation, not border access. If you delay booking, available rooms shift toward premium inventory and stricter cancellation terms. Travelers should treat accommodation as the critical path: lock refundable inventory first, then optimize itinerary around confirmed stay.\n\nRisk level is medium overall and high for families or groups needing multiple rooms. Cost risk is high; access risk is low; delay risk is moderate due to commuting if staying outside Dubai core districts. Act early if travelling over weekends or event dates.',
    whatChanged: 'Hospitality market updates show sustained ADR increases and tighter flexible inventory; effect is immediate and expected through mid-April; strongest impact in central and beachfront Dubai zones.',
    whoIsAffected: 'Primary: spring-break and Ramadan-period visitors to Dubai. Short-haul: weekend premium pricing. Connecting: stopover inventory constraints. Tourists/families: steep total accommodation costs. Business: reduced choice in preferred districts even with negotiated rates.',
    whatToDo: '1) Book a refundable hotel now, then monitor rate drops instead of waiting unbooked.\n2) Compare total-trip cost for Abu Dhabi base + rail/road transfer versus central Dubai stay.\n3) Prioritize weekday check-in/check-out patterns to reduce nightly average.\n4) Use loyalty points or prepaid packages only after cancellation terms are verified.\n5) Prebook high-demand activities to avoid paying premium concierge markups.\n\nACTION REQUIRED: Secure a cancellable room within the next 24 hours if your trip starts before 15 April.',
    sources: [
      { name: 'Dubai Department of Economy and Tourism', url: 'https://www.visitdubai.com', isOfficial: true, lastUpdated: '2026-03-20T14:30:00Z', type: 'official' },
      { name: 'Visit Abu Dhabi', url: 'https://visitabudhabi.ae', isOfficial: true, lastUpdated: '2026-03-20T13:00:00Z', type: 'official' },
      { name: 'STR Hospitality Market Data', url: 'https://str.com', lastUpdated: '2026-03-20T12:00:00Z', type: 'news' },
      { name: 'Booking.com Partner Insights', url: 'https://partner.booking.com/en-gb/resources/research', lastUpdated: '2026-03-20T11:20:00Z', type: 'news' },
    ],
    impactRegions: ['Dubai', 'Abu Dhabi', 'UAE'],
    relatedArticles: ['paris-olympics-2024-airbnb-regulations', 'tokyo-cherry-blossom-season-tourism-surge', 'japan-visa-entry-requirements-update'],
  },
  {
    id: '4',
    slug: 'thailand-safety-advisory-southern-regions',
    title: 'Southern Thailand Advisory Update: Elevated Risk in Border Provinces',
    summary: 'ACTION REQUIRED: If your route includes Pattani, Yala, Narathiwat, or southern Songkhla, reassess travel immediately and confirm insurance validity before departure.',
    category: 'safety',
    location: { country: 'Thailand', countryCode: 'TH' },
    severity: 'high',
    status: 'warning',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-17T12:00:00Z',
    updatedAt: '2026-03-20T08:25:00Z',
    tl_dr: [
      'Thailand: foreign government advisories identify higher security risk in specific southern border provinces, while major tourist hubs remain outside the advisory core.',
      'Land-border plans and overland itineraries near Malaysia require active verification due to localized closures and security checks.',
      'Insurance and emergency-assistance terms may change for travel inside elevated-risk zones.',
      'Bangkok, Chiang Mai, Phuket, and most island circuits are not under this specific escalation.',
    ],
    body: [
      'Who announced it: travel advisories from foreign affairs authorities and embassy notices, with local Thai security updates. What changed: advisory level increased for selected southern provinces due to incident pattern and operational concerns. When it applies: immediate and ongoing pending further review. Where it applies: Pattani, Yala, Narathiwat, and parts of Songkhla near the border corridor.',
      'Who is affected: Primary group is travellers entering or transiting listed provinces. Short-haul domestic flyers may face route amendments; connecting overland travellers to/from Malaysia face checkpoint and closure uncertainty; tourists on standard beach/city routes are largely unaffected unless itinerary includes border-zone excursions; business travellers with field visits in affected provinces carry higher duty-of-care obligations.',
      'FAQ: Q1: Is all of Thailand under this warning? A: No, it is province-specific. Q2: Can I still travel with insurance? A: Often yes, but policy conditions may tighten for listed areas. Q3: Should I cancel Phuket or Bangkok? A: Not based on this advisory alone.',
    ],
    whatThisMeans: 'This update changes route planning, not all Thailand travel. If you are not entering the listed provinces, your practical impact is limited to perception and possible insurance wording checks. If you are entering those areas, your risk profile is materially different: delayed road movement, restricted assistance, and potential claim exclusions become real operational concerns.\n\nRisk level is high for border-province travel and low to medium for mainstream tourist itineraries elsewhere. Cost risk is medium where rerouting is required; access risk is high in affected districts; health/safety risk is elevated in line with advisory language.',
    whatChanged: 'Advisory authorities elevated risk classification for Pattani, Yala, Narathiwat, and southern Songkhla; change is active now; applies to border-adjacent travel corridors and local movements in designated provinces.',
    whoIsAffected: 'Primary: travellers to named southern provinces. Short-haul: domestic routing changes. Connecting: land-border uncertainty with Malaysia links. Tourists: mostly unaffected outside listed zones. Business: higher compliance and security-planning burden for site visits.',
    whatToDo: '1) Check your exact destination province, not just “Thailand” as a whole.\n2) Confirm insurer coverage and assistance terms for advisory zones in writing.\n3) Register trip details with your embassy/consular alert system before movement.\n4) Keep flexible transport and accommodation with cancellation options.\n5) If crossing to/from Malaysia by land, verify checkpoint status same day.\n\nACTION REQUIRED: Revalidate province-level itinerary and insurance coverage before any departure within the next 48 hours.',
    sources: [
      { name: 'US Department of State Travel Advisories', url: 'https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html', isOfficial: true, lastUpdated: '2026-03-20T08:00:00Z', type: 'official' },
      { name: 'UK FCDO Thailand Advice', url: 'https://www.gov.uk/foreign-travel-advice/thailand', isOfficial: true, lastUpdated: '2026-03-20T07:40:00Z', type: 'official' },
      { name: 'Tourism Authority of Thailand Newsroom', url: 'https://www.tatnews.org', isOfficial: true, lastUpdated: '2026-03-20T07:10:00Z', type: 'official' },
      { name: 'Bangkok Post', url: 'https://www.bangkokpost.com', lastUpdated: '2026-03-20T06:20:00Z', type: 'news' },
    ],
    impactRegions: ['Pattani', 'Yala', 'Narathiwat', 'Songkhla', 'Southern Thailand'],
    relatedArticles: ['japan-visa-entry-requirements-update', 'london-heathrow-ground-staff-strike-march-15-17', 'paris-olympics-2024-airbnb-regulations'],
  },
  {
    id: '5',
    slug: 'paris-olympics-2024-airbnb-regulations',
    title: 'Paris Olympic Period Accommodation Rules: Short-Term Rental Caps and Compliance Risk',
    summary: 'ACTION REQUIRED: Verify your Paris rental registration now; unregistered listings risk cancellation as enforcement tightens ahead of Olympic travel peaks.',
    category: 'hotels',
    location: { country: 'France', city: 'Paris', countryCode: 'FR' },
    severity: 'high',
    status: 'update',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-16T14:00:00Z',
    updatedAt: '2026-03-20T17:45:00Z',
    tl_dr: [
      'Paris: short-term rental compliance checks are tightening ahead of Olympic demand, and non-compliant listings face removal or cancellation risk.',
      'Central-district supply is under pressure, pushing travellers toward outer arrondissements and nearby rail-linked cities.',
      'Hosts must provide valid registration information under local rules; lack of proof is a concrete red flag for travellers.',
      'Hotel alternatives remain available but rates and minimum-stay conditions are rising in peak event windows.',
    ],
    body: [
      'Who announced it: Paris municipal authorities and platform policy channels. What changed: stricter enforcement on registration display and legal rental-day limits in controlled districts. When it applies: immediate pre-Olympic period with heightened checks into event season. Where it applies: Paris, with strongest impact in central arrondissements and high-demand event corridors.',
      'Who is affected: Primary group is travellers relying on short-term rentals during Olympic dates. Short-haul city-break travellers face higher cancellation risk close to arrival; connecting international travellers face limited same-price replacement options if listings fail compliance; tourists and families are exposed to last-minute rebooking cost spikes; business/event travellers face compressed inventory near venue clusters.',
      'FAQ: Q1: How do I reduce cancellation risk? A: Request and verify host registration details before final payment. Q2: Are hotels safer than rentals now? A: Operationally yes, but often at higher cost. Q3: Is staying outside Paris practical? A: Yes, if RER/metro access to venues is confirmed for your schedule.',
    ],
    whatThisMeans: 'The decision point for travellers is certainty versus price. A cheaper rental without verified compliance can become a high-cost problem if cancelled close to check-in, especially during Olympic demand spikes. Behaviourally, travellers should prioritize documented legality and transport reliability over headline nightly rate.\n\nRisk level is high for unverified short-term rentals, medium for compliant rentals, and medium for hotel cost inflation. Access risk is moderate if you choose rail-linked suburbs; cost risk is high near central venues and late booking windows.',
    whatChanged: 'Paris authorities and platforms increased enforcement on registration and legal hosting limits; measures are active now and intensifying pre-Olympics; impact is strongest in central Paris rental inventory.',
    whoIsAffected: 'Primary: Olympic-period visitors booking short-term rentals. Short-haul: city-break bookings with thin buffer. Connecting: high replacement-cost exposure if cancelled last minute. Tourists/families: inventory pressure for multi-bed stays. Business: premium around venues and convention zones.',
    whatToDo: '1) Ask host for registration identifier and verify before finalizing booking.\n2) Keep at least one cancellable backup hotel option until check-in week.\n3) Prioritize properties near reliable RER/metro lines over central postcode alone.\n4) Reconfirm cancellation policy and who pays re-accommodation if listing is removed.\n5) Lock event tickets and transport slots after accommodation compliance is confirmed.\n\nACTION REQUIRED: Validate your Paris booking compliance within 24 hours to avoid last-minute Olympic-period displacement.',
    sources: [
      { name: 'Ville de Paris Official Portal', url: 'https://www.paris.fr', isOfficial: true, lastUpdated: '2026-03-20T17:00:00Z', type: 'official' },
      { name: 'Service-Public.fr Housing Guidance', url: 'https://www.service-public.fr', isOfficial: true, lastUpdated: '2026-03-20T15:20:00Z', type: 'official' },
      { name: 'Airbnb Newsroom', url: 'https://news.airbnb.com', lastUpdated: '2026-03-20T14:10:00Z', type: 'news' },
      { name: 'France 24', url: 'https://www.france24.com/en/', lastUpdated: '2026-03-20T13:40:00Z', type: 'news' },
    ],
    impactRegions: ['Paris', 'Île-de-France', 'Saint-Denis', 'Versailles'],
    relatedArticles: ['dubai-hotels-spring-break-price-surge', 'london-heathrow-ground-staff-strike-march-15-17', 'tokyo-cherry-blossom-season-tourism-surge'],
  },
  {
    id: '6',
    slug: 'tokyo-cherry-blossom-season-tourism-surge',
    title: 'Tokyo Sakura Peak Crowding Update: Queue Pressure at Major Viewing Corridors',
    summary: 'ACTION REQUIRED: Move hanami visits to early morning weekday slots and prebook timed-entry parks to avoid multi-hour crowd bottlenecks.',
    category: 'destinations',
    location: { country: 'Japan', city: 'Tokyo', countryCode: 'JP' },
    severity: 'medium',
    status: 'new',
    articleStatus: 'active',
    publishedAt: '2026-03-19T06:00:00Z',
    updatedAt: '2026-03-20T12:35:00Z',
    tl_dr: [
      'Tokyo: peak sakura demand is driving heavy crowding at Ueno, Meguro, and Shinjuku corridors, affecting transit flow and same-day itinerary reliability.',
      'Weekends and evening illumination windows carry the longest waits and highest congestion risk.',
      'Travellers can reduce disruption by using timed-entry gardens and secondary viewing locations with earlier arrival windows.',
      'Accommodation and domestic transport near blossom hotspots remain under high booking pressure.',
    ],
    body: [
      'Who announced it: Tokyo metropolitan visitor guidance, park operators, and seasonal blossom trackers. What changed: visitor density rose above normal peak levels, prompting stricter crowd controls and queue management at major hanami sites. When it applies: current bloom window through early April. Where it applies: Tokyo city viewing hotspots and adjacent rail nodes.',
      'Who is affected: Primary group is leisure travellers planning same-day multi-stop sakura itineraries. Short-haul visitors on weekend breaks face the highest queue impact; connecting travellers with limited Tokyo layovers face missed plan risk; tourists/families encounter longer movement times and reduced picnic space; business travellers combining meetings with evening viewing face transport crowding after work hours.',
      'FAQ: Q1: Is bloom still visible outside major parks? A: Yes, many neighborhood riverside and temple areas remain good alternatives. Q2: Are timed-entry parks worth it? A: Usually yes for predictability. Q3: Should I avoid weekends? A: If possible, yes—weekday morning is materially easier.',
    ],
    whatThisMeans: 'This is primarily an access-and-time management issue. You may still see blossoms, but your schedule can fail if you rely on spontaneous entry at headline locations. Travellers should front-load key viewing to early weekday periods and limit geographic spread to avoid transit delays between crowded corridors.\n\nRisk level is medium overall and high for weekend/evening plans in top sites. Delay risk is high, cost risk is medium due to premium last-minute bookings, and health risk is low but fatigue risk rises with prolonged queues and long walking segments.',
    whatChanged: 'Tokyo operators introduced tighter crowd handling at major sakura zones; changes are active during current peak bloom window; strongest effects are at Ueno, Meguro, Shinjuku-area flows and nearby train access points.',
    whoIsAffected: 'Primary: Tokyo sakura visitors through early April. Short-haul: compressed weekend schedules at highest risk. Connecting: limited-stop itineraries prone to misses. Tourists/families: longer queues and reduced space. Business: evening transport crowding impacts dinner/event timing.',
    whatToDo: '1) Schedule top blossom sites before 08:30 on weekdays.\n2) Reserve timed-entry gardens where offered, and keep one lower-density backup site.\n3) Use station alternatives and add 30-45 minutes transfer buffer between viewing spots.\n4) Carry water, battery pack, and offline maps to avoid queue exits for essentials.\n5) Confirm return transport before evening illumination visits.\n\nACTION REQUIRED: Rebuild tomorrow\'s Tokyo plan tonight with weekday-early slots and one backup location per district.',
    sources: [
      { name: 'Tokyo Metropolitan Government Tourism', url: 'https://www.gotokyo.org/en/', isOfficial: true, lastUpdated: '2026-03-20T12:10:00Z', type: 'official' },
      { name: 'Japan Meteorological Agency', url: 'https://www.jma.go.jp/jma/indexe.html', isOfficial: true, lastUpdated: '2026-03-20T11:40:00Z', type: 'official' },
      { name: 'Japan National Tourism Organization', url: 'https://www.japan.travel/en/', isOfficial: true, lastUpdated: '2026-03-20T10:50:00Z', type: 'official' },
      { name: 'The Asahi Shimbun', url: 'https://www.asahi.com/ajw/', lastUpdated: '2026-03-20T10:20:00Z', type: 'news' },
    ],
    impactRegions: ['Tokyo', 'Ueno', 'Meguro', 'Shinjuku', 'Greater Tokyo Area'],
    relatedArticles: ['japan-visa-entry-requirements-update', 'dubai-hotels-spring-break-price-surge', 'london-heathrow-ground-staff-strike-march-15-17'],
  },
]

export const articleHeroImages: Record<string, HeroImage> = {
  'london-heathrow-ground-staff-strike-march-15-17': {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
    alt: 'Commercial aircraft parked at a busy international airport terminal',
  },
  'japan-visa-entry-requirements-update': {
    src: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1600&q=80',
    alt: 'Tokyo skyline with city lights at dusk',
  },
  'dubai-hotels-spring-break-price-surge': {
    src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Dubai skyline with modern high-rise hotels',
  },
  'thailand-safety-advisory-southern-regions': {
    src: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1600&q=80',
    alt: 'Traditional long-tail boats on a Thailand beach at sunset',
  },
  'paris-olympics-2024-airbnb-regulations': {
    src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    alt: 'Eiffel Tower and Paris cityscape during golden hour',
  },
  'tokyo-cherry-blossom-season-tourism-surge': {
    src: 'https://images.unsplash.com/photo-1526481280695-3c4697d2eaae?auto=format&fit=crop&w=1600&q=80',
    alt: 'Cherry blossoms framing a Tokyo street with city skyline in background',
  },
}

export const articleInlineMedia: Record<string, InlineMedia[]> = {
  'london-heathrow-ground-staff-strike-march-15-17': [
    {
      id: 'lhr-terminal-map',
      type: 'map',
      src: 'https://www.google.com/maps?q=Heathrow+Airport&output=embed',
      title: 'Heathrow Airport map',
      caption: 'Placeholder embed: terminal area map for travel planning context.',
    },
  ],
  'japan-visa-entry-requirements-update': [
    {
      id: 'visa-process-chart',
      type: 'chart',
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      title: 'eVISA process timeline',
      caption: 'Placeholder visual for approval timeline and planning buffer.',
    },
  ],
}

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
  const article = sampleArticles.find(a => a.slug === slug)
  if (!article) return undefined

  return {
    ...article,
    heroImage: article.heroImage || articleHeroImages[slug],
    inlineMedia: article.inlineMedia || articleInlineMedia[slug] || [],
  }
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
