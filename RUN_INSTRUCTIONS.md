# GTI News Platform - Run Instructions

## 1. Environment Setup

First, copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/gti_news
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 2. Database Setup

Run the complete database setup (migrations + seed data):

```bash
npm run db:setup
```

This will:
- Create all database tables and indexes
- Insert sample countries, cities, locations, categories, sources
- Load 10 sample travel news articles

Alternative commands:
```bash
# Run migrations only
npm run db:migrate

# Load seed data only  
npm run db:seed
```

## 3. Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at: http://localhost:3000

## 4. Production Build

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 5. Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 6. Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 7. Database Management

### Check Connection
```bash
# Test database connection
node -e "require('./src/lib/db').query('SELECT version()').then(console.log).catch(console.error)"
```

### Reset Database (Development Only)
```bash
# WARNING: This will delete all data!
psql $DATABASE_URL -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npm run db:setup
```

## 8. API Testing

Test the API endpoints directly:

```bash
# Get articles
curl http://localhost:3000/api/articles

# Get specific article
curl http://localhost:3000/api/articles/europe-pilot-strike-march-2026

# Get filters
curl http://localhost:3000/api/filters

# Create article (requires valid data)
curl -X POST http://localhost:3000/api/articles/create \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Test Article",
    "summary": "This is a test",
    "body": "<p>Test content</p>",
    "category_id": 1,
    "is_published": true
  }'
```

## 9. Vercel Deployment

For Vercel deployment:
1. Push code to Git repository
2. Import project in Vercel dashboard
3. Set environment variable: `DATABASE_URL` (your production PostgreSQL URL)
4. Vercel will auto-configure `NEXT_PUBLIC_SITE_URL`
5. Deploy!

## 10. Troubleshooting

### Common Issues

**Database Connection Failed:**
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `.env.local`
- Ensure database `gti_news` exists

**Port Already in Use:**
- Change port: `PORT=3001 npm run dev`
- Or kill existing process: `lsof -ti:3000 | xargs kill`

**Module Not Found Errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Next.js Build Errors:**
- Check TypeScript errors: `npx tsc --noEmit`
- Ensure all dependencies are installed

### Logs
- Development logs appear in terminal where `npm run dev` is running
- Production logs available in Vercel dashboard under "Logs"
- Database errors will appear in application logs

## Quick Start Summary

```bash
# Setup
cp .env.example .env.local
# Edit .env.local with your DB credentials
npm run db:setup
npm run dev

# Visit: http://localhost:3000
```

## Production Checklist

Before deploying to production:
- [ ] Set strong PostgreSQL password
- [ ] Configure firewall to restrict DB access
- [ ] Set up regular database backups
- [ ] Configure monitoring and alerting
- [ ] Set up error tracking (Sentry)
- [ ] Configure CDN for static assets
- [ ] Set up custom domain and SSL
- [ ] Test backup and restore procedures