# Your City Phone (Fase 1 + 1.5)
Telegram Mini App bergaya iPhone: scan akun → KTP → konfirmasi gender → lock screen → home.

## Deploy (GitHub + Railway)
1. Push ke GitHub, Railway: Deploy from GitHub repo, tambah plugin PostgreSQL.
2. Variabel: BOT_TOKEN, WEBAPP_URL, CITY_NAME, (DATABASE_URL otomatis).
3. Railway menjalankan `npm run migrate && npm start`.

## Lokal
`npm i`, isi DATABASE_URL, `npm run migrate && npm start`, buka http://localhost:3000
(tanpa Telegram, user dev dipakai otomatis saat NODE_ENV bukan production).

## Tambah fitur
1 folder di server/modules, 1 baris di server/routes.js, 1 folder di public/js/apps.
