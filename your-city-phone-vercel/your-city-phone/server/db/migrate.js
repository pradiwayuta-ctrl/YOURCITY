import fs from 'fs';
import { db } from '../config/db.js';
const dir = new URL('./migrations/', import.meta.url);
for (const f of fs.readdirSync(dir).sort()) {
  await db.query(fs.readFileSync(new URL(f, dir), 'utf8'));
  console.log('migrated', f);
}
await db.end();
