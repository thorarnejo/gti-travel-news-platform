-- ============================================================
-- GTI News Platform - Seed Data
-- ============================================================
-- Version: 1.0.0
-- Date: 2026-03-19
-- Description: Sample data for development and testing
-- ============================================================

BEGIN;

-- ============================================================
-- SEED: COUNTRIES
-- ============================================================

INSERT INTO countries (name, slug, iso_code) VALUES
  ('France',        'france',        'FR'),
  ('Germany',       'germany',       'DE'),
  ('Spain',         'spain',         'ES'),
  ('Italy',         'italy',         'IT'),
  ('Japan',         'japan',         'JP'),
  ('Thailand',      'thailand',      'TH'),
  ('United States', 'united-states', 'US'),
  ('United Kingdom','united-kingdom', 'GB'),
  ('Australia',     'australia',     'AU'),
  ('Brazil',        'brazil',        'BR')
ON CONFLICT (iso_code) DO NOTHING;

-- ============================================================
-- SEED: CITIES
-- ============================================================

INSERT INTO cities (country_id, name, slug, latitude, longitude) VALUES
  -- France
  ((SELECT id FROM countries WHERE iso_code='FR'), 'Paris',     'paris',     48.8566,   2.3522),
  ((SELECT id FROM countries WHERE iso_code='FR'), 'Nice',      'nice',      43.7102,   7.2620),
  ((SELECT id FROM countries WHERE iso_code='FR'), 'Lyon',      'lyon',      45.7640,   4.8357),
  -- Germany
  ((SELECT id FROM countries WHERE iso_code='DE'), 'Berlin',    'berlin',    52.5200,  13.4050),
  ((SELECT id FROM countries WHERE iso_code='DE'), 'Munich',    'munich',    48.1351,  11.5820),
  ((SELECT id FROM countries WHERE iso_code='DE'), 'Frankfurt', 'frankfurt', 50.1109,   8.6821),
  -- Spain
  ((SELECT id FROM countries WHERE iso_code='ES'), 'Barcelona', 'barcelona', 41.3851,   2.1734),
  ((SELECT id FROM countries WHERE iso_code='ES'), 'Madrid',    'madrid',    40.4168,  -3.7038),
  ((SELECT id FROM countries WHERE iso_code='ES'), 'Palma',     'palma',     39.5696,   2.6502),
  -- Italy
  ((SELECT id FROM countries WHERE iso_code='IT'), 'Rome',      'rome',       41.9028,  12.4964),
  ((SELECT id FROM countries WHERE iso_code='IT'), 'Milan',     'milan',      45.4642,   9.1900),
  ((SELECT id FROM countries WHERE iso_code='IT'), 'Venice',   'venice',     45.4408,  12.3155),
  -- Japan
  ((SELECT id FROM countries WHERE iso_code='JP'), 'Tokyo',    'tokyo',      35.6762, 139.6503),
  ((SELECT id FROM countries WHERE iso_code='JP'), 'Osaka',    'osaka',      34.6937, 135.5023),
  -- Thailand
  ((SELECT id FROM countries WHERE iso_code='TH'), 'Bangkok',  'bangkok',    13.7563, 100.5018),
  ((SELECT id FROM countries WHERE iso_code='TH'), 'Phuket',  'phuket',      7.8804,  98.3923),
  -- USA
  ((SELECT id FROM countries WHERE iso_code='US'), 'New York',   'new-york',    40.7128, -74.0060),
  ((SELECT id FROM countries WHERE iso_code='US'), 'Los Angeles','los-angeles', 34.0522,-118.2437),
  ((SELECT id FROM countries WHERE iso_code='US'), 'Miami',      'miami',       25.7617, -80.1918),
  -- UK
  ((SELECT id FROM countries WHERE iso_code='GB'), 'London',    'london',      51.5074,  -0.1278),
  ((SELECT id FROM countries WHERE iso_code='GB'), 'Edinburgh', 'edinburgh',   55.9533,  -3.1883)
ON CONFLICT (country_id, slug) DO NOTHING;

