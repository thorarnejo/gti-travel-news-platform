# GTI News Platform - Frontend

A production-ready Next.js 14 frontend for the Global Travels Info news platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Components**: ShadCN UI-inspired custom components
- **Icons**: Lucide React
- **State**: React hooks + URL query params

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout with Header/Footer
│   ├── page.tsx             # Homepage (Live Feed)
│   ├── globals.css          # Tailwind + CSS variables
│   ├── not-found.tsx        # 404 page
│   ├── article/
│   │   └── [slug]/page.tsx  # Article detail page
│   ├── category/
│   │   └── [category]/page.tsx  # Category filtered feed
│   ├── location/
│   │   └── [location]/page.tsx  # Location filtered feed
│   └── api/
│       └── articles/route.ts    # Articles API endpoint
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── StatusBadge.tsx
│   │   ├── SeverityBadge.tsx
│   │   ├── ImpactBadge.tsx
│   │   └── Button.tsx
│   ├── feed/               # Feed-related components
│   │   ├── ArticleCard.tsx
│   │   ├── FeedList.tsx
│   │   └── ArticleSection.tsx
│   ├── filters/            # Filter components
│   │   ├── FilterBar.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── LocationFilter.tsx
│   │   ├── SeverityFilter.tsx
│   │   └── SortSelect.tsx
│   └── layout/             # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── utils.ts            # Utility functions
│   └── data.ts             # Sample data & data fetching
├── types/
│   └── index.ts            # TypeScript types
├── hooks/
│   ├── useArticles.ts      # Article fetching hook
│   └── useFilters.ts      # Filter state hook
└── styles/
    └── (empty - using app/globals.css)
```

## Features

### Core Pages
- **Homepage (Live Feed)**: List of articles with sorting and filters
- **Article Page**: Full article with TL;DR, What Changed, Who is Affected, What to Do, Sources
- **Category Page**: Filtered feed by category (flights, hotels, visa, safety, etc.)
- **Location Page**: Filtered feed by country/city

### Components
- `ArticleCard`: Three variants (default, compact, featured)
- `FeedList`: Article list with loading/empty states
- `FilterBar`: Sticky filter bar with clear all
- `CategoryFilter`, `LocationFilter`, `SeverityFilter`: Individual filter dropdowns
- `StatusBadge`: Shows status (New, Update, Warning, Disruption, Price Change)
- `SeverityBadge`: Shows severity (Low, Medium, High, Critical)
- `ImpactBadge`: Shows impact level

### UI Features
- Minimal modern design
- Card-based layout
- Mobile-first responsive
- Clean spacing
- Sticky filter bar
- URL query param filters
- Loading states
- Empty states

## Getting Started

```bash
cd /home/thor/.openclaw/workspace/gti-articles/news-platform/frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Sample Data

Includes 6 sample articles:
1. London Heathrow Flight Cancellations (High severity, Disruption)
2. Japan Visa Entry Requirements (Medium severity, Update)
3. Dubai Hotel Price Surge (Low severity, Price Change)
4. Thailand Safety Advisory (High severity, Warning)
5. Paris Airbnb Regulations (Medium severity, Update)
6. Tokyo Cherry Blossom Season (Low severity, New)

## API

`GET /api/articles` supports query params:
- `category`: flights, hotels, destinations, visa, safety, weather
- `location`: Country or city name
- `severity`: low, medium, high, critical
- `status`: new, update, warning, disruption, price-change
- `sortBy`: latest, severity

## Notes

- Server components used where possible for performance
- Client components only where interactivity needed
- URL-based filter state for shareability
- Responsive design with mobile-first approach
