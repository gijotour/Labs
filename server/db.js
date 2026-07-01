import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS proposals (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      region TEXT,
      designer TEXT,
      price TEXT,
      image TEXT,
      description TEXT,
      rating NUMERIC DEFAULT 5,
      review_count INTEGER DEFAULT 0,
      customer_request JSONB DEFAULT '{}'::jsonb,
      detailed_plan JSONB DEFAULT '{}'::jsonb,
      status TEXT DEFAULT 'Draft',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS guides (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      region TEXT NOT NULL,
      role TEXT,
      phone TEXT,
      status TEXT DEFAULT 'Pending',
      rating NUMERIC DEFAULT 5,
      memo TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS users_crm (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT DEFAULT 'Customer',
      contact TEXT NOT NULL,
      request TEXT,
      status TEXT DEFAULT 'Lead',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}