-- ============================================================
-- SEED: LOCATIONS
-- ============================================================

-- Country-level locations
INSERT INTO locations (location_type, country_id, city_id, name, slug)
SELECT 'country', id, NULL, name, slug FROM countries
ON CONFLICT (location_type, country_id, city_id) DO NOTHING;

-- City-level locations
INSERT INTO locations (location_type, country_id, city_id, name, slug)
SELECT 'city', c.country_id, c.id, c.name, c.slug
FROM cities c
ON CONFLICT (location_type, country_id, city_id) DO NOTHING;

-- ============================================================
-- SEED: CATEGORIES
-- ============================================================

INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
  ('Flights',       'flights',       'Flight delays, cancellations, strikes, and airline news',              '✈️',  1),
  ('Visa & Entry',  'visa',         'Visa requirements, border closures, entry restrictions',               '🛂',  2),
  ('Safety',        'safety',        'Security advisories, natural disasters, health warnings',              '⚠️',  3),
  ('Transport',     'transport',     'Ground transport, trains, buses, ride-sharing',                        '🚌',  4),
  ('Weather',       'weather',       'Storms, heatwaves, monsoons, snow, and climate events',                '🌤️', 5),
  ('Accommodation', 'accommodation', 'Hotel closures, price changes, booking platform issues',              '🏨',  6),
  ('Events',        'events',        'Cancellations, new events, festivals, sporting events',              '🎭',  7),
  ('Prices',        'prices',        'Currency changes, fuel prices, tourism tax changes',                  '💰',  8),
  ('Airports',      'airports',      'Airport disruptions, terminal changes, security updates',             '🛫',  9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED: SOURCES
-- ============================================================

INSERT INTO sources (name, slug, feed_url, website_url, priority) VALUES
  ('IATA Travel Centre',  'iata',      'https://www.iata.org/en/programs/covid-19-api/',  'https://www.iata.org',                    1),
  ('US Travel Advisory',  'us-travel', NULL,                                          'https://travel.state.gov',                2),
  ('Reuters Travel News', 'reuters',   'https://feeds.reuters.com/reuters/travel',     'https://www.reuters.com',                3),
  ('Schengen Visa Info',  'schengen',  NULL,                                          'https://www.schengenvisainfo.com',        3),
  ('WTM Travel News',     'wtm',       NULL,                                          'https://www.ttgmedia.com',                4),
  ('OTA IATA BSP',        'ota-bsp',   NULL,                                          'https://www.iata-bsp.org',                5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED: ARTICLES
-- ============================================================

DO $$
DECLARE
  cat_flights   BIGINT := (SELECT id FROM categories WHERE slug = 'flights');
  cat_visa      BIGINT := (SELECT id FROM categories WHERE slug = 'visa');
  cat_safety    BIGINT := (SELECT id FROM categories WHERE slug = 'safety');
  cat_transport BIGINT := (SELECT id FROM categories WHERE slug = 'transport');
  cat_prices    BIGINT := (SELECT id FROM categories WHERE slug = 'prices');
  cat_weather   BIGINT := (SELECT id FROM categories WHERE slug = 'weather');
  cat_accom     BIGINT := (SELECT id FROM categories WHERE slug = 'accommodation');

  loc_france    BIGINT := (SELECT id FROM locations WHERE slug = 'france');
  loc_germany   BIGINT := (SELECT id FROM locations WHERE slug = 'germany');
  loc_spain     BIGINT := (SELECT id FROM locations WHERE slug = 'spain');
  loc_italy     BIGINT := (SELECT id FROM locations WHERE slug = 'italy');
  loc_japan     BIGINT := (SELECT id FROM locations WHERE slug = 'japan');
  loc_thailand  BIGINT := (SELECT id FROM locations WHERE slug = 'thailand');
  loc_uk        BIGINT := (SELECT id FROM locations WHERE slug = 'united-kingdom');
  loc_bangkok   BIGINT := (SELECT id FROM locations WHERE slug = 'bangkok');
  loc_paris     BIGINT := (SELECT id FROM locations WHERE slug = 'paris');
  loc_tokyo     BIGINT := (SELECT id FROM locations WHERE slug = 'tokyo');

  src_iata      BIGINT := (SELECT id FROM sources WHERE slug = 'iata');
  src_reuters   BIGINT := (SELECT id FROM sources WHERE slug = 'reuters');
  src_schengen  BIGINT := (SELECT id FROM sources WHERE slug = 'schengen');
BEGIN

-- Article 1: Flight strikes in Europe
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'europe-pilot-strike-march-2026',
  'disruption',
  'critical',
  'Europe-Wide Pilot Strike Grounds 1,200 Flights Across 6 Countries',
  'A coordinated 72-hour pilot strike across Air France, Lufthansa, and Iberia has forced the cancellation of over 1,200 flights affecting major hubs including Paris CDG, Frankfurt, and Madrid.',
  '<p>A joint strike action called by the European Cockpit Association (ECA) began at 00:01 UTC on 19 March and runs through 23:59 UTC on 21 March 2026. The dispute centres on proposed changes to rest period regulations that unions say would compromise flight safety.</p><h2>Affected Airlines</h2><p>Air France has cancelled 430 flights, Lufthansa 380, Iberia 210, and KLM/Transavia a combined 180. Low-cost carriers EasyJet and Ryanair report minimal disruption as their crews are not part of the strike.</p><h2>Passenger Rights</h2><p>Passengers on affected flights are entitled to full refunds or rebooking on alternative services. EU261 compensation may apply for delays exceeding 3 hours once the strike ends.</p>',
  ARRAY[
    'Check airline website for your flight status before leaving for the airport',
    'Rebooking via alternative carriers (EasyJet, Ryanair) may be faster than waiting',
    'Keep all receipts for meals and accommodation — EU261 compensation may apply'
  ],
  'Strike duration extended from 48h to 72h. KLM/Transavia added to affected carriers.',
  'Travellers flying Air France, Lufthansa, Iberia, KLM, or Transavia through Paris CDG, Frankfurt, Munich, Madrid, or Barcelona between 19–21 March.',
  'Arrive at the airport at least 3 hours early. Consider rebooking on non-affected carriers. Download your airline''s app for real-time updates.',
  cat_flights,
  TRUE,
  NOW() - INTERVAL '2 hours'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_france,  TRUE),
  (currval('articles_id_seq'), loc_germany, TRUE),
  (currval('articles_id_seq'), loc_spain,   TRUE);

INSERT INTO article_sources (article_id, source_id) VALUES
  (currval('articles_id_seq'), src_reuters);

-- Article 2: Thailand visa changes
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'thailand-visa-exempt-extended-2026',
  'update',
  'medium',
  'Thailand Extends Visa-Exempt Stay to 60 Days for 93 Countries',
  'The Thai Cabinet approved a doubling of visa-exempt stay limits from 30 to 60 days for citizens of 93 countries, effective 1 April 2026. The move is expected to significantly boost long-stay tourism.',
  '<p>The Thai government announced the change on 17 March, describing it as part of its "Long Stay Nation" strategy to attract digital nomads, retirees, and extended vacation travellers. The extension applies to passport holders from major source markets including the UK, US, Australia, Germany, France, Japan, and most European nations.</p><h2>Key Conditions</h2><p>Travellers cannot exceed 90 days in any 180-day period using repeated visa-exempt entries. Working remotely for a Thai employer remains prohibited on a tourist entry. Long-Term Resident (LTR) visas still require separate application.</p><h2>Border Runs No Longer Needed</h2><p>The change eliminates the common "border run" practice where visitors left Thailand briefly to reset their counter. Immigration authorities warn that abuse of the extended stay could trigger future policy reversal.</p>',
  ARRAY[
    'Visa-exempt stay now 60 days (doubled from 30)',
    'Still capped at 90 days per 180-day rolling period',
    'Border runs to reset counter no longer necessary'
  ],
  'Stay limit increased from 30 to 60 days for 93 nationalities.',
  'Tourists visiting Thailand for up to 2 months. Digital nomads and retirees most affected by previous 30-day limits.',
  'Plan trips up to 60 days without visa runs. Track your 180-day rolling window carefully if making multiple entries.',
  cat_visa,
  TRUE,
  NOW() - INTERVAL '5 hours'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_thailand, TRUE),
  (currval('articles_id_seq'), loc_bangkok,   FALSE);

