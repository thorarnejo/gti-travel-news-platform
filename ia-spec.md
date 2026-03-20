# Travel News Platform — Information Architecture Specification

**Version:** 1.0  
**Status:** IA & Data Structure  
**Date:** 2026-03-19  
**Based on:** product-spec.md v1.0

---

## 1. SITE STRUCTURE

### 1.1 Pages

#### Homepage
**Purpose:** Live operational news feed for travelers.

**What it shows:**
- Reverse-chronological feed of articles (default sort: Latest)
- Each feed item shows: headline, TL;DR summary (truncated to 2 bullets), category badge, location tag(s), severity indicator, status badge, relative timestamp
- Feed is infinite-scroll with page breaks (not pagination links)
- Sticky "Breaking" banner at top when any Critical articles exist (max 1 active; shows most recent Critical)
- Active filter state displayed as removable chips below the header
- Empty state: "No articles match your filters" with a clear-filters CTA

**Actions:**
- Click article → navigate to Article page
- Click category badge → navigate to Category page (preserves current location/time filters)
- Click location tag → navigate to Location page (preserves current category/time filters)
- Click severity indicator → toggle severity filter
- Click time filter chip → cycle or open time range picker
- Submit search query → navigate to Search Results page
- Click "Breaking" banner → navigate to that Critical article

---

#### Article Page
**Purpose:** Full article with all structured fields.

**What it shows:**
- Breadcrumb: Home > [Category] > [Location]
- Article header: title, severity badge, status badge, published date, last-updated date
- TL;DR section: up to 5 bullet points
- What Changed: full text, dates/scopes
- Who Is Affected: traveler profile criteria, geographic/route boundaries
- What You Should Do: numbered action steps
- Sources: list with outlet names, publication dates, links (open in new tab)
- Update History: collapsible timeline of all versions (each entry: timestamp, author, summary of changes)
- Tags: category + location tags (each tag links to its respective filtered feed)
- Severity badge (colored): Critical / High / Medium / Low

**Actions:**
- Click tag (category) → Category page
- Click tag (location) → Location page
- Click source link → opens in new tab
- Click "View updates" / expand Update History → shows full version timeline
- Click "Share" → copies URL to clipboard (no native share sheet in v1)
- Browser back → returns to previous page with scroll position preserved

---

#### Category Page
**Purpose:** Filtered feed for a single category.

**What it shows:**
- Header: category name + icon + article count
- Same feed card layout as Homepage, but pre-filtered to this category
- Other active filters shown as chips (location, severity, time) — removable
- Sort options: Latest, Severity (Critical first), Recently Updated

**Actions:**
- All same card interactions as Homepage
- Remove category filter chip → returns to Homepage with other filters intact
- Change sort → re-sorts feed in place

---

#### Location Page (Country / City)
**Purpose:** Filtered feed for a geographic location.

**What it shows:**
- Header: location name (country name or city name + country), article count
- For countries: shows cities within country that have articles (sub-list)
- For cities: shows parent country context
- Same feed card layout as Homepage, pre-filtered to this location
- Other active filters shown as chips (category, severity, time)

**Actions:**
- Click country breadcrumb → Country page
- Click city in sub-list → City page (deeper location drill-down)
- All same card interactions as Homepage
- Remove location filter chip → returns to Homepage with other filters intact

---

#### Search Results Page
**Purpose:** Full-text and filtered search.

**What it shows:**
- Search header: query string, result count, sort dropdown
- Results in same feed card layout
- Highlighted query terms in title and TL;DR where possible
- Filter panel (sidebar on desktop, collapsible on mobile): category, location, severity, time range, status
- Empty state: "No articles found for '[query]'" with suggestions (check spelling, broaden filters)

**Actions:**
- Modify any filter → updates results in place (no page reload)
- Clear search → returns to Homepage
- Click result card → Article page
- Click any tag/chip → navigates to respective filtered view

---

## 2. FEED LOGIC

### 2.1 Sorting

| Sort Mode | Behavior |
|-----------|----------|
| **Latest** | Newest `published_at` first. Update events do NOT bump the article's sort position unless the sort mode is "Recently Updated." |
| **Severity** | Critical → High → Medium → Low, then by `published_at` within each severity tier. |
| **Recently Updated** | Articles sorted by `updated_at` descending. An update bumps the article to the top of this sort. |

**Default sort:** Latest.

### 2.2 Filtering

Filters are additive (AND logic). Multiple values within a filter are OR logic.

