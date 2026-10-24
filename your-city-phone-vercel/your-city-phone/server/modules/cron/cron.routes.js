import crypto from 'crypto';
import { Router } from 'express';
import { env } from '../../config/env.js';
import { runWeeklyTax } from '../../engine/weekly-tax.js';
const r = Router();

function authorized(req) {
  if (!env.cronSecret) return false;
  const a = Buffer.from(req.get('authorization') || '');
  const b = Buffer.from(`Bearer ${env.cronSecret}`);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

r.get('/weekly-tax', async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  try { res.json(await runWeeklyTax({ force: req.query.force === '1' })); }
  catch (e) { console.error('pajak gagal', e.message); res.status(500).json({ error: 'Pajak gagal' }); }
});
export default r;
