import type { Article, HeroImage, InlineMedia } from '@/types'

// GTI standard advisory data (London Heathrow template applied)
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
      'London Heathrow: ground handling staff action has disrupted baggage loading and turnaround windows, creating rolling delays and selective cancellations.',
      'Main impact is concentrated in Terminals 2 and 3, with elevated missed-connection risk for same-day onward flights.',
      'Airlines have opened fee waivers for date changes and same-cabin rerouting where seats exist.',
      'Peak pressure windows remain 05:30-10:00 and 16:00-21:00 local time until strike end.',
    ],
    body: [
      'Unite confirmed strike action among contracted ground operations teams, and Heathrow published live advisories while airlines issued service notices. Reduced handler availability slowed baggage throughput and aircraft turnaround cycles, causing rolling delays and selective cancellations.',
      'Operational impact stayed heaviest in Terminals 2 and 3, with knock-on effects across European and North American departure banks. Travelers with checked baggage, short connections, and fixed same-day onward legs faced the highest disruption probability.',
      'FAQ:\n\n**Q1: Should I still go to the airport if my app says delayed?**\nA: Yes, unless status is cancelled; desk cutoffs may move.\n\n**Q2: Will airlines reimburse hotels and meals?**\nA: Many do for eligible disruptions, but carrier policy and receipts are required.\n\n**Q3: Can I reroute via another UK airport?**\nA: In some fare classes yes, if your airline has approved protection options.',
    ],
    whatThisMeans: 'Expect slower baggage handling and longer terminal dwell time even when flights still operate. This raises missed-connection and overnight-cost risk for passengers with tight itineraries.',
    whatChanged: 'Latest airport and union updates confirmed reduced ground-handling capacity through 17 March 23:59 GMT with continued T2/T3 pressure.',
    whoIsAffected: 'Passengers departing or connecting at Heathrow T2/T3, especially economy fares with strict change rules, checked-bag travelers, and UK-EU/Transatlantic same-day connectors.',
    whatToDo: '1) Recheck flight status and cutoff times 6-8 hours before departure and again before leaving.\n2) Request protected rebooking now if your connection buffer is under 90 minutes.\n3) Keep medication, chargers, and one day of essentials in cabin baggage.\n4) Save waiver screenshots and keep receipts for disruption costs.\n\nACTION REQUIRED: Lock a fallback itinerary before afternoon peak congestion reduces seat availability.',
    sources: [
      { name: 'Heathrow Airport Operational Updates', url: 'https://www.heathrow.com/latest-news', isOfficial: true },
      { name: 'Unite the Union Announcements', url: 'https://www.unitetheunion.org/news-events', isOfficial: true },
      { name: 'NATS UK Airspace Updates', url: 'https://www.nats.aero', isOfficial: true },
    ],
    impactRegions: ['London Heathrow', 'Greater London', 'South East England'],
    relatedArticles: ['japan-eta-visa-free-travelers', 'iceland-volcano-eruption-disrupts-air-travel', 'paris-olympics-aftermath-hotel-occupancy-drop'],
  },
  {
    id: '2',
    slug: 'japan-eta-visa-free-travelers',
    title: 'Japan to Require ETA for Visa-Free Travelers',
    summary: 'ACTION REQUIRED: If you travel to Japan on or after rollout date, submit ETA details before check-in and verify airline document rules.',
    category: 'visa',
    location: { country: 'Japan', countryCode: 'JP' },
    severity: 'high',
    status: 'update',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-19T09:00:00Z',
    updatedAt: '2026-03-21T08:30:00Z',
    tl_dr: [
      'Japan: ETA pre-clearance for visa-free markets is moving from proposal to implementation guidance.',
      'Airlines are expected to enforce approved ETA status at check-in, not only on arrival.',
      'Processing windows vary by market and can extend during demand peaks.',
      'Incomplete itinerary and passport data remain the top rejection causes.',
    ],
    body: [
      'Japan authorities have published implementation guidance for an ETA layer targeting currently visa-free visitors. The policy is designed to shift verification to pre-departure, aligning check-in controls with arrival admissibility standards.',
      'For travelers, this creates a document-timing dependency: boarding can fail at origin if ETA status is missing or mismatched. Near-term departures and multi-segment itineraries carry the highest disruption and rebooking risk.',
      'FAQ:\n\n**Q1: Is ETA the same as a visa?**\nA: No, it is a pre-travel authorization linked to visa-free entry.\n\n**Q2: Can I board with only a submission receipt?**\nA: Usually no; airlines typically require approved status.\n\n**Q3: Who must apply first?**\nA: Priority cohorts are visa-free leisure travelers in listed passport markets.',
    ],
    whatThisMeans: 'This changes trip prep from airport-day to pre-departure compliance. Travelers should complete ETA early, align booking details exactly, and avoid non-refundable add-ons before approval.',
    whatChanged: 'Government guidance shifted ETA from planning language to operational rollout steps with airline pre-boarding enforcement expectations.',
    whoIsAffected: 'Visa-free passport holders flying to Japan, especially first-time visitors, short-notice travelers, and connecting itineraries where first-segment denial cancels the full trip.',
    whatToDo: '1) Start ETA application at least 2-3 weeks before departure.\n2) Match passport spelling and booking details exactly across all forms.\n3) Recheck airline Timatic/document rules 48 hours before flight.\n4) Keep digital and printed ETA approval proof for check-in.\n\nACTION REQUIRED: Submit ETA immediately if your departure is within 14 days.',
    sources: [
      { name: 'Ministry of Foreign Affairs of Japan', url: 'https://www.mofa.go.jp', isOfficial: true },
      { name: 'Japan Immigration Services Agency', url: 'https://www.isa.go.jp/en/', isOfficial: true },
      { name: 'Japan National Tourism Organization', url: 'https://www.japan.travel/en/', isOfficial: true },
    ],
    impactRegions: ['Tokyo', 'Osaka', 'All Japan Entry Points'],
    relatedArticles: ['thailand-digital-nomad-visa-2-0', 'london-heathrow-ground-staff-strike-march-15-17', 'global-passport-ranking-2025-shifting-power'],
  },
  {
    id: '3',
    slug: 'santorini-volcanic-uplift-tourism-review',
    title: 'Santorini Volcanic Uplift Triggers Tourism Review',
    summary: 'ACTION REQUIRED: Reconfirm ferry/flight plans and accommodation flexibility if your Santorini trip falls in the next 2 weeks.',
    category: 'safety',
    location: { country: 'Greece', city: 'Santorini', countryCode: 'GR' },
    severity: 'medium',
    status: 'warning',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-20T07:00:00Z',
    updatedAt: '2026-03-21T07:40:00Z',
    tl_dr: [
      'Santorini: geophysical uplift monitoring prompted tourism operations review and contingency planning.',
      'No blanket closure announced, but local authorities are testing readiness for transport and crowd controls.',
      'Day-trip visitors and cruise-linked itineraries face highest same-day schedule volatility.',
      'Travel insurance terms may differ if warnings escalate.',
    ],
    body: [
      'Greek monitoring agencies and local authorities initiated a tourism-readiness review after recent uplift observations around Santorini. Current guidance supports continued travel with heightened situational monitoring and operational contingency checks.',
      'The immediate effect is uncertainty rather than shutdown: operators may adjust port calls, excursion windows, and crowd management with short notice. Travelers with rigid same-day links between ferries, flights, and tours are most exposed.',
      'FAQ:\n\n**Q1: Is Santorini closed to visitors?**\nA: No blanket closure has been announced.\n\n**Q2: Should I cancel now?**\nA: Not automatically; prioritize flexible bookings and daily updates.\n\n**Q3: What part of the trip is most fragile?**\nA: Tight ferry/flight transfers and cruise-day schedules.',
    ],
    whatThisMeans: 'Travel remains possible, but timetable reliability is weaker. Practical planning should focus on flexibility, same-day buffer time, and clear fallback routing via Athens or nearby islands.',
    whatChanged: 'Authorities moved from passive monitoring to tourism operations review with contingency procedures and closer transport coordination.',
    whoIsAffected: 'Island visitors, cruise passengers, and travelers with pre-paid excursions or tight ferry-flight chains in Cyclades routes.',
    whatToDo: '1) Confirm carrier and port updates the evening before and morning of travel.\n2) Add transfer buffer between ferry, hotel check-in, and outbound flight.\n3) Keep refundable alternatives for one night in Athens or nearby islands.\n4) Review insurance wording for geologic-event disruptions.\n\nACTION REQUIRED: Revalidate all Santorini segments before departure day.',
    sources: [
      { name: 'Hellenic Ministry of Climate Crisis and Civil Protection', url: 'https://civilprotection.gov.gr/en', isOfficial: true },
      { name: 'Institute for the Study and Monitoring of the Santorini Volcano', url: 'https://ismosav.santorini.net', isOfficial: true },
      { name: 'Visit Greece', url: 'https://www.visitgreece.gr', isOfficial: true },
    ],
    impactRegions: ['Santorini', 'Cyclades', 'Aegean Sea'],
    relatedArticles: ['mediterranean-heatwave-travel-advisory', 'iceland-volcano-eruption-disrupts-air-travel', 'norway-northern-lights-season-extended'],
  },
  {
    id: '4',
    slug: 'global-passport-ranking-2025-shifting-power',
    title: 'Global Passport Ranking 2025 Reveals Shifting Power',
    summary: 'TL;DR: Check new visa-free counts before booking multi-country itineraries; some routings now require added lead time for permissions.',
    category: 'visa',
    location: { country: 'Global', countryCode: 'UN' },
    severity: 'medium',
    status: 'update',
    articleStatus: 'active',
    publishedAt: '2026-03-18T10:30:00Z',
    updatedAt: '2026-03-21T07:55:00Z',
    tl_dr: [
      'Global: 2025 passport mobility rankings show notable gains and declines across key travel markets.',
      'Ranking changes alter planning complexity for multi-stop leisure, study, and business trips.',
      'Transit rights and visa-on-arrival access differ from full visa-free entry and must be checked separately.',
      'The biggest practical impact is timeline risk when itineraries cross mixed-requirement regions.',
    ],
    body: [
      'New passport mobility tables for 2025 indicate a reshuffle in travel access strength, with some passports gaining destination coverage while others lose frictionless options. The rankings are directional signals, not direct travel permission.',
      'For travelers, the impact appears during itinerary assembly: a route that worked last year may now require ETA/visa steps in one or more legs. Errors often happen when passengers assume transit policy equals entry policy.',
      'FAQ:\n\n**Q1: Does a higher ranking guarantee entry everywhere listed?**\nA: No, each destination still applies its own conditions.\n\n**Q2: Is visa-on-arrival equal to visa-free?**\nA: No, it still requires formal processing at destination.\n\n**Q3: What should frequent travelers update first?**\nA: Saved trip templates and country-rule checklists.',
    ],
    whatThisMeans: 'Passport ranking changes are a planning signal. Treat every border as a document checkpoint and re-validate rules at booking and pre-departure stages.',
    whatChanged: '2025 tables introduced measurable shifts in mobility order and destination counts for multiple high-travel nationalities.',
    whoIsAffected: 'Frequent international travelers, dual nationals, students, remote workers, and business travelers using multi-country itineraries with short planning windows.',
    whatToDo: '1) Recheck entry and transit rules for every country in your route.\n2) Update saved agency/corporate templates with 2025 requirements.\n3) Apply for required documents before booking non-refundable segments.\n4) Keep proof of onward travel and accommodation ready for border checks.\n\nACTION REQUIRED: Validate document requirements for your next two international trips today.',
    sources: [
      { name: 'Henley Passport Index', url: 'https://www.henleyglobal.com/passport-index', isOfficial: false },
      { name: 'IATA Travel Centre / Timatic', url: 'https://www.iatatravelcentre.com', isOfficial: true },
      { name: 'UN Tourism', url: 'https://www.unwto.org', isOfficial: true },
    ],
    impactRegions: ['Europe', 'Asia-Pacific', 'North America', 'Global Transit Hubs'],
    relatedArticles: ['japan-eta-visa-free-travelers', 'thailand-digital-nomad-visa-2-0', 'dubai-tourism-authority-sustainability-standards'],
  },
  {
    id: '5',
    slug: 'dubai-tourism-authority-sustainability-standards',
    title: 'Dubai Tourism Authority Announces New Sustainability Standards',
    summary: 'TL;DR: Expect stricter sustainability disclosure in hotels and tours; verify included services before paying premium “green” rates.',
    category: 'destinations',
    location: { country: 'United Arab Emirates', city: 'Dubai', countryCode: 'AE' },
    severity: 'low',
    status: 'update',
    articleStatus: 'active',
    publishedAt: '2026-03-20T11:00:00Z',
    updatedAt: '2026-03-21T08:05:00Z',
    tl_dr: [
      'Dubai: tourism operators face updated sustainability criteria and reporting expectations.',
      'Hotels and attractions may adjust offerings, fees, and disclosures during compliance rollout.',
      'Travelers gain clearer environmental transparency but should verify what is actually included.',
      'Premium pricing is likely where upgrades are bundled as sustainability packages.',
    ],
    body: [
      'Dubai tourism authorities announced strengthened sustainability standards affecting hospitality, attractions, and selected transport-linked experiences. The framework emphasizes measurable resource efficiency and clearer public-facing disclosures.',
      'For visitors, service quality impact should be neutral to positive, but package structure may change while providers align product descriptions and cost components. Green-labeled tiers should be compared on deliverables, not label alone.',
      'FAQ:\n\n**Q1: Will this make Dubai trips more expensive?**\nA: Some properties may reprice packages during rollout.\n\n**Q2: Are all hotels required immediately?**\nA: Implementation is typically phased by compliance schedule.\n\n**Q3: What should travelers verify?**\nA: Included amenities, transfer terms, and cancellation policy.',
    ],
    whatThisMeans: 'Main impact is product clarity and potential repricing. Travelers should compare value by concrete inclusions and keep flexible bookings during transition periods.',
    whatChanged: 'Dubai authorities published stronger sustainability criteria and operator reporting expectations for tourism services.',
    whoIsAffected: 'Leisure and business visitors booking hotels, tours, and event packages in Dubai; travel advisors managing premium and ESG-focused itineraries.',
    whatToDo: '1) Ask properties to list sustainability features in writing before payment.\n2) Compare package inclusions line-by-line across suppliers.\n3) Prioritize refundable rates while standards are phased in.\n4) Keep invoices with itemized service details for reimbursement claims.\n\nACTION REQUIRED: Re-verify inclusions for any Dubai booking made in the last 7 days.',
    sources: [
      { name: 'Dubai Department of Economy and Tourism', url: 'https://www.dubaitourism.gov.ae/en', isOfficial: true },
      { name: 'Visit Dubai', url: 'https://www.visitdubai.com', isOfficial: true },
      { name: 'UAE Ministry of Climate Change and Environment', url: 'https://www.moccae.gov.ae/en', isOfficial: true },
    ],
    impactRegions: ['Dubai', 'UAE'],
    relatedArticles: ['paris-olympics-aftermath-hotel-occupancy-drop', 'global-passport-ranking-2025-shifting-power', 'mediterranean-heatwave-travel-advisory'],
  },
  {
    id: '6',
    slug: 'paris-olympics-aftermath-hotel-occupancy-drop',
    title: 'Paris Olympics Aftermath: Hotel Occupancy Drop',
    summary: 'TL;DR: Post-event occupancy softening opens better-value booking windows; compare flexible rates before locking prepaid deals.',
    category: 'hotels',
    location: { country: 'France', city: 'Paris', countryCode: 'FR' },
    severity: 'low',
    status: 'price-change',
    articleStatus: 'active',
    publishedAt: '2026-03-19T14:20:00Z',
    updatedAt: '2026-03-21T07:20:00Z',
    tl_dr: [
      'Paris: post-Olympic demand normalization has reduced occupancy in several hotel segments.',
      'Rate softening is strongest outside immediate landmark districts and weekend spikes.',
      'Travelers can secure stronger cancellation terms and upgrades in shoulder windows.',
      'Group and event travelers still face compression on selected convention dates.',
    ],
    body: [
      'Following peak Olympic demand, Paris hotel occupancy has moved toward normalized levels with visible softening across midscale and selected upscale inventory. This rebalances negotiation power toward travelers in non-event periods.',
      'The market remains uneven by district and date: central landmarks and event-linked weekends still price above average, while peripheral and business-heavy zones show more negotiable inventory and package extras.',
      'FAQ:\n\n**Q1: Is Paris cheap now?**\nA: Not universally; value improves mainly outside peak pockets.\n\n**Q2: Should I choose refundable rates first?**\nA: Yes, then reprice closer to stay dates.\n\n**Q3: Are group rates easier now?**\nA: Often yes, except around major conference blocks.',
    ],
    whatThisMeans: 'This is a buyer-opportunity window with selective constraints. Travelers can reduce cost by prioritizing flexible rates, district trade-offs, and midweek stays.',
    whatChanged: 'Occupancy cooled after Olympics-era highs, creating more available inventory and softer pricing in multiple submarkets.',
    whoIsAffected: 'City-break travelers, families, and business visitors to Paris; strongest benefit for flexible-date bookings outside major venue zones.',
    whatToDo: '1) Compare at least three districts including rail-connected outer areas.\n2) Book flexible rates first and reprice weekly until cancellation deadline.\n3) Avoid non-refundable bundles unless discount is substantial.\n4) Confirm local event calendar before finalizing weekend stays.\n\nACTION REQUIRED: Reprice your Paris hotel booking now if your stay is within the next 60 days.',
    sources: [
      { name: 'Paris Convention and Visitors Bureau', url: 'https://parisjetaime.com/eng/', isOfficial: true },
      { name: 'INSEE Tourism Indicators', url: 'https://www.insee.fr/en/statistiques', isOfficial: true },
      { name: 'STR Market Insights', url: 'https://str.com', isOfficial: false },
    ],
    impactRegions: ['Paris', 'Île-de-France'],
    relatedArticles: ['dubai-tourism-authority-sustainability-standards', 'mediterranean-heatwave-travel-advisory', 'london-heathrow-ground-staff-strike-march-15-17'],
  },
  {
    id: '7',
    slug: 'thailand-digital-nomad-visa-2-0',
    title: 'Thailand Introduces Digital Nomad Visa 2.0',
    summary: 'ACTION REQUIRED: Verify income, insurance, and stay-length rules before booking long-stay accommodation in Thailand.',
    category: 'visa',
    location: { country: 'Thailand', countryCode: 'TH' },
    severity: 'medium',
    status: 'update',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-20T09:40:00Z',
    updatedAt: '2026-03-21T08:15:00Z',
    tl_dr: [
      'Thailand: updated digital nomad visa framework refines eligibility, duration, and renewal conditions.',
      'Documentation focus includes income proof, health coverage, and compliant remote-work purpose.',
      'Processing pathways differ by embassy/consulate and may vary by nationality.',
      'Applicants with incomplete supporting files face avoidable delays and re-submission cycles.',
    ],
    body: [
      'Thai authorities introduced a revised digital nomad visa pathway aimed at attracting longer-stay remote professionals while tightening eligibility consistency. Core checks now emphasize financial sustainability, insurance coverage, and documented remote-work status.',
      'For applicants, the main risk is procedural rather than legal uncertainty: inconsistent documentation across bank statements, contracts, and accommodation plans can trigger delay or rejection. Early file preparation materially improves approval predictability.',
      'FAQ:\n\n**Q1: Can I work for a foreign employer under this visa?**\nA: Typically yes, within the defined remote-work scope and conditions.\n\n**Q2: Is approval centralized?**\nA: No, processing details can vary across missions.\n\n**Q3: Should I book long-term housing first?**\nA: Prefer refundable or short initial bookings until visa status is confirmed.',
    ],
    whatThisMeans: 'This is an opportunity for legal long-stay planning, but success depends on document quality and timing. Treat application prep as a project with checklist control.',
    whatChanged: 'Digital nomad visa rules were updated with clearer eligibility, stronger document standards, and revised stay mechanics.',
    whoIsAffected: 'Remote workers, freelancers, startup founders, and long-stay travelers considering Thailand as a temporary work base.',
    whatToDo: '1) Confirm latest eligibility and document list from your responsible Thai mission.\n2) Prepare coherent income proof, insurance, and remote-work evidence.\n3) Use refundable accommodation for the initial arrival period.\n4) Keep notarized/translated copies where mission guidance requests it.\n\nACTION REQUIRED: Start document pack assembly before making non-refundable long-stay commitments.',
    sources: [
      { name: 'Royal Thai Embassy Portal', url: 'https://www.thaiembassy.org', isOfficial: true },
      { name: 'Thailand Ministry of Foreign Affairs', url: 'https://www.mfa.go.th/en', isOfficial: true },
      { name: 'Thailand Board of Investment', url: 'https://www.boi.go.th/index.php?page=visa_service', isOfficial: true },
    ],
    impactRegions: ['Bangkok', 'Chiang Mai', 'Phuket', 'Thailand'],
    relatedArticles: ['japan-eta-visa-free-travelers', 'global-passport-ranking-2025-shifting-power', 'norway-northern-lights-season-extended'],
  },
  {
    id: '8',
    slug: 'iceland-volcano-eruption-disrupts-air-travel',
    title: 'Iceland Volcano Eruption Disrupts Air Travel',
    summary: 'ACTION REQUIRED: If traveling via Keflavik or North Atlantic connections, verify flight and reroute options before airport departure.',
    category: 'flights',
    location: { country: 'Iceland', city: 'Reykjanes', countryCode: 'IS' },
    severity: 'high',
    status: 'disruption',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-20T05:50:00Z',
    updatedAt: '2026-03-21T08:25:00Z',
    tl_dr: [
      'Iceland: volcanic activity near Reykjanes has created intermittent airspace and ground-operations constraints.',
      'Keflavik-bound and transatlantic connector itineraries face delay and selective cancellation risk.',
      'Ash and gas monitoring updates can change operational status quickly.',
      'Rebooking pressure is highest during morning Europe departures and evening transatlantic banks.',
    ],
    body: [
      'Civil protection and aviation authorities in Iceland issued active advisories as volcanic activity affected operations around the Reykjanes area. While total shutdown has not been constant, intermittent restrictions created rolling schedule instability.',
      'The disruption pattern is dynamic: routes may reopen and tighten within short windows depending on plume behavior and safety thresholds. Travelers with one-ticket intercontinental transfers have better protection than separately ticketed segments.',
      'FAQ:\n\n**Q1: Is KEF closed?**\nA: Not continuously; status can change by hour and sector.\n\n**Q2: Should I cancel independently?**\nA: Usually wait for airline options first to preserve protections.\n\n**Q3: What is the weak point in itineraries?**\nA: Separate tickets with short layovers and no through-check.',
    ],
    whatThisMeans: 'Treat this as a live-operations event. Practical risk is missed connections and overnight displacement, not just departure delay. Build same-day fallback plans now.',
    whatChanged: 'Authorities elevated operational monitoring and carriers adjusted schedules due to renewed volcanic activity impacts near Reykjanes.',
    whoIsAffected: 'Passengers departing/arriving via KEF, North Atlantic connectors, and travelers using separate tickets across Europe-US/Canada routes.',
    whatToDo: '1) Check airline app and airport advisories 12h, 6h, and 2h before departure.\n2) Request protected rerouting if your connection margin is under 120 minutes.\n3) Keep essentials in cabin baggage and save all disruption receipts.\n4) Avoid voluntary cancellations until carrier options are confirmed.\n\nACTION REQUIRED: Secure a protected backup routing before your travel day begins.',
    sources: [
      { name: 'Icelandic Meteorological Office', url: 'https://en.vedur.is', isOfficial: true },
      { name: 'Isavia Keflavik Airport Updates', url: 'https://www.isavia.is/en/keflavik-airport', isOfficial: true },
      { name: 'Iceland Department of Civil Protection', url: 'https://www.almannavarnir.is/english', isOfficial: true },
    ],
    impactRegions: ['Reykjanes Peninsula', 'Keflavik Airport', 'North Atlantic Air Corridors'],
    relatedArticles: ['london-heathrow-ground-staff-strike-march-15-17', 'santorini-volcanic-uplift-tourism-review', 'mediterranean-heatwave-travel-advisory'],
  },
  {
    id: '9',
    slug: 'mediterranean-heatwave-travel-advisory',
    title: 'Mediterranean Heatwave Travel Advisory',
    summary: 'ACTION REQUIRED: Shift outdoor activities to early/late hours and confirm hotel cooling and transport contingency plans.',
    category: 'weather',
    location: { country: 'Mediterranean Region', countryCode: 'UN' },
    severity: 'high',
    status: 'warning',
    articleStatus: 'ongoing',
    publishedAt: '2026-03-19T13:10:00Z',
    updatedAt: '2026-03-21T08:10:00Z',
    tl_dr: [
      'Mediterranean: early-season heatwave conditions are increasing health and infrastructure stress across multiple destinations.',
      'Peak daytime exposure raises dehydration and heat-exhaustion risk, especially for children and older travelers.',
      'Transport and attraction operators may reduce midday service or queue capacity.',
      'Urban heat islands and wildfire-sensitive zones require daily risk checks.',
    ],
    body: [
      'Meteorological services across Southern Europe are tracking an unusual heat episode with above-seasonal daytime highs and warm overnight lows. The travel effect is cumulative: reduced recovery at night and higher daytime fatigue can compromise itineraries quickly.',
      'City sightseeing and outdoor excursions are most impacted between late morning and early evening. Travelers who adapt timing, hydration strategy, and transport backups can continue trips safely in most areas.',
      'FAQ:\n\n**Q1: Should I cancel Mediterranean travel?**\nA: Not generally; adapt schedule and safety planning.\n\n**Q2: Who is highest risk?**\nA: Older adults, young children, and travelers with chronic conditions.\n\n**Q3: What fails first in plans?**\nA: Midday outdoor blocks and long unshaded queue segments.',
    ],
    whatThisMeans: 'Main risk is health strain and schedule degradation. You can still travel, but success depends on heat-aware planning and conservative daytime exposure.',
    whatChanged: 'Regional agencies upgraded heat advisories and issued broader traveler guidance as temperature anomalies expanded geographically.',
    whoIsAffected: 'Summer city-break tourists, cruise passengers, families, and outdoor-activity travelers across Southern Europe and eastern Mediterranean corridors.',
    whatToDo: '1) Move walking tours and excursions to pre-11:00 or post-18:00 slots.\n2) Carry electrolytes, sun protection, and refillable water at all times.\n3) Confirm air-conditioning reliability in accommodation and transfers.\n4) Monitor local wildfire and heat alerts daily in destination apps.\n\nACTION REQUIRED: Redesign tomorrow\'s itinerary around heat-safe time blocks tonight.',
    sources: [
      { name: 'Copernicus Climate Change Service', url: 'https://climate.copernicus.eu', isOfficial: true },
      { name: 'Meteo-France', url: 'https://meteofrance.com', isOfficial: true },
      { name: 'AEMET Spain', url: 'https://www.aemet.es/en/portada', isOfficial: true },
    ],
    impactRegions: ['Spain', 'France', 'Italy', 'Greece', 'Mediterranean Basin'],
    relatedArticles: ['santorini-volcanic-uplift-tourism-review', 'norway-northern-lights-season-extended', 'paris-olympics-aftermath-hotel-occupancy-drop'],
  },
  {
    id: '10',
    slug: 'norway-northern-lights-season-extended',
    title: 'Norway Northern Lights Season Extended',
    summary: 'TL;DR: Extended aurora-viewing viability improves booking flexibility, but weather and cloud windows still determine actual visibility.',
    category: 'destinations',
    location: { country: 'Norway', city: 'Tromsø', countryCode: 'NO' },
    severity: 'low',
    status: 'update',
    articleStatus: 'active',
    publishedAt: '2026-03-20T15:30:00Z',
    updatedAt: '2026-03-21T08:35:00Z',
    tl_dr: [
      'Norway: operators report viable northern-lights viewing windows extending later than typical season assumptions.',
      'Shoulder-period bookings may offer better availability and lower crowd pressure than peak winter dates.',
      'Cloud cover and geomagnetic activity remain the final visibility gatekeepers.',
      'Travelers should prioritize flexible tours with same-day weather optimization.',
    ],
    body: [
      'Tourism operators and regional forecasting channels in Northern Norway indicate stronger late-season viability for aurora experiences this year. This does not guarantee sightings, but it widens practical planning windows beyond peak assumptions.',
      'The best outcomes continue to depend on cloud breaks, darkness, and geomagnetic conditions rather than calendar date alone. Travelers who build flexibility into evening transport and tour sequencing see better success rates.',
      'FAQ:\n\n**Q1: Does extended season mean guaranteed aurora?**\nA: No, weather and solar activity still control visibility.\n\n**Q2: Is Tromsø the only good base?**\nA: No, several Northern Norway corridors can perform well.\n\n**Q3: Should I prebook every night tour?**\nA: Keep at least one flexible night for forecast-led optimization.',
    ],
    whatThisMeans: 'This improves option value for travelers who missed peak months. Practical success still requires weather-driven decisions and flexible tour timing.',
    whatChanged: 'Operators adjusted guidance to reflect later-season viewing opportunities supported by current activity and local conditions.',
    whoIsAffected: 'Leisure travelers planning aurora trips, photographers, and shoulder-season visitors to Northern Norway.',
    whatToDo: '1) Choose bookings with re-schedule or weather-flex options.\n2) Track cloud and aurora forecasts daily before tour departure.\n3) Prioritize dark-sky locations away from city light spill.\n4) Keep cold-weather gear and backup indoor activities ready.\n\nACTION REQUIRED: Re-optimize your aurora tour sequence 24 hours before each outing.',
    sources: [
      { name: 'Visit Norway', url: 'https://www.visitnorway.com', isOfficial: true },
      { name: 'Norwegian Meteorological Institute', url: 'https://www.met.no/en', isOfficial: true },
      { name: 'Tromsø Official Travel Guide', url: 'https://www.visittromso.no', isOfficial: true },
    ],
    impactRegions: ['Tromsø', 'Northern Norway', 'Arctic Circle Norway'],
    relatedArticles: ['mediterranean-heatwave-travel-advisory', 'thailand-digital-nomad-visa-2-0', 'global-passport-ranking-2025-shifting-power'],
  },
]