| Filter | Values | Notes |
|--------|--------|-------|
| **Category** | Transport, Entry Rules, Safety, Attractions, Pricing, Disruptions | Single-select (one category at a time) |
| **Location** | Country, City | Hierarchical: selecting a city implicitly filters to that city; selecting a country shows articles for that country including its cities. |
| **Severity** | Critical, High, Medium, Low | Multi-select |
| **Time** | 24h, 7d, 30d, All | Relative to `published_at` for default sort; relative to `updated_at` when sort = Recently Updated |

**Example filter combination:** `Category=Transport AND Location=United States AND Severity=Critical,High AND Time=7d`
→ Returns high-impact US transport articles from the past week.

### 2.3 Breaking / Critical Surfacing

- Articles with `severity=Critical` AND `status IN (Disruption, Warning)` appear with a red "BREAKING" badge and are pinned to the top of the feed regardless of sort mode
- If multiple Critical articles exist, the most recently published Critical article is pinned
- A persistent banner on the Homepage displays the top Critical headline; clicking it navigates to that article
- The pinned Critical article also appears in its natural feed position (not duplicated)

### 2.4 Updates vs. New Articles in Feed

- **New article** (`status=New`): Appears in feed at its sort position with a "NEW" badge for 24 hours from `published_at`. Badge then disappears; article treated as standard.
- **Update** (`status=Update`): Article does NOT get a NEW badge. In "Latest" sort, update events do NOT bump the article — it stays in its original chronological position. In "Recently Updated" sort, the article bumps to the top.
- **Update indicator:** Articles that have received updates show a subtle "Updated" label with the `updated_at` timestamp in the feed card. Clicking it opens the Update History section on the Article page.
- Users who previously read an article can see it has been updated via the "Updated" label — the article does not re-appear as "new."

---

## 3. NAVIGATION STRUCTURE

### 3.1 Main Navigation

```
[Logo / Home]        [Categories ▾]        [Search]        [Time Filter: 7d ▾]
```

- **Logo / Home:** Always returns to Homepage with all filters cleared.
- **Categories ▾:** Dropdown with all 6 categories. Clicking a category navigates to Category page with that category pre-selected and all other filters cleared.
- **Search:** Icon expands to inline search input. Pressing Enter or clicking the magnifier icon navigates to Search Results page.
- **Time Filter:** Dropdown (7d default). Options: 24h, 7d, 30d, All. Changing this filter updates the URL query param and reloads the current page's feed with the new time constraint.

### 3.2 Filter System Behavior

- Filters are encoded in URL query params:
  - `?category=Transport`
  - `?location=Japan`
  - `?location=Tokyo` (Tokyo implies Japan context)
  - `?severity=Critical,High`
  - `?time=7d`
  - `?sort=severity`
- Filters combine with `&`: `?category=Transport&location=Japan&severity=Critical&time=7d`
- Navigating to a Category page sets `?category=X` and clears other filter params
- Navigating to a Location page sets `?location=X` and clears other filter params
- Back/forward browser navigation preserves filter state
- Removing all filters returns to unfiltered Homepage

### 3.3 Cross-Navigation Paths

| From | Action | To |
|------|--------|----|
| Article card | Click category badge | Category page (`?category=X`) |
| Article card | Click location tag | Location page (`?location=X`) |
| Article page | Click category tag | Category page |
| Article page | Click location tag | Location page |
| Article page | Click source link | External URL (new tab) |
| Location page | Click city in sub-list | City Location page |
| Category page | Click location chip | Location page (adds location filter) |
| Search Results | Click result card | Article page |
| Homepage | Click Breaking banner | Article page (Critical) |

### 3.4 Breadcrumb Schema

| Page | Breadcrumb |
|------|------------|
| Category page | Home > [Category] |
| Country page | Home > [Country] |
| City page | Home > [Country] > [City] |
| Article page | Home > [Category] > [Location] |
| Search Results | Home > Search: "[query]" |

---

## 4. DATA MODEL

### 4.1 Article

