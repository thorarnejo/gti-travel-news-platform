# Neon PostgreSQL Production Setup Guide

## Overview

This guide will walk you through setting up Neon PostgreSQL via Vercel Marketplace for the GTI Travel News Platform.

## Prerequisites

- Vercel account with access to the `news-platform` project
- Neon account (or will be created during setup)

## Manual Setup Steps

### Step 1: Authenticate Vercel CLI

1. Open a terminal in the project directory:
   ```bash
   cd /home/thor/.openclaw/workspace/gti-articles/news-platform
   ```

2. Run Vercel login:
   ```bash
   npx vercel login
   ```

3. Open the displayed URL in your browser and authorize.

4. Return to the terminal - you should see "Logged in" confirmation.

### Step 2: Install Neon Integration from Vercel Marketplace

1. Go to https://vercel.com/dashboard
2. Click on the **news-platform** project
3. Go to the **Integrations** tab
4. Search for **"Neon"**
5. Click **Install**
6. Select **"Add Neon Postgres"**
7. Choose **Region**: `EU Central (Frankfurt)` - closest to deployment
8. Click **Create Database**
9. Wait for the integration to complete

This will automatically:
- Create a Neon project
- Set `DATABASE_URL` in Vercel environment variables
- Configure connection pooling

### Step 3: Configure Environment Variables

Verify and set environment variables:

```bash
# Check current env vars
npx vercel env ls production

# Set NEXT_PUBLIC_SITE_URL (if not already set)
npx vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app

# Ensure USE_MOCK_DATA is NOT set
npx vercel env rm USE_MOCK_DATA production --yes 2>/dev/null || echo "Not set (good)"
```

### Step 4: Get DATABASE_URL and Run Migrations

```bash
# Pull production environment variables
npx vercel env pull .env.production.local --environment=production --yes

# Extract and export DATABASE_URL
export DATABASE_URL=$(grep "DATABASE_URL=" .env.production.local | cut -d'=' -f2- | tr -d '"' | tr -d "'")

# Test connection
echo "Database URL: ${DATABASE_URL:0:50}..."

# Run migrations
npm run db:migrate
```

### Step 5: Seed the Database

```bash
npm run db:seed
```

This will populate the database with:
- 10 countries (France, Germany, Spain, Italy, Japan, Thailand, US, UK, Australia, Brazil)
- 20 cities
- 30 locations (country + city level)
- 9 categories (Flights, Visa & Entry, Safety, Transport, Weather, Accommodation, Events, Prices, Airports)
- 10 sample articles

### Step 6: Deploy to Production

```bash
npx vercel --prod --yes
```

Wait for the deployment to complete.

### Step 7: Verify Production

Test these URLs to verify everything is working:

```bash
# Test homepage
curl https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app

# Test API endpoints
curl https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app/api/articles
curl https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app/api/filters
curl https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app/api/categories
curl https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app/api/locations

# Test a specific article
curl https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app/api/articles/europe-pilot-strike-march-2026
```

### Step 8: Manual Verification Checklist

Open the production URL in a browser and verify:

- [ ] Homepage loads without errors
- [ ] Article cards display real data (not mock data)
- [ ] Category filter works and shows: Flights, Visa & Entry, Safety, Transport, Weather, Accommodation, Events, Prices, Airports
- [ ] Location filter works and shows countries/cities
- [ ] Clicking an article loads the detail page
- [ ] API routes return JSON data (not errors)

## Troubleshooting

### Database Connection Issues

If you see connection errors:

1. Check the DATABASE_URL format:
   ```bash
   npx vercel env get DATABASE_URL production
   ```
   
   Should look like: `postgresql://user:pass@host.neon.tech:5432/dbname`

2. Neon uses SSL by default - the pg driver should handle this automatically.

3. Check if the Neon project is active in the Neon console.

### Mock Data Still Showing

If mock data appears instead of database data:

1. Check USE_MOCK_DATA is not set:
   ```bash
   npx vercel env ls production | grep MOCK
   ```
   
   Should return nothing. If set, remove it:
   ```bash
   npx vercel env rm USE_MOCK_DATA production --yes
   ```

2. Redeploy:
   ```bash
   npx vercel --prod --yes
   ```

### Migration Failures

If migrations fail:

1. Check Neon database is accessible:
   ```bash
   npx vercel env pull .env.production.local --environment=production --yes
   export DATABASE_URL=$(grep "DATABASE_URL=" .env.production.local | cut -d'=' -f2- | tr -d '"' | tr -d "'")
   psql $DATABASE_URL -c "SELECT version();"
   ```

2. Check migration file exists:
   ```bash
   ls -la db/migrations/001_initial_schema.sql
   ```

3. Check for SQL errors in the output.

## Automated Script

After authenticating with Vercel CLI, you can run the automated setup script:

```bash
cd /home/thor/.openclaw/workspace/gti-articles/news-platform
./scripts/setup-neon-production.sh
```

**Note**: This script requires Vercel CLI to be authenticated first.

## Post-Setup Summary

Once complete:

- **Neon Setup**: Neon PostgreSQL via Vercel Marketplace, Frankfurt region
- **DATABASE_URL**: Automatically configured in Vercel
- **NEXT_PUBLIC_SITE_URL**: Set to production URL
- **Migrations**: Applied to Neon database
- **Seed Data**: 10 sample articles loaded
- **Production URL**: https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app

## Next Steps

1. Monitor the production site for any errors
2. Check Vercel logs if issues occur:
   ```bash
   npx vercel logs --all
   ```
3. Set up regular database backups in Neon console
4. Consider enabling Vercel Analytics for performance monitoring

## Neon Console Access

To manage your database directly:

1. Go to https://console.neon.tech
2. Sign in with the same account used for Vercel integration
3. Find your project: `gti-news-platform` (or similar)
4. Use the SQL Editor to run queries directly

## Support

If you encounter issues:
- Vercel docs: https://vercel.com/docs
- Neon docs: https://neon.tech/docs
- Check Vercel deployment logs: `npx vercel logs --all`