INSERT INTO article_sources (article_id, source_id) VALUES
  (currval('articles_id_seq'), src_iata),
  (currval('articles_id_seq'), src_schengen);

-- Article 3: Japan earthquake advisory
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'japan-noto-peninsula-earthquake-advisory-2026',
  'warning',
  'high',
  'Noto Peninsula Earthquake: Travel Advisory Updated for Ishikawa Prefecture',
  'A 6.4 magnitude earthquake struck the Noto Peninsula in Ishikawa Prefecture on 18 March. The Japan Meteorological Agency has issued a Level 2 advisory. Transport links and some attractions in the region remain affected.',
  '<p>The earthquake occurred at 02:47 local time at a depth of 12 km. JMA recorded peak intensities of 6- in Wajima and Suzu cities. While no tsunami warning was issued, localised infrastructure damage has been reported.</p><h2>Affected Area</h2><p>Ishikawa Prefecture — specifically the Noto Peninsula including Wajima, Suzu, Nanao, and the Noto Kongo coast. Major tourist sites such as the Wajima Morning Market and Nyffen scale museum remain closed until inspections are complete.</p><h2>Transport</h2><p>Part of the Noto Tetsudo (Noto Railway) remote branch line is suspended. JR Kanazawa-Awazu station reports minor platform damage but main lines are operational.</p><h2>Tokyo and Osaka unaffected</h2><p>The earthquake had no impact on transport or tourism infrastructure in Tokyo, Kyoto, Osaka, or Nagoya. Flights into and out of Tokyo Narita, Haneda, and Osaka Kansai are operating normally.</p>',
  ARRAY[
    'Ishikawa Prefecture affected — avoid non-essential travel to the Noto Peninsula',
    'Wajima and Suzu attractions closed until further notice',
    'Tokyo, Osaka, Kyoto, Nagoya travel unaffected'
  ],
  'New 6.4 magnitude earthquake on 18 March. Wajima Morning Market and Nyffen Scale Museum closed.',
  'Travellers with planned visits to Ishikawa Prefecture, Wajima, Suzu, or the Noto Peninsula.',
  'Avoid non-essential travel to Ishikawa Prefecture. Check with JR Pass official website before using rail passes in the region. Consider alternative destinations within Japan.',
  cat_safety,
  TRUE,
  NOW() - INTERVAL '8 hours'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_japan, TRUE),
  (currval('articles_id_seq'), loc_tokyo, FALSE);

