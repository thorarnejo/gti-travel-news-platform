const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_pC1WvKbB2iMP',
  host: 'ep-falling-meadow-ag627iy8-pooler.c-2.eu-central-1.aws.neon.tech',
  port: 5432,
  database: 'neondb',
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  const sql = fs.readFileSync('./automation/db/migrations/002_automation_schema.sql', 'utf8');
  
  console.log('🚀 Running automation schema migration...');
  
  // Split statements
  const statements = [];
  let current = '';
  let inDollarQuote = false;
  let dollarTag = '';
  
  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    
    if (!inDollarQuote && char === '$') {
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
  
  if (current.trim()) {
    statements.push(current.trim());
  }
  
  const validStatements = statements.filter(s => s.length > 10);
  
  let created = 0, skipped = 0, errors = [];
  
  for (let i = 0; i < validStatements.length; i++) {
    const statement = validStatements[i];
    try {
      await pool.query(statement);
      created++;
    } catch (e) {
      if (e.message.includes('already exists') || e.message.includes('duplicate')) {
        skipped++;
      } else {
        errors.push({ idx: i, msg: e.message.substring(0, 100), sql: statement.substring(0, 50) });
      }
    }
  }
  
  console.log(`\n✅ Migration complete:`);
  console.log(`   Created/Executed: ${created}`);
  console.log(`   Skipped (exists): ${skipped}`);
  
  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`);
    errors.forEach(e => console.log(`   [${e.idx}] ${e.msg}`));
  }
  
  await pool.end();
}

runMigration().catch(e => {
  console.error('\n❌ Migration failed:', e.message);
  process.exit(1);
});
