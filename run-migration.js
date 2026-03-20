const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const fs = require('fs');

async function runMigration() {
  const sql = fs.readFileSync('./automation/db/migrations/002_automation_schema.sql', 'utf8');
  
  console.log('🚀 Running automation schema migration...');
  
  // Split on semicolons but handle dollar-quoted strings
  const statements = [];
  let current = '';
  let inDollarQuote = false;
  let dollarTag = '';
  
  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    const nextTwo = sql.slice(i, i + 2);
    
    if (!inDollarQuote && char === '$') {
      // Look for $tag$ pattern
      const match = sql.slice(i).match(/^\$([a-zA-Z_]*)\$/);
      if (match) {
        inDollarQuote = true;
        dollarTag = match[1];
      }
    } else if (inDollarQuote && char === '$') {
      const endMatch = sql.slice(i).match(/^\$([a-zA-Z_]*)\$/);
      if (endMatch && endMatch[1] === dollarTag) {
        inDollarQuote = false;
        dollarTag = '';
      }
    }
    
    current += char;
    
    if (char === ';' && !inDollarQuote) {
      statements.push(current.trim());
      current = '';
    }
  }
  
  // Add remaining if any
  if (current.trim()) {
    statements.push(current.trim());
  }
  
  const validStatements = statements.filter(s => s.length > 0);
  console.log(`Found ${validStatements.length} statements to execute`);
  
  for (let i = 0; i < validStatements.length; i++) {
    const statement = validStatements[i];
    if (statement.length < 10) continue; // Skip empty
    
    try {
      await pool.query(statement);
      process.stdout.write('.');
    } catch (e) {
      if (e.message.includes('already exists') || e.message.includes('duplicate')) {
        process.stdout.write('o');
      } else if (e.message.includes('does not exist') && statement.includes('DROP')) {
        process.stdout.write('o');
      } else {
        console.log('\n⚠️  Warning:', e.message.substring(0, 80));
      }
    }
  }
  
  console.log('\n✅ Migration complete');
  await pool.end();
}

runMigration().catch(e => {
  console.error('Migration failed:', e.message);
  process.exit(1);
});