INSERT INTO article_sources (article_id, source_id) VALUES
  (currval('articles_id_seq'), src_iata);

-- Article 4: UK train strike
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'uk-rail-strike-network-rail-march-2026',
  'disruption',
  'medium',
  'UK Rail Strike: Network Rail Workers Walk Out 22–24 March',
  'The RMT union has called a 48-hour strike affecting Network Rail infrastructure staff across England and Wales. Only 60% of normal services will run, with regional operators worst affected.',
  '<p>The strike runs from 00:01 on 22 March to 23:59 on 23 March 2026. Negotiations between the RMT and Network Rail broke down over pay and working condition proposals tabled in February.</p><h2>Worst Affected Routes</h2><p>Great Western Railway, Avanti West Coast, and CrossCountry are expected to run significantly reduced services. ScotRail services in Scotland are unaffected as industrial action south of the border does not cover Scotland.</p><h2>Eurostar</h2><p>Eurostar services between London St Pancras and Paris/Lille/Brussels are operating a reduced timetable. Passengers are advised to arrive 2 hours before departure.</p>',
  ARRAY[
    'Only 60% of normal UK rail services running 22–23 March',
    'Book seat reservations in advance where available',
    'Eurostar running reduced timetable — arrive 2h early'
  ],
  'RMT strike confirmed for 22–23 March. Great Western, Avanti West Coast, CrossCountry most affected.',
  'Travellers using UK rail services 22–23 March, especially Great Western, Avanti, CrossCountry, and Eurostar.',
  'Check operator websites before travelling. Consider buses or flights for long-distance journeys. Eurostar passengers should arrive early.',
  cat_transport,
  TRUE,
  NOW() - INTERVAL '12 hours'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_uk, TRUE);

