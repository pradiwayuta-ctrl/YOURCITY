import { Router } from 'express';
import * as svc from './citizen.service.js';
const r = Router();

r.get('/me', async (req, res) => res.json(await svc.find(req.tg.id)));

r.post('/confirm', async (req, res) => {
  try {
    const g = req.body.gender;
    if (!['L', 'P'].includes(g)) return res.status(400).json({ error: 'Gender tidak valid' });
    res.json(await svc.confirm(req.tg.id, g));
  } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
});
export default r;