export const articleHeroImages: Record<string, HeroImage> = {
  'london-heathrow-ground-staff-strike-march-15-17': {
    src: 'http://89.167.53.202/processed/hero/test-image.jpg',
    alt: 'Heathrow',
  },
  'japan-eta-visa-free-travelers': {
    src: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1600&q=80',
    alt: 'Tokyo skyline at dusk',
  },
  'santorini-volcanic-uplift-tourism-review': {
    src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80',
    alt: 'Santorini cliffside and caldera view',
  },
  'global-passport-ranking-2025-shifting-power': {
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80',
    alt: 'Passport and boarding pass on travel map',
  },
  'dubai-tourism-authority-sustainability-standards': {
    src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Dubai skyline with modern buildings',
  },
  'paris-olympics-aftermath-hotel-occupancy-drop': {
    src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    alt: 'Paris skyline with Eiffel Tower',
  },
  'thailand-digital-nomad-visa-2-0': {
    src: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=80',
    alt: 'Bangkok city skyline and river at sunset',
  },
  'iceland-volcano-eruption-disrupts-air-travel': {
    src: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?auto=format&fit=crop&w=1600&q=80',
    alt: 'Iceland volcanic landscape with smoke plume',
  },
  'mediterranean-heatwave-travel-advisory': {
    src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=80',
    alt: 'Mediterranean coast under bright summer sun',
  },
  'norway-northern-lights-season-extended': {
    src: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1600&q=80',
    alt: 'Northern lights over snowy Norwegian landscape',
  },
}

