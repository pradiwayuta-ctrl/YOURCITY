import pg from 'pg';
import { env } from './env.js';

const local = /@(localhost|127\.0\.0\.1)[:/]/.test(env.dbUrl || '');

// Serverless: pool kecil per instance. Gunakan connection string "pooled" dari provider.
export const db = new pg.Pool({
  connectionString: env.dbUrl,
  ssl: local ? false : { rejectUnauthorized: false },
  max: Number(process.env.DB_POOL_MAX) || 3,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 8000,
});
