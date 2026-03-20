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
      'London Heathrow: Storm Horus has caused 120+ flight cancellations with 2-4 hour delays on remaining flights, affecting both domestic UK and international routes.',
      'British Airways, Virgin Atlantic, and American Airlines are most affected, with combined cancellations exceeding 127 flights as of 10pm GMT.',
      'Rebooking fees waived for affected passengers — contact your airline directly for alternative routing through Gatwick, Stansted, or Luton.',
    ],
    body: [
      'Storm Horus made landfall on the south coast of England at approximately 6:00 AM GMT on March 19, bringing wind gusts of up to 70 mph (112 km/h) along the English Channel. The Met Office issued a rare Red Weather Warning for the London area, indicating a danger to life from flying debris and potential damage to buildings. Heathrow Airport, typically handling over 1,300 flights daily, immediately began experiencing significant disruptions as visibility dropped below safe landing minimums during the peak morning travel window.',
      'The cancellations have created a cascade effect throughout European air travel, with connecting flights from Frankfurt, Paris, and Amsterdam also being affected. Passengers scheduled for morning departures reported waits of up to 6 hours at airport lounges before official cancellations were announced. British Airways activated its severe weather contingency plan, deploying additional customer service staff and opening temporary rebooking counters in Terminal 5. Virgin Atlantic offered affected passengers complimentary date changes for travel within the next 14 days.',
      'The aviation disruption coincides with the start of the Easter school holiday period in the UK, traditionally one of the busiest travel times of the year. An estimated 2.1 million British travelers had departures scheduled from UK airports over the next week. Gatwick Airport reported a 40% increase in inquiries from displaced Heathrow passengers, though its own operations remained largely normal. Transport for London deployed additional rail services on the Heathrow Express and Piccadilly line to accommodate passengers attempting to reach alternative airports.',
    ],
    whatThisMeans: 'If you\'re flying to or from London Heathrow today or tomorrow, expect significant delays or cancellations. Wind gusts up to 70mph have forced runway closures. Consider rerouting through other London airports or travelling tomorrow if your trip isn\'t urgent.',
    whatChanged: 'British Airways, Virgin Atlantic, and American Airlines have cancelled a combined 127 flights. Wind gusts up to 70mph have forced runway closures. Air traffic control imposing flow restrictions across UK airspace.',
    whoIsAffected: 'Passengers travelling to/from London Heathrow (LHR) on March 19-20. Particularly affected: transatlantic routes, European connections, and domestic UK flights. Rail alternatives may be available.',
    whatToDo: 'If your flight is cancelled: (1) Download your airline\'s app NOW for real-time rebooking access. (2) Call the airline\'s dedicated severe weather line — hold times are 45-90 minutes but app rebooking is faster. (3) Consider Gatwick Express or Stansted Express as alternative London airports — many airlines have capacity. (4) Keep all receipts for meals and accommodation if stranded overnight — airlines are compensating for weather-related delays over 4 hours. (5) Check your travel insurance policy — many cover accommodation and rebooking costs for weather disruptions.',
    sources: [
      { name: 'Heathrow Airport Official', url: 'https://www.heathrow.com', isOfficial: true, lastUpdated: '2026-03-19T22:00:00Z', type: 'official' },
      { name: 'NATs Air Traffic Control', url: 'https://www.nats.aero', isOfficial: true, lastUpdated: '2026-03-19T21:30:00Z', type: 'official' },
      { name: 'Met Office Weather Warnings', url: 'https://www.metoffice.gov.uk', isOfficial: true, lastUpdated: '2026-03-19T20:00:00Z', type: 'official' },
      { name: 'BBC Travel News', url: 'https://bbc.com/travel', lastUpdated: '2026-03-19T21:00:00Z', type: 'news' },
    ],
    impactRegions: ['London', 'Southeast England', 'East England'],
    relatedArticles: ['tokyo-cherry-blossom-season-tourism-surge', 'paris-olympics-2024-airbnb-regulations'],
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
      'Japan: eVISA becomes mandatory for tourists from visa-exempt countries starting April 1 — apply at least 2 weeks before travel to avoid boarding denials.',
      'The eVISA approval takes 5-7 business days to process — travellers without approved eVISA will be denied boarding at departure airports.',
      'Citizens of USA, UK, Canada, Australia, France, Germany, and Singapore are among the 68 countries now requiring pre-approval.',
    ],
    body: [
      'The Japanese Ministry of Foreign Affairs announced the mandatory eVISA requirement on March 5, giving affected travellers less than 4 weeks to adapt their travel plans. The new system applies to citizens of 68 countries who previously enjoyed visa-free entry for stays up to 90 days. Under the new rules, all tourists must submit their application through the dedicated eVISA portal (evisa.mofa.go.jp), providing passport details, planned itinerary, accommodation bookings, and proof of return travel. The application fee is 3,000 yen (approximately $20 USD) and is non-refundable even if approval is denied.',
      'Immigration experts report that the eVISA system uses automated risk assessment algorithms that cross-reference applicant data with international security databases. Approximately 3-5% of applications are flagged for manual review, which can extend processing time to 10 business days. Common reasons for rejection include incomplete itinerary information, accommodation bookings that cannot be verified, and discrepancies between passport names and booking details. Applicants are strongly advised to double-check all information before submission and to use only officially listed accommodation partners.',
      'The timing of this policy change is particularly significant as Japan enters its peak sakura (cherry blossom) season, typically the most popular period for international tourism. Major airlines including Japan Airlines, All Nippon Airways, and Delta have begun announcing the new requirement at check-in counters and through booking confirmation emails. Travel agencies report a surge in eVISA consultation requests, with some charging service fees of $50-100 to assist with applications. The Japan National Tourism Organization has published multilingual application guides in English, Korean, and Simplified Chinese to help first-time visitors navigate the process.',
    ],
    whatThisMeans: 'If you\'re planning a trip to Japan from a visa-exempt country, you now need to apply for eVISA approval before you fly. This adds 1-2 weeks to your planning timeline. Start your application immediately if travelling after April 1 to ensure approval before departure.',
    whatChanged: 'The eVISA platform replaces the current stamp-on-arrival system. Tourists must submit passport details, travel itinerary, and accommodation bookings online before departure. Approval required before boarding flights.',
    whoIsAffected: 'Citizens of 68 countries previously eligible for visa-free entry to Japan. Major markets affected: USA, UK, Canada, Australia, France, Germany, Singapore. Business travellers may qualify for different visa categories.',
    whatToDo: 'Document checklist for Japan eVISA: (1) Valid passport with 6+ months validity beyond your return date. (2) Round-trip flight confirmation with airline confirmation numbers. (3) Hotel bookings for every night of stay — Airbnb may not be accepted. (4) Detailed day-by-day itinerary showing planned activities. (5) Recent passport photo (4.5cm x 4.5cm, white background) in digital format. (6) Credit card for the 3,000 yen application fee. Apply 3 weeks before travel to allow buffer for potential delays.',
    sources: [
      { name: 'Ministry of Foreign Affairs Japan', url: 'https://www.mofa.go.jp', isOfficial: true, lastUpdated: '2026-03-19T09:00:00Z', type: 'official' },
      { name: 'Japan eVISA Portal', url: 'https://evisa.mofa.go.jp', isOfficial: true, lastUpdated: '2026-03-19T18:00:00Z', type: 'official' },
      { name: 'Japan Times News', url: 'https://japantimes.co.jp', lastUpdated: '2026-03-19T12:00:00Z', type: 'news' },
    ],
    impactRegions: ['Tokyo', 'Osaka', 'Kyoto', 'All Japan'],
    relatedArticles: ['tokyo-cherry-blossom-season-tourism-surge', 'thailand-safety-advisory-southern-regions'],
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
      'Dubai: Hotel prices have surged 45% this spring break — mid-range hotels now average $250/night with 5-star properties averaging $450/night.',
      'Ramadan has reduced hotel supply as some properties close for renovations, compounding the spring break demand surge through mid-April.',
      'Abu Dhabi hotels are 30% cheaper on average and only 90 minutes away — consider staying there and day-tripping to Dubai to save significantly.',
    ],
    body: [
      'The confluence of peak spring break travel from European and North American markets, combined with reduced hotel inventory during Ramadan, has created unprecedented pricing pressure in Dubai\'s hospitality sector. STR Global, which tracks hotel performance data worldwide, reports that average daily rates for 4-star hotels reached $249 during the first week of March, up from $172 the same period last year. Five-star properties in areas like Dubai Marina, Jumeirah Beach, and Downtown Dubai are now commanding rates exceeding $450 per night, with the Burj Al Arab reportedly sold out for most dates through April 15.',
      'Ramadan, which began at sunset on March 10, has changed the operational landscape for many hotels and tourist-facing businesses. Several larger hotel complexes chose this period to close for annual maintenance and renovation, reasoning that reduced daytime tourism during the holy month made economic sense. Restaurants in hotels remain open but many operate with modified hours and reduced menus. The Dubai Department of Economy and Tourism has introduced a "Ramadan in Dubai" initiative highlighting Iftar tent experiences and evening suhoor offerings to help tourists engage with local culture despite altered daytime operations.',
      'Travel insurance providers and credit card trip protection services are reporting increased claims related to Dubai bookings, as some travellers discover post-booking that their intended itineraries are significantly impacted by Ramadan schedules. Diving operators, desert safari companies, and water parks have all reduced operating hours, with some closing on certain days entirely. The Abu Dhabi Tourism Authority has launched a counter-campaign positioning their emirate as a "Ramadan-friendly alternative" with full daily operations, including alcohol service at licensed venues, unchanged throughout the period.',
    ],
    whatThisMeans: 'Visiting Dubai during spring break (March 15 - April 15) will cost significantly more than usual. Budget-minded travellers should either book immediately to lock in current rates, or consider Abu Dhabi as a base. Apartment hotels and vacation rentals may offer better value than traditional hotels.',
    whatChanged: 'Average daily rates for 4-star hotels jumped from $172 to $249. 5-star properties now average $450/night. Shorter booking windows are driving dynamic pricing. Ramadan reduced supply further as some properties use the low season for renovations.',
    whoIsAffected: 'Spring break travellers (March 15 - April 15) to Dubai. Budget-conscious families most impacted. Business travellers may find better corporate rates through their companies. Digital nomads with long-term bookings may face renewal sticker shock.',
    whatToDo: 'Dubai spring break booking strategy: (1) If you haven\'t booked — look at Abu Dhabi or Ras Al Khaimah for 30-40% savings with free intercity shuttles available. (2) Use points aggressively — Marriott, Hilton, and IHG are all offering boosted redemptions during peak period. (3) Consider apartment hotels (Adagio, Somerset) which aren\'t classified as hotels and may avoid surcharges. (4) Book afternoon activities in advance — desert safaris and boat tours are filling up 3-5 days ahead. (5) Look at weekday check-ins (Sunday-Tuesday) for 15-20% lower rates than Thursday-Saturday.',
    sources: [
      { name: 'STR Hotel Data', url: 'https://str.com', lastUpdated: '2026-03-19T08:00:00Z', type: 'news' },
      { name: 'Booking.com Trends', url: 'https://news.booking.com', lastUpdated: '2026-03-18T16:00:00Z', type: 'news' },
      { name: 'UAE Tourism Board', url: 'https://visitabudhabi.ae', isOfficial: true, lastUpdated: '2026-03-19T10:00:00Z', type: 'official' },
    ],
    impactRegions: ['Dubai', 'Abu Dhabi'],
    relatedArticles: ['paris-olympics-2024-airbnb-regulations', 'tokyo-cherry-blossom-season-tourism-surge'],
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
      'Thailand: US State Department has upgraded travel advisory to Level 3 (Reconsider Travel) for Songkhla, Narathiwat, Yala, and Pattani provinces.',
      'Bangkok, Chiang Mai, Phuket, Koh Samui, and most tourist islands remain safe with no change to current travel advice — popular destinations unaffected.',
      'Some Malaysia-Thailand border crossings are temporarily closed — verify status before attempting land border travel between the two countries.',
    ],
    body: [
      'The US Embassy in Bangkok issued the elevated travel advisory on March 16 following a series of security incidents in Thailand\'s southern border provinces that have claimed 8 lives and injured more than 30 people since February. The advisory specifically cites concerns about bombings, shootings, and armed clashes between Thai security forces and separatist groups in the Malay-speaking regions of Pattani, Yala, Narathiwat, and parts of Songkhla. The UK Foreign, Commonwealth & Development Office (FCDO) issued similar guidance, advising against all but essential travel to the immediate border areas.',
      'Thai authorities have acknowledged the security challenges but emphasise that the affected areas represent less than 2% of Thailand\'s land area and virtually none of its major tourist destinations. The Royal Thai Police have deployed an additional 3,000 officers to the southern region and established additional checkpoints on major highways. Government spokesperson Krisada Kiatpon stated that the government is "committed to ensuring the safety of all residents and visitors" and that popular tourist areas in the south, including the resort island of Koh Samui and the diving paradise of Koh Tao, remain completely unaffected by the advisory.',
      'Travel insurance providers are closely monitoring the situation. Several major insurers, including Allianz Travel and World Nomads, have indicated they may deny claims for incidents occurring in the Level 3-designated provinces unless travellers have explicitly notified the insurer of their presence there and paid any required surcharges. Travellers with existing policies are advised to review their coverage carefully and consider whether their planned itinerary actually takes them anywhere near the affected provinces. The Thai tourism industry, still recovering from years of pandemic-related disruptions, is particularly concerned about the potential economic impact of the advisory during the high season.',
    ],
    whatThisMeans: 'If you\'re heading to southern Thailand near the Malaysian border, you should reassess whether your trip is necessary. The security situation has deteriorated, and the US government has limited ability to assist travellers in these areas. Popular tourist destinations elsewhere in Thailand are unaffected.',
    whatChanged: 'Advisory upgraded from Level 2 (Exercise Caution) to Level 3 (Reconsider Travel) for 4 southern provinces. Increased military presence reported. Some border crossings to Malaysia temporarily closed. Travel insurance premiums for the region are likely to increase.',
    whoIsAffected: 'Travellers planning visits to southern Thailand provinces, especially those near the Malaysian border. Package tours may be rerouted. Dive operators in the southern region may see cancellations. Adventure tourists heading to border areas most at risk.',
    whatToDo: 'Safety checklist for Thailand travel: (1) Verify your destination is NOT in Songkhla, Narathiwat, Yala, or Pattani provinces — check your hotel\'s exact location. (2) Register with the US Smart Traveler Enrollment Program (STEP) at step.state.gov for real-time safety alerts. (3) Review your travel insurance policy NOW — confirm it covers Thailand and check whether the southern provinces require disclosure. (4) Save emergency contacts: US Embassy Bangkok +66-2-207-8200 (24/7). (5) Download offline maps of your area — cell service can be unreliable in some southern regions. (6) If visiting any area near the Malaysian border, inform someone of your plans and check in regularly.',
    sources: [
      { name: 'US State Department Travel Advisory', url: 'https://travel.state.gov', isOfficial: true, lastUpdated: '2026-03-19T08:00:00Z', type: 'official' },
      { name: 'UK FCDO Travel Advice', url: 'https://gov.uk/foreign-travel-advice/thailand', isOfficial: true, lastUpdated: '2026-03-19T08:00:00Z', type: 'official' },
      { name: 'Bangkok Post', url: 'https://bangkokpost.com', lastUpdated: '2026-03-19T06:00:00Z', type: 'news' },
    ],
    impactRegions: ['Songkhla', 'Narathiwat', 'Yala', 'Pattani', 'Southern Thailand Border'],
    relatedArticles: ['japan-visa-entry-requirements-update', 'paris-olympics-2024-airbnb-regulations'],
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
      'Paris: New regulations now cap Airbnb rentals at 120 days/year in central districts — many hosts exceed this and face €10,000 fines for violations.',
      'Hotels in outer arrondissements are booking up fast — Paris hotel demand expected to increase 15% during Olympics with limited availability.',
      'Book accommodations immediately if travelling during the Paris Olympics (July 26-August 11) — verify your host has proper registration to avoid cancellations.',
    ],
    body: [
      'The Paris City Council unanimously passed the emergency short-term rental regulation package on March 12, responding to mounting complaints from permanent residents about housing shortages and neighbourhood disruption. The new rules require all Paris listings on platforms like Airbnb, Vrbo, and Booking.com to display a unique registration number issued by the Maison des Lithographies. Properties in the 1st through 4th arrondissements (covering the Marais, Louvre, and Latin Quarter) face the strictest rules: primary residences limited to 120 nights per year, secondary residences limited to just 90 nights. Properties exceeding these limits face fines of €10,000 per offence, with the platform itself also liable for listing unregistered properties.',
      'Industry analysts estimate that approximately 30% of current Paris Airbnb listings exceed the annual night limits, meaning tens of thousands of existing bookings could be cancelled before the Olympics begin. Airbnb has announced it will automatically cancel any bookings for unregistered properties once the enforcement period begins on June 1. The company has also committed to a "Olympic Guarantee" providing full refunds to travellers whose bookings are cancelled due to regulatory issues. However, affected travellers report difficulty finding comparable alternatives at comparable prices as other Paris accommodations have already increased rates in anticipation of Olympic demand.',
      'The regulation is part of a broader trend across European cities attempting to balance tourism growth with housing affordability for residents. Barcelona, Amsterdam, and Berlin have all introduced similar measures in recent years. Paris hotel operators, who face no equivalent cap on room rates, are reporting occupancy projections of 95%+ throughout the Olympic period. Major hotel chains including Accor, Marriott, and Hyatt have indicated standard rates will be significantly higher than their usual Paris pricing, with some luxury properties reportedly commanding nightly rates exceeding €2,000 during peak Olympic events. The Île-de-France region has announced additional train services from nearby cities including Versailles, Saint-Denis, and Disneyland Paris, where hotel availability remains more plentiful.',
    ],
    whatThisMeans: 'If you\'re relying on Airbnb for your Paris Olympics trip, verify your host is registered and won\'t exceed the 120-night limit. Hotels in central Paris will be expensive and scarce — consider staying in outer arrondissements or nearby cities like Versailles or Saint-Denis for better availability.',
    whatChanged: 'New regulations require registration numbers on all listings. Properties without registration face immediate removal. Primary residences limited to 120 nights; secondary homes to 90 nights annually. Some hosts have already cancelled bookings exceeding the limit.',
    whoIsAffected: 'Travellers relying on Airbnb in central Paris (1st-4th, 9th-12th arrondissements). Long-term rental market may see relief as properties return. Hotel demand expected to increase 15%. Budget travellers most impacted.',
    whatToDo: 'Paris Olympics accommodation checklist: (1) Contact your Airbnb host NOW and ask for their registration number — verify it at opendata.paris.fr. (2) If your host can\'t provide registration, cancel and rebook at a hotel immediately. (3) Look at hotels in outer arrondissements (13th-20th) for better availability and 20-30% lower rates. (4) Consider Versailles or Saint-Denis — both have direct RER train connections and significantly more availability. (5) Book restaurant reservations and event tickets before booking accommodation — popular venues sell out first. (6) Use hotel points if you have them — this is exactly the situation they were designed for.',
    sources: [
      { name: 'Ville de Paris', url: 'https://www.paris.fr', isOfficial: true, lastUpdated: '2026-03-18T16:00:00Z', type: 'official' },
      { name: 'Airbnb Newsroom', url: 'https://news.airbnb.com', lastUpdated: '2026-03-17T10:00:00Z', type: 'news' },
      { name: 'France24', url: 'https://france24.com', lastUpdated: '2026-03-16T14:00:00Z', type: 'news' },
    ],
    impactRegions: ['Paris', 'Île-de-France', 'Versailles'],
    relatedArticles: ['dubai-hotels-spring-break-price-surge', 'tokyo-cherry-blossom-season-tourism-surge'],
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
      'Tokyo: Cherry blossoms peaked on March 19 — earliest on record — with full bloom expected through April 10 in most areas of the city.',
      'Record 12 million visitors expected during sakura season — Ueno Park, Meguro River, and Shinjuku Gyoen are extremely crowded, especially weekends.',
      'Book hotels 3+ weeks ahead for April visits — flight prices at premium and availability extremely limited during peak hanami viewing period.',
    ],
    body: [
      'The Japan Meteorological Corporation confirmed on March 19 that Tokyo\'s cherry blossom front (sakura sen) had reached the city\'s main observation point at Yasukuni Shrine, marking the earliest peak bloom date since records began in 1953. The early arrival is attributed to a combination of milder winter temperatures and an unusually warm March, which accelerated the blooming process by approximately 10 days compared to the 30-year average. The樱花 (sakura) typically require a period of cold dormancy followed by gradual warming, and this year\'s climate patterns produced ideal conditions for early blooming across the Kantō region, including Yokohama, Kamakura, and Chiba.',
      'Tokyo tourism officials are preparing for what promises to be a record-breaking hanami (cherry blossom viewing) season. The Tokyo Metropolitan Government estimates that approximately 12 million domestic and international tourists will visit the city\'s approximately 1,000 cherry blossom viewing spots over the next three weeks. Major parks including Ueno Park (which contains over 1,000 cherry trees), the Meguro River (famous for its illuminated blossom tunnel), and Shinjuku Gyoen National Garden have all announced enhanced crowd management protocols. These include one-way pedestrian flows, designated photography zones, and limits on the size of groups permitted to gather for blossom viewing parties.',
      'The confluence of sakura season with Japan\'s new eVISA requirements (see separate article) has created particular challenges for international visitors. Many first-time travellers to Japan are unfamiliar with hanami etiquette, which typically involves reserving space in parks using tarps or mats, bringing food and drinks, and maintaining the tradition of appreciating the transient beauty of the blossoms. Some visitors have inadvertently caused friction by sitting in areas already claimed by Japanese families or corporate groups who arrived much earlier in the day. The Japan National Tourism Organization has published detailed multilingual hanami guidelines and is working with major hotel chains to provide cultural orientation materials to incoming guests.',
    ],
    whatThisMeans: 'Tokyo\'s cherry blossom season is in full swing, but visitor numbers are overwhelming popular spots. If you\'re visiting Tokyo in late March or early April, plan to visit parks early morning (6-8am) for the best experience. Consider lesser-known spots like Koishikawa Korakuen for a more peaceful hanami.',
    whatChanged: 'Japan Meteorological Corporation reports cherry blossoms peaked on March 19 in Tokyo (earliest on record). Yasukuni Shrine, Ueno Park, and Meguro River seeing 3x normal crowds. Extended hanami celebrations with food vendors and events throughout the city.',
    whoIsAffected: 'Travellers to Tokyo March 19 - April 10. Photography enthusiasts, cultural tourists, families most impacted. Hotel availability extremely limited. Flight prices at premium for weekend travel. Local residents avoiding peak spots.',
    whatToDo: 'Tokyo sakura viewing strategy: (1) Set your alarm for 6:00 AM — most parks are nearly empty until 9:00 AM. (2) Shinjuku Gyoen and Koishikawa Korakuen have entry fees but smaller crowds and excellent photography conditions. (3) Reserve hanami spots in advance through apps like Sakura Calendar — popular areas fill by 7:30 AM on weekends. (4) Bring a light picnic but don\'t expect to find seating in central parks without a reservation. (5) Weekdays are 60% less crowded than weekends — plan major park visits for Tuesday-Thursday. (6) Combine temple visits with blossom viewing — Kodai-ji and Kiyomizu-dera in Kyoto offer stunning scenes with far fewer people than Tokyo parks.',
    sources: [
      { name: 'Japan Meteorological Corporation', url: 'https://sakura.weathermap.jp', isOfficial: true, lastUpdated: '2026-03-19T06:00:00Z', type: 'official' },
      { name: 'Japan National Tourism Organization', url: 'https://jnto.org', isOfficial: true, lastUpdated: '2026-03-19T06:00:00Z', type: 'official' },
      { name: 'Tokyo Shimbun', url: 'https://tokyosimbun.com', lastUpdated: '2026-03-19T06:00:00Z', type: 'news' },
    ],
    impactRegions: ['Tokyo', 'Yokohama', 'Kamakura', 'Greater Tokyo Area'],
    relatedArticles: ['japan-visa-entry-requirements-update', 'dubai-hotels-spring-break-price-surge'],
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