-- Article 5: Eurozone fuel price shift
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'eurozone-fuel-prices-rise-spring-2026',
  'price_change',
  'low',
  'Eurozone Fuel Prices Rise 12% — What It Means for Self-Drive Tourists',
  'Refinery output cuts by OPEC+ allies have pushed Eurozone diesel prices to €1.87/litre average. Self-drive tourists in France, Germany, and Italy face higher fuel costs this spring.',
  '<p>The European Commission Energy Observatory reported the 12% monthly increase on 16 March, driven by reduced refinery throughput across Benelux and Southern Europe. Petrol (gasoline) prices rose a more modest 4% to €1.72/litre average.</p><h2>Country Breakdown</h2><p>Diesel prices by country: France €1.91/l, Germany €1.84/l, Italy €1.95/l, Spain €1.78/l. Self-drive tourists in rural areas of France and Italy where fuel stations are sparse will feel the impact most.</p><h2>Impact on Car Rental</h2><p>Car rental firms typically charge for fuel at a markup. Travellers picking up rental cars in France or Italy should compare full-to-full vs prepaid fuel options — the math often favours full-to-full at current price levels.</p>',
  ARRAY[
    'Diesel now €1.87/litre average in Eurozone (+12% this month)',
    'France diesel: €1.91/l — Italy diesel: €1.95/l — Spain diesel: €1.78/l',
    'Prepaid fuel options at rental counters may not be worth it at current prices'
  ],
  'OPEC+ cuts push Eurozone diesel to €1.87/l (+12% in one month).',
  'Self-drive tourists in France, Germany, Italy, and Spain. Budget travellers most affected.',
  'Compare fuel policy (full-to-full vs prepaid) when renting cars. Diesel costlier in France and Italy. Budget extra €20–40 for a 1,000 km road trip.',
  cat_prices,
  TRUE,
  NOW() - INTERVAL '1 day'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_france, TRUE),
  (currval('articles_id_seq'), loc_germany, TRUE),
  (currval('articles_id_seq'), loc_italy,   TRUE),
  (currval('articles_id_seq'), loc_spain,   TRUE);

-- Article 6: Paris accommodation new tax
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'paris-tourist-tax-increase-2026',
  'price_change',
  'medium',
  'Paris Tourist Tax Rises to €15/Night — Highest in Europe',
  'The Ville de Paris has increased its séjour tax from €8.13 to €15 per night per adult for 5-star hotels and premium rentals, effective 1 May 2026. All other hotel categories see a proportional increase.',
  '<p>The Paris municipal council voted 91–12 in favour of the increase as part of funding for the 2024 Olympics legacy infrastructure. The tax applies to all accommodation types including hotels, Airbnb-style rentals, and furnished tourist lets.</p><h2>New Rates by Category</h2><ul><li>5-star / palace: €15/adult/night (up from €8.13)</li><li>4-star: €6/adult/night (up from €4)</li><li>3-star and below: €3/adult/night (up from €2.25)</li><li>Budget / 1-star: €1/adult/night (up from €0.75)</li></ul><h2>How It Is Collected</h2><p>Hotels collect at check-in. Airbnb and Booking.com collect automatically through their platforms. The tax appears separately from your accommodation rate on booking confirmations.</p>',
  ARRAY[
    'Paris tourist tax now up to €15/night for 5-star hotels',
    '3-star hotels: €3/night — 4-star: €6/night',
    'Tax is collected by hotels and platforms automatically'
  ],
  'Paris tourist tax increased from €8.13 to €15 for 5-star hotels from 1 May 2026.',
  'Tourists staying in Paris hotels, Airbnb, or rentals from May 2026. Luxury travellers most impacted.',
  'Budget an extra €15–90 per person for a 5-night Paris stay. 3-star stays add roughly €15 extra per person total.',
  cat_accom,
  TRUE,
  NOW() - INTERVAL '1 day'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_paris, TRUE);

