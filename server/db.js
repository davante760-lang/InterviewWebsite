import pg from 'pg'

const { Pool } = pg

const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PRIVATE_URL || process.env.DATABASE_PUBLIC_URL
console.log('[DB] Connection string available:', !!connectionString)
console.log('[DB] DATABASE_URL:', !!process.env.DATABASE_URL, '| DATABASE_PRIVATE_URL:', !!process.env.DATABASE_PRIVATE_URL, '| DATABASE_PUBLIC_URL:', !!process.env.DATABASE_PUBLIC_URL)

const pool = connectionString ? new Pool({
  connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
}) : null

export async function query(text, params) {
  if (!pool) throw new Error('No database connection — DATABASE_URL not set')
  return pool.query(text, params)
}

export async function initialize() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email           VARCHAR(255) UNIQUE NOT NULL,
      role            VARCHAR(50) NOT NULL,
      stage           VARCHAR(50) NOT NULL,
      account_status  VARCHAR(20) DEFAULT 'pending_activation',
      activated_at    TIMESTAMPTZ,
      created_at      TIMESTAMPTZ DEFAULT now(),
      updated_at      TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS magic_tokens (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash  VARCHAR(255) NOT NULL,
      expires_at  TIMESTAMPTZ NOT NULL,
      used_at     TIMESTAMPTZ,
      created_at  TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      session_token   VARCHAR(255) UNIQUE NOT NULL,
      expires_at      TIMESTAMPTZ NOT NULL,
      created_at      TIMESTAMPTZ DEFAULT now(),
      last_active_at  TIMESTAMPTZ DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_magic_tokens_hash ON magic_tokens(token_hash);
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
  `)
  console.log('Database initialized')
}

export default { query, initialize }
