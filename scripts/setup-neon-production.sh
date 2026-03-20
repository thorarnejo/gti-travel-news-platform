#!/bin/bash
# ============================================================
# Neon PostgreSQL Production Setup Script
# GTI Travel News Platform
# ============================================================
# This script sets up Neon PostgreSQL for the Vercel project
# Run this after authenticating with Vercel CLI
# ============================================================

set -e

echo "=========================================="
echo "🚀 GTI News Platform - Neon Production Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Vercel CLI is authenticated
if ! npx vercel whoami &>/dev/null; then
    echo -e "${RED}❌ Vercel CLI not authenticated${NC}"
    echo "Please run: npx vercel login"
    exit 1
fi

echo -e "${GREEN}✓ Vercel CLI authenticated${NC}"

# Get project info
PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
ORG_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)

echo "Project ID: $PROJECT_ID"
echo "Org ID: $ORG_ID"
echo ""

# ============================================================
# STEP 1: Install Neon Integration from Vercel Marketplace
# ============================================================
echo -e "${YELLOW}Step 1: Installing Neon Integration...${NC}"
echo "Opening Vercel Dashboard to install Neon..."
echo ""
echo "Please manually install Neon from the Vercel Marketplace:"
echo "1. Visit: https://vercel.com/dashboard"
echo "2. Select project: news-platform"
echo "3. Go to 'Integrations' tab"
echo "4. Search for 'Neon' and install"
echo "5. Choose region: eu-central-1 (Frankfurt) - closest to your deployment"
echo ""
read -p "Press Enter once Neon is installed..."

# ============================================================
# STEP 2: Verify DATABASE_URL is set
# ============================================================
echo ""
echo -e "${YELLOW}Step 2: Verifying DATABASE_URL...${NC}"

# Check if DATABASE_URL exists in production
if npx vercel env ls production 2>/dev/null | grep -q "DATABASE_URL"; then
    echo -e "${GREEN}✓ DATABASE_URL is set in production${NC}"
    DB_URL=$(npx vercel env get DATABASE_URL production 2>/dev/null)
    echo "Database URL: ${DB_URL:0:50}..."
else
    echo -e "${RED}❌ DATABASE_URL not found in production environment${NC}"
    echo "Neon integration should have set this automatically."
    echo "If not set, please add it manually:"
    echo "  npx vercel env add DATABASE_URL production"
    exit 1
fi

# ============================================================
# STEP 3: Verify NEXT_PUBLIC_SITE_URL
# ============================================================
echo ""
echo -e "${YELLOW}Step 3: Verifying NEXT_PUBLIC_SITE_URL...${NC}"

SITE_URL="https://news-platform-fefkdpcr5-thorarnejo-8868s-projects.vercel.app"

if npx vercel env ls production 2>/dev/null | grep -q "NEXT_PUBLIC_SITE_URL"; then
    echo -e "${GREEN}✓ NEXT_PUBLIC_SITE_URL is set${NC}"
else
    echo -e "${YELLOW}⚠ NEXT_PUBLIC_SITE_URL not set, adding...${NC}"
    echo "$SITE_URL" | npx vercel env add NEXT_PUBLIC_SITE_URL production
    echo -e "${GREEN}✓ NEXT_PUBLIC_SITE_URL set to: $SITE_URL${NC}"
fi

# ============================================================
# STEP 4: Ensure USE_MOCK_DATA is NOT set in production
# ============================================================
echo ""
echo -e "${YELLOW}Step 4: Checking USE_MOCK_DATA...${NC}"

if npx vercel env ls production 2>/dev/null | grep -q "USE_MOCK_DATA"; then
    echo -e "${YELLOW}⚠ USE_MOCK_DATA is set in production - removing...${NC}"
    npx vercel env rm USE_MOCK_DATA production --yes
    echo -e "${GREEN}✓ USE_MOCK_DATA removed${NC}"
else
    echo -e "${GREEN}✓ USE_MOCK_DATA is not set (good)${NC}"
fi

# ============================================================
# STEP 5: Get the DATABASE_URL and run migrations
# ============================================================
echo ""
echo -e "${YELLOW}Step 5: Running database migrations...${NC}"

# Pull environment variables to .env.production.local
npx vercel env pull .env.production.local --environment=production --yes

# Extract DATABASE_URL
export DATABASE_URL=$(grep "DATABASE_URL=" .env.production.local | cut -d'=' -f2- | tr -d '"' | tr -d "'")

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ Could not extract DATABASE_URL from .env.production.local${NC}"
    exit 1
fi

echo "Connecting to Neon database..."
echo "Running migrations..."

# Run migrations
npm run db:migrate

echo -e "${GREEN}✓ Migrations completed${NC}"

# ============================================================
# STEP 6: Seed the database
# ============================================================
echo ""
echo -e "${YELLOW}Step 6: Seeding database...${NC}"

npm run db:seed

echo -e "${GREEN}✓ Database seeded${NC}"

# ============================================================
# STEP 7: Deploy to production
# ============================================================
echo ""
echo -e "${YELLOW}Step 7: Deploying to production...${NC}"

npx vercel --prod --yes

echo -e "${GREEN}✓ Deployment triggered${NC}"

# ============================================================
# STEP 8: Verify production deployment
# ============================================================
echo ""
echo -e "${YELLOW}Step 8: Verifying production...${NC}"
echo "Waiting 30 seconds for deployment to propagate..."
sleep 30

echo ""
echo "Testing API endpoints..."

# Test homepage
if curl -sf "$SITE_URL" > /dev/null; then
    echo -e "${GREEN}✓ Homepage loads${NC}"
else
    echo -e "${RED}❌ Homepage failed to load${NC}"
fi

# Test API
if curl -sf "$SITE_URL/api/filters" > /dev/null; then
    echo -e "${GREEN}✓ API /filters responds${NC}"
else
    echo -e "${RED}❌ API /filters failed${NC}"
fi

if curl -sf "$SITE_URL/api/articles" > /dev/null; then
    echo -e "${GREEN}✓ API /articles responds${NC}"
else
    echo -e "${RED}❌ API /articles failed${NC}"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "Production URL: $SITE_URL"
echo ""
echo "To verify the database is working:"
echo "1. Visit: $SITE_URL"
echo "2. Check that articles load from the database"
echo "3. Test category and location filters"
echo ""
echo "If issues occur, check Vercel logs:"
echo "  npx vercel logs --all"
echo ""
