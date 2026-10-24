import { Router } from 'express';
import { getOrCreate } from '../citizen/citizen.service.js';
import { ensureWallet } from '../economy/bank.service.js';
import { env } from '../../config/env.js';
const r = Router();

r.post('/', async (req, res) => {
  const citizen = await getOrCreate(req.tg);
  await ensureWallet(req.tg.id);
  res.json({ citizen, city: env.cityName, isNew: !citizen.confirmed, needsConfirm: !citizen.confirmed });
});
export default r;