export const articleInlineMedia: Record<string, InlineMedia[]> = {
  'london-heathrow-ground-staff-strike-march-15-17': [
    {
      id: 'lhr-terminal-map',
      type: 'map',
      src: 'https://www.google.com/maps?q=Heathrow+Airport&output=embed',
      title: 'Heathrow Airport map',
      caption: 'Terminal context map for disruption planning.',
    },
  ],
  'japan-eta-visa-free-travelers': [
    {
      id: 'japan-eta-flow',
      type: 'chart',
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      title: 'ETA processing timeline',
      caption: 'Planning buffer visual for pre-departure document checks.',
    },
  ],
  'santorini-volcanic-uplift-tourism-review': [
    {
      id: 'santorini-map',
      type: 'map',
      src: 'https://www.google.com/maps?q=Santorini,Greece&output=embed',
      title: 'Santorini map',
      caption: 'Island map for port, airport, and contingency routing context.',
    },
  ],
  'global-passport-ranking-2025-shifting-power': [
    {
      id: 'global-passport-chart',
      type: 'chart',
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      title: 'Global passport mobility chart',
      caption: 'Placeholder infographic illustrating mobility ranking shifts.',
    },
  ],
  'dubai-tourism-authority-sustainability-standards': [
    {
      id: 'dubai-map',
      type: 'map',
      src: 'https://www.google.com/maps?q=Dubai,United+Arab+Emirates&output=embed',
      title: 'Dubai map',
      caption: 'City map for hotel district and attraction planning.',
    },
  ],
  'paris-olympics-aftermath-hotel-occupancy-drop': [
    {
      id: 'paris-map',
      type: 'map',
      src: 'https://www.google.com/maps?q=Paris,France&output=embed',
      title: 'Paris map',
      caption: 'District overview for post-event hotel pricing comparisons.',
    },
  ],
  'thailand-digital-nomad-visa-2-0': [
    {
      id: 'thailand-map',
      type: 'map',
      src: 'https://www.google.com/maps?q=Thailand&output=embed',
      title: 'Thailand map',
      caption: 'Country map highlighting common long-stay base locations.',
    },
  ],
  'iceland-volcano-eruption-disrupts-air-travel': [
    {
      id: 'iceland-map',
      type: 'map',
      src: 'https://www.google.com/maps?q=Iceland&output=embed',
      title: 'Iceland map',
      caption: 'Route context for Keflavik and Reykjanes travel planning.',
    },
  ],
  'mediterranean-heatwave-travel-advisory': [
    {
      id: 'mediterranean-region-chart',
      type: 'chart',
      src: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
      title: 'Mediterranean regional heat map',
      caption: 'Placeholder regional visual for heatwave-affected corridors.',
    },
  ],
  'norway-northern-lights-season-extended': [
    {
      id: 'norway-map',
      type: 'map',
      src: 'https://www.google.com/maps?q=Norway&output=embed',
      title: 'Norway map',
      caption: 'Map context for northern lights routes across Norway.',
    },
  ],
}

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
