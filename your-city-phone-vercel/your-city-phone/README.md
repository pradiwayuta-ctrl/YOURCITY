# Your City Phone (Fase 1–3) — versi Vercel
Telegram Mini App bergaya iPhone: scan akun → KTP → gender → lock screen → home → Bank & Kerja.

## Beda dengan versi Railway
| Railway | Vercel |
|---|---|
| `npm start` jalan terus (`app.listen`) | Serverless function `api/index.js`; `server/dev.js` hanya untuk lokal |
| Pajak mingguan via `setInterval` | **Vercel Cron** → `/api/cron/weekly-tax` (Minggu 13:00 UTC = 20:00 WIB) |
| Webhook bot didaftarkan saat boot | Didaftarkan sekali: `npm run set-webhook` (path baru: `/api/bot`) |
| Migrasi otomatis tiap deploy | Manual: `npm run migrate:local` |
| Plugin PostgreSQL Railway | Postgres eksternal (Neon via Vercel Marketplace, atau tetap Railway) |

## Deploy
1. Push ke GitHub → Vercel: **Add New → Project** → import repo (Framework Preset: Other; sudah diatur lewat `vercel.json`).
2. Database: Vercel → Storage → **Neon** (otomatis mengisi `DATABASE_URL`), atau tempel URL publik Postgres Railway kamu ke `DATABASE_URL` (data lama ikut terbawa).
3. Environment Variables: `BOT_TOKEN`, `CITY_NAME`, `TIMEZONE`, `CRON_SECRET` (string acak panjang, mis. `openssl rand -hex 32`), `BOT_WEBHOOK_SECRET` (opsional), `WEBAPP_URL` (opsional, default domain production Vercel).
4. Deploy, lalu dari komputer lokal (`.env` berisi nilai yang sama): 
   ```
   npm i
   npm run migrate:local     # buat tabel (aman diulang)
   npm run set-webhook       # arahkan bot ke /api/bot
   ```
5. BotFather: ubah URL Mini App / menu button ke domain Vercel.

## Lokal
`npm i`, isi `.env`, `npm run migrate:local && npm start`, buka http://localhost:3000
(tanpa Telegram, user dev dipakai otomatis saat NODE_ENV bukan production).

## Pajak mingguan
Cron hanya jalan di hari Minggu (zona `TIMEZONE`). Manual: 
`curl -H "Authorization: Bearer $CRON_SECRET" "https://DOMAIN/api/cron/weekly-tax?force=1"`

## Tambah fitur
1 folder di server/modules, 1 baris di server/routes.js, 1 folder di public/js/apps.