```
Article {
  id:          UUID         (primary key)
  title:       String       (max 120 chars)
  slug:        String       (URL-safe, unique, e.g. "heathrow-strike-march-2026")
  summary:     String       (max 200 chars, used in meta tags and search snippets)

  category_id: UUID         (FK → Category)
  status:      Enum         (Disruption | Warning | Update | New | PriceChange)
  severity:    Enum         (Critical | High | Medium | Low)

  tldr:        String[5]    (array of up to 5 strings, max 15 words each)

  what_changed: String       (full text)
  who_is_affected: String   (full text)
  what_to_do:   String       (full text, supports line breaks for steps)

  published_at: DateTime     (ISO 8601 UTC)
  updated_at:   DateTime     (ISO 8601 UTC)
  version:      Integer      (starts at 1, increments per update)

  is_breaking: Boolean      (true if severity=Critical AND status IN Disruption,Warning)
  breaking_pinned_at: DateTime | null

  source_urls:  String[]     (array of URL strings, min 1 required)
  source_names: String[]     (array of source display names, parallel array with source_urls)
  source_dates: DateTime[]  (array of publication dates for sources, parallel array)

  author:       String       (display name, e.g. "GTI Editorial")
  editor_notes: String | null (internal notes, never displayed publicly)

  is_active:    Boolean      (false = soft-deleted / archived)
  is_featured: Boolean       (if true, shown in curated featured section on Homepage)
}
```

**Slug uniqueness rules:** `{slug}-{version}` if version > 1. Example: `heathrow-strike-march-2026-2`.

**Slug constraints:** lowercase, hyphens only, max 80 chars, unique across all active articles.

---

### 4.2 Location

```
Location {
  id:          UUID
  name:        String       (e.g. "Japan", "Tokyo")
  slug:        String       (URL-safe, unique)
  type:        Enum         (Country | City)

  parent_id:   UUID | null  (FK → Location; null for countries)
              -- Country's parent_id is null
              -- City's parent_id = the country's Location.id

  iso_code:    String | null (ISO 3166-1 alpha-2 for countries, e.g. "JP")
  lat:         Float | null
  lng:         Float | null

  article_count: Integer    (denormalized count of active articles referencing this location)
  child_count:  Integer     (denormalized count of cities under this country)

  is_active:   Boolean
}
```

**Hierarchy constraint:** No more than 2 levels (Country → City). No nested states/regions in v1.

---

### 4.3 ArticleLocation (Junction Table)

```
ArticleLocation {
  article_id:  UUID         (FK → Article)
  location_id: UUID         (FK → Location)

  PRIMARY KEY (article_id, location_id)
}
```

- A single article can reference multiple locations (e.g., "Flights between London and Paris cancelled")
- The "primary" location for an article is stored as a denormalized `primary_location_id` field on Article itself for feed-sorting purposes
- `primary_location_id` must reference a Location that exists in ArticleLocation for that article

---

### 4.4 Category

```
Category {
  id:          UUID
  name:        String       (Transport | Entry Rules | Safety | Attractions | Pricing | Disruptions)
  slug:        String       (transport | entry-rules | safety | attractions | pricing | disruptions)
  description: String       (one-line definition)
  icon:        String       (icon name/identifier, for UI)
  sort_order:  Integer      (display order: 1=Transport, 2=Entry Rules, 3=Safety, 4=Attractions, 5=Pricing, 6=Disruptions)
  is_active:   Boolean
}
```

**Categories are seeded, not user-generated.** Only 6 fixed categories exist.

---

### 4.5 Source

```
Source {
  id:          UUID
  name:        String       (display name, e.g. "Reuters", "IATA", "US Embassy")
  url:         String       (homepage URL of the source organization)
  type:        Enum         (Official | Media | Industry | Government)
  credibility_score: Integer (1-3: 1=Media, 2=Industry/Government, 3=Official)

  last_used_at: DateTime   (for source suggestion/autocomplete)
  use_count:   Integer     (how many articles cite this source)
  is_verified: Boolean      (editorial team has verified this source is legitimate)
}
```

**Note:** Sources are deduplicated at the Source level. An Article references Sources via the SourceArticle junction table.

---

### 4.6 ArticleSource (Junction Table)

```
ArticleSource {
  article_id:  UUID         (FK → Article)
  source_id:   UUID         (FK → Source)

  url:         String       (specific URL used in this article citation)
  title:       String | null (optional title of the specific cited page)
  published_at: DateTime | null (date the source article/page was published)

  PRIMARY KEY (article_id, source_id)
}
```

---

### 4.7 UpdateHistory

```
UpdateHistory {
  id:          UUID
  article_id:  UUID         (FK → Article)

  version:     Integer      (mirrors Article.version at time of update; starts at 1)

  published_at: DateTime    (when this version was published)
  author:      String       (who made the update)

  summary:     String       (human-readable change summary, e.g. "Extended strike end date, added rebooking options")
  diff:        JSON | null  (optional structured diff: {what_changed: "...", who_is_affected: "...", what_to_do: "..."})

  previous_version_id: UUID | null (FK → UpdateHistory, for linking to prior version)
}
```

