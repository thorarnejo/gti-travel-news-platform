# GTI News Platform - Production Deployment Checklist

## Pre-Deployment

- [ ] All tests pass (`npm test`)
- [ ] Production build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] No critical lint errors
- [ ] `.env.example` is up to date

## Vercel Project Setup

- [ ] Create Vercel account (if needed)
- [ ] Connect Git repository
- [ ] Configure project settings:
  - Framework Preset: Next.js
  - Root Directory: `gti-articles/news-platform` (if monorepo)
  - Build Command: `npm run build`
  - Output Directory: `.next`

## Environment Variables

- [ ] Add `DATABASE_URL` — PostgreSQL connection string
- [ ] Add `NEXT_PUBLIC_SITE_URL` — Production domain (e.g., `https://gti-news.vercel.app`)
- [ ] Verify `NODE_ENV=production` (set automatically by Vercel)

## PostgreSQL Hosting

- [ ] Create PostgreSQL database (Vercel Postgres, Supabase, Railway, etc.)
- [ ] Run migrations: `npm run db:migrate`
- [ ] Seed initial data (optional): `npm run db:seed`
- [ ] Verify database is accessible from Vercel's servers

## Deploy

- [ ] Push code to main branch
- [ ] Vercel auto-deploys (or run `vercel --prod`)
- [ ] Wait for build to complete

## Post-Deploy Verification

- [ ] Homepage loads without errors
- [ ] Article cards display
- [ ] Category filters work
- [ ] Location filters work
- [ ] Article detail pages load
- [ ] API endpoints respond:
  - `GET /api/articles`
  - `GET /api/categories`
  - `GET /api/locations`
  - `GET /api/filters`
- [ ] No console errors in browser
- [ ] No 500 errors in Vercel logs

## Rollback Plan

If issues detected:
1. Check Vercel deployment logs
2. Revert to previous deployment in Vercel dashboard
3. Fix issues locally
4. Redeploy

## Notes

- Database migrations must be run manually after first deploy
- Mock data mode (`USE_MOCK_DATA=true`) can be used for quick testing
- Vercel Analytics can be enabled for performance monitoring
