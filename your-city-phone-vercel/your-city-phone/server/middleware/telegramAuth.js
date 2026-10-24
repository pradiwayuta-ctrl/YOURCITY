import crypto from 'crypto';
import { env } from '../config/env.js';

export function parseInitData(raw) {
  const p = new URLSearchParams(raw);
  const hash = p.get('hash');
  p.delete('hash');
  const check = [...p.entries()].map(([k, v]) => `${k}=${v}`).sort().join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(env.botToken).digest();
  const sig = crypto.createHmac('sha256', secret).update(check).digest('hex');
  if (sig !== hash) return null;
  return JSON.parse(p.get('user') || 'null');
}

export function telegramAuth(req, res, next) {
  const raw = req.get('x-init-data') || '';
  const user = raw ? parseInitData(raw)
    : !env.prod ? { id: 1, first_name: 'Dev', username: 'dev' } : null;
  if (!user) return res.status(401).json({ error: 'Buka lewat Telegram' });
  req.tg = user;
  next();
}