**Versioning rules:**
- Version 1 is created when the article is first published
- Each update creates a new UpdateHistory entry with `version = Article.version + 1`
- `previous_version_id` chains updates in order
- Article's `updated_at` is set to the `published_at` of the most recent UpdateHistory entry

---

## 5. RELATIONSHIPS

### Article → Location
- Many-to-Many via `ArticleLocation`
- A single article can reference 1 or more locations (max 10 per article)
- Example: an article about "Eurostar strikes affecting London–Paris–Brussels routes" references Location: London, Paris, Brussels
- The `primary_location_id` on Article determines the breadcrumb and which location page's feed the article appears in by default
- An article MUST have at least 1 Location assigned

### Article → Category
- Many-to-One (each article has exactly 1 primary Category)
- Category is set at article creation and never changes
- The `category_id` FK on Article is the single source of truth for primary category
- Articles appear on their Category page filtered by `category_id`

### Article → Source
- Many-to-Many via `ArticleSource`
- Each citation links to a specific URL with optional title and publication date
- Source deduplication happens at the Source level (same organization = same Source record)
- An article MUST have at least 1 Source

### Article → UpdateHistory
- One-to-Many (an article can have unlimited updates; updates are append-only)
- The most recent `UpdateHistory` entry's `published_at` sets `Article.updated_at`
- `UpdateHistory.version` == `Article.version` at time of creation
- UpdateHistory is never deleted or modified after creation (append-only audit trail)

### Location → Article
- One-to-Many through `ArticleLocation`
- A Country Location aggregates its City children's articles (Country article count = sum of all articles for all its cities + articles directly tagged to the country)
- Deleting a Location is soft-delete only if it has associated articles (set `is_active=false`)

### Category → Article
- One-to-Many via `Article.category_id`
- Category pages show all articles where `category_id` matches AND `is_active=true`

---

## 6. TAGGING & FILTERING SYSTEM

### 6.1 Location Structure

```
Country (Level 1)
  └── City (Level 2)
```

- Countries are the top-level location type
- Cities must have a `parent_id` pointing to their Country
- Countries cannot have a `parent_id` (it is null)
- Location tags on articles display as: "Tokyo, Japan" (City, Country) or "Japan" (Country only)
- Cities are not independent of their country in the filter system; selecting a city implicitly scopes to that country, but the city-level view shows only city-specific articles (not country-wide articles)

