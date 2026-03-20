#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const projectRoot = '/home/thor/.openclaw/workspace/gti-articles/news-platform'

console.log('🔍 Validating GTI News Platform setup...\n')

// Check required files exist
const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'next.config.ts',
  'tailwind.config.ts',
  'postcss.config.js',
  '.env.example',
  'README.md',
  'db/migrations/001_initial_schema.sql',
  'db/seeds/seed_data.sql',
  'scripts/migrate.js',
  'scripts/seed.js',
  'scripts/setup.js',
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/api/articles/route.ts',
  'src/app/api/articles/[slug]/route.ts',
  'src/app/api/articles/create/route.ts',
  'src/app/api/articles/[id]/route.ts',
  'src/app/api/filters/route.ts',
  'src/app/api/categories/route.ts',
  'src/app/api/locations/route.ts',
  'src/lib/data.ts',
  'src/lib/db.ts',
  'src/lib/articleService.ts',
  'src/types/index.ts',
]

let missingFiles = []
let validationErrors = []

requiredFiles.forEach(file => {
  const fullPath = path.join(projectRoot, file)
  if (!fs.existsSync(fullPath)) {
    missingFiles.push(file)
  }
})

if (missingFiles.length > 0) {
  validationErrors.push(`❌ Missing files: ${missingFiles.join(', ')}`)
}

// Check package.json has required scripts
const packageJsonPath = path.join(projectRoot, 'package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const requiredScripts = ['dev', 'build', 'start', 'db:migrate', 'db:seed', 'db:setup']
  
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script])
  if (missingScripts.length > 0) {
    validationErrors.push(`❌ Missing scripts in package.json: ${missingScripts.join(', ')}`)
  }
}

// Check .env.example exists and has required vars
const envExamplePath = path.join(projectRoot, '.env.example')
if (fs.existsSync(envExamplePath)) {
  const envExample = fs.readFileSync(envExamplePath, 'utf8')
  const requiredVars = ['DATABASE_URL', 'NEXT_PUBLIC_SITE_URL']
  
  const missingVars = requiredVars.filter(varName => !envExample.includes(varName))
  if (missingVars.length > 0) {
    validationErrors.push(`❌ Missing environment variables in .env.example: ${missingVars.join(', ')}`)
  }
}

// Check README has key sections
const readmePath = path.join(projectRoot, 'README.md')
if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, 'utf8')
  const requiredSections = ['# GTI Travel News Platform', '## Features', '## Tech Stack', '## Getting Started', '## API Endpoints']
  
  const missingSections = requiredSections.filter(section => !readme.includes(section))
  if (missingSections.length > 0) {
    validationErrors.push(`❌ Missing sections in README.md: ${missingSections.join(', ')}`)
  }
}

// Report results
if (validationErrors.length > 0) {
  console.log('❌ VALIDATION FAILED:')
  validationErrors.forEach(error => console.log(`  ${error}`))
  process.exit(1)
} else {
  console.log('✅ ALL VALIDATIONS PASSED')
  console.log('\n📋 Summary:')
  console.log('  • All required files present')
  console.log('  • Package.json has all required scripts')
  console.log('  • Environment variables configured')
  console.log('  • README documentation complete')
  console.log('\n🚀 Ready to run:')
  console.log('  1. cp .env.example .env.local')
  console.log('  2. Edit .env.local with your database credentials')
  console.log('  3. npm run db:setup')
  console.log('  4. npm run dev')
  console.log('\n🌐 Application will be available at http://localhost:3000')
}