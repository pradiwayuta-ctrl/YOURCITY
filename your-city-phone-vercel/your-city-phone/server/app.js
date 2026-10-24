import express from 'express';
import { fileURLToPath } from 'url';
import api from './routes.js';
import cron from './modules/cron/cron.routes.js';
import { setupBot } from './bot/index.js';

const app = express();
app.use(express.json());
setupBot(app);                    // POST /api/bot  (webhook Telegram, tanpa initData)
app.use('/api/cron', cron);       // GET  /api/cron/* (dipanggil Vercel Cron, pakai CRON_SECRET)
app.use('/api', api);             // sisanya: wajib lewat telegramAuth
// Di Vercel, public/ dilayani CDN. Baris ini hanya dipakai saat jalan lokal.
app.use(express.static(fileURLToPath(new URL('../public', import.meta.url))));
export default app;