**Multi-location articles:**
- An article tagged with multiple cities (e.g., London, Paris, Tokyo) appears in:
  - The feed for each individual city page
  - The feed for each city page's parent country page (once)
  - The homepage (once, with the article's `primary_location_id` determining which location badge is shown first)

### 6.2 Multi-Location Articles

- `ArticleLocation` junction table supports N locations per article
- When filtering by a country, all articles where any tagged location is that country (or a city within it) are returned
- When filtering by a city, only articles tagged with that specific city are returned
- Breadcrumb on multi-location articles shows only the `primary_location_id` location
- The article page shows all location tags (not just primary) in the tag list below the title

### 6.3 Filter Combination Rules

| Filter combination | Behavior |
|--------------------|----------|
| Category + Location | Returns articles in that category AND referencing that location (or its children) |
| Category + Severity | Returns articles matching both criteria |
| Location + Severity | Returns articles at that location with that severity |
| Category + Location + Severity | Returns articles matching all three |
| Category + Time | Returns articles in category published within time range |
| Severity + Time | Returns articles of that severity within time range |
| All four | Returns articles matching all filter criteria |

**URL representation:** All active filters are encoded in query params simultaneously. No filter is ever implied or hidden.

**Performance constraint:** A filter combination that returns zero articles shows the empty state, not an error.

---

## 7. UPDATE SYSTEM

### 7.1 New Article vs. Update

| Property | New Article | Update |
|----------|-------------|--------|
| `status` | `New` | `Update` |
| `version` | Starts at 1 | Increments by 1 |
| NEW badge in feed | Yes, for 24h | No |
| Sort position (Latest sort) | Determined by `published_at` | Unchanged from original position |
| Sort position (Recently Updated sort) | — | Bumps to top |
| `updated_at` | Same as `published_at` | Set to this update's `published_at` |
| Breaking badge | Based on severity/status | Re-evaluated; can gain or lose breaking status |

**The key distinction:** An Update modifies existing information. It does not create a new article. It does not change the article's original `published_at` or its sort position in "Latest" mode.

### 7.2 Versioning Logic

```
1. Article is created:
   - version = 1
   - published_at = now
   - updated_at = now
   - UpdateHistory entry created (version=1)

2. Editor publishes an update:
   - Article.version += 1
   - Article.updated_at = now
   - New UpdateHistory entry created (version = new Article.version)
   - UpdateHistory.previous_version_id links to the prior entry

3. Article's is_breaking flag:
   - Recalculated on every save
   - is_breaking = (severity = Critical AND status IN (Disruption, Warning))
   - If is_breaking becomes true, breaking_pinned_at = now
   - If is_breaking becomes false, breaking_pinned_at = null
```

### 7.3 Last Updated Tracking

- `Article.updated_at` is the authoritative "last updated" timestamp
- It always matches the `published_at` of the most recent `UpdateHistory` entry
- On the Article page, "Last Updated" displays: `{relative time} ago` (e.g., "3 hours ago") and the exact ISO 8601 datetime below it
- In the feed card, the "Updated" label appears if `updated_at > published_at + 1 hour` (updates within the first hour are not flagged as updates to avoid noise from minor editorial corrections)

### 7.4 How Users See Updates in the UI

**Feed card:**
- If an article has received an update and the user is sorting by "Latest," the card shows a small "Updated" badge with a relative time ("Updated 2h ago")
- The card's sort position does NOT change
- If the user is sorting by "Recently Updated," articles with updates bubble to the top

**Article page — Update History section:**
- Collapsed by default, showing: "This article has been updated N times. Last update: [relative time]. [Show update history]"
- Expanded, shows a chronological list:
  ```
  v3 — March 19, 2026, 14:32 UTC
  Strike extended through March 21. Added alternative routing options.

  v2 — March 18, 2026, 09:15 UTC
  Strike start date confirmed as March 19, 06:00 UTC.

  v1 — March 17, 2026, 11:00 UTC
  Initial report: Strike notice filed by ground handlers union.
  ```
- Each version's summary is the `UpdateHistory.summary` field
- A diff view (showing what specifically changed in What Changed / Who Is Affected / What To Do) is available by clicking "View changes" per version if `diff` data is populated

**Breaking banner:**
- If a Critical article is updated (not its first publication), the Breaking banner updates to show the latest update time: "BREAKING — Updated 5 minutes ago"
- This ensures users who saw the banner earlier know there's fresh information

---

## APPENDIX A: URL ROUTING REFERENCE

| Page | Route Pattern | Example URL |
|------|--------------|-------------|
| Homepage (unfiltered) | `/` | `/` |
| Homepage (filtered) | `/?category=X&location=Y&severity=Z&time=7d&sort=severity` | `/?category=Transport&location=Japan&severity=Critical&time=24h` |
| Category page | `/category/{category-slug}` | `/category/transport` |
| Category page (filtered) | `/category/{category-slug}?location=Y&severity=Z&time=7d` | `/category/transport?location=Japan&severity=Critical` |
| Location page (country) | `/location/{country-slug}` | `/location/japan` |
| Location page (city) | `/location/{country-slug}/{city-slug}` | `/location/japan/tokyo` |
| Location page (filtered) | `/location/{slug}?category=X&severity=Z&time=7d` | `/location/japan?category=Safety&severity=High&time=30d` |
| Article page | `/article/{article-slug}` | `/article/heathrow-strike-march-2026` |
| Search Results | `/search?q={query}&category=X&location=Y&severity=Z` | `/search?q=strike&category=Transport&location=UK` |

---

## APPENDIX B: STATUS & SEVERITY REFERENCE

**Status Values:** `New` | `Update` | `Disruption` | `Warning` | `PriceChange`

**Severity Values:** `Critical` | `High` | `Medium` | `Low`

**Display Priority (fallback when sort is undefined):**
Critical (Disruption/Warning) > High > Medium > Low > New > Update > PriceChange

**Breaking Condition:** `severity = Critical AND status IN (Disruption, Warning)`

---

## APPENDIX C: SEEDED CATEGORIES

| Sort Order | Name | Slug | Icon |
|-----------|------|------|------|
| 1 | Transport | transport | ✈️ |
| 2 | Entry Rules | entry-rules | 🛂 |
| 3 | Safety | safety | ⚠️ |
| 4 | Attractions | attractions | 🎭 |
| 5 | Pricing | pricing | 💰 |
| 6 | Disruptions | disruptions | 🔴 |

---

*End of IA Specification v1.0*