-- Article 7: Thailand monsoon early season
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'thailand-southern-flooding-may-2026',
  'warning',
  'high',
  'Southern Thailand Braces for Early Monsoon — Flooding Risk in Phuket and Krabi',
  'The Thai Meteorological Department has issued an orange-level alert for southern Thailand, forecasting above-average rainfall from late April 2026. Travellers to Phuket, Krabi, Koh Samui, and Koh Phangan should monitor conditions closely.',
  '<p>An unusual Indian Ocean Dipole pattern is driving early monsoon onset in the Andaman Sea region. Rainfall in Phuket and Krabi provinces is forecast to be 40–60% above average for April–May. Flash flooding on island roads and boat service disruptions are the primary risks.</p><h2>Affected Areas</h2><p>Phuket Province (including Phuket Town, Patong, Kata, Karon), Krabi Province (Ao Nang, Railay Beach), Koh Samui, Koh Phangan. Bangkok and northern Thailand are not affected.</p><h2>Current Status</h2><p>No active flooding as of 19 March. The alert is precautionary. Travellers with trips planned for late April through June should check conditions 48 hours before arrival.</p>',
  ARRAY[
    'Southern Thailand (Phuket, Krabi, Koh Samui) at elevated flood risk late April–June',
    'Monsoon 40–60% wetter than usual this season',
    'Check conditions 48h before arrival — no active disruption yet'
  ],
  'TMD orange alert issued for southern Thailand. Early monsoon expected.',
  'Travellers heading to Phuket, Krabi, Koh Samui, Koh Phangan in April–June 2026.',
  'Monitor TMD weather alerts. Avoid flooded roads. Book boat trips with operators who monitor conditions in real-time. Travel insurance with weather cover recommended.',
  cat_weather,
  TRUE,
  NOW() - INTERVAL '2 days'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_thailand, TRUE),
  (currval('articles_id_seq'), loc_bangkok,   FALSE);

-- Article 8: Italy train new route
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'italy-new-high-speed-milan-rome-2026',
  'new',
  'low',
  'Frecciarossa Direct Milan–Rome: New Non-Stop High-Speed Route Launches April 2026',
  'Trenitalia''s new direct Frecciarossa 1000 service cuts Milan–Rome journey time to 2 hours 20 minutes — 40 minutes faster than the current fastest service.',
  '<p>The new service uses Trenitalia''s latest Frecciarossa 1000 trainsets operating at up to 300 km/h on the upgraded Bologna–Florence Direttissima line. Four daily non-stop services in each direction launch 1 April 2026.</p><h2>Timings</h2><p>First departure Milano Centrale 06:00, arriving Roma Termini 08:20. Last departure Roma 20:00, arriving Milano 22:20. Stopping services (with Bologna/Florence) remain at 2h 58m.</p><h2>Fares</h2><p>Base fares start at €49 in Standard, €89 in Business. Advance purchase recommended as non-stop premium seating is expected to sell out quickly on peak days.</p>',
  ARRAY[
    'Milan–Rome non-stop now 2h 20min (down from 3h 00min)',
    '4 daily services each direction from 1 April 2026',
    'Advance fares from €49 — book early for best prices'
  ],
  'New Frecciarossa 1000 non-stop Milan–Rome launched 1 April. Journey time reduced by 40 minutes.',
  'Travellers moving between Milan and Rome. Business travellers most benefit from time saving.',
  'Book at trenitalia.com or via the Trenitalia app. Use non-stop for Milan–Rome day trips. Connecting services to Florence/Bologna still available on stopping trains.',
  cat_transport,
  TRUE,
  NOW() - INTERVAL '3 days'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_italy, TRUE);

