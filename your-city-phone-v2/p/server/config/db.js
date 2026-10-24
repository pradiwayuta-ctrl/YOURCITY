import pg from 'pg';
import { env } from './env.js';
export const db = new pg.Pool({
  connectionString: env.dbUrl,
  ssl: env.prod ? { rejectUnauthorized: false } : false,
});
