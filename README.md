# GTI Travel News Platform

A real-time travel news and update system for travelers. Get instant alerts on flight disruptions, entry rule changes, safety warnings, and more.

## Overview

This platform delivers operational travel intelligence — not inspiration content. Every article answers: **What changed, who is affected, what should you do now.**

### Key Features

- **Live News Feed**: Real-time updates on travel disruptions
- **Structured Content**: TL;DR, What Changed, Who Is Affected, What To Do
- **Smart Filtering**: By category, location, severity, time
- **Breaking Alerts**: Critical disruptions pinned to top
- **Update History**: Track changes to articles over time

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, PostgreSQL
- **Database**: PostgreSQL with full-text search
- **Deployment**: Vercel (frontend), PostgreSQL host of choice

## Local Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional for local dev — mock data included)

### Installation

```bash
# Navigate to project
cd /home/thor/.openclaw/workspace/gti-articles/news-platform

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your settings

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Database Setup

#### Option 1: Using Mock Data (No Database Required)

```bash
# .env.local
USE_MOCK_DATA=true
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Option 2: Using Real Database

```bash
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/gti_news
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Set up database:

```bash
# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed

# Or run both
npm run db:setup
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:setup` | Setup database (migrate + seed) |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |

## Production Deployment

### Vercel Deployment

1. **Push to Git repository** (GitHub, GitLab, or Bitbucket)

2. **Create Vercel project**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and deploy
   vercel login
   vercel
   ```

3. **Configure environment variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add:
     - `DATABASE_URL` — Your PostgreSQL connection string
     - `NEXT_PUBLIC_SITE_URL` — Your production URL (e.g., `https://your-domain.com`)

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### PostgreSQL Hosting Options

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| **Vercel Postgres** | Yes | Tight Vercel integration |
| **Supabase** | Yes | Full PostgreSQL + extras |
| **Railway** | Yes | Easy setup |
| **Neon** | Yes | Serverless PostgreSQL |
| **AWS RDS** | No | Production scale |

### Required Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL (for SSR API calls) |
| `USE_MOCK_DATA` | No | Set to `true` to use mock data |
| `NODE_ENV` | No | `development` or `production` |

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage (live feed)
│   ├── article/[slug]/    # Article detail page
│   ├── category/[category]/  # Category filter page
│   ├── location/[location]/  # Location filter page
│   └── api/               # API routes
├── components/            # React components
│   ├── feed/             # Article cards, feed list
│   ├── filters/          # Filter components
│   └── ui/               # UI components (badges, buttons)
├── lib/                   # Utilities, data services
│   ├── db.ts             # Database connection
│   ├── data.ts           # API client
│   ├── articleService.ts # Business logic
│   └── mockData.ts       # Mock data for testing
├── types/                 # TypeScript types
├── db/                    # Database migrations & seeds
│   ├── schema.sql        # Database schema
│   ├── migrations/       # Migration files
│   └── seeds/            # Seed data
└── scripts/               # Utility scripts
    ├── migrate.js        # Run migrations
    ├── seed.js           # Seed database
    └── setup.js          # Full setup
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/articles` | GET | List articles (with filters) |
| `/api/articles?category=transport` | GET | Filter by category |
| `/api/articles?severity=critical` | GET | Filter by severity |
| `/api/articles/[slug]` | GET | Get single article |
| `/api/articles/[id]` | PATCH | Update article |
| `/api/articles/create` | POST | Create article |
| `/api/categories` | GET | List all categories |
| `/api/locations` | GET | List all locations |
| `/api/filters` | GET | Get all filter options |

## Content Categories

- **Transport**: Flight delays, cancellations, strikes
- **Entry Rules**: Visa changes, entry requirements
- **Safety**: Security alerts, travel advisories
- **Attractions**: Closures, booking changes
- **Pricing**: Fare changes, new fees
- **Disruptions**: Strikes, weather, outages

## Severity Levels

| Level | Description |
|-------|-------------|
| Critical | Immediate travel failure required |
| High | Significant inconvenience likely |
| Medium | Moderate impact, localized |
| Low | Minimal impact, easy workaround |

## Manual QA Checklist

### Homepage
- [ ] Loads without errors
- [ ] Shows article cards
- [ ] Category badges clickable
- [ ] Location tags clickable
- [ ] Sort by Latest works
- [ ] Sort by Severity works
- [ ] Filters update URL
- [ ] Empty state displays correctly

### Article Page
- [ ] Loads full article
- [ ] Shows TL;DR section
- [ ] Shows What Changed
- [ ] Shows Who Is Affected
- [ ] Shows What To Do
- [ ] Shows Sources
- [ ] Shows Last Updated
- [ ] Category link works
- [ ] Location links work

### Category Page
- [ ] Filters to selected category
- [ ] Shows category name in header
- [ ] Other filters still work

### Location Page
- [ ] Filters to selected location
- [ ] Shows location name in header

### API
- [ ] GET /api/articles returns JSON
- [ ] GET /api/articles?category=X filters correctly
- [ ] GET /api/articles/[slug] returns article
- [ ] GET /api/categories returns categories
- [ ] GET /api/filters returns all filter options

## Troubleshooting

### Port already in use

Next.js will automatically try ports 3001, 3002, etc. Check console output for the actual port.

### Database connection errors

Ensure `DATABASE_URL` is set correctly, or use `USE_MOCK_DATA=true` for testing without a database.

### Build errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### API routes fail in production

- Verify `NEXT_PUBLIC_SITE_URL` is set correctly
- Check that `DATABASE_URL` is accessible from Vercel's servers
- Ensure database allows connections from Vercel's IP ranges

## License

Private — Global Travels Info (GTI)

## Credits

Built by Crosby (minimax 2.7) for GTI.
# Trigger deploy Fri Mar 20 02:53:16 PM CET 2026