-- Article 9: France event cancellation
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'paris-2026-formula-1-cancelled',
  'disruption',
  'critical',
  'Paris Formula 1 Grand Prix CANCELLED — Circuit Rejects 2026 Contract',
  'The French Grand Prix at Circuit Paul Ricard has been cancelled after organisers and Formula 1 Management failed to agree on a new contract. An estimated 120,000 spectators with pre-purchased tickets are affected.',
  '<p>The race, which had been scheduled for 28 June 2026, was officially cancelled on 16 March. Contract negotiations collapsed over FOM''s demand for increased hosting fees and infrastructure contributions from the Var department.</p><h2>Ticket Refunds</h2><p>All pre-purchased tickets will be automatically refunded within 30 business days. Fans do not need to contact the organiser. Refund processing began 17 March.</p><h2>Alternative: Monaco GP</h2><p>The Monaco Grand Prix on 25 May remains unaffected. Fans with French GP hospitality packages should contact their booking agent directly.</p>',
  ARRAY[
    'French Grand Prix cancelled — 28 June 2026 date withdrawn',
    'Tickets auto-refunded within 30 business days',
    'Monaco GP on 25 May still scheduled — no impact'
  ],
  'FOM and Circuit Paul Ricard failed to agree on new hosting contract. Race cancelled 16 March.',
  '120,000 ticket holders for the French Grand Prix on 28 June 2026. Hospitality package holders especially.',
  'No action needed for ticket refunds — processing automatically. Contact booking agents for hospitality packages. Consider Monaco GP on 25 May as alternative.',
  cat_flights,
  TRUE,
  NOW() - INTERVAL '4 days'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_france, TRUE);

-- Article 10: Japan cherry blossom forecast
INSERT INTO articles (slug, status, severity, headline, summary, body, tldr, what_changed, who_is_affected, what_to_do, category_id, is_published, published_at)
VALUES (
  'japan-cherry-blossom-forecast-2026',
  'new',
  'low',
  'Japan Cherry Blossom Season 2026: Full Forecast and Best Viewing Dates',
  'Japan''s Weatherisco announces this year''s cherry blossom (sakura) forecast. Tokyo peak is expected 1–8 April, Kyoto 5–12 April. Unseasonably warm March has pushed dates 4–6 days earlier than the 10-year average.',
  '<p>The Japan Meteorological Corporation''s full sakura forecast for 2026 shows warm southerly winds in February and March have accelerated bloom development. Southern Kyushu cities (Fukuoka, Nagasaki) will see peak bloom from 25–31 March.</p><h2>Key Dates by City</h2><ul><li>Fukuoka: 25–31 March</li><li>Hiroshima: 1–7 April</li><li>Osaka: 3–9 April</li><li>Nagoya: 1–7 April</li><li>Tokyo: 1–8 April</li><li>Sendai: 10–16 April</li><li>Sapporo (north): 1–7 May</li></ul><h2>Hanami Advice</h2><p>Book hanami viewing reservations in Tokyo and Kyoto well in advance — popular spots like Ueno Park, Shinjuku Gyoen, and Maruyama Park fill up quickly. Some restaurants along the Philosopher''s Path in Kyoto have window tables reserved months ahead.</p>',
  ARRAY[
    'Tokyo peak bloom: 1–8 April (4–6 days earlier than average)',
    'Kyoto peak: 5–12 April — book hanami reservations NOW',
    'Fukuoka and Hiroshima already entering peak from late March'
  ],
  'Warm March has pushed sakura dates 4–6 days earlier than average. Tokyo peak now 1 April.',
  'Travellers planning Japan trips in late March through April for cherry blossom viewing.',
  'Adjust Tokyo/Kyoto bookings to 1–8 April and 5–12 April respectively. Reserve hanami restaurants now. Consider Hiroshima or Fukuoka for earlier bloom.',
  cat_weather,
  TRUE,
  NOW() - INTERVAL '5 days'
);

INSERT INTO article_locations (article_id, location_id, is_primary) VALUES
  (currval('articles_id_seq'), loc_japan, TRUE);

END $$;

COMMIT;

-- ============================================================
-- SEED COMPLETE
-- ============================================================
